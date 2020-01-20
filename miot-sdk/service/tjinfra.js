/**
 * @export private
 * @doc_name 红外库组件
 * @module miot/service/infra
 * @description infra
 *
 */
//@native
import native from "../native";
//@native
const { TJInfra } = native;
export default {
    /**
     * createClient
     * @param {String} name 
     */
    createClient(name) {
        //@native begin
        TJInfra.createClient(name);
        //@native end
    },
    /**
     * destroyClient
     * @param {String} name 
     */
    destroyClient(name) {
        //@native begin
        TJInfra.destroyClient(name)
        //@native end
    },
    /**
     * exactMatchRemote
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    exactMatchRemote(clientName, page) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.exactMatchRemote(clientName, native.isAndroid ? JSON.stringify(page) : page, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        })
        //@native end
    },
    /**
     * exactMatchRemoteIfPower
     * @param {string} clientName 
     * @param {json} page 
     * @param {bool} matchPower 
     * @returns promise
     */
    exactMatchRemoteIfPower(clientName, page, matchPower) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.exactMatchRemoteIfPower(clientName, native.isAndroid ? JSON.stringify(page) : page, matchPower, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        })
        //@native end
    },
    /**
     * searchDiy
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    searchDiy(clientName, page) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.searchDiy(clientName, native.isAndroid ? JSON.stringify(page) : page, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        })
        //@native end
    },
    /**
     * searchOfficial
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    searchOfficial(clientName, page) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.searchOfficial(clientName, native.isAndroid ? JSON.stringify(page) : page, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        })
        //@native end
    },
    /**
     * searchAirRemote
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    searchAirRemote(clientName, page) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.searchAirRemote(clientName, native.isAndroid ? JSON.stringify(page) : page, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        })
        //@native end
    },
    /**
     * downloadRemote
     * @param {string} clientName 
     * @param {string} remoteId 
     */
    downloadRemote(clientName, remoteId) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.downloadRemote(clientName, remoteId, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        })
        //@native end
    },
    /**
     * loadBrands
     * @param {string} clientName 
     */
    loadBrands(clientName) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.loadBrands(clientName, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * autoMatchRemote
     * @param {string} clientName 
     * @param {json} page 
     */
    autoMatchRemote(clientName, page) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.autoMatchRemote(clientName, native.isAndroid ? JSON.stringify(page) : page, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * missModel
     * @param {string} clientName 
     * @param {int} type 
     * @param {int} brandId 
     * @param {string} model 
     */
    missModel(clientName, type, brandId, model) {
        //@native :=> promise 
        TJInfra.missModel(clientName, type, brandId, model);
        //@native end
    },
    /**
     * getIRCode
     * @param {int} freq 
     * @param {string} data 
     */
    getIRCode(freq, data) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.getIRCode(freq, data, (ok, header, content) => {
                if (ok) {
                    resolve({ 'header': header, 'content': content });
                } else {
                    reject('failed');
                }
            })
        });
        //@native end
    },
    /**
     * buildIRCode
     * @param {int} freq 
     * @param {string} base64Data 
     */
    buildIRCode(freq, base64Data) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.buildIRCode(freq, base64Data, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * fetchRemoteInfrared
     * @param {json} remoteDict 
     * @param {json} key 
     */
    fetchRemoteInfrared(remoteDict, key) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.fetchRemoteInfrared(native.isAndroid ? JSON.stringify(remoteDict) : remoteDict, native.isAndroid ? JSON.stringify(key) : key, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * 
     * @param {json} remoteDict 
     * @param {json} key 
     * @param {json} state 
     */
    fetchAirRemoteInfrared(remoteDict, key, state) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.fetchAirRemoteInfrared(native.isAndroid ? JSON.stringify(remoteDict) : remoteDict, native.isAndroid ? JSON.stringify(key) : key, native.isAndroid ? JSON.stringify(state) : state, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * 
     * @param {json} keyDict 
     * @param {json} state 
     * @param {json} time 
     */
    fetchAirTimerInfrared(keyDict, state, time) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.fetchAirTimerInfrared(native.isAndroid ? JSON.stringify(keyDict) : keyDict, native.isAndroid ? JSON.stringify(state) : state, native.isAndroid ? JSON.stringify(time) : time, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * getAirRemoteState
     * @param {json} remoteDict 
     */
    getAirRemoteState(remoteDict) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.getAirRemoteState(native.isAndroid ? JSON.stringify(remoteDict) : remoteDict, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * isMemoryKey
     * @param {json} keyDict 
     */
    isMemoryKey(keyDict) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.isMemoryKey(native.isAndroid ? JSON.stringify(keyDict) : keyDict, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * isCustomKey
     * @param {json} keyDict 
     */
    isCustomKey(keyDict) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.isCustomKey(native.isAndroid ? JSON.stringify(keyDict) : keyDict, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * 加载全部省份信息（省份不包含城市列表）
     */
    getAllProvinces() {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.getAllProvinces((ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * 加载城市列表
     */
    getAllCities() {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.getAllCities((ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * 加载运营商
     */
    getAllProviders() {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.getAllProviders((ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * 获取运营商推荐遥控器
     * @param {int} city_id 
     * @param {int} provider 
     */
    loadProviderRemotesByCity(city_id, provider) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.loadProviderRemotesByCity(city_id, provider, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * 加载城市 - 运营商关联数据
     */
    loadCityProviders() {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.loadCityProviders((ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * getProviderInCity
     * @param {int} city_id 
     */
    getProviderInCity(city_id) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.getProviderInCity(city_id, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    /**
     * getCityInProvince
     * @param {int} province_id 
     */
    getCityInProvince(province_id) {
        //@native :=> promise 
        return new Promise((resolve, reject) => {
            TJInfra.getCityInProvince(province_id, (ok, res) => {
                if (ok) {
                    resolve(this.convertResultDataToJson(res));
                } else {
                    reject(res);
                }
            })
        });
        //@native end
    },
    //@native begin
    /**
     * 对于Android这边，data的格式统一为：{code:x, result:"xxx"}
     * 保证与ios统一，对result进行一次json转换
     * @param data
     * @returns {*}
     */
    convertResultDataToJson(data) {
        if (native.isAndroid && data && data.result) {
            data.result = JSON.parse(data.result);
        } else if (native.isAndroid && data) {
            //no resule, set data to result
            return { code: 0, result: data }
        }
        return data;
    }
    //@native end
}