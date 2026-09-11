/* Ritual Archive — codex combat-role fixups.
 *
 * Eight figure techniques shipped without a combat-role string in their Part B
 * data (the L20-capstone batch). The roles below are classified from each
 * technique's actual mechanics, not invented flavor:
 *  - Shaka Zulu (Horns of the Bull): formation tactics — assigns creatures to
 *    Chest/Horns/Loins roles -> Controller
 *  - Jack the Ripper (Malicious Blessing): blesses throwable objects into
 *    weapons; Dex-based thrown-weapon skirmisher -> Striker
 *  - Qin Shi Huang (Mandate of the First Emperor): Sovereign Sight, Imperial
 *    Disruption, Celestial Reversal — imperial command over the battlefield
 *    -> Controller
 *  - Nikola Tesla (Super Automaton): Super Tesla Coils, Ground Fault —
 *    ranged lightning damage engine -> Blaster
 *  - Simo Hayha (White Death): stationary rifle sniper -> Striker
 *  - Raiden Tameemon (Hundred Seals Physique): sumo grappling body -> Tank
 *  - Okita Soji (Unlived Blade): four-stace duelist swordsmanship -> Striker
 *  - Gesar of Ling (Epic Kingship): its own L1 text reads
 *    "Tier IV Mythic - Striker/Tank" -> Striker / Tank
 *
 * Loaded after data/codex.js by builder.html and codex.html. Patches
 * window.CODEX.techniques in place so every consumer (builder picker, codex
 * filters, role buckets) sees the same roles. If the codex is ever
 * regenerated with roles present, these entries become no-ops.
 */
(function(){
  var FIXUPS={
    'shaka-zulu':'Controller',
    'jack-the-ripper':'Striker',
    'qin-shi-huang':'Controller',
    'nikola-tesla':'Blaster',
    'simo-h-yh':'Striker',
    'raiden-tameemon':'Tank',
    'okita-s-ji':'Striker',
    'gesar-of-ling':'Striker / Tank'
  };
  if(!window.CODEX||!window.CODEX.techniques) return;
  window.CODEX.techniques.forEach(function(t){
    if(FIXUPS[t.id]&&!t.role) t.role=FIXUPS[t.id];
  });
})();
