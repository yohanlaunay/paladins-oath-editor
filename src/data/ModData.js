import { toB64ImageUrl } from "./GameResources";
import { ModTypeInfo } from "./ModTypeInfo";

export class ModData {
  constructor(modType, contextProvider, initData = {}) {
    if (ModTypeInfo[modType] === undefined) throw new Error("Invalid Mod type '" + modType + "'");

    this.modType = modType;
    this.modData = {};
    this.modSpecs = ModTypeInfo[modType].specs(contextProvider);

    for (let prop of this.modSpecs.properties) {
      this.modData[prop.id] = {
        data: null,
        prop: prop
      };
    }

    // load init data
    for (let prop of this.modSpecs.properties) {
      const preloadedData = initData[prop.id];
      if (preloadedData === undefined || preloadedData === null) {
        continue;
      }
      try {
        this.setProperty(prop.id, preloadedData);
      } catch (e) {
        console.error("Invalid preloaded data for prop '" + prop.id + "' : " + JSON.stringify(preloadedData), e);
      }
    }
  }

  isValid() {
    try {
      this.validate();
      return true;
    } catch (e) {
      return false;
    }
  }

  validate() {
    // validation at 3 levels:
    // 1. prop.specs validator
    // 2. (optional) prop.validator
    // 3. (optional) modSpecs.validator

    for (let propId in this.modData) {
      this.validateData(propId, this.modData[propId].data);
    }
    const modSpecsValidator = this.modSpecs.validator;
    if (modSpecsValidator !== undefined) {
      try {
        modSpecsValidator(this.getData())
      } catch (e) {
        const e2 = new Error(this.getGUID() + '> ' + e.message)
        e2.stack = e.stack;
        throw e2;
      }
    }
  }

  validateData(propId, data) {
    const propInfo = this.modData[propId];
    if (propInfo === undefined) {
      throw new Error("Invalid propId: '" + propId + "'");
    }
    if (data === null || data === undefined) {
      if (propInfo.prop.default !== undefined) {
        return; // don't need to validate the default value
      }
      if (!propInfo.prop.optional) {
        throw new Error("Required value is null for property " + propId);
      }
      return; // optional null data doesn't need to be validated.
    }
    try {
      propInfo.prop.specs.validator(data);
      if (propInfo.prop.validator !== undefined) {
        propInfo.prop.validator(data);
      }
    } catch (e) {
      const e2 = new Error(this.getGUID() + ':' + propId + '> ' + e.message)
      e2.stack = e.stack;
      throw e2;
    }
  }

  validateAll(propData) {
    for (const propId of Object.keys(propData)) {
      this.validateData(propId, propData[propId]);
    }
    if (!!this.modSpecs.validator) {
      this.modSpecs.validator(propData);
    }
  }

  getModSpecs() { return this.modSpecs; }

  getModType() { return this.modType; }

  getGUID() { return this.modData['guid'].data; }

  getName() { return this.modData['name'].data; }

  // {returnDefaultValues:false}
  getData(params = {}) {
    const shouldReturnDefaultValues = !!((params || {}).returnDefaultValues);
    // {id, data, specs, default}
    const resolveData = (props) => {
      const allData = {};
      for (const prop of props) {
        const propId = prop.id;
        const propData = prop.data;
        // Add return values if needed
        if (propData === null || propData === undefined) {
          if (propData !== undefined) {
            allData[propId] = propData;
          }
          if (!shouldReturnDefaultValues) {
            continue;
          }
          if (prop.specs.isList) {
            allData[propId] = [];
          } else if (prop.default !== undefined) {
            allData[propId] = prop.default;
          }
          continue;
        }
        if (prop.specs.isCustomSpec === true) {
          if (prop.specs.isList) {
            const customDataList = [];
            for (const listItem of propData) {
              const customProps = [];
              for (const p of prop.specs.customSpec.properties) {
                customProps.push({
                  id: p.id,
                  data: listItem[p.id],
                  default: p.default,
                  specs: p.specs
                });
              }
              customDataList.push(resolveData(customProps));
            }
            allData[propId] = customDataList;
          } else {
            const customProps = [];
            for (const p of prop.specs.customSpec.properties) {
              customProps.push({
                id: p.id,
                data: propData[p.id],
                default: p.default,
                specs: p.specs
              });
            }
            allData[propId] = resolveData(customProps);
          }
          continue;
        }
        // process files differently by generating a file Id
        if (!prop.specs.isFile) {
          allData[propId] = propData;
          continue;
        }

        const fileExt = prop.specs.fileExt;
        // return Ids for each of them
        if (Array.isArray(propData)) {
          // file name = prop.id+index
          const fileIds = [];
          for (const fileDataIdx in propData) {
            fileIds.push(propId + '_' + fileDataIdx + '.' + fileExt);
          }
          allData[propId] = fileIds;
        } else {
          // file name = prop.id
          allData[propId] = propId + '.' + fileExt;
        }
      }
      return allData;
    }

    // ---
    const allProps = [];
    for (const propId of Object.keys(this.modData)) {
      allProps.push({
        id: propId,
        data: this.modData[propId].data,
        default: this.modData[propId].prop.default,
        specs: this.modData[propId].prop.specs,
      });
    }
    return resolveData(allProps);
  }

