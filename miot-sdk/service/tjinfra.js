/**
 * @export
 * @module miot/service/infra
 * @description infra
 *
 */
export default {
    /**
     * createClient
     * @param {String} name 
     */
    createClient(name) {
    },
    /**
     * destroyClient
     * @param {String} name 
     */
    destroyClient(name) {
    },
    /**
     * exactMatchRemote
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    exactMatchRemote(clientName, page) {
         return Promise.resolve(null);
    },
    /**
     * exactMatchRemoteIfPower
     * @param {string} clientName 
     * @param {json} page 
     * @param {bool} matchPower 
     * @returns promise
     */
    exactMatchRemoteIfPower(clientName, page, matchPower) {
         return Promise.resolve(null);
    },
    /**
     * searchDiy
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    searchDiy(clientName, page) {
         return Promise.resolve(null);
    },
    /**
     * searchOfficial
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    searchOfficial(clientName, page) {
         return Promise.resolve(null);
    },
    /**
     * searchAirRemote
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    searchAirRemote(clientName, page) {
         return Promise.resolve(null);
    },
    /**
     * downloadRemote
     * @param {string} clientName 
     * @param {string} remoteId 
     */
    downloadRemote(clientName, remoteId) {
         return Promise.resolve(null);
    },
    /**
     * loadBrands
     * @param {string} clientName 
     */
    loadBrands(clientName) {
         return Promise.resolve(null);
    },
    /**
     * autoMatchRemote
     * @param {string} clientName 
     * @param {json} page 
     */
    autoMatchRemote(clientName, page) {
         return Promise.resolve(null);
    },
    /**
     * missModel
     * @param {string} clientName 
     * @param {int} type 
     * @param {int} brandId 
     * @param {string} model 
     */
    missModel(clientName, type, brandId, model) {
         return Promise.resolve(null);
    },
    /**
     * getIRCode
     * @param {int} freq 
     * @param {string} data 
     */
    getIRCode(freq, data) {
         return Promise.resolve(null);
    },
    /**
     * buildIRCode
     * @param {int} freq 
     * @param {string} base64Data 
     */
    buildIRCode(freq, base64Data) {
         return Promise.resolve(null);
    },
    /**
     * fetchRemoteInfrared
     * @param {json} remoteDict 
     * @param {json} key 
     */
    fetchRemoteInfrared(remoteDict, key) {
         return Promise.resolve(null);
    },
    /**
     * 
     * @param {json} remoteDict 
     * @param {json} key 
     * @param {json} state 
     */
    fetchAirRemoteInfrared(remoteDict, key, state) {
         return Promise.resolve(null);
    },
    /**
     * 
     * @param {json} keyDict 
     * @param {json} state 
     * @param {json} time 
     */
    fetchAirTimerInfrared(keyDict, state, time) {
         return Promise.resolve(null);
    },
    /**
     * getAirRemoteState
     * @param {json} remoteDict 
     */
    getAirRemoteState(remoteDict) {
         return Promise.resolve(null);
    },
    /**
     * isMemoryKey
     * @param {json} keyDict 
     */
    isMemoryKey(keyDict) {
         return Promise.resolve(null);
    },
    /**
     * isCustomKey
     * @param {json} keyDict 
     */
    isCustomKey(keyDict) {
         return Promise.resolve(null);
    },
    /**
     * 加载全部省份信息（省份不包含城市列表）
     */
    getAllProvinces() {
         return Promise.resolve(null);
    },
    /**
     * 加载城市列表
     */
    getAllCities() {
         return Promise.resolve(null);
    },
    /**
     * 加载运营商
     */
    getAllProviders() {
         return Promise.resolve(null);
    },
    /**
     * 获取运营商推荐遥控器
     * @param {int} city_id 
     * @param {int} provider 
     */
    loadProviderRemotesByCity(city_id, provider) { 
         return Promise.resolve(null);
    },
    /**
     * 加载城市 - 运营商关联数据
     */
    loadCityProviders() { 
         return Promise.resolve(null);
    },
    
    /**
     * getProviderInCity
     * @param {int} city_id 
     */
    getProviderInCity(city_id) { 
         return Promise.resolve(null);
    },
    
    /**
     * getCityInProvince
     * @param {int} province_id 
     */
    getCityInProvince(province_id) { 
         return Promise.resolve(null);
    },
    
}