/* ============================================
   POPEY — Front-end glue
   ============================================ */

(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Sticky header on scroll + hide on scroll-down, show on scroll-up ---- */
  const header = $('[data-header]');
  if (header) {
    let lastY = window.scrollY;
    let acc = 0;                   // accumulated scroll in current direction
    const THRESHOLD = 12;          // px before we decide to hide/show
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      header.classList.toggle('is-scrolled', y > 40);
      // Never hide near the top
      if (y < 80) {
        header.classList.remove('is-hidden');
        acc = 0;
      } else {
        // Reset accumulator on direction change
        if ((dy > 0 && acc < 0) || (dy < 0 && acc > 0)) acc = 0;
        acc += dy;
        if (acc > THRESHOLD) {
          header.classList.add('is-hidden');
          // Close the cities dropdown if we hide the header
          const menu = $('[data-cities-menu]');
          if (menu && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            const scrim = $('[data-cities-scrim]');
            if (scrim) scrim.classList.remove('is-open');
            document.body.style.overflow = '';
          }
        } else if (acc < -THRESHOLD) {
          header.classList.remove('is-hidden');
        }
      }
      lastY = y;
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================
     Cities dropdown (nav) — opens as a header panel
     ============================================ */
  const dropdown = $('[data-cities-menu]');
  const scrim    = $('[data-cities-scrim]');
  const togglers = $$('[data-cities-toggle]');
  const setOpen = (open) => {
    if (!dropdown) return;
    dropdown.classList.toggle('is-open', open);
    if (scrim) scrim.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    togglers.forEach(t => t.setAttribute('aria-expanded', String(open)));
  };
  togglers.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    setOpen(!dropdown.classList.contains('is-open'));
  }));
  if (scrim) scrim.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  /* ============================================
     Generic reveal on scroll
     ============================================ */
  const revealTargets = $$('.reveal, .split-line');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    revealTargets.forEach(t => io.observe(t));
    // Fallback: anything already visible on load should reveal immediately,
    // even if the observer callback is delayed by rendering.
    requestAnimationFrame(() => {
      revealTargets.forEach(t => {
        const r = t.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
          t.classList.add('is-in');
        }
      });
    });
  } else {
    revealTargets.forEach(t => t.classList.add('is-in'));
  }

  /* ============================================
     "How it works" — 3 cards appear ONE AT A TIME
     Once the section enters the viewport, stagger each card in.
     ============================================ */
  const howGrid = $('[data-how-grid]');
  if (howGrid) {
    const items = $$('[data-how-step]', howGrid);
    const trigger = () => {
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('is-in'), prefersReducedMotion ? 0 : i * 280);
      });
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { trigger(); io.unobserve(e.target); }
        });
      }, { threshold: .15 });
      io.observe(howGrid);
    } else trigger();
  }

  /* ============================================
     Reviews — reveal on scroll (staggered)
     ============================================ */
  const reviewsSection = $('[data-reviews]');
  if (reviewsSection) {
    const cards = $$('[data-review]', reviewsSection);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = cards.indexOf(e.target);
          setTimeout(() => e.target.classList.add('is-in'), prefersReducedMotion ? 0 : (idx % 3) * 120);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .1 });
    cards.forEach(c => io.observe(c));
  }

  /* ============================================
     City rotator — "Boats in [City]"
     Middle text cycles + right-side image & stats swap in sync.
     ============================================ */
  const rotator = $('[data-city-rotator]');
  if (rotator) {
    const rolodex = $('[data-cities-rolodex]', rotator);
    const original = $$('li', rolodex);
    const frames  = $$('[data-city-frame]', rotator);
    const listEl  = rolodex;
    const N = original.length;
    if (N > 1 && frames.length) {
      // Clone items twice so the DOM has 3 * N; middle block is the "canonical" one.
      // This gives us buffer above and below to fake an infinite vertical scroll.
      original.forEach(li => rolodex.appendChild(li.cloneNode(true)));
      original.forEach(li => rolodex.appendChild(li.cloneNode(true)));
      const items = $$('li', rolodex);

      // Start the pointer at the middle-block active city.
      let baseIdx = original.findIndex(li => li.classList.contains('is-active'));
      if (baseIdx < 0) baseIdx = 0;
      let idx = N + baseIdx;                         // absolute index within the 3N list
      // Use computed line-height (stable) instead of bounding rect,
      // which is affected by the scale() transforms on non-active items.
      const H = () => parseFloat(getComputedStyle(original[0]).lineHeight);

      const paintClasses = (activeIdx) => {
        items.forEach((li, k) => {
          const d = Math.abs(k - activeIdx);
          li.classList.toggle('is-active', k === activeIdx);
          li.classList.toggle('is-near',    d === 1);
        });
      };

      const setTransform = (i, animated = true) => {
        listEl.style.transition = animated
          ? 'transform 700ms var(--ease-out)'
          : 'none';
        // The visible slot shows 3 lines — index 1 is the middle line.
        // Shift the list so item `i` sits on that middle line.
        const middleVisibleIndex = 1;
        listEl.style.transform = `translateY(${(middleVisibleIndex - i) * H()}px)`;
      };

      const syncFrame = (i) => {
        const city = items[i].dataset.city;
        frames.forEach(f => f.classList.toggle('is-active', f.dataset.cityFrame === city));
      };

      // Move by +1 or -1 with animation; when we drift out of the middle
      // block after settling, silently teleport back into it so the loop
      // keeps going forever without a visible seam.
      const step = (dir) => {
        idx += dir;
        paintClasses(idx);
        setTransform(idx, true);
        syncFrame(idx);
        // After the animation ends, if we've stepped outside the middle
        // block, rebase to the equivalent slot inside it.
        window.clearTimeout(step._rebase);
        step._rebase = window.setTimeout(() => {
          if (idx < N || idx >= 2 * N) {
            idx = N + ((idx - N) % N + N) % N;
            paintClasses(idx);
            setTransform(idx, false);   // no animation — the swap is invisible
          }
        }, 720);
      };

      // Jump to a specific slot in the middle block (used on click).
      const jumpToBase = (b) => {
        idx = N + b;
        paintClasses(idx);
        setTransform(idx, true);
        syncFrame(idx);
      };

      // Initial paint
      requestAnimationFrame(() => {
        paintClasses(idx);
        setTransform(idx, false);
        syncFrame(idx);
      });

      let timer;
      const start = () => {
        if (prefersReducedMotion) return;
        stop();
        timer = setInterval(() => step(+1), 3200);
      };
      const stop = () => { if (timer) clearInterval(timer); };

      // Cities are decorative — no click handler, no hover pause.
      // Only the outer stage image is interactive (links to the city page).
      window.addEventListener('resize', () => setTransform(idx, false));
      start();
    }
  }

  /* ============================================
     Featured boats — city dropdown + tabs + arrows
     ============================================ */
  const featured = $('[data-featured]');
  if (featured && window.POPEY_BOATS) {
    const rail          = $('[data-rail]', featured);
    const tabsRoot      = $('[data-tabs]', featured);
    const tabButtons    = $$('[data-tab]', tabsRoot);
    const underline     = $('[data-tab-underline]', tabsRoot);
    const citySelect    = $('[data-city-select]', featured);
    const cityMenu      = $('[data-city-menu]', featured);
    const cityOpts      = $$('[data-city-opt]', cityMenu);
    const cityLabel     = $('[data-city-label]', featured);
    const boatCount     = $('[data-boat-count]', featured);
    const prevBtn       = featured.querySelector('[data-slide="-1"]');
    const nextBtn       = featured.querySelector('[data-slide="1"]');
    let currentCity = 'miami';
    let currentTab  = 'top';
    let currentPage = 0;

    const perPage = () => {
      const w = featured.querySelector('.featured-boats__viewport').offsetWidth;
      if (w > 1100) return 4;
      if (w > 780) return 3;
      if (w > 520) return 2;
      return 1;
    };

    const renderBoatCard = (b) => `
      <a href="boat.html" class="boat-card">
        <div class="boat-card__media">
          ${b.badge ? `<span class="boat-card__badge">${b.badge}</span>` : ''}
          <img src="${b.img}" alt="">
          <span class="boat-card__dots"><span class="is-active"></span><span></span><span></span></span>
        </div>
        <div>
          <h3 class="boat-card__title">${b.name}</h3>
          <p class="boat-card__desc">${b.desc}</p>
        </div>
        <div class="boat-card__meta">
          <div class="boat-card__specs">
            <span class="boat-card__spec">
              <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4"/></svg>
              ${b.len}
            </span>
            <span class="boat-card__spec">
              <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>
              ${b.ppl}
            </span>
            ${b.beds ? `<span class="boat-card__spec">
              <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20V6h20v14"/><path d="M2 14h20"/><path d="M6 10h4"/></svg>
              ${b.beds}
            </span>` : ''}
          </div>
          <span class="boat-card__rating">
            <svg class="ico" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9.2 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.2 9,9"/></svg>
            ${b.rating}
          </span>
        </div>
        <div class="boat-card__price">
          <span class="t-muted">Hourly Rate from</span>
          <strong>${b.price}</strong>
        </div>
      </a>
    `;

    const getList = () => {
      const pool = window.POPEY_BOATS.boats[currentCity] || [];
      return window.POPEY_BOATS.tabsFilter(pool, currentTab);
    };

    const render = () => {
      const list = getList();
      const n = perPage();
      const maxPage = Math.max(0, Math.ceil(list.length / n) - 1);
      currentPage = Math.min(currentPage, maxPage);
      const start = currentPage * n;
      const slice = list.slice(start, start + n);
      rail.classList.add('is-fading');
      setTimeout(() => {
        rail.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`;
        rail.innerHTML = slice.length
          ? slice.map(renderBoatCard).join('')
          : `<div style="padding:32px;color:var(--c-ink-50)">No boats for this filter — try a different tab.</div>`;
        rail.classList.remove('is-fading');
      }, 180);
      if (prevBtn) prevBtn.disabled = currentPage <= 0;
      if (nextBtn) nextBtn.disabled = currentPage >= maxPage;
    };

    const setUnderline = (btn) => {
      const rect  = btn.getBoundingClientRect();
      const rectR = tabsRoot.getBoundingClientRect();
      underline.style.width = rect.width + 'px';
      underline.style.transform = `translateX(${rect.left - rectR.left}px)`;
    };

    // Tabs
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentTab = btn.dataset.tab;
        currentPage = 0;
        setUnderline(btn);
        render();
      });
    });
    // Position underline on load and resize
    requestAnimationFrame(() => setUnderline(tabsRoot.querySelector('.tab.is-active')));
    window.addEventListener('resize', () => {
      setUnderline(tabsRoot.querySelector('.tab.is-active'));
      render();
    });

    // City dropdown
    citySelect.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = cityMenu.classList.toggle('is-open');
      citySelect.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!featured.contains(e.target)) {
        cityMenu.classList.remove('is-open');
        citySelect.setAttribute('aria-expanded', 'false');
      }
    });
    cityOpts.forEach(opt => opt.addEventListener('click', () => {
      cityOpts.forEach(o => o.classList.remove('is-active'));
      opt.classList.add('is-active');
      currentCity = opt.dataset.cityOpt;
      cityLabel.textContent = opt.textContent.trim();
      boatCount.textContent = opt.dataset.boats;
      cityMenu.classList.remove('is-open');
      citySelect.setAttribute('aria-expanded', 'false');
      currentPage = 0;
      render();
    }));

    // Arrows (page nav)
    if (prevBtn) prevBtn.addEventListener('click', () => { currentPage = Math.max(0, currentPage - 1); render(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { currentPage += 1; render(); });

    render();
  }

  /* ---- Language pill toggle: actually change the site language ---- */
  const initLang = () => {
    if (!window.POPEY_I18N) return;
    // Apply saved / detected language on load
    const startLang = window.POPEY_I18N.getLang();
    window.POPEY_I18N.apply(startLang);
    // Wire every lang toggle across the page
    $$('.nav__lang').forEach(group => {
      const buttons = $$('.lang-btn', group);
      buttons.forEach(b => b.addEventListener('click', () => {
        const lang = b.textContent.trim().toLowerCase() === 'es' ? 'es' : 'en';
        window.POPEY_I18N.apply(lang);
      }));
    });
  };
  initLang();

  /* ---- Catalogue-page bits (unchanged) ---- */
  $$('[data-filter]').forEach(el => el.addEventListener('click', () => el.classList.toggle('is-checked')));
  $$('[data-filter-group]').forEach(g => {
    const head = g.querySelector('[data-filter-head]');
    if (head) head.addEventListener('click', () => g.classList.toggle('is-collapsed'));
  });
  $$('[data-tag-remove]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault(); btn.closest('.tag')?.remove();
  }));

  const gallery = $('[data-gallery]');
  if (gallery) {
    const main = $('[data-gallery-main]', gallery);
    const thumbs = $$('[data-gallery-thumb]', gallery);
    thumbs.forEach(t => t.addEventListener('click', () => {
      thumbs.forEach(x => x.classList.remove('is-active'));
      t.classList.add('is-active');
      const src = t.querySelector('img')?.getAttribute('src');
      if (src && main) main.querySelector('img').src = src;
    }));
  }

  $$('[data-book]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.classList.add('is-loading');
    setTimeout(() => { window.location.href = 'success.html'; }, 320);
  }));

  /* ============================================
     Autocomplete for "Where would you like to sail?"
     Suggestions grouped by type: Cities, Boat types, Popular boats.
     ============================================ */
  const searchInput = $('[data-search-input]');
  const acRoot = $('[data-autocomplete]');
  if (searchInput && acRoot) {
    const CITIES = [
      { name: 'Miami',          country: 'Florida, USA',           slug: 'miami' },
      { name: 'Ibiza',          country: 'Balearic Islands, Spain', slug: 'ibiza' },
      { name: 'Barcelona',      country: 'Catalonia, Spain',        slug: 'barcelona' },
      { name: 'Mykonos',        country: 'Cyclades, Greece',        slug: 'mykonos' },
      { name: 'Santorini',      country: 'Cyclades, Greece',        slug: 'santorini' },
      { name: 'Monaco',         country: 'Monte-Carlo, Monaco',     slug: 'monaco' },
      { name: 'Dubrovnik',      country: 'Dalmatia, Croatia',       slug: 'dubrovnik' },
      { name: 'Punta del Este', country: 'Maldonado, Uruguay',      slug: 'punta' },
    ];
    const BOAT_TYPES = [
      { name: 'Sailboat',   note: '620+ available' },
      { name: 'Catamaran',  note: '312+ available' },
      { name: 'Motor yacht',note: '480+ available' },
      { name: 'Speedboat',  note: '210+ available' },
      { name: 'Gulet',      note: '95+ available'  },
      { name: 'Pontoon',    note: '140+ available' },
    ];
    const POPULAR_BOATS = [
      { name: '40′ Azimut Miami',        note: 'Miami · from USD 275' },
      { name: '50ft Party Pontoon',      note: 'Miami · from USD 500' },
      { name: '55′ Sunseeker Manhattan', note: 'Barcelona · from USD 880' },
      { name: '62′ Ferretti',            note: 'Mykonos · from USD 1,200' },
      { name: '38′ Sunseeker Portofino', note: 'Ibiza · from USD 320' },
      { name: '80′ Sunseeker Predator',  note: 'Monaco · from USD 3,200' },
    ];

    const ICONS = {
      pin: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
      boat:'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 18l1.5-4h17L22 18"/><path d="M4 22h16"/><path d="M12 2v12"/><path d="M8 6h8"/></svg>',
      star:'<svg class="ico" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9.2 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.2 9,9"/></svg>',
    };

    const highlight = (text, q) => {
      if (!q) return text;
      const i = text.toLowerCase().indexOf(q.toLowerCase());
      if (i < 0) return text;
      return text.slice(0, i) + '<mark>' + text.slice(i, i + q.length) + '</mark>' + text.slice(i + q.length);
    };

    const filterBy = (arr, key, q) => {
      const ql = q.toLowerCase();
      return arr.filter(x => x[key].toLowerCase().includes(ql));
    };

    const renderGroup = (label, items, iconKey, q, extra) => {
      if (!items.length) return '';
      const rows = items.slice(0, 4).map(it => `
        <button class="autocomplete__item" role="option" data-value="${it.name}" tabindex="-1">
          ${ICONS[iconKey]}
          <div>
            <div>${highlight(it.name, q)}</div>
            ${extra ? `<div style="font-size:12px;color:var(--c-ink-50);">${extra(it)}</div>` : ''}
          </div>
          ${it.note ? `<span class="autocomplete__meta">${it.note}</span>` : ''}
        </button>
      `).join('');
      return `
        <div class="autocomplete__group">
          <div class="autocomplete__label">${label}</div>
          ${rows}
        </div>
      `;
    };

    const render = (q) => {
      const cities  = filterBy(CITIES, 'name', q);
      const types   = filterBy(BOAT_TYPES, 'name', q);
      const boats   = filterBy(POPULAR_BOATS, 'name', q);
      if (!cities.length && !types.length && !boats.length) {
        acRoot.innerHTML = `<div class="autocomplete__empty">No matches. Try “Miami”, “Ibiza” or “Catamaran”.</div>`;
        return;
      }
      acRoot.innerHTML =
        renderGroup('Locations',   cities, 'pin',  q, (c) => c.country) +
        renderGroup('Boat types',  types,  'boat', q) +
        renderGroup('Popular boats', boats,'star', q);
    };

    const open = () => {
      const q = searchInput.value.trim();
      if (!q) {
        // show top defaults when empty
        acRoot.innerHTML =
          renderGroup('Popular destinations', CITIES.slice(0, 4), 'pin', '', (c) => c.country) +
          renderGroup('Popular boat types',   BOAT_TYPES.slice(0, 4), 'boat', '');
      } else {
        render(q);
      }
      acRoot.classList.add('is-open');
    };
    const close = () => acRoot.classList.remove('is-open');

    searchInput.addEventListener('focus', open);
    searchInput.addEventListener('input', open);
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-search-location]')) close();
    });
    acRoot.addEventListener('click', (e) => {
      const btn = e.target.closest('.autocomplete__item');
      if (!btn) return;
      searchInput.value = btn.dataset.value;
      // Mark the field as populated so the CSS switches to ink color.
      searchInput.closest('.searchbar__field')?.classList.add('is-filled');
      close();
    });
    // Also mark on typed input
    searchInput.addEventListener('input', () => {
      const field = searchInput.closest('.searchbar__field');
      if (field) field.classList.toggle('is-filled', !!searchInput.value.trim());
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  /* ============================================
     Date picker for "Pick a date"
     Simple month grid with prev/next month, today/apply.
     ============================================ */
  const dateToggle = $('[data-date-toggle]');
  const datepickerEl = $('[data-datepicker]');
  const dateLabel = $('[data-date-label]');
  if (dateToggle && datepickerEl && dateLabel) {
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const DOW = ['Mo','Tu','We','Th','Fr','Sa','Su'];
    const today = new Date();
    let view = new Date(today.getFullYear(), today.getMonth(), 1);
    let selected = null;

    const renderMonth = () => {
      const year = view.getFullYear();
      const month = view.getMonth();
      const first = new Date(year, month, 1);
      const startDow = (first.getDay() + 6) % 7; // Mon = 0
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      let html = `
        <div class="datepicker__head">
          <button class="datepicker__nav" data-dp-prev aria-label="Previous month">
            <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <div class="datepicker__title">${MONTHS[month]} ${year}</div>
          <button class="datepicker__nav" data-dp-next aria-label="Next month">
            <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
        <div class="datepicker__grid">
          ${DOW.map(d => `<div class="datepicker__dow">${d}</div>`).join('')}
      `;
      for (let i = 0; i < startDow; i++) html += `<div class="datepicker__day datepicker__day--pad"></div>`;
      for (let d = 1; d <= daysInMonth; d++) {
        const isToday = (year === today.getFullYear() && month === today.getMonth() && d === today.getDate());
        const isSel = selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === d;
        const past = new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        html += `<button type="button" class="datepicker__day ${isToday ? 'is-today' : ''} ${isSel ? 'is-selected' : ''}" ${past ? 'disabled' : ''} data-day="${d}">${d}</button>`;
      }
      html += `
        </div>
        <div class="datepicker__foot">
          <button type="button" data-dp-clear>Clear</button>
          <button type="button" class="datepicker__apply" data-dp-apply>Apply</button>
        </div>
      `;
      datepickerEl.innerHTML = html;
    };

    // Portal: move the datepicker to <body> while open so it escapes any
    // clipping ancestor (hero has overflow:hidden). Restore on close.
    const originalParent = datepickerEl.parentNode;
    const positionDp = () => {
      const r = dateToggle.getBoundingClientRect();
      datepickerEl.style.position = 'fixed';
      datepickerEl.style.top = `${r.bottom + 8}px`;
      datepickerEl.style.left = `${r.left}px`;
    };
    const openDp = () => {
      renderMonth();
      // Portal to body
      if (datepickerEl.parentNode !== document.body) document.body.appendChild(datepickerEl);
      positionDp();
      datepickerEl.classList.add('is-open');
      dateToggle.setAttribute('aria-expanded', 'true');
      window.addEventListener('scroll', positionDp, { passive: true });
      window.addEventListener('resize', positionDp);
    };
    const closeDp = () => {
      datepickerEl.classList.remove('is-open');
      dateToggle.setAttribute('aria-expanded', 'false');
      window.removeEventListener('scroll', positionDp);
      window.removeEventListener('resize', positionDp);
      // Restore to its original parent so the DOM stays tidy
      if (datepickerEl.parentNode === document.body) originalParent.appendChild(datepickerEl);
      datepickerEl.style.position = '';
      datepickerEl.style.top = '';
      datepickerEl.style.left = '';
    };

    // Toggle the picker on click of the "Pick a date" field
    dateToggle.addEventListener('click', (e) => {
      // Don't toggle if clicking inside the already-open panel
      if (e.target.closest('[data-datepicker]')) return;
      e.stopPropagation();
      if (datepickerEl.classList.contains('is-open')) closeDp();
      else openDp();
    });

    // Delegated actions inside the picker
    datepickerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const t = e.target.closest('button');
      if (!t) return;
      if (t.matches('[data-dp-prev]')) { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderMonth(); return; }
      if (t.matches('[data-dp-next]')) { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderMonth(); return; }
      if (t.matches('[data-dp-clear]')) {
        selected = null;
        dateLabel.textContent = window.POPEY_I18N ? window.POPEY_I18N.t('hero.search.date', window.POPEY_I18N.getLang()) : 'Pick a date';
        dateToggle.classList.remove('is-filled');
        renderMonth();
        return;
      }
      if (t.matches('[data-dp-apply]')) { closeDp(); return; }
      if (t.matches('.datepicker__day') && !t.disabled) {
        selected = new Date(view.getFullYear(), view.getMonth(), Number(t.dataset.day));
        const lang = window.POPEY_I18N ? window.POPEY_I18N.getLang() : 'en';
        dateLabel.textContent = selected.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        // Skip re-translation on the label — the picked date is user content
        dateLabel.removeAttribute('data-i18n');
        dateToggle.classList.add('is-filled');
        renderMonth();
      }
    });

    // Close on outside click / Escape
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-date-toggle]')) closeDp();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDp(); });
  }
})();
