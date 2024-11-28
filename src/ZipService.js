import JSZip from "jszip";
import { ModTypeToResourceType } from "./data/ModTypeToResourceType.js";
import { ModTypeInfo, ModTypeInfoLoadingOrder } from "./data/ModTypeInfo.js";
import { ModData } from "./data/ModData.js";
import { ModDescriptor } from "./data/ModDescriptor.js";
import { AppService } from "./AppService.js";

// Local Utils
const __readTextContent = async (zip, path) => await zip.file(path).async('text');
const __readFileBlob = async (zip, path) => await zip.file(path).async('blob');
const __readJsonContent = async (zip, path) => JSON.parse(await __readTextContent(zip, path));
const __readB64Data = async (zip, path) => {
    return await new Promise(async (resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = (e) => reject(e);
        reader.onloadend = () => {
            let data = reader.result;
            const idx = data.indexOf(';base64,');
            if (idx > 0) {
                data = data.substring(idx + ';base64,'.length);
            }
            resolve(data);
        }
        try {
            const blob = await __readFileBlob(zip, path);
            reader.readAsDataURL(blob);
        } catch (e) {
            reject(new Error("Cannot load file at path '"+path+"': "+e.message));
        }
    });
}
const __createFiles = (modFolder, rawData, fileData) => {
    for (const propId of Object.keys(fileData)) {
        const rawFileData = fileData[propId];
        if (!rawFileData) continue;
        const fileName = rawData[propId];
        if (Array.isArray(rawFileData)) {
            for (const idx in rawFileData) {
                if (rawData.length < idx) {
                    break; // should not happen
                }
                modFolder.file(fileName[idx], rawFileData[idx], { base64: true });
            }
        } else if (typeof (rawFileData) === "object") {
            __createFiles(modFolder, rawData[propId], rawFileData);
        } else {
            modFolder.file(fileName, rawFileData, { base64: true });
        }
    }
}

// Find the root mod.json file
const __findRootModJson = async (zip) => {
    try {
        return {
            data: await __readJsonContent(zip, 'mod.json'),
            rootFolder: ''
        }
    } catch (e) {
        const rootFolders = [];
        zip.forEach((relativePath, zipEntry) => {
            if (!!zipEntry.dir) rootFolders.push(relativePath);
        });
        for (const rootFolder of rootFolders) {
            try {
                return {
                    data: await __readJsonContent(zip, rootFolder + 'mod.json'),
                    rootFolder: rootFolder
                }
            } catch (e2) {
                // ignore
            }
        }
        throw new Error("Invalid zip file: missing or invalid 'mod.json' file");
    }
}
const __loadZipModule = async (zip, rootFolder, modDesc, moduleType, moduleId) => {
    console.log("Loading Module " + moduleType + ">" + moduleId);
    const contextProvider = { getModDescriptor: () => modDesc };
    const modZip = zip.folder(rootFolder + moduleId);
    const fullGUIDPrefix = "mod:" + modDesc.getGUID() + ":";

    const getRelativeGUID = (guid) => {
        if (guid === null || !guid.startsWith(fullGUIDPrefix)) {
            return guid;
        }
        return guid.substring(fullGUIDPrefix.length);
    };
    const processData = async (modData, modSpecs) => {
        const out = {};
        // Translate GUID properties (mod:modGUID:moduleGUID) into moduleGUID
        // Load all the files data using the spec and add to the modJson
        // The modJson will use the fileIds we need to convert to b64Data.
        for (const modProp of modSpecs.properties) {
            const propId = modProp.id;
            const propSpec = modProp.specs;
            const data = modData[propId];
            if (data === undefined) {
                continue;
            }
            if (data === null) {
                out[propId] = null;
                continue;
            }
            if (propId === "guid") {
                out[propId] = data;
                continue;
            }
            if (propSpec.isGameResource === true) {
                if (Array.isArray(data)) {
                    const resList = [];
                    for (const res of data) {
                        resList.push(getRelativeGUID(res));
                    }
                    out[propId] = resList;
                } else {
                    out[propId] = getRelativeGUID(data);
                }
                continue;
            }
            if (propSpec.isFile === true) {
                if (Array.isArray(data)) {
                    const files = [];
                    for (const fileName of data) {
                        try {
                            files.push(await __readB64Data(modZip, fileName));
                        } catch (e) {
                            throw new Error("Error reading file '" + fileName + "': " + e.message);
                        }
                    }
                    out[propId] = files;
                } else {
                    try {
                        out[propId] = await __readB64Data(modZip, data);
                    } catch (e) {
                        throw new Error("Error reading file '" + data + "': " + e.message);
                    }
                }
                continue;
            }
            if (propSpec.isCustomSpec === true) {
                if (Array.isArray(data)) {
                    const customDataList = [];
                    for (const customData of data) {
                        customDataList.push(await processData(customData, propSpec.customSpec));
                    }
                    out[propId] = customDataList;
                } else {
                    out[propId] = await processData(data, propSpec.customSpec);
                }
                continue;
            }
            out[propId] = data;
        }
        return out;
    };

    // load mod.json
    const modJson = await __readJsonContent(modZip, 'mod.json');
    const modSpecs = ModTypeInfo[moduleType].specs(contextProvider);
    const modData = await processData(modJson, modSpecs);
    return new ModData(moduleType, contextProvider, modData);
}

