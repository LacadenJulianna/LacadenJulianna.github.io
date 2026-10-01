/* Homepage: builds every data-driven block from data.js, then wires the nav. */

function renderProfile() {
  document.getElementById('hero-bio').textContent = PROFILE.bio;
  document.getElementById('profile-initials').textContent = PROFILE.initials;
  document.getElementById('profile-name').textContent = PROFILE.name;
  document.getElementById('profile-location').textContent = PROFILE.location;

  const links = document.getElementById('profile-links');
  const github = el('a', {
    className: 'icon-btn',
    attrs: { href: PROFILE.github, target: '_blank', rel: 'noopener', 'aria-label': 'GitHub' },
  });
  github.append(githubIcon());
  const mail = el(
    'a',
    { className: 'icon-btn', attrs: { href: `mailto:${PROFILE.email}`, 'aria-label': 'Email' } },
    [icon('mail')]
  );
  links.append(github, mail);
}

function renderWorks() {
  const grid = document.getElementById('works');
  let textRun = 0; // text-only cards since the last full-width card
  PROJECTS.forEach((project, i) => {
    // Projects with images get a full-width "feature" card. Text cards sit in
    // pairs; one left without a partner spans the row instead of leaving a gap.
    let className = 'card work';
    if (project.gallery) {
      className += ' work--feature';
      textRun = 0;
    } else {
      textRun++;
      const nextIsFullWidth = !PROJECTS[i + 1] || PROJECTS[i + 1].gallery;
      if (nextIsFullWidth && textRun % 2 === 1) className += ' work--wide';
    }
    const card = el('a', { className, attrs: { href: `project.html?id=${project.id}` } }, [
      el('div', { className: 'work__top' }, [
        el('span', { className: 'label label--yellow', text: `${pad2(i + 1)} / ${project.category}` }),
        icon('arrow-up-right', 'work__arrow'),
      ]),
      project.gallery
        ? el('div', { className: 'work__shot' }, [
            el('img', { attrs: { src: project.cover || project.gallery[0], alt: `${project.title} ${(project.galleryLabel || 'screenshot').toLowerCase()}`, loading: 'lazy' } }),
          ])
        : null,
      el('h3', { text: project.title }),
      el('p', { className: 'work__summary', text: project.summary }),
      el('p', { className: 'tag work__stack', text: project.techStack.join(' • ') }),
    ]);
    grid.append(card);
  });
}

function renderAbout() {
  const text = document.getElementById('about-text');
  ABOUT.paragraphs.forEach((p) => text.append(el('p', { text: p })));

  const toolkit = document.getElementById('toolkit');
  SKILLS.forEach(({ group, items }) => {
    toolkit.append(
      el('div', {}, [el('h4', { text: group }), el('ul', {}, items.map((item) => el('li', { text: item })))])
    );
  });
}

function renderTimeline() {
  const list = document.getElementById('timeline');
  EXTRACURRICULAR.forEach((entry) => {
    const pill = el('span', { className: 'pill', text: entry.year });
    pill.style.color = TAG_COLORS[entry.tag] || 'var(--muted)';
    const row = el('a', { className: 'timeline__row', attrs: { href: `activity.html?id=${entry.id}` } }, [
      pill,
      el('div', {}, [
        el('p', { className: 'timeline__title', text: entry.title }),
        el('p', { className: 'tag', text: `${entry.org} · ${entry.date}` }),
      ]),
      el('span', { className: 'badge', text: entry.result }),
    ]);
    row.dataset.activity = entry.id;
    list.append(el('li', {}, [row]));
  });
}

/*
 * Floating preview card that follows the cursor over Beyond Class rows.
 * Shows the first picture (if any) and the description. Skipped on touch
 * screens, where rows just open their page on tap.
 */
function setupTimelinePreview() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const card = el('div', { className: 'preview', attrs: { 'aria-hidden': 'true' } });
  document.body.append(card);
  const byId = Object.fromEntries(EXTRACURRICULAR.map((a) => [a.id, a]));
  const OFFSET = 20;
  let frame = 0;

  function fill(activity) {
    const picture = activity.images?.[0] || activity.banner;
    const parts = [
      picture ? el('img', { className: 'preview__img', attrs: { src: picture, alt: '' } }) : null,
      el('p', { className: 'preview__text', text: activity.description || `${activity.org} · ${activity.date}` }),
      el('span', { className: 'label label--yellow', text: 'View details →' }),
    ];
    card.replaceChildren(...parts.filter(Boolean)); // replaceChildren would print "null"
  }

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

  document.querySelectorAll('.timeline__row').forEach((row) => {
    row.addEventListener('mouseenter', (e) => {
      fill(byId[row.dataset.activity]);
      card.classList.add('is-visible');
      move(e.clientX, e.clientY);
    });
    row.addEventListener('mousemove', (e) => {
      card.classList.add('is-visible'); // re-show after a scroll hid it
      move(e.clientX, e.clientY);
    });
    row.addEventListener('mouseleave', () => card.classList.remove('is-visible'));
  });
  window.addEventListener('scroll', () => card.classList.remove('is-visible'), { passive: true });
}

function renderFooter() {
  document.getElementById('footer-meta').textContent = `${PROFILE.course} • ${PROFILE.school}`;
  const links = document.getElementById('footer-links');
  const github = el('a', { text: 'GitHub', attrs: { href: PROFILE.github, target: '_blank', rel: 'noopener' } });
  github.style.color = 'var(--pink)';
  const email = el('a', { text: 'Email', attrs: { href: `mailto:${PROFILE.email}` } });
  email.style.color = 'var(--yellow)';
  links.append(github, email);
}

/* Highlights the nav link of whichever section is currently in view. */
function setupScrollSpy() {
  const links = document.querySelectorAll('.nav__links a');
  const byId = Object.fromEntries([...links].map((a) => [a.dataset.section, a]));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        byId[entry.target.id]?.classList.add('is-active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  Object.keys(byId).forEach((id) => observer.observe(document.getElementById(id)));
}

function setupMobileMenu() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

renderProfile();
renderWorks();
renderAbout();
renderTimeline();
setupTimelinePreview();
renderFooter();
setupScrollSpy();
setupMobileMenu();
renderIcons();
