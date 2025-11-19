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
export declare class ITJInfra {
  /**
   * createClient
   * @param {String} name
   */
  createClient(name: string): void
  /**
   * destroyClient
   * @param {String} name
   */
  destroyClient(name: string): void
  /**
   * exactMatchRemote
   * @param {string} clientName
   * @param {json} page
   * @returns promise
   */
  exactMatchRemote(clientName: string, page: object): Promise<object>
  /**
   * exactMatchRemoteIfPower
   * @param {string} clientName
   * @param {json} page
   * @param {bool} matchPower
   * @returns promise
   */
  exactMatchRemoteIfPower(clientName: string, page: object, matchPower: boolean): Promise<object>
  /**
   * searchDiy
   * @param {string} clientName
   * @param {json} page
   * @returns promise
   */
  searchDiy(clientName: string, page: object): Promise<object>
  /**
   * searchOfficial
   * @param {string} clientName
   * @param {json} page
   * @returns promise
   */
  searchOfficial(clientName: string, page: object): Promise<object>
  /**
   * searchAirRemote
   * @param {string} clientName
   * @param {json} page
   * @returns promise
   */
  searchAirRemote(clientName: string, page: object): Promise<object>
  /**
   * downloadRemote
   * @param {string} clientName
   * @param {string} remoteId
   */
  downloadRemote(clientName: string, remoteId: string): Promise<object>;
  /**
   * loadBrands
   * @param {string} clientName
   */
  loadBrands(clientName: string): Promise<object>;
  /**
   * autoMatchRemote
   * @param {string} clientName
   * @param {json} page
   */
  autoMatchRemote(clientName: string, page: object): Promise<object>;
  /**
   * missModel
   * @param {string} clientName
   * @param {int} type
   * @param {int} brandId
   * @param {string} model
   */
  missModel(clientName: string, type: number, brandId: number, model: string)
  /**
   * getIRCode
   * @param {int} freq
   * @param {string} data
   */
  getIRCode(freq: number, data: string): Promise<object>;
  /**
   * buildIRCode
   * @param {int} freq
   * @param {string} base64Data
   */
  buildIRCode(freq: number, base64Data: string): Promise<object>;
  /**
   * fetchRemoteInfrared
   * @param {json} remoteDict
   * @param {json} key
   */
  fetchRemoteInfrared(remoteDict: object, key: object): Promise<object>;
  /**
   *
   * @param {json} remoteDict
   * @param {json} key
   * @param {json} state
   */
  fetchAirRemoteInfrared(remoteDict: object, key: object, state: object): Promise<object>;
  /**
   *
   * @param {json} keyDict
   * @param {json} state
   * @param {json} time
   */
  fetchAirTimerInfrared(keyDict: object, state: object, time: object): Promise<object>;
  /**
   * getAirRemoteState
   * @param {json} remoteDict
   */
  getAirRemoteState(remoteDict: object): Promise<object>;
  /**
   * isMemoryKey
   * @param {json} keyDict
   */
  isMemoryKey(keyDict: object): Promise<object>;
  /**
   * isCustomKey
   * @param {json} keyDict
   */
  isCustomKey(keyDict: object): Promise<object>;
  /**
   * 加载全部省份信息（省份不包含城市列表）
   */
  getAllProvinces(): Promise<object>;
  /**
   * 加载城市列表
   */
  getAllCities(): Promise<object>;
  /**
   * 加载运营商
   */
  getAllProviders(): Promise<object>;
  /**
   * 获取运营商推荐遥控器
   * @param {int} city_id
   * @param {int} provider
   */
  loadProviderRemotesByCity(city_id: number, provider: number): Promise<object>;
  /**
   * 加载城市 - 运营商关联数据
   */
  loadCityProviders(): Promise<object>;
  /**
   * getProviderInCity
   * @param {int} city_id
   */
  getProviderInCity(city_id: number): Promise<object>;
  /**
   * getCityInProvince
   * @param {int} province_id
   */
  getCityInProvince(province_id: number): Promise<object>;
}
declare const TJInfraInstance: ITJInfra;
export default TJInfraInstance;