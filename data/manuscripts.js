/* ── CE Applications: the Manuscripts ──────────────────────────────
   Learnable applications of Cursed Energy taught by manuscript — NOT
   techniques (no L1–L20 progression, outside the 2-technique limit), NOT
   feats, NOT cursed tools. Each manuscript carries its author's treatise,
   the application's exact rules, advanced applications, study requirements,
   and Sun Tzu's marginalia (he authored none of them; his notes appear in
   every copy). */
window.MANUSCRIPTS = [
  {
    id: "manuscript-spinjitzu",
    title: "The Whirlwind Treatise",
    author: "Genghis Khan",
    authorTitle: "Khagan of the Eternal Blue Sky",
    dossier: "manuscripts/spinjitzu.html",
    summary: "The horde as martial art: the tornado spin — a deflecting vortex, uncatchable motion, momentum turned into strikes.",
    application: {
      name: "Spinjitzu",
      costLine: "Bonus action · 2 CE · 1 minute",
      text: "You enter the whirlwind. For 1 minute: attacks against you have disadvantage (the deflecting vortex); your movement does not provoke opportunity attacks; your melee attacks deal an additional 1d6 force damage (momentum). You cannot spin while wearing heavy armor or while your speed is 0."
    },
    advanced: [
      {
        name: "Dust Devil",
        text: "Your spin kicks up a 15-ft radius storm of dust and debris centered on you, moving with you. The area is heavily obscured to everyone except you — you see through your own storm. The storm ends when the whirlwind ends."
      },
      {
        name: "The Noose Tightens",
        text: "The horde's encirclement. While spinning, when you move within 5 ft of a creature, it cannot take reactions until the start of your next turn — no one slips the noose clean."
      }
    ],
    study: { ceTier: 1, ceTierName: "Skilled", level: 3, days: 30, dc: 15 },
    marginalia: [
      "The Khagan writes of motion and believes he has written of war. He is half right, which is the most dangerous way to be right. The whirlwind does not win because it spins. It wins because the enemy prepares for a charge and meets weather instead. — S.",
      "Note the honesty here, rare in conquerors: he admits the spin ends. Every art that spends the body must budget the body. The ones who forget this die tired. — S.",
      "He teaches encirclement as geometry. It is not. It is appetite. The circle closes because the riders are hungry, not because the map demands it. — S."
    ]
  },
  {
    id: "manuscript-airjitzu",
    title: "The Empty Sky Manual",
    author: "Zhuge Liang",
    authorTitle: "The Empty City",
    dossier: "manuscripts/airjitzu.html",
    summary: "Emptiness made into flight: sustain the spin and leave the ground — become untouchable air.",
    application: {
      name: "Airjitzu",
      costLine: "Action · 3 CE · concentration, 10 minutes",
      text: "You sustain the spin and rise. You gain a fly speed of 60 ft for up to 10 minutes (concentration). While airborne this way you are lightly obscured by the vortex — ranged attacks against you have disadvantage. If your concentration breaks, you descend safely 60 ft per round; you take no falling damage from this descent."
    },
    advanced: [
      {
        name: "Thunderhead Descent",
        text: "The sky, falling on schedule. While airborne via Airjitzu, if you descend at least 30 ft in a straight line toward a creature and hit it with a melee attack on the same turn, the attack deals an additional 2d6 force damage and the target must succeed on a Strength save against your CE save DC or be knocked prone."
      },
      {
        name: "Wind Reader",
        text: "Emptiness perceives. While concentrating on Airjitzu, you have advantage on Wisdom (Perception) checks to detect hidden creatures within 60 ft — disturbed air betrays them."
      }
    ],
    study: { ceTier: 2, ceTierName: "Advanced", level: 7, days: 30, dc: 15 },
    marginalia: [
      "My old opponent mistakes emptiness for escape. The sky is not empty because you left it. It is empty because nothing in it requires you. He nearly understands his own art. — S.",
      "A man who can leave the battlefield at will has already won every battle he declines. This is the only honest sentence in the manual. Read it twice. — S.",
      "He warns against the storm and does not say why. I will: the wind does not distinguish. Fly too long and you forget which army was yours. — S."
    ]
  },
  {
    id: "manuscript-tornado",
    title: "The Imperial Workshop",
    author: "Qin Shi Huang",
    authorTitle: "All Under Heaven",
    dossier: "manuscripts/tornado.html",
    summary: "Creation as imperial prerogative: three or more spinners pool their CE to make — objects, structures, repairs. It cannot destroy; it can only authorize.",
    application: {
      name: "Tornado of Creation",
      costLine: "Ritual · 10 CE · 3 or more participants",
      text: "Three or more spinners whirl in concert, pooling cursed energy to CREATE. The ritual takes 10 minutes. The spinners may create objects, structures, or repairs with a total value and scale set by the GM, guided by total CE spent (roughly one wagon-load of simple material per 10 CE). What is made is real and permanent. The Tornado cannot destroy, damage, or unmake — attempts fizzle, the CE still spent."
    },
    advanced: [
      {
        name: "The Workshop Remembers",
        text: "The terracotta lesson. The spinners may rebuild a destroyed nonmagical object or structure from its remnants — cracks close, shards rejoin, walls stand again. The thing rebuilt is whole, not new."
      },
      {
        name: "Many Hands",
        text: "With six or more spinners, the Workshop produces fine work: complex mechanisms with moving parts — locks, traps, winches, waterwheels — not merely static objects. The Emperor's scale was never the point; his precision was."
      }
    ],
    study: { ceTier: 3, ceTierName: "Mastered", level: 11, days: 30, dc: 15 },
    marginalia: [
      "The Emperor creates because he cannot tolerate anything he did not authorize, including the landscape. Understand this and you understand the entire art. — S.",
      "He is correct that creation is the greater power. He is wrong about why. Destruction is a single decision; creation is a thousand. The Workshop does not make builders. It makes accountants of possibility. — S.",
      "Three spinners minimum, he writes, as if the number were the teaching. The teaching is that no emperor creates alone, and every emperor pretends otherwise. — S."
    ]
  }
];
