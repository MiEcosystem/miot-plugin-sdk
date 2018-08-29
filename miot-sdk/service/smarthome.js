/**
 * @export
 * @module miot/service/smarthome
 * @description 智能家庭 API
 *
 */
import native from "../native";
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
     * @returns {Promise<boolean>}
     *
     *
     *
     */
    reportGPSInfo(deviceID, gpsInfo){
        native.MIOTRPC.standardCall("/location/set", {...gpsInfo, did:deviceID}, (ok, res)=>{
            ok&&resolve(res||true);
            !ok&&reject(res);
        })
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
        native.MIOTRPC.standardCall("/location/weather", {did:deviceID}, (ok, res)=>{
            if(ok && res.aqi){
                return resolve(res.aqi);
            }
            reject(res);
        })
    },


    /**
     * 检查到有可用更新时，可以主动更新固件。
     * @param deviceIDs
     * @return {Promise}
     */
    getAvailableFirmwareForDids(deviceIDs){
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.standardCall("/home/multi_checkversion", {"dids":deviceIDs}, (ok, res)=>{
                if(!ok){
                    return reject(res);
                }
                const {updating, isLatest, description,force,curr,latest} = res;
                resolve(
                    {isUpdating:updating, isLatest, isForce:force, description,
                        curVersion:curr, newVersion:latest,
                        hasNewFirmware:updating?false:!isLatest}
                );
            });
        });
    },

    /**
     * @method reportLog
     * @description 添加一条日志打点。开发者应该在拓展程序内合适时机调用该接口，打点信息会自动写入文件，按 Model 归类，即一个 Model 生成一个日志文件。当用户反馈问题时，勾选 “同时上传日志”，则该 Model 的日志会跟随用户反馈上传，开发者可在 IoT 平台查看用户反馈及下载对应日志文件。
     * @param {string} model 要打 log 到哪个 model 下
     * @param {string} log 具体的 log 数据
     *
     * @example
     *     Service.smarthome.reportLog("a.b.c", "hello");
     *     Service.smarthome.reportLog(Device.model, `[info]test value is :${v1},${v2},${v3}`)
     *     Package.isDebug&&Service.smarthome.reportLog(...)
     *
     *     Device.reportLog(`...`)
     */
    reportLog(model, log){
        // model = (typeof(model)=="string")?model:(model?model.model:null)
        if(!model)return;
        //直接执行, 无返回
        native.MIOTService.addLog(model, log+"");
    },

    /**
     * 获取支持语音的设备 可以控制的设备列表。
     * @param deviceID  语音设备的 did
     * @return {Promise}
     */
    getDevicesConfig(params){
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.nativeCall("/v2/device/range_get_extra_data", params, (ok, res)=>{
                if(!ok){
                    return reject(res);
                }
                resolve(res);
            });
        });
    },
    /**
     * 获取支持语音的设备 可以控制的设备列表。
     * @param deviceID  语音设备的 did
     * @return {Promise}
     */
    getVoiceVtrlDevices(deviceID){
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.nativeCall('/voicectrl/ai_devs', {"did":deviceID}, (ok, res)=>{
                if(!ok){
                    return reject(res);
                }
                resolve(res);
            });
        });
    },


    /**
     * 获取小爱接口数据，内部调用米家代理接口/v2/api/aivs
     * @param params 请求参数
     * @return {Promise}
     */
    getAiServiceProxy(params){
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.standardCall("/v2/api/aivs", params, (ok, res)=>{
                if(!ok){
                    return reject(res);
                }
                resolve(res);
            });
        });
    },

    /**
     * 获取服务器中 device 对应的数据，内部调用米家代理接口/device/getsetting
     * @param params 请求参数
     * @return {Promise}
     */
    getDeviceSetting(params){
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.nativeCall("/device/getsetting", params, (ok, res)=>{
                if(!ok){
                    return reject(res);
                }
                resolve(res);
            });
        });
    },

    /**
     * 设置服务器中 device 对应的数据，内部调用米家代理接口/device/setsetting
     * @param params 请求参数
     * @return {Promise}
     */
    setDeviceSetting(params){
        return new Promise((resolve, reject)=>{
            native.MIOTRPC.nativeCall('/device/setsetting', params, (ok, res)=>{
                if(!ok){
                    return reject(res);
                }
                resolve(res);
            });
        });
    }

}
