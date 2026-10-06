/* Project detail page: reads ?id= from the URL and builds the page from PROJECTS. */

const OWNER_ICONS = {
  ui: 'monitor',
  logic: 'workflow',
  database: 'database',
  model: 'bot',
  cloud: 'cloud',
  deployment: 'container',
  auth: 'shield-check',
  analytics: 'chart-column',
  hardware: 'wrench',
  research: 'file-text',
};

function renderNotFound(root) {
  document.title = 'Project not found — Julianna Lacaden';
  root.append(
    el('div', { className: 'not-found' }, [
      el('p', { className: 'label', text: '404' }),
      el('h1', { text: 'Project not found' }),
      el('p', { text: "That project doesn't exist, or the link is missing part of its address." }),
      backLink('index.html#projects', 'All projects'),
    ])
  );
}

function renderHeader(project, win) {
  const links = [
    project.repoUrl
      ? el('a', { className: 'btn', attrs: { href: project.repoUrl, target: '_blank', rel: 'noopener' } }, [
          githubIcon(),
          document.createTextNode('View on GitHub ↗'),
        ])
      : null,
    project.liveUrl
      ? el('a', { className: 'btn btn--primary', text: 'View live site ↗', attrs: { href: project.liveUrl, target: '_blank', rel: 'noopener' } })
      : null,
  ].filter(Boolean);
  return el('header', { className: 'detail-head' }, [
    el('p', { className: 'label', text: `${project.category} · ${project.year}` }),
    el('h1', { text: project.title }),
    el('p', { className: 'lead', text: project.summary }),
    el('div', { className: 'chips' }, [
      win ? el('span', { className: 'chip chip--win', text: `🏆 ${win.result} · ${shortTitle(win.title)}` }) : null,
      ...project.techStack.map((t) => techChip(t)),
    ]),
    links.length ? el('div', { className: 'btns' }, links) : null,
  ]);
}

function renderOwnership(nodes) {
  const row = el('div', { className: 'owners' });
  nodes.forEach((node, i) => {
    if (i > 0) row.append(el('span', { className: 'owner-arrow', text: '→', attrs: { 'aria-hidden': 'true' } }));
    const isYou = node.owner === 'you';
    row.append(
      el('div', { className: `owner${isYou ? ' owner--you' : ''}` }, [
        icon(OWNER_ICONS[node.type] || 'box', 'owner__icon'),
        el('span', { className: 'owner__who', text: isYou ? 'YOU' : 'TEAM' }),
        el('p', { className: 'owner__label', text: node.label }),
        node.note ? el('p', { className: 'owner__note', text: node.note }) : null,
      ])
    );
  });
  const legend = el('div', { className: 'legend' }, [
    el('span', { className: 'legend--you', text: 'Built by me' }),
    el('span', { text: 'Built by teammates' }),
  ]);
  return block('Who built what', [row, legend]);
}

function renderContent(project) {
  return el('div', { className: 'content' }, [
    block('Overview', [el('p', { text: project.overviewBody })]),
    block('Key features', [
      el(
        'ol',
        { className: 'features' },
        project.keyFeatures.map((f, i) => el('li', {}, [el('span', { text: pad2(i + 1) }), el('p', { text: f })]))
      ),
    ]),
    project.architecture ? renderOwnership(project.architecture) : null,
    project.video
      ? block('Demo', [
          el('div', { className: 'gallery__stage' }, [
            el('video', {
              className: 'gallery__video',
              attrs: { src: project.video, poster: project.cover || '', controls: '', preload: 'metadata', playsinline: '', 'aria-label': `${project.title} demo video` },
            }),
          ]),
        ])
      : null,
    project.gallery
      ? block(project.galleryLabel || 'Screenshots', [
          project.mediaNote ? el('p', { className: 'media-note', text: project.mediaNote }) : null,
          renderGallery(project.gallery, `${project.title} ${(project.galleryLabel || 'screenshot').toLowerCase()}`),
        ])
      : null,
    block('Key challenge', [el('p', { text: project.keyChallenge })]),
    block('Outcome', [el('p', { className: 'outcome', text: project.outcome })]),
  ]);
}

function renderPager(index) {
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return el('nav', { className: 'pager', attrs: { 'aria-label': 'Project navigation' } }, [
    backLink('index.html#projects', 'All projects'),
    el('a', { className: 'pager__next', attrs: { href: `project.html?id=${next.id}` } }, [
      el('span', { className: 'label', text: 'Next →' }),
      el('strong', { text: next.title }),
    ]),
  ]);
}

function renderProject() {
  const root = document.getElementById('project');
  const id = new URLSearchParams(window.location.search).get('id');
  const index = PROJECTS.findIndex((p) => p.id === id);

  renderNav({ current: 'projects' });
  root.append(crumb('index.html#projects', 'All projects', index >= 0 ? pad2(index + 1) : ''));
  if (index < 0) {
    renderNotFound(root);
    return;
  }

  const project = PROJECTS[index];
  const win = winFor(project.id, EXTRACURRICULAR);
  document.title = `${project.title} — Julianna Lacaden`;
  root.append(
    renderHeader(project, win),
    metaList([
      ['Role', project.role],
      ['Duration', project.duration],
      win ? ['Result', win.result, true] : null,
    ]),
    renderContent(project),
    renderPager(index)
  );
  reveal(root.querySelectorAll('.detail-head, .meta, .block, .pager'));
}

renderProject();
renderIcons();
