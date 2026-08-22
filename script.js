(() => {
  'use strict';

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700 && nav && toggle) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });

  const links = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  const metricSelectors = ['.hero-metric strong', '.metric-row b', '.stats-grid b', '.work-card strong', '.case-badge', '.case-grid strong', '.funnel b', '.credentials b'];
  const metrics = [];
  document.querySelectorAll(metricSelectors.join(',')).forEach(el => {
    if (el.querySelector('span')) return;
    const text = el.textContent.trim();
    const match = text.match(/^(.*?)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
    if (!match) return;
    const value = Number(match[2].replace(/,/g, ''));
    if (!Number.isFinite(value) || value === 0) return;
    el.dataset.counterValue = value;
    el.dataset.counterPrefix = match[1];
    el.dataset.counterSuffix = match[3];
    el.dataset.counterDecimals = (match[2].split('.')[1] || '').length;
    el.textContent = `${match[1]}0${match[3]}`;
    metrics.push(el);
  });

  const animate = el => {
    if (el.dataset.counted) return;
    el.dataset.counted = 'true';
    const target = Number(el.dataset.counterValue);
    const decimals = Number(el.dataset.counterDecimals || 0);
    const prefix = el.dataset.counterPrefix || '';
    const suffix = el.dataset.counterSuffix || '';
    const start = performance.now();
    const duration = 1200;
    const format = value => value.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + format(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) animate(entry.target); }), { threshold: 0.25 });
    metrics.forEach(el => counterObserver.observe(el));
  } else metrics.forEach(animate);

  const wa = document.createElement('a');
  wa.href = 'https://wa.me/918088977454?text=Hi%20Deepak%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20performance%20marketing%20opportunity.';
  wa.target = '_blank'; wa.rel = 'noopener noreferrer'; wa.className = 'wa-float';
  wa.setAttribute('aria-label', 'Message Deepak directly on WhatsApp'); wa.title = 'Message me on WhatsApp';
  wa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.3ZM12.1 21.6h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.6 4.8Zm5.4-7.4c-.3-.2-1.7-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 .9-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3Z"/></svg>';
  document.body.appendChild(wa);

  const certs = {
    google: { title: 'AI-Powered Performance Ads – Google', file: 'certificates/Google%20Ads%20Certiicate.pdf' },
    analytics: { title: 'Introduction to Data Analytics — Simplilearn', file: 'certificates/Data%20Analytics%20Certificate.pdf' }
  };

  const modal = document.querySelector('#certModal');
  const dialog = modal?.querySelector('.cert-dialog');
  const preview = modal?.querySelector('#certificatePreview');
  const closeButton = modal?.querySelector('.cert-close');
  let frame = null;
  let hoverCard = null;
  let hoverHideTimer = null;

  const loadPdf = (container, cert, className = '') => {
    container.innerHTML = `<iframe class="${className}" src="${cert.file}#toolbar=0&navpanes=0&scrollbar=1" title="${cert.title}" loading="lazy"></iframe>`;
  };

  const openModal = cert => {
    if (!modal || !preview) return;
    preview.innerHTML = `<iframe class="cert-frame cert-modal-frame" src="${cert.file}#toolbar=1&navpanes=0&scrollbar=1" title="${cert.title}"></iframe>`;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (preview) preview.innerHTML = '<p class="eyebrow">Certificate</p><h2 id="certTitle">Certificate</h2><p id="certBody"></p><div class="certificate-seal">CERTIFIED</div><small id="certMeta"></small>';
  };

  const style = document.createElement('style');
  style.textContent = `
    .cert-hover-card{position:fixed;z-index:180;width:min(520px,calc(100vw - 32px));height:min(680px,calc(100vh - 40px));background:var(--paper);border:1px solid rgba(27,33,28,.15);border-radius:14px;box-shadow:0 25px 70px rgba(0,0,0,.3);padding:8px;opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .18s ease,transform .18s ease,visibility .18s ease;pointer-events:auto}.cert-hover-card.is-visible{opacity:1;visibility:visible;transform:translateY(0)}.cert-hover-card iframe{width:100%;height:100%;border:0;border-radius:9px;background:#fff}.cert-modal-frame{width:100%;height:min(78vh,760px);border:0;border-radius:10px;background:#fff}.cert-link{position:relative}.cert-link:focus-visible{outline:2px solid var(--gold);outline-offset:3px}@media(max-width:700px){.cert-hover-card{display:none}.cert-modal-frame{height:78vh}.cert-dialog{width:100%}}
  `;
  document.head.appendChild(style);

  const showHover = (button, cert) => {
    if (window.innerWidth <= 700) return;
    clearTimeout(hoverHideTimer);
    if (!hoverCard) {
      hoverCard = document.createElement('div');
      hoverCard.className = 'cert-hover-card';
      hoverCard.setAttribute('aria-hidden', 'true');
      document.body.appendChild(hoverCard);
      hoverCard.addEventListener('mouseenter', () => clearTimeout(hoverHideTimer));
      hoverCard.addEventListener('mouseleave', hideHover);
    }
    loadPdf(hoverCard, cert, 'cert-hover-frame');
    const rect = button.getBoundingClientRect();
    const cardWidth = Math.min(520, window.innerWidth - 32);
    const left = Math.max(16, Math.min(rect.left, window.innerWidth - cardWidth - 16));
    const top = Math.max(16, Math.min(rect.bottom + 12, window.innerHeight - Math.min(680, window.innerHeight - 40) - 16));
    hoverCard.style.left = `${left}px`;
    hoverCard.style.top = `${top}px`;
    hoverCard.classList.add('is-visible');
  };

  const hideHover = () => {
    clearTimeout(hoverHideTimer);
    hoverHideTimer = setTimeout(() => hoverCard?.classList.remove('is-visible'), 100);
  };

  document.querySelectorAll('.cert-link').forEach(button => {
    const cert = certs[button.dataset.cert];
    if (!cert) return;
    button.addEventListener('mouseenter', () => showHover(button, cert));
    button.addEventListener('mouseleave', hideHover);
    button.addEventListener('focus', () => showHover(button, cert));
    button.addEventListener('blur', hideHover);
    button.addEventListener('click', () => openModal(cert));
  });

  modal?.querySelectorAll('[data-close-cert]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeModal(); hideHover(); }
  });
})();
