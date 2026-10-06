/* Activity detail page: reads ?id= from the URL and builds the page from EXTRACURRICULAR. */

function renderActivity() {
  const root = document.getElementById('activity');
  const id = new URLSearchParams(window.location.search).get('id');
  const index = EXTRACURRICULAR.findIndex((a) => a.id === id);
  const total = EXTRACURRICULAR.length;

  renderNav({ current: 'beyond' });
  root.append(crumb('index.html#beyond', 'Beyond class', index >= 0 ? pad2(index + 1) : ''));

  if (index < 0) {
    document.title = 'Activity not found — Julianna Lacaden';
    root.append(
      el('div', { className: 'not-found' }, [
        el('p', { className: 'label', text: '404' }),
        el('h1', { text: 'Activity not found' }),
        el('p', { text: "That activity doesn't exist, or the link is missing part of its address." }),
        backLink('index.html#beyond', 'Beyond class'),
      ])
    );
    return;
  }

  const activity = EXTRACURRICULAR[index];
  const win = isWin(activity);
  document.title = `${activity.title} — Julianna Lacaden`;

  const header = el('header', { className: 'detail-head' }, [
    el('p', { className: 'label', text: activity.tag }),
    el('h1', { text: activity.title }),
    activity.result
      ? el('span', { className: `chip${win ? ' chip--win' : ''}`, text: win ? `🏆 ${activity.result}` : activity.result })
      : null,
  ]);
  const banner = activity.banner
    ? el('div', { className: 'detail-banner' }, [el('img', { attrs: { src: activity.banner, alt: `${activity.title} banner` } })])
    : null;
  const meta = metaList([
    ['Where', activity.org],
    ['When', activity.date],
    ['Result', activity.result, win],
  ]);

  const project = PROJECTS.find((p) => p.id === activity.project);
  const content = el('div', { className: 'content' }, [
    activity.description ? block('What', [el('p', { className: 'lead', text: activity.description })]) : null,
    project
      ? block('Project', [
          el('p', { text: project.title }),
          el('div', { className: 'btns' }, [
            el('a', { className: 'btn btn--primary', attrs: { href: `project.html?id=${project.id}` } }, [
              el('span', { text: 'See project' }),
              icon('arrow-up-right'),
            ]),
          ]),
        ])
      : null,
    activity.images && activity.images.length
      ? block(activity.images.length > 1 ? 'Pictures' : 'Picture', [renderGallery(activity.images, `${activity.title} picture`)])
      : null,
  ]);

  const next = EXTRACURRICULAR[(index + 1) % total];
  const pager = el('nav', { className: 'pager', attrs: { 'aria-label': 'Activity navigation' } }, [
    backLink('index.html#beyond', 'Beyond class'),
    el('a', { className: 'pager__next', attrs: { href: `activity.html?id=${next.id}` } }, [
      el('span', { className: 'label', text: 'Next →' }),
      el('strong', { text: next.title }),
    ]),
  ]);

  root.append(...[header, banner, meta, content, pager].filter(Boolean)); // append(null) would print "null"
  reveal(root.querySelectorAll('.detail-head, .detail-banner, .meta, .block, .pager'));
}

renderActivity();
renderIcons();
