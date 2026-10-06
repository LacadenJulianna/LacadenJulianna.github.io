/* Small DOM helpers shared by the page scripts. */

/**
 * Create an element. Text is always set with textContent, never innerHTML,
 * so content from data.js can't inject markup.
 *   el('p', { className: 'label', text: 'Hello', attrs: { href: '#' } }, [children])
 */
function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text != null) node.textContent = options.text;
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) node.setAttribute(key, value);
  }
  for (const child of children) {
    if (child) node.append(child);
  }
  return node;
}

/** Lucide icon placeholder; call renderIcons() after inserting it. */
function icon(name, className = '') {
  return el('i', { className, attrs: { 'data-lucide': name, 'aria-hidden': 'true' } });
}

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

/** Lucide dropped brand icons, so GitHub is drawn inline. */
function githubIcon() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(ns, 'path');
  path.setAttribute(
    'd',
    'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z'
  );
  svg.append(path);
  return svg;
}

/** "← Back"-style link used on the detail pages. */
function backLink(href, text) {
  return el('a', { className: 'back', attrs: { href } }, [icon('arrow-left'), document.createTextNode(text)]);
}

/** Small round colour swatch (decorative). */
function colorDot(color) {
  const dot = el('i', { className: 'dot', attrs: { 'aria-hidden': 'true' } });
  dot.style.background = color;
  return dot;
}

/** Tech-stack chip with its colour dot (techColor from logic.js). */
function techChip(name, tag = 'span') {
  const color = techColor(name);
  const chip = el(tag, { className: 'chip' }, [colorDot(color), document.createTextNode(name)]);
  chip.style.setProperty('--c', color); // lets a section tint the whole chip (see .stack)
  return chip;
}

/**
 * Site nav, shared by every page. On the homepage the links jump to sections
 * (home.js adds the scroll spy); on detail pages they lead back to index.html
 * and `current` underlines the section the page belongs to.
 */
function renderNav({ home = false, current = '' } = {}) {
  const nav = document.getElementById('nav');
  const base = home ? '' : 'index.html';
  const link = (id, text, count) => {
    const a = el('a', { attrs: { href: `${base}#${id}` } }, [
      document.createTextNode(text),
      count != null ? el('span', { className: 'count', text: String(count) }) : null,
    ]);
    a.dataset.section = id;
    if (id === current) a.classList.add('is-current');
    return el('li', {}, [a]);
  };
  const links = el('ul', { className: 'nav__links', attrs: { id: 'nav-links' } }, [
    link('projects', 'Projects', PROJECTS.length),
    link('about', 'About'),
    link('beyond', 'Beyond', EXTRACURRICULAR.length),
  ]);
  const brand = el('a', { className: 'nav__brand', attrs: { href: home ? '#top' : 'index.html' } }, [
    document.createTextNode('julianna'),
    el('span', { text: '.' }),
    document.createTextNode('lacaden'),
  ]);
  const toggle = el(
    'button',
    { className: 'nav__toggle', attrs: { type: 'button', 'aria-label': 'Open menu', 'aria-expanded': 'false', 'aria-controls': 'nav-links' } },
    [icon('menu')]
  );
  nav.append(el('div', { className: 'nav__inner' }, [brand, toggle, links]));

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

/** "← All projects / 04" line at the top of the detail pages. */
function crumb(href, text, number) {
  return el('div', { className: 'crumb label' }, [backLink(href, text), number ? el('span', { text: `/ ${number}` }) : null]);
}

/** Detail-page section: mono label on the left, content on the right. */
function block(labelText, children) {
  return el('section', { className: 'block' }, [
    el('h2', { className: 'label block__label', text: labelText }),
    el('div', { className: 'block__body' }, children),
  ]);
}

/** Detail-page meta strip from [term, value, highlight?] rows; rows without a value are skipped. */
function metaList(rows) {
  return el(
    'dl',
    { className: 'meta' },
    rows
      .filter((row) => row && row[1])
      .map(([term, value, highlight]) =>
        el('div', {}, [el('dt', { className: 'label', text: term }), el('dd', { className: highlight ? 'is-win' : '', text: value })])
      )
  );
}

/**
 * Fade-up elements as they scroll into view, once each. Elements that enter
 * in the same frame ripple in 60ms apart. Does nothing when the visitor
 * prefers reduced motion (or the browser lacks IntersectionObserver), so
 * content is simply shown.
 */
function reveal(elements) {
  const nodes = [...elements].filter(Boolean);
  if (!nodes.length) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const STEP = 60;
  const DURATION = 600;
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, i) => {
          const node = entry.target;
          observer.unobserve(node);
          const delay = Math.min(i, 6) * STEP;
          node.style.setProperty('--delay', `${delay}ms`);
          node.classList.add('is-in');
          // Drop the reveal classes afterwards so the element's own hover
          // transitions aren't slowed by the reveal delay.
          setTimeout(() => {
            node.classList.remove('reveal', 'is-in');
            node.style.removeProperty('--delay');
          }, DURATION + delay + 50);
        });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  nodes.forEach((node) => {
    node.classList.add('reveal');
    observer.observe(node);
  });
}

/** 0 -> "01" */
function pad2(n) {
  return String(n).padStart(2, '0');
}
