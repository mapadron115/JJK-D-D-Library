#!/usr/bin/env python3
"""Extract figure techniques (Part B / Technique Summary) from lore-bible drafts
into structured codex JSON.

Usage: python3 extract_codex.py
Reads:  ~/workspace/goals/ritual-archive-campaign-lore-bible/hidden_files/drafts/*.md
        data/figure_atlas.json (module -> region/era/culture)
Writes: data/codex.json  (pure JSON, versioned — the data contract)
        data/codex.js     (window.CODEX = <same payload>; for the static page)

Figure modules: 01-20 (full), 21-42 (dossier-faithful summaries), 49-56 (full),
59-77 (full), 78 (Michael Jackson, bespoke). Skips infra docs.
Module 00 (sun-tzu) has no technique and is skipped.

Known pending: a Domain activation-cost audit may re-sync domain.activation /
domain.ce_cost fields afterwards; the extractor records them verbatim.
"""
import json, re, os, datetime

DRAFTS = os.path.expanduser("~/workspace/goals/ritual-archive-campaign-lore-bible/hidden_files/drafts")

# Modules whose codex entries were hand-built as full playable techniques
# (2026-09-11 RoR rebuild: Shaka/36, Jack/37, Qin/38, Tesla/39, Simo/40,
# Raiden/41, Okita/42).
# A regen must preserve the existing full entry, never downgrade it to a summary.
FULL_OVERRIDE_MODULES = {"21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42"}
OUTDIR = os.path.dirname(os.path.abspath(__file__))  # repo/data
SKIP_FILES = {
    "43-master-timeline.md", "44-chapter-houses.md", "45-commentators.md",
    "46-latent-assets.md", "47-arranged-century.md", "48-vow-network.md",
    "57-latent-assets-ii.md", "58-latent-assets-iii.md",
    "58-latent-assets-iii-PART-A.md", "58-latent-assets-iii-PART-B.md",
    "dread-subsystem.md", "sun-tzu.md",
}

PART_B_RE = re.compile(r"^#{1,3}\s+PART B[^\n]*\n", re.M)
SUMMARY_RE = re.compile(r"^#{1,3}\s+.*Technique Summary[^\n]*\n", re.M)
FOOTER_RE = re.compile(r"^---\s*\n\s*\*(?:Module\s+\d+[^*\n]*)?GM-ONLY", re.M)

FOOTNOTE_DEF_RE = re.compile(r"(?m)^\[\^\d+\]:.*$")
FOOTNOTE_REF_RE = re.compile(r"\[\^\d+\]")
HEADER_LINE_RE = re.compile(r"^\*{1,2}(.+?)\*+\s*$")
COSTLIKE_RE = re.compile(r"\bCE\b|\bpassive\b|\bbonus action\b|\baction\b|\breaction\b|\bper\b.{0,12}\brest\b|\bconcentration\b|\bminute\b|\bround\b|\bfree\b", re.I)
PAREN_COST_RE = re.compile(r"\bCE\b|\bpassive\b|\bbonus action\b|\baction\b|\breaction\b|\bper\b.{0,12}\brest\b|\bconcentration\b|\bminute\b|\bround\b|\bfree\b", re.I)

SMALL_WORDS = {"of", "the", "de", "da", "no", "van", "von", "al", "ibn", "le", "du"}
ROMAN_FIX = {"Ii": "II", "Iii": "III", "Iv": "IV", "Vi": "VI"}
FIG_OVERRIDES = {"Yi Sun-Sin": "Yi Sun-sin"}


def normalize_fig(raw):
    s = raw.title()
    s = re.sub(r"'([A-Z])", lambda m: "'" + m.group(1).lower(), s)  # Dzunuk'Wa -> Dzunuk'wa
    words = s.split()
    out = []
    for i, w in enumerate(words):
        parts = w.split("-")
        fixed = []
        for j, p in enumerate(parts):
            if p in ROMAN_FIX:
                fixed.append(ROMAN_FIX[p])
            elif (i > 0 or j > 0) and p.lower() in SMALL_WORDS:
                fixed.append(p.lower())
            else:
                fixed.append(p)
        out.append("-".join(fixed))
    s = " ".join(out)
    return FIG_OVERRIDES.get(s, s)
