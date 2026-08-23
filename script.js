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

  const creativeSection = document.createElement('section');
  creativeSection.id = 'creatives';
  creativeSection.className = 'section creative-section';
  creativeSection.innerHTML = `
    <div class="wrap">
      <p class="eyebrow">Creative Work</p>
      <div class="section-intro creative-intro">
        <h2>Creatives I’ve worked on.</h2>
        <p>Selected ad creatives from the 38 creatives managed across the Rareduft Meta Ads account, including UGC, product and promotional formats.</p>
      </div>
      <div class="creative-grid">
        <article class="creative-card creative-featured">
          <button class="creative-media" type="button" data-creative-video="creative-2-web.mp4" aria-label="Open top-performing UGC creative">
            <img src="creatives/creative-2-poster.jpg" alt="Top-performing UGC ad creative" loading="lazy" decoding="async">
            <span class="play-badge">▶</span><span class="creative-result">4.68× ROAS · Top-performing UGC</span>
          </button>
          <div class="creative-copy"><span>UGC · META ADS</span><h3>Top-performing UGC creative</h3><p>The creative that delivered the account’s strongest ROAS signal and informed the shift toward UGC-led creative strategy.</p></div>
        </article>
        <article class="creative-card">
          <button class="creative-media" type="button" data-creative-video="creative-1-web.mp4" aria-label="Open UGC ad creative 1"><img src="creatives/creative-1-poster.jpg" alt="UGC ad creative" loading="lazy" decoding="async"><span class="play-badge">▶</span></button>
          <div class="creative-copy"><span>UGC · META ADS</span><h3>UGC product storytelling</h3><p>Short-form creative designed to communicate product value quickly in-feed.</p></div>
        </article>
        <article class="creative-card">
          <button class="creative-media" type="button" data-creative-video="creative-3-web.mp4" aria-label="Open UGC ad creative 3"><img src="creatives/creative-3-poster.jpg" alt="UGC ad creative" loading="lazy" decoding="async"><span class="play-badge">▶</span></button>
          <div class="creative-copy"><span>UGC · META ADS</span><h3>Performance-led creative</h3><p>Creative variation used for testing messaging and audience response.</p></div>
        </article>
        <article class="creative-card">
          <button class="creative-media" type="button" data-creative-video="creative-4-web.mp4" aria-label="Open UGC ad creative 4"><img src="creatives/creative-4-poster.jpg" alt="UGC ad creative" loading="lazy" decoding="async"><span class="play-badge">▶</span></button>
          <div class="creative-copy"><span>UGC · META ADS</span><h3>Creative testing variation</h3><p>Another short-form variation used as part of the creative testing mix.</p></div>
        </article>
        <article class="creative-card"><button class="creative-media" type="button" data-creative-image="creatives/5.png" aria-label="Open static ad creative 5"><img src="creatives/5.png" alt="Static Meta ad creative" loading="lazy" decoding="async"></button><div class="creative-copy"><span>STATIC · META ADS</span><h3>Product-led creative</h3><p>Static creative format developed for paid social testing.</p></div></article>
        <article class="creative-card"><button class="creative-media" type="button" data-creative-image="creatives/6.png" aria-label="Open static ad creative 6"><img src="creatives/6.png" alt="Static Meta ad creative" loading="lazy" decoding="async"></button><div class="creative-copy"><span>STATIC · META ADS</span><h3>Promotional creative</h3><p>Offer-led visual creative built for campaign messaging.</p></div></article>
        <article class="creative-card"><button class="creative-media" type="button" data-creative-image="creatives/7.png" aria-label="Open static ad creative 7"><img src="creatives/7.png" alt="Static Meta ad creative" loading="lazy" decoding="async"></button><div class="creative-copy"><span>STATIC · META ADS</span><h3>Brand/product creative</h3><p>Visual format used to support paid social communication.</p></div></article>
        <article class="creative-card"><button class="creative-media" type="button" data-creative-image="creatives/9.png" aria-label="Open static ad creative 9"><img src="creatives/9.png" alt="Static Meta ad creative" loading="lazy" decoding="async"></button><div class="creative-copy"><span>STATIC · META ADS</span><h3>Campaign creative</h3><p>Additional static creative from the campaign asset mix.</p></div></article>
        <article class="creative-card"><button class="creative-media" type="button" data-creative-image="creatives/10.png" aria-label="Open static ad creative 10"><img src="creatives/10.png" alt="Static Meta ad creative" loading="lazy" decoding="async"></button><div class="creative-copy"><span>STATIC · META ADS</span><h3>Social ad creative</h3><p>Additional visual asset from the paid social creative set.</p></div></article>
      </div>
    </div>`;
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) skillsSection.parentNode.insertBefore(creativeSection, skillsSection);

  const creativeStyle = document.createElement('style');
  creativeStyle.textContent = `
    .creative-section{background:#f3efe4}.creative-intro{margin-bottom:2.2rem}.creative-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.creative-card{border:1px solid rgba(27,33,28,.12);border-radius:16px;background:#f8f4ea;overflow:hidden;display:flex;flex-direction:column}.creative-card.creative-featured{grid-column:span 2}.creative-media{position:relative;display:block;width:100%;aspect-ratio:4/3;padding:0;border:0;background:#111510;overflow:hidden;cursor:pointer}.creative-media img{width:100%;height:100%;object-fit:cover;transition:transform .35s ease}.creative-media:hover img,.creative-media:focus-visible img{transform:scale(1.025)}.play-badge{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:rgba(17,21,16,.82);color:#f3efe4;font-size:1rem;border:1px solid rgba(243,239,228,.35)}.creative-result{position:absolute;left:12px;bottom:12px;background:#111510;color:#e4cfa0;border-radius:999px;padding:.45rem .7rem;font:600 .65rem "IBM Plex Mono",monospace}.creative-copy{padding:1.1rem 1.2rem 1.3rem}.creative-copy>span{font:600 .62rem "IBM Plex Mono",monospace;letter-spacing:.1em;color:#7c9075}.creative-copy h3{font-size:1.25rem;margin:.45rem 0 .35rem}.creative-copy p{margin:0;color:#5b6158;font-size:.8rem}.creative-lightbox{position:fixed;inset:0;z-index:210;background:rgba(10,13,11,.88);display:none;align-items:center;justify-content:center;padding:18px}.creative-lightbox.is-open{display:flex}.creative-lightbox-inner{position:relative;width:min(1000px,100%);max-height:92vh;display:grid;place-items:center}.creative-lightbox img,.creative-lightbox video{display:block;max-width:100%;max-height:88vh;width:auto;height:auto;border-radius:12px;background:#111}.creative-close{position:absolute;right:-8px;top:-12px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(243,239,228,.3);background:#f3efe4;color:#111510;font-size:1.4rem;cursor:pointer;z-index:2}.creative-lightbox-note{position:absolute;left:0;bottom:-32px;color:#e4cfa0;font:600 .68rem "IBM Plex Mono",monospace}.creative-media:focus-visible{outline:2px solid #c9a468;outline-offset:-3px}@media(max-width:900px){.creative-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.creative-card.creative-featured{grid-column:span 2}}@media(max-width:700px){.creative-grid{grid-template-columns:1fr}.creative-card.creative-featured{grid-column:auto}.creative-copy{padding:1rem}.creative-media{aspect-ratio:4/3}.creative-result{font-size:.58rem}.creative-lightbox{padding:10px}.creative-lightbox img,.creative-lightbox video{max-height:80vh;width:100%;object-fit:contain}.creative-close{right:2px;top:2px}}
  `;
  document.head.appendChild(creativeStyle);

  const lightbox = document.createElement('div');
  lightbox.className = 'creative-lightbox';
  lightbox.innerHTML = '<div class="creative-lightbox-inner"><button class="creative-close" type="button" aria-label="Close creative preview">×</button><div class="creative-lightbox-content"></div><div class="creative-lightbox-note"></div></div>';
  document.body.appendChild(lightbox);
  const lightboxContent = lightbox.querySelector('.creative-lightbox-content');
  const lightboxNote = lightbox.querySelector('.creative-lightbox-note');
  const closeCreative = () => { lightbox.classList.remove('is-open'); lightboxContent.innerHTML = ''; document.body.classList.remove('modal-open'); };
  lightbox.querySelector('.creative-close').addEventListener('click', closeCreative);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeCreative(); });

  document.querySelectorAll('[data-creative-video],[data-creative-image]').forEach(button => {
    button.addEventListener('click', () => {
      lightboxContent.innerHTML = '';
      const videoFile = button.dataset.creativeVideo;
      const imageFile = button.dataset.creativeImage;
      if (videoFile) {
        const video = document.createElement('video');
        video.src = `creatives/${videoFile}`;
        video.controls = true; video.autoplay = true; video.playsInline = true; video.preload = 'metadata';
        if (videoFile === 'creative-2-web.mp4') lightboxNote.textContent = '4.68× ROAS · Top-performing UGC creative';
        else lightboxNote.textContent = 'Selected creative work · Rareduft';
        lightboxContent.appendChild(video);
      } else if (imageFile) {
        const img = document.createElement('img');
        img.src = imageFile; img.alt = 'Selected ad creative';
        lightboxNote.textContent = 'Selected creative work · Rareduft';
        lightboxContent.appendChild(img);
      }
      lightbox.classList.add('is-open'); document.body.classList.add('modal-open');
    });
  });

  const certs = {
    google: { title: 'AI-Powered Performance Ads – Google', file: 'certificates/Google%20Ads%20Certiicate.pdf' },
    analytics: { title: 'Introduction to Data Analytics — Simplilearn', file: 'certificates/Data%20Analytics%20Certificate.pdf' }
  };

  const modal = document.querySelector('#certModal');
  const preview = modal?.querySelector('#certificatePreview');
  const closeButton = modal?.querySelector('.cert-close');
  let hoverCard = null;
  let hoverHideTimer = null;

  const loadPdf = (container, cert, className = '') => {
    container.innerHTML = `<iframe class="${className}" src="${cert.file}#toolbar=0&navpanes=0&scrollbar=1" title="${cert.title}" loading="lazy"></iframe>`;
  };
  const openModal = cert => {
    if (!modal || !preview) return;
    preview.innerHTML = `<iframe class="cert-frame cert-modal-frame" src="${cert.file}#toolbar=1&navpanes=0&scrollbar=1" title="${cert.title}"></iframe>`;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); closeButton?.focus();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open');
    if (preview) preview.innerHTML = '<p class="eyebrow">Certificate</p><h2 id="certTitle">Certificate</h2><p id="certBody"></p><div class="certificate-seal">CERTIFIED</div><small id="certMeta"></small>';
  };
  const style = document.createElement('style');
  style.textContent = `.cert-hover-card{position:fixed;z-index:180;width:min(520px,calc(100vw - 32px));height:min(680px,calc(100vh - 40px));background:var(--paper);border:1px solid rgba(27,33,28,.15);border-radius:14px;box-shadow:0 25px 70px rgba(0,0,0,.3);padding:8px;opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .18s ease,transform .18s ease,visibility .18s ease}.cert-hover-card.is-visible{opacity:1;visibility:visible;transform:translateY(0)}.cert-hover-card iframe{width:100%;height:100%;border:0;border-radius:9px;background:#fff}.cert-modal-frame{width:100%;height:min(78vh,760px);border:0;border-radius:10px;background:#fff}.cert-link:focus-visible{outline:2px solid var(--gold);outline-offset:3px}@media(max-width:700px){.cert-hover-card{display:none}.cert-modal-frame{height:78vh}.cert-dialog{width:100%}}`;
  document.head.appendChild(style);
  const showHover = (button, cert) => {
    if (window.innerWidth <= 700) return;
    clearTimeout(hoverHideTimer);
    if (!hoverCard) { hoverCard = document.createElement('div'); hoverCard.className = 'cert-hover-card'; document.body.appendChild(hoverCard); hoverCard.addEventListener('mouseenter', () => clearTimeout(hoverHideTimer)); hoverCard.addEventListener('mouseleave', hideHover); }
    loadPdf(hoverCard, cert, 'cert-hover-frame');
    const rect = button.getBoundingClientRect(), cardWidth = Math.min(520, window.innerWidth - 32);
    hoverCard.style.left = `${Math.max(16, Math.min(rect.left, window.innerWidth - cardWidth - 16))}px`;
    hoverCard.style.top = `${Math.max(16, Math.min(rect.bottom + 12, window.innerHeight - Math.min(680, window.innerHeight - 40) - 16))}px`;
    hoverCard.classList.add('is-visible');
  };
  const hideHover = () => { clearTimeout(hoverHideTimer); hoverHideTimer = setTimeout(() => hoverCard?.classList.remove('is-visible'), 100); };
  document.querySelectorAll('.cert-link').forEach(button => { const cert = certs[button.dataset.cert]; if (!cert) return; button.addEventListener('mouseenter', () => showHover(button, cert)); button.addEventListener('mouseleave', hideHover); button.addEventListener('focus', () => showHover(button, cert)); button.addEventListener('blur', hideHover); button.addEventListener('click', () => openModal(cert)); });
  modal?.querySelectorAll('[data-close-cert]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeModal(); closeCreative(); hideHover(); } });
})();