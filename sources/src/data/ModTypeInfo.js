import { CharacterModSpec } from './classes/CharacterModSpec';
import { EnemyModSpec } from './classes/EnemyModSpec';
import { MapSectionModSpec } from './classes/MapSectionModSpec';
import { OathModSpec } from './classes/OathModSpec';
import { RewardModSpec } from './classes/RewardModSpec';
import { TerrainModSpec } from './classes/TerrainModSpec';
import { EMPTY_IMAGE_URL } from './GameResources';

export const MOD_GROUPING_KEY = 'Mod';

export const ModTypeInfo = {
  rewardsMods: {
    id: 'rewardsMods',
    label: 'Rewards',
    specs: (contextProvider) => RewardModSpec(contextProvider),
    convertResourceFromData: (data) => {
      const properties = { ...data };
      properties.groupingKey = MOD_GROUPING_KEY;
      return {
        id: data['guid'],
        name: data['name'],
        image: EMPTY_IMAGE_URL,
        properties: properties
      }
    }
  },
  oathMods: {
    id: 'oathMods',
    label: 'Oath',
    specs: (contextProvider) => OathModSpec(contextProvider),
    convertResourceFromData: (data) => {
      const properties = { ...data };
      properties.groupingKey = MOD_GROUPING_KEY;
      return {
        id: data['guid'],
        name: data['name'],
        image: EMPTY_IMAGE_URL,
        properties: properties
      }
    }
  },
  characterMods: {
    id: 'characterMods',
    label: 'Character',
    specs: (contextProvider) => CharacterModSpec(contextProvider),
    convertResourceFromData: (data) => {
      const properties = { ...data };
      properties.groupingKey = MOD_GROUPING_KEY;
      return {
        id: data['guid'],
        name: data['name'],
        image: data['portraitSprite'],
        properties: properties
      }
    }
  },
  enemyMods: {
    id: 'enemyMods',
    label: 'Enemy',
    specs: (contextProvider) => EnemyModSpec(contextProvider),
    convertResourceFromData: (data) => {
      const properties = { ...data };
      properties.groupingKey = MOD_GROUPING_KEY;
      return {
        id: data['guid'],
        name: data['name'],
        image: data['portraitSprite'],
        properties: properties
      }
    }
  },
  terrainMods: {
    id: 'terrainMods',
    label: 'Terrain',
    specs: (contextProvider) => TerrainModSpec(contextProvider),
    convertResourceFromData: (data) => {
      const properties = { ...data };
      properties.groupingKey = MOD_GROUPING_KEY;
      return {
        id: data['guid'],
        name: data['name'],
        image: data['tileSprites'][0],
        properties: properties
      }
    }
  },
  mapSectionMods: {
    id: 'mapSectionMods',
    label: 'Map Section',
    specs: (contextProvider) => MapSectionModSpec(contextProvider),
    convertResourceFromData: (data) => {
      const properties = { ...data };
      properties.groupingKey = MOD_GROUPING_KEY;
      return {
        id: data['guid'],
        name: data['guid'],
        image: EMPTY_IMAGE_URL,
        properties: properties
      }
    }
  },
  // TODO(yohan) support scenarioMods + add to loadingOrder below
  // scenarioMods: {
  //   id: 'scenarioMods',
  //   label: 'Scenario',
  //   specs: (contextProvider) => ???(contextProvider),
  //   guids: [],
  //   convertResourceFromData: (data) => {
  //    const properties = {...data};
  //    properties.groupingKey = MOD_GROUPING_KEY;
  //    return {
  //       id: data['guid'],
  //       name: data['name'],
  //       image: EMPTY_IMAGE_URL,
  //       properties: properties
  //    }
  //  }
  // },
  // TODO(yohan) support scenarioExtensionMods + add to loadingOrder below
  // scenarioExtensionMods: {
  //   id: 'scenarioExtensionMods',
  //   label: 'Scenario Extension',
  //   specs: (contextProvider) => ???(contextProvider),
  //   guids: [],
  //   convertResourceFromData: (data) => {
  //    const properties = {...data};
  //    properties.groupingKey = MOD_GROUPING_KEY;
  //    return {
  //       id: data['guid'],
  //       name: data['name'],
  //       image: EMPTY_IMAGE_URL,
  //       properties: properties
  //    }
  //  }
  // },
  // TODO(yohan) support languageMods + add to loadingOrder below
  // languageMods: {
  //   id: 'languageMods',
  //   label: 'Language',
  //   specs: (contextProvider) => ???(contextProvider),
  //   guids: [],
  //   convertResourceFromData: (data) => {
  //    const properties = {...data};
  //    properties.groupingKey = MOD_GROUPING_KEY;
  //    return {
  //       id: data['guid'],
  //       name: data['name'],
  //       image: EMPTY_IMAGE_URL,
  //       properties: properties
  //    }
  //  }
  // },
};

// The order of loading modules is significant.
// because last in order might depend on the ids generated by the first items in the order.
export const ModTypeInfoLoadingOrder = [
  ModTypeInfo.rewardsMods.id,
  ModTypeInfo.oathMods.id,
  ModTypeInfo.characterMods.id,
  ModTypeInfo.enemyMods.id,
  ModTypeInfo.terrainMods.id,
  ModTypeInfo.mapSectionMods.id,
  // ModTypeInfo.scenarioMods.id,
  // ModTypeInfo.scenarioExtensionMods.id,
  // ModTypeInfo.languageMods.id,
]
