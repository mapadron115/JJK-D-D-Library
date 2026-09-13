/* Backgrounds from JJK 5e V.6 Chapter 4.1 (canon-only; V.6 adds Freelance and
   Window to the three V.3 backgrounds). featCat keys into window.GENERAL_FEATS;
   'innate' reuses the chosen technique's Innate Technique Feats picker. */
window.BACKGROUNDS = [
  {
    id: 'clan-sorcerer',
    name: 'Clan Sorcerer',
    desc: 'You have spent your life as a sorcerer being part of a clan. You are well-versed in manipulating Cursed Energy, and you also possess great mastery over your innate technique. You are not necessarily well-treated or even particularly well-liked within your clan.',
    featCat: 'innate',
    featLabel: 'Pick one Innate Technique feat',
    skills: ['Insight', 'History'],
    tool: null,
    equipment: ['A clan symbol (a gift to you as part of your clan)', 'A technique manual', 'Formal clothing', 'A set of common clothes', 'Wallet containing $1,500'],
    featureName: 'Family Ties',
    featureText: 'As a Clan Sorcerer, you command the respect of those in Sorcery, and you are an effective sorcerer. You and your companions can expect to receive help from people who like your family.'
  },
  {
    id: 'genius',
    name: 'Genius',
    desc: 'You are someone who was raised with a notion of greatness about you. Always placed on a pedestal above your peers for your intelligence, skills, or natural-born ability. Before coming to Jujutsu Tech, you had such an aptitude for success that strangers, parents, and teachers alike all placed you in a league of your own. You have proven that to be the case up until now and will likely continue to prove it moving forward. Whether you choose to continue the path assumed you would, or shift focus is your own choice. You have both good and bad experiences with this assumption of genius about you. Memories like these are something you may cherish or despise, but you are a Genius through and through.',
    featCat: 'skill',
    featLabel: 'Pick one Skill feat',
    skills: ['Arcana', 'Athletics'],
    tool: null,
    equipment: ['One letter of recommendation passed down to you from someone of importance', '1 Blank Scroll', 'Wallet containing $1,000'],
    featureName: 'Meeting Expectations',
    featureText: 'You always seem to rise to the expectations of others during a challenge. When confronted with a difficult situation, you seem to gain insight after just one attempt, passing or failing it. This insight is a hint at how this particular challenge does or doesn\u2019t work, that others around you may not understand.'
  },
  {
    id: 'hard-worker',
    name: 'Hard Worker',
    desc: 'You were someone who always had to prove to themselves and others that you are worth your weight and space. You always had to work twice as hard and twice as long to see results, but the results are beginning to show. You never had the natural talent of your peers \u2014 no, you had peerless determination and persistence to push through all of the challenges you were faced with to make it to this point, while also looking forward to the next day to get better. You have reached a level of discipline that your peers can\u2019t imagine, so you can keep up your training on your own time while not lagging when you do decide to take a break.',
    featCat: 'physical',
    featLabel: 'Pick one Physical feat',
    skills: ['Athletics', 'Acrobatics'],
    tool: null,
    equipment: ['Set of body weights that weigh 50+ pounds (for each part of your body)', '3 books containing training strategies', 'Training gi', 'Wallet containing $1,000'],
    featureName: 'Focus and Grit',
    featureText: 'You have trained yourself in such a way that you have absorbed multiple tomes of knowledge in whatever you worked your butt off to excel in. You are able to quickly bond with people who have the same drive and determination as you and even garner immediate audiences and conversations with those people. You are also able to reference and call out different books, strategies, and texts to catch the attention of those who have read those texts or follow those strategies.'
  },
  {
    id: 'freelance',
    name: 'Freelance',
    desc: 'Whether you are a first generation sorcerer born to a normal family or someone who split away from the jujutsu world to become an illegal curse user, you have learned to survive without the backing of a clan or the approval of the higher-ups. The world is vast beyond the walls of the schools, and not every sorcerer chooses \u2014 or is allowed \u2014 to live under their watchful eyes. Some Freelancers are wanderers, exorcising curses in forgotten villages or protecting those too poor to afford official aid. Others drift into the underbelly of the jujutsu world, selling techniques, cursed tools, or information to whoever can pay. Without the structure of the clans or the bureaucracy of the schools, you rely on your own wit and adaptability. You make connections where you can, trust few, and keep your head down when the higher-ups come sniffing around.',
    featCat: 'ce',
    featLabel: 'Pick one Cursed Energy feat',
    skills: ['Perception', 'Deception'],
    tool: { choice: ['Thieves\u2019 Tools', 'Disguise Kit'] },
    equipment: ['Set of traveler\u2019s clothes for streetwear', 'A notebook of jobs', 'A burner cellphone', 'Forgery kit or thieves\u2019 tools', 'Wallet containing $2,000'],
    featureName: 'Independent Network',
    featureText: 'Years spent working outside official channels have given you access to an informal web of contacts: smugglers, minor sorcerers, black-market exorcists, and ordinary citizens who owe you a favor. You can usually find information, shelter, or supplies through this network when operating in a city or settlement, even if it\u2019s unofficial or risky. You can also identify whether a community is under the influence of jujutsu authorities or illegal curse activity within a few hours of arriving, letting you decide which side to approach or avoid first.'
  },
  {
    id: 'window',
    name: 'Window',
    desc: 'Windows are the eyes and ears of the jujutsu society, monitoring spiritual activity, identifying incidents, and supporting exorcists in the field. Most Windows are civilians with just enough cursed energy to see curses, while others may be failed sorcerers who could not handle field assignments and now handle deploying veils. Though you may initially lack the power to destroy curses yourself, your vigilance and courage allow others to act before it\u2019s too late.',
    featCat: 'barrier',
    featLabel: 'Pick one Barrier feat',
    skills: ['Persuasion', 'Investigation'],
    tool: { fixed: 'Calligrapher\u2019s Tools' },
    equipment: ['Set of fine clothes for work', 'A pair of cursed glasses that let you see curses', 'Calligrapher\u2019s tools', 'Wallet containing $1,000'],
    featureName: 'In the System',
    featureText: 'You are recognized by the jujutsu community as a trained observer. You know how to file reports, contact field agents, and navigate the bureaucratic maze between exorcists, schools, and local authorities. You can usually gain an audience with a jujutsu operative or access to minor restricted areas where supernatural activity is being investigated. When you\u2019re in a new area, you can quickly locate the nearest contact point, safe zone, or local informant tied to curse management. Those in the know may not trust you, but they\u2019ll usually hear you out before turning you away.'
  }
];
