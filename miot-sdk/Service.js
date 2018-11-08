/**
 * @export
 * @module miot/Service
 * @description 系统服务
 * @example
 *
 * 屏蔽callSmartHomeApi
 *
 * import {Service} from 'miot'
 *
 * Service.getServerName().then
 * Service.getUTCTimeFromServer().then()
 *
 * Service.smarthome.
 *
 *  Service.account.ID
 *  Serive.account.nickName
 *  Service.account.avatar
 *  Service.account.getProfile().then(profile=>{})
 *
 * Service.scene.loadTimerScenes(...)
 * Service.security.createSecureKey(...)
 *
 * Service.userConfig.get(key).then()
 * Service.log(key, val).then()
 *
 * Service.reportGPS
 *
 *
 */
import Smarthome from './service/smarthome'
import Scene from './service/scene'
import Security from './service/security'
import Storage from './service/storage'
import Ximalaya from './service/ximalaya';
import Account from './Account'
 const CurrentAccount = null;
export default {
    /**
     * @member smarthome
     * @description 设备相关 API
     * @see {@link module:miot/service/smarthome}
     */
    get smarthome(){
        return Smarthome;
    },
    /**
     * @member account
     * @type {IAccount}
     * @description 当前的用户信息
     * @see {@link module:miot/Account}
     */
    get account(){
        return CurrentAccount;
    },
    /**
     * @member scene
     * @description 场景 API 的调用
     * @see {@link module:miot/service/scene}
     */
    get scene(){
        return Scene;
    },
    /**
     * @member security
     * @description 安全相关设置操作
     * @see {@link module:miot/service/security}
     */
    get security(){
        return Security;
    },
    /**
     * @member storage
     * @description 用户存储操作, userProfile
     * @see {@link module:miot/service/storage}
     */
    get storage(){
        return Storage;
    },
    /**
     * @member ximalaya 
     * @description 喜马拉雅内容服务
     * @see {@link module:miot/service/ximalaya}
     */
    get ximalaya(){
        return Ximalaya;
    },
    /**
     * @method
     * @description 服务器名称
     */
    getServerName(){
        return "";
    },
    /**
     * @method getTimeZoneOfServer
     * @description 服务器所在时区
     */
    getTimeZoneOfServer(){
         return Promise.resolve(null);
    },
    /**
     * @method getUTCFromServer
     * @description 从米家服务器获取当前UTC时间戳（会发送网络请求）
     * @returns {Promise<long>}
     */
    getUTCFromServer(){
         return Promise.resolve(0);
    },
}