CONCEPT_RE = re.compile(r"\*\*The concept, in one sentence:\*\*\s*\*(.+?)\*", re.S)
SERVES_RE = re.compile(r"\*\*SERVES:\s*\**(.+?)\*\*(?:\s*\*(.+?)\*)?(?=\n)", re.S)
SERVES_SECTION_RE = re.compile(r"^#{2,4}\s+(?:[IVX]+\.\s+)?SERVES[^\n]*\n+(.+?)(?=\n#{1,4}\s|\n---|\Z)", re.M | re.S)
TIER_BYLINE_RE = re.compile(r"\*Module\s+\d+\s*·\s*Tier\s+(IV|V|III|II|I)")
TECHNIQUE_NAME_RE = re.compile(r'PART B[^\n]*?["\u201c](.+?)["\u201d]')
TECHNIQUE_NAME_RE2 = re.compile(r'PART B[^\n]*?\bTECHNIQUE:\s*(.+?)\s*$', re.M)

HEADER_RE = re.compile(r"^#{2,4}\s+(L(?:1|3|6|11|18|20)|Maximum|Domain(?:\s+Expansion)?|THE\s+.+|FAILED\s+.+|SLAVE\s+.+|THRILLER.+|MICHAEL-SPECIFIC.+|ACTIVE\s+.+|DESTROYING.+|INTERACTION.+|SPECIAL\s+GRADE.+|TONE\s.+|CORE\s+.+)\b\s*[\u2014\u2013-]?\s*(.*)$", re.I)
LEVEL_RE = re.compile(r"^L(\d+)$")


def clean(s):
    return re.sub(r"\s+", " ", s).strip()


def strip_footnotes(s):
    """Remove Sun's red-pen footnote markers + definitions (GM-only margin notes)."""
    if not s:
        return s
    s = FOOTNOTE_DEF_RE.sub("", s)
    s = FOOTNOTE_REF_RE.sub("", s)
    return clean(s)


def find_header_line(body):
    """First bold/italic byline mentioning Tier (handles **...*** and *...* styles)."""
    for ln in body.split("\n"):
        m = HEADER_LINE_RE.match(ln.strip())
        if m and "Tier" in m.group(1):
            return clean(m.group(1))
    return None


def parse_cost_line(lines):
    """Cost-line conventions — only the FIRST non-blank line of a section can be
    a standalone cost line (a trailing italic flavor quote must never be read as
    one). In priority order:
    1. labeled bold cost line: **Cost:** ... / **The X — Cost:** ... (new convention)
    2. standalone bold cost-like line: **20 CE, full-turn action. ...** (20-style)
    3. standalone italic cost line: *Bonus action · 1 CE · ...* (old convention)
    4. bold-inline lead of the first body line: **Action · 4 CE.** text... (12-style)
    Returns (cost_line, rest_start_idx). For (4) the line stays in the text."""
    first = None
    for i, ln in enumerate(lines):
        if ln.strip():
            first = (i, ln.strip())
            break
    if first is None:
        return "", 0
    i, t = first
    if re.match(r"^\*\*(?:[^*]*?—\s*)?Cost:\*\*", t):
        return clean(re.sub(r"\*\*", "", t)), i + 1
    if t.startswith("**") and t.endswith("**") and len(t) > 4 and COSTLIKE_RE.search(t.strip("*")):
        return clean(t.strip("*").strip("*")), i + 1
    if (t.startswith("*") and not t.startswith("**") and t.endswith("*") and len(t) > 2
            and COSTLIKE_RE.search(t.strip("*"))):
        return clean(t.strip("*")), i + 1
    m = re.match(r"^\*\*(.+?)\*\*\s*(.*)$", t)
    if m and COSTLIKE_RE.search(m.group(1)) and len(m.group(1)) < 120:
        return clean(m.group(1)), i  # line stays: cost is inline in the paragraph
    return "", 0


def classify(header_level, header_name):
    hl = header_level.lower()
    h = header_name.lower()
    if hl == "maximum" or h.startswith("maximum") or "(maximum)" in h:
        return "maximum"
    if hl.startswith("domain") or h.startswith("domain"):
        return "domain"
    if hl == "l20" or h.startswith("l20"):
        return "l20"
    if "simple domain" in h:
        return "simple_domain"
    return "feature"


