/**
 * @export
 * @module miot/service/ircontroller
 * @description 红外相关 API
 *
 */
export default {
    /**
     * （查） 获取所有遥控器列表
     * - /v2/irdevice/controllers
     * @param {json} params {parent_id:string}
     * @return {Promise<json>}
     */
    getList(params){
         return Promise.resolve(null);
    },
    /**
     * （查） 获取所有支持的红外遥控器种类
     * - /v2/ircode/categories
     * @param {json} params {}
     * @return {Promise<json>}
     */
    getCategories(params){
         return Promise.resolve(null);
    },
    /**
     * （查）  红外遥控器 根据地区名称查询 id
     * - /v2/ircode/area/area_id
     * @param {json} params {province:string,city:string,area:string}
     * @return {Promise<json>}
     */
    queryArea(params){
         return Promise.resolve(null);
    },
    /**
     * （查） 根据地区 id 获取支持的机顶盒品牌
     * - /v2/ircode/area/lineups
     * @param {json} params {area_id:int}
     * @return {Promise<json>}
     */
    getLineups(params){
         return Promise.resolve(null);
    },
    /**
     * （查） 红外遥控器 根据省份 id 获取所有的城市
     * - /v2/ircode/area/province/cities
     * @param {json} params {province_id: int}
     * @return {Promise<json>}
     */
    getCities(params){
         return Promise.resolve(null);
    },
    /**
     * （查） 红外遥控器  获取所有省份信息
     * - /v2/ircode/area/provinces/china
     * @param {json} params {}
     * @return {Promise<json>}
     */
    getProvinces(params){
         return Promise.resolve(null);
    },
    /**
     * （查） 根据地区 id 获取所有的城市信息
     * - /v2/ircode/area/city/areas
     * @param {json} params {city_id: int}
     * @return {Promise<json>}
     */
    getAreas(params){
         return Promise.resolve(null);
    },
    /**
     * （查） 红外遥控器  获取所有机顶盒支持的品牌
     * - /v2/ircode/iptv/brands
     * @param {json} params {province_id: int}
     * @return {Promise<json>}
     */
    getIPTVBrands(params){
         return Promise.resolve(null);
    },
    /**
     * （查） 红外遥控器  获取某一个遥控器类型的所有省份信息
     * - /v2/ircode/category/brands
     * @param {json} params {category: int}
     * @return {Promise<json>}
     */
    getBrands(params){
         return Promise.resolve(null);
    },
    /**
     * 红外遥控器 添加红外遥控器
     * - /v2/irdevice/controller/add
     * @param {json} params {name:string,parent_id:string,category:int,controller_id(选填):int,lineup_id(选填):string}
     * @return {Promise<json>}
     */
    controllerAdd(params){
         return Promise.resolve(null);
    },
    /**
     * 设置红外遥控所有的按键
     * - /v2/irdevice/controller/keys/set
     * @param {json} params {keys:[{code:string,key_id(选填):int,name(选填):string}]}
     * @return {Promise<json>}
     */
    setKeys(params){
         return Promise.resolve(null);
    },
    /**
     * 设置红外遥控所有的按键
     * - /v2/irdevice/send_key
     * @param {json} params {did:string,controller_id:int,key_id(选填):int,ac_key(选填):string}
     * @return {Promise<json>}
     */
    sendKey(params){
         return Promise.resolve(null);
    },
    /**
     *  删除红外设备
     * - /v2/irdevice/controller/del
     * @param {json} params {did:string}
     * @return {Promise<json>}
     */
    controllerDel(params){
         return Promise.resolve(null);
    },
    /**
     *  更新红外设备
     * - /v2/irdevice/controller/update
     * @param {json} params {did:string,keys:[{code:string,name:string,key_id:int}]}
     * @return {Promise<json>}
     */
    controllerUpdate(params){
         return Promise.resolve(null);
    },
    /**
     *  获取红外设备所有的 key
     * - /v2/irdevice/controller/keys
     * @param {json} params {did:string}
     * @return {Promise<json>}
     */
    getKeys(params){
         return Promise.resolve(null);
    },
    /**
     *  更新红外设备的 key 名称
     * - /v2/irdevice/controller/key/update
     * @param {json} params {did:string,name:string}
     * @return {Promise<json>}
     */
    keyUpdate(params){
         return Promise.resolve(null);
    },
    /**
     *  删除红外设备的 key
     * - /v2/irdevice/controller/key/del
     * @param {json} params {did:string,key_id:string}
     * @return {Promise<json>}
     */
    keyDel(params){
         return Promise.resolve(null);
    },
    /**
     *  发送红外遥控器按键接口
     * - /v2/irdevice/controller/key/click
     * @param {json} params {controller_id:int,did:string,key_id:int}
     * @return {Promise<json>}
     */
    keyClick(params){
         return Promise.resolve(null);
    },
}