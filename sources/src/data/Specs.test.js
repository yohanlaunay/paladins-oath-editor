import { describe, expect, test } from 'vitest';
import { Specs } from './Specs';
import { GameValues } from './GameValues';
import { EMPTY_IMAGE_B64, GameResources, GameResourceType } from './GameResources';
import { ModDescriptor } from './ModDescriptor';

describe("Specs tests", async () => {
    //----------------------------------------------------------------
    // Specs.Int
    //----------------------------------------------------------------
    describe('Specs.Int', () => {
        // parseJson
        test('Int> parse int', () => {
            expect(Specs.Int.parseJson(100)).toBe(100);
        });
        test('Int> parse string', () => {
            expect(Specs.Int.parseJson("100")).toBe(100);
        });
        test('Int> parse bad string failed', () => {
            expect(() => Specs.Int.parseJson("{val:100}")).toThrowError();
        });
        test('Int> parse obj failed', () => {
            expect(() => Specs.Int.parseJson({ val: 100 })).toThrowError();
        });

        // toJson
        test('Int> toJson', () => {
            expect(Specs.Int.toJson(100)).toBe(100);
        });

        // validator
        test('Int> validator int', () => {
            expect(Specs.Int.validator(100)).toBeUndefined();
        });
        test('Int> validator string', () => {
            expect(Specs.Int.validator("100")).toBeUndefined();
        });
        test('Int> validator bad string failed', () => {
            expect(() => Specs.Int.validator("{val:100}")).toThrowError();
        });
        test('Int> validator obj failed', () => {
            expect(() => Specs.Int.validator({ val: 100 })).toThrowError();
        });

        // validators.gt
        test('Int> validators#gt', () => {
            const validator = Specs.Int.validators.gt(100);
            expect(validator(101)).toBeUndefined();
        });
        test('Int> validators#gt false', () => {
            const validator = Specs.Int.validators.gt(100);
            expect(() => validator(10)).toThrowError();
        });
        test('Int> validators#gte', () => {
            const validator = Specs.Int.validators.gte(100);
            expect(validator(100)).toBeUndefined();
        });
        test('Int> validators#gte false', () => {
            const validator = Specs.Int.validators.gt(100, { allowEquals: false });
            expect(() => validator(100)).toThrowError();
        });
    });

    //----------------------------------------------------------------
    // Specs.Bool
    //----------------------------------------------------------------
    describe('Specs.Bool', () => {
        // parseJson
        test('Bool> parse int 1', () => {
            expect(Specs.Bool.parseJson(1)).toBe(true);
        });
        test('Bool> parse int 0', () => {
            expect(Specs.Bool.parseJson(0)).toBe(false);
        });
        test('Bool> parse bool', () => {
            expect(Specs.Bool.parseJson(true)).toBe(true);
        });
        test('Bool> parse string', () => {
            expect(Specs.Bool.parseJson("true")).toBe(true);
            expect(Specs.Bool.parseJson("false")).toBe(false);
        });
        test('Bool> parse bad string failed', () => {
            expect(() => Specs.Bool.parseJson("{val:100}")).toThrowError();
        });
        test('Bool> parse obj failed', () => {
            expect(() => Specs.Bool.parseJson({ val: 100 })).toThrowError();
        });

        // toJson
        test('Bool> toJson', () => {
            expect(Specs.Bool.toJson(true)).toBe(true);
            expect(Specs.Bool.toJson(false)).toBe(false);
        });
    });


    //----------------------------------------------------------------
    // Specs.String
    //----------------------------------------------------------------
    describe('Specs.String', () => {
        const specs = Specs.Words();
        // parseJson
        test('String> parse string', () => {
            expect(specs.parseJson(1)).toBe("1");
            expect(specs.parseJson("hello")).toBe("hello");
        });
        test('String> parse empty string', () => {
            expect(() => specs.parseJson("")).toThrowError();
        });
        test('String> parse obj failed', () => {
            expect(() => specs.parseJson({ val: 100 })).toThrowError();
        });
        // toJson
        test('String> toJson', () => {
            expect(specs.toJson("")).toBe("");
            expect(specs.toJson("HELLo!!")).toBe("HELLo!!");
        });
        // validators
        test('String> Words validator', () => {
            // valid alphanum
            expect(Specs.Words().validator("abCdEF00091aaaz")).toBeUndefined();
            // weird chars
            expect(() => Specs.Words().validator("ab___{}CdEF00091aaaz")).toThrowError();
        });
        test('String> Sentences validator', () => {
            // valid alphanum
            expect(Specs.Sentences().validator("abCdEF0. A hello brown fox; 09-1___aaaz")).toBeUndefined();
            // weird chars
            expect(() => Specs.Sentences().validator("ab___{}CdEF00091aaaz")).toThrowError();
        });
        test('String> GUID validator', () => {
            expect(Specs.GUID().validator("abcde___CdEF00091aaaz")).toBeUndefined();
            // id with dots
            expect(Specs.GUID().validator("abcde.x.y.z")).toBeUndefined();
            // start with less than 5
            expect(() => Specs.GUID().validator("a___CdEF00091aaaz")).toThrowError();
            // too many dots
            expect(() => Specs.GUID().validator("aaaaa..a")).toThrowError();
            // weird dot+underscore pattern
            expect(() => Specs.GUID().validator("aaaaa._.a")).toThrowError();
        });
        test('String> Simver validator', () => {
            const simver = Specs.String(/^(\d+\.)?(\d+\.)?(\*|\d+)$/, 'X or X.Y or X.Y.Z');
            expect(simver.validator('1')).toBeUndefined();
            expect(simver.validator('111')).toBeUndefined();
            expect(simver.validator('1.2')).toBeUndefined();
            expect(simver.validator('11.2')).toBeUndefined();
            expect(simver.validator('11.22')).toBeUndefined();
            expect(simver.validator('11.222')).toBeUndefined();
            expect(simver.validator('111.222')).toBeUndefined();
            expect(simver.validator('111.222.333')).toBeUndefined();
            expect(simver.validator('111.222.3')).toBeUndefined();
            expect(() => simver.validator('a.222.3')).toThrowError();
            expect(() => simver.validator('111.a.3')).toThrowError();
            expect(() => simver.validator('111.222.b')).toThrowError();
            expect(() => simver.validator('111x222')).toThrowError();
        });
    });

    //----------------------------------------------------------------
    // Specs.GameValue
    //----------------------------------------------------------------
    describe('Specs.GameValue', () => {
        // parseJson
        test('GameValue> parse valid val', () => {
            const spec = Specs.GameValue(GameValues.BattlePhase);
            expect(spec.parseJson(GameValues.BattlePhase.Block.value)).toBe(GameValues.BattlePhase.Block.value);
        });
        test('GameValue> parse string failed', () => {
            const spec = Specs.GameValue(GameValues.BattlePhase);
            expect(() => spec.parseJson(GameValues.BattlePhase.Block.value.toString())).toThrowError();
        });
        test('GameValue> parse obj failed', () => {
            const spec = Specs.GameValue(GameValues.BattlePhase);
            expect(() => spec.parseJson({ val: 100 })).toThrowError();
        });

        // toJson
        test('GameValue> toJson', () => {
            const spec = Specs.GameValue(GameValues.BattlePhase);
            expect(spec.toJson(GameValues.BattlePhase.Block.value)).toBe(GameValues.BattlePhase.Block.value);
        });

        // validator
        test('GameValue> validator valid val', () => {
            const spec = Specs.GameValue(GameValues.BattlePhase);
            expect(spec.validator(GameValues.BattlePhase.Block.value)).toBeUndefined();
        });
        test('GameValue> validator string failed', () => {
            const spec = Specs.GameValue(GameValues.BattlePhase);
            expect(() => spec.validator(GameValues.BattlePhase.Block.value.toString())).toThrowError();
        });
        test('GameValue> validator obj failed', () => {
            const spec = Specs.GameValue(GameValues.BattlePhase);
            expect(() => spec.validator({ val: 100 })).toThrowError();
        });

    });

    //----------------------------------------------------------------
    // Specs.GameRes
    //----------------------------------------------------------------
    describe('Specs.GameRes', () => {

        // parseJson
        test('GameRes> parse valid val', () => {
            const spec = Specs.GameRes(GameResourceType.Card);
            expect(spec.parseJson(GameResources.Card.card_acrobatics.id)).toBe(GameResources.Card.card_acrobatics.id);
        });
        test('GameRes> parse valid val with filter', () => {
            const spec = Specs.GameRes(GameResourceType.Card, /*contextProvider*/null, (val) => {
                return val.properties.isStarter;
            });
            // starter card accepted
            expect(spec.parseJson(GameResources.Card.card_acrobatics.id)).toBe(GameResources.Card.card_acrobatics.id);
            // non-starter card rejected
            expect(() => spec.parseJson(GameResources.Card.card_sylvanism.id)).toThrowError();
        });
        test('GameRes> parse obj failed', () => {
            const spec = Specs.GameRes(GameResourceType.Card);
            expect(() => spec.parseJson({ val: 100 })).toThrowError();
        });
        test('GameRes> parse obj with Mod ID', () => {
            const md = ModDescriptor.fromJson({
                guid: 'mod1',
                name: 'Mod 1',
                description: 'This is mod 1',
                author: 'firebiscuit',
                version: '1.0.0',
                mod_preview: EMPTY_IMAGE_B64,
                enemyMods: ['enemy1'] // register this enemy mod.
            });
            const spec = Specs.GameRes(GameResourceType.Enemy, { getModDescriptor: () => md });
            expect(spec.parseJson('enemy1')).toBe('enemy1');
        });

        // toJson
        test('GameRes> toJson', () => {
            const spec = Specs.GameRes(GameResourceType.Card);
            expect(spec.toJson(GameResources.Card.card_acrobatics.id)).toBe(GameResources.Card.card_acrobatics.id);
        });

        // validator
        test('GameRes> validator valid val', () => {
            const spec = Specs.GameRes(GameResourceType.Card);
            expect(spec.validator(GameResources.Card.card_acrobatics.id)).toBeUndefined();
        });
        test('GameRes> validator obj failed', () => {
            const spec = Specs.GameRes(GameResourceType.Card);
            expect(() => spec.validator({ val: 100 })).toThrowError();
        });
    });

    //----------------------------------------------------------------
    // Specs.CustomSpec
    //----------------------------------------------------------------
    describe('Specs.CustomSpec', () => {
        const spec = Specs.CustomSpec({
            properties: [
                {
                    id: 'name',
                    specs: Specs.Words(),
                },
                {
                    id: 'value1',
                    specs: Specs.Int,
                    optional: true,
                    validator: Specs.Int.validators.gt(0)
                },
                {
                    id: 'value2',
                    specs: Specs.Int,
                    optional: true,
                    validator: Specs.Int.validators.gt(0)
                },
                {
                    id: 'isOk',
                    specs: Specs.Bool,
                    default: true,
                }
            ],
            validator: (data) => {
                if (data['value1'] === undefined && data['value2'] === undefined) {
                    throw new Error("value1 or value2 must be defined");
                }
            }
        });
        // toJson
        test('CustomSpec> toJson', () => {
            expect(spec.toJson(spec.parseJson({
                name: 'Yohan',
                value1: 1000,
                isOk: false
            }))).toStrictEqual({
                name: 'Yohan',
                value1: 1000,
                isOk: false
            });
            expect(spec.toJson(spec.parseJson({
                name: 'Yohan',
                value2: 1000,
            }))).toStrictEqual({
                name: 'Yohan',
                value2: 1000,
                isOk: true
            });
        });
        // parseJson
        test('CustomSpec> parse valid val', () => {
            expect(spec.parseJson({
                name: 'Yohan',
                value1: 1000,
                isOk: false
            })).toStrictEqual({
                name: 'Yohan',
                value1: 1000,
                isOk: false
            });
        });
        test('CustomSpec> parse valid val extra props', () => {
            expect(spec.parseJson({
                name: 'Yohan',
                value1: 1000,
                isOk: false,
                randomStuff: 'stuff' // extra prop ignored.
            })).toStrictEqual({
                name: 'Yohan',
                value1: 1000,
                isOk: false
            });
        });
        test('CustomSpec> parse partial val', () => {
            expect(spec.parseJson({
                name: 'Yohan',
                value2: 1000,
            })).toStrictEqual({
                name: 'Yohan',
                value2: 1000,
                isOk: true // use default
            });
        });
        test('CustomSpec> parse invalid val', () => {
            expect(() => spec.parseJson({
                name: 'Yohan',
            })).toThrowError();
        });
        test('CustomSpec> parse missing required fields', () => {
            expect(() => spec.parseJson({})).toThrowError();
        });
        test('CustomSpec> parse not object', () => {
            expect(() => spec.parseJson([])).toThrowError();
            expect(() => spec.parseJson(true)).toThrowError();
            expect(() => spec.parseJson(1000)).toThrowError();
            expect(() => spec.parseJson('hello')).toThrowError();
        });
    });

    //----------------------------------------------------------------
    // Specs.OneOf
    //----------------------------------------------------------------
    describe('Specs.OneOf', () => {
        // parseJson
        test('OneOf> parse valid val string', () => {
            const spec = Specs.OneOf(['a', 'b', 'c']);
            expect(spec.parseJson('b')).toBe('b');
        });
        test('OneOf> parse invalid val string', () => {
            const spec = Specs.OneOf(['a', 'b', 'c']);
            expect(() => spec.parseJson('{b}')).toThrowError()
        });
        test('OneOf> parse valid val int', () => {
            const spec = Specs.OneOf([10, 20, 30]);
            expect(spec.parseJson(20)).toBe(20);
        });
        test('OneOf> parse invalid val int', () => {
            const spec = Specs.OneOf([10, 20, 30]);
            expect(() => spec.parseJson("20")).toThrowError()
        });

        test('OneOf> toJson', () => {
            const spec = Specs.OneOf([10, 20, 30]);
            expect(spec.toJson(20)).toBe(20);
        });

        // validator
        test('OneOf> validator valid val', () => {
            const spec = Specs.OneOf([1, 2, 3]);
            expect(spec.validator(1)).toBeUndefined();
        });
        test('OneOf> validator invalid val', () => {
            const spec = Specs.OneOf([1, 2, 3]);
            expect(() => spec.validator(5)).toThrowError();
        });
    });

    //----------------------------------------------------------------
    // Specs.GameValueList
    //----------------------------------------------------------------
    describe('Specs.GameValueList', () => {
        // parseJson
        test('GameValueList> parse valid val', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(spec.parseJson([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value
            ])).toStrictEqual([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value
            ]);
        });

        test('GameValueList> parse valid val with duplicates allowed', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase, { allowDuplicates: true });
            expect(spec.parseJson([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
                GameValues.BattlePhase.Block.value
            ])).toStrictEqual([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
                GameValues.BattlePhase.Block.value
            ]);
        });

        test('GameValueList> parse valid val with duplicates filtered', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase, { allowDuplicates: false });
            expect(spec.parseJson([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
                GameValues.BattlePhase.Block.value
            ])).toStrictEqual([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value
            ]);
        });

        test('GameValueList> parse invalid val', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(() => spec.parseJson([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
                -1
            ])).toThrowError();
        });
        test('GameValueList> parse string failed', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(() => spec.parseJson(["3", "2"])).toThrowError();
        });
        test('GameValueList> parse obj failed', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(() => spec.parseJson({ val: 100 })).toThrowError();
        });

        test('GameValueList> toJson', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(spec.toJson([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value
            ])).toStrictEqual([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value
            ]);
        });

        // validator
        test('GameValueList> validator valid val', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(spec.validator([
                GameValues.BattlePhase.Block.value
            ])).toBeUndefined();
        });
        test('GameValueList> validator invalid duplicate val', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(() => spec.validator([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
                GameValues.BattlePhase.Block.value
            ])).toThrowError();
        });
        test('GameValueList> validator valid duplicate val', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase, { allowDuplicates: true });
            expect(spec.validator([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
                GameValues.BattlePhase.Block.value
            ])).toBeUndefined();
        });
        test('GameValueList> validator invalid val', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(() => spec.validator([
                GameValues.BattlePhase.Block.value,
                -1
            ])).toThrowError();
        });
        test('GameValueList> validator string failed', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(() => spec.validator([
                GameValues.BattlePhase.Block.value.toString()
            ])).toThrowError();
        });
        test('GameValueList> validator obj failed', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase);
            expect(() => spec.validator({ val: 100 })).toThrowError();
        });
        test('GameValueList> validator incorrect min size', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase, { minCount: 1 });
            expect(() => spec.validator([])).toThrowError();
        });
        test('GameValueList> validator correct min size', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase, { minCount: 1 });
            expect(spec.validator([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
            ])).toBeUndefined();
        });
        test('GameValueList> validator incorrect max size', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase, { maxCount: 1 });
            expect(() => spec.validator([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
            ])).toThrowError();
        });
        test('GameValueList> validator correct max size', () => {
            const spec = Specs.GameValueList(GameValues.BattlePhase, { maxCount: 2 });
            expect(spec.validator([
                GameValues.BattlePhase.Block.value,
                GameValues.BattlePhase.Attack.value,
            ])).toBeUndefined();
        });
    });

    //----------------------------------------------------------------
    // Specs.GameResList
    //----------------------------------------------------------------
    describe('Specs.GameRestList', () => {
        // parseJson
        test('GameResList> parse valid val', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(spec.parseJson([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id
            ])).toStrictEqual([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id
            ]);
        });
        test('GameResList> parse valid val with duplicates allowed', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {}, { allowDuplicates: true });
            expect(spec.parseJson([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id,
                GameResources.Terrain.terrain__desert.id
            ])).toStrictEqual([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id,
                GameResources.Terrain.terrain__desert.id
            ]);
        });
        test('GameResList> parse valid val with duplicates filtered', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {}, { allowDuplicates: false });
            expect(spec.parseJson([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id,
                GameResources.Terrain.terrain__desert.id
            ])).toStrictEqual([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id
            ]);
        });
        test('GameResList> parse invalid val', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(() => spec.parseJson([
                GameResources.Terrain.terrain__desert.id,
                -1
            ])).toThrowError();
        });
        test('GameResList> parse string failed', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(() => spec.parseJson(["3", "2"])).toThrowError();
        });
        test('GameResList> parse obj failed', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(() => spec.parseJson({ val: 100 })).toThrowError();
        });

        // toJson
        test('GameResList> toJson', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(spec.toJson([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id
            ])).toStrictEqual([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id
            ]);
        });

        // validator
        test('GameResList> validator valid val', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(spec.validator([
                GameResources.Terrain.terrain__desert.id
            ])).toBeUndefined();
        });
        test('GameResList> validator invalid duplicate val', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(() => spec.validator([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id,
                GameResources.Terrain.terrain__desert.id
            ])).toThrowError();
        });
        test('GameResList> validator valid duplicate val', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {}, { allowDuplicates: true });
            expect(spec.validator([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id,
                GameResources.Terrain.terrain__desert.id
            ])).toBeUndefined();
        });
        test('GameResList> validator invalid val', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(() => spec.validator([
                GameResources.Terrain.terrain__desert.id,
                -1
            ])).toThrowError();
        });
        test('GameResList> validator obj failed', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {});
            expect(() => spec.validator({ val: 100 })).toThrowError();
        });
        test('GameResList> validator invalid min size', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {}, { minCount: 2 });
            expect(() => spec.validator([
                GameResources.Terrain.terrain__desert.id
            ])).toThrowError();
        });
        test('GameResList> validator correct min size', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {}, { minCount: 2 });
            expect(spec.validator([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id
            ])).toBeUndefined();
        });
        test('GameResList> validator correct max size', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {}, { maxCount: 1 });
            expect(spec.validator([
                GameResources.Terrain.terrain__desert.id,
            ])).toBeUndefined();
        });
        test('GameResList> validator incorrect max size', () => {
            const spec = Specs.GameResList(GameResourceType.Terrain, {}, { maxCount: 1 });
            expect(() => spec.validator([
                GameResources.Terrain.terrain__desert.id,
                GameResources.Terrain.terrain__forest.id,
            ])).toThrowError();
        });
    });


    //----------------------------------------------------------------
    // Specs.CustomSpecList
    //----------------------------------------------------------------
    describe('Specs.CustomSpecList', () => {
        const spec = Specs.CustomSpecList({
            properties: [
                {
                    id: 'name',
                    specs: Specs.Words()
                }
            ]
        });

        // toJson
        test('CustomSpecList> toJson', () => {
            expect(spec.toJson(spec.parseJson([
                { name: 'Yohan' },
                { name: 'Claire' },
            ]))).toStrictEqual([
                { name: 'Yohan' },
                { name: 'Claire' },
            ]);
        });

        // parseJson
        test('CustomSpecList> parse valid val', () => {
            expect(spec.parseJson([
                { name: 'Yohan' },
                { name: 'Claire' },
            ])).toStrictEqual([
                { name: 'Yohan' },
                { name: 'Claire' },
            ]);
        });
        test('CustomSpecList> parse valid val with filtered props', () => {
            expect(spec.parseJson([
                { name: 'Yohan', randomStuff: 'yay' },
                { name: 'Claire' },
            ])).toStrictEqual([
                { name: 'Yohan' },
                { name: 'Claire' },
            ]);
        });
        test('CustomSpecList> parse invalid val', () => {
            expect(() => spec.parseJson([
                { name: 'Yohan' },
                {},
            ])).toThrowError();
        });
        test('CustomSpecList> parse invalid data', () => {
            expect(() => spec.parseJson([
                { name: 'Yohan' },
                -1,
            ])).toThrowError();
        });
    });
});