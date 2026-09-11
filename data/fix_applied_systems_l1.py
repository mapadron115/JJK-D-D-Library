#!/usr/bin/env python3
"""Fill the empty Level 1 progression cards in the Applied Systems dossiers.

zack (2026-09-11): "in the applied systems grouping I noticed a lot of those
techniques have missing mechanics."

Root cause: all 10 Applied Systems dossiers (e144-e153) render an EMPTY card
for Level 1 in their Level Progression timeline (L3/L6/L11/L18 are all
populated). The L1 mechanics exist - they live in the "Core Gameplay Loop"
section - but the empty expandable L1 section reads as missing mechanics.

Fix (no new mechanics invented): populate each L1 card with the names plus
one-line recaps of that dossier's own Core Gameplay Loop features, pointing
back at the full rules above. Meta cards ("Scaling", "Main resource") are
skipped.
"""
import re
import os
import html as htmlmod

DOSSIERS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "dossiers")
IDS = [f"e{i}" for i in range(144, 154)]
SKIP = {"scaling", "main resource"}


def snippet(text, limit=170):
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return cut + "\u2026"


def main():
    for eid in IDS:
        path = os.path.join(DOSSIERS, eid + ".html")
        with open(path, encoding="utf-8") as f:
            raw = f.read()

        # Core Gameplay Loop feature cards.
        m = re.search(r"Core Gameplay Loop</h2><div class=\"grid\">(.*?)</div>\s*</section>", raw, re.S)
        if not m:
            m = re.search(r"Core Gameplay Loop</h2>(.*?)</section>", raw, re.S)
        sec = m.group(1)
        feats = []
        for cm in re.finditer(
            r'<article class="card">(?:<span class="tag">.*?</span>)?<h3>(.*?)</h3><p>(.*?)</p>',
            sec,
            re.S,
        ):
            name, body = cm.group(1), cm.group(2)
            name = htmlmod.unescape(re.sub(r"<[^>]+>", "", name)).strip()
            if name.lower() in SKIP:
                continue
            plain = htmlmod.unescape(re.sub(r"<[^>]+>", " ", body)).strip()
            feats.append((name, snippet(plain)))

        assert feats, f"{eid}: no features parsed"

        # Build the L1 card body from the dossier's own L1 features.
        parts = [
            '<p class="l1-note"><em>At 1st level you gain the following '
            "\u2014 full rules in <strong>Core Gameplay Loop</strong> above.</em></p>"
        ]
        for name, snip in feats:
            parts.append(
                "<p><strong>%s.</strong> %s</p>"
                % (htmlmod.escape(name), htmlmod.escape(snip))
            )
        card = "<article class=\"card\">" + "".join(parts) + "</article>"

        # Replace the empty L1 grid (either a bare empty grid as in e144-e147,
        # or an empty <p></p> card as in e148-e153) inside the Level 1 block.
        l1 = re.search(
            r'(<details class="level"[^>]*><summary><span class="lv">1</span>.*?<div class="grid">)'
            r'(?:<article class="card"><p></p></article>)?'
            r"(</div></div></details>)",
            raw,
            re.S,
        )
        assert l1, f"{eid}: empty L1 block not found"
        raw = raw[: l1.start()] + l1.group(1) + card + l1.group(2) + raw[l1.end():]

        with open(path, "w", encoding="utf-8") as f:
            f.write(raw)
        print(f"{eid}: L1 card filled with {len(feats)} features")


if __name__ == "__main__":
    main()
