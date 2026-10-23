import { EQ_SOURCES, MIX_WORKFLOW } from './data.js';
import { initEqViz } from './eqviz.js';

const $ = (sel) => document.querySelector(sel);

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Render the EQ reference chart (the "graphic" below the header)
const chart = $('#eqChart');
if (chart) {
  let rows = "";
  EQ_SOURCES.forEach((src) => {
    rows +=
      '<div class="eq-row">' +
        '<div class="eq-src"><span class="icon">' + src.icon + '</span><span class="name">' + esc(src.name) + '</span></div>' +
        '<div class="eq-col"><div class="eq-col-label">HPF start</div><div class="val"><span class="freq">' + esc(src.hpf) + '</span></div></div>' +
        '<div class="eq-col cut"><div class="eq-col-label">Cut / trim</div><div class="val"><span class="freq">' + esc(src.cutFreq) + '</span><br>' + esc(src.cutDb) + '</div></div>' +
        '<div class="eq-col boost"><div class="eq-col-label">Boost / preserve</div><div class="val"><span class="freq">' + esc(src.boostFreq) + '</span><br>' + esc(src.boostDb) + '</div></div>' +
        '<div class="eq-col listen"><div class="eq-col-label">Listen for</div><div class="val">' + esc(src.listen) + '</div></div>' +
      '</div>';
  });
  chart.innerHTML = rows;
}

// Render the mixing workflow
const wf = $('#workflow');
if (wf) {
  let steps = "";
  MIX_WORKFLOW.forEach((s) => {
    steps +=
      '<div class="wf-step">' +
        '<div class="wf-num">' + s.step + '</div>' +
        '<div class="wf-action">' + esc(s.action) + '</div>' +
        '<div class="wf-check">' + esc(s.check) + '</div>' +
      '</div>';
  });
  wf.innerHTML = steps;
}

// Interactive visual EQ
initEqViz();

// Header scroll shadow
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
}
