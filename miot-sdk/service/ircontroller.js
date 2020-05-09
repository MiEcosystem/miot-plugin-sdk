/**
 * @export private
 * @doc_name 红外相关API
 * @module miot/service/ircontroller
 * @description 红外相关 API
 *
 */
import {report} from "../decorator/ReportDecorator";
/**
 * @export
 */
class IIrcontroller {
    /**
     * （查） 获取所有遥控器列表
     * - /v2/irdevice/controllers
     * @param {json} params {parent_id:string}
     * @return {Promise<json>}
     */
    @report
    getList(params) {
         return Promise.resolve(null);
    }
    /**
     * （查） 获取所有支持的红外遥控器种类
     * - /v2/ircode/categories
     * @param {json} params {}
     * @return {Promise<json>}
     */
    @report
    getCategories(params) {
         return Promise.resolve(null);
    }
    /**
     * （查）  红外遥控器 根据地区名称查询 id
     * - /v2/ircode/area/area_id
     * @param {json} params {province:string,city:string,area:string}
     * @return {Promise<json>}
     */
    @report
    queryArea(params) {
         return Promise.resolve(null);
    }
    /**
     * （查） 根据地区 id 获取支持的机顶盒品牌
     * - /v2/ircode/area/lineups
     * @param {json} params {area_id:int}
     * @return {Promise<json>}
     */
    @report
    getLineups(params) {
         return Promise.resolve(null);
    }
    /**
     * （查） 红外遥控器 根据省份 id 获取所有的城市
     * - /v2/ircode/area/province/cities
     * @param {json} params {province_id: int}
     * @return {Promise<json>}
     */
    @report
    getCities(params) {
         return Promise.resolve(null);
    }
    /**
     * （查） 红外遥控器  获取所有省份信息
     * - /v2/ircode/area/provinces/china
     * @param {json} params {}
     * @return {Promise<json>}
     */
    @report
    getProvinces(params) {
         return Promise.resolve(null);
    }
    /**
     * （查） 根据地区 id 获取所有的城市信息
     * - /v2/ircode/area/city/areas
     * @param {json} params {city_id: int}
     * @return {Promise<json>}
     */
    @report
    getAreas(params) {
         return Promise.resolve(null);
    }
    /**
     * （查） 红外遥控器  获取所有机顶盒支持的品牌
     * - /v2/ircode/iptv/brands
     * @param {json} params {province_id: int}
     * @return {Promise<json>}
     */
    @report
    getIPTVBrands(params) {
         return Promise.resolve(null);
    }
    /**
     * （查） 红外遥控器  获取某一个遥控器类型的所有省份信息
     * - /v2/ircode/category/brands
     * @param {json} params {category: int}
     * @return {Promise<json>}
     */
    @report
    getBrands(params) {
         return Promise.resolve(null);
    }
    /**
     * 红外遥控器 添加红外遥控器
     * - /v2/irdevice/controller/add
     * @param {json} params {name:string,parent_id:string,category:int,controller_id(选填):int,lineup_id(选填):string}
     * @return {Promise<json>}
     */
    @report
    controllerAdd(params) {
         return Promise.resolve(null);
    }
    /**
     * 设置红外遥控所有的按键
     * - /v2/irdevice/controller/keys/set
     * @param {json} params {keys:[{code:string,key_id(选填):int,name(选填):string}]}
     * @return {Promise<json>}
     */
    @report
    setKeys(params) {
         return Promise.resolve(null);
    }
    /**
     * 设置红外遥控所有的按键
     * - /v2/irdevice/send_key
     * @param {json} params {did:string,controller_id:int,key_id(选填):int,ac_key(选填):string}
     * @return {Promise<json>}
     */
    @report
    sendKey(params) {
         return Promise.resolve(null);
    }
    /**
     *  删除红外设备
     * - /v2/irdevice/controller/del
     * @param {json} params {did:string}
     * @return {Promise<json>}
     */
    @report
    controllerDel(params) {
         return Promise.resolve(null);
    }
    /**
     *  更新红外设备
     * - /v2/irdevice/controller/update
     * @param {json} params {did:string,keys:[{code:string,name:string,key_id:int}]}
     * @return {Promise<json>}
     */
    @report
    controllerUpdate(params) {
         return Promise.resolve(null);
    }
    /**
     *  获取红外设备所有的 key
     * - /v2/irdevice/controller/keys
     * @param {json} params {did:string}
     * @return {Promise<json>}
     */
    @report
    getKeys(params) {
         return Promise.resolve(null);
    }
    /**
     *  更新红外设备的 key 名称
     * - /v2/irdevice/controller/key/update
     * @param {json} params {did:string,name:string}
     * @return {Promise<json>}
     */
    @report
    keyUpdate(params) {
         return Promise.resolve(null);
    }
    /**
     *  删除红外设备的 key
     * - /v2/irdevice/controller/key/del
     * @param {json} params {did:string,key_id:string}
     * @return {Promise<json>}
     */
    @report
    keyDel(params) {
         return Promise.resolve(null);
    }
    /**
     *  发送红外遥控器按键接口
     * - /v2/irdevice/controller/key/click
     * @param {json} params {controller_id:int,did:string,key_id:int}
     * @return {Promise<json>}
     */
    @report
    keyClick(params) {
         return Promise.resolve(null);
    }
    /**
     *   获取有状态红外码
     *  - /v2/ircode/controller/functions
     * @param {json} params {controller_id:int}
     * @return {Promise<json>}
     */
    @report
    getIrCodeFunctions(params) {
         return Promise.resolve(null);
    }
    /**
     *   获取无状态红外码
     *  - /v2/ircode/controller/keys
     * @param {json} params {controller_id:int}
     * @return {Promise<json>}
     */
    @report
    getIrCodeKeys(params) {
         return Promise.resolve(null);
    }
    /**
     * 获取遥控器信息
     * - /v2/irdevice/controller/info
     * @param {json} params {did:string}
     * @return {Promise<json>}
     */
    @report
    getIrCodeInfo(params) {
         return Promise.resolve(null);
    }
    /**
     * 获取遥控器品牌名
     * - /v2/ircode/brand
     * @param {json} params {brand_id:int}
     * @return {Promise<json>}
     */
    @report
    getIrCodeBrand(params) {
         return Promise.resolve(null);
    }
}
const IrcontrollerInstance = new IIrcontroller();
export default IrcontrollerInstance;