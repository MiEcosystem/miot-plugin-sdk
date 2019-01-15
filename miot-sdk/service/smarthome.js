/**
 * @export
 * @module miot/service/smarthome
 * @description 智能家庭 API
 *
 */
export default {
    /**
     * 获取用户的昵称和头像信息
     * @param {*} uid 获取用户信息的uid
     * @returns {Promise<json>}
     */
    getUserInfo(uid){
         return Promise.resolve({});
    },
    /**
     * @typedef GPSInfo
     * @property lng
     * @property lat
     * @property adminArea
     * @property countryCode
     * @property locality
     * @property thoroughfare
     * @property language - zh_CN
     * @property subLocality
     */
    /**
     * 上报gps信息 /location/set
     * @param {string} deviceID
     * @param {GPSInfo} gpsInfo
     * @returns {Promise<json>}
     *
     */
    reportGPSInfo(deviceID, gpsInfo){
         return Promise.resolve(null);
    },
         return Promise.resolve({});
    },
    /**
     * 获取某指定地区天气环境等信息
     * /location/area_prop_info
     * @param {json} params {latitude:xx,longitude:xx,cityId:['pm2.5','realtime']}
     * @returns {Promise}
     */
    getAreaPropInfo(params) {
         return Promise.resolve(null);
    },
    /**
     * 检查到有可用更新时，可以主动更新固件。 /home/multi_checkversion
     * @param {array<string>} deviceIDs
     * @return {Promise<json>}
     */
    getAvailableFirmwareForDids(deviceIDs){
         return Promise.resolve(null);
    },
    /**
     * 添加一条日志打点。  
     * 开发者应该在拓展程序内合适时机调用该接口，打点信息会自动写入文件，按 Model 归类，即一个 Model 生成一个日志文件。  
     * 当用户反馈问题时，勾选 “同时上传日志”，则该 Model 的日志会跟随用户反馈上传，
     * 开发者可在 IoT 平台查看用户反馈及下载对应日志文件。用户反馈查看入口：数据中心—用户反馈，如果看不到数据中心入口，联系自己所属企业管理员修改账号权限。
     * @param {string} model 要打 log 到哪个 model 下
     * @param {string} log 具体的 log 数据
     * @returns {void}
     *
     * @example
     *     Service.smarthome.reportLog("a.b.c", "hello");
     *     Service.smarthome.reportLog(Device.model, `[info]test value is :${v1},${v2},${v3}`)
     *     Package.isDebug&&Service.smarthome.reportLog(...)
     *
     *     Device.reportLog(`...`)
     */
    reportLog(model, log){
    },
    /**
     * 上报设备数据 /device/event
     * @param {string} deviceID
     * @param {array<map>} records [{type:string value of 'prop'、'event',key:string,value:string}]
     *
     * @example
     * Service.smarthome.reportRecords("deviceID", [{type:"prop",key:"b",value:"c"}])
     */
    reportRecords(deviceID, records){
         return Promise.resolve(null);
    },
    /**
     * - /v2/device/range_get_extra_data
     * @param {json} params {did:string,prefix:string,limit:int,offset:int}
     * @return {Promise<json>}
     */
    getDevicesConfig(params){
         return Promise.resolve(null);
    },
    /**
     * 获取设备时区
     * @param {string} did 
     */
    getDeviceTimeZone(did) {
         return Promise.resolve(null);
    },
    /**
     * 获取支持语音的设备 可以控制的设备列表。 /voicectrl/ai_devs
     * @param deviceID  语音设备的 did
     * @return {Promise}
     */
    getVoiceVtrlDevices(deviceID){
         return Promise.resolve(null);
    },
    /**
     * 获取小爱接口数据，内部调用米家代理接口/v2/api/aivs
     * @param {json} params 请求参数 {path:string,params:map,header:map,payload:map,env:int,req_method:string,req_header:map}
     * @return {Promise}
     * @example
     * Service.smarthome.getAiServiceProxy({
     *  path: "/api/aivs/xxx",
     *  params: { did : "xx", client_id: "xx"},
     *  header: { name : "xx"},
     *  env: 1,
     *  req_method: "POST",
     *  req_header: {"Content-Type":"xx"}
     * }).then()
     */
    getAiServiceProxy(params){
         return Promise.resolve(null);
    },
    /**
     * 获取服务器中 device 对应的数据，内部调用米家代理接口 /device/getsetting
     * @param {json} params 请求参数 {did:string,settings:array<string>}
     * @return {Promise}
     */
    getDeviceSetting(params){
         return Promise.resolve(null);
    },
    /**
     * 设置服务器中 device 对应的数据，内部调用米家代理接口/device/setsetting
     * @param {json} params 请求参数 {did:string,settings:map<key,value>}
     * @return {Promise}
     */
    setDeviceSetting(params){
         return Promise.resolve(null);
    },
    /**
     * 删除服务器中 device 对应的数据，内部调用米家代理接口/device/delsetting
     * @param {json} params  - 请求参数 \{did:设备 id,settings:要删除的设置角标的数组}
     * @return {Promise}
     */
    delDeviceSetting(params){
         return Promise.resolve(null);
    },
    /**
     * 获取服务器中 最新的版本信息，内部调用米家代理接口/home/latest_version
     * @param {string} model 设备的 model
     * @return {Promise}
     */
    getLatestVersion(model){
         return Promise.resolve(null);
    },
    /**
     * 获取设备属性和事件历史记录，订阅消息直接写入到服务器，不需要插件添加. /user/get_user_device_data
     *
     * @param {json} params -参数\{did,type,key,time_start,time_end,limit}含义如下：设备did,属性为prop事件为event,属性名不需要prop或者event前缀,起始时间单位为秒,结束事件单位为秒,请求的条数限制
     * @returns {Promise}
     */
    getDeviceData(params){
         return Promise.resolve(null);
    },
    /**
     * 添加设备属性和事件历史记录，/user/set_user_device_data
     *
     * @param {json}  params  参数\{did,uid,type,key,time,value}含义如下：设备did，添加到哪个用户下,一般为 Device.ownerId，属性为prop事件为event，属性名不需要prop或者event前缀，触发时间，要保存的数据
     * @return {Promise}
     */
    setDeviceData(params){
         return Promise.resolve(null);
    },
    /**
     * 获取用户收藏
     * /user/get_user_coll
     * @param {*} params {did:string}
     * @return {Promise}
     */
    getUserColl(params){
         return Promise.resolve(null);
    },
    /**
     * 设置用户收藏
     * /user/get_user_coll
     * @param {*} params {did:string, name: string, content: string}
     * @return {Promise}
     */
    setUserColl(params){
         return Promise.resolve(null);
    },
    /**
     * 删除用户收藏
     * /user/get_user_coll
     * @param {*} params {coll_id: string, did: string}
     * @return {Promise}
     */
    delUserColl(params){
         return Promise.resolve(null);
    },
    /**添加设备属性和事件历史记录，/home/getmapfileurl
     *
     * @param {json} params
     * @return {Promise}
     */
    getMapfileUrl(params){
         return Promise.resolve(null);
    },
    /**添加设备属性和事件历史记录，/home/device_list
     * 当ssid和bssid均不为空时，表示同时搜索这个局域网内所有未被绑定过的设备
     * @param {json} params {pid:string ,ssid:string ,bssid:string ,localDidList:array<string>,checkMoreWifi:bool,dids:array<string>}
     * @return {Promise}
     */
    getHomeDevice(params){
         return Promise.resolve(null);
    },
    /**
     * 用于获取插件所需的一些默认配置信息
     * @param {json} params {'name':'自定义值','lang':'自定义值','version':'自定义值','model':'modelId'}
     * /service/getappconfigv2
     */
    getAppConfigV2(params){
         return Promise.resolve(null);
    },
    /**
     *  /user/del_user_map
     *
     * @param {json} params
     * @return {Promise}
     */
    delUsermap(params){
         return Promise.resolve(null);
    },
    /**
     *  /home/getrobomapurl
     *
     * @param {*} arams
     * @return {Promise}
     */
    getRobomapUrl(params){
         return Promise.resolve(null);
    },
    /**
     * 获取设备所在网络的IP地址所属国家
     * /home/getcountry
     * @param {json} params {"dids": ["xx"]}
     * @return {Promise}
     */
    getCountry(params){
         return Promise.resolve(null);
    },
    /**
     * 获取蓝牙锁绑定的时间，/device/blelockbindinfo
     *
     * @param {json} params  -参数\{did}
     * @return {Promise}
     */
    getBleLockBindInfo(params){
         return Promise.resolve(null);
    },
    /**
     * 从服务器批量获取设备属性，/device/batchdevicedatas
     *
     * @param {json} params  -参数 [{did:"",props:["prop.aaa","prop.bbb"]}]
     * @return {Promise}
     */
    batchGetDeviceProps(params){
         return Promise.resolve(null);
    },
    /**
     * 从服务器获取配置文件，/device/getThirdConfig
     *
     * @param {json} params  -参数 {"name":"config_version","version":1,"lang":"en","app_id":"XXX"}
     * @return {Promise}
     */
    getThirdConfig(params){
         return Promise.resolve(null);
    },
    /**
     * 异步调用第三方云接口  /third/api
     *
     * @param {json} params  -参数 {"app_id":"123","dids":["1","2"],"params":json}
     * @return {Promise}
     */
    callThirdPartyAPI(params){
         return Promise.resolve(null);
    },
    /**
     * 华米watch配置使用
     * Android not support yet
     * @return {Promise}
     */
    getMiWatchConfig() {
        if(native.isAndroid) {
            return new Promise.reject("not support android yet");
        }
        return new Promise((resolve, reject) => {
            native.MIOTHost.getMiWatchConfigWithCallback((ok, res) => {
                if(ok) {
                    return resolve(res);
                }
                reject("get failed");
            });
        });
    },
    /**
     * 获取authCode来做鉴权
     * @param string} did 设备的 did
     * @returns {Promise}
     */
    getUserDeviceAuth(did){
         return Promise.resolve(null);
    }
}