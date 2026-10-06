/* Homepage: builds every data-driven block from data.js, then wires the nav. */

const projectsById = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
const activitiesById = Object.fromEntries(EXTRACURRICULAR.map((a) => [a.id, a]));

function renderHero() {
  document.getElementById('hero-eyebrow').textContent = `${PROFILE.course} · ${PROFILE.location}`;
  document.getElementById('hero-bio').textContent = PROFILE.bio;
  document.getElementById('hero-links').append(
    el('a', { className: 'btn btn--primary', text: 'Email me', attrs: { href: `mailto:${PROFILE.email}` } }),
    el('a', { className: 'btn', attrs: { href: PROFILE.github, target: '_blank', rel: 'noopener' } }, [
      githubIcon(),
      document.createTextNode('GitHub ↗'),
    ])
  );
  const pic = document.getElementById('hero-pic');
  pic.append(
    PROFILE.portrait
      ? el('img', { attrs: { src: PROFILE.portrait, alt: PROFILE.name, decoding: 'async' } })
      : el('span', { className: 'hero__initials', text: PROFILE.initials })
  );
}

function renderFacts() {
  const facts = [
    ['Projects', pad2(PROJECTS.length), ''],
    ['Focus', PROFILE.focus, ''],
    ['Status', PROFILE.status, 'facts__v--live'],
  ];
  const list = document.getElementById('facts');
  facts
    .filter(([, value]) => value)
    .forEach(([term, value, modifier]) => {
      list.append(el('div', {}, [el('dt', { className: 'label', text: term }), el('dd', { className: `facts__v ${modifier}`.trim(), text: value })]));
    });
}

function colorDot(color) {
  const dot = el('i', { className: 'dot', attrs: { 'aria-hidden': 'true' } });
  dot.style.background = color;
  return dot;
}

function langDot(project) {
  const lang = projectLang(project);
  return el('span', { className: 'lang' }, [colorDot(lang.color), document.createTextNode(lang.name)]);
}

function winPill(project) {
  const win = winFor(project.id, EXTRACURRICULAR);
  return win ? el('span', { className: 'chip chip--win', text: `🏆 ${win.result}` }) : null;
}

/* Projects with a demo video get a big feature block; the rest are index rows. */
function renderWorks() {
  document.getElementById('projects-meta').textContent = `${pad2(PROJECTS.length)} projects`;
  const list = document.getElementById('works');
  PROJECTS.forEach((project, i) => list.append(project.video ? featureBlock(project, i) : workRow(project, i)));
}

function workRow(project, i) {
  const row = el('a', { className: 'work', attrs: { href: `project.html?id=${project.id}` } }, [
    el('span', { className: 'work__n', text: pad2(i + 1) }),
    el('span', { className: 'work__title' }, [document.createTextNode(project.title), winPill(project)]),
    el('span', { className: 'work__cat', text: project.category }),
    langDot(project),
    el('span', { className: 'work__year', text: String(project.year) }),
    el('span', { className: 'work__arrow', text: '→', attrs: { 'aria-hidden': 'true' } }),
  ]);
  row.dataset.preview = project.id;
  return row;
}

function featureBlock(project, i) {
  const lang = projectLang(project);
  const shot = el('div', { className: 'feature__shot' }, [
    el('img', { attrs: { src: project.cover, alt: `${project.title} demo`, loading: 'lazy' } }),
    el('span', { className: 'feature__badge', text: '▶ Demo' }),
  ]);
  const card = el('a', { className: 'feature', attrs: { href: `project.html?id=${project.id}` } }, [
    shot,
    el('div', { className: 'feature__body' }, [
      el('p', { className: 'label', text: `${pad2(i + 1)} · Featured · ${project.category} · ${project.year}` }),
      el('h3', { text: project.title }),
      el('p', { className: 'feature__summary', text: project.summary }),
      el('div', { className: 'chips' }, [
        winPill(project),
        el('span', { className: 'chip' }, [colorDot(lang.color), document.createTextNode(lang.name)]),
        ...project.techStack
          .filter((t) => t !== lang.name)
          .slice(0, 3)
          .map((t) => el('span', { className: 'chip', text: t })),
      ]),
      el('span', { className: 'more', text: 'View project →' }),
    ]),
  ]);
  setupHoverVideo(card, shot, project.video);
  return card;
}

/*
 * Plays the demo muted and looping inside its feature block while the block
 * is hovered or focused. The <video> is only created on first hover, so the
 * file never downloads for visitors who don't hover. Skipped on touch screens
 * and for reduced motion, which keep the still cover.
 */
