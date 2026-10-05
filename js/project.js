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
    el('div', { className: 'card not-found' }, [
      el('p', { className: 'label label--pink', text: '404' }),
      el('h1', { text: 'Project not found' }),
      el('p', { text: "That project doesn't exist, or the link is missing part of its address." }),
      backLink('index.html#projects', 'All projects'),
    ])
  );
}

function renderHeader(project, index) {
  return el('header', { className: 'card detail-head' }, [
    el('p', { className: 'label label--yellow', text: `${project.category} · ${project.year}` }),
    el('h1', { text: project.title }),
    el(
      'div',
      { className: 'chips' },
      project.techStack.map((t) => el('span', { className: 'chip', text: t }))
    ),
    project.repoUrl
      ? el('a', {
          className: 'repo-link',
          text: 'View on GitHub ↗',
          attrs: { href: project.repoUrl, target: '_blank', rel: 'noopener' },
        })
      : null,
    project.liveUrl
      ? el('a', {
          className: 'repo-link',
          text: 'View live site ↗',
          attrs: { href: project.liveUrl, target: '_blank', rel: 'noopener' },
        })
      : null,
    el('span', { className: 'detail-head__num', text: pad2(index + 1), attrs: { 'aria-hidden': 'true' } }),
  ]);
}

function renderMeta(project) {
  const rows = [
    ['Role', project.role],
    ['Duration', project.duration],
    ['Year', String(project.year)],
    ['Category', project.category],
  ];
  return el(
    'aside',
    { className: 'meta' },
    rows.map(([term, value]) =>
      el('dl', {}, [el('dt', { className: 'label', text: term }), el('dd', { text: value })])
    )
  );
}

function section(labelText, children, labelClass = 'label--yellow') {
  return el('section', {}, [el('span', { className: `label ${labelClass}`, text: labelText }), ...children]);
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
  const legend = el('div', { className: 'legend tag' }, [
    el('span', { className: 'legend--you', text: 'Built by me' }),
    el('span', { text: 'Built by teammates' }),
  ]);
  return section('Who built what', [row, legend]);
}

function renderContent(project) {
  const content = el('div', { className: 'content' }, [
    section('Overview', [el('p', { className: 'lead', text: project.summary }), el('p', { text: project.overviewBody })]),
    section('Key features', [
      el(
        'ol',
        { className: 'features' },
        project.keyFeatures.map((f, i) => el('li', {}, [el('span', { text: pad2(i + 1) }), el('p', { text: f })]))
      ),
    ]),
    project.architecture ? renderOwnership(project.architecture) : null,
    project.video
      ? section('Demo', [
          el('div', { className: 'gallery__stage' }, [
            el('video', {
              className: 'gallery__video',
              attrs: { src: project.video, poster: project.cover || '', controls: '', preload: 'metadata', playsinline: '', 'aria-label': `${project.title} demo video` },
            }),
          ]),
        ])
      : null,
    project.gallery
      ? section(project.galleryLabel || 'Screenshots', [
          project.mediaNote ? el('p', { className: 'media-note', text: project.mediaNote }) : null,
          renderGallery(project.gallery, `${project.title} ${(project.galleryLabel || 'screenshot').toLowerCase()}`),
        ])
      : null,
    el('section', { className: 'card challenge' }, [
      el('span', { className: 'label label--yellow', text: 'Key challenge' }),
      el('p', { text: project.keyChallenge }),
    ]),
    section('Outcome', [el('p', { className: 'outcome', text: project.outcome })]),
  ]);
  return content;
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

  root.append(
    el('div', { className: 'topbar' }, [
      backLink('index.html#projects', 'Back'),
      index >= 0 ? el('span', { className: 'label label--yellow', text: `${pad2(index + 1)} / ${pad2(PROJECTS.length)}` }) : null,
    ])
  );

  if (index < 0) {
    renderNotFound(root);
    return;
  }

  const project = PROJECTS[index];
  document.title = `${project.title} — Julianna Lacaden`;
  root.append(
    renderHeader(project, index),
    el('div', { className: 'detail-body' }, [renderMeta(project), renderContent(project)]),
    renderPager(index)
  );
  reveal(root.querySelectorAll('.detail-head, .meta, .content > section, .pager'));
}

renderProject();
renderIcons();
