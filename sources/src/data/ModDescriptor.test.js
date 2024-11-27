
import { describe, expect, test } from 'vitest';
import { ModDescriptor } from './ModDescriptor';
import { DataStore } from '../stores/DataStore';
import { EMPTY_IMAGE_B64 } from './GameResources';

describe("ModDescriptor tests", async () => {
  test("serialize-deserialize", () => {
    expect(ModDescriptor.fromJson({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: EMPTY_IMAGE_B64,
      rewardsMods: ['rew1', 'rew2'],
      oathMods: ['oath1'],
      characterMods: ['char1', 'char2', 'char3'],
      enemyMods: ['ene1'],
      terrainMods: ['terr1'],
      mapSectionMods: ['map1']
    }).toJson()).toStrictEqual({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: 'mod_preview.jpg',
      rewardsMods: ['rew1', 'rew2'],
      oathMods: ['oath1'],
      characterMods: ['char1', 'char2', 'char3'],
      enemyMods: ['ene1'],
      terrainMods: ['terr1'],
      mapSectionMods: ['map1']
    });
  });

  test("register/unregister", () => {
    const modDesc = ModDescriptor.fromJson({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: EMPTY_IMAGE_B64,
      rewardsMods: ['rew1', 'rew2'],
      oathMods: ['oath1'],
      characterMods: ['char1', 'char2', 'char3'],
      enemyMods: ['ene1'],
      terrainMods: ['terr1'],
      mapSectionMods: ['map1']
    });

    // hasMod
    expect(() => modDesc.hasMod("ene1")).toBeTruthy();
    // register bad modType
    expect(() => modDesc.registerMod('randomStuff', 'modIdXXX1')).toThrowError();
    // register valid mod
    expect(modDesc.registerMod('oathMods', 'oath2')).toBeUndefined();
    expect(modDesc.getModIds('oathMods')).toStrictEqual(['oath1', 'oath2']);
    // register again == conflict
    expect(() => modDesc.registerMod('oathMods', 'oath2')).toThrowError();
    expect(modDesc.getModIds('oathMods')).toStrictEqual(['oath1', 'oath2']);
    // register again in another modType
    expect(() => modDesc.registerMod('enemyMods', 'oath2')).toThrowError();
    expect(modDesc.getModIds('enemyMods')).toStrictEqual(['ene1']);
    expect(modDesc.getModIds('oathMods')).toStrictEqual(['oath1', 'oath2']);
    // remove
    expect(modDesc.unregisterMod('oath1')).toBeUndefined();
    expect(modDesc.getModIds('oathMods')).toStrictEqual(['oath2']);
    expect(modDesc.unregisterMod('oath1')).toBeUndefined(); // again = no-op
    expect(modDesc.getModIds('oathMods')).toStrictEqual(['oath2']);
    expect(modDesc.unregisterMod('oath2')).toBeUndefined();
    expect(modDesc.getModIds('oathMods')).toStrictEqual([]);
    // get bad modType
    expect(() => modDesc.getModIds('randomStuff')).toThrowError();

  });

  test("save/load", async () => {
    const store = new DataStore({ version: 1 });
    await store.init();
    await store.clear();

    const modDesc = ModDescriptor.fromJson({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: EMPTY_IMAGE_B64,
      rewardsMods: ['rew1', 'rew2'],
      oathMods: ['oath1'],
      characterMods: ['char1', 'char2', 'char3'],
      enemyMods: ['ene1'],
      terrainMods: ['terr1'],
      mapSectionMods: ['map1']
    });

    expect(await modDesc.saveToStore(store)).toBeUndefined();
    const modDesc1 = await ModDescriptor.loadFromStore(store, modDesc.getGUID());
    expect(modDesc1.toJson()).toStrictEqual(modDesc.toJson());

    const allMods = await ModDescriptor.getSavedMods(store);
    expect(allMods.length).toEqual(1);
    expect(allMods[0].toJson()).toStrictEqual(modDesc.toJson());

  });
});