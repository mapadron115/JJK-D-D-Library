#!/usr/bin/env python3
"""Extract level progression from dossier HTML pages into data/dossier_levels.js.

Handles three dossier structures (all inside the dsec-1 'Full progression' section):
  1. <details class="level"> dropdowns with <p class="rules-line">
  2. <details class="level"> dropdowns with prose only (falls back to first paragraph)
  3. <article class="card"> grids with <span class="tag">L#</span> (skips untagged cards)

Output: window.DOSSIER_LEVELS = { "e024": [{level, title, rules}, ...], ... }
"""
import re, glob, json, html as ihtml, sys

def clean_text(s):
    """Strip tags, unescape entities, collapse whitespace."""
    s = re.sub(r'<[^>]+>', '', s or '')
    s = ihtml.unescape(s)
    return re.sub(r'\s+', ' ', s).strip()

def clean_title(s):
    t = clean_text(s).rstrip('.:;').strip()
    return t

def parse_level(raw):
    m = re.search(r'(\d+)', raw or '')
    return int(m.group(1)) if m else None

def extract_one(path):
    h = open(path, encoding='utf-8').read()
    # find the progression section by kicker priority
    sec = None
    for kicker in ('Full progression', 'Complete technique', 'Core law'):
        m = re.search(r'<section[^>]*>.*?<div class="kicker">' + re.escape(kicker) + r'</div>(.*?)(?=<section[^>]*>|$)', h, re.S)
        if m:
            sec = m.group(1)
            break
    if sec is None:
        # fallback: any section whose stitle mentions progression / feature map
        m = re.search(r'<section[^>]*>.*?<h2 class="stitle">(?:Full progression|Feature map)</h2>(.*?)(?=<section[^>]*>|$)', h, re.S)
        if m:
            sec = m.group(1)
    if sec is None:
        return None, 'no progression section'
    levels = []
    # structure 1+2: details.level dropdowns
    for b in re.findall(r'<details class="level"[^>]*>(.*?)</details>', sec, re.S):
        sm = re.search(r'<span class="lv">([^<]*)</span>', b)
        tm = re.search(r'<span class="lv-title">(.*?)</span>', b, re.S)
        rm = re.search(r'<p class="rules-line">(.*?)</p>', b, re.S)
        if not rm:
            pm = re.search(r'<p>(.*?)</p>', b, re.S)
            rules = clean_text(pm.group(1)) if pm else ''
        else:
            rules = clean_text(rm.group(1))
        lv = parse_level(sm.group(1)) if sm else None
        title = clean_title(tm.group(1)) if tm else ''
        if lv is None:
            return None, 'details without level'
        levels.append({'level': lv, 'title': title, 'rules': rules})
    if levels:
        return levels, None
    # structure 3: card grids (untagged cards with an <h3> become unleveled entries;
    # untagged cards without a title, like "Field notes" cards, are skipped)
    for c in re.findall(r'<article class="card">(.*?)</article>', sec, re.S):
        tagm = re.search(r'<span class="tag">([^<]*)</span>', c)
        tm = re.search(r'<h3>(.*?)</h3>', c, re.S)
        if not tagm and not tm:
            continue
        lv = parse_level(tagm.group(1)) if tagm else 0
        if lv is None:
            lv = 0  # "Base", "Form", "Activation" — unleveled features
        rm = re.search(r'<p class="rules-line">(.*?)</p>', c, re.S)
        if not rm:
            pm = re.search(r'<p>(.*?)</p>', c, re.S)
            rules = clean_text(pm.group(1)) if pm else ''
        else:
            rules = clean_text(rm.group(1))
        title = clean_title(tm.group(1)) if tm else ''
        levels.append({'level': lv, 'title': title, 'rules': rules})
    if not levels:
        return None, 'no levels found'
    return levels, None

def main():
    files = sorted(glob.glob('dossiers/e*.html'))
    # only actual techniques get progression data (tools/spirits/djinn/primers don't have it)
    tech_ids = set()
    try:
        lib_src = open('data/library.js', encoding='utf-8').read()
        for m in re.finditer(r'\{"id":\s*"(e\d+)"[^}]*?"kind":\s*"([^"]*)"', lib_src):
            if 'technique' in m.group(2).lower():
                tech_ids.add(m.group(1))
    except OSError:
        pass
    out, problems = {}, []
    for f in files:
        did = f.split('/')[-1][:-5]
        if tech_ids and did not in tech_ids:
            continue
        levels, err = extract_one(f)
        if err:
            problems.append((did, err))
        else:
            # de-dupe + sort by level
            seen = set()
            uniq = []
            for l in sorted(levels, key=lambda x: x['level']):
                if l['level'] not in seen:
                    seen.add(l['level'])
                    uniq.append(l)
            out[did] = uniq
    if problems:
        print('PROBLEMS:', len(problems))
        for did, err in problems[:20]:
            print(' ', did, '-', err)
    js = 'window.DOSSIER_LEVELS = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';'
    open('data/dossier_levels.js', 'w', encoding='utf-8').write(js)
    print('wrote data/dossier_levels.js:', len(out), 'techniques,',
          sum(len(v) for v in out.values()), 'levels')

if __name__ == '__main__':
    main()
