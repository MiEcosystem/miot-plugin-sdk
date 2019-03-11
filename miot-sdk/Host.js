/**
 * @export
 * @module miot/Host
 * @description 
 * 扩展程序运行时的宿主环境  
 * 所有由宿主APP直接提供给扩展程序的接口均列在这里. 主要包括原生业务页面, 本地数据访问等
 *
 * @example
 *
 *  import {Host} from 'miot'
 *
 *  Host.type // ios/ android/ tv
 *  Host.isIOS
 *  Host.isAndroid
 *
 *  Host.version
 *  Host.apiLevel
 *  Host.isDebug
 *
 *
 *  Host.ui.openDeviceListPage()
 *  Host.ui.openShopPage(100)
 *
 *  Host.locale.language
 *  Host.locale.timezone
 *  Host.locale.currentTimeMillis.then(time=>{})
 *  Host.locale.getCurrentCountry().then(country=>{})
 *  Host.locale.getPlaceMark().then(place=>{})
 *  Host.locale.getGPS().then(gps=>{})
 *
 *
 *  Host.file.readFile(path).then(file=>{})
 *  Host.file.writeFile(path, file).then(ok=>{})
 *
 *  Host.storage.get(key)
 *  Host.storage.set(key, value)
 *
 */
import HostUI from './host/ui'
import HostLocale from './host/locale'
import HostFile from './host/file'
import HostStorage from './host/storage'
import HostAudio from './host/audio'
import HostCrypto from './host/crypto'
 const IOS="ios", ANDROID="android";
export const HOST_TYPE_IOS = IOS;
export const HOST_TYPE_ANDROID = ANDROID;
export default {
    /**
     * @const
     * @type {string}
     * @description 返回本地环境的类型, ios|android
     *
     *
     */
    get type() {
         return  "..."
    },
    /**
     * @const 
     * @return {object} 包含sysVersion 系统版本名称 mobileModel 手机型号
     * @description 系统信息
     */
    get systemInfo() {
         return  {}
    },
    /**
     * @const
     * @type {boolean}
     * @description 判断是否是 android
     */
    get isAndroid() {
         return  false
    },
    /**
     * @const
     * @description 判断是否 iOS
     */
    get isIOS() {
         return  false
    },
    /**
     * @const
     * @type string
     * @description APP 的版本, 例如"1.0.0"
     */
    get version() {
         return  ""
    },
    /**
     * @const
     * @type int
     * @description APP 的 apiLevel
     */
    get apiLevel() {
         return  0
    },
    /**
     * 判断是否是调试版本
     * @const
     * @type {boolean}
     * @readonly
     *
     */
    get isDebug() {
         return  true
    },
    /**
     * 是否是国际版APP 国内版1 国际版2 欧洲版3
     * @const
     * @type {boolean}
     * @readonly
     */
    get applicationEdition() {
         return  true
    },
    /**
     * @const
     * @see {@link module:miot/host/ui}
     * @description 可调起的host业务页面
     *
     */
    get ui() {
        return HostUI;
    },
    /**
     * @const
     * @see {@link module:miot/host/locale}
     * @description host 的本地化设置, 包括语言,地区,城市等等
     */
    get locale() {
        return HostLocale;
    },
    /**
     * 本地数据存储服务模块
     * @const
     * @see {@link module:miot/host/storage}
     *
     */
    get storage() {
        return HostStorage;
    },
    /**
     * 本地文件服务模块
     * @const
     * @see {@link module:miot/host/file}
     */
    get file() {
        return HostFile;
    },
    /**
     * 音频 播放，录制，转码相关模块
     * @const
     * @see {@link module:miot/host/audio}
     */
    get audio() {
        return HostAudio;
    },
    /**
     * 加密解密模块
     * @const
     * @see {@link module:miot/host/crypto}
     */
    get crypto() {
        return HostCrypto;
    },
    /**
     * 获取手机wifi信息
     * @return {Promise}
     * @example
     * Host.getWifiInfo().then(res => console("ssid and bssid = ", res.SSID, res.BSSID))
     */
    getWifiInfo() {
         return Promise.resolve(null);
    },
    /**
     * 获取APP名称
     */
    getAppName() {
         return Promise.resolve(null);
    },
}