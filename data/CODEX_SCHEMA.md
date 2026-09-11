# Codex Schema v1

**File:** `data/codex.json` (pure JSON — the data contract).
**Twin:** `data/codex.js` (`window.CODEX = <same payload>;`) for the static page.
**Generator:** `data/extract_codex.py` reads the lore-bible drafts;
`data/figure_atlas.json` supplies region/era/culture per module.
**Version:** `codex_version: "1.0.0"`. Bump minor on field additions, major on renames.

## Top level

| Field | Type | Notes |
|---|---|---|
| `codex_version` | string | semver |
| `generated` | string | ISO date of extraction |
| `source` | string | provenance note |
| `count` | number | techniques array length (70) |
| `techniques` | array | entries below, sorted by module number |

## Technique entry

| Field | Type | Notes |
|---|---|---|
| `id` | string | slug, e.g. `miyamoto-musashi` |
| `module` | string | lore-bible module number, e.g. `"01"` |
| `figure` | string | display name |
| `title` | string | full module title |
| `detail` | enum | `full` (L1→L20 progression) · `summary` (dossier-faithful, modules 21–42) · `bespoke` (78, zack-authored King of POP) |
| `technique` | string\|null | technique name |
| `tier` | string\|null | `III` / `IV` / `V` |
| `role` | string\|null | combat role, free text (e.g. `striker`, `Controller (Anti-Compulsion)`) |
| `ce_ability` | string\|null | e.g. `DEX` |
| `primary_verb` | string\|null | e.g. `Conclude` |
| `region` | string\|null | from figure_atlas |
| `era` | string\|null | free text, e.g. `1584–1645 · early Edo` |
| `culture` | string\|null | from figure_atlas |
| `concept` | string\|null | one-sentence concept line |
| `serves` | string\|null | SERVES tag; **null for modules 01–42** (predates the convention) |
| `features` | array | level features (full/bespoke only) |
| `maximum` | object\|null | Maximum Technique record |
| `domain` | object\|null | Domain record (see below) |
| `l20` | object\|null | level-20 capstone record |
| `summary_text` | string\|null | raw markdown, only when `detail=summary` |
| `source_file` | string | draft filename, e.g. `01-musashi.md` |

## Feature record (`features[]`, `maximum`, `l20`)

| Field | Type | Notes |
|---|---|---|
| `level` | number\|null | 1/3/6/11/18/20; null for un-leveled (bespoke) |
| `name` | string | feature name |
| `cost_line` | string | activation line verbatim, e.g. `Action, 10 CE, Focus` |
| `kind` | enum | `feature` · `maximum` · `domain` · `l20` · `simple_domain` |
| `text` | string | body text, markdown remnants kept (`**bold**`, `*italic*`, `-` bullets) |

## Domain record

Feature record plus:

| Field | Type | Notes |
|---|---|---|
| `clash_points` | number\|null | 800 (Tier IV) / 1000 (Tier V) per canon |
| `burnout_rounds` | number\|null | 5 (Tier IV) / 3 (Tier V) per canon |
| `radius` | string\|null | e.g. `60-ft radius` |
| `activation` | string\|null | verbatim-ish, e.g. `action`, `full-turn`; audited 2026-09-11 (Specific Domains canon) |
| `ce_cost` | number\|null | audited 2026-09-11 |

## Conventions for consumers

- **Render markdown lightly:** `**bold**`, `*italic*`, `- ` bullets, blank-line paragraphs. No tables in text fields.
- **`serves` may be null** (01–42). Don't filter on it; show "—" or hide.
- **`domain.activation` / `domain.ce_cost`** reflect the 2026-09-11 Domain audit (Specific Domains canon). They are data, not guesses — the page renders them generically.
- **`detail=summary` entries** render `summary_text` as a single block, not the progression UI.
- **Search index convention** follows `data/library.js` (`window.LIBRARY_ENTRIES`); a future unified search can merge both arrays.
- **Builder integration (Phase 3):** `techniques[].features[].level` gates choices by character level; `ce_ability` feeds CE Reserve math; `domain.clash_points`/`burnout_rounds` feed clash bookkeeping; `tier` gates Domain access.
