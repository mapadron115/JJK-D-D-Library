#!/usr/bin/env python3
"""Fix: King of POP codex entry gets the real player-facing technique.

zack (2026-09-11): "king of pop is still showing michael jackson material and NOT
the technique itself" — he supplied king_of_pop_jjk5e_technique_guide.html.

The michael-jackson codex entry previously carried ONLY the antagonist layer plus
a dangling pointer ("the player-facing technique lives in the rules library's
technique codex" — it didn't). This rebuilds the entry from the guide:

- features: the leveled L1-L18 technique (Slave to the Rhythm ... HIStory)
- maximum: Blue Gangsta (L11)
- domain: Thriller - Night of the Living Dead (L18; 20 CE per the guide;
  800 clash / 5-round burnout / 2-min figure-Domain bookkeeping retained from
  the domain audit; Michael stays exempt from the initiative-20 sure-hit
  standardization - "King of POP locked")
- the 12 antagonist-specific features are preserved verbatim as the
  unlevelled layer, with the stale pointer feature rewritten.
- tier IV -> V (guide: "Tier V - Special Grade ceiling"; Tier V exists in codex)
- role / ce_ability filled from the guide
- detail bespoke -> full, so future extract_codex.py regens carry this entry
  over intact (regen carve-out) instead of rebuilding it from the draft.

Also appends the guide's 4 technique feats to data/codex_feats.js and adds
"78" to FULL_OVERRIDE_MODULES in extract_codex.py.
"""
import json
import os
import re

