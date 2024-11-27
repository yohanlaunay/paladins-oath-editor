import { ModTypeToResourceType } from "./data/ModTypeToResourceType.js";
import { GameResources, GameResourceType } from "./data/GameResources.js";
import { ModTypeInfo } from "./data/ModTypeInfo.js";
import { ModData } from "./data/ModData.js";

export const AppService = {
    FetchMods: async function (modType, dataStore, modDescriptor) {
        if (dataStore === null || modDescriptor === null || ModTypeInfo[modType] === undefined) {
            return [];
        }

        const out = [];
        for (const modId of modDescriptor.getModIds(modType)) {
            const modData = await ModData.loadFromStore(
                dataStore,
                modId,
                /*contextProvider*/{ getModDescriptor: () => modDescriptor }
            );
            if (modData !== null) {
                out.push(modData);
            }
        }
        return out;
    },

    FetchModsResources: async function (modType, dataStore, modDescriptor) {
        const resConversionFn = ModTypeInfo[modType];
        const out = [];
        const mods = await AppService.FetchMods(modType, dataStore, modDescriptor);
        for (const modData of mods) {
            const rawData = modData.getDataWithFileData({ createImgBase64Url: true });
            out.push(resConversionFn.convertResourceFromData(rawData));
        }
        return out;
    },

    FetchAllResourcesByType: async function (resType, dataStore, modDescriptor) {
        if (GameResourceType[resType] === undefined) {
            throw new Error("Invalid Resource Type '" + resType + "'")
        }
        let out = [];

        // Put custom resources at the top of the list if they are mod resources.
        if (modDescriptor != null) {
            for (const modTypeInfo of Object.values(ModTypeInfo)) {
                if (ModTypeToResourceType[modTypeInfo.id] === resType) {
                    out = out.concat(await this.FetchModsResources(modTypeInfo.id, dataStore, modDescriptor));
                    break;
                }
            }
        }

        // Put generic resources at the end.
        if (GameResources[resType] !== undefined) {
            out = out.concat(Object.values(GameResources[resType]));
        }
        return out;
    },
}
