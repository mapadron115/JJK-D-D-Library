// ============================================================================
// CODEX_FEATS — Innate Technique Feats for the Historical Sorcerers Codex
// ============================================================================
// HAND-AUTHORED. These feats were written by hand (with editorial review) for
// each of the 74 historical figures' Innate Techniques. They are NOT extracted
// from the figure dossiers — the dossiers contain no feat lists.
//
// DESIGN PHILOSOPHY: every feat is a new APPLICATION of an existing feature —
// a clever new way to use what the figure already has — never a flat buff.
// No +X damage/AC/DC, no extra uses per rest, no cost reductions as the point.
// Model patterns (from the V.6 technique-feat lists): new vector (Limitless
// "Spatial Skirmishing"), emergent combination (Limitless "Maximum: Hollow
// Purple"), new shape + context (Shrine "Spiderweb"), new usage pattern
// (Shrine "Disassembly"), conceptual leap (Shrine "Maximum: World Cleave").
//
// STRUCTURE: keyed by codex technique ID, mirroring technique_feats.js
// (window.TECHNIQUE_FEATS). Each feat: {name, prereq, text}.
//   - "prereq" is "" (no prerequisite) or "Prerequisite: <feature name(s)>",
//     where each feature name matches a real features[] / maximum / domain /
//     l20 name in that figure's codex record, character-for-character.
//   - Intended to load AFTER data/technique_feats.js.
//   - Do NOT edit builder.html here; the parent agent wires the loader.
// ============================================================================