DATA = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- leveled technique
FEATURES = [
    {
        "level": 1,
        "name": "Slave to the Rhythm",
        "cost_line": "",
        "kind": "feature",
        "text": (
            "**Performance** is both fuel and a state threshold \u2014 spend it aggressively for burst "
            "damage, or protect the meter long enough to unlock **Dangerous**, **Invincible**, and finally "
            "**HIStory**.\n\n"
            "- **POP Die:** d6 (d8 at 6th, d10 at 11th, d12 at 18th). **Performance cap:** 3 "
            "(4 at 6th, 5 at 11th, 6 at 18th).\n"
            "- **Gain (offense):** once on each of your turns, after you voluntarily move at least 10 feet "
            "and then hit a hostile creature with an attack or cause a hostile creature to fail a saving "
            "throw against King of POP, gain 1 Performance after the effect resolves. Limit 1/turn.\n"
            "- **Gain (defense):** beginning at level 3, gain 1 Performance once per round when a King of "
            "POP reaction causes an attack to miss you or lets you fully avoid a damaging effect. Limit "
            "1/round.\n"
            "- **Breaking the routine:** if your turn ends while you have Performance and you neither "
            "voluntarily moved at least 10 feet nor attempted an attack or offensive King of POP effect, "
            "lose 1 Performance. Becoming incapacitated reduces Performance to 0. All Performance disappears "
            "1 minute after meaningful combat ends.\n"
            "- Harmless objects, allies, willing training targets, and other non-hostile creatures cannot be "
            "used to farm Performance.\n\n"
            "**Fundamental law:** choreography is more authoritative than anatomy. King of POP makes your body "
            "obey the next position in a performance even when balance, leverage, inertia, or ordinary muscular "
            "mechanics would reject it. It does not manipulate frames, time, or another creature's cursed-energy "
            "rhythm. **Hard boundaries:** no teleportation unless a feature says so; no generic telekinesis or "
            "unrestricted momentum control; no Projection-style frame scripting or automatic extra attacks."
        ),
    },
    {
        "level": 1,
        "name": "Rock with You",
        "cost_line": "Bonus Action \u00b7 1 CE",
        "kind": "feature",
        "text": (
            "Perform a cursed moonwalk, slide, or glide and move up to half your walking speed.\n\n"
            "- This movement does not provoke opportunity attacks, ignores nonmagical difficult terrain, may "
            "change direction freely, does not consume your ordinary movement, and counts toward Slave to the "
            "Rhythm.\n"
            "- This is movement, not teleportation: you need a physical path, interact with hazards normally, "
            "cannot pass through solid objects, and cannot end inside another creature."
        ),
    },
    {
        "level": 1,
        "name": "Beat It",
        "cost_line": "Once per turn \u00b7 qualifying hit",
        "kind": "feature",
        "text": (
            "When you hit with a weapon attack, unarmed strike, or direct damaging technique attack after "
            "voluntarily moving at least 10 feet this turn, spend up to 3 Performance. Add 1 POP Die of force "
            "damage per Performance spent.\n\n"
            "- For every Performance spent, choose yourself or the struck creature and move that creature 5 "
            "feet. A hostile creature cannot be moved this way if it is more than one size larger than you.\n"
            "- If Beat It is attached to a qualifying critical strike, its dice are part of that direct strike "
            "and can participate in Black Flash under the campaign's normal critical/Black Flash procedure.\n"
            "- A Beat It spend attached to the same hit that generated a new Performance point uses the "
            "Performance you had before the new point is gained."
        ),
    },
    {
        "level": 3,
        "name": "Smooth Criminal",
        "cost_line": "Reaction \u00b7 2 CE",
        "kind": "feature",
        "text": (
            "When an attack you can perceive would hit you, add your proficiency bonus to AC against that "
            "attack only.\n\n"
            "- If this turns the hit into a miss, immediately move up to 10 feet without provoking opportunity "
            "attacks. This counts as King of POP movement and can grant the once-per-round defensive "
            "Performance.\n"
            "- If the attack still hits after the AC increase, reduce its damage by 1 POP Die + your CE "
            "modifier instead."
        ),
    },
    {
        "level": 3,
        "name": "Remember the Time",
        "cost_line": "",
        "kind": "feature",
        "text": (
            "At the beginning of each of your turns, the space you occupy becomes your **Remembered Mark** "
            "until the beginning of your next turn. At level 3 this is primarily setup \u2014 at level 11, "
            "**This Time Around** turns the remembered position into an escape route."
        ),
    },
    {
        "level": 6,
        "name": "Dangerous",
        "cost_line": "",
        "kind": "feature",
        "text": (
            "Your POP Die becomes d8 and your Performance maximum becomes 4. While you have at least 3 "
            "Performance, you enter **Dangerous**:\n\n"
            "- Walking speed +10 feet.\n"
            "- Advantage on Dexterity saving throws against effects you can perceive.\n"
            "- Standing from prone costs only 5 feet of movement.\n"
            "- During your turn you may move across vertical surfaces and liquids without falling during that "
            "movement.\n"
            "- The first 5 feet of ordinary movement you take each turn does not provoke opportunity attacks.\n\n"
            "If you fall below 3 Performance, these benefits end immediately."
        ),
    },
    {
        "level": 6,
        "name": "Another Part of Me",
        "cost_line": "",
        "kind": "feature",
        "text": (
            "Once during each use of Rock with You, make one abrupt change in direction \u2014 including a "
            "complete reversal \u2014 without losing movement. You may also move through the space of a hostile "
            "creature during Rock with You as difficult terrain if it is no more than one size larger than you. "
            "You cannot end there."
        ),
    },
    {
        "level": 11,
        "name": "Invincible",
        "cost_line": "",
        "kind": "feature",
        "text": (
            "Your POP Die becomes d10 and your Performance maximum becomes 5. While at 4 or more Performance, "
            "**Dangerous** improves into **Invincible**:\n\n"
            "- Dangerous's speed bonus becomes +20 feet.\n"
            "- When a Dexterity save would normally deal half damage on success, you take no damage on success "
            "and half on failure.\n"
            "- Rock with You ignores magical difficult terrain unless that terrain specifically prevents "
            "supernatural movement or suppresses cursed techniques."
        ),
    },
    {
        "level": 11,
        "name": "This Time Around",
        "cost_line": "Reaction \u00b7 3 CE \u00b7 2 Performance",
        "kind": "feature",
        "text": (
            "When you are hit by an attack or fail a Dexterity saving throw, retrace your own movement and "
            "return to your Remembered Mark **before the triggering effect resolves**.\n\n"
            "- This is movement rather than teleportation and does not provoke opportunity attacks.\n"
            "- If the attacker can no longer legally reach or target you, the attack misses. If you have left "
            "an area of effect, you are unaffected by it. If the effect can still legally reach the Remembered "
            "Mark, resolve it normally.\n"
            "- You cannot use This Time Around if the retraced route has become physically impossible to "
            "traverse."
        ),
    },
    {
        "level": 14,
        "name": "Don't Walk Away",
        "cost_line": "Reaction \u00b7 4 CE \u00b7 20 RCT Healing Reserve \u00b7 2 Performance \u00b7 60 ft",
        "kind": "feature",
        "text": (
            "**Off-milestone mastery \u2014 suggested level 14; requires Reverse Cursed Technique.** Level 14 is "
            "intentionally not a normal technique milestone. The forward technique declares where the user's "
            "choreography permits the body to move; positive energy reverses that law and declares where "
            "another motion must stop. This is King of POP's **Cursed Technique Reversal**.\n\n"
            "**Trigger:** a creature you can perceive begins movement. The target makes a Constitution saving "
            "throw against your CE save DC.\n\n"
            "- **Failure:** its current movement immediately ends and its speed becomes 0 until the end of the "
            "current turn.\n"
            "- **Success:** movement continues, but its remaining speed is reduced by 10 feet for that turn.\n\n"
            "**Limits:** movement has to exist to be stopped. Cannot undo teleportation after relocation has "
            "resolved. Cannot interrupt a fully resolved effect. Cannot target movement you cannot perceive. "
            "Does not stun, paralyze, or remove a creature's action."
        ),
    },
    {
        "level": 18,
        "name": "HIStory",
        "cost_line": "",
        "kind": "feature",
        "text": (
            "Your POP Die becomes d12 and your Performance maximum becomes 6. When you roll initiative and are "
            "not surprised, begin with 2 Performance.\n\n"
            "At maximum Performance, enter **Perfect Performance**:\n\n"
            "- Dangerous and Invincible remain active.\n"
            "- Opportunity attacks against you have disadvantage.\n"
            "- During your own movement, unsupported space briefly behaves as a surface beneath your feet \u2014 "
            "you can step, slide, and moonwalk through open air. This is not a flying speed. If you end movement "
            "unsupported, gravity resumes normally."
        ),
    },
]