export const ZipService = {
    // Will validate the mods before generating and throw an error if not valid.
    GenerateZip: async function (dataStore, modDescriptor) {
        const getFullGUID = (guid) => {
            if (!modDescriptor.hasMod(guid)) {
                return guid;
            }
            return "mod:" + modDescriptor.getGUID() + ":" + guid;
        }
        const resolveGUID = (initData, getSpecsFn) => {
            const rawData = { ...initData };
            // resolve all resource Ids to full mod guid (mod:$modGUID:$moduleGUID)
            for (const propId of Object.keys(rawData)) {
                const propData = rawData[propId];
                const propSpecs = getSpecsFn(propId);
                if (propId === 'guid' && propData && modDescriptor.hasMod(propData)) {
                    rawData[propId] = propData;
                    continue;
                }
                if (propSpecs.isGameResource === true) {
                    if (Array.isArray(propData)) {
                        const resList = [];
                        for (const resId of propData) {
                            resList.push(getFullGUID(resId));
                        }
                        rawData[propId] = resList;
                    } else {
                        rawData[propId] = getFullGUID(propData);
                    }
                    continue;
                }
                if (propSpecs.isCustomSpec === true) {
                    if (Array.isArray(propData)) {
                        const itemList = [];
                        for (const item of propData) {
                            itemList.push(resolveGUID(item, (propId) => {
                                for (const prop of propSpecs.customSpec.properties) {
                                    if (prop.id === propId) {
                                        return prop.specs;
                                    }
                                }
                                throw new Error("Could not resolve specs for property " + propId);
                            }));
                        }
                        rawData[propId] = itemList;
                    } else {
                        rawData[propId] = resolveGUID(rawData[propId], (propId) => {
                            for (const prop of propSpecs.customSpec.properties) {
                                if (prop.id === propId) {
                                    return prop.specs;
                                }
                            }
                            throw new Error("Could not resolve specs for property " + propId);
                        });
                    }
                }
            }
            return rawData;
        }

        //---------

        var zip = new JSZip();
        zip.file("mod.json", JSON.stringify(modDescriptor.toJson(), null, /*space*/4));
        zip.file("mod_preview.jpg", modDescriptor.header['mod_preview'], { base64: true });

        for (const modType of Object.keys(ModTypeToResourceType)) {
            const mods = await AppService.FetchMods(modType, dataStore, modDescriptor);
            for (const modData of mods) {
                modData.validate();
                const rawData = resolveGUID(
                    modData.getData({ returnDefaultValues: true }),
                    (propId) => modData.getPropertySpecs(propId)
                );
                const fileData = modData.getFileData();
                const modFolder = zip.folder(modData.getGUID());
                modFolder.file("mod.json", JSON.stringify(rawData, null, /*space*/4));
                __createFiles(modFolder, rawData, fileData);
            }
        }
        return zip.generateAsync({ type: "blob" });
    },

    LoadZip: async function (dataStore, zipFile) {
        // -----
        // We find the root mod.json file
        // We load the ModDescriptor
        // We load each module
        const zip = await JSZip.loadAsync(zipFile);

        let modDesc;
        let rootFolder;
        try {
            const rootModJson = await __findRootModJson(zip);
            rootFolder = rootModJson.rootFolder;
            // load ModDescriptor
            const jsonData = rootModJson.data;
            // inject mod_preview data into the header
            // the mod.json doesn't normally contain the mod_preview file but the header specs require it. so we inject mod_preview data into the header before parsing JSON.
            jsonData.mod_preview = await __readB64Data(zip, rootFolder + 'mod_preview.jpg');
            modDesc = ModDescriptor.fromJson(jsonData);
        } catch (e) {
            console.error("Error loading mod.json", e);
            throw new Error("Error loading 'mod.json': " + e.message);
        }

        // now load all modules following the loading order.
        const modules = [];
        for (const moduleType of ModTypeInfoLoadingOrder) {
            for (const moduleId of modDesc.getModIds(moduleType)) {
                const modData = await __loadZipModule(zip, rootFolder, modDesc, moduleType, moduleId);
                modules.push(modData);
            }
        }

        // All good we can save into our DB.
        modDesc.saveToStore(dataStore);
        for (const module of modules) {
            module.saveToStore(dataStore);
        }
        return modDesc;
    }
}
