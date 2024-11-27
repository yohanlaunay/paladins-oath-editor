import { describe, expect, test } from 'vitest';
import { DataStore } from './DataStore';

const BASE64_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII";

describe("Datastore tests", async () => {
    test('init', async () => {
        const store = new DataStore({ version: 1 });
        expect(await store.init()).toBeUndefined();
    });

    test('clear', async () => {
        const store = new DataStore({ version: 1 });
        expect(await store.init()).toBeUndefined();
        expect(await store.clear()).toBeUndefined();
        expect(await store.putData('str1', "hello")).toBeUndefined();
        expect(await store.putData('str2', "hello")).toBeUndefined();
        expect(await store.getAllKeys()).toStrictEqual(['str1', 'str2']);
        expect(await store.clear()).toBeUndefined();
        expect(await store.getAllKeys()).toStrictEqual([]);
    });

    test('read/write data', async () => {
        const store = new DataStore({ version: 1 });
        expect(await store.init()).toBeUndefined();
        // string
        expect(await store.putData('str', "hello")).toBeUndefined();
        expect(await store.getBase64Img('str')).toBe("hello");
        // int
        expect(await store.putData('int', 1000)).toBeUndefined();
        expect(await store.getBase64Img('int')).toBe(1000);
        // boolean
        expect(await store.putData('bool', true)).toBeUndefined();
        expect(await store.getBase64Img('bool')).toBe(true);
        // object
        expect(await store.putData('obj', {
            str: 'hello',
            int: 1000,
            bool: true,
            inner: {
                hello: 'world'
            }
        })).toBeUndefined();
        expect(await store.getBase64Img('obj')).toStrictEqual({
            str: 'hello',
            int: 1000,
            bool: true,
            inner: {
                hello: 'world'
            }
        });
    });

    test('read/write image', async () => {
        const store = new DataStore({ version: 1 });
        expect(await store.init()).toBeUndefined();
        expect(await store.putBase64Img('img', BASE64_IMG)).toBeUndefined();
        expect(await store.getBase64Img('img')).toBe(BASE64_IMG);
    });

});