/**
 * THE NAGAI PROTOCOL — second story in the library.
 * A chrysalis of the void.
 */
(function (global) {
  'use strict';

  var story = {
    id: 'nagai-protocol',
    title: 'THE NAGAI PROTOCOL',
    epigraph: 'A chrysalis of the void.',
    blurb: 'Interstellar transit at 50g, and the boy who proved a nervous system can survive the melt.',
    words: 980,
    readingMin: 5,
    sections: [
      {
        n: 1,
        paragraphs: [
          'The fundamental problem with interstellar travel was never propulsion; it was the meat.',
          'To bridge the gulf between Sol and Epsilon Eridani within a human lifetime, a vessel must sustain continuous, punishing acceleration. The physics are unforgiving. Utilizing a catalyzed fusion drive, reaching our nearest stellar neighbors requires a ship to accelerate at 50g for years at a time. The relativistic velocity v achieved at proper time τ under constant acceleration a is dictated by the equation:',
          'v(τ) = c tanh(aτ / c)',
          'At 50g, a standard human skeleton shatters in minutes. The heart cannot pump blood; the brain hemorrhages against the skull. Cryosleep was a dead end, plagued by intracellular ice crystallization that turned gray matter to mush. If humanity was to travel to the stars, the human form could not remain solid.',
          'The solution was unearthed not by an astrophysicist, but in the forgotten archives of 2026, from a 10-year-old Japanese boy named Jo Nagai. He observed that Asian swallowtail butterflies retained memories—specifically aversion to lavender—from their time as caterpillars, despite undergoing complete biological dissolution during the pupal stage.',
          'The architects of the Exodus Project realized: the nervous system didn\'t need a rigid structure to retain consciousness. It only needed the biochemical architecture of memory to survive the melt.'
        ]
      },
      {
        n: 2,
        heading: 'PHASE I: INDUCED PUPATION',
        paragraphs: [
          'To survive a high-g interstellar transit, the colonists do not strap into acceleration couches. They enter heavily shielded, spherical vats filled with a hyper-oxygenated perfluorocarbon fluid.',
          'Once sealed, the ship\'s automated medical suite initiates the Nagai Sequence:',
          'Enzymatic Flooding: Synthetic caspases and digestive enzymes are injected directly into the colonist’s bloodstream. The epidermis dissolves first, sloughing off into the fluid.',
          'Skeletal Decalcification: Within hours, the bones lose their structural integrity, breaking down into a bio-available calcium-phosphate slurry.',
          'Neural Decentralization: The most terrifying phase. The brain does not die; it unwinds. The rigid neural pathways dissolve, and the central nervous system spreads out into a dispersed, fluid-suspended neural net—a literal soup of stem cells, raw biological matter, and specialized "imaginal discs" engineered into human DNA.',
          'By the time the fusion drive ignites and the ship experiences a crushing 50g load, the colonists are no longer bipedal primates. They are sixty liters of conscious, biological sludge, perfectly distributed against the high-gravity vectors of the acceleration tank.'
        ]
      },
      {
        n: 3,
        heading: 'PHASE II: THE TERROR OF THE CHRYSALIS',
        paragraphs: [
          'The engineers, focused purely on the mechanics of survival, severely underestimated the psychological implications of Nagai’s discovery.',
          'Nagai proved that the memory survives the metamorphosis. What the Exodus planners failed to consider was that consciousness survives the dissolution.',
          'As the ship accelerates towards a fraction of c, the colonist does not sleep. The dispersed neural net, floating in the perfluorocarbon bath, remains active. The sensory inputs are gone, but the mind remains.',
          'The Somatic Memory: You feel the exact moment your jawbone liquefies.',
          'The Formless Void: For twelve years of proper ship-time, you exist as a liquid. There is no sight, no sound, only the decentralized, omnipresent agony of being a puddle of raw, pulsing nerves subjected to the ambient vibrations of a fusion drive.',
          'Epigenetic Trauma: Because of the transgenerational epigenetic inheritance noted in Nagai\'s ancient research, the terror alters the genetic code within the imaginal discs. The fear of formlessness is burned into the biological blueprint of the next generation.'
        ]
      },
      {
        n: 4,
        heading: 'PHASE III: THE IMAGO',
        paragraphs: [
          'When the ship finally enters the Epsilon Eridani system, the deceleration phase ends. In zero gravity, the ship’s AI lowers the temperature of the vats and introduces the reconstitution hormones.',
          'The human imaginal discs activate. Drawing upon the nutrient-rich soup of their own former bodies, the colonists begin to rebuild. But they do not return as the baseline humans who left Earth. They are the Imago—the adult stage. The biological slurry weaves new, ultra-dense musculature suited for their high-gravity destination, secondary respiratory systems for the ammonia-tinged atmosphere, and redundant, armored organs.',
          'The vats drain. The newly formed colonists tear their way out of the amniotic sacs, slick with amniotic fluid and the residual detritus of their caterpillar stage.',
          'They are biologically perfect for their new world. But as they open their newly formed, compound-adapted eyes, the screams begin. They possess the pristine, unfragmented memories of the last twelve years. They remember every second of the dark. They remember being unmade. They remember the absolute, suffocating terror of existing as a conscious liquid.',
          'We found a way to reach the stars, exactly as the boy’s butterflies reached the sky. But we are no longer human. We are traumatized insects, trapped in a cycle of melting and screaming, forever haunted by the memory of the chrysalis.'
        ]
      }
    ]
  };

  global.IBMStories = global.IBMStories || { catalog: [] };
  global.IBMStories.catalog.push(story);
  global.IBMStories.byId = global.IBMStories.byId || {};
  global.IBMStories.byId[story.id] = story;
})(typeof window !== 'undefined' ? window : globalThis);
