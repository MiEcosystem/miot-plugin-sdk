/**
 * @export private
 * @doc_name 红外库组件
 * @module miot/service/infra
 * @description infra
 *
 */
import {report} from "../decorator/ReportDecorator";
/**
 * @export
 */
class ITJInfra {
    /**
     * createClient
     * @param {String} name 
     */
    @report
    createClient(name) {
    }
    /**
     * destroyClient
     * @param {String} name 
     */
    @report
    destroyClient(name) {
    }
    /**
     * exactMatchRemote
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    @report
    exactMatchRemote(clientName, page) {
         return Promise.resolve(null);
    }
    /**
     * exactMatchRemoteIfPower
     * @param {string} clientName 
     * @param {json} page 
     * @param {bool} matchPower 
     * @returns promise
     */
    @report
    exactMatchRemoteIfPower(clientName, page, matchPower) {
         return Promise.resolve(null);
    }
    /**
     * searchDiy
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    @report
    searchDiy(clientName, page) {
         return Promise.resolve(null);
    }
    /**
     * searchOfficial
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    @report
    searchOfficial(clientName, page) {
         return Promise.resolve(null);
    }
    /**
     * searchAirRemote
     * @param {string} clientName 
     * @param {json} page 
     * @returns promise
     */
    @report
    searchAirRemote(clientName, page) {
         return Promise.resolve(null);
    }
    /**
     * downloadRemote
     * @param {string} clientName 
     * @param {string} remoteId 
     */
    @report
    downloadRemote(clientName, remoteId) {
         return Promise.resolve(null);
    }
    /**
     * loadBrands
     * @param {string} clientName 
     */
    @report
    loadBrands(clientName) {
         return Promise.resolve(null);
    }
    /**
     * autoMatchRemote
     * @param {string} clientName 
     * @param {json} page 
     */
    @report
    autoMatchRemote(clientName, page) {
         return Promise.resolve(null);
    }
    /**
     * missModel
     * @param {string} clientName 
     * @param {int} type 
     * @param {int} brandId 
     * @param {string} model 
     */
    @report
    missModel(clientName, type, brandId, model) {
         return Promise.resolve(null);
    }
    /**
     * getIRCode
     * @param {int} freq 
     * @param {string} data 
     */
    @report
    getIRCode(freq, data) {
         return Promise.resolve(null);
    }
    /**
     * buildIRCode
     * @param {int} freq 
     * @param {string} base64Data 
     */
    @report
    buildIRCode(freq, base64Data) {
         return Promise.resolve(null);
    }
    /**
     * fetchRemoteInfrared
     * @param {json} remoteDict 
     * @param {json} key 
     */
    @report
    fetchRemoteInfrared(remoteDict, key) {
         return Promise.resolve(null);
    }
    /**
     * 
     * @param {json} remoteDict 
     * @param {json} key 
     * @param {json} state 
     */
    @report
    fetchAirRemoteInfrared(remoteDict, key, state) {
         return Promise.resolve(null);
    }
    /**
     * 
     * @param {json} keyDict 
     * @param {json} state 
     * @param {json} time 
     */
    @report
    fetchAirTimerInfrared(keyDict, state, time) {
         return Promise.resolve(null);
    }
    /**
     * getAirRemoteState
     * @param {json} remoteDict 
     */
    @report
    getAirRemoteState(remoteDict) {
         return Promise.resolve(null);
    }
    /**
     * isMemoryKey
     * @param {json} keyDict 
     */
    @report
    isMemoryKey(keyDict) {
         return Promise.resolve(null);
    }
    /**
     * isCustomKey
     * @param {json} keyDict 
     */
    @report
    isCustomKey(keyDict) {
         return Promise.resolve(null);
    }
    /**
     * 加载全部省份信息（省份不包含城市列表）
     */
    @report
    getAllProvinces() {
         return Promise.resolve(null);
    }
    /**
     * 加载城市列表
     */
    @report
    getAllCities() {
         return Promise.resolve(null);
    }
    /**
     * 加载运营商
     */
    @report
    getAllProviders() {
         return Promise.resolve(null);
    }
    /**
     * 获取运营商推荐遥控器
     * @param {int} city_id 
     * @param {int} provider 
     */
    @report
    loadProviderRemotesByCity(city_id, provider) {
         return Promise.resolve(null);
    }
    /**
     * 加载城市 - 运营商关联数据
     */
    @report
    loadCityProviders() {
         return Promise.resolve(null);
    }
    /**
     * getProviderInCity
     * @param {int} city_id 
     */
    @report
    getProviderInCity(city_id) {
         return Promise.resolve(null);
    }
    /**
     * getCityInProvince
     * @param {int} province_id 
     */
    @report
    getCityInProvince(province_id) {
         return Promise.resolve(null);
    }
}
const TJInfraInstance = new ITJInfra();
export default TJInfraInstance;