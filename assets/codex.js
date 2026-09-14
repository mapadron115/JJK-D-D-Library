/* Ritual Archive — Technique Codex (FM-RA-01)
 * Reads window.CODEX from data/codex.js. No frameworks, no network calls.
 * Pure helpers (esc, md, matches, groupByLevel, renderers) are DOM-free so
 * they can be smoke-tested in node; the DOM wiring at the bottom only runs
 * when `document` exists. */
(function () {
'use strict';

var CODEX = (typeof window !== 'undefined' && window.CODEX) || { techniques: [] };
var TECHS = Array.isArray(CODEX.techniques) ? CODEX.techniques : [];
/* Original techniques: the library dossiers (window.LIBRARY_ENTRIES). */
var LIBS = (typeof window !== 'undefined' && Array.isArray(window.LIBRARY_ENTRIES))
  ? window.LIBRARY_ENTRIES : [];

/* Cursed tools are gear, not techniques — the arsenal, sacred treasures, Djinn metal
   vessels, and the Djinn system primer live on their own tab. */
function isToolEntry(e) {
  var k = (e && e.kind) || '';
  return k === 'Cursed Tool' || k === 'Djinn / Metal Vessel' || k === 'Sacred Treasure'
    || (e && e.id === 'e062');
}
var N_TECH_LIBS = LIBS.filter(function (e) { return !isToolEntry(e); }).length;
var N_TOOLS = LIBS.length - N_TECH_LIBS;

var TIER_ORDER = { 'I': 0, 'II': 1, 'III': 2, 'IV': 3, 'V': 4 };
var DETAIL_LABEL = { full: 'FULL PROGRESSION', summary: 'DOSSIER SUMMARY', bespoke: 'BESPOKE RECORD' };

/* Edition-aware dossier base: dossiers/ lives beside assets/ at the site root.
   Derived from this script's own URL so pages served from a subdirectory,
   illustrated/) resolve dossier links correctly. Root behavior unchanged. */
/* Edition-aware dossier base: dossiers/ lives beside assets/ at the site root.
   Derived from this script's own URL so pages served from a subdirectory,
   illustrated/) resolve dossier links correctly. Root behavior unchanged. */
var DOSSIER_BASE = (function () {
  try {
    var src = (document.currentScript && document.currentScript.src) || '';
    var m = src.match(/^(.*)\/assets\/codex\.js(\?.*)?$/);
    if (m) return m[1] + '/dossiers/';
  } catch (e) {}
  return 'dossiers/';
})();

/* Edition-aware image base: assets/img/ lives beside assets/ at the site root.
   Derived from this script's own URL so subdirectory editions resolve
   per-technique card art correctly. Root behavior unchanged. */
var IMG_BASE = (function () {
  try {
    var src = (document.currentScript && document.currentScript.src) || '';
    var m = src.match(/^(.*)\/assets\/codex\.js(\?.*)?$/);
    if (m) return m[1] + '/assets/img/';
  } catch (e) {}
  return 'assets/img/';
})();

/* Per-technique card art. Data entries may carry an "img" filename (imagery
   wiring only — never text). The filename is whitelisted to plain image names
   so data can never inject paths or markup. Cards without img fall back to the
   edition's nth-child cycling art via CSS. */
function cardImg(e) {
  var f = e && e.img;
  if (typeof f === 'string' && /^[A-Za-z0-9][\w\-.]*\.(jpg|jpeg|png|webp)$/i.test(f)) {
    return { attr: ' data-img="1"', css: "--card-img:url('" + IMG_BASE + f + "')" };
  }
  return { attr: '', css: '' };
}

/* ── text helpers ─────────────────────────────── */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/* Minimal markdown: **bold**, *italic*, "- " bullets, blank-line paragraphs.
 * HTML is escaped first so data can never inject markup. */
function md(src) {
  if (!src) return '';
  function inline(s) {
    s = esc(s);
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*\w])\*([^*\n]+?)\*/g, '$1<em>$2</em>');
    return s;
  }
  var lines = String(src).split(/\r?\n/), html = '', inList = false, para = [];
  function flushPara() {
    if (para.length) { html += '<p>' + para.map(inline).join(' ') + '</p>'; para = []; }
  }
  for (var i = 0; i < lines.length; i++) {
    var ln = lines[i];
    if (/^\s*-\s+/.test(ln)) {
      flushPara();
      if (!inList) { html += '<ul>'; inList = true; }
      html += '<li>' + inline(ln.replace(/^\s*-\s+/, '')) + '</li>';
    } else if (/^\s*$/.test(ln)) {
      if (inList) { html += '</ul>'; inList = false; }
      flushPara();
    } else {
      para.push(ln.trim());
    }
  }
  if (inList) html += '</ul>';
  flushPara();
  return html;
}

