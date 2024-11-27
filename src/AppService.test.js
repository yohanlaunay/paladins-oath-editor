
import { describe, expect, test } from 'vitest';
import { ModDescriptor } from './data/ModDescriptor';
import { ModData } from './data/ModData';
import { DataStore } from './stores/DataStore';
import { EMPTY_IMAGE_B64, EMPTY_IMAGE_URL, GameResources, GameResourceType } from './data/GameResources';
import { AppService } from './AppService';
import { MOD_GROUPING_KEY, ModTypeInfo } from './data/ModTypeInfo';

describe("Service tests", async () => {
  test("FetchModsResources#empty", async () => {
    const modDesc = ModDescriptor.fromJson({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: EMPTY_IMAGE_B64,
    });

    const store = new DataStore({ version: 1 });
    await store.init();

    expect(await AppService.FetchModsResources(ModTypeInfo.enemyMods, store, modDesc)).toStrictEqual([]);
  });

  test("FetchModsResources", async () => {
    const store = new DataStore({ version: 1 });
    await store.init();

    const modDesc = ModDescriptor.fromJson({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: EMPTY_IMAGE_B64,
    });

    const e1 = new ModData(ModTypeInfo.enemyMods.id, { getModDescriptor: () => modDesc }, {
      guid: 'enemy1',
      name: 'Enemy 1',
      portraitSprite: EMPTY_IMAGE_B64
    });
    modDesc.registerMod(e1.getModType(), e1.getGUID());
    await e1.saveToStore(store);

    const expectedProperties = { ...e1.getDataWithFileData({ createImgBase64Url: true }) };
    expectedProperties['groupingKey'] = MOD_GROUPING_KEY;

    expect(await AppService.FetchModsResources(ModTypeInfo.enemyMods.id, store, modDesc)).toStrictEqual([{
      id: e1.getGUID(),
      name: e1.getName(),
      image: e1.getImageUrlProperty('portraitSprite'),
      properties: expectedProperties
    }]);

  });

  test("FetchAllResourcesByType#noMod", async () => {
    const store = new DataStore({ version: 1 });
    await store.init();

    const modDesc = ModDescriptor.fromJson({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: EMPTY_IMAGE_B64,
    });

    expect(await AppService.FetchAllResourcesByType(GameResourceType.Card, store, modDesc)).toStrictEqual(
      Object.values(GameResources.Card)
    );
  });

  test("FetchAllResourcesByType#modOnly", async () => {
    const store = new DataStore({ version: 1 });
    await store.init();

    const modDesc = ModDescriptor.fromJson({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: EMPTY_IMAGE_B64,
    });

    const oathMod = new ModData(ModTypeInfo.oathMods.id, { getModDescriptor: () => modDesc }, {
      guid: 'oath1',
      name: 'Oath 1'
    });
    modDesc.registerMod(oathMod.getModType(), oathMod.getGUID());
    await oathMod.saveToStore(store);

    const expectedProperties = { ...oathMod.getDataWithFileData({ createImgBase64Url: true }) };
    expectedProperties['groupingKey'] = MOD_GROUPING_KEY;

    expect(await AppService.FetchAllResourcesByType(GameResourceType.Oath, store, modDesc)).toStrictEqual([{
      id: oathMod.getGUID(),
      name: oathMod.getName(),
      image: EMPTY_IMAGE_URL,
      properties: expectedProperties
    }]);
  });

  test("FetchAllResourcesByType#modAndRes", async () => {
    const store = new DataStore({ version: 1 });
    await store.init();

    const modDesc = ModDescriptor.fromJson({
      guid: 'mod1',
      name: 'Mod 1',
      description: 'This is mod 1',
      author: 'firebiscuit',
      version: '1.0.0',
      mod_preview: EMPTY_IMAGE_B64,
    });

    const enemyMod = new ModData(ModTypeInfo.enemyMods.id, { getModDescriptor: () => modDesc }, {
      guid: 'enemy1',
      name: 'Enemy 1',
      portraitSprite: EMPTY_IMAGE_B64
    });
    modDesc.registerMod(enemyMod.getModType(), enemyMod.getGUID());
    await enemyMod.saveToStore(store);

    const expectedProperties = { ...enemyMod.getDataWithFileData({ createImgBase64Url: true }) };
    expectedProperties['groupingKey'] = MOD_GROUPING_KEY;

    expect(await AppService.FetchAllResourcesByType(GameResourceType.Enemy, store, modDesc)).toStrictEqual([{
      id: enemyMod.getGUID(),
      name: enemyMod.getName(),
      image: enemyMod.getImageUrlProperty('portraitSprite'),
      properties: expectedProperties
    }].concat(Object.values(GameResources.Enemy)));
  });
});
