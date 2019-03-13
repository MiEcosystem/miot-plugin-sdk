/**
 * @export
 * @module miot/service/ircontroller
 * @description 红外相关 API
 *
 */
export default {
    createClient(name) {
    },
    destroyClient(name) {
    },
    exactMatchRemote(clientName, page) {
         return Promise.resolve(null);
    },
    exactMatchRemoteIfPower(clientName, page, matchPower) {
         return Promise.resolve(null);
    },
    searchDiy(clientName, page) {
         return Promise.resolve(null);
    },
    searchOfficial(clientName, page) {
         return Promise.resolve(null);
    },
    searchAirRemote(clientName, page) {
         return Promise.resolve(null);
    },
    downloadRemote(clientName, remoteId) {
         return Promise.resolve(null);
    },
    loadBrands(clientName) {
         return Promise.resolve(null);
    },
    autoMatchRemote(clientName, page) {
         return Promise.resolve(null);
    },
    missModel(clientName, type, brandId, model) {
         return Promise.resolve(null);
    },
    // helper
    getIRCode(freq, data) {
         return Promise.resolve(null);
    },
    buildIRCode(freq, base64Data) {
         return Promise.resolve(null);
    },
    fetchRemoteInfrared(remoteDict, key) {
         return Promise.resolve(null);
    },
    fetchAirRemoteInfrared(remoteDict, key, state) {
         return Promise.resolve(null);
    },
    fetchAirTimerInfrared(keyDict, state, time) {
         return Promise.resolve(null);
    },
    // TJAirRemoteState
    getAirRemoteState(remoteDict) {
         return Promise.resolve(null);
    },
    // TJIrKey
    isMemoryKey(keyDict) {
         return Promise.resolve(null);
    },
    isCustomKey(keyDict) {
         return Promise.resolve(null);
    },
    // TJTvClient
    //加载全部省份信息（省份不包含城市列表）
    getAllProvinces() {
         return Promise.resolve(null);
    },
    //加载省份的城市列表
    getAllCities() {
         return Promise.resolve(null);
    },
    //加载城市下的运营商
    getAllProviders() {
         return Promise.resolve(null);
    },
    getAllProvinces() {
         return Promise.resolve(null);
    },
    //获取运营商推荐遥控器
    loadProviderRemotesByCity(city_id, provider) { 
         return Promise.resolve(null);
    },
    //加载城市 - 运营商关联数据
    loadCityProviders() { 
         return Promise.resolve(null);
    },
    
    getProviderInCity(city_id) { 
         return Promise.resolve(null);
    },
    
    getCityInProvince(province_id) { 
         return Promise.resolve(null);
    },
    
}