#!/usr/bin/env python3
"""Fix 7 figure/library technique duplicates.

Deletes fig-*.html duplicates, points figure codex.js entries at the library
dossiers via a new `dossier` field, and populates the 3 empty figure entries
(e482/e483/e484) from the library's extracted progression.

Mapping:
  deaths-due       -> e508 (Death's Due)
  shattered-mirror -> e509 (Shattered Mirror)
  redacted-light   -> e481
  vairocana        -> e480
  e482             -> e482 (Stone Cutting Style)
  e483             -> e483 (Cursed Lotus)
  e484             -> e484 (Flow Technique)
"""
import re, json, os

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(REPO)

DUPLICATES = {
    'deaths-due': 'e508',
    'shattered-mirror': 'e509',
    'redacted-light': 'e481',
    'vairocana': 'e480',
    'e482': 'e482',
    'e483': 'e483',
    'e484': 'e484',
}

def parse_cost_line(rules):
    """Split 'Action · 2 CE · Effect text' into (cost_line, text)."""
    parts = [p.strip() for p in rules.split('·')]
    if len(parts) >= 3:
        # first two segments are usually trigger/cost
        cost = ' · '.join(parts[:2])
        # sanity: cost segment should mention CE, action, or Passive/Reaction
        if re.search(r'CE|action|Passive|Reaction|rest|turn', cost, re.I):
            return cost, ' · '.join(parts[2:]).strip()
    if len(parts) == 2 and re.search(r'CE|action|Passive|Reaction', parts[0], re.I):
        return parts[0].strip(), parts[1].strip()
    return '', rules.strip()

# 1. Load dossier_levels for the library data
src = open('data/dossier_levels.js', encoding='utf-8').read()
m = re.search(r'window\.DOSSIER_LEVELS\s*=\s*(\{.*\});', src, re.S)
dossier_levels = json.loads(m.group(1))

# 2. Load codex.js and update the 7 entries
codex_src = open('data/codex.js', encoding='utf-8').read()
m = re.search(r'window\.CODEX\s*=\s*(\{.*\});', codex_src, re.S)
codex = json.loads(m.group(1))

for fig_id, lib_id in DUPLICATES.items():
    tech = next((t for t in codex['techniques'] if t['id'] == fig_id), None)
    assert tech, f'figure {fig_id} not found in codex.js'
    # point dossier link at the library dossier
    tech['dossier'] = f'{lib_id}.html'
    # populate empty features from library progression
    if not tech.get('features'):
        levels = dossier_levels.get(lib_id, [])
        assert levels, f'no library levels for {lib_id}'
        feats = []
        for l in levels:
            # skip pinnacle levels — those live in maximum/domain/l20 fields
            if re.search(r'maximum|domain expansion|l20|capstone', l['title'], re.I):
                continue
            cost, text = parse_cost_line(l['rules'])
            feats.append({
                'level': l['level'],
                'name': l['title'],
                'cost_line': cost,
                'kind': 'feature',
                'text': text or l['rules'],
            })
        assert feats, f'no features extracted for {fig_id}'
        tech['features'] = feats
        print(f'{fig_id}: populated {len(feats)} features from {lib_id}')
    else:
        print(f'{fig_id}: kept {len(tech["features"])} existing features, dossier -> {lib_id}.html')

# 3. Write back codex.js (preserve the window.CODEX = prefix)
out = 'window.CODEX = ' + json.dumps(codex, ensure_ascii=False, separators=(',', ':')) + ';'
open('data/codex.js', 'w', encoding='utf-8').write(out)
print('wrote data/codex.js')

# 4. Delete the 7 duplicate fig dossiers
for fig_id in DUPLICATES:
    # fig-e482 -> dossiers/fig-e482.html ; deaths-due -> dossiers/fig-deaths-due.html
    path = f'dossiers/fig-{fig_id}.html'
    if os.path.exists(path):
        os.remove(path)
        print(f'deleted {path}')
    else:
        print(f'NOT FOUND (skipped): {path}')
