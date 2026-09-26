/*
 * dossier-roll.js — click-to-roll dice expressions on Ritual Archive dossier pages.
 *
 * Dossier pages are static HTML with no shared JS. This script finds dice
 * expressions (e.g. "2d10+3") inside elements with class "rules-line", wraps
 * each one in a <button class="die-roll">, and rolls it on click, showing the
 * result in a small floating toast. Styles are injected from this file so
 * dossier HTML needs no CSS changes.
 *
 * No dependencies. No emojis in the UI (★ / ✕ / ❖ glyphs are fine).
 */

(function () {
  'use strict';

  // Matches dice expressions like 2d10, 1d6+3, 2d12 - 2.
  var DICE_RE = /\b(\d{1,3})d(\d{1,3})((?:\s*[+-]\s*\d+)?)/g;
  // Parses the normalized data-expr attribute.
  var EXPR_RE = /^(\d+)d(\d+)([+-]\d+)?$/;

  var CSS =
    '.die-roll{background:none;border:none;color:#d8b86a;text-decoration:underline dotted;' +
    'text-underline-offset:3px;cursor:pointer;font:inherit;font-weight:700;' +
    'padding:6px 4px;min-height:44px;min-width:44px}' +
    '.die-roll:hover{color:#e9cf87;background:rgba(216,184,106,.12);border-radius:6px}' +
    '.dr-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);' +
    'background:#14161d;border:1px solid #d8b86a;color:#f4f1e8;border-radius:10px;' +
    'padding:12px 22px;font-size:1.05rem;font-weight:600;z-index:9999;' +
    'box-shadow:0 10px 40px #000a;max-width:92vw;text-align:center;opacity:1;' +
    'transition:opacity .25s ease}' +
    '.dr-toast.dr-hidden{opacity:0;pointer-events:none}' +
    '.dr-toast .dr-crit{color:#ffd766}';

  function injectStyles() {
    var style = document.createElement('style');
    style.setAttribute('data-dossier-roll', '1');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // Returns true if any ancestor of node is a button (existing interactive
  // content we must not nest a new button inside).
  function insideButton(node) {
    var el = node.parentNode;
    while (el) {
      if (el.nodeType === 1) {
        var tag = el.tagName;
        if (tag === 'BUTTON' || (tag === 'A' && el.classList && el.classList.contains('die-roll'))) {
          return true;
        }
      }
      el = el.parentNode;
    }
    return false;
  }

  // Wrap every dice expression in a text node with a <button class="die-roll">.
  function wrapTextNode(textNode) {
    var text = textNode.nodeValue;
    DICE_RE.lastIndex = 0;
    var matches = [];
    var m;
    while ((m = DICE_RE.exec(text)) !== null) {
      matches.push({
        index: m.index,
        raw: m[0],
        normalized: (m[1] + 'd' + m[2] + (m[3] || '')).replace(/\s+/g, '')
      });
    }
    if (!matches.length) return;

    // Split from last to first so earlier match indices stay valid.
    // `head` always points at the leading, not-yet-processed text portion.
    var head = textNode;
    for (var i = matches.length - 1; i >= 0; i--) {
      var hit = matches[i];
      head.splitText(hit.index + hit.raw.length); // tail = text after the match
      var exprNode = head.splitText(hit.index);   // exprNode = the matched text
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'die-roll';
      btn.setAttribute('data-expr', hit.normalized);
      btn.setAttribute('aria-label', 'Roll ' + hit.normalized);
      btn.textContent = exprNode.nodeValue;
      head.parentNode.replaceChild(btn, exprNode);
      // head now covers only text before this match; continue with earlier ones.
    }
  }

  function processElement(el) {
    if (el.dataset && el.dataset.rolled) return; // already processed
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var node;
    while ((node = walker.nextNode()) !== null) {
      if (node.nodeValue && !insideButton(node)) nodes.push(node);
    }
    nodes.forEach(wrapTextNode);
    if (el.dataset) el.dataset.rolled = '1';
  }

  function processAll() {
    var els = document.querySelectorAll('.rules-line');
    if (!els.length) return; // pages without rules lines: nothing to do
    Array.prototype.forEach.call(els, processElement);
  }

  // ---- Rolling & toast ----

  var toastEl = null;
  var toastTimer = null;

  function getToast() {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'dr-toast dr-hidden';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    return toastEl;
  }

  function showToast(html) {
    var toast = getToast();
    toast.innerHTML = html;
    toast.classList.remove('dr-hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.add('dr-hidden');
    }, 3000);
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function rollExpression(expr) {
    var parts = EXPR_RE.exec(expr);
    if (!parts) return;
    var count = Math.min(parseInt(parts[1], 10), 500); // safety cap
    var size = Math.min(parseInt(parts[2], 10), 1000);
    var mod = parts[3] ? parseInt(parts[3], 10) : 0;
    if (!count || !size) return;

    var rolls = [];
    for (var i = 0; i < count; i++) {
      rolls.push(1 + Math.floor(Math.random() * size));
    }
    var total = rolls.reduce(function (a, b) { return a + b; }, 0) + mod;
    var modText = mod ? ' ' + (mod > 0 ? '+' + mod : String(mod)) : '';

    var isD20 = size === 20;
    var hasCrit = isD20 && rolls.some(function (r) { return r === 20; });
    var hasFumble = isD20 && rolls.some(function (r) { return r === 1; });

    var out = escapeHtml(expr) + ' → [' + rolls.join(', ') + ']' + escapeHtml(modText);
    if (hasCrit || hasFumble) {
      if (hasCrit) out += ' <span class="dr-crit">★ CRIT!</span>';
      if (hasFumble) out += ' ✕ fumble';
    } else {
      out += ' = ' + total;
    }
    showToast(out);
  }

  function init() {
    injectStyles();
    processAll();
    document.addEventListener('click', function (e) {
      var target = e.target;
      var btn = target && target.closest ? target.closest('.die-roll') : null;
      if (!btn) return;
      e.preventDefault();
      rollExpression(btn.getAttribute('data-expr'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
