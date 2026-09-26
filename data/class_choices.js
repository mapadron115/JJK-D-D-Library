/* Class level-up choices for the Ritual Archive character builder.
   Structured pickers for every "choose X" class feature in data/class_features.js.
   Audit: agent_notes/2026-09-19/class-choice-audit.md (26 choice points; the
   Innate Technique, ASI-cadence, and Mindset pickers already exist in the builder).

   Keyed by class name. Each entry declares the CLASS level(s) that grant it and
   a control type:
     slots    — one <select> per slot; slots: {grantClassLevel: slotCount}.
                Additional picks at later levels are extra slots (excluded from
                re-selection once taken).
     freeform — one text input at the grant level.
     allocate — distribute N points across abilities, each capped.
     pointbuy — spend class-level-derived points on a categorized improvement
                list with ability, level, and chain prerequisites. */
window.CLASS_CHOICES = {
'Strategist': [
  { key:'modifications', level:2, type:'slots', name:'Technique Creativity',
    feature:'Technique Creativity',
    slots:{2:2, 10:1, 17:1},
    prompt:'Modification options',
    blurb:'Two Modification options of your choice at 2nd level, another at 10th, another at 17th. Only one Modification per casting unless stated otherwise.',
    options:[
      {name:'Careful Technique', text:'1 CE: when a technique forces saves, chosen creatures (up to your CE modifier, min 1) automatically succeed.'},
      {name:'Distant Technique', text:'1 CE: double a technique\u2019s range (5+ ft), or make a touch technique range 30 ft.'},
      {name:'Empowered Technique', text:'1 CE: reroll up to CE-modifier damage dice (min 1), must use new rolls. Stacks with another Modification.'},
      {name:'Extended Technique', text:'1 CE: double a duration of 1 minute or longer, up to 24 hours.'},
      {name:'Heightened Technique', text:'3 CE: one target has disadvantage on its first save against the technique.'},
      {name:'Quickened Technique', text:'2 CE: change a 1-action casting time to 1 bonus action for this casting.'},
      {name:'Seeking Technique', text:'2 CE: reroll a missed technique attack roll, must use new roll. Stacks with another Modification.'},
      {name:'Subtle Technique', text:'1 CE: cast without somatic or verbal components.'},
      {name:'Transmuted Technique', text:'1 CE: change the damage type among acid, cold, fire, lightning, poison, thunder.'},
      {name:'Twinned Technique', text:'Spend the technique\u2019s cost in CE: target a second creature with a single-target technique (1 CE if free).'}
    ]},
  { key:'signature-move', level:20, type:'freeform', name:'Signature Move',
    feature:'Signature Move',
    prompt:'Signature Move \u2014 the CE feature that costs you nothing',
    placeholder:'Name the feature\u2026',
    note:'One feature that uses cursed energy \u2014 not a Domain Expansion, Maximum, or Reverse Cursed Technique \u2014 usable at no CE cost (counts as minimum input).' }
],
'Heavenly Restriction': [
  { key:'fighting-style', level:2, type:'slots', name:'Fighting Style',
    feature:'Fighting Style',
    slots:{2:1},
    prompt:'Fighting style',
    blurb:'One fighting style at 2nd level. At 14th level it improves automatically \u2014 no new choice.',
    options:[
      {name:'Archery (PHB)', text:'+2 bonus to attack rolls with ranged weapons.'},
      {name:'Blind Fighting (TCE)', text:'Blindsight 10 ft; see invisible creatures within range unless they hide successfully.'},
      {name:'Dueling (PHB)', text:'+2 damage with a melee weapon wielded one-handed and no other weapons.'},
      {name:'Great Weapon Fighting (PHB)', text:'Reroll 1s and 2s on damage dice with two-handed or versatile melee weapons.'},
      {name:'Grappler', text:'At the start of each of your turns, deal 1d4 bludgeoning to one creature you grapple.'},
      {name:'Interception (TCE)', text:'Reaction: reduce damage to a creature within 5 ft (other than you) by 1d10 + proficiency bonus. Requires shield or weapon in hand.'},
      {name:'Protection (PHB)', text:'Reaction: impose disadvantage on an attack against a target within 5 ft of you (other than you).'},
      {name:'Two-Weapon Fighting (PHB)', text:'Add your ability modifier to the damage of the second attack when two-weapon fighting.'},
      {name:'Tunnel Fighter (UA)', text:'Bonus-action defensive stance until your next turn: opportunity attacks without spending your reaction; reaction to strike creatures moving 5+ ft inside your reach.'}
    ]},
  { key:'ideal', level:3, type:'slots', name:'Ideal',
    feature:'Ideal',
    slots:{3:1},
    prompt:'Your Ideal',
    blurb:'Prideful or Vengeful \u2014 grants features at 3rd, 9th, 13th, and 17th level.',
    options:[
      {name:'Prideful', text:'Sorcerer Hunter: reaction melee attacks vs nearby casters, disrupt concentration, advantage on saves vs close-range techniques. Later: a bonus action surge (Fighter\u2019s Drive), adaptive defenses (All Things I Can Handle), crit on demand (You Lost to a Monkey).'},
      {name:'Vengeful', text:'Vengeful Fury: bonus-action fury state (B/P/S reduction, extra crit dice, PB uses). Later: Bloodlust hunter\u2019s mark, deeper fury (Immense Anger), all-damage reduction (Follow Your Wrath).'}
    ]},
  { key:'resistant', level:7, type:'slots', name:'Resistant',
    feature:'Resistant',
    slots:{7:1, 14:1, 20:1},
    prompt:'Resistant saving throws',
    blurb:'One saving throw at 7th, another at 14th, another at 20th. On a success vs an effect dealing half damage on a save: no damage; half on a failure.',
    options:[
      {name:'Brawn (Strength)', text:'Evasion-style resistance on Strength saving throws.'},
      {name:'Evasion (Dexterity)', text:'Evasion-style resistance on Dexterity saving throws.'},
      {name:'Endurance (Constitution)', text:'Evasion-style resistance on Constitution saving throws.'},
      {name:'Discernment (Intelligence)', text:'Evasion-style resistance on Intelligence saving throws.'},
      {name:'Intuition (Wisdom)', text:'Evasion-style resistance on Wisdom saving throws.'},
      {name:'Ego (Charisma)', text:'Evasion-style resistance on Charisma saving throws.'}
    ]},
  { key:'body', level:2, type:'pointbuy', name:'Body Improvements',
    feature:'Body Improvements',
    pointsPerClassLevel:1,
    blurb:'Body points equal to your Heavenly Restriction level. An improvement cannot be changed once chosen. Each category caps at your modifier in its ability.',
    categories:[
      { name:'Strength', ability:'STR', items:[
        {name:'Superhuman Might', cost:1, req:{str:15}, text:'Count as one size larger for grappling, shoving, disarming, and carry/push/drag/lift.'},
        {name:'Monstrous Might', cost:1, req:{str:24, level:9, needs:'Superhuman Might'}, text:'Count as two sizes larger for the above; martial arts die increases by 1 (after tier increases).'},
        {name:'Godly Might', cost:1, req:{str:30, level:17, needs:'Monstrous Might'}, text:'Count as three sizes larger; martial arts die +1 again; double damage to structures and objects.'},
        {name:'Destructive Force', cost:2, req:{str:40, level:20, needs:'Godly Might'}, text:'On a Strength weapon hit, compare the roll vs every chosen creature within 20 ft of the target: half damage (rounded down) on a hit.'},
        {name:'Strong Leap', cost:1, req:{str:15}, text:'Triple your jump height or distance.'},
        {name:'Strength Technique', cost:2, req:{str:20, level:5}, repeatLevels:[1,5,11,17], featGrant:'physical', text:'Gain 1 Physical Feat of your choice (prerequisites apply). Repeatable \u2014 one taking per listed class level.'}
      ]},
      { name:'Speed', ability:'DEX', items:[
        {name:'Sonic Speed', cost:1, req:{dex:15}, text:'Movement speed doubles; Dash as a bonus action.'},
        {name:'Sight Speed', cost:1, req:{dex:24, level:9, needs:'Sonic Speed'}, text:'Speed doubles again; opportunity attacks against you have disadvantage.'},
        {name:'Light Speed', cost:1, req:{dex:30, level:17, needs:'Sight Speed'}, text:'Speed doubles again; creatures without blindsight cannot take reactions to your movement.'},
        {name:'Supersonic Reflexes', cost:1, req:{dex:15}, text:'+1 reaction per round; reaction for advantage on a Dexterity check.'},
        {name:'Lighting Reflexes', cost:2, req:{dex:24, level:9, needs:'Supersonic Reflexes'}, subChoice:{prompt:'Ability for Lighting Reflexes', options:['Intelligence','Wisdom','Charisma']}, text:'+1 more reaction per round; reaction for advantage on checks of one chosen ability (Intelligence, Wisdom, or Charisma) \u2014 permanent.'}
      ]},
      { name:'Durability', ability:'CON', items:[
        {name:'Hardened Skin', cost:1, req:{con:15}, text:'+2 maximum HP per level you have, and +2 more for every level gained thereafter.'},
        {name:'Iron Skin', cost:1, req:{con:24, level:9, needs:'Hardened Skin'}, text:'+2 more max HP per level; take 3 less damage from non-magical bludgeoning, piercing, and slashing.'},
        {name:'Adamantine Skin', cost:2, req:{con:30, level:17, needs:'Iron Skin'}, text:'Add your Constitution modifier an additional time to max HP per level; Iron Skin\u2019s reduction now applies to all bludgeoning, piercing, and slashing.'}
      ]},
      { name:'Mind', ability:'WIS', items:[
        {name:'Minor Precognition', cost:1, req:{}, text:'+5 passive Perception; unseen attacks are not rolled with advantage against you.'},
        {name:'Precognition', cost:1, req:{level:9, needs:'Minor Precognition'}, text:'Cannot be surprised while conscious; advantage on Dexterity saves against effects you can see.'},
        {name:'Major Precognition', cost:1, req:{level:17, needs:'Precognition'}, text:'1/round reaction: attacks vs you at disadvantage until your next turn; 1/round advantage on one saving throw.'},
        {name:'Minor Enhanced Senses', cost:1, req:{}, text:'Blindsight 10 ft (or +10 ft if you already have blindsight).'},
        {name:'Medium Enhanced Senses', cost:1, req:{level:9, needs:'Minor Enhanced Senses'}, text:'Blindsight +20 ft; tremorsense 30 ft.'},
        {name:'Major Enhanced Senses', cost:1, req:{level:17, needs:'Medium Enhanced Senses'}, text:'Blindsight +60 ft; tremorsense 60 ft; advantage on hearing-based Perception.'}
      ]}
    ]}
],
'Shikigami User': [
  { key:'companion-7', level:7, type:'slots', name:'Shikigami Improvement',
    feature:'Shikigami Improvement',
    slots:{7:1},
    prompt:'Shikigami Improvement (7th)',
    blurb:'Your companion also gains flying speed equal to its walking speed and +1d6 force on strikes \u2014 those are automatic.',
    options:[
      {name:'Medium form', text:'Your shikigami becomes Medium.'},
      {name:'Weapon form', text:'Your shikigami can become any weapon, dealing +1d6 force damage on a hit.'}
    ]},
  { key:'companion-13-form', level:13, type:'slots', name:'Advanced Shikigami \u2014 form',
    feature:'Advanced Shikigami',
    slots:{13:1},
    prompt:'Advanced Shikigami form (13th)',
    blurb:'Strikes deal +1d6 more force (2d6 total) automatically.',
    options:[
      {name:'Large form', text:'Your shikigami becomes Large.'},
      {name:'Greater weapon form', text:'Your shikigami can become any weapon, dealing +2d6 force damage on a hit.'}
    ]},
  { key:'companion-13-stats', level:13, type:'allocate', name:'Advanced Shikigami \u2014 ability scores',
    feature:'Advanced Shikigami',
    points:4, cap:20,
    prompt:'Spread 4 points among its ability scores (max 20 each)',
    blurb:'Your shikigami\u2019s ability scores \u2014 4 points to distribute, 4 points to distribute freely.' }
],
'Scout': [
  { key:'evasion', level:15, type:'slots', name:'Evasion \u2014 second saving throw',
    feature:'Evasion',
    slots:{15:1},
    prompt:'Second Evasion saving throw',
    blurb:'At 15th level, choose a second saving throw (Dexterity already covered at 7th) for the same no-damage/half-damage benefit.',
    options:[
      {name:'Strength', text:'Evasion benefit on Strength saving throws.'},
      {name:'Constitution', text:'Evasion benefit on Constitution saving throws.'},
      {name:'Intelligence', text:'Evasion benefit on Intelligence saving throws.'},
      {name:'Wisdom', text:'Evasion benefit on Wisdom saving throws.'},
      {name:'Charisma', text:'Evasion benefit on Charisma saving throws.'}
    ]}
]
};