def parse_domain_fields(cost_line, text):
    blob = (cost_line or "") + " " + (text or "")
    d = {}
    m = re.search(r"clash:?\s*\**([\d,]+)\s*points?", blob, re.I)
    if not m:
        m = re.search(r"\**([\d,]+)\s*clash\s+points?", blob, re.I)
    if not m:
        m = re.search(r"\bclash\s+points?:?\s*\**(\d[\d,]*)\b", blob, re.I)
    if not m:
        m = re.search(r"\bclash\s+(\d[\d,]*)\b(?!\s*points)", blob, re.I)
    d["clash_points"] = int(m.group(1).replace(",", "")) if m else None
    # Domain duration: explicit statement wins; otherwise the approved D008
    # tier mapping for figure Domains (800 -> 2 min, 1000 -> 3 min).
    m = re.search(r"duration:?\s*\**(\d+)\s*minutes?", blob, re.I)
    if not m:
        m = re.search(r"(\d+)-minute duration", blob, re.I)
    if m:
        d["duration_min"] = int(m.group(1))
    elif d["clash_points"] == 800:
        d["duration_min"] = 2
    elif d["clash_points"] == 1000:
        d["duration_min"] = 3
    else:
        d["duration_min"] = None
    m = re.search(r"burnout:?\s*\**(\d+)\s*rounds?", blob, re.I)
    if not m:
        m = re.search(r"\**(\d+)-round\s+burnout", blob, re.I)
    if not m:
        m = re.search(r"\bburnout\s+(\d+)\b", blob, re.I)
    d["burnout_rounds"] = int(m.group(1)) if m else None
    m = re.search(r"(\d+)-ft(?:\s+\w+)*\s*(?:radius|enclosed Domain)", blob, re.I)
    if m:
        d["radius"] = m.group(0)
    else:
        m2 = re.search(r"radius:?\s*\**(\d+)\s*ft\b", blob, re.I)
        d["radius"] = (m2.group(1) + " ft") if m2 else None
    act = re.search(r"(bonus action|full-turn(?: action)?|action|reaction)\s*[·,]?\s*(\d+)\s*CE", blob, re.I)
    if not act:
        act = re.search(r"(\d+)\s*CE\s*[·,]?\s*(bonus action|full-turn(?: action)?|action|reaction)", blob, re.I)
        if act:
            d["activation"] = act.group(2).lower()
            d["ce_cost"] = int(act.group(1))
        else:
            d["activation"] = None
            d["ce_cost"] = None
    else:
        d["activation"] = act.group(1).lower()
        d["ce_cost"] = int(act.group(2))
    return d


def section_end(md, start):
    m2 = FOOTER_RE.search(md[start:])
    return start + m2.start() if m2 else len(md)


def parse_part_b(md):
    """Returns (meta_dict, sections, preamble) or (None, [], '') if no Part B."""
    m = PART_B_RE.search(md)
    if not m:
        return None, [], ""
    if "summary" in m.group(0).lower():
        return None, [], ""  # handled by parse_summary path
    body = md[m.end():section_end(md, m.end())]
    meta = {}
    meta["header_line"] = find_header_line(body)
    sections = []
    preamble_lines = []
    cur = None
    for ln in body.split("\n"):
        hm = HEADER_RE.match(ln.strip())
        if hm:
            if cur:
                sections.append(cur)
            level_raw, name = hm.group(1), clean(hm.group(2))
            if not name:
                # bespoke headers (78) where the alternation swallowed the whole
                # line, e.g. "THE BURNED CROWN — Special Grade Cursed Object"
                name = clean(hm.group(1))
            cur = {"level": level_raw, "name": name, "lines": []}
        elif cur is not None:
            cur["lines"].append(ln)
        else:
            preamble_lines.append(ln)
    if cur:
        sections.append(cur)
    preamble = clean("\n".join(preamble_lines).strip())
    out = []
    for s in sections:
        cost_line, idx = parse_cost_line(s["lines"])
        text = clean("\n".join(s["lines"][idx:]).strip())
        out.append({
            "level_raw": s["level"],
            "name": s["name"],
            "cost_line": cost_line,
            "kind": classify(s["level"], s["name"]),
            "text": text,
        })
    return meta, out, preamble


def parse_summary(md):
    """Modules 21-42: dossier-faithful 'Technique Summary' sections.
    Returns (header_line, raw_markdown, header_technique) or (None, None, None)."""
    m = SUMMARY_RE.search(md)
    if not m:
        return None, None, None
    raw = md[m.end():section_end(md, m.end())].strip()
    header_line = None
    hm = re.search(r"^\*(.+?)\*\s*$", raw, re.M)
    if hm:
        header_line = clean(hm.group(1))
    tq = re.search(r'["\u201c](.+?)["\u201d]', m.group(0))
    header_technique = clean(tq.group(1)) if tq else None
    return header_line, raw, header_technique


