export const toB64ImageUrl = (b64Data, ext) => 'data:image/' + ext + ';base64,' + b64Data;

// 1x1 transparent png pixel
export const EMPTY_IMAGE_B64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==";
export const EMPTY_IMAGE_URL = toB64ImageUrl(EMPTY_IMAGE_B64, 'png');

export const GameResourceType = {
  Card: 'Card',
  MapSection: 'MapSection',
  Terrain: 'Terrain',
  Location: 'Location',
  Enemy: 'Enemy',
  Follower: 'Follower',
  Scoring: 'Scoring',
  Blessing: 'Blessing',
  Rewards: 'Rewards',
  Oath: 'Oath',
  Character: 'Character',
  Scenario: 'Scenario',
  ScenarioExtension: 'ScenarioExtension',
  Language: 'Language'
}

// List of resources for the game
// https://paladinsoath.fandom.com/wiki/Paladin%27s_Oath_Wiki
export const GameResources = {
  [GameResourceType.Card]: {
    card_fury: {
      id: 'card_fury',
      name: '[Action (Starter)] Fury',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/46/Fury.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_iron_resolve: {
      id: 'card_iron_resolve',
      name: '[Action (Starter)] Iron Resolve',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/35/Iron_resolve.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_frenzy: {
      id: 'card_frenzy',
      name: '[Action (Starter)] Frenzy',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f1/Frenzy.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_wayfinding: {
      id: 'card_wayfinding',
      name: '[Action (Starter)] Wayfinding',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/08/Wayfinding.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_endurance: {
      id: 'card_endurance',
      name: '[Action (Starter)] Endurance',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/0a/Endurance.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_prayer_of_healing: {
      id: 'card_prayer_of_healing',
      name: '[Action (Starter)] Prayer of Healing',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/74/Prayer_of_healing.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_honour: {
      id: 'card_honour',
      name: '[Action (Starter)] Honour',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/10/Honour.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_contract: {
      id: 'card_contract',
      name: '[Action (Starter)] Contract',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/45/Contract.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_arcane_crafting: {
      id: 'card_arcane_crafting',
      name: '[Action (Starter)] Arcane Crafting',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/23/Arcane_crafting.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_arcane_source: {
      id: 'card_arcane_source',
      name: '[Action (Starter)] Arcane Source',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/af/Arcane_source.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_arcane_language: {
      id: 'card_arcane_language',
      name: '[Action (Starter)] Arcane Language',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b2/Arcane_language.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_preparation: {
      id: 'card_preparation',
      name: '[Action (Starter)] Preparation',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/aa/Preparation.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_arcane_mastery: {
      id: 'card_arcane_mastery',
      name: '[Action (Starter)] Arcane Mastery',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/9e/Arcane_mastery.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_righteousness: {
      id: 'card_righteousness',
      name: '[Action (Starter)] Righteousness',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/49/Righteousness.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_cold_mastery: {
      id: 'card_cold_mastery',
      name: '[Action (Starter)] Cold Mastery',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/bf/Cold_mastery.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_battlemaster: {
      id: 'card_battlemaster',
      name: '[Action (Starter)] Battlemaster',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/18/Battlemaster.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_crystal_source: {
      id: 'card_crystal_source',
      name: '[Action (Starter)] Crystal Source',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d3/Crystal_source.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_goodberry: {
      id: 'card_goodberry',
      name: '[Action (Starter)] Goodberry',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/9a/Goodberry.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_versatility: {
      id: 'card_versatility',
      name: '[Action (Starter)] Versatility',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/91/Versatility.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_arcane_control: {
      id: 'card_arcane_control',
      name: '[Action (Starter)] Arcane Control',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/8b/Arcane_control.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_acrobatics: {
      id: 'card_acrobatics',
      name: '[Action (Starter)] Acrobatics',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/db/Acrobatics.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_forced_march: {
      id: 'card_forced_march',
      name: '[Action (Starter)] Forced March',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a2/Forced_march.png',
      properties: {
        cardType: 'Action',
        isStarter: true,
        groupingKey: 'Action (Starter)',
      },
    },
    card_pyrokinesis: {
      id: 'card_pyrokinesis',
      name: '[Action] Pyrokinesis',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/5e/Pyrokinesis.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_ice_manipulation: {
      id: 'card_ice_manipulation',
      name: '[Action] Ice Manipulation',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/4f/Ice_Manipulation.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_invocation: {
      id: 'card_invocation',
      name: '[Action] Invocation',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/bd/Invocation.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_telekinesis_bolt: {
      id: 'card_telekinesis_bolt',
      name: '[Action] Telekinesis Bolt',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/27/Telekinesis_Bolt.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_berserk: {
      id: 'card_berserk',
      name: '[Action] Berserk',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/44/Berserk.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_frost_saturation: {
      id: 'card_frost_saturation',
      name: '[Action] Frost Saturation',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/62/Frost_Saturation.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_prowess: {
      id: 'card_prowess',
      name: '[Action] Prowess',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e6/Prowess.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_regeneration: {
      id: 'card_regeneration',
      name: '[Action] Regeneration',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/53/Regeneration.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_subdue: {
      id: 'card_subdue',
      name: '[Action] Subdue',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/89/Subdue.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_ice_dash: {
      id: 'card_ice_dash',
      name: '[Action] Ice Dash',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/51/Ice_dash.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_cloud_walking: {
      id: 'card_cloud_walking',
      name: '[Action] Cloud Walking',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/17/Cloud_Walking.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_summon_mount: {
      id: 'card_summon_mount',
      name: '[Action] Summon Mount',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e8/Summon_mount.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_sanguine_evocation: {
      id: 'card_sanguine_evocation',
      name: '[Action] Sanguine Evocation',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/74/Sanguine_evocation.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_incarnum: {
      id: 'card_incarnum',
      name: '[Action] Incarnum',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/bb/Incarnum.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_life_transference: {
      id: 'card_life_transference',
      name: '[Action] Life Transference',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/5a/Life_transference.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_tireless: {
      id: 'card_tireless',
      name: '[Action] Tireless',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f1/Tireless.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_scare_tactics: {
      id: 'card_scare_tactics',
      name: '[Action] Scare Tactics',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7b/Scare_tactics.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_blood_pact: {
      id: 'card_blood_pact',
      name: '[Action] Blood Pact',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/ae/Blood_pact.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_entropy_manipulation: {
      id: 'card_entropy_manipulation',
      name: '[Action] Entropy Manipulation',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/0d/Entropy_manipulation.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_indomitable_rage: {
      id: 'card_indomitable_rage',
      name: '[Action] Indomitable Rage',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/0a/Indomitable_rage.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_riposte: {
      id: 'card_riposte',
      name: '[Action] Riposte',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/de/Riposte.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_transmutation: {
      id: 'card_transmutation',
      name: '[Action] Transmutation',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/cd/Transmutation.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_rooted_faith: {
      id: 'card_rooted_faith',
      name: '[Action] Rooted Faith',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d3/Rooted_faith.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_mana_abjuration: {
      id: 'card_mana_abjuration',
      name: '[Action] Mana Abjuration',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/db/Mana_abjuration.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_glorious_death: {
      id: 'card_glorious_death',
      name: '[Action] Glorious Death',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/4c/Glorious_Death.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_power_word: {
      id: 'card_power_word',
      name: '[Action] Power Word',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e0/Power_word.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_flesh_to_stone: {
      id: 'card_flesh_to_stone',
      name: '[Action] Flesh to Stone',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/69/Flesh_to_stone.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_lightning_blast: {
      id: 'card_lightning_blast',
      name: '[Action] Lightning Blast',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/08/Lightning_blast.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_arcane_mimicry: {
      id: 'card_arcane_mimicry',
      name: '[Action] Arcane Mimicry',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d4/Arcane_mimicry.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_archetype: {
      id: 'card_archetype',
      name: '[Action] Archetype',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b2/Archetype.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_ascension: {
      id: 'card_ascension',
      name: '[Action] Ascension',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/cb/Ascension.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_blood_rite: {
      id: 'card_blood_rite',
      name: '[Action] Blood Rite',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/cb/Blood_rite.png',
      properties: {
        cardType: 'Action',
        isStarter: false,
        groupingKey: 'Action',
      },
    },
    card_fire_artillery: {
      id: 'card_fire_artillery',
      name: '[Spell] Fire Artillery',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f8/Fire_artillery.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_arctic_reckoning: {
      id: 'card_arctic_reckoning',
      name: '[Spell] Arctic Reckoning',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/0b/Artic_reckoning.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_enfeeble: {
      id: 'card_enfeeble',
      name: '[Spell] Enfeeble',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/26/Enfeeble.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_shock_wave: {
      id: 'card_shock_wave',
      name: '[Spell] Shockwave',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/65/Shockwave.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_pyrokinetic_combat: {
      id: 'card_pyrokinetic_combat',
      name: '[Spell] Pyrokinetic Combat',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/75/Pyrokinetic_combat.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_astral_rift: {
      id: 'card_astral_rift',
      name: '[Spell] Astral Rift',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e1/Astral_rift.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_cloud_kill: {
      id: 'card_cloud_kill',
      name: '[Spell] Cloud Kill',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e0/Cloud_kill.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_fire_ward: {
      id: 'card_fire_ward',
      name: '[Spell] Fire Ward',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e9/Fire_ward.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_glacial_heart: {
      id: 'card_glacial_heart',
      name: '[Spell] Glacial Heart',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/25/Glacial_heart.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_levitate: {
      id: 'card_levitate',
      name: '[Spell] Levitate',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/ad/Levitate.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_sylvanism: {
      id: 'card_sylvanism',
      name: '[Spell] Sylvanism',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/db/Sylvanism.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_impurity_destruction: {
      id: 'card_impurity_destruction',
      name: '[Spell] Impurity Destruction',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/2c/Impurity_destruction.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_crystal_siege: {
      id: 'card_crystal_siege',
      name: '[Spell] Crystal Siege',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7f/Crystal_siege.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_ethereal_form: {
      id: 'card_ethereal_form',
      name: '[Spell] Ethereal Form',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/ae/Ethereal_form.png',
      properties: {
        cardType: 'Spell',
        isStarter: false,
        groupingKey: 'Spell',
      },
    },
    card_mark_of_the_tyrant: {
      id: 'card_mark_of_the_tyrant',
      name: '[Relic] Mark of the Tyrant',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/8c/Mark_of_the_tyrant.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_angelic_tears: {
      id: 'card_angelic_tears',
      name: '[Relic] Angelic Tears',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f0/Angelic_tears.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_crimson_shroud: {
      id: 'card_crimson_shroud',
      name: '[Relic] Crimson Shroud',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/fe/Crimson_shroud.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_cerulean_mantle: {
      id: 'card_cerulean_mantle',
      name: '[Relic] Cerulean Mantle',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d9/Cerulean_mantle.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_silvermoon_cloak: {
      id: 'card_silvermoon_cloak',
      name: '[Relic] Silvermoon Cloak',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a2/Silvermoon_cloak.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_smaragdine_cape: {
      id: 'card_smaragdine_cape',
      name: '[Relic] Smaragdine Cape',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/fb/Smaragdine_cape.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_holy_slayer_ring: {
      id: 'card_holy_slayer_ring',
      name: '[Relic] Holy Slayer Ring',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f6/Holy_slayer_ring.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_ethereal_crucifix: {
      id: 'card_ethereal_crucifix',
      name: '[Relic] Ethereal Crucifix',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/60/Ethereal_crucifix.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_sacred_scroll: {
      id: 'card_sacred_scroll',
      name: '[Relic] Sacred Scroll',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/eb/Sacred_scroll.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_conjurer_writ: {
      id: 'card_conjurer_writ',
      name: '[Relic] Writ of the Conjurer',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/17/Conjurer_writ.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_chalice_of_power: {
      id: 'card_chalice_of_power',
      name: '[Relic] Chalice of Power',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b4/Chalice_of_power.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_holy_shield: {
      id: 'card_holy_shield',
      name: '[Relic] Holy Shield',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b1/Holy_shield.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
    card_shadow_puppets: {
      id: 'card_shadow_puppets',
      name: '[Relic] Shadow Puppets',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/9c/Shadow_puppets.png',
      properties: {
        cardType: 'Relic',
        isStarter: false,
        groupingKey: 'Relic',
      },
    },
  },
  [GameResourceType.MapSection]: {
    map_section_reg_1: {
      id: 'map_section_reg_1',
      name: '[Regular] 1',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/53/Map_section_reg_1.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_2: {
      id: 'map_section_reg_2',
      name: '[Regular] 2',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a6/Map_section_reg_2.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_3: {
      id: 'map_section_reg_3',
      name: '[Regular] 3',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7b/Map_section_reg_3.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_4: {
      id: 'map_section_reg_4',
      name: '[Regular] 4',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/eb/Map_section_reg_4.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_5: {
      id: 'map_section_reg_5',
      name: '[Regular] 5',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/19/Map_section_reg_5.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_6: {
      id: 'map_section_reg_6',
      name: '[Regular] 6',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/08/Map_section_reg_6.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_7: {
      id: 'map_section_reg_7',
      name: '[Regular] 7',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/ac/Map_section_reg_7.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_8: {
      id: 'map_section_reg_8',
      name: '[Regular] 8',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/ce/Map_section_reg_8.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_9: {
      id: 'map_section_reg_9',
      name: '[Regular] 9',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/1e/Map_section_reg_9.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_10: {
      id: 'map_section_reg_10',
      name: '[Regular] 10',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/38/Map_section_reg_10.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_11: {
      id: 'map_section_reg_11',
      name: '[Regular] 11',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/65/Map_section_reg_11.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_12: {
      id: 'map_section_reg_12',
      name: '[Regular] 12',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/56/Map_section_reg_12.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_13: {
      id: 'map_section_reg_13',
      name: '[Regular] 13',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/27/Map_section_reg_13.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_reg_14: {
      id: 'map_section_reg_14',
      name: '[Regular] 14',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/9e/Map_section_reg_14.png',
      properties: {
        sectionType: 'Regular',
        groupingKey: 'Regular',
      },
    },
    map_section_core_1: {
      id: 'map_section_core_1',
      name: '[Core] 1',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a9/Map_section_core_1.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Core',
      },
    },
    map_section_core_2: {
      id: 'map_section_core_2',
      name: '[Core] 2',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/88/Map_section_core_2.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Core',
      },
    },
    map_section_core_3: {
      id: 'map_section_core_3',
      name: '[Core] 3',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c0/Map_section_core_3.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Core',
      },
    },
    map_section_core_4: {
      id: 'map_section_core_4',
      name: '[Core] 4',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e5/Map_section_core_4.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Core',
      },
    },
    map_section_core_5: {
      id: 'map_section_core_5',
      name: '[Core] 5',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/5a/Map_section_core_5.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Core',
      },
    },
    map_section_core_6: {
      id: 'map_section_core_6',
      name: '[Core] 1',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/09/Map_section_core_6.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Core',
      },
    },
    map_section_core_special_citadel_w: {
      id: 'map_section_core_special_citadel_w',
      name: '[Special] White Citadel',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c5/Map_section_core_special_citadel_w.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Citadel',
      },
    },
    map_section_core_special_citadel_b: {
      id: 'map_section_core_special_citadel_b',
      name: '[Special] Blue Citadel',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/46/Map_section_core_special_citadel_b.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Citadel',
      },
    },
    map_section_core_special_citadel_g: {
      id: 'map_section_core_special_citadel_g',
      name: '[Special] Green Citadel',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/0e/Map_section_core_special_citadel_g.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Citadel',
      },
    },
    map_section_core_special_citadel_r: {
      id: 'map_section_core_special_citadel_r',
      name: '[Special] Red Citadel',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/20/Map_section_core_special_citadel_r.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Citadel',
      },
    },
    map_section_core_special_camp: {
      id: 'map_section_core_special_camp',
      name: '[Special] Camp',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d2/Map_section_core_special_camp.png',
      properties: {
        sectionType: 'Core',
        groupingKey: 'Special',
      },
    },
    map_section_starter_circular: {
      id: 'map_section_starter_circular',
      name: '[Starter] Circular',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/be/Map_section_starter_circular.png',
      properties: {
        sectionType: 'Starter',
        groupingKey: 'Starter',
      },
    },
    map_section_starter_cone: {
      id: 'map_section_starter_cone',
      name: '[Starter] Cone',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f1/Map_section_starter_cone.png',
      properties: {
        sectionType: 'Starter',
        groupingKey: 'Starter',
      },
    },
    map_section_starter_corridor: {
      id: 'map_section_starter_corridor',
      name: '[Starter] Corridor',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/28/Map_section_starter_corridor.png',
      properties: {
        sectionType: 'Starter',
        groupingKey: 'Starter',
      },
    },
    map_section_starter_corridor_tight: {
      id: 'map_section_starter_corridor_tight',
      name: '[Starter] Corridor Tight',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/9d/Map_section_starter_corridor_tight.png',
      properties: {
        sectionType: 'Starter',
        groupingKey: 'Starter',
      },
    },
  },
  [GameResourceType.Terrain]: {
    terrain__desert: {
      id: 'terrain__desert',
      name: 'Desert [5/3]',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/45/Desert_tile.png',
      properties: {},
    },
    terrain__forest: {
      id: 'terrain__forest',
      name: 'Forest [3/5]',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/ff/Forest_tile.png',
      properties: {},
    },
    terrain__hills: {
      id: 'terrain__hills',
      name: 'Hills [3/3]',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/3c/Hills_tile.png',
      properties: {},
    },
    terrain__lake: {
      id: 'terrain__lake',
      name: 'Lake [X/X]',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e5/Lake_tile.png',
      properties: {},
    },
    terrain__marsh: {
      id: 'terrain__marsh',
      name: 'Marsh [4/4]',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/34/Marsh_tile.png',
      properties: {},
    },
    terrain__mountains: {
      id: 'terrain__mountains',
      name: 'Mountains [X/X]',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d2/Mountains_tile.png',
      properties: {},
    },
    terrain__plains: {
      id: 'terrain__plains',
      name: 'Plains [2/2]',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c8/Plains_tile.png',
      properties: {},
    },
    terrain__swamp: {
      id: 'terrain__swamp',
      name: 'Swamp [5/5]',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/6d/Swamp_tile.png',
      properties: {},
    },
  },
  [GameResourceType.Location]: {
    location_krak: {
      id: 'location_krak',
      name: 'Krak',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/da/Krak1_icon.png',
      properties: {},
    },
    location_spire: {
      id: 'location_spire',
      name: 'Spire',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/86/Spire1_icon.png',
      properties: {},
    },
    location_citadel_blue: {
      id: 'location_citadel_blue',
      name: 'Citadel of Scahyrst (Blue)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/89/Citadel_icon_%28Blue%29.png',
      properties: {},
    },
    location_citadel_red: {
      id: 'location_citadel_red',
      name: 'Citadel of Mistmoor (Red)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/0f/Citadel_icon_%28Red%29.png',
      properties: {},
    },
    location_citadel_green: {
      id: 'location_citadel_green',
      name: 'Citadel of Valmynne (Green)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b4/Citadel_icon_%28Green%29.png',
      properties: {},
    },
    location_citadel_white: {
      id: 'location_citadel_white',
      name: 'Citadel of Barad (White)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/07/Citadel_icon_%28White%29.png',
      properties: {},
    },
    location_labyrinth: {
      id: 'location_labyrinth',
      name: 'Labyrinth',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c9/Labyrinth1_icon.png',
      properties: {},
    },
    location_maze: {
      id: 'location_maze',
      name: 'Maze',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f4/Maze1_icon.png',
      properties: {},
    },
    location_tomb: {
      id: 'location_tomb',
      name: 'Tomb',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/6b/Tomb1_icon.png',
      properties: {},
    },
    location_ruins: {
      id: 'location_ruins',
      name: 'Ruins',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/ec/Ruins1_icon.png',
      properties: {},
    },
    location_dungeon: {
      id: 'location_dungeon',
      name: 'Dungeon',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/9a/Dungeon1_icon.png',
      properties: {},
    },
    location_hideout: {
      id: 'location_hideout',
      name: 'Hideout',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7a/Hideout1_icon.png',
      properties: {},
    },
    location_hallowed: {
      id: 'location_hallowed',
      name: 'Hallowed Site',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f8/Hallowed1_icon.png',
      properties: {},
    },
    location_portal: {
      id: 'location_portal',
      name: 'Portal',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7b/Portal1_icon.png',
      properties: {},
    },
    location_village: {
      id: 'location_village',
      name: 'Village',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/63/Village1_icon.png',
      properties: {},
    },
    location_market: {
      id: 'location_market',
      name: 'Bazaar',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/ef/Market1_icon.png',
      properties: {},
    },
    location_source: {
      id: 'location_source',
      name: 'Source',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/5c/Source1_icon.png',
      properties: {},
    },
    location_mine_b: {
      id: 'location_mine_b',
      name: 'Mine (Blue)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a1/Mine1_icon.png',
      properties: {},
    },
    location_mine_g: {
      id: 'location_mine_g',
      name: 'Mine (Green)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a1/Mine1_icon.png',
      properties: {},
    },
    location_mine_r: {
      id: 'location_mine_r',
      name: 'Mine (Red)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a1/Mine1_icon.png',
      properties: {},
    },
    location_mine_w: {
      id: 'location_mine_w',
      name: 'Mine (White)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a1/Mine1_icon.png',
      properties: {},
    },
    location_mine_deep_gb: {
      id: 'location_mine_deep_gb',
      name: 'Deep Mine (Green/Blue)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a1/Mine1_icon.png',
      properties: {},
    },
    location_mine_deep_rw: {
      id: 'location_mine_deep_rw',
      name: 'Deep Mine (Red/White)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a1/Mine1_icon.png',
      properties: {},
    },
    location_mine_deep_rgbw: {
      id: 'location_mine_deep_rgbw',
      name: 'Deep Mine (Red/Green/Blue/White)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a1/Mine1_icon.png',
      properties: {},
    },
    location_temple: {
      id: 'location_temple',
      name: 'Temple',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c4/Temple1_icon.png',
      properties: {},
    },
  },
  [GameResourceType.Enemy]: {
    enemy_apterix: {
      id: 'enemy_apterix',
      name: 'Apterix',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/3c/Apterix.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_arachnophagous: {
      id: 'enemy_arachnophagous',
      name: 'Arachnophagous',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b9/Arachnophagous.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_baneshrub: {
      id: 'enemy_baneshrub',
      name: 'Baneshrub',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/af/Baneshrub.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_brutalisk: {
      id: 'enemy_brutalisk',
      name: 'Brutalisk',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/ba/Brutalisk.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_bulwarg: {
      id: 'enemy_bulwarg',
      name: 'Bulwarg',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b2/Bulwarg.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_burrower: {
      id: 'enemy_burrower',
      name: 'Burrower',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b6/Burrower.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_chamcha: {
      id: 'enemy_chamcha',
      name: 'Chamcha',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c8/Chamcha.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_colossus: {
      id: 'enemy_colossus',
      name: 'Colossus',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/bb/Colossus.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_doryphoros: {
      id: 'enemy_doryphoros',
      name: 'Doryphoros',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/71/Doryphoros.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_dunkun: {
      id: 'enemy_dunkun',
      name: 'Dunkun',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7b/Dunkun.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_fizzog: {
      id: 'enemy_fizzog',
      name: 'Fizzog',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/1b/Fizzog.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_flub: {
      id: 'enemy_flub',
      name: 'Flub',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/91/Flub.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_jawa: {
      id: 'enemy_jawa',
      name: 'Jawa',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a6/Jawa.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_kopros: {
      id: 'enemy_kopros',
      name: 'Kopros',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c0/Korpros.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_kromalgor: {
      id: 'enemy_kromalgor',
      name: 'Kromalgor',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/89/Kromalgor.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_lich: {
      id: 'enemy_lich',
      name: 'Lich',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/86/Lich.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_mortician: {
      id: 'enemy_mortician',
      name: 'Mortician',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a8/Mortician.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_varloam: {
      id: 'enemy_varloam',
      name: 'Varloam',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/4f/Varloam.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_varmintide: {
      id: 'enemy_varmintide',
      name: 'Varmintide',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e3/Varmintide.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_zelisk: {
      id: 'enemy_zelisk',
      name: 'Zelisk',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/5c/Zelisk.png',
      properties: {
        enemyType: 'enemy_type_vermling',
        groupingKey: 'Vermling',
      },
    },
    enemy_crystalisk: {
      id: 'enemy_crystalisk',
      name: 'Crystalisk',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f9/Crystalisk.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_ebonum: {
      id: 'enemy_ebonum',
      name: 'Ebonum',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/36/Ebonum.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_leaflet: {
      id: 'enemy_leaflet',
      name: 'Leaflet',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/55/Leaflet.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_methraton: {
      id: 'enemy_methraton',
      name: 'Methraton',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/1c/Methraton.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_protector: {
      id: 'enemy_protector',
      name: 'Protector',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/cc/Protector.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_sage: {
      id: 'enemy_sage',
      name: 'Sage',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f8/Sage.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_slavist: {
      id: 'enemy_slavist',
      name: 'Slavist',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/af/Slavist.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_tegrophant: {
      id: 'enemy_tegrophant',
      name: 'Tegrophant',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/19/Tegrophant.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_timid: {
      id: 'enemy_timid',
      name: 'Timid',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/27/Timid.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_warden: {
      id: 'enemy_warden',
      name: 'Warden',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a5/Warden.png',
      properties: {
        enemyType: 'enemy_type_guardian',
        groupingKey: 'Guardian',
      },
    },
    enemy_apparition: {
      id: 'enemy_apparition',
      name: 'Apparition',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f5/Apparition.png',
      properties: {
        enemyType: 'enemy_type_arcanum',
        groupingKey: 'Arcanum',
      },
    },
    enemy_arachnean: {
      id: 'enemy_arachnean',
      name: 'Arachnean',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7e/Arachnean.png',
      properties: {
        enemyType: 'enemy_type_arcanum',
        groupingKey: 'Arcanum',
      },
    },
    enemy_custodian: {
      id: 'enemy_custodian',
      name: 'Custodian',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/83/Custodian.png',
      properties: {
        enemyType: 'enemy_type_arcanum',
        groupingKey: 'Arcanum',
      },
    },
    enemy_djinn: {
      id: 'enemy_djinn',
      name: 'Djinn',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c4/Djinn.png',
      properties: {
        enemyType: 'enemy_type_arcanum',
        groupingKey: 'Arcanum',
      },
    },
    enemy_genie: {
      id: 'enemy_genie',
      name: 'Genie',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/8c/Genie.png',
      properties: {
        enemyType: 'enemy_type_arcanum',
        groupingKey: 'Arcanum',
      },
    },
    enemy_hag: {
      id: 'enemy_hag',
      name: 'Hag',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/de/Hag.png',
      properties: {
        enemyType: 'enemy_type_arcanum',
        groupingKey: 'Arcanum',
      },
    },
    enemy_harvester: {
      id: 'enemy_harvester',
      name: 'Harvester',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b7/Harvester.png',
      properties: {
        enemyType: 'enemy_type_arcanum',
        groupingKey: 'Arcanum',
      },
    },
    enemy_tuth: {
      id: 'enemy_tuth',
      name: 'Tuth',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c2/Tuth.png',
      properties: {
        enemyType: 'enemy_type_arcanum',
        groupingKey: 'Arcanum',
      },
    },
    enemy_abherration: {
      id: 'enemy_abherration',
      name: 'Abherration',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/21/Abherration.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_ancient_keeper: {
      id: 'enemy_ancient_keeper',
      name: 'Ancient Keeper',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/ad/Ancient_keeper.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_dragonkin: {
      id: 'enemy_dragonkin',
      name: 'Dragonkin',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/aa/Dragon_kin.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_emissary: {
      id: 'enemy_emissary',
      name: 'Emissary',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/bc/Emissary.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_flagellant: {
      id: 'enemy_flagellant',
      name: 'Flagellant',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/94/Flagellant.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_gorgon: {
      id: 'enemy_gorgon',
      name: 'Gorgon',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/03/Gorgon.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_iron_forge: {
      id: 'enemy_iron_forge',
      name: 'Iron Forge',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/6f/Iron_forge.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_kriss: {
      id: 'enemy_kriss',
      name: 'Kriss',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7d/Kriss.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_lilith: {
      id: 'enemy_lilith',
      name: 'Lilith',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7e/Lilith.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_lychen: {
      id: 'enemy_lychen',
      name: 'Lychen',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/fe/Lychen.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_observer: {
      id: 'enemy_observer',
      name: 'Observer',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d3/Observer.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_ooze: {
      id: 'enemy_ooze',
      name: 'Ooze',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/50/Ooze.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_primal_vampire: {
      id: 'enemy_primal_vampire',
      name: 'Primal Vampire',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/78/Primal_vampire.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_tokoloshe: {
      id: 'enemy_tokoloshe',
      name: 'Tokoloshe',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/03/Tokoloshe.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_werewolf: {
      id: 'enemy_werewolf',
      name: 'Werewolf',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f5/Werewolf.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_xenogog: {
      id: 'enemy_xenogog',
      name: 'Xenogog',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c0/Xenogog.png',
      properties: {
        enemyType: 'enemy_type_abomination',
        groupingKey: 'Abomination',
      },
    },
    enemy_abyss_sentry: {
      id: 'enemy_abyss_sentry',
      name: 'Abyss Sentry',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/4b/Abyss_sentry.png',
      properties: {
        enemyType: 'enemy_type_abyssal',
        groupingKey: 'Abyssal',
      },
    },
    enemy_berserker: {
      id: 'enemy_berserker',
      name: 'Berserker',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a8/Berserker.png',
      properties: {
        enemyType: 'enemy_type_abyssal',
        groupingKey: 'Abyssal',
      },
    },
    enemy_deep_seeker: {
      id: 'enemy_deep_seeker',
      name: 'Deep Seeker',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d7/Deep_seeker.png',
      properties: {
        enemyType: 'enemy_type_abyssal',
        groupingKey: 'Abyssal',
      },
    },
    enemy_molech: {
      id: 'enemy_molech',
      name: 'Molech',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/ea/Molech.png',
      properties: {
        enemyType: 'enemy_type_abyssal',
        groupingKey: 'Abyssal',
      },
    },
    enemy_night_gaunt: {
      id: 'enemy_night_gaunt',
      name: 'Night Gaunt',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/ec/Night_gaunt.png',
      properties: {
        enemyType: 'enemy_type_abyssal',
        groupingKey: 'Abyssal',
      },
    },
    enemy_reaper: {
      id: 'enemy_reaper',
      name: 'Reaper',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/6a/Reaper.png',
      properties: {
        enemyType: 'enemy_type_abyssal',
        groupingKey: 'Abyssal',
      },
    },
    enemy_sothoth: {
      id: 'enemy_sothoth',
      name: 'Sothoth',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d3/Sothoth.png',
      properties: {
        enemyType: 'enemy_type_abyssal',
        groupingKey: 'Abyssal',
      },
    },
    enemy_void_guardian: {
      id: 'enemy_void_guardian',
      name: 'Void Guardian',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/66/Void_guardian.png',
      properties: {
        enemyType: 'enemy_type_abyssal',
        groupingKey: 'Abyssal',
      },
    },
    enemy_azureus: {
      id: 'enemy_azureus',
      name: 'Azureus',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/23/Azureus.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_citrix_hound: {
      id: 'enemy_citrix_hound',
      name: 'Citrix Hound',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/13/Citrix_hound.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_fire_drake: {
      id: 'enemy_fire_drake',
      name: 'Fire Drake',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/16/Fire_drake.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_harbinger: {
      id: 'enemy_harbinger',
      name: 'Harbinger',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/38/Harbinger.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_herald: {
      id: 'enemy_herald',
      name: 'Herald',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/14/Herald.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_primeval_beast: {
      id: 'enemy_primeval_beast',
      name: 'Primeval Beast',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/1a/Primeval_beast.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_trickster: {
      id: 'enemy_trickster',
      name: 'Trickster',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/bd/Trickster.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_vermillion: {
      id: 'enemy_vermillion',
      name: 'Vermillion',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c4/Vermillion.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_viridian: {
      id: 'enemy_viridian',
      name: 'Viridian',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/63/Viridian.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_viserion: {
      id: 'enemy_viserion',
      name: 'Viserion',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c9/Viserion.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
    enemy_wild_hunt: {
      id: 'enemy_wild_hunt',
      name: 'Wild Hunt',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/86/Wild_hunt.png',
      properties: {
        enemyType: 'enemy_type_ancient',
        groupingKey: 'Ancient',
      },
    },
  },
  [GameResourceType.Follower]: {
    unit_battlehammer: {
      id: 'unit_battlehammer',
      name: 'Battlehammer',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e9/Battlehammer.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_cardinal: {
      id: 'unit_cardinal',
      name: 'Cardinal',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d2/Cardinal.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_conjurer: {
      id: 'unit_conjurer',
      name: 'Conjurer',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d4/Conjurer.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_corruptor: {
      id: 'unit_corruptor',
      name: 'Corruptor',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/ac/Corruptor.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_falconeer: {
      id: 'unit_falconeer',
      name: 'Falconeer',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/1d/Falconeer.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_high_priestess: {
      id: 'unit_high_priestess',
      name: 'High Priestess',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/cc/High_priestess.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_pacifier: {
      id: 'unit_pacifier',
      name: 'Pacifier',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/2a/Pacifier.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_plague_doctor: {
      id: 'unit_plague_doctor',
      name: 'Plague Doctor',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/47/Plague_doctor.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_radiant_servant: {
      id: 'unit_radiant_servant',
      name: 'Radiant Servant',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/91/Radiant_servant.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_scoundrel: {
      id: 'unit_scoundrel',
      name: 'Scoundrel',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/fe/Scoundrel.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_squealer: {
      id: 'unit_squealer',
      name: 'Squealer',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/50/Squealer.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_tracker: {
      id: 'unit_tracker',
      name: 'Tracker',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c5/Tracker.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_traveller: {
      id: 'unit_traveller',
      name: 'Traveller',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/4b/Traveller.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_wyvaar: {
      id: 'unit_wyvaar',
      name: 'Wyvaar',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/64/Wyvar.png',
      properties: {
        followerType: 'Basic',
        groupingKey: 'Basic',
      },
    },
    unit_pyromancer: {
      id: 'unit_pyromancer',
      name: 'Pyromancer',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/78/Pyromancer.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_pirate: {
      id: 'unit_pirate',
      name: 'Pirate',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7d/Pirate.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_artificier: {
      id: 'unit_artificier',
      name: 'Artificier',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/93/Artificier.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_boreal_brute: {
      id: 'unit_boreal_brute',
      name: 'Boreal Brute',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/23/Boreal_brute.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_coldfire_golem: {
      id: 'unit_coldfire_golem',
      name: 'Cold Fire Golem',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e4/Cold_fire_golem.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_cryoptera: {
      id: 'unit_cryoptera',
      name: 'Cryoptera',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/56/Cryoptera.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_faerie: {
      id: 'unit_faerie',
      name: 'Faerie',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/4d/Faerie.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_feeble_draaken: {
      id: 'unit_feeble_draaken',
      name: 'Feeble Draaken',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/3a/Feeble_draaken.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_eminence: {
      id: 'unit_eminence',
      name: 'Eminence',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/4c/Eminence_champion.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_hatchet: {
      id: 'unit_hatchet',
      name: 'Hatchet',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/42/Hatchet_champion.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_timnit: {
      id: 'unit_timnit',
      name: 'Timnit',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/ef/Timnit_champion.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_deacon: {
      id: 'unit_deacon',
      name: 'Deacon',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/dd/Deacon_champion.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_rain_maker: {
      id: 'unit_rain_maker',
      name: 'Rain Maker',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/49/Rain_maker.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_sylvain_guards: {
      id: 'unit_sylvain_guards',
      name: 'Sylvain Guards',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/48/Sylvain_guards.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
    unit_arcane_council: {
      id: 'unit_arcane_council',
      name: 'Arcane Council',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/0f/Arcane_council.png',
      properties: {
        followerType: 'Elite',
        groupingKey: 'Elite',
      },
    },
  },
  [GameResourceType.Scoring]: {
    score_conquered_all_citadels_15: {
      id: 'score_conquered_all_citadels_15',
      name: 'Conquered All Citadels (15)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/bc/Score_conquered_all_citadels_icon.png',
      properties: {},
    },
    score_conquered_citadels_10: {
      id: 'score_conquered_citadels_10',
      name: 'Conquered Citadel (10)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/68/Score_conquered_citadels_icon.png',
      properties: {},
    },
    score_conquered_locations: {
      id: 'score_conquered_locations',
      name: 'Conquered Locations (2)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/3e/Score_conquered_locations_icon.png',
      properties: {},
    },
    score_crystal_pairs: {
      id: 'score_crystal_pairs',
      name: 'Pair of Crystals (1)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/49/Score_crystal_pairs_icon.png',
      properties: {},
    },
    score_end_of_round_unannounced_5: {
      id: 'score_end_of_round_unannounced_5',
      name: 'End of Round Unannounced (5)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/88/Score_end_of_round_unannounced_icon.png',
      properties: {},
    },
    score_remaining_rounds_30: {
      id: 'score_remaining_rounds_30',
      name: 'Remaining Rounds (30)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/1c/Score_remaining_rounds_icon.png',
      properties: {},
    },
    score_units: {
      id: 'score_units',
      name: 'Followers (Follower Level, half if wounded)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/68/Score_units_icon.png',
      properties: {},
    },
    score_relics_2: {
      id: 'score_relics_2',
      name: 'Relic (2)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/1a/Score_relics_icon.png',
      properties: {},
    },
    score_spells_2: {
      id: 'score_spells_2',
      name: 'Spell (2)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/fa/Score_spells_icon.png',
      properties: {},
    },
    score_advanced_actions_1: {
      id: 'score_advanced_actions_1',
      name: 'Advanced Actions (1)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f3/Score_advanced_actions_icon.png',
      properties: {},
    },
    score_wounds_2: {
      id: 'score_wounds_2',
      name: 'Wounds (-2)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e2/Score_wounds_icon.png',
      properties: {},
    },
    score_xp: {
      id: 'score_xp',
      name: 'XP (1)',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d5/Score_xp_icon.png',
      properties: {},
    },
  },
  [GameResourceType.Blessing]: {
    skill_driven_by_faith: {
      id: 'skill_driven_by_faith',
      name: 'Driven By Faith',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/b5/Skill_driven_by_faith.png',
      properties: {
        description: "Move 2 (Day) or Move 1 (Night)."
      },
    },
    skill_raven_vision: {
      id: 'skill_raven_vision',
      name: 'Raven Vision',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/98/Skill_raven_vision.png',
      properties: {
        description: "Range Attack 1 (Day) or Range Attack 2 (Night)."
      },
    },
    skill_ice_whisperer: {
      id: 'skill_ice_whisperer',
      name: 'Ice Whisperer',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/f0/Skill_ice_whisperer.png',
      properties: {
        description: "Attack 2 or Frost Attack 2."
      },
    },
    skill_divine_protection: {
      id: 'skill_divine_protection',
      name: 'Divine Protection',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/5a/Skill_divine_protection.png',
      properties: {
        description: "Block 3 or, Fire or Frost Block 2."
      },
    },
    skill_purification: {
      id: 'skill_purification',
      name: 'Purification',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/ea/Skill_purification.png',
      properties: {
        description: "Reduce Enemy Armor by 1 for each Resistance they have."
      },
    },
    skill_channel_divine_essence: {
      id: 'skill_channel_divine_essence',
      name: 'Divine Essence',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/2d/Skill_channel_divine_essence.png',
      properties: {
        description: "Discard a Wound from your Hand to Draw a Card (Outside Combat)."
      },
    },
    skill_offering: {
      id: 'skill_offering',
      name: 'Offering',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/78/Skill_offering.png',
      properties: {
        description: "The default action of one Starter Card gives +2 instead of +1. Any other (non-wounds) card will give +3 instead."
      },
    },
    skill_innate_communion: {
      id: 'skill_innate_communion',
      name: 'Innate Communion',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/1d/Skill_innate_communion.png',
      properties: {
        description: "The default action of a Card gives +2 instead of +1. +3 if you didn't use any Ambient Mana this turn."
      },
    },
    skill_celestial_empowerment: {
      id: 'skill_celestial_empowerment',
      name: 'Celestial Empowerment',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a5/Skill_celestial_empowerment.png',
      properties: {
        description: "Gain a Blue Mana and Draw 2 Cards (Outside Combat)"
      },
    },
    skill_arcane_well: {
      id: 'skill_arcane_well',
      name: 'Arcane Well',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/25/Skill_arcane_source.png',
      properties: {
        description: "Generate a Mana of any color except Gold."
      },
    },
    skill_spirited_march: {
      id: 'skill_spirited_march',
      name: 'Spirited March',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/3e/Skill_spirited_march.png',
      properties: {
        description: "Move 1 for each Non-Exhausted and Non-Wounded Follower (max. 3 points)."
      },
    },
    skill_eagle_vision: {
      id: 'skill_eagle_vision',
      name: 'Eagle Vision',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/80/Skill_eagle_vision.png',
      properties: {
        description: "Range Attack 2 (Day) OR Range Attack 1 (Night)."
      },
    },
    skill_soothing_winds: {
      id: 'skill_soothing_winds',
      name: 'Soothing Winds',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/0/09/Skill_soothing_winds.png',
      properties: {
        description: "Refresh or Heal a Follower's Wound."
      },
    },
    skill_divine_aura: {
      id: 'skill_divine_aura',
      name: 'Divine Aura',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/19/Skill_divine_aura.png',
      properties: {
        description: "Leadership 3 (Day) or Leadership 2 (Night)."
      },
    },
    skill_gift_of_nature: {
      id: 'skill_gift_of_nature',
      name: 'Gift of Nature',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/5b/Skill_gift_of_nature.png',
      properties: {
        description: "Gain a Green Crystal and a White Mana."
      },
    },
    skill_call_of_nature: {
      id: 'skill_call_of_nature',
      name: 'Call of Nature',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c7/Skill_call_of_nature.png',
      properties: {
        description: "Gain a White Crystal and a Green Mana."
      },
    },
    skill_lightning_strength: {
      id: 'skill_lightning_strength',
      name: 'Lightning Strength',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/6e/Skill_lightning_strength.png',
      properties: {
        description: "Add +3 to a Follower Block or +2 to their Attack, +1 if Range (not Siege)."
      },
    },
    skill_diplomatic_aura: {
      id: 'skill_diplomatic_aura',
      name: 'Diplomatic Aura',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/38/Skill_diplomatic_aura.png',
      properties: {
        description: "Leadership 1. You can manage 1 additional Follower."
      },
    },
    skill_lightning_empowerment: {
      id: 'skill_lightning_empowerment',
      name: 'Lightning Empowerment',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e3/Skill_lightning_empowerment.png',
      properties: {
        description: "Gain a White Mana. Draw 2 Cards (Outside Combat)."
      },
    },
    skill_lightning_steps: {
      id: 'skill_lightning_steps',
      name: 'Lightning Steps',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a0/Skill_lightning_steps.png',
      properties: {
        description: "Move cost of all terrain is reduced by 2 (minimum of 1)."
      },
    },
    skill_ice_rain: {
      id: 'skill_ice_rain',
      name: 'Ice Rain',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/e1/Skill_ice_rain.png',
      properties: {
        description: "Siege Attack 1 or Siege Frost Attack 1."
      },
    },
    skill_life_elixir: {
      id: 'skill_life_elixir',
      name: 'Life Elixir',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/1/13/Skill_life_elixir.png',
      properties: {
        description: "Heal 2 (Before or After Battle)."
      },
    },
    skill_air_crafting: {
      id: 'skill_air_crafting',
      name: 'Air Crafting',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a1/Skill_air_crafting.png',
      properties: {
        description: "Gain a Blue Crystal and a White Mana Essence."
      },
    },
    skill_earth_crafting: {
      id: 'skill_earth_crafting',
      name: 'Earth Crafting',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/dd/Skill_earth_crafting.png',
      properties: {
        description: "Gain a Blue Crystal and a Green Mana Essence."
      },
    },
    skill_fire_crafting: {
      id: 'skill_fire_crafting',
      name: 'Fire Crafting',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/46/Skill_fire_crafting.png',
      properties: {
        description: "Gain a Blue Crystal and a Red Mana Essence."
      },
    },
    skill_crystallic_hypnosis: {
      id: 'skill_crystallic_hypnosis',
      name: 'Crystallic Hypnosis',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/fe/Skill_crystallic_hypnosis.png',
      properties: {
        description: "During Interactions, Leadership 1 for each distinct Crystal Colors in your Inventory."
      },
    },
    skill_wind_portal: {
      id: 'skill_wind_portal',
      name: 'Wind Portal',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/f/fc/Skill_wind_portal.png',
      properties: {
        description: "Teleport 1 Space away for Free or 2 Spaces away for 2 Movement points."
      },
    },
    skill_mana_infusion: {
      id: 'skill_mana_infusion',
      name: 'Mana Infusion',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/38/Skill_mana_infusion.png',
      properties: {
        description: "Pay a Mana and a non-wound Card to get Move 3, Leadership 3, Attack 3 or Block 3. Get +4 if the Card and Mana color match."
      },
    },
    skill_monastic_empowerment: {
      id: 'skill_monastic_empowerment',
      name: 'Monastic Empowerment',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/b/ba/Skill_monastic_empowerment.png',
      properties: {
        description: "Gain a Green Mana. Draw 2 Cards (Outside Combat)."
      },
    },
    skill_ambient_crystallization: {
      id: 'skill_ambient_crystallization',
      name: 'Ambient Crystallization',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/73/Skill_ambient_crystallization.png',
      properties: {
        description: "Generate a Crystal of the same color as an Ambient Mana."
      },
    },
    skill_dark_vision: {
      id: 'skill_dark_vision',
      name: 'Dark Vision',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/7c/Skill_dark_vision.png',
      properties: {
        description: "Move 1 (Day) or Move 2 (Night)."
      },
    },
    skill_chaos_rift: {
      id: 'skill_chaos_rift',
      name: 'Chaos Rift',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/a2/Skill_chaos_rift.png',
      properties: {
        description: "Siege Attack 1 or Siege Fire Attack 1."
      },
    },
    skill_nether_sword: {
      id: 'skill_nether_sword',
      name: 'Nether Sword',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/db/Skill_nether_sword.png',
      properties: {
        description: "Attack 2 or Fire Attack 2."
      },
    },
    skill_mind_control: {
      id: 'skill_mind_control',
      name: 'Mind Control',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/5/58/Skill_mind_control.png',
      properties: {
        description: "Leadership 2 (Day) or Leadership 3 (Night)."
      },
    },
    skill_defiled_source: {
      id: 'skill_defiled_source',
      name: 'Defiled Source',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/d4/Skill_defiled_source.png',
      properties: {
        description: "Generate a Red Mana Crystal and a Red or Black Mana Essence."
      },
    },
    skill_blood_infusion: {
      id: 'skill_blood_infusion',
      name: 'Blood Infusion',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/a/ad/Skill_blood_infusion.png',
      properties: {
        description: "Discard a Wound to get Move 2, Leadership 2, Attack 2 or Block 2."
      },
    },
    skill_nether_conjuration: {
      id: 'skill_nether_conjuration',
      name: 'Nether Conjuration',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/93/Skill_nether_conjuration.png',
      properties: {
        description: "Discard a Wound to Gain a Red or Black Mana Essence or any non-Wound Card for a White or Green Mana Essence."
      },
    },
    skill_nether_manipulation: {
      id: 'skill_nether_manipulation',
      name: 'Nether Manipulation',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/43/Skill_nether_manipulation.png',
      properties: {
        description: "Convert a Gold Mana into Black, or Red into Blue, or White into Green, or vice-versa, regardless of Day/Night restriction."
      },
    },
    skill_underdark_empowerment: {
      id: 'skill_underdark_empowerment',
      name: 'Underdark Empowerment',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/47/Skill_underdark_empowerment.png',
      properties: {
        description: "Gain a Red Mana. Draw 2 Cards (Outside Combat)."
      },
    },
    skill_death_ward: {
      id: 'skill_death_ward',
      name: 'Death Ward',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/88/Skill_death_ward.png',
      properties: {
        description: "Heal up to 2 Wounds from your Hand (Before or After Battle)."
      },
    },
    skill_cleansing_waters: {
      id: 'skill_cleansing_waters',
      name: 'Cleansing Waters',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/7/75/Skill_cleansing_waters.png',
      properties: {
        description: "Heal 1. Gain a Blue Crystal."
      },
    },
    skill_cleansing_winds: {
      id: 'skill_cleansing_winds',
      name: 'Cleansing Winds',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/6a/Skill_cleansing_winds.png',
      properties: {
        description: "Heal 1. Gain a White Crystal."
      },
    },
    skill_pathfinder: {
      id: 'skill_pathfinder',
      name: 'Pathfinder',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/6/69/Skill_pathfinder.png',
      properties: {
        description: "Move 1. Exploration distance +2 (Day) or Exploration cost -2 (Night)"
      },
    },
    skill_eremite_influence: {
      id: 'skill_eremite_influence',
      name: 'Eremite Influence',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/c/c5/Skill_eremite_influence.png',
      properties: {
        description: "Leadership 1, +2 per empty Follower Slot."
      },
    },
    skill_imbued_strength: {
      id: 'skill_imbued_strength',
      name: 'Imbued Strength',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/9/91/Skill_imbued_strength.png',
      properties: {
        description: "Increase a card's Attack by 1 in the Range phase or by 2 in the Attack phase."
      },
    },
    skill_decaying_smite: {
      id: 'skill_decaying_smite',
      name: 'Decaying Smite',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/e/eb/Skill_decaying_smite.png',
      properties: {
        description: "Remove one Resistance or Fortification from an Enemy or one Element or Modifier from their Attacks. Ineffective against Arcane Immunity."
      },
    },
    skill_tormenting_thoughts: {
      id: 'skill_tormenting_thoughts',
      name: 'Tormenting Thoughts',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/32/Skill_tormenting_thoughts.png',
      properties: {
        description: "During the Block phase, reduce an Enemy's Attack by 1, or increase it by 2 but reduce its Armor by 2."
      },
    },
    skill_eerie_riposte: {
      id: 'skill_eerie_riposte',
      name: 'Eerie Riposte',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/40/Skill_eerie_riposte.png',
      properties: {
        description: "Block 1, then reduce that Enemy's Armor by 1."
      },
    },
    skill_self_empowerment: {
      id: 'skill_self_empowerment',
      name: 'Self Empowerment',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/8/86/Skill_self_empowerment.png',
      properties: {
        description: "Gain 1 XP. Draw 2 Cards (Outside Combat)."
      },
    },
    skill_beast_unleashed: {
      id: 'skill_beast_unleashed',
      name: 'Beast Unleashed',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/3/36/Skill_beast_unleashed.png',
      properties: {
        description: "Discard a Card to get Move 4, Leadership 4, Attack 4 or Block 4. +1 per empty Follower Slot."
      },
    },
    skill_mithril_scimitars: {
      id: 'skill_mithril_scimitars',
      name: 'Mithril Scimitars',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/4/4f/Skill_mithril_scimitars.png',
      properties: {
        description: "Double Chaos Attack 2."
      },
    },
    skill_mithril_armor: {
      id: 'skill_mithril_armor',
      name: 'Mithril Armor',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/d/dd/Skill_mithril_armor.png',
      properties: {
        description: "Chaos Block 2."
      },
    },
    skill_wukong_staff: {
      id: 'skill_wukong_staff',
      name: 'Wukong Staff',
      image: 'https://static.wikia.nocookie.net/paladinsoath/images/2/23/Skill_wukong_staff.png',
      properties: {
        description: "Siege Attack 3 or Teleport 2."
      },
    },
  },
  [GameResourceType.Rewards]: {
    character_level_up_reward_card_and_skill: {
      id: 'character_level_up_reward_card_and_skill',
      name: 'Pick a card from the Market and Draw a Blessing',
      image: EMPTY_IMAGE_URL,
      properties: {}
    },
    character_level_up_reward_unitslot_and_armor: {
      id: 'character_level_up_reward_unitslot_and_armor',
      name: '+1 Follower Slot and +1 Armor',
      image: EMPTY_IMAGE_URL,
      properties: {}
    },
    character_level_up_reward_unitslot_and_hand_size: {
      id: 'character_level_up_reward_unitslot_and_hand_size',
      name: '+1 Follower Slot and +1 Hand Size',
      image: EMPTY_IMAGE_URL,
      properties: {}
    },
  },
  [GameResourceType.Oath]: {},
  [GameResourceType.Character]: {},
  [GameResourceType.Scenario]: {},
  [GameResourceType.ScenarioExtension]: {},
  [GameResourceType.Language]: {},
};

// Returns the resource data or null if not found
export const FindResourceById = (resourcesType, resourceIdToFind) => {
  const resourcesDict = GameResources[resourcesType];
  if (resourcesDict === undefined) {
    return null;
  }
  const foundValue = Object.values(resourcesDict).find((res) => res.id === resourceIdToFind);
  return foundValue !== undefined ? foundValue : null;
};