MAXIMUM = {
    "level": 11,
    "name": "Blue Gangsta",
    "cost_line": "Action \u00b7 10 CE \u00b7 requires 4+ Performance",
    "kind": "maximum",
    "text": (
        "The entire stored performance collapses into one uninterrupted execution route. Consume all current "
        "Performance. Move up to **20 ft \u00d7 Performance consumed** along one continuous choreographed path.\n\n"
        "- This movement does not provoke opportunity attacks. You may traverse walls, ceilings, liquids, "
        "hostile spaces, and unsupported gaps. You still cannot pass through solid matter and must end in an "
        "unoccupied space you can physically occupy.\n"
        "- Each chosen creature you pass within 5 feet of makes one Dexterity saving throw. On failure it takes "
        "**2 \u00d7 Performance spent POP Dice + CE modifier** force damage and falls prone. On success it takes "
        "half damage and does not fall prone. A creature is affected only once per use.\n"
        "- **Gangsta's Exit:** after resolving Blue Gangsta, choose your facing and finish in a pose. Until the "
        "beginning of your next turn, creatures damaged by Blue Gangsta cannot gain advantage against you solely "
        "from flanking, facing, or positional orientation.\n"
        "- Blue Gangsta is save-based area damage and cannot critically hit or Black Flash."
    ),
}

