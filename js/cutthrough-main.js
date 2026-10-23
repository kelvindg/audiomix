import {
  FREQ_BANDS, MASKING_PAIRS, MASKING_CHECKS, LEVERS,
  INSTRUMENT_RECIPES, PLAYBOOK_STEPS, ANTI_MUD_RULES, SOURCES
} from './cutthrough.js';

const $ = (sel) => document.querySelector(sel);

function esc(s) {
  return String(s).replace(/[&<>\"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Frequency bands table
const bandTable = $('#bandTable');
if (bandTable) {
  let rows = FREQ_BANDS.map((b) =>
    '<div class="ct-row">' +
      '<div class="ct-cell ct-band">' + esc(b.band) + '</div>' +
      '<div class="ct-cell ct-range">' + esc(b.range) + '</div>' +
      '<div class="ct-cell ct-ctrl">' + esc(b.ctrl) + '</div>' +
      '<div class="ct-cell ct-note">' + esc(b.note) + '</div>' +
    '</div>'
  ).join('');
  bandTable.innerHTML =
    '<div class="ct-row ct-head">' +
      '<div class="ct-cell">Band</div><div class="ct-cell">Range</div>' +
      '<div class="ct-cell">Controls</div><div class="ct-cell">EQ notes</div>' +
    '</div>' + rows;
}

// Masking pairs
const maskingPairs = $('#maskingPairs');
if (maskingPairs) {
  maskingPairs.innerHTML = MASKING_PAIRS.map((m) =>
    '<div class="ct-mask">' +
      '<div class="ct-mask-pair">' + esc(m.pair) + ' <span class="ct-mask-range">' + esc(m.range) + '</span></div>' +
      '<div class="ct-mask-problem">' + esc(m.problem) + '</div>' +
    '</div>'
  ).join('');
}

// Masking detection checks
const maskingChecks = $('#maskingChecks');
if (maskingChecks) {
  maskingChecks.innerHTML = MASKING_CHECKS.map((c) => '<li>' + esc(c) + '</li>').join('');
}

// Levers
const levers = $('#levers');
if (levers) {
  levers.innerHTML = LEVERS.map((l) =>
    '<div class="ct-lever">' +
      '<h3>' + esc(l.title) + '</h3>' +
      '<span class="ct-lever-sub">' + esc(l.sub) + '</span>' +
      '<p>' + esc(l.body) + '</p>' +
    '</div>'
  ).join('');
}

// Instrument recipes
const recipes = $('#recipes');
if (recipes) {
  recipes.innerHTML = INSTRUMENT_RECIPES.map((r) =>
    '<article class="ct-recipe' + (r.priority ? ' ct-priority' : '') + '">' +
      (r.priority ? '<span class="ct-priority-tag">PRIORITY</span>' : '') +
      '<div class="ct-recipe-head">' +
        '<span class="ct-recipe-icon">' + r.icon + '</span>' +
        '<h3>' + esc(r.name) + '</h3>' +
      '</div>' +
      '<dl class="ct-specs">' +
        '<div class="ct-spec"><dt>Fundamental</dt><dd>' + esc(r.fundamental) + '</dd></div>' +
        '<div class="ct-spec"><dt>HPF</dt><dd>' + esc(r.hpf) + '</dd></div>' +
        '<div class="ct-spec ct-cut"><dt>Cuts (de-mud)</dt><dd>' + esc(r.cuts) + '</dd></div>' +
        '<div class="ct-spec ct-boost"><dt>Boosts (cut-through)</dt><dd>' + esc(r.boosts) + '</dd></div>' +
      '</dl>' +
      '<div class="ct-move"><strong>Cut-through move:</strong> ' + esc(r.move) + '</div>' +
    '</article>'
  ).join('');
}

// Playbook steps
const steps = $('#playbookSteps');
if (steps) {
  steps.innerHTML = PLAYBOOK_STEPS.map((s, i) =>
    '<li><span class="ct-step-num">' + (i + 1) + '</span>' + esc(s) + '</li>'
  ).join('');
}

// Anti-mud rules
const rules = $('#antiMudRules');
if (rules) {
  rules.innerHTML = ANTI_MUD_RULES.map((r) =>
    '<div class="ct-rule"><strong>' + esc(r.head) + ':</strong> ' + esc(r.body) + '</div>'
  ).join('');
}

// Sources
const sources = $('#sourcesList');
if (sources) {
  sources.innerHTML = SOURCES.map((s) =>
    '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a></li>'
  ).join('');
}

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