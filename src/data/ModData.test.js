import { describe, expect, test } from 'vitest';
import { ModData } from './ModData';
import { GameValues } from './GameValues';
import { ModTypeInfo } from './ModTypeInfo';
import { DataStore } from '../stores/DataStore';
import { EMPTY_IMAGE_B64 } from './GameResources';

const contextProvider = { getModDescriptor: () => null };

describe("ModData tests", async () => {
  test('new - prepare data', () => {
    const modData = new ModData(ModTypeInfo.terrainMods.id, contextProvider);

    expect(modData.getModType()).toBe('terrainMods');
    expect(modData.getData()).toStrictEqual({
      guid: null,
      name: null,
      tileSprites: null,
      movementCost: null,
    });
    expect(modData.getGUID()).toBe(null); // not defined yet
    expect(modData.isValid()).toBe(false);
    expect(() => modData.validate()).toThrowError();
  });

  test('new - (partial) populate data', () => {
    const modData = new ModData(ModTypeInfo.terrainMods.id, contextProvider);

    expect(modData.setProperty('guid', 'terrain1')).toBeUndefined(); // no error
    expect(modData.getGUID()).toBe('terrain1');
    expect(modData.setProperty('name', 'Terrain 1')).toBeUndefined(); // no error
    expect(modData.getName()).toBe('Terrain 1');
    expect(modData.getData()).toStrictEqual({
      guid: 'terrain1',
      name: 'Terrain 1',
      tileSprites: null,
      movementCost: null,
    });
    expect(modData.isValid()).toBe(false); // missing required properties
    expect(() => modData.validate()).toThrowError();
  });

  test('new - (fully) populate data', () => {
    const modData = new ModData(ModTypeInfo.terrainMods.id, contextProvider);

    expect(modData.setProperty('guid', 'terrain1')).toBeUndefined(); // no error
    expect(modData.setProperty('name', 'Terrain 1')).toBeUndefined(); // no error
    expect(modData.addPropertyValue('tileSprites', EMPTY_IMAGE_B64)).toBeUndefined(); // no error
    expect(modData.addPropertyValue('tileSprites', EMPTY_IMAGE_B64)).toBeUndefined(); // no error
    expect(modData.addPropertyValue('movementCost', {
      timeOfDay: GameValues.TimeOfDay.timeofday_day.value,
      allowMovement: true,
      cost: 5
    }, /*shouldValidate*/ false)).toBeUndefined(); // no error
    expect(modData.addPropertyValue('movementCost', {
      timeOfDay: GameValues.TimeOfDay.timeofday_night.value,
      allowMovement: false,
    })).toBeUndefined(); // no error
    expect(modData.getData()).toStrictEqual({
      guid: 'terrain1',
      name: 'Terrain 1',
      tileSprites: ['tileSprites_0.png', 'tileSprites_1.png'],
      movementCost: [{
        timeOfDay: GameValues.TimeOfDay.timeofday_day.value,
        allowMovement: true,
        cost: 5
      },
      {
        timeOfDay: GameValues.TimeOfDay.timeofday_night.value,
        allowMovement: false,
      }]
    });
    expect(modData.getFileData()).toStrictEqual({
      tileSprites: [EMPTY_IMAGE_B64, EMPTY_IMAGE_B64],
    });
    expect(modData.validate()).toBeUndefined(); // no error
    expect(modData.isValid()).toBe(true);
  });


  test('getData / getFileData recursive', () => {
    const modData = new ModData(ModTypeInfo.enemyMods.id, contextProvider, {
      guid: 'enemy1',
      name: 'Enemy 1',
      enemyType: GameValues.EnemyType.enemy_type_abomination.value,
      attacks: [{
        element: GameValues.Element.element_fire.value,
        value: 1,
      }],
      portraitSprite: EMPTY_IMAGE_B64,
      fullBodySprite: EMPTY_IMAGE_B64,
      fullBodyOutlineSprite: EMPTY_IMAGE_B64,
      tileData: {
        tileNormalSprite: EMPTY_IMAGE_B64,
        tileOutlinedSprite: EMPTY_IMAGE_B64
      }
    });

    expect(modData.getData({ returnDefaultValues: true })).toStrictEqual({
      guid: 'enemy1',
      name: 'Enemy 1',
      enemyType: GameValues.EnemyType.enemy_type_abomination.value,
      attacks: [{
        element: GameValues.Element.element_fire.value,
        value: 1,
        attackType: 0,
        attackModifiers: []
      }],
      portraitSprite: 'portraitSprite.png',
      fullBodySprite: 'fullBodySprite.png',
      fullBodyOutlineSprite: 'fullBodyOutlineSprite.png',
      tileData: {
        tileNormalSprite: 'tileNormalSprite.png',
        tileOutlinedSprite: 'tileOutlinedSprite.png'
      },
      armor: 1,
      challengeRating: 1,
      elusiveData: null,
      isElusive: false,
      fortification: 2,
      numInstancesInDeck: 1,
      reputationGain: 0,
      reputationGainBonusWhenRampaging: 1,
      resistances: [],
      immunities: [],
      summoningAttacks: [],
      xpGain: 0
    });
    expect(modData.getFileData()).toStrictEqual({
      portraitSprite: EMPTY_IMAGE_B64,
      fullBodySprite: EMPTY_IMAGE_B64,
      fullBodyOutlineSprite: EMPTY_IMAGE_B64,
      tileData: {
        tileNormalSprite: EMPTY_IMAGE_B64,
        tileOutlinedSprite: EMPTY_IMAGE_B64
      }
    });
  });

  test("constructor defaults", () => {
    const modData = new ModData(ModTypeInfo.terrainMods.id, contextProvider, {
      guid: 'terrain1',
      name: 'Terrain 1',
    });

    expect(modData.getData()).toStrictEqual({
      guid: 'terrain1',
      name: 'Terrain 1',
      movementCost: null,
      tileSprites: null,
    });
  });

  test("save/load/delete from Store", async () => {
    const store = new DataStore({ version: 1 });
    await store.init();
    const modData = new ModData(ModTypeInfo.terrainMods.id, contextProvider, {
      guid: 'terrain1',
      name: 'Terrain 1',
      tileSprites: [EMPTY_IMAGE_B64, EMPTY_IMAGE_B64]
    });
    expect(modData.getFileData()).toStrictEqual({
      tileSprites: [EMPTY_IMAGE_B64, EMPTY_IMAGE_B64],
    });

    expect(await modData.saveToStore(store)).toBeUndefined();

    const modData1 = await ModData.loadFromStore(store, modData.getGUID(), contextProvider);
    expect(modData1.getData()).toStrictEqual(modData.getData());
    expect(modData1.getFileData()).toStrictEqual(modData.getFileData());

    expect(await ModData.deleteFromStore(store, modData.getGUID())).toBeUndefined();
    expect(await ModData.loadFromStore(store, modData.getGUID(), contextProvider)).toBeNull();
  });
});