DOMAIN = {
    "level": 18,
    "name": "Thriller \u2014 Night of the Living Dead",
    "cost_line": "20 CE \u00b7 full-turn activation \u00b7 enclosed 60-foot radius \u00b7 up to 1 minute",
    "kind": "domain",
    "text": (
        "A moonlit cemetery and abandoned city block swallow the battlefield. Fog hugs the floor. Graves split "
        "open. Rows of dead figures take formation. The beat starts.\n\n"
        "**Sure-Hit \u2014 Everybody Dance.** The sure-hit deals no damage. Every chosen creature receives the "
        "complete Domain procedure directly into its mind: the choreography, timing, what constitutes a Misstep, "
        "and what happens at three Missteps. No shared language is required. Ordinary attacks and technique rolls "
        "inside Thriller remain ordinary; the rules implant is the guaranteed event.\n\n"
        "**The Five-Step Routine.** When Thriller stabilizes, roll five choreography results (d8): **1** "
        "Moonwalk \u2014 spend at least 15 feet of movement on a backward glide. **2** Side Slide \u2014 spend "
        "at least 10 feet moving laterally before ending your turn. **3** Spin \u2014 spend 10 feet of movement "
        "executing a full stationary spin. **4** Toe Stand \u2014 spend your bonus action striking and maintaining "
        "the pose. **5** Kick & Snap \u2014 replace one attack with an unarmed strike (or use your bonus action "
        "to make one if you would not attack). **6** The Lean \u2014 spend your reaction maintaining the pose; "
        "forced movement against you is reduced by 10 feet until your next turn. **7** Freeze \u2014 after "
        "completing your action, spend 10 feet of remaining movement and voluntarily make no further movement "
        "that turn. **8** Full Combination \u2014 roll twice, rerolling further 8s; both steps must be "
        "completed.\n\n"
        "Michael and every implanted creature instantly know the full sequence. At the next initiative count 20, "
        "the first step becomes active. A creature has until the following initiative count 20 to comply \u2014 "
        "failure gives 1 Misstep, then the next step begins.\n\n"
        "**Improvisation.** A creature unwilling or unable to follow a step literally may improvise: at the end "
        "of its turn it makes Dexterity (Acrobatics) or Charisma (Performance) against Michael's CE save DC. "
        "Success counts as completing the step; failure is a Misstep.\n\n"
        "**Missteps.** **1 Misstep** \u2014 the dead are watching; no additional numerical penalty, the Domain "
        "makes the failure visible. **2 Missteps** \u2014 the formation opens; still no stacking stat penalty. "
        "**3 Missteps** \u2014 **Living Dead**: the creature is assimilated into the backup troupe until Thriller "
        "ends. A Living Dead Backup Dancer retains HP, AC, saves, walking speed, ability scores, and basic "
        "weapon/unarmed attacks; cannot take reactions; cannot activate Innate Techniques, Maximum Techniques, "
        "Domain Expansion, RCT, or active cursed-tool abilities; Michael determines its movement; it uses its "
        "action to make one basic attack against a legal non-Dancer target Michael chooses (or Dodges if none "
        "exists); it automatically succeeds on Thriller choreography and counts as both its original creature "
        "type and Undead until the Domain ends.\n\n"
        "**Finale or Encore.** After the fifth choreography step resolves, Michael chooses one. **Encore** \u2014 "
        "run it again: generate another five-step sequence; existing Missteps and Living Dead remain. "
        "**Finale** \u2014 every Living Dead dancer may immediately move up to half its speed without provoking "
        "opportunity attacks and make one basic attack against a legal non-Dancer target Michael chooses; "
        "Michael rises to maximum Performance, moves up to his walking speed without provoking opportunity "
        "attacks, makes one weapon or unarmed attack, and may add a 6-POP-Die Beat It to that attack without "
        "spending Performance. The Domain then ends and normal Technique Burnout applies.\n\n"
        "**Rule-Domain counterplay:** successful anti-domain protection suppresses Everybody Dance for the "
        "protected creature while the sure-hit remains suppressed. Ordinary attacks inside Thriller are never "
        "converted into automatic hits."
    ),
    "clash_points": 800,
    "duration_min": 2,
    "burnout_rounds": 5,
    "radius": "60-foot enclosed",
    "activation": "Full turn",
    "ce_cost": "20 CE",
}

FRAMING = {
    "level": None,
    "name": "THE BASE TECHNIQUE AND MICHAEL'S LAYER",
    "cost_line": "",
    "kind": "feature",
    "text": (
        "Carried over faithfully from the zack-approved King of POP technique guide (not redesigned). The "
        "**King of POP** progression above \u2014 Levels 1\u201318, **Maximum: Blue Gangsta**, and **Domain "
        "Expansion: Thriller \u2014 Night of the Living Dead** \u2014 is the reusable player-facing technique: "
        "the Performance engine, the named applications (Slave to the Rhythm, Rock with You, Beat It, Smooth "
        "Criminal, Remember the Time, Dangerous, Another Part of Me, Invincible, This Time Around, Don't Walk "
        "Away, HIStory), the Misstep engine, and the Domain's sure-hit choreography compulsion.\n\n"
        "What follows is Michael's antagonist-specific layer only: the Burned Crown, the failed vessel, and the "
        "Gallery. Per the guide, these overlays are intentionally kept outside the base technique."
    ),
}

FEATS = [
    {
        "name": "Off the Wall",
        "prereq": "Prerequisite: Rock with You",
        "text": (
            "Rock with You can travel up vertical surfaces and across liquids regardless of current "
            "Performance. At level 6, it may also travel across ceilings. Rock with You's distance increases "
            "by 10 feet."
        ),
    },
    {
        "name": "Jam",
        "prereq": "Prerequisite: Smooth Criminal",
        "text": (
            "When Smooth Criminal causes an attack to miss, spend 1 Performance as part of the same reaction "
            "to make one weapon or unarmed attack against the attacker if it is within reach. You may take "
            "Smooth Criminal's granted movement before or after this attack."
        ),
    },
    {
        "name": "Bad",
        "prereq": "Prerequisite: Beat It",
        "text": (
            "Once per turn when you spend at least 2 Performance on Beat It, add one additional POP Die of "
            "force damage. This die costs no additional Performance."
        ),
    },
    {
        "name": "Don't Stop 'Til You Get Enough",
        "prereq": "Prerequisite: Slave to the Rhythm",
        "text": (
            "Once per turn, when spending Performance would reduce you to 0, you may remain at 1 Performance "
            "instead. Once this preserves Performance, you cannot use it again until the beginning of your "
            "next turn."
        ),
    },
]


