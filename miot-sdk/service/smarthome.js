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
     * 上报gps信息
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
     * 获取天气
     * @param {*} deviceID
     * @returns {Promise<WeatherInfo>}
     *
     */
    getWeatherInfo(deviceID){
         return Promise.resolve(null);
    },
    /**
     * 检查到有可用更新时，可以主动更新固件。
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
     * 获取支持语音的设备 可以控制的设备列表。
     * @param deviceID  语音设备的 did
     * @return {Promise<json>}
     */
    getDevicesConfig(params){
         return Promise.resolve(null);
    },
    /**
     * 获取支持语音的设备 可以控制的设备列表。
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
     * 获取服务器中 device 对应的数据，内部调用米家代理接口/device/getsetting
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
    }
}