  // {createImgBase64Url:false}
  getFileData(params = {}) {
    const shouldCreateImgBase64Url = !!((params || {}).createImgBase64Url);

    const resolveFileData = (props) => {
      const fileData = {}
      for (const prop of props) {
        const propId = prop.id;
        const propData = prop.data;
        const propSpecs = prop.specs;
        if (propData == null) {
          continue;
        }
        // process top-level files
        if (propSpecs.isFile === true) {
          if (shouldCreateImgBase64Url && !!propSpecs.imgInfo) {
            if (propSpecs.isList === true) {
              const fileDataList = [];
              for (const listItem of propData) {
                fileDataList.push(toB64ImageUrl(listItem, propSpecs.fileExt));
              }
              fileData[propId] = fileDataList;
            } else {
              fileData[propId] = toB64ImageUrl(propData, propSpecs.fileExt);
            }
          } else {
            fileData[propId] = propData;
          }
          continue;
        }
        // process custom specs that might contain files
        if (propSpecs.isCustomSpec === true) {
          if (propSpecs.isList === true) {
            const customDataList = [];
            for (const listItem of propData) {
              const customProps = [];
              for (const p of prop.specs.customSpec.properties) {
                customProps.push({
                  id: p.id,
                  data: listItem[p.id] || null,
                  specs: p.specs
                });
              }
              const customPropFileData = resolveFileData(customProps);
              if (Object.keys(customPropFileData).length > 0) {
                customDataList.push(customPropFileData);
              }
            }
            if (customDataList.length > 0) {
              fileData[propId] = customDataList;
            }
          } else {
            const customProps = [];
            for (const p of propSpecs.customSpec.properties) {
              customProps.push({
                id: p.id,
                data: ((propData || {})[p.id]) || null,
                specs: p.specs
              });
            }
            const customPropFileData = resolveFileData(customProps);
            if (Object.keys(customPropFileData).length > 0) {
              fileData[propId] = customPropFileData;
            }
          }
        }
      }
      return fileData;
    }
    const allProps = [];
    for (let propId of Object.keys(this.modData)) {
      allProps.push({
        id: propId,
        data: this.modData[propId].data,
        specs: this.modData[propId].prop.specs
      });
    }
    return resolveFileData(allProps);
  }

  // {createImgBase64Url:false, returnDefaultValues: false}
  getDataWithFileData(params = {}) {
    const data = this.getData(params);
    const fileData = this.getFileData(params);
    return ModData.mergeDataAndFileData(data, fileData);
  }

  getProperty(propId) {
    if (this.modData[propId] === undefined) {
      throw new Error('Invalid propId "' + propId + '"');
    }
    return this.modData[propId].data;
  }

  getPropertySpecs(propId) {
    if (this.modData[propId] === undefined) {
      throw new Error('Invalid propId "' + propId + '"');
    }
    return this.modData[propId].prop.specs;
  }

  getImageUrlProperty(propId) {
    const propData = this.getProperty(propId);
    const specs = this.modData[propId].prop.specs;
    if (!specs.imgInfo) {
      throw new Error('Prop is not an image "' + propId + "'");
    }
    if (!Array.isArray(propData)) {
      return toB64ImageUrl(propData, specs.imgInfo.ext);
    }
    const out = [];
    for (const d of propData) {
      out.push(toB64ImageUrl(d, specs.imgInfo.ext));
    }
    return out;
  }

  setProperty(propId, data, shouldValidate = true) {
    if (!!shouldValidate) {
      this.validateData(propId, data);
    }
    this.modData[propId].data = data;
  }

  setProperties(propData, shouldValidate = true) {
    for (const propId of Object.keys(propData)) {
      this.setProperty(propId, propData[propId], shouldValidate);
    }
  }

  addPropertyValue(propId, data, shouldValidate = true) {
    const propInfo = this.modData[propId];
    if (propInfo === undefined) {
      throw new Error("Invalid propId: '" + propId + "'");
    }
    let dataList;
    if (propInfo.data == null) {
      dataList = [data];
    } else if (!Array.isArray(propInfo.data)) {
      throw new Error("Prop is not an array: '" + propId + "'");
    } else {
      dataList = propInfo.data.slice()
      dataList.push(data)
    }
    if (!!shouldValidate) {
      this.validateData(propId, dataList);
    }
    this.modData[propId].data = dataList;
  }

  async saveToStore(dataStore) {
    const storedData = {
      modType: this.getModType(),
      data: this.getData(),
      fileData: this.getFileData()
    };
    await dataStore.putData(this.getGUID(), storedData);
  }

  static async deleteFromStore(dataStore, guid) {
    await dataStore.deleteData(guid);
  }

  static async loadFromStore(dataStore, guid, contextProvider) {
    const storedData = await dataStore.getData(guid);
    if (!storedData) {
      return null;
    }
    const modData = this.mergeDataAndFileData(storedData.data, storedData.fileData);
    return new ModData(storedData.modType, contextProvider, modData);
  }

  static mergeDataAndFileData(data, fileData) {
    const mergedData = { ...data };
    for (const propId of Object.keys(fileData)) {
      const propFileData = fileData[propId];
      if (propFileData === null || propFileData === undefined) {
        continue;
      }
      if (Array.isArray(propFileData)) {
        mergedData[propId] = propFileData;
        continue;
      }
      if (typeof propFileData === "object") {
        mergedData[propId] = this.mergeDataAndFileData(data[propId], propFileData);
        continue;
      }
      mergedData[propId] = propFileData;
    }
    return mergedData;
  }
}