function setupHoverVideo(card, shot, src) {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let video = null;
  const play = () => {
    if (!video) {
      video = el('video', { className: 'feature__video', attrs: { src, loop: '', playsinline: '', preload: 'none', 'aria-hidden': 'true' } });
      video.muted = true; // the muted attribute alone doesn't mute a video added from JS
      shot.append(video);
    }
    shot.classList.add('is-playing');
    video.play().catch(() => {});
  };
  const stop = () => {
    shot.classList.remove('is-playing');
    if (video) video.pause();
  };
  card.addEventListener('mouseenter', play);
  card.addEventListener('focus', play);
  card.addEventListener('mouseleave', stop);
  card.addEventListener('blur', stop);
}

function renderAbout() {
  document.getElementById('readme-meta').textContent = PROFILE.school;
  const photo = document.getElementById('about-photo');
  if (ABOUT.photo) {
    photo.append(el('img', { attrs: { src: ABOUT.photo, alt: PROFILE.name, loading: 'lazy' } }));
  } else {
    photo.parentElement.classList.add('readme__body--text-only');
    photo.remove();
  }
  const text = document.getElementById('about-text');
  ABOUT.paragraphs.forEach((p) => text.append(el('p', { text: p })));

  const toolkit = document.getElementById('toolkit');
  SKILLS.forEach(({ group, items }) => {
    toolkit.append(
      el('h3', { className: 'label', text: group }),
      el(
        'ul',
        { className: 'chips' },
        items.map((item) => el('li', { className: 'chip' }, [LANG_COLORS[item] ? colorDot(LANG_COLORS[item]) : null, document.createTextNode(item)]))
      )
    );
  });
}

/* Month-by-month activity graph built from each entry's `period`. */
function renderGraph() {
  const graph = document.getElementById('graph');
  const entries = [...PROJECTS, ...EXTRACURRICULAR].map((x) => ({ title: shortTitle(x.title), period: x.period }));
  const years = buildGraph(entries);
  if (!years.length) {
    graph.remove();
    return;
  }
  const header = el('div', { className: 'graph__row graph__months', attrs: { 'aria-hidden': 'true' } }, [
    el('span'),
    ...'JFMAMJJASOND'.split('').map((m) => el('span', { text: m })),
  ]);
  const rows = years.map(({ year, months }) =>
    el('div', { className: 'graph__row' }, [el('span', { className: 'graph__year', text: String(year) }), ...months.map(graphCell)])
  );
  const key = el('span', { className: 'graph__key', attrs: { 'aria-hidden': 'true' } }, [
    document.createTextNode('Less'),
    ...[0, 1, 2, 3, 4].map((level) => el('i', { className: `graph__cell graph__cell--l${level}` })),
    document.createTextNode('More'),
  ]);
  graph.append(
    header,
    ...rows,
    el('div', { className: 'graph__legend' }, [el('span', { text: 'One square per month. Hover a square to see what happened.' }), key])
  );
}

function graphCell(month, index) {
  const classes = ['graph__cell', `graph__cell--l${month.level}`];
  if (month.future) classes.push('graph__cell--future');
  if (index < 2) classes.push('graph__cell--start');
  if (index > 9) classes.push('graph__cell--end');
  const cell = el('span', { className: classes.join(' ') });
  if (!month.items.length) {
    cell.setAttribute('aria-hidden', 'true');
    return cell;
  }
  const count = `${month.items.length} item${month.items.length === 1 ? '' : 's'}`;
  cell.setAttribute('tabindex', '0');
  cell.setAttribute('role', 'img');
  cell.setAttribute('aria-label', `${month.label}, ${count}: ${month.items.join(', ')}`);
  cell.append(
    el('span', { className: 'graph__tip', attrs: { 'aria-hidden': 'true' } }, [
      el('b', { text: `${month.label} · ${count}` }),
      document.createTextNode(month.items.join(' · ')),
    ])
  );
  return cell;
}

function renderTimeline() {
  document.getElementById('beyond-meta').textContent = `${pad2(EXTRACURRICULAR.length)} entries`;
  const list = document.getElementById('timeline');
  EXTRACURRICULAR.forEach((entry) => {
    const win = isWin(entry);
    const row = el('a', { className: `ledger__row${win ? ' is-win' : ''}`, attrs: { href: `activity.html?id=${entry.id}` } }, [
      el('span', { className: 'ledger__node', attrs: { 'aria-hidden': 'true' } }),
      el('span', { className: 'ledger__date', text: entry.year }),
      el('span', { className: 'ledger__what' }, [
        el('span', { className: 'ledger__title', text: entry.title }),
        el('span', { className: 'ledger__org', text: entry.org }),
      ]),
      el('span', { className: 'ledger__tag', text: entry.tag }),
      el('span', { className: 'ledger__result', text: win ? `🏆 ${entry.result}` : entry.result }),
    ]);
    row.dataset.preview = entry.id;
    list.append(el('li', {}, [row]));
  });
}

