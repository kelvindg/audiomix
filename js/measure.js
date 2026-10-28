/* AudioMix — Measure page (Open Sound Meter quick start)
 * Rendered from data arrays so the steps stay easy to edit.
 * Content follows Offshore Audio: "Quick Start Guide For Open Sound Meter"
 * https://www.youtube.com/watch?v=NU3LaEc_zqc
 */

const $ = (sel) => document.querySelector(sel);

function esc(s) {
  return String(s).replace(/[&<>\"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* Steps grouped by phase. Each step: { t: title, b: body, h?: amber hint } */
const MEASURE_PHASES = [
  {
    tag: "Phase 02 · The Signal",
    steps: [
      {
        t: "Open a clean workspace",
        b: "When OSM opens it should be blank: one measurement, a generator above it, set to single + magnitude. If it looks different, File → New → create a new workspace to reset.",
      },
      {
        t: "Put your mic on the measurement channel",
        b: "Click the measurement — its options appear at the bottom. Set Audio Input Device to your interface, then make sure the Measurement channel matches the physical input (input 1 → channel 1). The input meter in the top-right should move with your voice.",
        h: "Double-check: turn the interface gain up and down. If the meter follows, you are on the right channel.",
      },
      {
        t: "Route the generator to one speaker",
        b: "Click the generator and pick the output device, then select output 1 (or 2) — so pink noise comes out of only the speaker you are measuring. Turn the generator on and raise the speaker volume to confirm you hear it.",
      },
      {
        t: "Set the reference to LOOP",
        b: "This is the transfer-function core: Measurement (M) is the mic — the sound after it leaves the speaker — and Reference (R) should be the same noise before it reaches the speaker. Set Reference on the measurement to LOOP, which routes the generator straight into the measurement. Click the generator and the second meter should fill.",
      },
      {
        t: "Match the levels (gain staging)",
        b: "Put the generator at −12 dB — a healthy level that tickles the orange. Then gain the mic up and raise the speaker volume until the Measurement meter (M) sits equal to the Reference meter (R). If they are skewed, your graph arrives at −6 dB or −9 dB instead of the zero line.",
      },
      {
        t: "Stop OSM hiding the graph",
        b: "OSM hides your trace when coherence — how much it trusts the mic data — is too low, which looks like a broken setup. Click the graph and turn OFF \u201cuse coherence,\u201d then switch the top-right view to double and set the second graph to coherence, so you always see data AND how much to trust it.",
        h: "Never turn the generator or speakers up to force coherence. Fix the measurement instead.",
      },
      {
        t: "Apply delay compensation",
        b: "Sound takes a few milliseconds to cross the space from speaker to mic, but the reference arrives instantly. Click the measurement → Apply Estimated Time Delay and OSM offsets it automatically (or type your own value). Coherence should jump way up. Now the measurement is trustworthy.",
      },
    ],
  },
];

/* Graph explainer cards */
const GRAPH_CARDS = [
  {
    t: "Magnitude",
    c: "amber",
    b: "The main view: before-speaker vs after-speaker. Left-to-right is frequency; up/down is level. Zero = no change, above zero = more of that frequency, below = less. This is what you EQ from.",
  },
  {
    t: "Spectrum",
    c: "cyan",
    b: "Live amplitude by frequency — the same view as a mixer RTA. It shows the current frequency content at this instant, not a comparison.",
  },
  {
    t: "Phase",
    c: "green",
    b: "Where each frequency sits in its 0–360° cycle when it arrives. Vital when aligning subs with mains or multiple cabinets — value comes when you align, not day-to-day.",
  },
  {
    t: "Impulse Response",
    c: "red",
    b: "Shows arrival times of sound sources. Play two speakers and you see two spikes: their distance in ms is the delay you need for time alignment (e.g. 2 ms apart in the video).",
  },
];

const READ_TIPS = [
  {
    t: "Coarsen the data",
    b: "Drop points per octave from 48 down to 6–12. Fine detail is moment-to-moment and will lead you down rabbit holes; coarse data shows the average response you can actually EQ.",
  },
  {
    t: "Average longer",
    b: "On the measurement, set FIFO higher until the trace moves slowly instead of jittering. A fast, shaky trace is unreliable; a slow, stable one is something you can act on.",
  },
  {
    t: "Use a target trace",
    b: "Ctrl+T shows or hides the target line you tune toward; Ctrl+I (or File → Import) loads a TXT/ASCII target. After importing, switch OFF \u201cuse coherence\u201d on the graph — imported targets have no coherence data.",
  },
  {
    t: "Display three graphs",
    b: "Magnitude + Phase + Coherence is the recommended layout: you can trust the data, read the response, and spot phase weirdness at a glance.",
  },
];

const STORE_STEPS = [
  { t: "Run it one more time", b: "Make sure you are clicked on the measurement, with the Store button in view. Play the noise, let it stabilize a few seconds so the FIFO average settles." },
  { t: "Store", b: "Hit Store. The measurement locks into the right-hand list, where you can hide it with the text button." },
  { t: "Rename and color it", b: "Type in the title box and change the color so each measurement is easy to find later — different speakers, positions, or sessions get their own identity." },
];

const CHEAT_ROWS = [
  { a: "Reset workspace", h: "File → New" },
  { a: "Configure a module", h: "Click it — graph, measurement, or generator" },
  { a: "Mic channel", h: "Measurement → Audio Input Device → channel 1" },
  { a: "Reference source", h: "Measurement → Reference = LOOP" },
  { a: "Generator level", h: "−12 dB, output 1/2 to the speaker under test" },
  { a: "Match M & R", h: "Mic gain + speaker volume until meters sit equal" },
  { a: "Stop the hidden graph", h: "Graph → use coherence OFF" },
  { a: "Delay", h: "Measurement → Apply Estimated Time Delay" },
  { a: "Smooth the response", h: "6–12 points per octave" },
  { a: "Stabilize the trace", h: "Raise FIFO averaging" },
  { a: "Target trace", h: "Ctrl+T show · Ctrl+I import (TXT/ASCII)" },
  { a: "Best layout", h: "Magnitude + Phase + Coherence" },
  { a: "Save it", h: "Store → rename + color-code on the right panel" },
];

/* Render phase steps */
const stepsHost = $("#measureSteps");
if (stepsHost) {
  let html = "";
  MEASURE_PHASES.forEach((phase) => {
    html += '<div class="me-phase"><div class="me-phase-head"><span class="me-phase-tag">' + esc(phase.tag) + "</span></div>";
    phase.steps.forEach((step, i) => {
      html +=
        '<div class="me-step">' +
        '<span class="me-step-num">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<div class="me-step-body"><h3>' + esc(step.t) + "</h3><p>" + esc(step.b) + "</p>" +
        (step.h ? '<div class="ct-takeaway"><strong>Heads up:</strong> ' + esc(step.h) + "</div>" : "") +
        "</div></div>";
    });
    html += "</div>";
  });
  stepsHost.innerHTML = html;
}

/* Render graph cards */
const graphHost = $("#graphCards");
if (graphHost) {
  let html = '<div class="me-graph-grid">';
  GRAPH_CARDS.forEach((g) => {
    html += '<article class="me-graph-card g-' + esc(g.c) + '"><h3>' + esc(g.t) + "</h3><p>" + esc(g.b) + "</p></article>";
  });
  html += "</div><div class='me-graph-tips'>";
  READ_TIPS.forEach((tip, i) => {
    html +=
      '<div class="me-read-tip">' +
      '<span class="me-read-num">0' + (i + 1) + "</span>" +
      "<div><strong>" + esc(tip.t) + "</strong><p>" + esc(tip.b) + "</p></div>" +
      "</div>";
  });
  html += "</div>";
  graphHost.innerHTML = html;
}

/* Render store steps */
const storeHost = $("#storeSteps");
if (storeHost) {
  let html = "";
  STORE_STEPS.forEach((s, i) => {
    html +=
      '<li><span class="ct-step-num">' + String(i + 1).padStart(2, "0") + "</span><span>" +
      "<strong>" + esc(s.t) + "</strong> — " + esc(s.b) + "</span></li>";
  });
  storeHost.innerHTML = html;
}

/* Render cheat sheet */
const cheatHost = $("#cheatRows");
if (cheatHost) {
  let html = '<div class="me-cheat-row me-cheat-head"><span>Action</span><span>How</span></div>';
  CHEAT_ROWS.forEach((row) => {
    html += '<div class="me-cheat-row"><span class="me-cheat-a">' + esc(row.a) + "</span><span class=\"me-cheat-h\">" + esc(row.h) + "</span></div>";
  });
  cheatHost.innerHTML = html;
}

/* Header scroll shadow */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Mobile nav toggle */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}
