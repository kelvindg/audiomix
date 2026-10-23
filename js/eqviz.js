/* AudioMix Guide — Interactive Visual EQ
 * Draws a real frequency-response curve for each source on a log-frequency axis.
 * Computes the combined response of the high-pass filter + peaking EQ bands
 * (standard biquad magnitude formulas), then renders it as an SVG path.
 */
import { EQ_SOURCES, EQ_CURVES } from './data.js';

const F_MIN = 20;      // Hz
const F_MAX = 20000;   // Hz
const DB_MIN = -24;    // dB
const DB_MAX = 12;     // dB
const W = 900;         // svg width
const H = 360;         // svg height
const PAD = { l: 46, r: 18, t: 18, b: 34 };

// --- math helpers -----------------------------------------------------------

// log-frequency -> x pixel
function fx(f) {
  const t = (Math.log(f / F_MIN) / Math.log(F_MAX / F_MIN));
  return PAD.l + t * (W - PAD.l - PAD.r);
}
// dB -> y pixel (inverted), clamped to the plot area so the HPF rolloff
// "hits the floor" instead of overflowing the chart.
function fy(db) {
  const t = (db - DB_MIN) / (DB_MAX - DB_MIN);
  const y = PAD.t + (1 - t) * (H - PAD.t - PAD.b);
  return Math.max(PAD.t, Math.min(H - PAD.b, y));
}

// Peaking EQ magnitude (dB) at frequency f for a band {freq, gain, q}.
// Exact RBJ peaking-filter magnitude response via complex arithmetic.
function peakingDb(f, band) {
  const f0 = band.freq, G = band.gain, Q = band.q;
  const A = Math.pow(10, G / 40);
  const w0 = 2 * Math.PI * f0 / 48000;
  const alpha = Math.sin(w0) / (2 * Q);
  const b0 = 1 + alpha * A, b1 = -2 * Math.cos(w0), b2 = 1 - alpha * A;
  const a0 = 1 + alpha / A, a1 = -2 * Math.cos(w0), a2 = 1 - alpha / A;
  const w = 2 * Math.PI * f / 48000;
  const e1r = Math.cos(-w), e1i = Math.sin(-w);
  const e2r = Math.cos(-2 * w), e2i = Math.sin(-2 * w);
  const nr = b0 + b1 * e1r + b2 * e2r, ni = b1 * e1i + b2 * e2i;
  const dr = a0 + a1 * e1r + a2 * e2r, di = a1 * e1i + a2 * e2i;
  const mag = Math.hypot(nr, ni) / Math.hypot(dr, di);
  return 20 * Math.log10(Math.max(mag, 1e-9));
}

// 2nd-order high-pass magnitude (dB) at f for cutoff fc (Butterworth-ish Q=0.707).
function hpfDb(f, fc) {
  if (fc <= 0) return 0;
  const x = f / fc;
  const mag = (x * x) / Math.sqrt(1 + Math.pow(x, 4));
  return 20 * Math.log10(Math.max(mag, 1e-9));
}

// Combined response in dB at frequency f for a source curve.
function responseDb(f, curve) {
  let db = 0;
  if (curve.hpf) db += hpfDb(f, curve.hpf);
  (curve.bands || []).forEach((b) => { db += peakingDb(f, b); });
  return db;
}

// --- rendering --------------------------------------------------------------

function buildGrid() {
  let g = '';
  // vertical gridlines at standard audio frequencies
  const freqs = [20, 30, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
  freqs.forEach((f) => {
    const x = fx(f);
    const label = f >= 1000 ? (f / 1000) + 'k' : String(f);
    g += `<line x1="${x}" y1="${PAD.t}" x2="${x}" y2="${H - PAD.b}" class="grid-v"/>`;
    g += `<text x="${x}" y="${H - PAD.b + 20}" class="axis-label" text-anchor="middle">${label}</text>`;
  });
  // horizontal gridlines at dB steps
  for (let db = DB_MIN; db <= DB_MAX; db += 3) {
    const y = fy(db);
    const cls = db === 0 ? 'grid-zero' : 'grid-h';
    g += `<line x1="${PAD.l}" y1="${y}" x2="${W - PAD.r}" y2="${y}" class="${cls}"/>`;
    g += `<text x="${PAD.l - 8}" y="${y + 4}" class="axis-label" text-anchor="end">${db > 0 ? '+' : ''}${db}</text>`;
  }
  return g;
}

function buildCurvePath(curve) {
  const N = 220;
  let d = '';
  for (let i = 0; i <= N; i++) {
    const f = F_MIN * Math.pow(F_MAX / F_MIN, i / N);
    const x = fx(f), y = fy(responseDb(f, curve));
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
  }
  return d;
}

// markers for each band + hpf, with a small label
function buildMarkers(curve) {
  let m = '';
  (curve.bands || []).forEach((b) => {
    const x = fx(b.freq), y = fy(responseDb(b.freq, curve));
    const cls = b.type === 'cut' ? 'mark-cut' : 'mark-boost';
    const sign = b.gain > 0 ? '+' : '';
    m += `<g class="marker ${cls}">
      <circle cx="${x}" cy="${y}" r="4.5"/>
      <text x="${x}" y="${y - 10}" class="mark-label" text-anchor="middle">${sign}${b.gain} dB</text>
    </g>`;
  });
  if (curve.hpf) {
    const x = fx(curve.hpf), y = fy(responseDb(curve.hpf, curve));
    m += `<g class="marker mark-hpf">
      <circle cx="${x}" cy="${y}" r="4.5"/>
      <text x="${x}" y="${y + 18}" class="mark-label" text-anchor="middle">HPF ${curve.hpf} Hz</text>
    </g>`;
  }
  return m;
}

function renderViz(container, curve) {
  const svg =
    `<svg viewBox="0 0 ${W} ${H}" class="eqviz-svg" role="img" aria-label="Frequency response curve">
      ${buildGrid()}
      <path d="${buildCurvePath(curve)}" class="curve"/>
      ${buildMarkers(curve)}
    </svg>`;
  container.innerHTML = svg;
}

// --- public init ------------------------------------------------------------

export function initEqViz() {
  const root = document.getElementById('eqViz');
  if (!root) return;

  // build source selector buttons
  const sel = root.querySelector('.eqviz-sel');
  const stage = root.querySelector('.eqviz-stage');
  if (!sel || !stage) return;

  let active = EQ_SOURCES[0].id;
  const buttons = [];

  EQ_SOURCES.forEach((src) => {
    const curve = EQ_CURVES[src.id];
    if (!curve) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'eqviz-btn';
    btn.innerHTML = `<span class="eqviz-btn-icon">${src.icon}</span><span>${src.name}</span>`;
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => {
      active = src.id;
      buttons.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
      renderViz(stage, EQ_CURVES[active]);
    });
    buttons.push(btn);
    sel.appendChild(btn);
  });

  // activate first
  buttons[0].setAttribute('aria-pressed', 'true');
  renderViz(stage, EQ_CURVES[active]);
}