/* ── search / filter ──────────────────────────── */
function haystack(t) {
  var bits = [t.figure, t.technique, t.title, t.role, t.region, t.era, t.culture,
    t.concept, t.ce_ability, t.primary_verb];
  (t.features || []).forEach(function (f) { bits.push(f.name, f.cost_line, f.text); });
  ['maximum', 'domain', 'l20'].forEach(function (k) {
    var r = t[k];
    if (r) bits.push(r.name, r.cost_line, r.text);
  });
  if (t.summary_text) bits.push(t.summary_text);
  return bits.filter(Boolean).join(' ').toLowerCase();
}

function matches(t, st) {
  if (st.tab === 'tools') return false;
  if (st.origin === 'originals') return false;
  /* Figures carry no collection — any active collection filter excludes them. */
  if (st.collection) return false;
  if (st.tier && (t.tier || '') !== st.tier) return false;
  if (st.role && roleBuckets(t.role).indexOf(st.role) < 0) return false;
  if (st.region && (t.region || '') !== st.region) return false;
  if (st.culture && (t.culture || '') !== st.culture) return false;
  if (st.detail && (t.detail || '') !== st.detail) return false;
  if (st.q) {
    var q = st.q.toLowerCase();
    var hit = q.split(/\s+/).every(function (w) { return haystack(t).indexOf(w) !== -1; });
    if (!hit) return false;
  }
  return true;
}

/* ── original techniques (library dossiers) ─── */
function libHaystack(e) {
  var bits = [e.id, e.title, e.collection, e.summary, e.kind, e.tier, e.grade, e.role, e.source, e.aliases];
  return bits.filter(Boolean).join(' ').toLowerCase();
}

function matchesLib(e, st) {
  /* Techniques tab hides tools; Cursed Tools tab shows only tools. */
  if (st.tab === 'tools' ? !isToolEntry(e) : isToolEntry(e)) return false;
  if (st.origin === 'figures') return false;
  /* Figure-only filters (region, culture, record type): original techniques
     carry none of that data, so any active figure-only filter excludes them —
     the filter actually filters instead of dumping every original below the
     matching figures. Tier and role now exist on originals too, so those two
     filter them normally. */
  if (st.region || st.culture || st.detail) return false;
  if (st.tier && tierNumeral(e) !== st.tier) return false;
  if (st.role && roleBuckets(e.role || '').indexOf(st.role) < 0) return false;
  if (st.collection && (e.collection || '') !== st.collection) return false;
  if (st.q) {
    var q = st.q.toLowerCase();
    var hit = q.split(/\s+/).every(function (w) { return libHaystack(e).indexOf(w) !== -1; });
    if (!hit) return false;
  }
  return true;
}

/* Tier numeral for the stamp on original-library cards. Newer entries carry
   "Tier IV · Special Grade" style tiers; legacy entries fall back to a
   grade/rank mapping (Special Grade≈IV, Calamity≈V, Grade 1≈III, Grade 2≈II,
   Grade 3–4≈I). Entries with no mappable tier get no stamp. */
var GRADE_TIER_FALLBACK = {
  'Special Grade': 'IV', 'Calamity': 'V',
  'Grade 1': 'III', 'Grade 2': 'II', 'Grade 3': 'I', 'Grade 4': 'I',
  'Rank S': 'IV', 'Rank A': 'III', 'Rank B': 'II'
};
function tierNumeral(e) {
  var m = /Tier ([IVX]+)/.exec((e && e.tier) || '');
  if (m) return m[1];
  var t = (e && e.tier) || '';
  if (GRADE_TIER_FALLBACK[t]) return GRADE_TIER_FALLBACK[t];
  return GRADE_TIER_FALLBACK[(e && e.grade) || ''] || '';
}

