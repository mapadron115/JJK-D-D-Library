# Ritual Archive — Final Site Build Plan

**Goal (zack, 2026-09-11):** one unified site — character builder + rulebook + technique library + campaign story.
**Design:** B "Field Manual" — light ink-on-paper, desktop-first, keep `Ritual Archive` + `呪`, real JJK imagery over AI art.
**Constraint:** keep the existing live site working; everything is additive until the full migration.

## Phase 1 — Technique Codex (data foundation) ← CURRENT
1. Extract all figure techniques from the lore-bible drafts into structured data. DONE 2026-09-11.
   - Corpus: 70 techniques — 47 with FULL L1→L20 progression (modules 01–20, 49–56, 59–77),
     22 with dossier-faithful SUMMARIES (modules 21–42), 1 bespoke (78 Michael Jackson, King of POP).
     Module 00 (Sun Tzu) has no technique — he has not manifested.
   - Output: `data/codex.json` (pure JSON, versioned) + `data/codex.js` (`window.CODEX`, same payload, for the static page).
   - Schema v1 documented in `data/CODEX_SCHEMA.md`. Region/era/culture from `data/figure_atlas.json`.
   - Extractor: `data/extract_codex.py` (handles `#`/`##` PART B headers, `##`/`###` section levels,
     Technique Summary sections, SERVES section form, name normalization).
   - QA agent verifying fidelity vs drafts (in progress at time of writing).
2. Build the Technique Library page (`codex.html`, repo root): searchable, filterable
   (tier / combat role / figure / region / culture / detail type), expandable L1→L20 progression,
   Domain + clash bookkeeping displayed, Maximum + L20 called out. Field Manual light aesthetic —
   the first Design B page on the site (existing pages stay dark until Phase 2 migration).
   Player-facing: lore-light (concept line + combat role only), mechanics-forward.
   Page builder agent working (in progress at time of writing).
3. Wire into existing site: nav link on `index.html` ("Campaign Codex"); back-link on codex page.
4. Commit locally; push to GitHub after zack supplies a fresh token (7-day tokens, never stored).

**Domain-cost audit note (landed 2026-09-11):** figure Domains are SPECIFIC Domains —
stated profile (full-turn + 20 CE baseline) wins over the D008 point-unlock table, which governs
player-developed Domains only. The audit conformed 15 modules to full-turn + 20 CE and kept
3 genuine exceptions (39 Tesla: action/10 CE Siphon-treated, online at L6; 73 Hotu Matu'a:
action speed/20 CE — the Domain is a spoken word; 75 Dzunuk'wa: action/20 CE — hunger doesn't
cast rituals); 78 Michael's Domain cost is intentionally unstated. The codex data already
reflects all of this (34 × full-turn/20 CE, 73 & 75 action/20 CE, 78 null/null).
The codex page reads `domain.activation`/`domain.ce_cost` generically — a future data re-sync
needs no page changes.

## Phase 2 — Rulebook migration (Design B)
Port the rules canon (player guide, advanced sorcery, canon-repair ledger) into Field Manual
aesthetic. `index.html` becomes the Design B landing page. Existing dark pages stay live until cutover.

## Phase 3 — Character builder
D&D-Beyond-order guided builder: ancestry/class/ability scores (4d6-drop-lowest, standard array,
manual) → CE Reserve → technique selection FROM THE CODEX (this is why the codex schema has
`tier`, `role`, `ce_ability`, `level` on every feature) → feats/tools → sheet generation.
On-device storage, no accounts. Local characters.

## Phase 4 — Campaign story ("Story So Far")
Player-safe campaign surface. GM-only lore modules stay OFF the site; the story section carries
only what has happened at the table.

## Integration points (for later phases)
- `data/codex.json` is the technique data contract. The builder reads it directly:
  `techniques[].features[].level` gates choices by character level; `ce_ability` feeds the CE
  Reserve math; `domain.clash_points` / `domain.burnout_rounds` feed clash bookkeeping.
- Feature `kind` values: `feature` | `maximum` | `domain` | `l20` | `special` | `simple_domain`.
  (Simple Domains appear as L6 features with kind `simple_domain` where the module names them so.)
- Page contract: `codex.html` renders purely from `window.CODEX`; no build step, no framework.
  Keep it that way — GitHub Pages serves it static.
- Search index convention follows the existing `data/library.js` (`window.LIBRARY_ENTRIES`) pattern;
  a future unified search can merge both arrays.
