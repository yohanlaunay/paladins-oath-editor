import { StringSpecEditor } from '../components/Spec/StringSpecEditor';
import { ImageSpecEditor } from '../components/Spec/ImageSpecEditor';
import { FindResourceById } from './GameResources';
import { FindEnumByValue } from './GameValues';
import { ModTypeToResourceType } from './ModTypeToResourceType.js';
import { IntSpecEditor } from '../components/Spec/IntSpecEditor';
import { BoolSpecEditor } from '../components/Spec/BoolSpecEditor';
import { GameValueSpecEditor } from '../components/Spec/GameValueSpecEditor';
import { OneOfSpecEditor } from '../components/Spec/OneOfSpecEditor';
import { CustomSpecEditor } from '../components/Spec/CustomSpecEditor';
import { GameResSpecEditor } from '../components/Spec/GameResSpecEditor';
import { GameValueListSpecEditor } from '../components/Spec/GameValueListSpecEditor';
import { GameResListSpecEditor } from '../components/Spec/GameResListSpecEditor';
import { ImageListSpecEditor } from '../components/Spec/ImageListSpecEditor';
import { CustomSpecListSpecEditor } from '../components/Spec/CustomSpecListSpecEditor';

export const Specs = {
    Int: {
        render: (renderingData) => <IntSpecEditor data={renderingData} />,
        toJson: (data) => data,
        parseJson: (val) => {
            if (Number.isInteger(val)) return val;

            const result = Number.parseInt(val, /*base=*/10);
            if (!Number.isNaN(result)) return result;

            throw new Error("Invalid Value: " + JSON.stringify(val));
        },
        validator: (val) => { Specs.Int.parseJson(val) },
        validators: {
            // Options: {allowEquals: false}
            gt: function (minBound, options = null) {
                const allowEquals = !!options ? (options.allowEquals === true) : false;
                return function (val) {
                    if (val > minBound) return;
                    if (allowEquals && val === minBound) return;

                    if (allowEquals) throw new Error("Value should be greater or equal to " + minBound);
                    else throw new Error("Value should be greater than " + minBound);
                }
            },
            gte: (minBound) => Specs.Int.validators.gt(minBound, { allowEquals: true }),
        }
    },
    Bool: {
        render: (renderingData) => <BoolSpecEditor data={renderingData} />,
        toJson: (data) => data,
        parseJson: (val) => {
            if (Number.isInteger(val)) return val === 1;
            if (typeof val === typeof true) return val;
            if (val === 'true' || val === 'false') return val === 'true';
            throw new Error("Invalid Value: " + JSON.stringify(val));
        },
        validator: (val) => { Specs.Bool.parseJson(val) }
    },
    String: (regex, requirementsDesc, renderConfig = {}) => {
        renderConfig = renderConfig || {};
        return {
            render: (renderingData) => <StringSpecEditor data={renderingData} renderConfig={renderConfig} />,
            toJson: (data) => data,
            parseJson: (val) => {
                if (typeof val === 'string') {
                    if (val == '') throw new Error("Empty Value");
                    if (!regex.test(val)) throw new Error("Value does not match the requirements \"" + requirementsDesc + "\" : '" + val + "'");
                    return val;
                }
                if (typeof val !== 'object' && !Array.isArray(val)) return val.toString();

                throw new Error("Invalid Value: " + JSON.stringify(val));
            },
            validator: (val) => { Specs.String(regex, requirementsDesc).parseJson(val) },
        }
    },
    GUID: () => Specs.String(
        /^[a-zA-Z]{3,}([_]*[\.]?[a-zA-Z\d]+)*$/,
        "GUID format: [a-Z]x3 + repeat ('_'/'.' + [a-Z0-9]+)"
    ),
    Words: () => Specs.String(
        /^[a-zA-Z_\-\d\s\(\)'"]+$/,
        'Alpha-Numerical with spaces and underscores'
    ),
    Sentences: () => Specs.String(
        /^[a-zA-Z\d_\s\.\-;,'"]+$/,
        'No special characters. Only alpha-num, space/underscore/dash/punctuation',
        { isText: true }
    ),
    // ImgInfo: {width, height, ext=png}
    Image: function (imgInfo) {
        imgInfo = {
            width: !!imgInfo ? (imgInfo.width || 0) : 0,
            height: !!imgInfo ? (imgInfo.height || 0) : 0,
            ext: !!imgInfo ? (imgInfo.ext || 'png') : 'png'
        };
        if (imgInfo.width <= 0 || imgInfo.height <= 0) {
            throw new Error("Invalid Image info, expecting {width,height,ext} got " + JSON.stringify(imgInfo));
        }
        return {
            isFile: true,
            fileExt: imgInfo.ext,
            imgInfo: imgInfo,
            render: (renderingData) => <ImageSpecEditor data={renderingData} info={imgInfo} />,
            toJson: (data, rootId) => rootId+"."+imgInfo.ext,
            parseJson: (val) => {
                if (val === null || typeof val !== 'string') throw new Error("Invalid value: " + JSON.stringify(val));
                if (val == '') throw new Error("Empty Value");
                return val;
            },
            validator: (val) => { Specs.Image(imgInfo).parseJson(val) }
        }
    },
    // ImgInfo: {width, height, ext}
    // ListParams: {minCount=0, maxCount = -1}
    ImageList: function (imgInfo, listParams = null) {
        const minCount = !!listParams ? (listParams.minCount || 0) : 0;
        const maxCount = !!listParams ? (listParams.maxCount || -1) : -1;
        listParams = { minCount:minCount, maxCount: maxCount };
        imgInfo = {
            width: !!imgInfo ? (imgInfo.width || 0) : 0,
            height: !!imgInfo ? (imgInfo.height || 0) : 0,
            ext: !!imgInfo ? (imgInfo.ext || 'png') : 'png'
        };

        return {
            isList: true,
            isFile: true,
            fileExt: imgInfo.ext,
            imgInfo: imgInfo,
            render: (renderingData) => <ImageListSpecEditor data={renderingData} info={imgInfo} listParams={listParams} />,
            toJson: (dataList, rootId) => {
                const spec = Specs.Image(imgInfo);
                const out = [];
                for (let dataIdx in dataList) {
                    const fileId = rootId+'_'+dataIdx;
                    const data = dataList[dataIdx];
                    out.push(spec.toJson(data, fileId));
                }
                return out;
            },
            parseJson: (valList) => {
                if (valList === null || !Array.isArray(valList)) throw new Error("Value should be a list: " + JSON.stringify(valList));

                const spec = Specs.Image(imgInfo);
                let outList = [];
                for (let val of valList) {
                    if (maxCount > 0 && outList.length >= maxCount) {
                        break; // cap the list.
                    }
                    outList.push(spec.parseJson(val));
                }
                return outList;
            },
            validator: (valList) => {
                if (valList === null) throw new Error("Values missing");

                Specs.ImageList(imgInfo, listParams).parseJson(valList);

                if (minCount > 0 && valList.length < minCount)
                    throw new Error("Not enough values, need " + minCount + " values");
                if (maxCount > 0 && valList.length > maxCount)
                    throw new Error("Too many values, max " + maxCount + " values");
            }
        }
    },
    GameValue: function (gameVals) {
        return {
            render: (renderingData) => <GameValueSpecEditor data={renderingData} values={gameVals} />,
            toJson: (data) => data,
            parseJson: (val) => {
                const gameVal = FindEnumByValue(gameVals, val);
                if (gameVal !== null) return gameVal.value;

                throw new Error("Invalid Value: " + JSON.stringify(val));
            },
            validator: (val) => { Specs.GameValue(gameVals).parseJson(val) }
        };
    },
    // contextProvider {getModDescriptor}
    GameRes: function (gameResType, contextProvider, isValidFn = null) {
        contextProvider = !!contextProvider && !!contextProvider.getModDescriptor ? contextProvider : { getModDescriptor: () => null };
        return {
            isGameResource: true,
            render: (renderingData) => <GameResSpecEditor data={renderingData} gameResType={gameResType} isValidResFn={isValidFn} />,
            toJson: (data) => data,
            parseJson: (val) => {
                // check the active ModDescriptor
                const md = contextProvider.getModDescriptor();
                if (md !== null) {
                    const modType = md.findModType(val);
                    if (modType !== null) {
                        if (ModTypeToResourceType[modType] === gameResType) {
                            // we cannot apply the filter here it would force
                            // to load the ModData from database and make
                            // the method async.
                            // We will defer to the UI to validate the data.
                            return val; // all good
                        }
                        throw new Error("Resource Id '" + val + "' belongs to another mod '" + modType + "'");
                    }
                }
                // check basic resources
                const res = FindResourceById(gameResType, val);
                if (res !== null){
                    if( !!isValidFn && ! isValidFn(res) ){
                        throw new Error("Resource Id '"+val+"' is not valid for this property");
                    }
                    return res.id;
                }

                throw new Error("Invalid Value: " + JSON.stringify(val));
            },
            validator: (val) => { Specs.GameRes(gameResType, contextProvider, isValidFn).parseJson(val) }
        };
    },
    OneOf: function (dataList) {
        return {
            render: (renderingData) => <OneOfSpecEditor data={renderingData} values={dataList} />,
            toJson: (data) => data,
            parseJson: (val) => {
                for (const data of dataList) {
                    if (data === val) {
                        return data;
                    }
                }
                throw new Error("Invalid Value: " + JSON.stringify(val));
            },
            validator: (val) => { Specs.OneOf(dataList).parseJson(val) }
        };
    },
    CustomSpec: function (customSpec) {
        return {
            isCustomSpec: true,
            customSpec: customSpec,
            render: (renderingData) => <CustomSpecEditor data={renderingData} specs={customSpec} />,
            toJson: (data) => {
                const out = {};
                for (let prop of customSpec.properties) {
                    const val = data[prop.id];
                    if (val === undefined) {
                        if (prop.default !== undefined) {
                            out[prop.id] = prop.default;
                        }
                        continue; // skip optional values
                    }
                    out[prop.id] = prop.specs.toJson(val, prop.id);
                }
                return out;
            },
            parseJson: (val) => {
                if (val === null || typeof val !== 'object') throw new Error("Value should be an object: " + JSON.stringify(val));

                let out = {};

                for (let prop of customSpec.properties) {
                    let propVal;
                    if (val[prop.id] === undefined || val[prop.id] === null) {
                        if (prop.default !== undefined) {
                            propVal = prop.default;
                        } else if (prop.optional !== true) {
                            throw new Error("Missing property '" + prop.id + "'");
                        } else {
                            continue; // skip this value
                        }
                    } else {
                        propVal = prop.specs.parseJson(val[prop.id]);
                        if (prop.validator !== undefined) {
                            prop.validator(propVal);
                        }
                    }
                    out[prop.id] = propVal;
                }

                if (customSpec.validator !== undefined) {
                    customSpec.validator(out);
                }

                return out;
            },
            validator: (val) => { Specs.CustomSpec(customSpec).parseJson(val) }
        }
    },
    // ListParams { minCount = 0, maxCount = -1, allowDuplicates = false }
    GameValueList: function (gameVals, listParams = null) {
        const minCount = !!listParams ? (listParams.minCount || 0) : 0;
        const maxCount = !!listParams ? (listParams.maxCount || -1) : -1;
        const allowDuplicates = !!listParams ? !!listParams.allowDuplicates : false;
        listParams = {minCount: minCount, maxCount: maxCount, allowDuplicates: allowDuplicates};

        return {
            isList: true,
            render: (renderingData) => <GameValueListSpecEditor data={renderingData} values={gameVals} listParams={listParams} />,
            toJson: (dataList) => {
                const spec = Specs.GameValue(gameVals);
                const out = [];
                for (let data of dataList) {
                    out.push(spec.toJson(data));
                }
                return out;
            },
            parseJson: (valList) => {
                if (valList === null || !Array.isArray(valList)) throw new Error("Value should be a list: " + JSON.stringify(valList));

                let outList = [];
                for (let val of valList) {
                    if (maxCount > 0 && outList.length >= maxCount) {
                        break; // cap the list.
                    }
                    const gameVal = FindEnumByValue(gameVals, val);
                    if (gameVal !== null) {
                        if (allowDuplicates || !outList.includes(gameVal.value)) {
                            outList.push(gameVal.value);
                        }
                        continue;
                    }
                    throw new Error("Invalid Value: " + JSON.stringify(val));
                }
                return outList;
            },
            validator: (valList) => {
                if (valList === null) throw new Error("Values missing");

                const outList = Specs.GameValueList(gameVals, listParams).parseJson(valList);

                if (minCount > 0 && valList.length < minCount) throw new Error("Not enough values, need " + minCount + " values");
                if (maxCount > 0 && valList.length > maxCount) throw new Error("Too many values, max " + maxCount + " values");
                if (!allowDuplicates && outList.length !== valList.length) throw new Error("Duplicate values found");
            }
        }
    },
    // contextProvider {getModDescriptor}
    // ListParams { minCount = 0, maxCount = -1, allowDuplicates = false }
    GameResList: function (gameResType, contextProvider, listParams = null, isValidFn = null) {
        const minCount = !!listParams ? (listParams.minCount || 0) : 0;
        const maxCount = !!listParams ? (listParams.maxCount || -1) : -1;
        const allowDuplicates = !!listParams ? !!listParams.allowDuplicates : false;
        listParams = {minCount: minCount, maxCount: maxCount, allowDuplicates: allowDuplicates};

        return {
            isList: true,
            isGameResource: true,
            render: (renderingData) => <GameResListSpecEditor data={renderingData} gameResType={gameResType} listParams={listParams} isValidResFn={isValidFn} />,
            toJson: (dataList) => {
                const spec = Specs.GameRes(gameResType, contextProvider, isValidFn);
                const out = [];
                for (let data of dataList) {
                    out.push(spec.toJson(data));
                }
                return out;
            },
            parseJson: (valList) => {
                if (!Array.isArray(valList)) throw new Error("Value should be a list: " + JSON.stringify(valList));
                const specs = Specs.GameRes(gameResType, contextProvider, isValidFn);
                let outList = [];
                for (let val of valList) {
                    if (maxCount > 0 && outList.length >= maxCount) {
                        break; // cap the list.
                    }
                    const resId = specs.parseJson(val);
                    if (resId !== null) {
                        if (allowDuplicates || !outList.includes(resId)) {
                            outList.push(resId);
                        }
                        continue;
                    }
                    throw new Error("Invalid Value: " + JSON.stringify(val));
                }
                return outList;
            },
            validator: (valList) => {
                if (valList === null) throw new Error("Values missing");

                const outList = Specs.GameResList(gameResType, contextProvider, listParams, isValidFn).parseJson(valList);

                if (minCount > 0 && outList.length < minCount) throw new Error("Not enough values, need " + minCount + " values");
                if (maxCount > 0 && outList.length > maxCount) throw new Error("Too many values, max " + maxCount + " values");
                if (!allowDuplicates && outList.length !== valList.length) throw new Error("Duplicate values found");
            }
        }
    },
    // ListParams { minCount = 0, maxCount = -1, allowDuplicates = false }
    CustomSpecList: function (customSpec, listParams = {}) {
        const minCount = !!listParams ? (listParams.minCount || 0) : 0;
        const maxCount = !!listParams ? (listParams.maxCount || -1) : -1;
        listParams = { minCount: minCount, maxCount: maxCount };

        return {
            isList: true,
            isCustomSpec: true,
            customSpec: customSpec,
            render: (renderingData) => <CustomSpecListSpecEditor data={renderingData} specs={customSpec} listParams={listParams} />,
            toJson: (dataList) => {
                const spec = Specs.CustomSpec(customSpec);
                const out = [];
                for (let data of dataList) {
                    out.push(spec.toJson(data));
                }
                return out;
            },
            parseJson: (valList) => {
                if (!Array.isArray(valList)) throw new Error("Value should be a list: " + valList);

                const specs = Specs.CustomSpec(customSpec);

                let outList = [];
                for (let val of valList) {
                    if (maxCount > 0 && outList.length >= maxCount) {
                        break; // cap the list.
                    }
                    const data = specs.parseJson(val);
                    outList.push(data);
                }
                return outList;
            },
            validator: (valList) => {
                if (valList === null) throw new Error("Values missing");

                const outList = Specs.CustomSpecList(customSpec, listParams).parseJson(valList);

                if (minCount > 0 && outList.length < minCount) throw new Error("Not enough values, need " + minCount + " values");
                if (maxCount > 0 && outList.length > maxCount) throw new Error("Too many values, max " + maxCount + " values");
            }
        }
    }
};