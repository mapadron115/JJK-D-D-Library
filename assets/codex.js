/* Ritual Archive — Technique Codex (FM-RA-01)
 * Reads window.CODEX from data/codex.js. No frameworks, no network calls.
 * Pure helpers (esc, md, matches, groupByLevel, renderers) are DOM-free so
 * they can be smoke-tested in node; the DOM wiring at the bottom only runs
 * when `document` exists. */
(function () {
'use strict';

var CODEX = (typeof window !== 'undefined' && window.CODEX) || { techniques: [] };
var TECHS = Array.isArray(CODEX.techniques) ? CODEX.techniques : [];

var TIER_ORDER = { 'I': 0, 'II': 1, 'III': 2, 'IV': 3, 'V': 4 };
var DETAIL_LABEL = { full: 'FULL PROGRESSION', summary: 'DOSSIER SUMMARY', bespoke: 'BESPOKE RECORD' };

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
  if (st.tier && (t.tier || '') !== st.tier) return false;
  if (st.role && (t.role || '') !== st.role) return false;
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
  if (t.serves) out += '<p class="plays-line">❖ Plays into: ' + esc(t.serves) + '</p>';

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
  return '<article class="entry' + open + '" id="' + esc(id) + '">' +
    '<button class="entry-head" type="button" data-toggle="' + esc(id) + '" aria-expanded="' + openIds.has(id) + '">' +
    '<span class="head-main">' +
    '<span class="entry-no">Entry ' + esc(module) + '</span>' +
    '<span class="figure">' + esc(t.figure || 'Unknown figure') + '</span>' +
    (t.technique ? '<span class="techname">' + esc(t.technique) + '</span>' : '') +
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
var state = { q: '', tier: '', role: '', region: '', culture: '', detail: '' };

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
    groupByLevel: groupByLevel, renderEntry: renderEntry, renderBody: renderBody,
    renderDomain: renderDomain, TECHS: TECHS };
}

/* ── DOM wiring (browser only) ────────────────── */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    var grid = document.getElementById('entries');
    var emptyState = document.getElementById('emptyState');
    var resultCount = document.getElementById('resultCount');
    var q = document.getElementById('q');

    // stat strip
    document.getElementById('statTotal').textContent = TECHS.length;
    document.getElementById('statFull').textContent = TECHS.filter(function (t) { return t.detail === 'full'; }).length;
    document.getElementById('statSummary').textContent = TECHS.filter(function (t) { return t.detail === 'summary'; }).length;
    document.getElementById('statBespoke').textContent = TECHS.filter(function (t) { return t.detail === 'bespoke'; }).length;

    // filter dropdowns built from live data
    fillSelect(document.getElementById('fTier'),
      uniqSorted(TECHS.map(function (t) { return t.tier; }), function (a, b) {
        return (TIER_ORDER[a] == null ? 99 : TIER_ORDER[a]) - (TIER_ORDER[b] == null ? 99 : TIER_ORDER[b]);
      }), 'All tiers');
    fillSelect(document.getElementById('fRole'),
      uniqSorted(TECHS.map(function (t) { return t.role; })), 'All roles');
    fillSelect(document.getElementById('fRegion'),
      uniqSorted(TECHS.map(function (t) { return t.region; })), 'All regions');
    fillSelect(document.getElementById('fCulture'),
      uniqSorted(TECHS.map(function (t) { return t.culture; })), 'All cultures');

    // deep link: #entry-<id>
    var m = (location.hash || '').match(/^#entry-([\w-]+)$/);
    if (m) {
      var want = 'entry-' + m[1];
      if (TECHS.some(function (t) { return 'entry-' + t.id === want; })) openIds.add(want);
    }

    function render() {
      var list = TECHS.filter(function (t) { return matches(t, state); });
      grid.innerHTML = list.map(renderEntry).join('');
      emptyState.classList.toggle('show', !list.length);
      resultCount.textContent = 'Showing ' + list.length + ' of ' + TECHS.length + ' entries';
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
    ['fTier', 'fRole', 'fRegion', 'fCulture', 'fDetail'].forEach(function (fid) {
      document.getElementById(fid).addEventListener('change', function (ev) {
        state[fid.slice(1).toLowerCase()] = ev.target.value;
        render();
      });
    });
    document.getElementById('clearAll').addEventListener('click', function () {
      state = { q: '', tier: '', role: '', region: '', culture: '', detail: '' };
      q.value = '';
      ['fTier', 'fRole', 'fRegion', 'fCulture', 'fDetail'].forEach(function (fid) {
        document.getElementById(fid).value = '';
      });
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
