// 52 Tools -- client-side interactivity (search, favorites, image fallback).
// Data lives in one shared module so build-time pages and this script never drift.
import { TOOLS_DATA, CATEGORIES_DATA, toolUrl } from '../data/tools.js';

(function () {
  'use strict';

  // ===================== IMAGE ASSET SYSTEM =====================
  // Real branded images live under these folders. Until assets are
  // uploaded, onerror swaps in ONE shared neutral placeholder box --
  // never a generated/library icon and never per-tool substitution.
  const IMAGE_ASSET_DIR = '/assets/images/';
  const PLACEHOLDER_IMG =
    'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1.6">' +
      '<rect x="3" y="3" width="18" height="18" rx="2.5"/>' +
      '<circle cx="8.5" cy="8.5" r="1.6"/>' +
      '<path d="M21 15l-5-5-9 9"/>' +
      '</svg>'
    );

  // Single capturing listener catches every broken tool/category image,
  // since the native "error" event does not bubble.
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.closest('.t52-img-box') && img.dataset.fallbackApplied !== '1') {
      img.dataset.fallbackApplied = '1';
      img.src = PLACEHOLDER_IMG;
      img.closest('.t52-img-box').classList.add('is-placeholder');
    }
  }, true);

  function imgBoxHTML(src, alt, sizeClass) {
    return `<div class="t52-img-box ${sizeClass}">
              <img src="${src}" alt="${alt}" loading="lazy">
            </div>`;
  }


  const STAR_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

  // ===================== FAVORITES: SINGLE SOURCE OF TRUTH =====================
  const FAV_KEY = '52tools_favorites';
  const RECENT_KEY = '52tools_recent_searches';
  const MAX_RECENT = 5;
  const MAX_VISIBLE_RESULTS_ROWS = 5;

  function getFavorites() {
    try {
      const arr = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function setFavorites(arr) {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function isFavorited(id) {
    return getFavorites().includes(id);
  }

  function toggleFavorite(id, starEl) {
    let favs = getFavorites();
    favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]; // no duplicates, ever
    setFavorites(favs);

    if (starEl) {
      starEl.classList.add('t52-fav-star-pop');
      setTimeout(() => starEl.classList.remove('t52-fav-star-pop'), 320);
    }

    renderToolsGrid();
    renderFavCount();
    if (searchState.panelOpen) renderSearchResults({ keepOpen: true });
    if (t52FavModal.classList.contains('open')) renderFavoritesModal();
  }

  function renderFavCount() {
    const count = getFavorites().length;
    const badge = document.getElementById('t52-fav-count');
    badge.hidden = count === 0;
    badge.textContent = String(count);
  }

  // ===================== TOOL / CATEGORY CARD RENDERING =====================
  const t52ToolsGridEl = document.getElementById('t52-tools-grid');
  const t52CatGridEl   = document.getElementById('t52-cat-grid');

  function toolCardHTML(tool) {
    const fav = isFavorited(tool.id);
    return `
      <div class="t52-tool-card" id="tool-${tool.id}" data-tool-id="${tool.id}">
        <button type="button" class="t52-fav-star${fav ? ' active' : ''}" data-fav-id="${tool.id}"
          aria-label="${fav ? 'Remove from favorites' : 'Add to favorites'}" title="${fav ? 'Remove from favorites' : 'Add to favorites'}">
          ${STAR_SVG}
        </button>
        ${imgBoxHTML(IMAGE_ASSET_DIR + tool.id + '.png', tool.name, 't52-img-box--tool')}
        <p class="t52-tool-name">${tool.name}</p>
        <p class="t52-tool-desc">${tool.description}</p>
        <a href="${toolUrl(tool.id)}" class="t52-tool-link link-blue">Use Tool <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
      </div>`;
  }

  function categoryCardHTML(cat) {
    return `
      <div class="t52-cat-card" data-category-id="${cat.id}">
        ${imgBoxHTML(IMAGE_ASSET_DIR + cat.id + '.png', cat.name, 't52-img-box--category')}
        <p class="t52-cat-name">${cat.name}</p>
        <p class="t52-cat-count">${cat.count} Tools</p>
      </div>`;
  }

  function renderToolsGrid() {
    if (t52ToolsGridEl) t52ToolsGridEl.innerHTML = TOOLS_DATA.map(toolCardHTML).join('');
  }
  function renderCategoriesGrid() {
    if (t52CatGridEl) t52CatGridEl.innerHTML = CATEGORIES_DATA.map(categoryCardHTML).join('');
  }

  // one delegated listener handles every star, present or re-rendered
  if (t52ToolsGridEl) {
    t52ToolsGridEl.addEventListener('click', (e) => {
      const star = e.target.closest('.t52-fav-star');
      if (star) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(star.dataset.favId, star);
      }
    });
  }

  // ===================== SEARCH: NORMALIZE + RANK =====================
  // Ranking model adopted from the supplied search-bar reference:
  // exact name > name starts-with > name contains > keyword-family match
  // (keywords + our own tags/aliases folded in) > category > description.
  // Higher score = better match; 0 = no match.
  function normalize(str) {
    return (str || '').toLowerCase().trim();
  }

  function scoreTool(tool, q) {
    const name = normalize(tool.name);
    const category = normalize(tool.category);
    const description = normalize(tool.description);
    const keywordFamily = [...tool.keywords, ...tool.tags, ...tool.aliases];

    if (name === q) return 100;
    if (name.startsWith(q)) return 90;
    if (name.includes(q)) return 75;

    for (const kw of keywordFamily) {
      const k = normalize(kw);
      if (k === q) return 70;
      if (k.startsWith(q) || k.includes(q)) return 60;
    }

    if (category === q || category.includes(q)) return 45;
    if (description.includes(q)) return 30;

    return 0;
  }

  function searchTools(query, limit = 8) {
    const q = normalize(query);
    if (!q) return [];
    return TOOLS_DATA
      .map(tool => ({ tool, score: scoreTool(tool, q) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
      .slice(0, limit)
      .map(r => r.tool);
  }

  function highlight(text, query) {
    const q = normalize(query);
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + q.length) + '</mark>' + text.slice(idx + q.length);
  }

  // ===================== RECENT SEARCHES =====================
  function getRecent() {
    try {
      const arr = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function addRecent(term) {
    term = term.trim();
    if (!term) return;
    let recent = getRecent().filter(t => t.toLowerCase() !== term.toLowerCase());
    recent.unshift(term);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT))); } catch (e) {}
  }
  function clearRecent() {
    try { localStorage.removeItem(RECENT_KEY); } catch (e) {}
  }

  const POPULAR_SEARCHES = ['Image Compressor', 'PDF to JPG', 'Text Replace', 'JSON Formatter', 'HTML Viewer'];

  // ===================== SEARCH COMMAND PALETTE =====================
  const t52SearchInput    = document.getElementById('t52-search-input');
  const t52SearchPanel    = document.getElementById('t52-search-panel');
  const t52SearchBackdrop = document.getElementById('t52-search-backdrop');
  const t52SearchWrap     = document.querySelector('.t52-search-wrap');
  const t52SearchClear    = document.getElementById('t52-search-clear');
  const t52SearchKbd      = document.getElementById('t52-search-kbd');

  // Explicit state machine (per spec: panel visibility must never depend
  // solely on query length) so "click to reopen" always works.
  const searchState = {
    focused: false,
    panelOpen: false,
    query: '',
    results: []
  };
  let t52ActiveIndex = -1;

  // Panel is position:fixed -- compute its viewport coordinates from the
  // search box on every open/resize/scroll so it always tracks the input
  // and is never clipped by any ancestor's overflow/stacking context.
  // Truly move the panel to <body> (not just position:fixed) so it is
  // immune to overflow:hidden AND to any future transform/filter/contain
  // added to an ancestor, which would otherwise re-establish a containing
  // block and defeat position:fixed.
  if (t52SearchPanel) document.body.appendChild(t52SearchPanel);

  function positionSearchPanel() {
    const rect = t52SearchWrap.getBoundingClientRect();
    t52SearchPanel.style.left = rect.left + 'px';
    t52SearchPanel.style.top = (rect.bottom + 10) + 'px';
    t52SearchPanel.style.width = rect.width + 'px';
  }
  window.addEventListener('resize', () => { if (searchState.panelOpen) positionSearchPanel(); });
  window.addEventListener('scroll', () => { if (searchState.panelOpen) positionSearchPanel(); }, true);

  function resultRowHTML(tool, query, idx) {
    const fav = isFavorited(tool.id);
    return `
      <div class="t52-search-result" role="option" id="t52-result-${idx}" data-tool-id="${tool.id}" tabindex="-1">
        ${imgBoxHTML(IMAGE_ASSET_DIR + tool.id + '.png', tool.name, 't52-img-box--result')}
        <div class="t52-search-result-text">
          <p class="t52-search-result-name">${highlight(tool.name, query)}</p>
          <p class="t52-search-result-desc">${tool.description}</p>
        </div>
        <span class="t52-search-result-category">${tool.category}</span>
        <button type="button" class="t52-search-result-star${fav ? ' active' : ''}" data-fav-id="${tool.id}"
          aria-label="${fav ? 'Remove from favorites' : 'Add to favorites'}" title="${fav ? 'Remove from favorites' : 'Add to favorites'}">
          ${STAR_SVG}
        </button>
        <svg class="t52-search-result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>`;
  }

  function openPanel() {
    searchState.panelOpen = true;
    positionSearchPanel();
    t52SearchPanel.classList.add('open');
    t52SearchBackdrop.classList.add('open');
    t52SearchInput.setAttribute('aria-expanded', 'true');
  }
  // hides the dropdown only -- query + focus state are untouched, so
  // clicking the search box again immediately reopens with the same results
  function closePanelOnly() {
    searchState.panelOpen = false;
    t52SearchPanel.classList.remove('open');
    t52SearchBackdrop.classList.remove('open');
    t52SearchInput.setAttribute('aria-expanded', 'false');
    t52ActiveIndex = -1;
  }
  function closeSearchFully() {
    closePanelOnly();
    t52SearchInput.value = '';
    searchState.query = '';
    if (t52SearchClear) t52SearchClear.classList.remove('visible');
  }

  // Builds the empty-state markup (Recent + Popular Searches) and wires its
  // chip listeners. Pure content painting -- does NOT open/show the panel.
  // Called eagerly once at page load (so the very first click has nothing
  // left to compute) and again on every subsequent open, so Recent Searches
  // stays fresh if it changed since the last open.
  function paintEmptyState() {
    const recent = getRecent();
    let html = '';

    if (recent.length > 0) {
      html += `<div class="t52-search-recent-row">
                 <span>Recent Searches</span>
                 <button type="button" class="t52-search-clear-recent" id="t52-clear-recent">Clear</button>
               </div>
               <div class="t52-search-chip-row">
                 ${recent.map(term => `<span class="t52-search-chip-mini" data-term="${term.replace(/"/g,'&quot;')}">${term}</span>`).join('')}
               </div>`;
    }

    html += `<div class="t52-search-recent-row"><span>Popular Searches</span></div>
              <div class="t52-search-chip-row">
                ${POPULAR_SEARCHES.map(term => `<span class="t52-search-chip-mini" data-term="${term}">${term}</span>`).join('')}
              </div>`;

    t52SearchPanel.innerHTML = html;
    searchState.results = [];

    const clearBtn = document.getElementById('t52-clear-recent');
    if (clearBtn) clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearRecent();
      paintEmptyState();
    });
    t52SearchPanel.querySelectorAll('.t52-search-chip-mini').forEach(chip => {
      chip.addEventListener('click', () => {
        t52SearchInput.value = chip.dataset.term;
        searchState.query = chip.dataset.term;
        renderSearchResults();
        t52SearchInput.focus();
      });
    });
  }

  // Entry point used by click/focus/typing handlers: repaint (in case
  // recent searches changed) then make the panel visible.
  function renderEmptyState() {
    paintEmptyState();
    openPanel();
  }

  function renderSearchResults() {
    const query = t52SearchInput.value;
    searchState.query = query;
    t52ActiveIndex = -1;

    if (query.trim() === '') {
      renderEmptyState();
      return;
    }

    const matches = searchTools(query);
    searchState.results = matches;

    let html = '';
    if (matches.length === 0) {
      html = `<div class="t52-search-panel-empty">No results for &ldquo;${query}&rdquo;</div>`;
    } else {
      html += `<div class="t52-search-group-label">Tools</div>`;
      // Only this inner list scrolls -- max 5 rows visible, rest reachable
      // by scrolling the list itself, never the page.
      html += `<div class="t52-search-results-list">`;
      html += matches.map((tool, i) => resultRowHTML(tool, query, i)).join('');
      html += `</div>`;
      html += `<div class="t52-search-footer"><span>${matches.length} result${matches.length === 1 ? '' : 's'}</span><span><kbd>↑</kbd><kbd>↓</kbd> navigate &nbsp; <kbd>↵</kbd> open &nbsp; <kbd>Esc</kbd> close</span></div>`;
    }

    t52SearchPanel.innerHTML = html;
    openPanel();
  }

  // Every tool has a real destination page. It opens in a NEW tab so the
  // 52 Tools page itself stays open -- the star remains a separate control
  // and never triggers this.
  function goToTool(tool) {
    addRecent(t52SearchInput.value.trim() || tool.name);
    window.open(toolUrl(tool.id), '_blank', 'noopener,noreferrer');
  }

  // All of the following register real DOM listeners on the search input,
  // panel, backdrop and wrap. Those elements only exist on the homepage
  // (they live in Hero.astro), so this whole block is skipped everywhere
  // else instead of throwing on a null reference.
  if (t52SearchInput && t52SearchPanel && t52SearchBackdrop && t52SearchWrap) {
    t52SearchPanel.addEventListener('click', (e) => {
      const star = e.target.closest('.t52-search-result-star');
      if (star) {
        e.preventDefault();
        e.stopPropagation();     // star click never opens the tool
        toggleFavorite(star.dataset.favId, star);
        return;
      }
      const row = e.target.closest('.t52-search-result');
      if (row) {
        const tool = TOOLS_DATA.find(t => t.id === row.dataset.toolId);
        if (tool) goToTool(tool);   // clicking anywhere else on the row (incl. arrow) opens it
      }
    });

    t52SearchInput.addEventListener('input', () => {
      t52SearchClear.classList.toggle('visible', t52SearchInput.value.trim().length > 0);
      renderSearchResults();
    });

    t52SearchClear.addEventListener('click', () => {
      t52SearchInput.value = '';
      t52SearchClear.classList.remove('visible');
      renderSearchResults();
      t52SearchInput.focus();
    });

    // Both 'focus' AND 'click' reopen the panel. This is the actual fix for
    // "click outside closes it, click again doesn't reopen": outside clicks
    // only hide the panel, they don't blur the input, so a bare 'focus'
    // listener alone would never re-fire. 'click' guarantees it reopens
    // every time, even if the input never lost focus.
    t52SearchInput.addEventListener('focus', () => {
      searchState.focused = true;
      renderSearchResults();
    });
    t52SearchInput.addEventListener('click', () => {
      searchState.focused = true;
      renderSearchResults();
    });

    t52SearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearchFully();
        t52SearchInput.blur();
        return;
      }
      const rows = Array.from(t52SearchPanel.querySelectorAll('.t52-search-result'));
      if (rows.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        t52ActiveIndex = (t52ActiveIndex + 1) % rows.length;
        rows.forEach(r => r.classList.remove('active'));
        rows[t52ActiveIndex].classList.add('active');
        rows[t52ActiveIndex].scrollIntoView({ block: 'nearest' });
        t52SearchInput.setAttribute('aria-activedescendant', rows[t52ActiveIndex].id);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        t52ActiveIndex = (t52ActiveIndex - 1 + rows.length) % rows.length;
        rows.forEach(r => r.classList.remove('active'));
        rows[t52ActiveIndex].classList.add('active');
        rows[t52ActiveIndex].scrollIntoView({ block: 'nearest' });
        t52SearchInput.setAttribute('aria-activedescendant', rows[t52ActiveIndex].id);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const tool = t52ActiveIndex >= 0 ? searchState.results[t52ActiveIndex] : searchState.results[0];
        if (tool) goToTool(tool);
      }
    });

    // click outside closes the panel only (query + focus flag persist)
    t52SearchBackdrop.addEventListener('click', closePanelOnly);
    document.addEventListener('click', (e) => {
      if (!t52SearchWrap.contains(e.target) && !t52SearchPanel.contains(e.target)) {
        closePanelOnly();
      }
    });
  }

  // ===================== GLOBAL KEYBOARD SHORTCUTS =====================
  function isTypingContext(el) {
    if (!el) return false;
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;
  }

  // Opens/focuses Search if this page has it (the homepage); otherwise
  // falls back to navigating to the homepage, since Search only lives
  // in the Hero section there.
  function openSearchOrGoHome() {
    if (t52SearchInput) {
      t52SearchInput.focus();
      renderSearchResults();
    } else {
      window.location.href = '/';
    }
  }

  document.addEventListener('keydown', (e) => {
    const isCmdOrCtrlK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
    if (isCmdOrCtrlK) {
      e.preventDefault();
      openSearchOrGoHome();
      return;
    }
    if (e.key === '/' && !isTypingContext(document.activeElement)) {
      e.preventDefault();
      openSearchOrGoHome();
    }
  });

  // Show the right shortcut label for the platform, same as the reference widget.
  if (t52SearchKbd) {
    const isMac = /Mac|iPhone|iPod|iPad/.test(navigator.platform || navigator.userAgent);
    t52SearchKbd.textContent = isMac ? '⌘K' : 'Ctrl K';
  }

  // Search "trigger" elements (header icon, popular-search chips) live
  // OUTSIDE .t52-search-wrap and the portaled panel. Their click handlers
  // must call stopPropagation() so the very click that OPENS the panel
  // never reaches the document-level outside-click listener above --
  // otherwise that same click bubbles to document, fails the
  // wrap/panel containment check, and closes the panel it just opened.
  const t52HeaderSearchBtn = document.getElementById('t52-header-search-btn');
  t52HeaderSearchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (t52SearchInput && searchState.panelOpen) {
      // second click on the same trigger closes Search, per spec
      closePanelOnly();
      t52SearchInput.blur();
    } else {
      openSearchOrGoHome();
    }
  });

  document.querySelectorAll('.t52-popular .t52-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      t52SearchInput.value = chip.textContent.trim();
      t52SearchInput.focus();
      renderSearchResults();
    });
  });

  // ===================== FAVORITES MODAL =====================
  const t52FavBackdrop = document.getElementById('t52-fav-backdrop');
  const t52FavModal    = document.getElementById('t52-fav-modal');
  const t52FavBody     = document.getElementById('t52-fav-modal-body');
  const t52FavBtn      = document.getElementById('t52-favorites-btn');
  const t52FavCloseBtn = document.getElementById('t52-fav-modal-close');

  function renderFavoritesModal() {
    const favIds = getFavorites();
    const favTools = TOOLS_DATA.filter(t => favIds.includes(t.id));

    if (favTools.length === 0) {
      t52FavBody.innerHTML = `
        <div class="t52-fav-empty">
          <div class="t52-fav-empty-icon">${STAR_SVG}</div>
          <h4>Your favorite tools will appear here</h4>
          <p>Save the tools you use most often for quick access.</p>
          <a href="#t52-tools-grid" class="t52-fav-empty-cta" id="t52-fav-browse-link">
            Browse All Tools
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>`;
      const browseLink = document.getElementById('t52-fav-browse-link');
      if (browseLink) browseLink.addEventListener('click', () => closeFavModal());
      return;
    }
    t52FavBody.innerHTML = `<div class="t52-fav-grid">${favTools.map(toolCardHTML).join('')}</div>`;
  }

  function openFavModal() {
    renderFavoritesModal();
    t52FavBackdrop.classList.add('open');
    t52FavModal.classList.add('open');
  }
  function closeFavModal() {
    t52FavBackdrop.classList.remove('open');
    t52FavModal.classList.remove('open');
  }

  t52FavBtn.addEventListener('click', openFavModal);
  t52FavCloseBtn.addEventListener('click', closeFavModal);
  t52FavBackdrop.addEventListener('click', closeFavModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && t52FavModal.classList.contains('open')) closeFavModal();
  });

  t52FavModal.addEventListener('click', (e) => {
    const star = e.target.closest('.t52-fav-star');
    if (star) {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(star.dataset.favId, star);
    }
  });

  // ===================== MISC EXISTING UI (unchanged behavior) =====================
  const THEME_KEY = '52tools_theme';
  const t52Root = document.querySelector('.t52');
  const t52ThemeBtn = document.getElementById('t52-theme-btn');

  function applyStoredTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    const isDark = saved === 'dark';
    t52Root.classList.toggle('t52-dark-preview', isDark);
    t52ThemeBtn.classList.toggle('active', isDark);
    t52ThemeBtn.setAttribute('aria-pressed', String(isDark));
  }

  t52ThemeBtn.addEventListener('click', () => {
    const isDark = t52Root.classList.toggle('t52-dark-preview');
    t52ThemeBtn.classList.toggle('active', isDark);
    t52ThemeBtn.setAttribute('aria-pressed', String(isDark));
    try { localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch (e) {}
  });

  applyStoredTheme();

  const t52ArrowNav = document.querySelector('.t52-arrow-nav');
  if (t52ArrowNav) {
    t52ArrowNav.addEventListener('click', () => {
      const first = t52ToolsGridEl.firstElementChild;
      if (first) t52ToolsGridEl.appendChild(first);
    });
  }

  const t52Form = document.getElementById('t52-subscribe-form');
  if (t52Form) {
    t52Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = t52Form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed!';
      setTimeout(() => { btn.textContent = original; t52Form.reset(); }, 1800);
    });
  }

  // ===================== INITIAL RENDER =====================
  renderToolsGrid();
  renderCategoriesGrid();
  renderFavCount();
  // Pre-paint Popular/Recent Searches into the (still hidden) panel right
  // now, at page load -- so the very first click has nothing left to build.
  // Opening the panel from here on is purely a visibility/position toggle.
  // Guarded: the search panel only exists on the homepage (Hero.astro).
  if (t52SearchPanel) paintEmptyState();
})();
