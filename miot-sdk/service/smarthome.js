/**
 * @export
 * @module miot/service/smarthome
 * @description 智能家庭 API
 *
 */
export default {
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
     * @param {*} deviceID
     * @param {GPSInfo} gpsInfo
     * @returns {Promise<json>}
     *
     */
    reportGPSInfo(deviceID, gpsInfo){
         return Promise.resolve(null);
    },
    /**
     * @typedef WeatherInfo
     * @property city
     * @property city_id
     * @property pub_time
     * @property aqi
     * @property pm25
     * @property pm10
     * @property so2
     * @property no2
     * @property src
     * @property spot
     */
    /**
     * 获取天气 /location/weather
     * @param {*} deviceID
     * @returns {Promise<WeatherInfo>}
     *
     */
    getWeatherInfo(deviceID){
         return Promise.resolve(null);
    },
    /**
     * 检查到有可用更新时，可以主动更新固件。 /home/multi_checkversion
     * @param deviceIDs
     * @return {Promise<json>}
     */
    getAvailableFirmwareForDids(deviceIDs){
         return Promise.resolve(null);
    },
    /**
     * 添加一条日志打点。开发者应该在拓展程序内合适时机调用该接口，打点信息会自动写入文件，按 Model 归类，即一个 Model 生成一个日志文件。当用户反馈问题时，勾选 “同时上传日志”，则该 Model 的日志会跟随用户反馈上传，开发者可在 IoT 平台查看用户反馈及下载对应日志文件。
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
     * @param {array} records
     */
    reportRecords(deviceID, records){
         return Promise.resolve(null);
    },
    /**
     * 获取支持语音的设备 可以控制的设备列表。 /v2/device/range_get_extra_data
     * @param deviceID  语音设备的 did
     * @return {Promise<json>}
     */
    getDevicesConfig(params){
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
     * @param params 请求参数
     * @return {Promise}
     */
    getAiServiceProxy(params){
         return Promise.resolve(null);
    },
    /**
     * 获取服务器中 device 对应的数据，内部调用米家代理接口 /device/getsetting
     * @param params 请求参数
     * @return {Promise}
     */
    getDeviceSetting(params){
         return Promise.resolve(null);
    },
    /**
     * 设置服务器中 device 对应的数据，内部调用米家代理接口/device/setsetting
     * @param params 请求参数
     * @return {Promise}
     */
    setDeviceSetting(params){
         return Promise.resolve(null);
    },
    /**
     * 删除服务器中 device 对应的数据，内部调用米家代理接口/device/delsetting
     * @param {*} params  - 请求参数 \{did:设备 id,settings:要删除的设置角标的数组}
     * @return {Promise}
     */
    delDeviceSetting(params){
         return Promise.resolve(null);
    },
    /**
     * 获取服务器中 最新的版本信息，内部调用米家代理接口/home/latest_version
     * @param model 设备的 model
     * @return {Promise}
     */
    getLatestVersion(model){
         return Promise.resolve(null);
    },
    /**
     * 获取设备属性和事件历史记录，订阅消息直接写入到服务器，不需要插件添加. /user/get_user_device_data
     *
     * @param params  {did,type,key,time_start,time_end,limit}   参数含义如下：设备did,属性为prop事件为event,属性名不需要prop或者event前缀,起始时间单位为秒,结束事件单位为秒,请求的条数限制
     * @return {Promise}
     */
    getDeviceData(params){
         return Promise.resolve(null);
    },
    /**添加设备属性和事件历史记录，/user/set_user_device_data
     *
     * @param  params {did,uid,type,key,time,value}   参数含义如下：设备did，添加到哪个用户下,一般为 Device.ownerId，属性为prop事件为event，属性名不需要prop或者event前缀，触发时间，要保存的数据
     * @return {Promise}
     */
    setDeviceData(params){
         return Promise.resolve(null);
    },
    /**添加设备属性和事件历史记录，/home/getmapfileurl
     *
     * @param params
     * @return {Promise}
     */
    getMapfileurl(params){
         return Promise.resolve(null);
    },
    /**添加设备属性和事件历史记录，/home/device_list
     *
     * @param params
     * @return {Promise}
     */
    getHomeDevice(params){
         return Promise.resolve(null);
    },
    /**添加设备属性和事件历史记录，/home/getmapfileurl
     *
     * @param params
     * @return {Promise}
     */
    delUsermap(params){
         return Promise.resolve(null);
    },
    /**添加设备属性和事件历史记录，/home/getmapfileurl
     *
     * @param params
     * @return {Promise}
     */
    getRobomapurl(params){
         return Promise.resolve(null);
    },
    /**添加设备属性和事件历史记录，/home/getmapfileurl
     *
     * @param params
     * @return {Promise}
     */
    getCountry(params){
         return Promise.resolve(null);
    }
}