/*
 * Floating preview card that follows the cursor over project rows and Beyond
 * Class rows. One card serves both lists; `fill(row)` returns its contents.
 * Skipped on touch screens, where rows just open their page on tap.
 */
let previewCard = null;

function setupHoverPreview(rows, fill) {
  if (!rows.length || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (!previewCard) {
    previewCard = el('div', { className: 'preview', attrs: { 'aria-hidden': 'true' } });
    document.body.append(previewCard);
    window.addEventListener('scroll', () => previewCard.classList.remove('is-visible'), { passive: true });
  }
  const card = previewCard;
  const OFFSET = 20;
  let frame = 0;

  function move(x, y) {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const { width, height } = card.getBoundingClientRect();
      // Flip to the other side of the cursor near the right/bottom edges.
      const left = x + OFFSET + width > window.innerWidth ? x - OFFSET - width : x + OFFSET;
      const top = y + OFFSET + height > window.innerHeight ? y - OFFSET - height : y + OFFSET;
      card.style.transform = `translate(${Math.max(8, left)}px, ${Math.max(8, top)}px)`;
    });
  }

  rows.forEach((row) => {
    row.addEventListener('mouseenter', (e) => {
      card.replaceChildren(...fill(row).filter(Boolean)); // replaceChildren would print "null"
      card.classList.add('is-visible');
      move(e.clientX, e.clientY);
    });
    row.addEventListener('mousemove', (e) => {
      card.classList.add('is-visible'); // re-show after a scroll hid it
      move(e.clientX, e.clientY);
    });
    row.addEventListener('mouseleave', () => card.classList.remove('is-visible'));
  });
}

function previewImage(src) {
  return src ? el('img', { className: 'preview__img', attrs: { src, alt: '' } }) : null;
}

function setupPreviews() {
  setupHoverPreview(document.querySelectorAll('.work'), (row) => {
    const project = projectsById[row.dataset.preview];
    const picture = project.cover || (project.gallery && project.gallery[0]);
    return [
      previewImage(picture),
      el('p', { className: 'preview__text', text: project.summary }),
      picture ? null : el('p', { className: 'preview__stack', text: project.techStack.join(' · ') }),
      el('span', { className: 'more', text: 'View project →' }),
    ];
  });
  setupHoverPreview(document.querySelectorAll('.ledger__row'), (row) => {
    const activity = activitiesById[row.dataset.preview];
    return [
      previewImage((activity.images && activity.images[0]) || activity.banner),
      el('p', { className: 'preview__text', text: activity.description || `${activity.org} · ${activity.date}` }),
      el('span', { className: 'more', text: 'View details →' }),
    ];
  });
}

function renderFooter() {
  document.getElementById('footer-email').href = `mailto:${PROFILE.email}`;
  document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${PROFILE.name}`;
  document.getElementById('footer-place').textContent = PROFILE.location;
  document.getElementById('footer-links').append(
    el('a', { text: 'GitHub ↗', attrs: { href: PROFILE.github, target: '_blank', rel: 'noopener' } }),
    el('a', { text: 'Email ↗', attrs: { href: `mailto:${PROFILE.email}` } })
  );
}

/* Underlines the nav link of whichever section is in view and slides the line to it. */
function setupScrollSpy() {
  const list = document.getElementById('nav-links');
  const links = list.querySelectorAll('a');
  const byId = Object.fromEntries([...links].map((a) => [a.dataset.section, a]));
  const indicator = el('li', { className: 'nav__indicator', attrs: { 'aria-hidden': 'true' } });
  list.append(indicator);

  function activate(section) {
    const link = byId[section.id];
    if (!link) return;
    links.forEach((a) => a.classList.remove('is-active'));
    link.classList.add('is-active');
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    indicator.style.opacity = '1';
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && activate(entry.target)),
    { rootMargin: '-45% 0px -50% 0px' }
  );
  Object.keys(byId).forEach((id) => observer.observe(document.getElementById(id)));
}

function setupReveal() {
  reveal(document.querySelectorAll('.section-head, .feature, .work, .readme, .graph, .ledger li, .footer__big'));
}

renderNav({ home: true });
renderHero();
renderFacts();
renderWorks();
renderAbout();
renderGraph();
renderTimeline();
renderFooter();
setupPreviews();
setupScrollSpy();
setupReveal();
renderIcons();
