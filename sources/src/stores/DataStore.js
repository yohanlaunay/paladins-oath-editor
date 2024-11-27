const DB_NAME = 'paladinsoath.db';
const DB_STORE = 'store';

export class DataStore {
    constructor(props = {}) {
        this.version = props.version || 1;
        this.assets = {};
        this.db = null;
    }

    init() {
        return new Promise(resolve => {
            const request = indexedDB.open(DB_NAME, this.version);

            request.onupgradeneeded = event => {
                event.target.result.createObjectStore(DB_STORE);
            };

            request.onsuccess = () => {
                this.db = request.result;

                this.db.onerror = () => {
                    console.error('Error creating/accessing db');
                };

                if (this.db.setVersion && this.db.version !== this.version) {
                    const version = this.db.setVersion(this.version);
                    version.onsuccess = () => {
                        this.db.createObjectStore(DB_STORE);
                        resolve();
                    };
                } else {
                    resolve();
                }
            };
        });
    }

    clear() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject('DB not initialized. Call the init method');
            }

            const db = this.db;
            const transaction = db.transaction([DB_STORE], 'readwrite');
            transaction.objectStore(DB_STORE).clear();
            resolve();
        });
    }

    downloadAndStoreImage(key, url) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject('DB not initialized. Call the init method');
            }

            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = response;
            xhr.onerror = e => console.error(e);
            xhr.send();

            const db = this.db;

            function response(event) {
                const blob = this.response;
                const transaction = db.transaction([DB_STORE], 'readwrite');
                const put = transaction.objectStore(DB_STORE).put(blob, key);
                resolve();
            }
        });
    }

    deleteData(key) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject('DB not initialized. Call the init method');
            }

            const db = this.db;
            const transaction = db.transaction([DB_STORE], 'readwrite');
            transaction.objectStore(DB_STORE).delete(key);
            resolve();
        });
    }

    putData(key, data) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject('DB not initialized. Call the init method');
            }

            const db = this.db;
            const transaction = db.transaction([DB_STORE], 'readwrite');
            transaction.objectStore(DB_STORE).put(data, key);
            resolve();
        });
    }

    getData(key) {
        return new Promise(resolve => {
            const transaction = this.db.transaction([DB_STORE]);
            transaction.objectStore('store').get(key).onsuccess = event => {
                resolve(event.target.result);
            };
        });
    }

    getAllKeys() {
        return new Promise(resolve => {
            const transaction = this.db.transaction([DB_STORE]);
            transaction.objectStore('store').getAllKeys().onsuccess = event => {
                resolve(event.target.result.sort());
            };
        });
    }

    putBase64Img(key, data, imgType = 'png') {
        let blob;
        if (!data.startsWith('data:image/')) {
            blob = 'data:image/' + imgType + ';base64,' + data;
        } else {
            blob = data;
        }
        return this.putData(key, blob);
    }

    getBase64Img(key) {
        return this.getData(key);
    }
}