def main():
    with open(os.path.join(DATA, "codex.json"), encoding="utf-8") as f:
        payload = json.load(f)
    techniques = payload["techniques"]
    entry = next(t for t in techniques if t.get("id") == "michael-jackson")

    # Preserve the 12 antagonist-specific features, replacing the stale pointer.
    old = entry["features"]
    assert len(old) == 13, f"expected 13 antagonist features, found {len(old)}"
    assert old[0]["name"] == "THRILLER", f"unexpected first feature: {old[0]['name']}"
    antagonist = [FRAMING] + old[1:]

    entry["tier"] = "V"
    entry["role"] = "mobile striker / evasive duelist / rule-Domain controller"
    entry["ce_ability"] = "CHA or WIS"
    entry["detail"] = "full"
    entry["features"] = FEATURES + antagonist
    entry["maximum"] = MAXIMUM
    entry["domain"] = DOMAIN

    with open(os.path.join(DATA, "codex.json"), "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)
        f.write("\n")

    # Regenerate the static JS payload the site loads.
    with open(os.path.join(DATA, "codex.js"), "w", encoding="utf-8") as f:
        f.write("window.CODEX = ")
        json.dump(payload, f, ensure_ascii=False)
        f.write(";\n")

    # Feats for the builder's feat picker: replace the 4 antagonist-layer feats
    # (The Stand-In etc. - applications of the Burned Crown / Gallery, which only
    # Michael-the-NPC has) with the guide's 4 player-facing technique feats, so
    # the picker offers real options to a player holding King of POP. The
    # "exactly four feats per figure" invariant is preserved.
    feats_path = os.path.join(DATA, "codex_feats.js")
    with open(feats_path, encoding="utf-8") as f:
        src = f.read()
    m = re.search(r' "michael-jackson": \[\n(.*?)\n \],\n', src, re.S)
    assert m, "michael-jackson feat block not found"
    block = ' "michael-jackson": [\n'
    for i, ft in enumerate(FEATS):
        block += "  {\n"
        block += '   "name": %s,\n' % json.dumps(ft["name"], ensure_ascii=False)
        block += '   "prereq": %s,\n' % json.dumps(ft["prereq"], ensure_ascii=False)
        block += '   "text": %s\n' % json.dumps(ft["text"], ensure_ascii=False)
        block += "  }" + (",\n" if i < len(FEATS) - 1 else "\n")
    block += " ],\n"
    src = src[: m.start()] + block + src[m.end():]
    with open(feats_path, "w", encoding="utf-8") as f:
        f.write(src)

    # Extractor carve-out so future regens preserve this hand-built entry.
    ext_path = os.path.join(DATA, "extract_codex.py")
    with open(ext_path, encoding="utf-8") as f:
        ext = f.read()
    old_set = 'FULL_OVERRIDE_MODULES = {"21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42"}'
    new_set = 'FULL_OVERRIDE_MODULES = {"21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "78"}'
    assert old_set in ext, "FULL_OVERRIDE_MODULES line not found"
    ext = ext.replace(old_set, new_set)
    ext = ext.replace(
        "# (2026-09-11 RoR rebuild: Shaka/36, Jack/37, Qin/38, Tesla/39, Simo/40,\n# Raiden/41, Okita/42).",
        "# (2026-09-11 RoR rebuild: Shaka/36, Jack/37, Qin/38, Tesla/39, Simo/40,\n# Raiden/41, Okita/42; 2026-09-11 King of POP/78: hand-built full technique\n# from zack's technique guide + the antagonist layer).",
    )
    ext = ext.replace(
        "59-77 (full), 78 (Michael Jackson, bespoke). Skips infra docs.",
        "59-77 (full), 78 (Michael Jackson: hand-built full entry, preserved on regen). Skips infra docs.",
    )
    with open(ext_path, "w", encoding="utf-8") as f:
        f.write(ext)

    print("michael-jackson entry rebuilt:")
    print("  features:", len(entry["features"]), "(11 leveled + 13 antagonist)")
    print("  maximum:", entry["maximum"]["name"])
    print("  domain:", entry["domain"]["name"])
    print("  tier:", entry["tier"], "| role:", entry["role"], "| CE:", entry["ce_ability"])


if __name__ == "__main__":
    main()
