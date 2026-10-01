/*
 * Screenshot carousel with a fullscreen lightbox.
 * renderGallery(images, title) returns the inline carousel element; clicking its
 * image opens the #lightbox overlay that lives in project.html.
 */

function renderGallery(images, title) {
  let current = 0;

  const img = el('img', { className: 'gallery__img', attrs: { alt: '', tabindex: '0', role: 'button' } });
  const count = el('span', { className: 'label' });
  const prev = el('button', { attrs: { 'aria-label': 'Previous screenshot' } }, [icon('chevron-left')]);
  const next = el('button', { attrs: { 'aria-label': 'Next screenshot' } }, [icon('chevron-right')]);

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCount = document.getElementById('lightbox-count');

  function show(i) {
    current = (i + images.length) % images.length;
    const alt = `${title} screenshot ${current + 1} of ${images.length}`;
    const counter = `${current + 1} / ${images.length}`;
    img.src = images[current];
    img.alt = alt;
    count.textContent = counter;
    lbImg.src = images[current];
    lbImg.alt = alt;
    lbCount.textContent = counter;
  }

  function openLightbox() {
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
    document.getElementById('lightbox-close').focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove('no-scroll');
    img.focus();
  }

  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  img.addEventListener('click', openLightbox);
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox();
    }
  });

  document.getElementById('lightbox-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('lightbox-next').addEventListener('click', () => show(current + 1));
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  show(0);

  return el('div', { className: 'gallery' }, [
    el('div', { className: 'gallery__stage' }, [img]),
    el('div', { className: 'gallery__bar' }, [count, el('div', { className: 'gallery__btns' }, [prev, next])]),
  ]);
}