def parse_header_meta(header_line):
    meta = {}
    if not header_line:
        return meta
    m = re.search(r"Tier\s+(IV|V|III|II|I)", header_line)
    if m:
        meta["tier"] = m.group(1)
    m = re.search(r"[Ss]uggested CE ability:?\s+([A-Z]{3})", header_line)
    if m:
        meta["ce_ability"] = m.group(1)
    m = re.search(r"(?:[Pp]rimary\s+)?[Vv]erb:\s*\*?([A-Za-z]+)", header_line)
    if m:
        meta["primary_verb"] = m.group(1)
    m = re.search(r"[Cc]ombat role:\s*([^·*\n]+)", header_line)
    if m:
        meta["role"] = clean(m.group(1))
    else:
        m = re.search(r"Tier\s+\w+\s*·\s*([^·*\n]+)", header_line)
        if m:
            meta["role"] = clean(m.group(1))
    return meta


def main():
    atlas = json.load(open(os.path.join(OUTDIR, "figure_atlas.json"), encoding="utf-8"))
    # Existing entries, so FULL_OVERRIDE_MODULES can be carried over intact.
    existing_by_mod = {}
    try:
        with open(os.path.join(OUTDIR, "codex.json"), encoding="utf-8") as f:
            payload = json.load(f)
        items = payload if isinstance(payload, list) else payload.get("techniques", [])
        for e in items:
            m = str(e.get("module", "")).lstrip("0") or "0"
            if e.get("detail") == "full":
                existing_by_mod[m] = e
    except (OSError, ValueError):
        pass
    techniques = []
    files = sorted(f for f in os.listdir(DRAFTS) if f.endswith(".md") and f not in SKIP_FILES)
    for fn in files:
        mod = fn.split("-")[0]
        mod_key = mod.lstrip("0") or "0"
        if mod_key in FULL_OVERRIDE_MODULES and mod_key in existing_by_mod:
            techniques.append(existing_by_mod[mod_key])
            print(f"{mod} {existing_by_mod[mod_key].get('figure')}: preserved hand-built full entry (regen carve-out)")
            continue
        path = os.path.join(DRAFTS, fn)
        md = open(path, encoding="utf-8").read()
        title_m = re.search(r"^#\s+(.+)$", md, re.M)
        title = clean(title_m.group(1)) if title_m else fn
        title = re.sub(r"^\d+\s*[-\u2013\u2014]\s*", "", title)  # strip "50 - " module prefixes
        title = re.sub(r"\s+[-\u2013\u2014]\s*\"[^\"]*\"\s*$", "", title)  # strip trailing - "Subtitle"
        title = re.split(r"\s+-\s+", title, maxsplit=1)[0]  # strip trailing - Subtitle (unquoted)
        fig = re.split(r"\s+[\u2014\u2013]\s+", title, maxsplit=1)[0].strip()
        fig = normalize_fig(fig)
        concept_m = CONCEPT_RE.search(md)
        concept = clean(concept_m.group(1)) if concept_m else None
        serves_m = SERVES_RE.search(md)
        if serves_m:
            serves = strip_footnotes(serves_m.group(0))
        else:
            ss_m = SERVES_SECTION_RE.search(md)
            serves = strip_footnotes(ss_m.group(1)) if ss_m else None
        tb_m = TIER_BYLINE_RE.search(md)
        byline_tier = tb_m.group(1) if tb_m else None
        tech_m = TECHNIQUE_NAME_RE.search(md)
        if tech_m:
            technique_name = clean(tech_m.group(1))
        else:
            tech_m2 = TECHNIQUE_NAME_RE2.search(md)
            technique_name = clean(tech_m2.group(1)) if tech_m2 else None
        am = atlas.get(mod, {})

        meta, sections, preamble = parse_part_b(md)
        if meta is None:
            # dossier-summary modules (21-42): "Technique Summary" sections or
            # "PART B — Technique Summary" headers
            header_line, raw, header_technique = parse_summary(md)
            if raw is None:
                print(f"WARN: no Part B or Technique Summary in {fn}")
                continue
            chunk = (header_line or "") + "\n" + raw[:800]
            hm = parse_header_meta(chunk)
            entry = base_entry(fn, mod, fig, title, am, hm, concept, serves, byline_tier)
            entry["detail"] = "summary"
            tm = re.search(r'\*\*"([^"]+)"\*\*', chunk)
            entry["technique"] = header_technique or (clean(tm.group(1)) if tm else technique_name)
            entry["summary_text"] = raw
            techniques.append(entry)
            print(f"{mod} {fig}: detail=summary")
            continue

        hm = parse_header_meta(meta.get("header_line", ""))
        is_full = any(LEVEL_RE.match(s["level_raw"]) for s in sections)
        entry = base_entry(fn, mod, fig, title, am, hm, concept, serves, byline_tier)
        entry["detail"] = "full" if is_full else "summary"
        if mod == "78":
            entry["detail"] = "bespoke"  # Michael Jackson: King of POP, zack-authored
        entry["technique"] = technique_name
        if is_full or entry["detail"] == "bespoke":
            for s in sections:
                lm = LEVEL_RE.match(s["level_raw"])
                lvl = int(lm.group(1)) if lm else None
                name = re.sub(r"^[:;—–-]\s*", "", s["name"])
                rec = {"level": lvl, "name": name, "cost_line": s["cost_line"],
                       "kind": s["kind"], "text": s["text"]}
                # new-convention: cost info carried in the header's trailing
                # parenthetical, e.g. "Plant the Banner (bonus action, 2 CE)"
                if not rec["cost_line"]:
                    pm = re.match(r"^(.+?)\s*\(([^()]*)\)\s*$", name)
                    if pm and PAREN_COST_RE.search(pm.group(2)):
                        if rec["kind"] == "feature":
                            rec["name"] = clean(pm.group(1))
                        rec["cost_line"] = clean(pm.group(2))
                if s["kind"] == "maximum" and entry["maximum"] is None:
                    entry["maximum"] = rec
                elif s["kind"] == "domain" and entry["domain"] is None:
                    rec.update(parse_domain_fields(rec["cost_line"], rec["text"]))
                    entry["domain"] = rec
                    if entry["detail"] == "bespoke":
                        entry["features"].append(rec)  # keep all 12 sections ordered
                elif s["kind"] == "l20" and entry["l20"] is None:
                    entry["l20"] = rec
                else:
                    entry["features"].append(rec)
            if preamble and entry["features"]:
                entry["features"][0]["text"] = preamble + "\n\n" + entry["features"][0]["text"]
        else:
            entry["summary_text"] = "\n\n".join(
                f"### {s['level_raw'] + (' — ' + s['name'] if s['name'] else '')}\n\n{s['text']}"
                for s in sections)
        techniques.append(entry)
        kinds = {}
        for s in sections:
            kinds[s["kind"]] = kinds.get(s["kind"], 0) + 1
        print(f"{mod} {fig}: detail={entry['detail']} sections={len(sections)} kinds={kinds}")
    payload = {
        "codex_version": "1.0.0",
        "generated": datetime.date.today().isoformat(),
        "source": "Ritual Archive campaign lore bible drafts",
        "count": len(techniques),
        "techniques": techniques,
    }
    with open(os.path.join(OUTDIR, "codex.json"), "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)
    with open(os.path.join(OUTDIR, "codex.js"), "w", encoding="utf-8") as f:
        f.write("window.CODEX = ")
        json.dump(payload, f, ensure_ascii=False)
        f.write(";\n")
    print(f"\nWrote {len(techniques)} techniques.")


def base_entry(fn, mod, fig, title, am, hm, concept, serves, byline_tier=None):
    return {
        "id": re.sub(r"[^a-z0-9]+", "-", fig.lower()).strip("-"),
        "module": mod,
        "figure": fig,
        "title": title,
        "detail": None,
        "technique": None,
        "tier": hm.get("tier") or byline_tier,
        "role": hm.get("role"),
        "ce_ability": hm.get("ce_ability"),
        "primary_verb": hm.get("primary_verb"),
        "region": am.get("region"),
        "era": am.get("era"),
        "culture": am.get("culture"),
        "concept": concept,
        "serves": serves,
        "features": [],
        "maximum": None,
        "domain": None,
        "l20": None,
        "summary_text": None,
        "source_file": fn,
    }


if __name__ == "__main__":
    main()