window.CODEX_FEATS = {
 "miyamoto-musashi": [
  {
   "name": "The Thrown Answer",
   "prereq": "",
   "text": "When your Answering Cut triggers, you may deliver it as a thrown weapon attack (range 20/60) instead of a melee weapon attack, using your normal attack bonus. Any object you throw counts as a longsword you are proficient with (The Oar Suffices). All of the Answering Cut's normal riders apply - the additional force dice from The Conclusion or Two Heavens as One, Perfected, and the domain's sure-hit - and it still counts as your once-per-turn Answering Cut."
  },
  {
   "name": "The Rhythm Never Lies",
   "prereq": "Prerequisite: Read the Rhythm",
   "text": "While a creature is marked as your Duelist by Read the Rhythm, you can sense when it deliberately speaks a lie in your presence - its tempo breaks, and you feel the break. No action is required, but you must be able to hear and understand the creature. You learn only that it lied, not the truth it withheld."
  },
  {
   "name": "The Dismissed Circle Cuts",
   "prereq": "Prerequisite: Refined Simple Domain: The Duel Already Concluded",
   "text": "When you dismiss your Refined Simple Domain as a free action, you may invert its first binding rule as the circle collapses: until the start of your next turn, the named Duelist cannot be targeted or affected by any attack, effect, or technique originating from anyone other than you. Heaven enforces the concluded duel's terms - there is no audience, even after the circle is gone."
  },
  {
   "name": "Iai: The Stroke Drawn Long",
   "prereq": "Prerequisite: Iai: The Single Stroke",
   "text": "When you resolve Iai: The Single Stroke, you may draw the stroke long instead of striking one creature: move up to 30 ft in a straight line (this movement does not provoke opportunity attacks), and make the Single Stroke attack separately against every creature you pass within 5 ft of during the movement. Each attack uses the Single Stroke's normal rules - critical on 18-20, an additional 8d10 slashing damage on a hit, half the additional damage on a miss. The 10 CE cost is unchanged."
  }
 ],
 "saladin": [
  {
   "name": "The Code Shelters the Fallen",
   "prereq": "Prerequisite: The Code Spoken",
   "text": "When you speak The Code Spoken, you may name one enemy within 30 ft that can hear and understand you as Shielded instead of (or in addition to) your willing creatures - the Code grants quarter, and a surrendering foe is owed it. The enemy may decline. Until the start of your next turn, when an ally attacks that Shielded enemy, you may use your reaction to interpose exactly as The Code Spoken allows: the attack targets you instead, and you gain resistance to that attack's damage."
  },
  {
   "name": "The Law Takes Ground",
   "prereq": "Prerequisite: The Siege Laws",
   "text": "When you declare a Siege Law, you may anchor it to a point within 60 ft that you can see instead of centering it on yourself. The Law's 30-ft radius becomes stationary at that point for the duration, and you maintain it with concentration as normal - you may walk away, and the ground you claimed still holds the Law. Changing the Law still costs an action, and the radius does not move with you."
  },
  {
   "name": "The Horns Were Already Closed",
   "prereq": "Prerequisite: Hattin: The Horns Encircled",
   "text": "You may resolve Hattin: The Horns Encircled as a reaction instead of an action. Trigger: an enemy you can see within 30 ft of you moves, or attempts to move, farther away from you. Pay the normal 10 CE and resolve the maximum as written - every enemy within 30 ft makes the WIS save against the horns that were already closing."
  },
  {
   "name": "The Code Finds an Heir",
   "prereq": "Prerequisite: The Code Outlives the Man",
   "text": "When The Code Outlives the Man triggers, choose one ally within 60 ft as your heir. For the rest of the encounter, that ally may speak The Code Spoken as a bonus action without spending CE - the Code spends itself now - shielding up to your PB in creatures within 30 ft of the heir, and may use their own reaction to interpose exactly as the Code allows. Creatures Shielded by your heir count as Shielded for your Retribution of the Code, provided they are within 30 ft of you."
  }
 ],
 "leonardo-da-vinci": [
  {
   "name": "The Corrected Stumble",
   "prereq": "",
   "text": "You may apply The Golden Section as a reaction instead of a bonus action. Trigger: a creature you can see within 60 ft takes damage from an attack. Pay the normal 1 CE and slide that creature up to 10 ft in a direction you choose - potentially out of a second attack's reach, behind cover, or into it. A willing creature may decline; an unwilling creature resists and stays put, but your reaction and the CE are still spent."
  },
  {
   "name": "The Underpainting",
   "prereq": "Prerequisite: Terrain Study",
   "text": "When you cast Terrain Study, you may leave the composition unmanifested - the cube's 20-ft area looks and behaves normally, and the effect is imperceptible. As a reaction when a creature enters the cube's area, the terrain becomes (or ceases to be) difficult terrain for the remaining duration, exactly as you chose when casting. The 2 CE cost is unchanged; the painting was finished before anyone saw it."
  },
  {
   "name": "The Circle Closes",
   "prereq": "Prerequisite: Vitruvian Man: The Perfected Field",
   "text": "While Vitruvian Man: The Perfected Field stands, then at the start of each of your turns you may compose convergently instead of freely: every creature the field would slide is slid up to 10 ft toward a single point you choose within the field, rather than in directions you choose individually. All of the field's normal slide rules still apply - willing creatures may decline, and unwilling creatures are slid only if they failed the STR save when the field was created."
  },
  {
   "name": "The Figures, Fixed",
   "prereq": "Prerequisite: The Smile",
   "text": "When you trigger The Smile, you may spend its once-per-long-rest perfection on stillness instead of composition: choose up to PB willing creatures you can see within 60 ft. For 1 minute, they cannot be moved by enemy forced movement - Heaven ratifies their positions exactly where they stand, and no slide, push, pull, or teleport imposed by a hostile effect displaces them."
  }
 ],
 "zhuge-liang": [
  {
   "name": "Straw Boats on the River",
   "prereq": "",
   "text": "Your Borrowed Arrows are the enemy's wasted attacks, and a wasted attack is wasted whoever it was aimed at. Whenever a ranged attack misses an ally within 60 ft of you, you gain 1 Borrowed Arrow. Your maximum (PB, or 2 x PB at L11+) and the 1-minute fade still apply as normal."
  },
  {
   "name": "The Hummed Bar",
   "prereq": "Prerequisite: The Guqin on the Wall",
   "text": "You need not play the whole piece to frighten someone - sometimes a single bar, hummed at the right moment, is enough. As a bonus action (1 CE), choose one enemy within 60 ft that can hear you: it makes a WIS save against your technique DC. On a failure it is frightened of you until the end of your next turn - frightened not of your strength, but of the ambush it is certain you are hiding. It may repeat the save at the end of each of its turns."
  },
  {
   "name": "The Invoice, Rewritten",
   "prereq": "Prerequisite: The Empty City: Sima Yi Turned Back",
   "text": "While The Empty City: Sima Yi Turned Back is active, when an attack misses you, you may forgo the 4d8 psychic damage to Mark the attacker instead, exactly as The Open Gates marks: your next attack against the Marked creature before the end of your next turn has advantage and deals an additional 1d8 force damage. You still gain the 2 Borrowed Arrows - the humiliation is itemized differently, that is all."
  },
  {
   "name": "The Gate Is Open, the Invoice Is Due",
   "prereq": "Prerequisite: The Empty City: Where the Army Refused to Enter",
   "text": "While your Domain persists, you may use a bonus action to open the gate for exactly one hostile inside it: until the start of your next turn, the sure-hit's untargetability does not apply to that hostile's sight-requiring attacks against you, and the first attack it makes against you has advantage (your Open Gates invitation, extended by name). If that attack misses, resolve the domain's binding rule as normal - the attacker takes 2d8 psychic damage, you gain 2 Borrowed Arrows - and the attacker is Marked as The Open Gates marks."
  }
 ],
 "oda-nobunaga": [
  {
   "name": "The Flag Follows the Shot",
   "prereq": "",
   "text": "When you fire Nagashino's Thunder, you may pay 1 additional CE to plant the flag where the shot lands: if at least one of the attack's shots hits, establish a claim (15-ft radius, 1 minute) centered on one creature you hit, as part of the same action. The claim follows all the normal claim rules and counts against your active maximum."
  },
  {
   "name": "The Concentrated Volley",
   "prereq": "Prerequisite: Three Lines of Gunners",
   "text": "When you fire Nagashino's Thunder, you may merge the three lines into one: make a single attack roll against a single target instead of three attack rolls, paying the normal 3 CE. On a hit, the target takes 6d10 piercing damage instead of 2d10 - the whole volley arriving as one thunderclap. On a miss, nothing happens."
  },
  {
   "name": "A Single Temple Burns",
   "prereq": "Prerequisite: Honnō-ji: The Temple Burns Again",
   "text": "You need not burn every temple at once. As a bonus action (3 CE), choose one of your claims within 60 ft: it erupts. Every enemy in that claim's ground must make a DEX save against your technique DC or take 8d8 fire damage (half on success), exactly as Honnō-ji: The Temple Burns Again burns each claim. The erupted claim ends; your other claims are untouched."
  },
  {
   "name": "The Borders Hold",
   "prereq": "Prerequisite: Tenka Fubu: The Realm Under Heaven",
   "text": "When you cast Tenka Fubu: The Realm Under Heaven, you may declare the border sealed: for 1 minute, hostile creatures outside the domain's radius cannot willingly enter it - the realm admits whom it admits. Hostiles already inside are still bound by the sure-hit, No Land Beyond, as normal."
  }
 ],
 "cleopatra": [
  {
   "name": "The Contract in Ink",
   "prereq": "",
   "text": "Terms need not be spoken to be binding - Heaven reads, too. As an action (1 CE), you may inscribe Terms on an object or surface you touch. The inscription lasts 1 hour, and the first creature that reads it may accept or decline exactly as if you had spoken to them: declining is always free and safe, and an accepted bargain binds for 1 hour with the Poison Rider enforcing it as normal. You may maintain only one inscription at a time."
  },
  {
   "name": "The Viceroy's Court",
   "prereq": "Prerequisite: The Ptolemaic Court",
   "text": "A queen need not hold court in person. When you activate Court of Asps, you may center the 30-ft aura on one willing ally within 30 ft instead of yourself - it moves with them for the duration, and all of its normal effects apply: enemies in the aura have disadvantage on saves against being charmed or frightened, allies in it gain advantage on CHA checks, and you may offer Terms to any number of creatures in the aura with one bonus action."
  },
  {
   "name": "The Gambit, Offered for Another",
   "prereq": "Prerequisite: The Last Gambit",
   "text": "The asp strikes for others, too. As a reaction (8 CE), when an ally within 30 ft of you is reduced to 0 hit points by a creature's attack or effect, you may offer your Final Terms to that creature before your ally falls: accept, and the creature is bound for 1 hour - it cannot attack or cause harm to that ally, Heaven-enforced, and breaking the binding triggers the Poison Rider with no save on the damage; decline, and the asp strikes from beyond - the decliner takes 8d10 poison damage (CON save vs your DC halves)."
  },
  {
   "name": "A Single Donation",
   "prereq": "Prerequisite: Queen of Kings (Capstone)",
   "text": "The Donations of Alexandria need not feed a multitude - sometimes one gift, precisely given, is enough. As a bonus action (3 CE), speak Alexandria's Terms to one creature that can hear you: accept, and it is bound for 24 hours to take no hostile action against you or your allies; breaking the vow triggers the Poison Rider at 8d8 with no save on the damage (the condition is negated on a successful CON save, as normal). Declining is always free and safe."
  }
 ],
 "bruce-lee": [
  {
   "name": "Water Takes Every Shape",
   "prereq": "",
   "text": "Water does not only catch fists. When an ally within 10 ft of you is targeted by a spell or technique feature (not only by an attack), you may use your Water's Duty reaction (1 CE) all the same: move up to 10 ft without provoking opportunity attacks and become the target instead, provided the effect can target you. A willing ally may always be intercepted; an unwilling one cannot. Stop-Hit does not apply - there is no strike to complete - you simply take the effect in their place."
  },
  {
   "name": "Read the Intention",
   "prereq": "Prerequisite: Be Water",
   "text": "He doesn't react to the technique. He reacts to the intention of the technique - and now he remembers what he read there. When your Be Water Intercepting Fist strike hits a creature casting a spell or activating a technique feature, you learn that feature's name and a one-line summary of its effect (the GM provides it), whether or not the target fails its CON save against the disruption. The disruption resolves as normal."
  },
  {
   "name": "One Inch, Returned",
   "prereq": "Prerequisite: No Limitation as Limitation",
   "text": "The Returned Blow may be answered at one inch. When your Stop-Hit reduces an attack's damage to 0, you may resolve One-Inch Punch against the attacker as part of the same reaction instead of a plain unarmed strike, paying its normal 4 CE: melee technique attack, 3d8 + WIS force damage on a hit, the target pushed 15 ft, and if Large or smaller it must succeed on a STR save vs your DC or be knocked prone."
  },
  {
   "name": "The Mat Stays Down",
   "prereq": "Prerequisite: The Dojo Floor (Simple Domain)",
   "text": "The circle moves with you - unless you tell it to stay. When you move, you may leave your Dojo Floor centered on its current position instead of moving with you; it remains there, stationary, with all its normal effects. As a bonus action, you may recenter it on yourself. You gain its benefits only while you remain inside it."
  }
 ],
 "alan-turing": [
  {
   "name": "The False Transcript",
   "prereq": "",
   "text": "The Imitation Game is played both ways: he can imitate a technique, and he can imitate being someone else using one. When you activate a technique feature, you may spend 1 CE to present it as one of your stored models instead - any creature that Observes the activation records the model's name, action cost, CE cost, range, and effect summary rather than your real feature's. Your actual feature resolves exactly as normal; only the transcript lies."
  },
  {
   "name": "The Shared Runtime",
   "prereq": "Prerequisite: Stored Program",
   "text": "A stored program can run on another machine. As an action (2 CE), choose one willing ally within 30 ft and one of your stored models: for 1 minute, that ally may activate the imitation once as an action, paying the model's CE cost or 3 CE (whichever is higher), with all of your imitation penalties applying (Cross-Compilation included). The model is not consumed - the program is copied, not moved."
  },
  {
   "name": "The Interrogator Takes Notes",
   "prereq": "Prerequisite: The Test",
   "text": "Sometimes the question matters less than the answer it provokes. While The Interrogator runs on a target, once per round when the target activates a technique feature, you may use your reaction to automatically record a model of it - no Observation check, no CE cost, normal capacity rules - instead of forcing a reroll that round. The interrogation continues; you simply chose to listen rather than interrupt."
  },
  {
   "name": "The Co-Authored Thesis",
   "prereq": "Prerequisite: Domain Expansion: Church–Turing Thesis",
   "text": "Inside the Church-Turing Thesis, his co-authors are protected too. While your Domain persists, Thesis Defense extends to your allies inside it: hostile creatures cannot Observe or imitate their technique features either. The thesis is not subject to itself - and neither are its acknowledged co-authors."
  }
 ],
 "frida-kahlo": [
  {
   "name": "Viva la Vida, Sung Louder",
   "prereq": "",
   "text": "The song was never only about her own pain. As a reaction (1 CE), when an ally within 30 ft of you takes damage from a creature's attack or effect that you can perceive, you may exhibit their pain: the attacker takes psychic damage equal to your CON modifier + your proficiency bonus. No save, no attack roll - it is a mirror, not a blow, and now it hangs facing outward."
  },
  {
   "name": "The Bench Holds Two",
   "prereq": "Prerequisite: The Two Fridas",
   "text": "The painting shows two Fridas, but the bench has always had room. When you activate Two Hearts, One Wound, you may choose a second ally bonded by your Shared Wound: for the duration, all damage that ally would take is redirected to you as well, exactly as for the first. Your Exhibited Pain backlash is still doubled only once - the artery is shared; the exhibition is one."
  },
  {
   "name": "The Exhibition, Hung Elsewhere",
   "prereq": "Prerequisite: Self-Portrait with Thorn Necklace",
   "text": "An exhibition can travel. While your Permanent Exhibition is active (you have CE remaining), you may use an action to hang your 30-ft Gallery of Nails aura on a point within 60 ft instead of yourself - it remains there, stationary, with all its normal effects, for as long as you have CE. As a bonus action, you may take it down and re-hang it centered on yourself."
  },
  {
   "name": "The Procession Carries Her",
   "prereq": "Prerequisite: \"I Hope the Exit Is Joyful\" (Capstone)",
   "text": "She does not have to stay where she fell. When your lingering presence triggers on death, you may anchor it to one willing ally you can see instead of the spot where you fell - the 60-ft radius moves with that ally for the rest of the arc, exhibiting still: once per round, when an ally within the radius takes damage, the attacker takes psychic damage equal to your CON modifier + PB, no action, no CE, no save. Her friends carry the painting with them."
  }
 ],
 "medea": [
  {
   "name": "The Second Witness",
   "prereq": "",
   "text": "The threads are invisible to everyone but her - unless she chooses otherwise. As a bonus action (1 CE), choose one ally within 30 ft: for 1 minute, that ally sees your marks as gold threads and knows the trigger each mark was given. The ally cannot fire or consume your marks; they simply witness what you witness."
  },
  {
   "name": "No Comfort for the Comforter",
   "prereq": "Prerequisite: The Bride's Crown",
   "text": "Jason's new bride burned, and so does everyone who tries to soothe what she's marked. When a marked creature's trigger (e) - receiving healing or comfort from another creature - fires, the creature that gave the healing or comfort suffers the curse's damage as well (the same dice, Heaven-enforced). The mark is still consumed as normal: one thread, two collections."
  },
  {
   "name": "The House Went Quiet",
   "prereq": "Prerequisite: The Children's Silence",
   "text": "Sometimes the silence is bigger than one throat. When a marked creature's trigger fires, you may use your Silence After (Reaction, 3 CE) to widen it: on a failed WIS save vs your DC, a 15-ft-radius sphere of silence centers on the creature's position (stationary) until the end of its next turn - no one inside it can speak or cast spells with verbal components. The WIS save negates the silence, not the curse's damage, as normal."
  },
  {
   "name": "The Bride Names Her Champion",
   "prereq": "Prerequisite: Domain Expansion: The Wedding at Corinth",
   "text": "At a wedding, the bride may give away the first dance. When you cast Domain Expansion: The Wedding at Corinth, you may name one willing ally: for the duration, the trigger list's exception reads 'any hostile action other than directly engaging [that ally]' instead of 'directly engaging Medea'. The hall's attention turns where she points it - face her champion, or face the curse."
  }
 ],
 "attila": [
  {
   "name": "The Wake Follows",
   "prereq": "",
   "text": "When you take the Dash action across your cursed ground, you can drag the Wake with you — extend your Scourge's Wake ground by 10 ft in the direction you dashed, reshaping its edge."
  },
  {
   "name": "Drag Them With You",
   "prereq": "Prerequisite: Scourge's Wake & Trample",
   "text": "When you knock a creature prone with Trample on your cursed ground, you may pull them up to 10 ft across the ground in any direction as part of the same motion — the steppe drags them where you want."
  },
  {
   "name": "Lend the Momentum",
   "prereq": "Prerequisite: Break the Walls",
   "text": "You can lend Break the Walls' momentum: when a willing ally within 30 ft charges through a barrier or difficult terrain, they gain your Break the Walls push effect for that movement."
  },
  {
   "name": "The Fallen Feed the Wake",
   "prereq": "Prerequisite: Flagellum Dei (Maximum)",
   "text": "Creatures knocked prone by Flagellum Dei extend your Scourge's Wake — the ground spreads 5 ft outward from each prone creature, and the steppe grows with every fall."
  }
 ],
 "baba-yaga": [
  {
   "name": "The Fence Folds",
   "prereq": "",
   "text": "You can fold your bone-fence terrain into a cage: as an action, collapse a 20-ft section of the fence around one creature within the terrain — they are enclosed in a 10-ft bone dome (AC 15, 30 HP) until they break out or the terrain ends."
  },
  {
   "name": "The Forest Catches You",
   "prereq": "Prerequisite: The Mortar Flies & Root Grasp",
   "text": "While flying via The Mortar Flies, you can drop Root Grasp as a landing: when you descend from flight, Root Grasp triggers centered on your landing point with no action required — the forest catches you."
  },
  {
   "name": "The Hut Swallows",
   "prereq": "Prerequisite: The Hut Turns",
   "text": "Your hut can swallow: a hostile creature knocked prone by the hut's trampling movement may be scooped inside (DEX save vs your technique DC negates) — a creature inside takes 3d6 bludgeoning at the start of its turns and can escape with a DC 15 Strength check as an action."
  },
  {
   "name": "The Hut Intercepts",
   "prereq": "Prerequisite: \"The Hut Walks at Night\"",
   "text": "While your Domain stands, when a hostile creature escapes the Domain's restraint you may have your hut intercept — it moves up to its speed toward them as a reaction, and they must save against its trampling movement."
  }
 ],
 "elizabeth-b-thory": [
  {
   "name": "Pour for Your Guests",
   "prereq": "",
   "text": "When First Sip would heal you, you may instead have a willing creature within 30 ft regain those hit points — you pour for your guests first."
  },
  {
   "name": "Open Veins",
   "prereq": "Prerequisite: Drink Deep & Crimson Vintage",
   "text": "Your Crimson Vintages are open veins. When you use Drink Deep, you may spend 1 Year Drunk to drink from a wound you did not make: choose one living creature within 60 ft of you that dealt damage with a weapon or unarmed attack this turn - you gain temporary hit points equal to the damage it dealt (before First Sip\'s healing), instead of drinking only from your own strikes. Still once per round. The vintage is shared, not wasted."
  },
  {
   "name": "The Bath Knows No Walls",
   "prereq": "Prerequisite: The Bath Overflows",
   "text": "You can pour the Bath into a single vessel: The Bath Overflows may target one creature within 30 ft instead of an area — it becomes a 5-ft-radius pool centered on that creature that moves with them for the duration."
  },
  {
   "name": "Pass the Vintage",
   "prereq": "Prerequisite: Eternal Vintage (Maximum)",
   "text": "When a creature fails its save against Eternal Vintage, you may spend any number of Years Drunk to force one additional creature within 30 ft of the target to make the save as well — the vintage is passed around the table."
  }
 ],
 "gilles-de-rais": [
  {
   "name": "The Ledger Accepts Confessions",
   "prereq": "",
   "text": "Your ledger accepts confessions: as an action, offer a frightened creature a bargain — if it willingly confesses a true wrongdoing aloud, you gain 2 Sin charges and it is no longer frightened by you."
  },
  {
   "name": "The Debt Finds Them",
   "prereq": "Prerequisite: Debtor's Blade",
   "text": "Debtor's Blade can collect remotely: make a ranged attack (60 ft) with the blade — on a hit it deals its normal damage and you gain Sin charges as if struck in melee."
  },
  {
   "name": "Entered as Evidence",
   "prereq": "Prerequisite: Aura of the Accused",
   "text": "Your Aura of the Accused can be entered as evidence: condense it into a 15-ft cube within 60 ft for 1 minute — creatures inside save against fear as if in your aura, and you are unaffected outside it."
  },
  {
   "name": "Read as Precedent",
   "prereq": "Prerequisite: Close the Books",
   "text": "Close the Books can be read as precedent: instead of spending all Sin charges on one target, inscribe the verdict on the ground — the next hostile creature to enter a 15-ft-radius circle within 60 ft suffers the closing (WIS save for half), then the circle fades."
  }
 ],
 "hypatia-of-alexandria": [
  {
   "name": "Publish the Marginalia",
   "prereq": "",
   "text": "Your Marginalia can be published: as an action, you can grant an ally your notes on a creature — their next attack against that creature before the end of your next turn is made with advantage."
  },
  {
   "name": "The Traveling Lecture",
   "prereq": "Prerequisite: Peer Review",
   "text": "Peer Review can be conducted as a lecture: you may apply its effect to a second creature within 30 ft that can hear you, but both effects last until the start of your next turn instead of 1 minute — comprehensive, but brief."
  },
  {
   "name": "Read Aloud",
   "prereq": "Prerequisite: Burning Scroll",
   "text": "Burning Scroll can be read aloud: instead of targeting a creature, inscribe its flames across a 15-ft wall or floor section — creatures crossing it lose one damage resistance of your choice for 1 minute (INT save negates)."
  },
  {
   "name": "Restore the Burned",
   "prereq": "Prerequisite: The Burning of the Library",
   "text": "While The Burning of the Library is active, Unburn can be lent backward: you may apply it to an ally's destroyed object or dispelled effect within 30 ft — the library restores what was burned, not just your own pages."
  }
 ],
 "la-llorona": [
  {
   "name": "The River Holds the Wound",
   "prereq": "",
   "text": "Her water remembers wounds — and water is shared. When a hostile creature standing in her water takes damage from any source, you may use your reaction to let the water retell it: choose one other hostile creature standing in her water. It takes psychic damage equal to half the damage dealt, as the wound echoes across the black surface. A wound suffered in her water belongs to the river, and the river tells everyone."
  },
  {
   "name": "Send the River to Them",
   "prereq": "Prerequisite: Come to the Water & The Riverbed",
   "text": "You can reverse Come to the Water: instead of pulling a creature toward her water, push a 15-ft wave of her water at a creature within 60 ft — the wave carries her water's effects to them and knocks them prone on a failed save."
  },
  {
   "name": "Ask the River",
   "prereq": "Prerequisite: Drown the Sorrow & Her Children's Names",
   "text": "You can ask the river about a name: by speaking a lost one's name over her water during a short rest, you learn the direction and distance to the nearest creature who grieves them — the river keeps everyone."
  },
  {
   "name": "Speak Through the Flood",
   "prereq": "Prerequisite: The Flood Remembers (Maximum)",
   "text": "While your Maximum's flood is active, you can speak through the roar: your voice emanates from any point in the flood, and Come to the Water can originate from that point."
  }
 ],
 "nero": [
  {
   "name": "The Fall Gets a Verse",
   "prereq": "",
   "text": "When a hostile creature in your Audience is reduced to 0 HP, you may use your reaction to transfer one of your ongoing Audience effects from the fallen creature to another hostile creature in your Audience — the applause carries the program to a new listener."
  },
  {
   "name": "Sung From the Embers",
   "prereq": "Prerequisite: Crescendo & The Critic's Ear",
   "text": "While Crescendo is active, if you are silenced you may conduct through an ignited creature: choose one creature ignited by Encore of Embers within 120 ft — your Performance emanates from them instead of you until the silence ends."
  },
  {
   "name": "The Dirge Travels",
   "prereq": "Prerequisite: Encore of Embers",
   "text": "You may conduct your Dirge through an ignited creature: choose one creature ignited by Encore of Embers within 120 ft — until the end of your next turn, your Dirge program treats that creature's position as its point of origin."
  },
  {
   "name": "The City Is the Audience",
   "prereq": "Prerequisite: The Eternal City Aflame (Maximum)",
   "text": "While your Maximum's burning zone is active, you may conduct your Dirge through the zone itself: hostile creatures inside the zone count as being in your Audience regardless of range or hearing — the city listens."
  }
 ],
 "tamamo-no-mae": [
  {
   "name": "Foxfire Messenger",
   "prereq": "",
   "text": "You can send a Foxfire wisp as a messenger — it travels up to a mile to a creature you know and delivers a 25-word message, winking out after."
  },
  {
   "name": "The Court Abroad",
   "prereq": "Prerequisite: Nine Shadows",
   "text": "You can dispatch one shadow as an emissary: it travels up to 500 ft from you and you perceive through its senses — while emissaried it cannot attack, but your Foxfire can originate from its position."
  },
  {
   "name": "The Wrong Woman",
   "prereq": "Prerequisite: Never Where You Think",
   "text": "Never Where You Think can be gifted: when an ally within 30 ft is attacked, you may swap them with one of your shadows as your reaction (2 CE) — the blade finds the wrong woman, and she was never your ally."
  },
  {
   "name": "Breach of Etiquette",
   "prereq": "Prerequisite: \"THE GILDED CAGE OF NINE TAILS\" (disclosed rule-domain)",
   "text": "Inside your Domain, you can invite a breach: name one forbidden act — the first hostile creature to commit it is ejected to the Domain's edge and knocked prone (WIS save negates), the court's manners enforced by the room itself."
  }
 ],
 "the-golem-of-prague": [
  {
   "name": "The Street Obeys",
   "prereq": "",
   "text": "Your Clay Fists can shape the street: when you hit with Clay Fists, you may forgo the damage to reshape a 10-ft cube of earth or stone within your reach — make it difficult terrain for hostiles, or clear existing difficult terrain."
  },
  {
   "name": "Lend the Word",
   "prereq": "Prerequisite: The Word on the Brow",
   "text": "The brow-word can be lent: you may inscribe a copy on a willing creature's brow (1 CE, 1 minute ritual) — attempts to magically deceive or possess them must beat your technique DC first, and erasing the copy follows the same rules as your own."
  },
  {
   "name": "Shelter in the Truth",
   "prereq": "Prerequisite: Growing Truth",
   "text": "At Large or larger, you can shelter a willing creature inside your clay frame — while inside they have total cover, and you take damage in their place without spending Guard the Hunted."
  },
  {
   "name": "Take the Ward With You",
   "prereq": "Prerequisite: Guard the Hunted",
   "text": "You can take the ward into yourself: when you would take damage in your imprinted ward's place, you may instead pull them to your side — a willing ward teleports to an unoccupied space within 5 ft of you, and you take the damage as normal."
  }
 ],
 "william-wallace": [
  {
   "name": "Pay Out Promptly",
   "prereq": "",
   "text": "You can close a ledger entry early: as a reaction when a willing creature within 120 ft takes damage, immediately pay out their Martyr's Ledger amount as temporary HP instead of waiting for your turn."
  },
  {
   "name": "Throw the Cry",
   "prereq": "Prerequisite: Stirling Cry",
   "text": "Stirling Cry can be thrown: hurl it to a point within 120 ft — allies within 30 ft of that point (instead of you) gain its bonus, and hostiles there must succeed on a WIS save or be frightened for 1 round."
  },
  {
   "name": "Cede the Field",
   "prereq": "Prerequisite: Take the Field",
   "text": "Take the Field can be ceded: instead of moving yourself, grant the movement to a willing ally within 30 ft — they move as if they used Take the Field (without the claymore attack), and you stay."
  },
  {
   "name": "The Ledger Testifies",
   "prereq": "Prerequisite: Freedom Is a Weapon",
   "text": "While Freedom Is a Weapon is active, you can read a creature's entry to them: one hostile within 60 ft that has damaged your allies must succeed on a WIS save or be frightened of you for 1 minute as the ledger testifies."
  }
 ],
 "genghis-khan": [
  {
   "name": "Far Riders",
   "prereq": "",
   "text": "While traveling outside combat, you may post two Knotted members as far riders up to twice the Yam Relay's range apart. Treat the pair as a single observer: use the higher passive Perception, and any detail either discovers is relayed to the other instantly and silently."
  },
  {
   "name": "The Silent Cordon",
   "prereq": "Prerequisite: Nerge: The Great Hunt",
   "text": "Outside combat, you may spend 2 CE to lay Hunt Lines between pairs of Arban members as a tripwire perimeter lasting 8 hours. When any creature crosses a line, the members who formed it sense the crossing and its direction instantly, though not the crosser's identity; the lines name no Quarry and grant no attacks."
  },
  {
   "name": "Charge of the Black Sülde",
   "prereq": "Prerequisite: White and Black Sülde",
   "text": "When you reposition the Black Sülde, up to two Knotted members within 30 feet of its new position may use their reactions to move up to half their speed toward it. This movement provokes no opportunity attacks from one creature each moving member can see."
  },
  {
   "name": "Echo of the Open Sky",
   "prereq": "Prerequisite: Under the Eternal Blue Sky: One World, One Tumen",
   "text": "For 1 minute after Under the Eternal Blue Sky: One World, One Tumen ends, Knotted members may pass one tactical thought per round to any other Knotted member within 1 mile, ignoring ordinary walls and barriers. The sky closes slowly, and the Yam is the last thing to go quiet."
  }
 ],
 "joan-of-arc": [
  {
   "name": "The Standard at the Table",
   "prereq": "Prerequisite: Raise the Standard",
   "text": "Once per round, a sworn creature making a Charisma check to persuade others to aid its sworn duty may add your proficiency bonus to the roll after rolling, as Resolve. The vow argues for itself."
  },
  {
   "name": "A Voice Carries",
   "prereq": "Prerequisite: Voices at the Edge",
   "text": "As a bonus action for 1 CE, you may speak up to ten words that only one sworn ally within 60 feet hears, carried on the same voice that says hold. The ally need not be suffering any compulsion."
  },
  {
   "name": "Bear the Fallen",
   "prereq": "Prerequisite: Banner at Orléans",
   "text": "When Banner at Orléans lets a sworn ally move 10 feet, the moving ally may instead drag one willing or unconscious sworn creature of its size or smaller along for those 10 feet, costing no movement and provoking no opportunity attack from one creature the moving ally can see."
  },
  {
   "name": "The Vow Outlives the Body",
   "prereq": "Prerequisite: Orléans",
   "text": "When a sworn ally would fail a death saving throw, you may convert the failure into a success. This is a Miracle of Orléans: no critical, and it cannot do the impossible — it refuses death's approach, it does not reverse death itself."
  }
 ],
 "blackbeard": [
  {
   "name": "A Letter of Marque",
   "prereq": "Prerequisite: Fly the Colors",
   "text": "For 1 CE, you may inscribe one of your Rumors into a letter, carving, or posted notice instead of performing it. A creature that reads it and has not personally disproved the claim Believes as if it had witnessed Fly the Colors, under the same Exposure rules; the writing counts as your active performance of that Rumor."
  },
  {
   "name": "The Crew Tells It",
   "prereq": "Prerequisite: Tell It Again",
   "text": "You may spend 1 CE to grant one willing ally the words of a single Rumor for 1 hour. The ally may perform it with an action as if using Fly the Colors; Exposure tests are still made against your technique DC, and a witness who sees through the tale is immune to that Rumor from any teller for 24 hours."
  },
  {
   "name": "The Canonical Text",
   "prereq": "Prerequisite: A General History of the Pyrates",
   "text": "When you invoke A General History of the Pyrates, you may instead circulate a single unexposed Rumor as the canonical text. For the duration, that Rumor cannot be Exposed by public Tests — only its verbatim Exposure can break it — but no other Rumor circulates."
  },
  {
   "name": "The Legend Refuses Your Ending",
   "prereq": "Prerequisite: Three Laps Around the Ship",
   "text": "As a reaction for 4 CE when a willing ally within 120 feet drops to 0 HP while at least one of your Rumors is Believed by a witness, the ally drops to 1 HP instead and you immediately perform Fly the Colors as a free action. The telling outlives the man — sometimes, it outlives his crew."
  }
 ],
 "timur": [
  {
   "name": "The Capital Walks",
   "prereq": "Prerequisite: Set Samarkand",
   "text": "As an action for 2 CE, you may move Samarkand up to 30 feet to a 5-foot space you can see. Connected segments remain roads only where they stay contiguous with the Capital's new position; severed segments become ground again."
  },
  {
   "name": "The Junction Catches",
   "prereq": "Prerequisite: Junction Discipline",
   "text": "When a willing ally subjected to forced movement would pass through a Junction, it may use its reaction to pivot there, changing the direction of the remaining forced movement while keeping its distance. The crossroads is a weapon, even when you arrive at it unwillingly."
  },
  {
   "name": "The Road Throws You",
   "prereq": "Prerequisite: Burn the Road Behind",
   "text": "When you destroy a segment with Burn the Road Behind, one willing creature standing on that segment may use its reaction to ride the collapse, moving up to 20 feet along the segment's direction to the nearest unoccupied space without provoking opportunity attacks."
  },
  {
   "name": "The Empty Capital",
   "prereq": "Prerequisite: The Campaign Returns Home",
   "text": "When The Campaign Returns Home ends, you may collapse the entire remaining network at once instead of segment by segment. Every hostile standing on any collapsing segment makes your Burn the Road Behind save, and the destroyed segments form one contiguous stretch of difficult terrain."
  }
 ],
 "rasputin": [
  {
   "name": "Not Yet, For Them",
   "prereq": "Prerequisite: Postpone",
   "text": "As a reaction for 2 CE, when a hostile creature within 5 feet of you would take damage, you may defer up to 5 × your proficiency bonus of it as a Debt held by you, due at the end of your next turn. The Debt is unavoidable damage of the recorded type when it comes due, and it counts toward your limit of one damage Debt at a time — useful when the subject must survive the party's enthusiasm."
  },
  {
   "name": "Return to Sender",
   "prereq": "Prerequisite: Intercession",
   "text": "When you hold a Debt, you may use your reaction to transfer it onto the creature recorded as its source, if that creature is within 30 feet. It makes a Wisdom save against your technique DC; on a failure it holds the Debt, due at the end of its next turn. A Debt transfers once unless a feature says otherwise."
  },
  {
   "name": "The Affliction Passes Through",
   "prereq": "Prerequisite: Deferred Affliction",
   "text": "While you carry an Affliction Debt, you may use an action to touch a hostile creature and pass the affliction onward. It makes a Constitution save against your technique DC; on a failure it suffers the condition for the Debt's remaining duration, and your Affliction Debt ends."
  },
  {
   "name": "Unfinished Business",
   "prereq": "Prerequisite: Refusal to Die",
   "text": "When combat ends with Debts you personally hold still outstanding, they are not settled at once. Each persists until the end of your next short rest, then comes due as unavoidable damage of its recorded type as normal. The arithmetic runs on, even off the field."
  }
 ],
 "alexander": [
  {
   "name": "The Frontier Sails",
   "prereq": "Prerequisite: Name the Frontier / Make Passage",
   "text": "You may name a meaningful boundary on a moving vessel or structure — a ship's rail, a carriage door — as a Frontier. The resulting Passage travels with the vessel for its duration, and willing allies crossing it still gain +10 feet of movement and ignore nonmagical difficult terrain."
  },
  {
   "name": "Drag Them Over",
   "prereq": "Prerequisite: First Across",
   "text": "When you move a grappled creature across a Passage you created, it crosses with you with no additional check, and if the Passage pierces a barrier via No Barrier Is the World, the barrier does not stop the drag. Extraction is also a crossing."
  },
  {
   "name": "The Breach Holds the Door",
   "prereq": "Prerequisite: No Barrier Is the World",
   "text": "After you breach a barrier with No Barrier Is the World, you may spend 2 CE to hold the 5-foot Passage open for 1 minute. The barrier's creator must win a CE ability contest against you to seal it early."
  },
  {
   "name": "The Horizon Is Contagious",
   "prereq": "Prerequisite: The Road Wears the Man",
   "text": "While The Road Wears the Man is active, the horizon catches. Any willing ally who crosses one of your named Frontiers first converts the crossing into a Passage exactly as if you had crossed it - using your technique save DC and your Passage rules, and counting against the Passages you maintain. You need not be present at the crossing. The road wears anyone who walks it with him."
  }
 ],
 "taira-no-masakado": [
  {
   "name": "The Seat Surveys",
   "prereq": "Prerequisite: Raise a Rebel Seat",
   "text": "When you Raise a Rebel Seat, the Seat's first contest reveals the claim it contests: the GM tells you what hostile non-damage territorial rules currently affect its 10-foot radius. Plant the flag, read the ground."
  },
  {
   "name": "The Road Carries",
   "prereq": "Prerequisite: Eastern Road",
   "text": "A willing creature in one Seat may spend 10 feet of movement to teleport an object it is holding, or one unattended object within the Seat, to your other Seat within 60 feet. The road carries more than soldiers."
  },
  {
   "name": "The Capital Advances",
   "prereq": "Prerequisite: Three Seats of the East",
   "text": "When you relocate a Seat as a reaction via Three Seats of the East, it may carry one willing creature of your choice that is inside it, reappearing in the nearest unoccupied space at the destination. The capital moves; its people move with it."
  },
  {
   "name": "The Capital Exiles",
   "prereq": "Prerequisite: New Imperial Capital",
   "text": "While New Imperial Capital is active, once per round when a hostile technique fails its CE-ability contest against you, you may expel its source, pushing that creature 15 feet to the nearest unoccupied space outside the Capital. The capital does not merely refuse — it evicts."
  }
 ],
 "emperor-sutoku": [
  {
   "name": "The Crown Is Burdened",
   "prereq": "Prerequisite: Name Crown & Exile / Burden Upward",
   "text": "Once per round as a reaction, you may transpose one external non-damage penalty from the Crown to the Exile, instead of from the Exile to the Crown. The same machinery that lifts the low can drag the high down — the court remembers which way you turned it."
  },
  {
   "name": "The Emperor Mediates",
   "prereq": "Prerequisite: Sovereign Becomes Commoner",
   "text": "When you use Sovereign Becomes Commoner, you may substitute yourself for either the highest or the lowest creature on the chosen Axis. You exchange values with the other end directly, capped at your maxima as normal."
  },
  {
   "name": "The Census",
   "prereq": "Prerequisite: Court of the Demon Sovereign: The World Turned Upside Down",
   "text": "Each time the Domain ranks every creature publicly on the announced Axis, you learn each ranked creature's exact current value on that Axis. The sure-hit is the ranking; the census is free."
  },
  {
   "name": "The Court Holds Its Breath",
   "prereq": "Prerequisite: The Seating Chart, Rewritten",
   "text": "Your once-per-round swap under The Seating Chart, Rewritten may target initiative counts, exchanging when two creatures act. No creature gains or loses turns — the seating chart is rewritten, not the schedule."
  }
 ],
 "john-dee": [
  {
   "name": "The Skryer Shows",
   "prereq": "Prerequisite: Distant Conference",
   "text": "For 1 CE, for 1 minute your Skryer may hold their matched mirror so that you see what they see — sight only, no sound, and still no remote attacks. The Q&A channel was never the only thing a mirror could carry."
  },
  {
   "name": "The Castles Listen",
   "prereq": "Prerequisite: Four Castles",
   "text": "While Four Castles is active, when a hidden or invisible creature enters the ritual area, you may use your reaction and spend 1 CE to ask one yes/no question about the entrant. The witness law holds: the answer goes to your Skryer, never to you."
  },
  {
   "name": "The Grammar Argues",
   "prereq": "Prerequisite: Angelic Grammar",
   "text": "Each symbolic clue delivered by Angelic Grammar counts as one clear Query answer toward the four required by Monas Hieroglyphica, provided it concerns the same target. The angels' symbols are testimony too."
  },
  {
   "name": "Second Sitting",
   "prereq": "Prerequisite: Cross-Examination",
   "text": "Your Cross-Examination follow-up need not narrow the same subject; it may open a new line of inquiry instead. If both answers are clear and are genuinely used together, the Correspondence roll still ignores one source of disadvantage."
  }
 ],
 "vlad-iii": [
  {
   "name": "The Dread Worn Lightly",
   "prereq": "Prerequisite: Cast Off Dread",
   "text": "When you Cast Off Dread, you may center the Shadow on yourself instead of placing it within 30 feet. It moves with you for the duration, and hostiles starting their turns within 10 feet of you make the Dreaded save as normal."
  },
  {
   "name": "The Lesson Teaches",
   "prereq": "Prerequisite: Impaler's Lesson",
   "text": "Once per turn, when you pin a creature with Impaler's Lesson, each hostile within 30 feet that can see the pinning makes the Cast Off Dread Wisdom save. Restraint, demonstrated, is also instruction."
  },
  {
   "name": "The Name Shelters Another",
   "prereq": "Prerequisite: Separate the Name",
   "text": "When a willing ally within 30 feet is targeted by a non-Domain mark, curse, scrying, tracking, or identity-dependent technique, you may use your reaction and spend 2 CE to redirect it to your Dread Shadow, under the same legality rule — if the effect cannot target the Shadow, the CE is not spent."
  },
  {
   "name": "The Impaler's Due",
   "prereq": "Prerequisite: Dracula Unbound",
   "text": "While Dracula Unbound is active, once per turn after Dracula's necrotic damage strikes a Dreaded creature, you may force that creature to make the Impaler's Lesson Strength save, pinned on a failure as if against a solid surface. The dread itself is surface enough."
  }
 ],
 "hannibal-barca": [
  {
   "name": "Draw It in Retreat",
   "prereq": "",
   "text": "Your Center Line can be drawn in retreat: you may establish the line along your own movement path as you move (up to your speed) instead of placing it statically — the ground is priced where you ran."
  },
  {
   "name": "Trade Places",
   "prereq": "Prerequisite: Cavalry Reserve",
   "text": "Your reserve ally can trade hunter for hunted: when they repair a breached geometry, they may swap positions with one Enveloped creature (WIS save negates) — the hunter and hunted trade places."
  },
  {
   "name": "The Pocket Turned Out",
   "prereq": "Prerequisite: Close the Pocket",
   "text": "Close the Pocket can be turned inside out: instead of trapping enemies in, declare the pocket a sanctuary — allies inside the Center Line gain half cover and cannot be targeted by opportunity attacks for 1 minute."
  },
  {
   "name": "Seed It Elsewhere",
   "prereq": "Prerequisite: Every Field Is Cannae",
   "text": "When your Center Line becomes self-commanding, you can seed it elsewhere: choose a second location within 120 ft you can see — the formation's geometry is mirrored there for 1 minute (no second Center ally required, but it cannot repair breaches)."
  }
 ],
 "jack-the-ripper": [
  {
   "name": "A Gift, Blessed",
   "prereq": "",
   "text": "Malicious Blessing can be laid as a gift: bless an object and give it to a willing creature — the first time they draw it in combat, the Blessing activates (choosing its Murder Property then) without you present."
  },
  {
   "name": "The Room Fires in Sequence",
   "prereq": "Prerequisite: Prepared Murder",
   "text": "Your prepared traps can be chained: when one prepared trap triggers, you may use your reaction to trigger a second prepared trap within 120 ft whose conditions are also met — the room fires in sequence."
  },
  {
   "name": "The Verses Change Singers",
   "prereq": "Prerequisite: London Bridge Is Falling Down",
   "text": "Inside your Domain, at initiative 20, instead of assigning a new temporary Murder Property you may have two enemies swap their current temporary properties — the verses change singers."
  },
  {
   "name": "Unname the Evidence",
   "prereq": "Prerequisite: The World Will Not Name Him",
   "text": "The World Will Not Name Him can take something with it: when you teleport, you may leave behind one object you carry — it becomes unnamed too (undetectable by divination, unrememberable) for 24 hours."
  }
 ],
 "khutulun": [
  {
   "name": "The Bookmaker",
   "prereq": "",
   "text": "You can wager on others: when two other creatures contest each other within 60 ft, you may name a Stake and back one side — if your backed side wins, you gain the Stake from the loser (they must agree to the wager)."
  },
  {
   "name": "Display the Purse",
   "prereq": "Prerequisite: Champion's Purse",
   "text": "Your Purse can be displayed: as an action, exhibit your Stakes — hostile creatures that can see them must succeed on a WIS save or have disadvantage on attacks against you for 1 minute (awe), but exhibited Stakes cannot be wagered while displayed."
  },
  {
   "name": "Back Their Double",
   "prereq": "Prerequisite: Undefeated Until Proven Otherwise",
   "text": "You can double someone else's wager: when an ally loses a contest within 60 ft, you may spend your reaction to double their wager from your own Purse — if they win the double they take the pot; if they lose, you pay."
  },
  {
   "name": "The Thrown Gauntlet",
   "prereq": "Prerequisite: The Ten-Thousand-Horse Wager",
   "text": "The Grand Challenge can be thrown down as a gauntlet: issue it by leaving a marked token — the first hostile creature to touch the token within 24 hours is challenged as if you issued it face-to-face."
  }
 ],
 "nikola-tesla": [
  {
   "name": "Solve It for Them",
   "prereq": "Prerequisite: Vector-Locked Armor",
   "text": "Your Broken Equation can be solved by another: when an ally within 30 ft would be knocked prone or pushed, you may use your reaction to transfer your Vector to them — they stay standing, and you take the displacement instead."
  },
  {
   "name": "Laid as a Wire",
   "prereq": "Prerequisite: Ground Fault",
   "text": "Ground Fault can be laid as a wire: instead of a burst, run the fault along the ground in a 5-ft-wide, 60-ft line — creatures crossing the line take the burst damage (DEX save for half), and the line persists for 1 minute."
  },
  {
   "name": "Double or Nothing",
   "prereq": "Prerequisite: Gematria Zone — Prison of the Gods",
   "text": "Your Experiments can be wagered: before rolling the d6, declare 'double or nothing' — roll twice and apply both results, but the Domain's duration is halved."
  },
  {
   "name": "Ground Through Yourself",
   "prereq": "Prerequisite: The Current Decides",
   "text": "The Current Decides can ground through you: when you place the Ground Fault burst, you may center it on yourself — you are unaffected, and it becomes a 15-ft-radius ring around you that moves with you for 1 minute."
  }
 ],
 "qin-shi-huang": [
  {
   "name": "The Phoenix Lends Its Wing",
   "prereq": "Prerequisite: Heavenly Phoenix",
   "text": "Heavenly Phoenix can be nested in another: when an ally within 30 ft is attacked, you may lend them your Heavenly Phoenix — roll its Imperial Dice against the attack as if you were hit; Tribute gained this way is yours."
  },
  {
   "name": "Tribute as Currency",
   "prereq": "Prerequisite: Tribute",
   "text": "Your Tribute can be spent as currency: offer Tribute to a hostile creature as a free action — if they accept (their choice), they are charmed by you for 1 minute (WIS save negates); the Tribute is consumed regardless."
  },
  {
   "name": "The Court Exhales",
   "prereq": "Prerequisite: Goujian",
   "text": "Imperial Power Embrace can be reversed: instead of storing reduced force in Goujian, release all stored dice at once as a 15-ft cone of force (DEX save for half) — the court exhales."
  },
  {
   "name": "Edicts, Not Blows",
   "prereq": "Prerequisite: King of All Beginnings",
   "text": "During your Maximum, your Flow Breaks become edicts: when you consume a Flow Break, you may issue an edict instead of gaining its normal benefit — name one action (Attack, Dash, or Hide); the bearer cannot take that action until the end of their next turn (WIS save negates)."
  }
 ],
 "shaka-zulu": [
  {
   "name": "The Hunt-Call",
   "prereq": "",
   "text": "Assign the Bull can be sounded as a hunt-call: instead of assigning roles for battle, assign them for a pursuit — role-holders gain advantage on Survival checks to track the quarry for 1 hour, and the Chest always senses the quarry's direction within a mile."
  },
  {
   "name": "Head and Horns Exchange",
   "prereq": "Prerequisite: Chest Holds",
   "text": "The Chest can trade with the Horns: when the Chest misses the Quarry, it may swap positions with a willing Horns role-holder within 60 ft — the bull's head and horns exchange."
  },
  {
   "name": "The Order Is Set",
   "prereq": "Prerequisite: Loins Commit",
   "text": "Loins Commit can be made before the break: pre-assign the Loins' inheritance order — when a role breaks, the next in line inherits instantly with no action, but the order cannot be changed mid-formation."
  },
  {
   "name": "The Ring, Not the Close",
   "prereq": "Prerequisite: The Bull Closes",
   "text": "While the Maximum runs, the bull can encircle rather than close: open the formation into a ring — hostile creatures inside cannot leave without provoking opportunity attacks from every role-holder, but role-holders cannot enter the ring either."
  }
 ],
 "the-count-of-saint-germain": [
  {
   "name": "The Abandoned Face",
   "prereq": "",
   "text": "When you switch Personae, you can leave a mark behind: one tracking, scrying, or bounty effect attached to your old face stays on it as a decoy — divination targets the abandoned Persona's last location for 24 hours."
  },
  {
   "name": "The Face Vouches",
   "prereq": "Prerequisite: Prepared Life",
   "text": "Each Persona can lend its Assets: a willing ally can draw on one of your inactive Persona's downtime-built Assets as if it were their own for 24 hours."
  },
  {
   "name": "A Staged Death",
   "prereq": "Prerequisite: Death of an Alias",
   "text": "Death of an Alias can be staged: you may trigger it voluntarily when you take any damage — you collapse as if slain (contested Deception vs passive Insight), assume the new Persona, and the attacker believes you dead until given reason otherwise."
  },
  {
   "name": "The Token Wears a Face",
   "prereq": "Prerequisite: I Was Never Here",
   "text": "Your prepared token can be given away: attune it to a willing creature instead of a location — triggering I Was Never Here teleports you to their side (within 5 ft), wherever they are on the same plane."
  }
 ],
 "yi-sun-sin": [
  {
   "name": "Set in Memory",
   "prereq": "",
   "text": "Your anchors can be set in memory: you can Draw the Strait along a strait you have previously drawn — the anchors manifest at the remembered points without you traveling there (within 1 mile)."
  },
  {
   "name": "Ride the Reversal",
   "prereq": "Prerequisite: Reversing Tide",
   "text": "Reversing Tide can be ridden: when the line reverses, you and anchored allies may each move up to 30 ft along the new current direction without spending movement."
  },
  {
   "name": "Close Like a Shell",
   "prereq": "Prerequisite: Crane Wing",
   "text": "Crane Wing can close like a shell: instead of carrying allies across, curl the wing around them — allies within the wing gain total cover until the start of your next turn, but the wing cannot move while shelled."
  },
  {
   "name": "Orders on the Roar",
   "prereq": "Prerequisite: Myeongnyang: The Roaring Strait",
   "text": "While the Maximum's current zone runs, you can speak through the roar: your voice emanates from any point in the current, and orders given through it let anchored allies use their reaction to move 10 ft along the current."
  }
 ],
 "zheng-yi-sao": [
  {
   "name": "Paid in Intelligence",
   "prereq": "",
   "text": "The General Fund can pay in information: a Crew member can draw intelligence instead of CE — learn the location and numbers of the nearest hostile force within a mile (the Articles' informants report)."
  },
  {
   "name": "The Article Sails",
   "prereq": "Prerequisite: Article of Mutual Defense",
   "text": "The Article can be extended to a ship: while the Crew is aboard a vessel, Article of Mutual Defense protects the vessel itself — attacks against the ship trigger the Article as if the ship were a Crew member."
  },
  {
   "name": "Sung as a Shanty",
   "prereq": "Prerequisite: Articles May Be Amended",
   "text": "An amended Article can be written as a shanty: any creature that hears the full song (1 minute) counts as briefed, and the Article applies to them as honorary Crew for 24 hours."
  },
  {
   "name": "Press-Gang",
   "prereq": "Prerequisite: Red Flag Confederation",
   "text": "While Red Flag Confederation runs, the Crew can press-gang: hostile creatures reduced to 0 HP by Crew members may be offered the Articles instead of death (their choice) — acceptors become Crew (charmed, 24 hours) and their CE joins the Fund."
  }
 ],
 "simo-h-yh": [
  {
   "name": "Snow Teaches",
   "prereq": "",
   "text": "When you miss with a rifle attack against a tracked enemy while stationary, the target still advances one Tally stage from Isänmaalle Flesh Round — the miss still teaches you their shape. This cannot advance a target past Located."
  },
  {
   "name": "The Nest Spots for Others",
   "prereq": "Prerequisite: Sniper's Nest",
   "text": "While you remain within 5 feet of your Sniper's Nest, you may spend your action to spot for an ally: choose one tracked enemy you can see and one ally who can see it. Until the start of your next turn, that ally's attacks against the target ignore cover as if they held your current Tally stage against it (Bearing: half cover; Located: three-quarters cover). Your own shots from the Nest still never auto-advance a target from Bearing to Located."
  },
  {
   "name": "Hail Writes the Map",
   "prereq": "Prerequisite: Kidney — Ilmatar's Piercing Hail",
   "text": "When you fire Kidney — Ilmatar's Piercing Hail, you may forgo the hail burst's damage: instead the hail ices the 20-ft burst — the area becomes difficult terrain for 1 minute, and each tracked enemy caught in the burst advances one Tally stage as rime outlines them (this cannot advance a target past Located). The −10% max HP cost is unchanged."
  },
  {
   "name": "Salvation, Held in Reserve",
   "prereq": "Prerequisite: The 543rd Bullet / Salvation",
   "text": "After paying the heart sacrifice for The 543rd Bullet / Salvation (your max HP becomes 1 and you cannot move voluntarily), you may hold the shot instead of firing it: until the start of your next turn, if a creature you can see begins an action, you may loose the 543rd Bullet against it as a reaction, resolving all of the Maximum's effects. If the shot is not fired by the start of your next turn, the sacrifice is lost — you fall unconscious and begin death saving throws as normal."
  }
 ],
 "raiden-tameemon": [
  {
   "name": "The Dohyō Lifts",
   "prereq": "",
   "text": "When your Legs hold 4 or more Bands, you may carry or drag one willing creature of your size or smaller without the usual speed penalty, and your jumps carry them with you (they land beside you). The ring carries its own."
  },
  {
   "name": "The Throw, Not the Hold",
   "prereq": "Prerequisite: The Forbidden Four",
   "text": "When you initiate Sabaori, you may forgo maintaining the grapple to hurl the target instead: it lands prone in an unoccupied space up to 10 ft away of your choice, and if it strikes a solid surface or another creature, that creature takes your unarmed strike damage (Dexterity save against your technique DC negates this collateral damage). Sabaori's initial damage and Strength save apply as normal."
  },
  {
   "name": "Miyama, Widened",
   "prereq": "Prerequisite: Full Muscle Control",
   "text": "When an ally within 5 ft of you is hit by a melee attack, you may use your reaction and spend 2 CE to interpose with Miyama: migrate 1 Band into each Arm from legal regions and reduce the damage they take by the total Bands in both Arms + your PB (typed as damage reduction, as with Miyama). This migration causes no Overpressure."
  },
  {
   "name": "The Mountain Answers",
   "prereq": "Prerequisite: Hundred Seals Release",
   "text": "While Hundred Seals Release is active, when a hostile effect fails to move you or knock you prone because of your 6-Band Frame (including a contest you win against your technique DC), you may use your reaction to attempt to grapple the source creature, provided it is within your reach. Use your normal grapple rules."
  }
 ],
 "okita-s-ji": [
  {
   "name": "Nukitsuke",
   "prereq": "",
   "text": "Once per encounter when you roll initiative, you may immediately perform one named sword technique you know as a free action, paying its normal CE cost and ignoring its Entry requirement; its printed Exit still applies and it may begin a combination."
  },
  {
   "name": "The Demon Sidesteps",
   "prereq": "Prerequisite: Demon Child",
   "text": "When you use Recenter while Demon Child is active, the demon's speed lends itself to the footwork: you may move up to 10 ft as part of the same bonus action without provoking opportunity attacks."
  },
  {
   "name": "Sharyuu, the Screen",
   "prereq": "Prerequisite: Sword Time",
   "text": "When you invoke Sharyuu, you may trade places with one willing creature within 5 ft of you as part of the rotation instead of moving alone; neither of you provokes opportunity attacks from the target of your attack. The attack, the secondary slashing damage to another hostile creature within your reach, and the form becoming SPENT resolve as normal."
  },
  {
   "name": "The Black Kite Performs",
   "prereq": "Prerequisite: Enpi Reiten (Black Kite's Heavenly Return)",
   "text": "While Demon Child Release is active, you may perform Enpi Reiten as a 1-minute kata with no targets and no hostile intent: pay 4 CE instead of 10, take no hit point cost, and Release does not end — but Technique Burnout applies afterward as normal, and this counts as your Maximum for the encounter. Each creature of your choice that observes the full kata must succeed on a Wisdom save against your technique DC or regard you with awe for 1 hour (it will not willingly take hostile action against you unless you attack it first; this is not charm)."
  }
 ],
 "imhotep": [
  {
   "name": "The Spanning Course",
   "prereq": "",
   "text": "When you raise wall sections with Foundation, you may lay a section horizontally as a bridge or ramp spanning a gap of up to 10 ft; it bears weight as stone and counts against your raised sections as normal. The architect's walls may lie down as well as stand."
  },
  {
   "name": "The Architect Adds a Law",
   "prereq": "Prerequisite: The First Court",
   "text": "You learn a fourth Law of the Court: Law of Witness. While it is declared, the court's stone records all speech within it. As an action while touching any section of the court, you may replay up to 1 minute of recorded speech (audible to creatures within 10 ft of you). The recording fades when the court falls. Declare it like any other Law."
  },
  {
   "name": "Heaven Reports the Debt",
   "prereq": "Prerequisite: The Architect's Vow",
   "text": "When a creature violates one of your inscribed Laws, you learn its exact location for 1 minute as Heaven reports the debt. This does not reveal creatures you could not otherwise perceive beyond their position."
  },
  {
   "name": "The Necropolis Listens",
   "prereq": "Prerequisite: \"SAQQARA, THE FIRST STONE\"",
   "text": "While your Domain stands, the necropolis is one foundation, and stone carries what stone is given. As a bonus action, you may press your palm to any section of your raised structures inside the Domain and listen through them for 1 minute: you see and hear from the section\'s position as though you stood there, though your body remains where it is. You may shift your listening to another section as a bonus action. The architect need not walk his own courts to know them."
  }
 ],
 "gilgamesh": [
  {
   "name": "Cast the First Spear",
   "prereq": "",
   "text": "As an attack, you may hurl a conjured prototype (range 20/60 ft), resolving it as a ranged weapon attack with the prototype's normal bonuses (+PB radiant damage, seniority, radiant damage ignoring resistance). It vanishes after the strike whether it hits or misses — it has left your hand."
  },
  {
   "name": "The King Lends His Third",
   "prereq": "Prerequisite: Two-Thirds",
   "text": "As a bonus action (2 CE), you may lend your divinity: one ally within 30 ft gains your Divine Majority until the start of your next turn — once per turn, when they take damage, reduce it by your PB + your CHA modifier. You cannot use Divine Majority yourself while it is lent."
  },
  {
   "name": "The King Arms His Court",
   "prereq": "Prerequisite: The First King",
   "text": "As a bonus action, you may place a conjured prototype in the hand of a willing ally within 5 ft (paying Prototype's Edge's 1 CE as normal): the king permits the loan, so it does not vanish. For 1 minute the ally may attack with it, using its mundane weapon damage plus your +PB radiant damage (radiant, ignores resistance); seniority does not extend to the ally's clashes. The prototype returns to nothing if the ally falls unconscious or the minute ends."
  },
  {
   "name": "The Gates Are Shut",
   "prereq": "Prerequisite: \"URUK, THE FIRST CITY\"",
   "text": "As an action while your Domain stands, you may seal Uruk's gates until the start of your next turn: no creature inside the Domain can leave its radius by any means short of teleportation — the city admits no deserters. You may seal the gates up to PB times per Domain."
  }
 ],
 "cyrus-the-great": [
  {
   "name": "The Cylinder Answers",
   "prereq": "",
   "text": "When you or an ally within your edict radius takes damage, you may use your reaction to speak one minor edict with Proclaim, paying its normal 2 CE cost. The willing valve of presence applies as normal."
  },
  {
   "name": "The Law Travels by Relay",
   "prereq": "Prerequisite: The Cylinder's Echo",
   "text": "When a willing ally reads aloud one of your recorded edict tokens, the edict is re-established centered on the reader (using your technique save DC and the edict's remaining duration) instead of at the token's location — and the reader may record it anew as part of the same action, minting a fresh token. The law travels by relay; each copy is valid only for the edict's remaining duration."
  },
  {
   "name": "The Satraps Report",
   "prereq": "Prerequisite: Satrap's Administration",
   "text": "While at least one satrapy holds, your administration counts heads: you always know the exact number of creatures within your edict radius, and at the start of each of your turns you learn which creatures violated one of your edicts since your last turn. The empire's paperwork is immaculate."
  },
  {
   "name": "The King Pardons",
   "prereq": "Prerequisite: \"BABYLON OPENED\"",
   "text": "As a bonus action while your Domain stands, you may pardon one marked (Defy) creature you can see: it becomes Submitted instead — bound, unable to attack you or your allies while within the Domain, gaining resistance to all damage. A creature pardoned once cannot be pardoned again. Heaven honors the pardon; Heaven remembers the first defiance."
  }
 ],
 "amanirenas": [
  {
   "name": "The Spoils Fight for Others",
   "prereq": "",
   "text": "As a bonus action, you may place your Trophies in willing hands: distribute any number of your Trophies among willing allies within 30 ft (one per ally). While an ally holds your Trophy, their melee weapon attacks deal additional force damage equal to the number of your Trophies they hold (maximum +3). A Trophy returns to you if its holder falls unconscious or the encounter ends. She fights with what she has taken — so may they."
  },
  {
   "name": "The Crown, Lent",
   "prereq": "Prerequisite: Wear the Taken",
   "text": "As a bonus action while you wear a Trophy's aspect, you may lend it to a willing ally within 30 ft until the effect ends: they gain the aspect's benefit and you lose it. You may reclaim it as a bonus action. The queen does not imitate the defeated — but she may delegate the honor."
  },
  {
   "name": "The Threshold, Set Down",
   "prereq": "Prerequisite: The Threshold",
   "text": "When you create your Threshold, you may anchor it to a point within 30 ft instead of centering it on yourself: it remains there for the duration rather than moving with you. Allies inside the anchored Threshold gain your immovability and your advantage against being frightened or charmed; enemies inside have disadvantage on attack rolls against you only while you also stand inside it. The bronze head may be set down as well as carried."
  },
  {
   "name": "The Inventory, Distributed",
   "prereq": "Prerequisite: The Head Under the Throne",
   "text": "When you use The Head Under the Throne, you may divide your expended Trophies among up to PB melee weapon attacks made as part of the same action, each against a creature within your reach: each attack deals an additional 2d10 force damage per Trophy assigned to it, or half that bonus damage on a miss (rounded down). All Trophies are expended as normal, and the Maximum still requires at least 3 Trophies."
  }
 ],
 "el-dorado": [
  {
   "name": "The Dust Finds Them",
   "prereq": "",
   "text": "As a bonus action (1 CE), you may fling gold dust over a 10-ft cube within 30 ft instead of at a creature: until the start of your next turn, invisible creatures and objects inside are coated and visible — invisibility confers no benefit on attacks against or by them — though they are not Gilded. Gold finds what hides."
  },
  {
   "name": "The Market Exchanges",
   "prereq": "Prerequisite: The Raft",
   "text": "When you teleport with The Raft to a willing Gilded creature you can see, you may trade places with it instead of appearing adjacent: it arrives in the space you left. Unwilling creatures are unaffected — you appear adjacent as normal."
  },
  {
   "name": "The Standing Bid",
   "prereq": "Prerequisite: The Highest Bidder",
   "text": "When a creature reaches Gild Stage III, you may implant a standing one-word command with a simple trigger (e.g., 'when the alarm sounds, halt') instead of issuing it immediately: the first time the trigger occurs within 1 minute, the command issues itself (no action required) — the creature obeys, or refuses and takes the 4d10 psychic damage as normal. One standing bid per creature at a time."
  },
  {
   "name": "The Lake Assays All",
   "prereq": "Prerequisite: Guatavita: The Raft at the Center",
   "text": "While your Domain stands, the moment a creature becomes Gilded by its sure-hit, you immediately learn its surface wants as with Appraisal — no action required. Inside Guatavita, the market prices everyone on arrival."
  }
 ],
 "m-ui": [
  {
   "name": "Catch More Than Fish",
   "prereq": "",
   "text": "Your hook's snag may catch objects as well as creatures: when you hit with Manaiakalani, you may forgo the pull to snag one object the target holds — it makes a Strength save against your technique DC; on a failure the object is yanked up to 10 ft toward you, into your free hand if it arrives within reach, otherwise landing at your feet."
  },
  {
   "name": "The Net Widens",
   "prereq": "Prerequisite: The Snare Remembers",
   "text": "When you yank a set hook to teleport, you may bring one willing creature within 5 ft of you along to the hook's location. You still need line of effect to the hook."
  },
  {
   "name": "Ride the Words In",
   "prereq": "Prerequisite: Catch the Words",
   "text": "When you use Catch the Words, you may pull yourself up to 15 ft toward the caster instead of pulling the caster toward you — the words tow you in. You must end in an unoccupied space, and this movement does not provoke opportunity attacks from the caster. The disadvantage or advantage against the utterance applies as normal."
  },
  {
   "name": "All Hands on the Line",
   "prereq": "Prerequisite: Te Ika-a-Māui: The Fish of Māui",
   "text": "When your Domain's sure-hit resolves at initiative 20, you may also pull each willing ally inside up to 15 ft in any direction — no save, and they may decline. The sure-hit's pull still lands on hostiles (or they anchor, as normal); anchoring remains hostile-only. Inside the Fish, the crew hauls together."
  }
 ],
 "egil-skallagrimsson": [
  {
   "name": "The Correction Is Carved",
   "prereq": "Prerequisite: Skald's Measure",
   "text": "When a creature within 30 ft of you speaks a falsehood about the terms of one of your Carved oaths — a lie your Skald's Measure detects — you may use your reaction and spend 2 CE to carve the correction in the air before the words settle. The creature must succeed on a Charisma saving throw against your technique DC or be unable to speak of that oath except truthfully for 1 minute. The correction remains Carved and readable as per Carve the Oath, and counts against the oaths you maintain."
  },
  {
   "name": "The Door-Keeper's Verse",
   "prereq": "Prerequisite: Head-Ransom Verse",
   "text": "After composing a Head-Ransom Verse, you may spend 1 minute carving it into a doorway, threshold, gate, or vessel's gangway. The carving lasts 24 hours (permanent on stone or steel) and counts against the carvings you maintain; you may keep only one such ward at a time. The first hostile creature that comes within 10 ft of the carved boundary must succeed on a Wisdom saving throw against your technique DC or have disadvantage on attack rolls against any creature beyond the boundary for 1 minute. It may end the effect early by paying the verse its due — taking 3d8 psychic damage as a free action. Once triggered, the carving fades."
  },
  {
   "name": "Nithing, Carried",
   "prereq": "Prerequisite: Nithing Pole",
   "text": "In a 10-minute ritual costing 1 CE, you may carve a nithing-mark — naming a true crime and its doer — onto a staff, weapon, or pole you carry. While you carry the marked item on the same plane as the named, the named dreams of the mark: it has disadvantage on saving throws against your Curse-Runes, and it knows it is named. A false crime: the mark does not take. As an action, you may plant the marked item in the ground, raising a true nithing pole there (AC 12, 30 HP) and ending the carried mark. You may carry only one nithing-mark at a time."
  },
  {
   "name": "The Runes Leave the Field",
   "prereq": "Prerequisite: The Field of Runes",
   "text": "When your Domain, The Field of Runes, ends, you may choose one oath Carved within it and transcribe it onto a surface within 30 ft of you. It becomes a carving under Carve the Oath — lasting 24 hours, permanent on stone or steel — and counts against the oaths you maintain. The field is the draft; the world keeps the copy."
  }
 ],
 "milarepa": [
  {
   "name": "The Question Asked Kindly",
   "prereq": "",
   "text": "Your Song of the Question may target a willing creature within 60 ft, at its normal action and CE cost. The creature chooses one beneficial magical effect on itself, which ends with no saving throw — a question asked of a friend is answered, not resisted. (Useful against cursed blessings, and boons that have become burdens.)"
  },
  {
   "name": "Name Your Price",
   "prereq": "Prerequisite: Nothing to Trade",
   "text": "As an action, you may invite a creature within 60 ft of you to state its offer plainly — any benefit with a price, magical or social. The invitation compels nothing; the creature may stay silent. If it states the offer, you learn its exact terms, price, and conditions, and Nothing to Trade then proceeds as normal: you may accept or refuse, and a refusal deals 2d10 psychic damage to the offerer as Heaven notes the attempted purchase."
  },
  {
   "name": "The Tower Waits",
   "prereq": "Prerequisite: The Tower Falls",
   "text": "When you use The Tower Falls, you may spend its action and 3 CE to inscribe an invisible sigil on a point you can see within 90 ft instead of striking at once. The sigil lasts 8 hours. The next time a creature within 30 ft of the sigil would gain temporary HP, the tower falls: every creature with temporary HP in a 30-ft radius sphere centered on the sigil must make the Constitution saving throw as normal — losing all temporary HP and taking psychic damage equal to half the amount lost on a failure. This consumes one use of The Tower Falls."
  },
  {
   "name": "The Cave Keeps Counsel",
   "prereq": "Prerequisite: The Cave Seals",
   "text": "While your Cave Seals stands, its interior keeps counsel as well as silence: divination magic cannot perceive inside the sealed sphere, and no effect can compel a creature inside to repeat what was spoken there — zone of truth and similar effects fail within the seal. The cave keeps what it keeps, including words."
  }
 ],
 "gesar-of-ling": [
  {
   "name": "The Epic Counts Every Fall",
   "prereq": "",
   "text": "Your Deed Numbered no longer requires your blow: when a Named creature is reduced to 0 hit points by anyone — ally, hazard, or its own folly — the bard counts it. You gain temporary HP equal to your STR modifier + PB, and willing creatures within 30 ft of you gain +1 to saving throws until the start of your next turn, as normal."
  },
  {
   "name": "The Straw Man Remains",
   "prereq": "Prerequisite: The Straw King",
   "text": "When The Straw King turns a hit into a miss, you may leave a straw effigy of yourself standing in your space and move up to half your speed without provoking opportunity attacks as part of the same reaction. The effigy (AC 10, 1 HP) stands until the start of your next turn: the next attack that would hit you before then strikes the effigy instead."
  },
  {
   "name": "The Host Speaks the Name",
   "prereq": "Prerequisite: The Thirty Ride",
   "text": "When you use The Naming, you may have one of your spectral warriors deliver it: the warrior moves up to its speed toward a creature within 60 ft of you and speaks the demon-name aloud. The creature becomes Named as if you had spoken it before witnesses — the host are witnesses. (Requires The Thirty Ride to be active.)"
  },
  {
   "name": "The Bound Interposes",
   "prereq": "Prerequisite: Maximum: Lutzen Falls Again",
   "text": "When you unleash Maximum: Lutzen Falls Again, you may cross the distance to a willing creature within 60 ft instead of an enemy — landing in an unoccupied space adjacent to them, forgoing the Maximum's attack. Until the start of your next turn, the first attack that would hit that creature hits you instead, with no new attack roll. The epic has endings where the king arrives in time."
  }
 ],
 "k-inich-janaab-pakal": [
  {
   "name": "The Dead Give Directions",
   "prereq": "",
   "text": "As an action costing 1 CE, you may ask one Witness within 60 ft of you to point to the creature that dealt the killing blow. If the killer is on the same plane, you learn the direction — but not the distance — of its present location. The dead are the most reliable witnesses; they have nothing left to lose, and they remember the hand."
  },
  {
   "name": "The Count Is Read Where the Dead Stand",
   "prereq": "Prerequisite: The Weight of the Count",
   "text": "When you use The Weight of the Count, you may read the count from any Witness you maintain within 120 ft instead of from yourself: the effect originates from the Witness's space, affecting hostile creatures within 60 ft of it, using your normal DC. The cost is made legible where the dead stand."
  },
  {
   "name": "The Speaking Road Stays Open",
   "prereq": "Prerequisite: The Witnesses Speak",
   "text": "While The Witnesses Speak holds its minute of fear, the speaking road stays open: any creature reduced to 0 hit points within 60 ft of you rises as a Witness immediately, even if The Road Beneath is not active — up to your maximum number of Witnesses; if a new Witness would exceed it, the oldest ends. The slain, all at once, keep saying what was done."
  },
  {
   "name": "The Road Keeps Its Confessors",
   "prereq": "Prerequisite: The Inscription Beneath: Xibalba Road",
   "text": "A creature that confesses truthfully inside your Domain is marked by the road: for the next 24 hours, while on the same plane as you, you always know the direction — but not the distance — of its location. The road remembers who spoke true upon it. (Heaven accepts the confession. The road keeps the confessor.)"
  }
 ],
 "la-malinche": [
  {
   "name": "The Tongue, Lent",
   "prereq": "",
   "text": "As an action, you may touch a willing creature and lend it your tongue for 1 hour: it speaks and understands all languages as you do. (The 30-ft mutual understanding among those near you still requires your presence — the bridge, not the tongue, is what you are.) You may lend your tongue to only one creature at a time; lending it again ends the earlier gift."
  },
  {
   "name": "Terms, Stated Against",
   "prereq": "Prerequisite: Terms, Stated",
   "text": "As an action, choose a hostile creature within 60 ft that labors under a magically binding agreement — a geas, a planar binding, a charm with commands. You state its terms aloud: all creatures within 60 ft learn the binding's exact terms, and the bound creature has advantage on its next saving throw to resist the binding's commands. No one she stands against is bound by words left unexamined."
  },
  {
   "name": "The Question Under Heaven",
   "prereq": "Prerequisite: Maximum: The First Word and the Last",
   "text": "While your Maximum endures, no creature within 120 ft of you can speak falsely about a vow, bargain, or binding — and you may put that truth to work. As an action, pose one question about a vow, bargain, or binding to a creature within 120 ft: it must answer truthfully unless it succeeds on a Charisma saving throw against your technique DC. It may choose silence — the Maximum forbids falsehood, not quiet — but what it says of bargains will be true."
  },
  {
   "name": "The Parley Continues",
   "prereq": "Prerequisite: Where Every Word Is Weighed",
   "text": "The parley chamber outlasts its walls. When your Domain ends, choose one creature that was inside it: for the next hour, as an action, you may name that creature and hold it to the Domain's rule for one minute — it cannot speak falsely to you about a vow, bargain, or binding unless it succeeds on a Charisma saving throw against your technique DC. Silence remains allowed; the text cannot render the quiet. (Usable once per creature per Domain.)"
  }
 ],
 "ajuricaba": [
  {
   "name": "The Chief Knows His People",
   "prereq": "",
   "text": "The Confederation is a wound he carries — he feels its depth. You always know the current hit points of willing Confederation members within 60 ft of you. (A chief knows his people the way a river knows its banks.)"
  },
  {
   "name": "The River Returns Him",
   "prereq": "Prerequisite: The Line Remembers",
   "text": "When The Line Remembers restores hit points to you at the start of your turn, the river returns more than health: you may move up to 10 ft without provoking opportunity attacks as the current shifts you. The river has carried worse, and it carries him."
  },
  {
   "name": "The Chains Catch",
   "prereq": "Prerequisite: Chain-Breaker",
   "text": "Your chains can hold as well as lash. When a willing creature within 30 ft of you falls, you may use your reaction and spend 2 CE to catch them: spectral chains lash out and lower them safely to the nearest surface within 30 ft below, and they take no falling damage. The chains hold."
  },
  {
   "name": "The Wall Leaves a Shadow",
   "prereq": "Prerequisite: Confederation Wall",
   "text": "When your Confederation Wall ends — its minute run out, or dismissed early as an action — the river keeps the shape of it: a 10-ft long, 10-ft high spectral wall section rises at a point within 60 ft of you, granting total cover. It has AC 15 and 20 HP, and lasts 1 minute. Even the shadow of the wall stands."
  }
 ],
 "cobra-norato": [
  {
   "name": "The Water Remembers Crossings",
   "prereq": "",
   "text": "As an action, you may touch a body of water and read its crossings: you learn the number and size of creatures that entered or left the water within the last 24 hours, and the direction each went. (Rivers, specifically — the sky is not his country, but the water keeps excellent records.)"
  },
  {
   "name": "The Drowned Bear Them",
   "prereq": "Prerequisite: The Drowned Rise",
   "text": "When you use The Drowned Rise, you may have the shades forgo their attacks. Instead, each shade may carry one creature of your choice that is in the water up to 15 ft through the water: willing creatures are borne willingly; a hostile creature must succeed on a Strength saving throw against your technique DC or be dragged. The congregation answers — sometimes with hands, sometimes with arms."
  },
  {
   "name": "The Toll Is Remembered",
   "prereq": "Prerequisite: Own the Crossing",
   "text": "A creature that crosses your designated passage by paying the toll is toll-marked for the duration: while within 1 mile of you, you always know its direction (not its distance), and you know at once if it enters water within that mile. The river remembers who paid."
  },
  {
   "name": "The Grande Bears His People",
   "prereq": "Prerequisite: Maximum: THE COBRA GRANDE",
   "text": "While transformed by Maximum: THE COBRA GRANDE, up to four willing creatures may ride your coils: they cling to you and move with you when you swim, are not grappled, and attacks against them from creatures in the water have disadvantage — the deep place hides its own, and now it hides them too."
  }
 ],
 "hotu-matu-a": [
  {
   "name": "The Name Is on the Hull",
   "prereq": "",
   "text": "In a 10-minute ritual costing 2 CE, you may inscribe the mooring-word on a vessel's hull — its crew willing, or it uncrewed. For 24 hours, you may target that vessel with The Ariki's Word while on the same plane as it, regardless of distance, and your Swell-Reading always knows its direction. The word, once given to a hull, does not wash off."
  },
  {
   "name": "The Harbor Holds",
   "prereq": "Prerequisite: The Fleet Is Moored",
   "text": "When you use The Fleet Is Moored, you may anchor it to a point within 60 ft of you instead of yourself: a 60-ft radius centered on that point holds for the duration. Hostile creatures inside have their speed halved and cannot take the Dash action — a Wisdom save against your technique DC at the start of each of their turns negates the effect for that turn — while willing creatures sail free. The word goes out over the water, and the water keeps it."
  },
  {
   "name": "The Star Reroutes",
   "prereq": "Prerequisite: Star-Path",
   "text": "When you use Star-Path to answer a willing creature's forced movement, you may reroute instead of merely negating: the creature moves up to 15 ft to an unoccupied space you can see, instead of being moved against its will. The star-path is still a path — sometimes it leads elsewhere."
  },
  {
   "name": "The Stone Speaks the Word",
   "prereq": "Prerequisite: The Moai Witness",
   "text": "While The Moai Witness is active, the ancestors may speak through you: you may originate The Ariki's Word from any moai of the ahu instead of yourself — targeting a creature or vessel within 120 ft of that moai, so long as the ahu is within 10 miles of you. A word witnessed by the ancestors is a word Heaven cannot mishear, and stone carries it farther than breath."
  }
 ],
 "maquinna": [
  {
   "name": "The Eye Sees Debts",
   "prereq": "",
   "text": "A giver knows what is owed as well as what is needed: you automatically know whether a willing creature within 60 ft of you is bound by a magical agreement, vow, or geas. (The eye sees the weight of the debt, not its words — for the words, ask.)"
  },
  {
   "name": "The Wound, Given Back",
   "prereq": "Prerequisite: I Give This Wound",
   "text": "When you take damage through I Give This Wound, you may spend 2 additional CE as part of the same reaction to give the wound onward: one hostile creature within 30 ft of you takes force damage equal to the damage you took, or half as much on a successful Dexterity saving throw against your technique DC. The gift was freely taken; Heaven permits its return."
  },
  {
   "name": "The Giving Does Not Stop",
   "prereq": "Prerequisite: The Great Giveaway",
   "text": "While The Great Giveaway is active, the giving outlasts even you: if you fall unconscious, you continue to take damage for willing creatures within 60 ft as if conscious — the portions divided as you last directed each round, or the whole of it if you gave no direction. You still gain Standing for damage taken this way. The flood, once opened, does not close for the giver's sake."
  },
  {
   "name": "Guests of the House",
   "prereq": "Prerequisite: THE HOUSE OF GIFTS",
   "text": "The House of Gifts makes guests of all inside — even the unwilling. While your Domain stands, a hostile creature that accepts the willing-decline — taking no hostile action against the Domain's guests for 1 round, owing nothing — is treated as a guest until the end of its next turn: your willing creatures may include it in the Domain's gift-flow as if it were willing, so it may receive healing given onward through the sure-hit, though it can never be compelled to give. Even enemies may be fed at the potlatch."
  }
 ],
 "tecumseh": [
  {
   "name": "The Comet Takes a Name",
   "prereq": "Prerequisite: Panther's Crossing",
   "text": "You may lay Panther's Crossing on a creature you can see within 120 ft instead of a point — a sky-brand on the treaty-breaker. A willing creature is branded automatically; an unwilling one makes a DEX save vs your technique DC, and on a success the mark lands on the ground beneath it instead. At the start of your next turn the strike centers on the branded creature wherever it has moved: each creature within 10 ft makes a DEX save vs your technique DC, taking 3d8 + CHA modifier force damage on failure, half on success. Cost, uses, and per-long-rest limit as Panther's Crossing."
  },
  {
   "name": "The Hearth Travels",
   "prereq": "Prerequisite: The Council Fire",
   "text": "When you kindle The Council Fire, you may coax the flame into a lantern, brazier, or similar vessel as part of the kindling (an object interaction). While the flame is carried in its vessel, the Confederacy aura anchors to the flame (120 ft) and moves with its bearer, and willing creatures resting within 30 ft of the bearer gain the 10-minute short rest benefit. If the bearer is knocked prone, the vessel is dropped, or the flame is doused, the fire dies."
  },
  {
   "name": "The Kill Calls the Sky",
   "prereq": "Prerequisite: The Comet Returns",
   "text": "While The Comet Returns is active, when a warband member reduces an enemy to 0 HP, you may immediately lay a Panther's Crossing mark on that point without spending the bonus action and without consuming one of your per-long-rest uses; the strike arrives at the start of your next turn as normal. Only one such omen-mark may be active at a time."
  },
  {
   "name": "The Comet Falls for Another",
   "prereq": "Prerequisite: THE PANTHER NEVER LANDS (passive)",
   "text": "Once per long rest, when a willing creature in the Confederacy would drop to 0 HP, you may spend your L20's comet-crossing on them instead of yourself: the creature drops to 1 HP instead and may immediately move up to its speed without provoking opportunity attacks. Your own once-per-long-rest catch is then unavailable until you finish a long rest."
  }
 ],
 "tr-ng-tr-c": [
  {
   "name": "The Duet Teaches the Line",
   "prereq": "Prerequisite: The Answer",
   "text": "The Answer's escalation need not fall on the echo's blade. When you hit a creature, you may lend the answering strike: choose one ally within 60 ft — that ally's next attack against the same creature before your next turn has advantage, instead of the echo's next attack. Once per round."
  },
  {
   "name": "Any Sister Will Do",
   "prereq": "Prerequisite: Twin Rebellion",
   "text": "Twin Rebellion's swap is not reserved for the echo. You may swap positions with one willing ally within 120 ft instead of the echo (bonus action, 2 CE, as normal). Until the start of your next turn, attacks against you have disadvantage — the empire can't tell which sister is which."
  },
  {
   "name": "The Herd Wheels",
   "prereq": "Prerequisite: Domain Expansion: HÁT MÔN — WHERE THE SISTERS RULED (full-turn action, 20 CE)",
   "text": "While the Domain stands, you may fire The Queen's Elephant as a 60-ft cone originating from the echo instead of a 60-ft line from yourself. Same cost (action, 4 CE): each creature in the cone makes a STR save vs your technique DC — 4d8 bludgeoning damage and prone on failure, half damage and no prone on success."
  },
  {
   "name": "The River Holds the Banks",
   "prereq": "Prerequisite: THE RIVER'S VERDICT (passive)",
   "text": "THE RIVER'S VERDICT's catch is not reserved for you. Once per long rest, when a willing creature within 30 ft of the echo drops to 0 HP, the echo may catch them instead: they drop to 1 HP, and the echo takes the excess damage, even beyond its own HP."
  }
 ],
 "yaa-asantewaa": [
  {
   "name": "The Refusal, Personally Given",
   "prereq": "Prerequisite: The Unconscripted",
   "text": "The Unconscripted's refusal can be given to one person, not just an aura. As a bonus action (2 CE), you may lay your hand on a willing creature within 5 ft: for 1 minute, that creature carries the refusal with it — it cannot be charmed or frightened, and has advantage on saves against effects that would compel its actions or movement, wherever it goes. One bearer at a time."
  },
  {
   "name": "The Refusal Is Witnessed",
   "prereq": "Prerequisite: Not in My Name",
   "text": "When Not in My Name refuses a compulsion, the refusal testifies: you immediately learn the effect's originator — its direction and distance from you — and the exact command or compulsion that was refused. No action required."
  },
  {
   "name": "The Council Interrupts",
   "prereq": "Prerequisite: The Stool Is Not for Taking",
   "text": "While The Stool Is Not for Taking is active, when a hostile controller inside the aura issues an order to its minions, you may use your reaction to force the control-loss save immediately, before the order resolves. On a failure the order never lands — the minions act on instinct for that turn, as normal."
  },
  {
   "name": "The Cut Leash",
   "prereq": "Prerequisite: Domain Expansion: THE WAR OF THE GOLDEN STOOL (full-turn action, 20 CE)",
   "text": "When the Domain ends, the severed leashes do not simply re-tie. For 1 minute afterward, a creature whose control was suppressed inside the Domain cannot have that same control re-established — its controller must impose a new control effect; the old effect's remaining duration is lost."
  }
 ],
 "askia-muhammad": [
  {
   "name": "The Ledger Is Current",
   "prereq": "Prerequisite: The Rolls",
   "text": "The Rolls are a living record. As an action (no CE), you may consult the ledger: you learn the direction and distance of every enrolled creature, and whether each is healthy, wounded, or down. Usable once per short rest."
  },
  {
   "name": "The Viceroys Ride Out",
   "prereq": "Prerequisite: The Four Viceroys",
   "text": "The districts need not be drawn on the ground. When you activate The Four Viceroys — or as a bonus action when you redesignate — you may anchor any district to an enrolled ally you can see instead of a fixed square: the 30-ft square centers on that ally and moves with them. If the anchored ally falls unconscious, the district drops at that point."
  },
  {
   "name": "Standing Requisition",
   "prereq": "Prerequisite: Requisition",
   "text": "The quartermaster may issue stores in advance. As a bonus action, you may pre-pay Requisition's 2 CE for one enrolled ally within 60 ft: the next time that ally takes damage before the start of your next turn, Requisition triggers automatically (no reaction required). If no damage comes, the CE is spent regardless. Still once per round."
  },
  {
   "name": "Stuck in Committee",
   "prereq": "Prerequisite: Held in Committee",
   "text": "The committee keeps minutes. When a creature fails its save against Held in Committee, its delayed orders are written down: you and your enrolled allies within 60 ft learn the creature\'s current hit points and one technique feature or spell it has used since your last turn. A delayed order is an order on record."
  }
 ],
 "nzinga": [
  {
   "name": "By Envoy's Mouth",
   "prereq": "Prerequisite: Propose Terms",
   "text": "Terms may be delivered by envoy. When you Propose Terms, you may speak them through one willing signatory within 60 ft of you: range is measured from the envoy (60 ft), and the target hears your Terms in the envoy's voice. Cost and limits as Propose Terms."
  },
  {
   "name": "The Mercy Clause",
   "prereq": "Prerequisite: The Witnessed Word",
   "text": "When the Witnessed Word would fire on a truce-breaker, you may commute the sentence: instead of the breaker taking 3d8 psychic damage (WIS save halves), the signatory harmed by the breach gains temporary HP equal to the damage rolled — no save, freely given. The punishment becomes restitution. Once per breach."
  },
  {
   "name": "Safe Conduct",
   "prereq": "Prerequisite: All Parties at the Table",
   "text": "A brokered table guarantees the road between. While a truce between opposing factions holds, you may use an action (no CE) to grant safe conduct: each signatory you choose may move up to its speed; this movement provokes no opportunity attacks from other signatories. Usable once per truce."
  },
  {
   "name": "The Table Polices Itself",
   "prereq": "Prerequisite: Domain Expansion: THE CONGRESS OF MATAMBA (full-turn action, 20 CE)",
   "text": "While the Domain stands, the Congress needs no chair to defend it. When a signatory would break the Congress Truce, another signatory within 30 ft of the breaker may use its reaction to interpose: the breaker must succeed on a WIS save against your technique DC or the breaking attack fails outright. No CE cost to you. Once per round."
  }
 ],
 "kimpa-vita": [
  {
   "name": "The Witness Lends Her Eyes",
   "prereq": "Prerequisite: The Witness",
   "text": "As an action (1 CE), you may lend the Witness to one willing creature within 30 ft: for 1 minute, they perceive bindings as you do — charms, compulsions, curses, geas, and vow-marks on creatures they can see within 60 ft, and the general shape of each binding's price. You retain the sight."
  },
  {
   "name": "The Door Stands Ajar",
   "prereq": "Prerequisite: The Opened Door",
   "text": "You may unwrite a binding on a delay. When you use The Opened Door (action, 3 CE), you may leave the door ajar instead of opening it at once: within 1 minute, the target may end the binding as a free action on its turn — walking through when the moment is survivable. If the minute passes unused, the door closes and the CE is spent."
  },
  {
   "name": "The Fire Runs Door to Door",
   "prereq": "Prerequisite: Maximum: THE BURNING (action, 10 CE, once per long rest)",
   "text": "During THE BURNING, when you use The Opened Door on a willing creature, the fire follows the shape of the chain: you may also unwrite the same binding — the same effect from the same originator — on one additional willing creature within 60 ft of the first, as part of the same action."
  },
  {
   "name": "The Door Comes Knocking",
   "prereq": "Prerequisite: Domain Expansion: THE SAINT'S POSSESSION (full-turn action, 20 CE)",
   "text": "While the Domain stands, you need not wait for the bound to come to the door. As a bonus action, you may name a binding you have witnessed: one enemy within 60 ft bearing it must immediately choose — as a free action — whether to be released from it or keep it. The choice is always free; declining costs nothing. Once per round."
  }
 ],
 "al-hasan-ibn-sulayman": [
  {
   "name": "The Posted Manifest",
   "prereq": "Prerequisite: Quote the Price",
   "text": "The bell's news can be written down. As an action (1 CE), you may inscribe one Assessed creature's true costs — CE cost, upkeep, and hidden riders of its features — into your ledger. Any creature that spends 1 minute reading the page learns them. The ink holds what the bell spoke: the manifest stays true for 24 hours, even after the Assessment lapses."
  },
  {
   "name": "The Auditor Picks the Cargo",
   "prereq": "Prerequisite: Upkeep Called Due",
   "text": "When Upkeep Called Due forces a creature to let workings lapse, the auditor chooses what goes overboard: you decide the order in which its unpaid sustained features and spells lapse. (The audit invoices; now it also prioritizes.)"
  },
  {
   "name": "The Coin Testifies",
   "prereq": "Prerequisite: The Mint's Hand",
   "text": "A standard weight measures as well as pays. As an action (2 CE), you may lay a Mint coin against a named Heaven-witnessed debt within 60 ft without closing it: you learn the debt's exact amount, both parties, and every term — the coin weighed, not spent."
  },
  {
   "name": "No Credit, No Appeal",
   "prereq": "Prerequisite: Maximum: THE MARKET CLOSES",
   "text": "During THE MARKET CLOSES, every refusal is written down. When a creature declines to activate rather than pay the 2 CE, the refusal is entered in the market\'s books: the bell speaks one true line of that feature\'s accounts aloud - you and your allies within 60 ft learn its CE cost, its upkeep, or one hidden rider (your choice). The market takes no credit. But it takes notes."
  }
 ],
 "kiviuq": [
  {
   "name": "The Tale Takes Two",
   "prereq": "",
   "text": "The story has room for a passenger. When you use The Story Provides, you may bring one willing creature you are touching; it arrives with you in an unoccupied space within 5 ft of yours. The advantage on your next attack roll applies as normal. (Some tales are told in pairs.)"
  },
  {
   "name": "Struck Where He Was",
   "prereq": "Prerequisite: Wrong Footing",
   "text": "When Wrong Footing causes an attack to miss, you may spend the miss: the attacker immediately rerolls the attack against another creature of your choice within 5 ft of your new position, using the same roll modifiers — striking where the story said you'd be, and finding someone else there."
  },
  {
   "name": "The Tale Knows His Name",
   "prereq": "Prerequisite: Where the Story Needs Him",
   "text": "The story need not name a place. When you use Where the Story Needs Him's mile-teleport, you may name a creature whose story you have heard (described to you, told around a fire, read in a report) instead of a place: you teleport up to 1 mile to an unoccupied space within 30 ft of that creature — the tale knows where its people are. (The combat teleport — 60 ft and one attack with advantage — is unchanged.)"
  },
  {
   "name": "No Fixed Point, No Quarter",
   "prereq": "Prerequisite: The Trail With No End",
   "text": "While the Domain stands, your once-per-round free-action teleport may instead swap your position with a willing creature you can see within 30 ft — the story needs them where you were. (Both of you must arrive in unoccupied spaces.)"
  }
 ],
 "roald-amundsen": [
  {
   "name": "The Cairns Speak",
   "prereq": "",
   "text": "Your trail-marks can carry meaning. As you lay them (no action), you may encode one simple concept into each mark — danger, safe, turn back, follow, cache ahead. Any creature that examines a mark learns the concept; those who know your marks read them at a glance. (Marks last 24 hours, as normal.)"
  },
  {
   "name": "The Cache Behind",
   "prereq": "Prerequisite: Depot",
   "text": "The depot need not be laid where you stand. When you perform Depot's 1-hour ritual (2 CE), you may lay the cache at any point along your own trail-marks from the last 24 hours, within 1 mile — the supplies were cached on the way out, correctly placed in advance. Otherwise as Depot."
  },
  {
   "name": "He Comes to Them",
   "prereq": "Prerequisite: No One Left on the Ice",
   "text": "The route need not carry the fallen to you — you may walk it to them. When a willing creature you can see within 60 ft drops to 0 HP, you may move up to 30 ft to an unoccupied space adjacent to them (no opportunity attacks) instead of moving them: they are stabilized where they lie. Reaction, 4 CE, once per round, as No One Left on the Ice."
  },
  {
   "name": "The Passage Remembers",
   "prereq": "Prerequisite: The Northwest Passage",
   "text": "When the Domain ends, the way through does not vanish with it: your trail-marks remain along every path your allies traveled inside the Domain, persisting as ordinary trail-marks for 24 hours. (The route, kept.)"
  }
 ],
 "dzunuk-wa": [
  {
   "name": "The Forest Echoes the Cry",
   "prereq": "",
   "text": "The cry goes out and comes back. While any creature within 60 ft of you is frightened by The Cry, you hear exactly where it stands: you have blindsight out to 60 ft against creatures that can hear you. A frightened creature cannot hide from the forest that is already inside its ears."
  },
  {
   "name": "The Basket Carries More Than Prey",
   "prereq": "Prerequisite: Into the Basket",
   "text": "The basket does not only take. As an action, you may stuff one willing creature within 15 ft of you into the basket (no save). A willing creature is not Devoured: while inside, it has total cover, cannot be seen or targeted, and cannot be found by scrying or sending. It may climb out at the start of its turn (no action), or you may shake it free as a bonus action into an unoccupied space within 15 ft of you. The basket carries the willing gently."
  },
  {
   "name": "The Famine Eats Iron Too",
   "prereq": "Prerequisite: Maximum: WINTER'S MOTHER (action, 10 CE, once per long rest)",
   "text": "While Maximum: WINTER'S MOTHER is active, hunger takes more than courage. When a creature kneels and drops its weapons (the famine's willing-decline), you may sweep the dropped objects into the basket with no action required: they are Devoured - unreachable by any means while you live. A kneeling creature that stands finds its hands empty."
  },
  {
   "name": "The Basket Calls Loudest",
   "prereq": "Prerequisite: HU-HU-HU — THE BASKET OF THE WILD WOMAN (action, 20 CE)",
   "text": "When the Domain's sure-hit pulls a hostile creature to within 15 ft of you, you may have the forest hold it gently instead of striking it: that creature takes no bludgeoning damage from the sure-hit this round, and must succeed on a STR save vs your technique DC or be grappled (escape DC = your technique DC) - within reach of Into the Basket on your next turn."
  }
 ],
 "ranavalona-i": [
  {
   "name": "No Quiet Landings",
   "prereq": "",
   "text": "The island feels every footfall. You always know the exact location of each Trespasser standing on ground within 60 ft of you - a Trespasser there cannot hide from you, and invisibility does not conceal its position from you while it stands on her island. The island saw it arrive, and it has not stopped watching."
  },
  {
   "name": "The Harbor Guides Its Own",
   "prereq": "Prerequisite: The Maps Lie",
   "text": "The chart can be corrected as well as falsified. When a willing ally within 120 ft of you teleports or uses magical movement, you may use your reaction to redirect its destination up to 60 ft to a point of your choice (no save - the harbor guides its own ships). You cannot redirect an ally into a space it could not normally occupy."
  },
  {
   "name": "The Gate Admits One",
   "prereq": "Prerequisite: The Quarantine",
   "text": "The door opens outward - and, once, inward. While your quarantined zone stands, as a bonus action you may name one Trespasser that may enter the zone freely for 1 minute (the audience is granted; the army is not). You may revoke the invitation as a bonus action, and the Trespasser is pushed to the nearest unoccupied space outside the boundary."
  },
  {
   "name": "The Road Out Is Paved",
   "prereq": "Prerequisite: THE UNINVADABLE ISLAND",
   "text": "The island hurries the willing departure. At initiative 20, when THE UNINVADABLE ISLAND collects its toll, each Trespasser that spent its turns marching out (and is spared at the count) is carried by the island up to 30 ft toward the nearest boundary - this movement provokes no opportunity attacks. The willing-decline is the oldest one in warfare, and the island paves it."
  }
 ],
 "roy-mata": [
  {
   "name": "The Feast Knows Its Guests",
   "prereq": "",
   "text": "The wound is the witness, and the witness is an address. While a creature is Witnessed by you, you always know its direction and distance from you, up to 1 mile away. The Witness clears as normal when the creature settles its account - Heaven closes the book, and the address is forgotten."
  },
  {
   "name": "The Retinue Carries the Burial",
   "prereq": "Prerequisite: Second Burial",
   "text": "The retinue does not only take the blow - it carries the chief to it. When you interpose with Second Burial, you may first move up to 30 ft to an unoccupied space adjacent to the ally; this movement provokes no opportunity attacks. The burial party arrives together."
  },
  {
   "name": "The Feast Seats Its Enemies",
   "prereq": "Prerequisite: The Mortuary Feast",
   "text": "The feast is generous, and generosity opens accounts. When you use The Mortuary Feast, you may choose any number of hostile creatures within 30 ft to also regain the 3d8 + STR modifier HP - each hostile creature healed this way becomes Witnessed until the end of the encounter (Heaven notes the gift; the ledger opens a new account). No save - the wound was never the only witness."
  },
  {
   "name": "The Feast Collects at the Drum",
   "prereq": "Prerequisite: RETOKA — THE FEAST THAT NEVER ENDS",
   "text": "The witnessing and the collection are one rhythm. While RETOKA - THE FEAST THAT NEVER ENDS stands, when its sure-hit Witnesses a hostile creature at initiative 20, you may spend your reaction to collect immediately: the creature pays its account at once, taking 2d8 psychic damage (no save - the debt was witnessed). This collection does not trigger the feast's healing."
  }
 ],
 "michael-jackson": [
  {
   "name": "The Stand-In",
   "prereq": "",
   "text": "The Crown remembers being worn. As an action, Michael may place THE BURNED CROWN on a willing creature within 5 ft; while it wears the Crown, that creature counts as Michael for directing Active Gallery Dancers - it may choose their movement and targets on its turn. Michael may reclaim the Crown as a bonus action while within 60 ft of the bearer. The show goes on, even with an understudy."
  },
  {
   "name": "The Body Is Returned",
   "prereq": "Prerequisite: MICHAEL-SPECIFIC RULE: CLAIM THE DEAD",
   "text": "The Gallery does not only collect - it can exhibit. As an action, Michael may release one stored corpse from his Innate Domain into an unoccupied space within 30 ft; it appears as it was at death, no longer part of the collection. Bodies have been returned to doorsteps, to stages, and to negotiating tables. The message is always understood."
  },
  {
   "name": "The Set Is Dressed",
   "prereq": "Prerequisite: MICHAEL-SPECIFIC RULE: GALLERY MANIFESTATION",
   "text": "The background formation is not only for show. When Michael expands THRILLER, he may place up to 6 background (non-Active) corpses in unoccupied spaces inside the Domain as set pieces: each such corpse's space is difficult terrain, and the corpse grants half cover to creatures behind it. The stage is dressed; the audience will trip over it."
  },
  {
   "name": "The Final Bow",
   "prereq": "Prerequisite: DESTROYING A GALLERY CORPSE",
   "text": "Every dancer gets a final bow. When an Active Gallery Dancer is reduced to 0 HP inside THRILLER, Michael may spend his reaction to let it take its last step: it immediately makes its one retained basic attack before collapsing. The dancer leaves the stage; the dancer is applauded out."
  }
 ],
 "jiang-wei": [
  {
   "name": "The March Advances on Foot",
   "prereq": "",
   "text": "The campaign is not only a count - it is legs. As a bonus action, you may reduce your Expedition count by 1 (to a minimum of 0) to move up to your speed without provoking opportunity attacks. The march was always the weapon; the spear only finished the argument."
  },
  {
   "name": "The Standard Advances With Him",
   "prereq": "Prerequisite: The Defector's Step",
   "text": "He never moved without purpose, and the standard moved with him. When you move with The Defector's Step, you may plant your standard (or raise your spear for The Standard of Shu) as part of that move, with no action required. The banner advances on the enemy's miss."
  },
  {
   "name": "The Campaign Is Shared",
   "prereq": "Prerequisite: The Expeditions Compound",
   "text": "The general loans his momentum. As a bonus action, you may reduce your Expedition count by 2 (to a minimum of 0); one ally within 30 ft gains +2 force damage on weapon attacks until the start of your next turn - a fraction of the Standard's aura, lent out. Your Inherited Spear damage falls by the same 2 until your count recovers. Nine expeditions were never a solitary march."
  },
  {
   "name": "The Tenth Begins the Advance",
   "prereq": "Prerequisite: Maximum — The Tenth Expedition",
   "text": "The tenth expedition begins, and everyone advances. When you use Maximum - The Tenth Expedition, you may plant your standard as part of the action: each ally within 30 ft may immediately use its reaction to move up to half its speed without provoking opportunity attacks. The campaign that never ended finally moves."
  }
 ],
 "liu-bowen": [
  {
   "name": "The Couplet Carries Words",
   "prereq": "",
   "text": "A verse can carry more than a curse. When you compose a verse naming a willing creature, you may weave a message of up to 25 words into the rhyme instead of the normal fulfillment effect: when the verse fulfills, the named creature hears the message, wherever it has gone (the rhyme follows). The verse still counts against your held verses and fades as normal. Poets were the first messengers."
  },
  {
   "name": "The Prophecy Is Posted",
   "prereq": "Prerequisite: Cast the Verse",
   "text": "Some prophecies are nailed to doors. You may compose a verse naming a location or object you can see within 60 ft instead of a creature, with a trigger such as 'when a creature enters' or 'when it is touched': the first creature to meet the trigger is treated as the named creature when the verse fulfills. The verse counts against your held verses and fades as normal. The prophecy waits where it was posted."
  },
  {
   "name": "The Meter Is Memorized",
   "prereq": "Prerequisite: Counter-Verse",
   "text": "He interrupts the meter - and remembers it. When a verse composed with Counter-Verse fulfills against the caster, you learn the technique feature's name and one mechanical detail of your choice: its CE cost, its range, or its save DC. The song remembers what the singer tried to sing."
  },
  {
   "name": "The Prophecy Outlives the Battle",
   "prereq": "Prerequisite: Maximum — Shaobing Song, Sung Aloud",
   "text": "The song outlived the singer by six centuries; it can outlive a battle. When you use Maximum - Shaobing Song, Sung Aloud, you may choose one enemy that failed its INT save: the fulfilled verse against it echoes - the next time within 10 minutes that it takes the same kind of action, the verse fulfills again (disadvantage on its next two d20 rolls; no psychic damage). The prophecy does not end when the singing stops."
  }
 ],
 "sima-yi": [
  {
   "name": "The Turtle Lunges",
   "prereq": "",
   "text": "Patience, spent all at once, is a lunge. As a bonus action, you may spend 2 Patience to move up to half your speed without provoking opportunity attacks. The turtle does not hurry - except once, exactly when it matters."
  },
  {
   "name": "The Wall Answers in Motion",
   "prereq": "Prerequisite: Xicheng's Lesson",
   "text": "The wall answers, and the answer repositions. When you make the weapon attack from Xicheng's Lesson, you may move up to 10 ft as part of the same reaction; this movement provokes no opportunity attacks. The wall does not only strike back - it steps to better ground."
  },
  {
   "name": "The Shell Covers Two",
   "prereq": "Prerequisite: Steel Yourself",
   "text": "When you use Steel Yourself, you may hunker over one willing ally within 5 ft of you as part of the same bonus action: until the start of your next turn, the first attack that would hit that ally misses instead — it strikes the raised shell, not the soldier beneath it — and you gain 1 Patience for the invoiced swing. If the ally moves away from you, the shelter ends; the turtle does not chase."
  },
  {
   "name": "The Throne Empties Again",
   "prereq": "Prerequisite: Maximum — The Empty Throne",
   "text": "The throne empties, and he was never there. When Maximum - The Empty Throne ends or you dismiss it, you may forgo the weapon attacks to become invisible until the end of your next turn. Your Patience still resets to 0 - the waiting resumes elsewhere."
  }
 ],
 "chen-shou": [
  {
   "name": "The Record Is Cited",
   "prereq": "",
   "text": "The record is impeccable, and impeccable records persuade. When you make a Persuasion or Intimidation check to convince someone of an event recorded in a held entry, you may cite the entry to gain advantage on the check. Each entry may be cited once - a citation, spent, is still true, but it has been heard."
  },
  {
   "name": "The Well-Placed Footnote",
   "prereq": "Prerequisite: Record the Failure",
   "text": "A footnote lands hardest exactly where it is placed. When you record an enemy's failed roll with Record the Failure, you may hold the disadvantage instead of applying it to the next same-kind roll: you may apply it to any one roll of that kind the enemy makes within 1 minute, declared before the roll is made. Still once per enemy per combat - the failure, written down, repeats exactly when the historian chooses."
  },
  {
   "name": "The Fair Copy",
   "prereq": "Prerequisite: Simple Domain: The Archive",
   "text": "The archive lends books, and books leave the building. While Simple Domain: The Archive stands, as an action you may transcribe one held entry onto paper: a permanent, mundane written account of the witnessed event. The transcription cannot fuel read-back, but it is proof - shown to magistrates, generals, and skeptics. The entry itself remains held. Nothing is forgotten; now, nothing is unprovable."
  },
  {
   "name": "The Verdict Is the Whole Record",
   "prereq": "Prerequisite: Maximum — The Verdict of History",
   "text": "The verdict is the entry against which all others are measured. While Maximum - The Verdict of History affects an enemy, you may use your read-back against it without any recorded entry of that kind: when the affected enemy makes a d20 roll, you may spend your reaction to impose disadvantage on it. Its story is written; the historian merely reads it back."
  }
 ]
};
