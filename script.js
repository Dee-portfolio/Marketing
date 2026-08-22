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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  // Automatically finds portfolio metrics, preserving prefixes/suffixes such as ₹, K+, M+, % and ×.
  const metricSelectors = [
    '.hero-metric strong', '.metric-row b', '.stats-grid b', '.work-card strong',
    '.case-badge', '.case-grid strong', '.funnel b', '.credentials b'
  ];
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
    const format = value => value.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + format(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) animate(entry.target); });
    }, { threshold: 0.25 });
    metrics.forEach(el => counterObserver.observe(el));
  } else {
    metrics.forEach(animate);
  }
})();
