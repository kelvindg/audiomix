import { MIXING_TIPS } from './data.js';

const $ = (sel) => document.querySelector(sel);

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

const grid = $('#tipsGrid');
if (grid) {
  let html = "";
  MIXING_TIPS.forEach((tip, i) => {
    html +=
      '<article class="tip-card">' +
        '<span class="tip-num">TIP ' + String(i + 1).padStart(2, "0") + '</span>' +
        '<h3>' + esc(tip.title) + '</h3>' +
        '<p>' + esc(tip.body) + '</p>' +
      '</article>';
  });
  grid.innerHTML = html;
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
