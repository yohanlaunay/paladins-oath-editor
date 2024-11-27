import { ModHeaderSpec } from './classes/ModHeaderSpec';
import { ModTypeInfo } from './ModTypeInfo';
import { Specs } from './Specs';

// Must be provided with the mod. 256x256 image.
const MOD_PREVIEW_IMAGE_NAME = 'mod_preview.jpg';

export class ModDescriptor {

  constructor(/*ModHeaderSpec#data*/header) {
    this.header = header;
    this.guidsByType = {};
    for (const modType of Object.values(ModTypeInfo)) {
      this.guidsByType[modType.id] = [];
    }
  }

  setHeader(/*ModHeaderSpec#data*/header) {
    this.header = { ...header };
  }

  getGUID() { return this.header.guid; }

  getModIds(modType) {
    if (!this.guidsByType[modType]) {
      throw new Error("Invalid mod type: '" + modType + "'")
    }
    return [...this.guidsByType[modType]];
  }

  hasMod(modId) { return this.findModType(modId) !== null; }

  findModType(modId) {
    for (const modType of Object.keys(this.guidsByType)) {
      if (this.guidsByType[modType].includes(modId)) {
        return modType;
      }
    }
    return null;
  }

  // Throws if mod already exists (regardless of type)
  registerMod(modType, modId) {
    if (this.guidsByType[modType] === undefined) {
      throw new Error("Invalid mod type: '" + modType + "'")
    }
    if (this.hasMod(modId)) {
      throw new Error("Mod '" + modId + "' is already registered for modType '" + modType + "'");
    }
    this.guidsByType[modType].push(modId);
  }

  unregisterMod(modId) {
    for (const modType of Object.keys(this.guidsByType)) {
      const modIdIdx = this.guidsByType[modType].indexOf(modId);
      if (modIdIdx < 0) {
        continue;
      }
      this.guidsByType[modType].splice(modIdIdx, 1);
      return;
    }
  }

  // Throw if data is not valid
  toJson() {
    const out = Specs.CustomSpec(ModHeaderSpec).toJson(this.header);
    for (const modType of Object.keys(this.guidsByType)) {
      out[modType] = [...this.guidsByType[modType]]; // copy array
    }

    return out;
  }

  static fromJson(json) {
    const header = Specs.CustomSpec(ModHeaderSpec).parseJson(json);
    const modDescriptor = new ModDescriptor(header);
    const allGUIDS = [];
    for (const modType of Object.keys(modDescriptor.guidsByType)) {
      const jsonData = json[modType];
      if (!Array.isArray(jsonData)) {
        continue;
      }

      const guids = modDescriptor.guidsByType[modType];
      const idSpec = Specs.GUID();
      for (const data of jsonData) {
        let modId;
        try {
          modId = idSpec.parseJson(data);
        } catch (e) {
          throw new Error("Error parsing mod Id: " + JSON.stringify(data) + ", " + e.message);
        }
        if (allGUIDS.includes(modId)) {
          throw new Error("Duplicate mod Id: " + modId);
        }
        // Avoid duplicates
        guids.push(modId);
        allGUIDS.push(modId);
      }
    }
    return modDescriptor;
  }

  // Only enable 1 Mod edited at the same time.
  static getDataStoreKey(guid) { return ModDescriptor.DATASTORE_KEY_PREFIX /*+ guid*/; }

  async saveToStore(dataStore) {
    const storedData = {
      data: this.toJson(),
      fileData: {
        mod_preview: this.header['mod_preview']
      }
    };
    const dataStoreKey = ModDescriptor.getDataStoreKey(this.getGUID());
    return dataStore.putData(dataStoreKey, storedData);
  }

  static async loadFromStore(dataStore, guid) {
    const dataStoreKey = ModDescriptor.getDataStoreKey(guid);
    const storedData = await dataStore.getData(dataStoreKey);
    if (!storedData || !storedData.data || !storedData.fileData) {
      return null;
    }
    let data = { ...storedData.data };
    data.mod_preview = storedData.fileData.mod_preview;
    return ModDescriptor.fromJson(data);
  }

  static async getSavedMods(dataStore) {
    const mods = [];
    const allKeys = await dataStore.getAllKeys();
    for (const modKey of allKeys) {
      if (modKey.startsWith(ModDescriptor.DATASTORE_KEY_PREFIX)) {
        const modId = modKey.substring(ModDescriptor.DATASTORE_KEY_PREFIX.length);
        try {
          mods.push(await ModDescriptor.loadFromStore(dataStore, modId));
        } catch (e) {
          console.error("Error loading mod " + modId + ": " + e.message);
        }
      }

    }
    return mods;
  }

  static DATASTORE_KEY_PREFIX = "MOD";
}
