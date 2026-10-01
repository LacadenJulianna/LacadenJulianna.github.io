/* Activity detail page: reads ?id= from the URL and builds the page from EXTRACURRICULAR. */

function renderActivity() {
  const root = document.getElementById('activity');
  const id = new URLSearchParams(window.location.search).get('id');
  const index = EXTRACURRICULAR.findIndex((a) => a.id === id);
  const total = EXTRACURRICULAR.length;

  root.append(
    el('div', { className: 'topbar' }, [
      backLink('index.html#beyond', 'Back'),
      index >= 0 ? el('span', { className: 'label label--yellow', text: `${pad2(index + 1)} / ${pad2(total)}` }) : null,
    ])
  );

  if (index < 0) {
    document.title = 'Activity not found — Julianna Lacaden';
    root.append(
      el('div', { className: 'card not-found' }, [
        el('p', { className: 'label label--pink', text: '404' }),
        el('h1', { text: 'Activity not found' }),
        el('p', { text: "That activity doesn't exist, or the link is missing part of its address." }),
        backLink('index.html#beyond', 'Beyond Class'),
      ])
    );
    return;
  }

  const activity = EXTRACURRICULAR[index];
  document.title = `${activity.title} — Julianna Lacaden`;

  const tag = el('span', { className: 'label', text: activity.tag });
  tag.style.color = TAG_COLORS[activity.tag] || 'var(--muted)';

  const headText = [tag, el('h1', { text: activity.title }), el('span', { className: 'badge activity-badge', text: activity.result })];
  // Events with a banner show it full-width at the top of the card, title underneath.
  const header = activity.banner
    ? el('header', { className: 'card detail-head detail-head--banner' }, [
        el('img', { className: 'detail-head__banner', attrs: { src: activity.banner, alt: `${activity.title} banner` } }),
        el('div', { className: 'detail-head__body' }, headText),
      ])
    : el('header', { className: 'card glow glow--pink detail-head' }, headText);

  const meta = el('aside', { className: 'meta' }, [
    el('dl', {}, [el('dt', { className: 'label', text: 'Where' }), el('dd', { text: activity.org })]),
    el('dl', {}, [el('dt', { className: 'label', text: 'Time' }), el('dd', { text: activity.date })]),
  ]);

  const content = el('div', { className: 'content' }, [
    activity.description
      ? el('section', {}, [
          el('span', { className: 'label label--yellow', text: 'What' }),
          el('p', { className: 'lead', text: activity.description }),
        ])
      : null,
    activity.images
      ? el('section', {}, [
          el('span', { className: 'label label--yellow', text: activity.images.length > 1 ? 'Pictures' : 'Picture' }),
          renderGallery(activity.images, `${activity.title} picture`),
        ])
      : null,
  ]);

  const next = EXTRACURRICULAR[(index + 1) % total];
  const pager = el('nav', { className: 'pager', attrs: { 'aria-label': 'Activity navigation' } }, [
    backLink('index.html#beyond', 'Beyond Class'),
    el('a', { className: 'pager__next', attrs: { href: `activity.html?id=${next.id}` } }, [
      el('span', { className: 'label', text: 'Next →' }),
      el('strong', { text: next.title }),
    ]),
  ]);

  root.append(header, el('div', { className: 'detail-body' }, [meta, content]), pager);
}

renderActivity();
renderIcons();
