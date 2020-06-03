/** 
 * @export public
 * @doc_index 10
 * @doc_directory service
 * @doc_name 防丢器相关API
 * @module miot/service/finder
 * @description 防丢器相关 API
 *
 */
import native from '../native';
import { report } from '../decorator/ReportDecorator';
class IFinder {
    /**
     * 初始化防丢器，返回初始化防丢器需要参数
     * @since 10040
     * @param {string} did 防丢器设备对应did
     * @returns {Promise<object>} 失败时，返回出错信息,{code:-1,message:'xx'}；成功时，返回{code:0,data:{object}},
     * object如下：
     * {publicKey:‘xxxx’,//public key转换成的hexString
     *   chainCode:'xxx',//chainCode转换成的hexString
     *  i：xx, //int类型的随机数
     *   aesKeyLeft16:'xxxx',//AesKey左半部分转换成的hexString
     *   phoneType:'xxx'//手机类型，iOS或Android
     *  }
     * @example 
     *  Service.finder.getInitFinderDeviceData(did)
     *               .then(res=>{
     *                   alert(JSON.stringify(res));
     *               }).catch(err=>{
     *                   alert(JSON.stringify(err))
     *               });
     */
    @report
  getInitFinderDeviceData(did) {
     return Promise.resolve(null);
  }
    /**
     * 插件初始化防丢器成功后调用，米家app将相关数据上传到云端
     * @since 10040
     * @param {string} did 防丢器设备对应did
     * @returns {Promise<obejct>} 成功时，返回{code:0,data:true}；失败时，{code:-1,message:'xxx'}
     * @example
     * Service.finder.uploadInitedFinderData(did)
     *              .then(res=>{
     *                  alert(JSON.stringify(res));
     *              }).catch(err=>{
     *                  alert(JSON.stringify(err));
     *              });
     */
    @report
    uploadInitedFinderData(did) {
       return Promise.resolve(null);
    }
    /**
     * 获取防丢器的历史位置
     * @since 10040
     * @param {string} did 防丢器设备对应did
     * @param {string} aesKeyLeft16 生成的aesKey左16位的hexString，可为空
     * @returns {Promise<object>} 失败时，返回错误信息，{code:-1,message:'xx'}；成功时，{code:0,data:{locations:jsonString}}：
     * @example
     * Service.finder.getFinderLocations(did,aesKeyLeft16)
     *                 .then(res=>{
     *                      alert(JSON.stringify(res));
     *                  }).catch(err=>{
     *                      alert(JSON.stringify(err));
     *                  });
     * 
     */
    @report
    getFinderLocations(did, aesKeyLeft16 = '') {
       return Promise.resolve(null);
    }
    /**
     * 设置防丢器相关设置，包括防丢设置，勿扰时间设置，地理围栏设置等
     * @since 10040
     * @param {string}  did  防丢器对应did
     * @param {json}  settings json格式，包括防丢设置，勿扰时间设置，地理围栏设置等
     * @see finder_settings settings的格式如下：
     * {"anti_lost_mod": true, //是否为防丢模式
     *   "both_way_lost_mod": true,//是否为双向防丢模式
     *   "play_time": 6000, //响铃时间
     *   "mute_time": [//勿扰时间，可设置多个
     *       {
     *       "day_of_week": 1,//勿扰时间是一星期中的星期几，0表示每天都设置
     *       "invalid_time": 0,//如果勿扰时间是不重复的，需要设置失效时间（Unix时间，单位秒），如果是重复的，则为0
     *       "time_start": {//勿扰时间的开始时间
     *       "hour": 1, //24小时制中的小时
     *       "minute": 30 //分钟
     *       },
     *       "time_end": {
     *       "hour": 2,
     *       "minute": 40
     *       }
     *   },
     *   {
     *       "day_of_week": 0,
     *       "invalid_time": 1590112029,
     *       "time_start": {
     *           "hour": 20,
     *           "minute": 30
     *           },
     *       "time_end": {
     *           "hour": 21,
     *           "minute": 40
     *       }
     *   }],
     *   "geo_fence": [ //地理围栏，可设置多个
     *       {
     *           "name": "地理围栏的名称", //地理围栏的名称，不重复
     *           "radius": 100,  //半径，单位米
     *           "longitude": 116.301712, //经度
     *           "latitude":39.980973 //纬度
     *       }]
     *   }
     * @returns {Promise<object>} 成功时,返回：{code:0,data:true};失败时，返回：{code:0,message:'xx'}
     * @example
     * Service.finder.setFinderSetting(did,settings)
     *               .then(res=>{
     *                   alert(JSON.stringify(res));
     *               }).catch(err=>{
     *                   alert(JSON.stringify(err));
     *               });
     * 
     */
    @report
    setFinderSetting(did, settings) {
       return Promise.resolve(null);
    }
    /**
     * 获取防丢器相关设置，包括防丢设置，勿扰时间设置，地理围栏设置等
     * @since 10040
     * @param {string}  did
     * @returns {Promise<object>} 失败时，返回错误信息，如：{code:-1,message:'xx'}；
     *                            成功时，返回相关设置，如：{code:0,data:{locations:jsonString}}
     * jsonString的格式{@link finder_settings}
     * @example
     * Service.finder.getFinderSetting(did)
     *               .then(res=>{
     *                  alert(JSON.stringify(res));
     *               }).catch(err=>{
     *                  alert(JSON.stringify(err));
     *               });
     */
    @report
    getFinderSetting(did) {
       return Promise.resolve(null);
    }
    /**
     * 获取设备的历史地理位置（社区查找）
     * @since 10040
     * @param {string} did 防丢器对应did
     * @param {string} aesKeyLeft16 生成的aesKey左16位的hexString，可为空
     * @returns {object} 成功时返回：{code:0,data:{locations:jsonString}},jsonString的格式{@link finder_settings};失败时返回：{code:xx，message:xxx}
     * @example
     *  Service.finder.getFinderLocationsCommon(did,aesKeyLeft16)
     *                .then(res=>{
     *                     alert(JSON.stringify(res));
     *                 }).catch(err=>{
     *                     alert(JSON.stringify(err));
     *                 });
     * 
     */
    getFinderLocationsCommon(did, aesKeyLeft16 = '') {
       return Promise.resolve(null);
    }
    /**
     * 手机是否支持地理围栏
     * @since 10040
     * @returns {Promise<object>} 成功时：{code:0,data:{supportGeoFence:true/false} //支持地理围栏时返回 };失败时：{code:-1,message:'xx'}
     * @example
     * Service.finder.isSupportGeoFence()
     *               .then(res=>{
     *                  alert(JSON.stringify(res));
     *               }).catch(err=>{
     *                  alert(JSON.stringify(err));
     *               })
     */
    @report
    isSupportGeoFence() {
       return Promise.resolve(null);
    }
    /**
     * 手机是否处于防丢器设置的地理围栏内
     * @since 10040
     * @param {string} did,防丢器对应did
     * @returns {Promise<object>} 成功时，返回:{code:0,data:{inGeoFence:true/false}//在电子围栏中}；
     *                          失败时,返回：{code:-1,message:'xxx'}
     * @example
     * Service.finder.isInGeoFence(did)
     *               .then(res=>{
     *                  alert(JSON.stringify(res));
     *               }).catch(err=>{
     *                  alert(JSON.stringify(err));
     *               })
     */
    @report
    isInGeoFence(did) {
       return Promise.resolve(null);
    }
    /**
     * 获取当前账户有多少个防丢器设置了防丢模式
     * @since 10040
     * @returns {Promise<object>} 成功时，返回:{code:0,data:{antiLostCount:xx//设置了防丢模式的防丢器个数}};
     *                          失败时，返回:{code：-1,message:'xx'}
     * @example
     * Service.finder.getCountOfAntiLostFinder()
     *              .then(res=>{
     *                  alert(JSON.stringify(res));
     *              }).catch(err=>{
     *                  alert(JSON.stringify(err));
     *              })
     */
    @report
    getCountOfAntiLostFinder() {
       return Promise.resolve(null);
    }
    /**
     * 删除防丢器数据
     * @since 10040
     * @param {string}  did 防丢器对应did
     * @returns {Promise<object>} 失败时，返回：{code:-1,message:'xxx'};
     *                          成功时，返回：{code:0,data:true}
     * @example
     * Service.finder.deleteFinderDataByDid(did)
     *              .then(res=>{
     *                  alert(JSON.stringify(res));
     *              }).catch(err=>{
     *                  alert(JSON.stringify(err));
     *              });
     */
    @report
    deleteFinderDataByDid(did) {
       return Promise.resolve(null);
    }
}
const FinderInstance = new IFinder();
export default FinderInstance;