function renderLibCard(e) {
  e = e || {};
  var accent = e.accent || '#b33a2b';
  var raw = e.href || ((e.id || '') + '.html');
  var href = (/^dossiers\//.test(raw) && typeof DOSSIER_BASE === 'string') ? DOSSIER_BASE + raw.slice(9) : raw;
  var ci = cardImg(e);
  var numeral = tierNumeral(e);
  var tierStamp = numeral ? '<span class="tier-stamp">' + esc(numeral) + '</span>' : '';
  var roleTag = e.role ? '<span class="role-tag">' + esc(e.role) + '</span>' : '';
  return '<article class="entry lib-card"' + ci.attr + ' style="--accent:' + esc(accent) + ';' + ci.css + '">' +
    '<a class="lib-link" href="' + esc(href) + '">' +
    '<span class="lib-headrow">' +
    '<span class="head-main">' +
    '<span class="entry-no">Original · ' + esc(e.collection || 'Library') + '</span>' +
    '<span class="lib-title">' + esc(e.title || 'Untitled technique') + '</span>' +
    '<span class="lib-chips">' +
    (e.kind ? '<span class="kind-chip">' + esc(e.kind) + '</span>' : '') +
    (!numeral && (e.grade || e.tier) ? '<span class="tier-chip">' + esc(e.grade || e.tier) + '</span>' : '') +
    '</span>' +
    '</span>' +
    '<span class="head-side">' + tierStamp + roleTag +
    '<span class="detail-tag">Full dossier</span>' +
    '</span></span>' +
    (e.summary ? '<span class="concept">' + esc(e.summary) + '</span>' : '') +
    '<span class="dossier-cta">Open full dossier →</span>' +
    '</a></article>';
}

/* ── progression grouping ────────────────────── */
function groupByLevel(features) {
  var groups = [], seen = {};
  (features || []).forEach(function (f) {
    var lv = (f && typeof f.level === 'number') ? f.level : null;
    var key = lv === null ? 'u' : 'l' + lv;
    if (!seen[key]) { seen[key] = { level: lv, feats: [] }; groups.push(seen[key]); }
    seen[key].feats.push(f);
  });
  groups.sort(function (a, b) {
    if (a.level === null) return 1;
    if (b.level === null) return -1;
    return a.level - b.level;
  });
  return groups;
}

/* ── renderers (return HTML strings) ──────────── */
function renderFeature(f) {
  f = f || {};
  var kind = f.kind === 'simple_domain'
    ? '<span class="kind-tag">Simple Domain</span>' : '';
  return '<div class="feat">' +
    '<div class="feat-head"><h5>' + esc(f.name || 'Unnamed feature') + '</h5>' + kind + '</div>' +
    (f.cost_line ? '<div class="cost">' + esc(f.cost_line) + '</div>' : '') +
    '<div class="feat-text">' + md(f.text) + '</div>' +
    '</div>';
}

function renderLevelGroups(features) {
  var groups = groupByLevel(features);
  if (!groups.length) return '';
  return groups.map(function (g) {
    var label = g.level === null ? 'UNLEVELED' : 'LEVEL ' + g.level;
    return '<section class="lvl"><div class="lvl-head"><span class="lvl-chip">' + label + '</span></div>' +
      g.feats.map(renderFeature).join('') + '</section>';
  }).join('');
}

function renderCallout(kind, kicker, rec) {
  rec = rec || {};
  var head = '<div class="callout-head"><span class="callout-kicker">' + esc(kicker) + '</span>' +
    '<h4>' + esc(rec.name || kicker) + '</h4></div>';
  var body = (rec.cost_line ? '<div class="cost">' + esc(rec.cost_line) + '</div>' : '') +
    '<div class="body">' + md(rec.text) + '</div>';
  return '<section class="callout callout-' + kind + '">' + head + body + '</section>';
}

function renderDomain(d) {
  d = d || {};
  function cell(label, val) {
    return '<div><dt>' + esc(label) + '</dt><dd>' + esc(val == null || val === '' ? '—' : val) + '</dd></div>';
  }
  var data = '<dl class="domain-data">' +
    cell('Clash points', d.clash_points) +
    cell('Burnout', d.burnout_rounds == null ? null : d.burnout_rounds + ' rounds') +
    cell('Duration', d.duration_min == null ? null : d.duration_min + (d.duration_min === 1 ? ' minute' : ' minutes')) +
    cell('Radius', d.radius) +
    cell('Activation ✦', d.activation) +
    cell('CE cost ✦', d.ce_cost) +
    '</dl>';
  var prov = (d.activation != null || d.ce_cost != null)
    ? '<p class="prov-note">✦ Canon: figure Domains are Specific Domains — the stated profile governs, not the player point-unlock table.</p>' : '';
  var head = '<div class="callout-head"><span class="callout-kicker">Domain Expansion</span>' +
    '<h4>' + esc(d.name || 'Domain Expansion') + '</h4></div>';
  var body = (d.cost_line ? '<div class="cost">' + esc(d.cost_line) + '</div>' : '') +
    '<div class="body">' + md(d.text) + '</div>';
  return '<section class="callout callout-domain">' + head + data + prov + body + '</section>';
}

function renderBody(t) {
  var out = '';
  var stats = [];
  if (t.ce_ability) stats.push('CE ability <b>' + esc(t.ce_ability) + '</b>');
  if (t.primary_verb) stats.push('Primary verb <b>' + esc(t.primary_verb) + '</b>');
  if (t.tier) stats.push('Tier <b>' + esc(t.tier) + '</b>');
  if (stats.length) out += '<div class="entry-statline"><span>' + stats.join('</span><span>') + '</span></div>';


  if (t.detail === 'summary') {
    out += '<div class="summary-body">' + md(t.summary_text) + '</div>';
  } else {
    var feats = t.features || [];
    if (!feats.length && !t.maximum && !t.domain && !t.l20) {
      out += '<div class="summary-body"><p><em>Bespoke record — no leveled features extracted. Consult the lore bible module for the full text.</em></p></div>';
    } else {
      out += renderLevelGroups(feats);
    }
  }
  if (t.maximum) out += renderCallout('maximum', 'Maximum Technique', t.maximum);
  if (t.domain) out += renderDomain(t.domain);
  if (t.l20) out += renderCallout('l20', 'Level 20 · Capstone', t.l20);
  return out;
}

function renderEntry(t) {
  t = t || {};
  var id = 'entry-' + (t.id || 'unknown');
  var module = t.module ? String(t.module).padStart(2, '0') : '—';
  var tierBadge = t.tier ? '<span class="tier-stamp">' + esc(t.tier) + '</span>' : '';
  var roleTag = t.role ? '<span class="role-tag">' + esc(t.role) + '</span>' : '';
  var regionEra = [t.region, t.era].filter(Boolean).join(' · ');
  var open = openIds.has(id) ? ' open' : '';
  var ci = cardImg(t);
  return '<article class="entry' + open + '" id="' + esc(id) + '"' + ci.attr + ' style="' + ci.css + '">' +
    '<button class="entry-head" type="button" data-toggle="' + esc(id) + '" aria-expanded="' + openIds.has(id) + '">' +
    '<span class="head-main">' +
    '<span class="entry-no">Entry ' + esc(module) + '</span>' +
    '<span class="figure">' + esc(t.technique || t.figure || 'Unknown technique') + '</span>' + // headline = technique name
    (t.technique ? '<span class="techname">' + esc(t.figure || 'Unknown figure') + '</span>' : '') + // byline = figure name
    (regionEra ? '<span class="meta-line">' + esc(regionEra) + '</span>' : '') +
    (t.concept ? '<span class="concept">“' + esc(t.concept) + '”</span>' : '') +
    '</span>' +
    '<span class="head-side">' + tierBadge + roleTag +
    '<span class="detail-tag">' + esc(DETAIL_LABEL[t.detail] || t.detail || '') + '</span>' +
    '<span class="chev">' + (openIds.has(id) ? '−' : '＋') + '</span>' +
    '</span></button>' +
    '<div class="entry-body"' + (openIds.has(id) ? '' : ' hidden') + '>' + renderBody(t) + '</div>' +
    '</article>';
}

/* ── state + filter dropdowns ─────────────────── */
var openIds = new Set();
var state = { q: '', tier: '', role: '', region: '', culture: '', detail: '',
  origin: 'all', collection: '', tab: 'tech' };

/* Canonical six combat roles — the same buckets the builder's technique picker uses.
 * Free-text figure roles (60+ distinct strings) map into these; the dropdown
 * offers only the six, and filtering matches by bucket. */
var ROLE_ORDER=['Striker','Tank','Controller','Blaster','Support','Utility'];
var ROLE_PATTERNS=[
  ['Striker',/striker|duelist/i],
  ['Tank',/tank|brute|grappl|defen[cs]e|defender/i],
  ['Controller',/controll|debuff|denial|snare|edict|fear|geometry|encirclement/i],
  ['Blaster',/\bblaster\b|\bcaster\b/i],
  ['Support',/support|buffer|liberator|morale/i],
  ['Utility',/utility|exploration|mobility|infiltrat|escape|divination/i]
];
var ROLE_OVERRIDES={'redistribution / inversion':['Controller']};
function roleBuckets(role){
  if(!role) return [];
  if(ROLE_OVERRIDES[role]) return ROLE_OVERRIDES[role];
  var out=[];
  ROLE_PATTERNS.forEach(function(p){ if(p[1].test(role)) out.push(p[0]); });
  return out;
}
function uniqSorted(vals, cmp) {
  var seen = {}, out = [];
  vals.forEach(function (v) { if (v && !seen[v]) { seen[v] = 1; out.push(v); } });
  out.sort(cmp || function (a, b) { return a.localeCompare(b); });
  return out;
}

function fillSelect(el, options, allLabel) {
  el.innerHTML = '<option value="">' + esc(allLabel) + '</option>' +
    options.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + '</option>'; }).join('');
}

