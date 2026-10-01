/* Homepage: builds every data-driven block from data.js, then wires the nav. */

const TAG_COLORS = {
  Leadership: 'var(--yellow)',
  Hackathon: 'var(--pink)',
  Competition: 'var(--orange)',
  License: 'var(--green)',
};

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
  PROJECTS.forEach((project, i) => {
    // Projects with screenshots get a full-width "feature" card.
    const className = project.gallery ? 'card work work--feature' : 'card work';
    const card = el('a', { className, attrs: { href: `project.html?id=${project.id}` } }, [
      el('div', { className: 'work__top' }, [
        el('span', { className: 'label label--yellow', text: `${pad2(i + 1)} / ${project.category}` }),
        icon('arrow-up-right', 'work__arrow'),
      ]),
      project.gallery
        ? el('div', { className: 'work__shot' }, [
            el('img', { attrs: { src: project.gallery[0], alt: `${project.title} screenshot`, loading: 'lazy' } }),
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
    list.append(
      el('li', { className: 'timeline__row' }, [
        pill,
        el('div', {}, [
          el('p', { className: 'timeline__title', text: entry.title }),
          el('p', { className: 'tag', text: `${entry.org} · ${entry.date}` }),
        ]),
        el('span', { className: 'badge', text: entry.result }),
      ])
    );
  });
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
renderFooter();
setupScrollSpy();
setupMobileMenu();
renderIcons();