/* expose for node smoke tests */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { esc: esc, md: md, haystack: haystack, matches: matches,
    libHaystack: libHaystack, matchesLib: matchesLib,
    groupByLevel: groupByLevel, renderEntry: renderEntry, renderBody: renderBody,
    renderDomain: renderDomain, renderLibCard: renderLibCard,
    TECHS: TECHS, LIBS: LIBS };
}

/* ── DOM wiring (browser only) ────────────────── */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    var grid = document.getElementById('entries');
    var emptyState = document.getElementById('emptyState');
    var resultCount = document.getElementById('resultCount');
    var q = document.getElementById('q');

    // stat strip — tools are gear, not techniques (see the page lede), so the
    // "original techniques" stat counts technique entries only, not tools.
    var collections = uniqSorted(LIBS.map(function (e) { return e.collection; }));
    document.getElementById('statTotal').textContent = TECHS.length + N_TECH_LIBS;
    document.getElementById('statFigures').textContent = TECHS.length;
    document.getElementById('statOriginals').textContent = N_TECH_LIBS;
    document.getElementById('statCollections').textContent = collections.length;

    // filter dropdowns built from live data
    // Tier options: figure tiers plus any extra numerals the original library
    // uses (e.g. Tier X), so every stamped card is filterable.
    var tierOpts = TECHS.map(function (t) { return t.tier; });
    LIBS.forEach(function (e) {
      var n = tierNumeral(e);
      if (n && tierOpts.indexOf(n) < 0) tierOpts.push(n);
    });
    fillSelect(document.getElementById('fTier'),
      uniqSorted(tierOpts, function (a, b) {
        return (TIER_ORDER[a] == null ? 99 : TIER_ORDER[a]) - (TIER_ORDER[b] == null ? 99 : TIER_ORDER[b]);
      }), 'All tiers');
    fillSelect(document.getElementById('fRole'), ROLE_ORDER.slice(), 'All roles');
    fillSelect(document.getElementById('fRegion'),
      uniqSorted(TECHS.map(function (t) { return t.region; })), 'All regions');
    fillSelect(document.getElementById('fCulture'),
      uniqSorted(TECHS.map(function (t) { return t.culture; })), 'All cultures');
    fillSelect(document.getElementById('fCollection'), collections, 'All collections');

    // origin filter: historical figures vs. original techniques (one unified list)
    var originSel = document.getElementById('fOrigin');
    function syncFilterVisibility() {
      document.querySelectorAll('[data-for]').forEach(function (el) {
        var f = el.getAttribute('data-for');
        el.style.display = (state.origin === 'all' || state.origin === f) ? '' : 'none';
      });
      /* Techniques-only filters (Origin, figure fields) hide on the Cursed Tools tab. */
      document.querySelectorAll('[data-tabonly]').forEach(function (el) {
        el.style.display = (state.tab === el.getAttribute('data-tabonly')) ? '' : 'none';
      });
    }
    originSel.addEventListener('change', function (ev) {
      state.origin = ev.target.value;
      syncFilterVisibility();
      render();
    });
    syncFilterVisibility();

    /* Techniques / Cursed Tools tabs */
    var tabBtns = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
    function setTab(t) {
      state.tab = t;
      /* Figure-only filters are meaningless on the tools tab and their
         controls are hidden there — a stale filter would dead-end the tab
         with no visible cause. Clear them (and origin) on every tab switch. */
      state.tier = ''; state.role = ''; state.region = ''; state.culture = ''; state.detail = '';
      state.origin = 'all';
      ['fTier', 'fRole', 'fRegion', 'fCulture', 'fDetail'].forEach(function (fid) {
        var el = document.getElementById(fid); if (el) el.value = '';
      });
      var oel = document.getElementById('fOrigin'); if (oel) oel.value = 'all';
      tabBtns.forEach(function (b) {
        var on = b.getAttribute('data-tab') === t;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
      });
      syncFilterVisibility();
      render();
    }
    tabBtns.forEach(function (b) {
      b.addEventListener('click', function () { setTab(b.getAttribute('data-tab')); });
    });

    // deep link: #entry-<id>
    var m = (location.hash || '').match(/^#entry-([\w-]+)$/);
    if (m) {
      var want = 'entry-' + m[1];
      if (TECHS.some(function (t) { return 'entry-' + t.id === want; })) openIds.add(want);
      else {
        var le = LIBS.filter(function (e) { return 'entry-' + e.id === want; })[0];
        if (le) { setTab(isToolEntry(le) ? 'tools' : 'tech'); openIds.add(want); }
      }
    }

    function render() {
      var figs = TECHS.filter(function (t) { return matches(t, state); });
      var libs = LIBS.filter(function (e) { return matchesLib(e, state); });
      /* one unified list: figures first, then originals — each card labels its own origin */
      grid.innerHTML = figs.map(renderEntry).join('') + libs.map(renderLibCard).join('');
      emptyState.classList.toggle('show', !figs.length && !libs.length);
      var total = state.tab === 'tools' ? N_TOOLS
        : state.origin === 'all' ? TECHS.length + N_TECH_LIBS
        : state.origin === 'figures' ? TECHS.length : N_TECH_LIBS;
      resultCount.textContent = 'Showing ' + (figs.length + libs.length) + ' of ' + total +
        (state.tab === 'tools' ? ' cursed tools' : ' entries');
    }

    grid.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-toggle]');
      if (!btn) return;
      var id = btn.getAttribute('data-toggle');
      var article = document.getElementById(id);
      if (!article) return;
      var body = article.querySelector('.entry-body');
      var isOpen = openIds.has(id);
      if (isOpen) { openIds.delete(id); } else { openIds.add(id); }
      article.classList.toggle('open', !isOpen);
      body.hidden = isOpen;
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.querySelector('.chev').textContent = isOpen ? '＋' : '−';
      try {
        if (!isOpen) { history.replaceState(null, '', '#' + id); }
        else if (location.hash === '#' + id) { history.replaceState(null, '', location.pathname + location.search); }
      } catch (e) { /* file:// or sandboxed: ignore */ }
    });

    q.addEventListener('input', function () { state.q = q.value.trim(); render(); });
    ['fTier', 'fRole', 'fRegion', 'fCulture', 'fDetail', 'fCollection'].forEach(function (fid) {
      document.getElementById(fid).addEventListener('change', function (ev) {
        state[fid.slice(1).toLowerCase()] = ev.target.value;
        render();
      });
    });
    document.getElementById('clearAll').addEventListener('click', function () {
      state = { q: '', tier: '', role: '', region: '', culture: '', detail: '',
        origin: 'all', collection: '', tab: state.tab };
      q.value = '';
      ['fTier', 'fRole', 'fRegion', 'fCulture', 'fDetail', 'fCollection'].forEach(function (fid) {
        document.getElementById(fid).value = '';
      });
      document.getElementById('fOrigin').value = 'all';
      syncFilterVisibility();
      render();
    });

    render();

    // scroll to deep-linked entry after first paint
    if (m) {
      var target = document.getElementById('entry-' + m[1]);
      if (target) setTimeout(function () { target.scrollIntoView({ block: 'start' }); }, 50);
    }
  }
}
})();
