/**
 * @export public
 * @doc_name 原生模块
 * @doc_index 1
 * @doc_directory host
 * @module miot/Host
 * @description
 * 扩展程序运行时的宿主环境
 * 所有由宿主APP直接提供给扩展程序的接口均列在这里. 主要包括原生业务页面、本地数据访问、系统提供的能力等
 * 系统的能力主要包括：
 * 音频(audio.js)
 * 文件存储(file.js)
 * 本地KV存储(storage.js)
 * 编解码(crypto.js)
 * 系统基本信息(locale.js)
 * 米家APP提供的能力主要包括：
 * 米家APP提供的UI能力(ui.js)
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
import HostAudio from './host/audio';
import HostCrypto from './host/crypto';
import HostFile from './host/file';
import HostLocale from './host/locale';
import HostStorage from './host/storage';
// import HostUI from './host/ui';
//@native = const IOS="ios", ANDROID="android";
import native, { ANDROID, buildEvents, DEBUG, IOS } from "./native";
//@native
// const resolveAssetSource = require('resolveAssetSource');
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
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
        //@native => "..."
        return native.type;
    },
    /**
     * @const
     * @type {object}
     * @description 系统信息 包含sysVersion 系统版本名称 mobileModel 手机型号
     */
    get systemInfo() {
        //@native => {}
        return native.MIOTHost.systemInfo;
    },
    /**
     * @const
     * @type {boolean}
     * @description 判断是否是 android
     */
    get isAndroid() {
        //@native => false
        return native.isAndroid;
    },
    /**
     * @const
     * @type {boolean}
     * @description 判断是否 iOS，和上面那个方法二选一即可
     */
    get isIOS() {
        //@native => false
        return native.isIOS;
    },
    /**
     * @const
     * @type string
     * @description APP 的版本, 例如"1.0.0"
     */
    get version() {
        //@native => ""
        return native.MIOTHost.appVersion || native.MIOTHost.systemInfo.sysVersion;
    },
    /**
     * @const
     * @type int
     * @description APP 的 apiLevel
     */
    get apiLevel() {
        //@native => 0
        return native.isAndroid ? native.MIOTHost.systemInfo.hostApiLevel : native.MIOTHost.apiLevel;
    },
    /**
     * 判断是否是调试版本
     * @const
     * @type {boolean}
     * @readonly
     *
     */
    get isDebug() {
        //@native => true
        return native.MIOTHost.buildType === DEBUG;
    },
    /**
     * 是否是国际版APP 国内版1 国际版2 欧洲版3
     * @const
     * @type {int}
     * @readonly
     * @deprecated 10033
     */
    get applicationEdition() {
        //@native => true
        return native.isAndroid ? (this.ui.checkStoreSupporttedOnAndroid() ? 1 : 2) : native.MIOTHost.ApplicationEdition
    },
    /**
     * 获取 米家APP中 我的-->开发者设置-->其他设置，  AppConfig接口拉取preview版数据 是否选中的状态
     * 1:表示选中, preview ； 0：表示未选中, release
     * 如果选中，Service.smarthome.getAppConfig 获取的数据为preview版数据， 反之为release版数据
     * @since 10024
     * @const
     * @type {int}
     * @readonly
     */
    get appConfigEnv() {
        //@native => true
        return native.MIOTHost.appConfigEnv
    },
    /**
     * @const
     * @see {@link module:miot/host/ui}
     * @description 可调起的host业务页面
     *
     */
    get ui() {
        let ui = require('./host/ui').default;
        return ui;
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
     * @return {Promise<object>}
     * 成功时：{BSSID:xxx, SSID:xxx}
     * 失败时：返回的是错误信息，字符串格式
     * @example
     * Host.getWifiInfo()
     * .then(res => console.log("ssid and bssid = ", res.SSID, res.BSSID))
     * .catch((error)=>{
     *   console.log(error)
     * });
     */
    getWifiInfo() {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTHost.getConnectedWifi((ok, res) => {
                if (!ok) {
                    return reject(res);
                }
                resolve(res);
            });
        });
        //@native end
    },
    /**
     * 获取APP名称
     * @return {Promise<string>}
     *
     */
    getAppName() {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTHost.getAppName(name => {
                resolve(name);
            });
        })
        //@native end
    },
    /**
     * 获取Android手机屏幕相关信息(包括状态栏高度)
     * @since 10012
     * @returns {Promise<object>} 手机屏幕相关信息 {'viewWidth':xxx, 'viewHeight':xxx}
     */
    getPhoneScreenInfo() {
        //@native :=> promise
        if (native.isAndroid) {
            return new Promise((resolve, reject) => {
                native.MIOTHost.getPhoneScreenInfo((isSuccess, info) => {
                    if (isSuccess) {
                        resolve(info);
                    } else {
                        reject(info);
                    }
                })
            })
        } else {
            return new Promise.reject("iOS not support")
        }
        //@native end
    },
    /**
     * 获取当前登陆用户的服务器国家
     * @since 10010
     * @deprecated 10011 改用 Service.getServerName
     * @returns Promise<string> 返回国家编码，如:‘CN’
     */
    getCurrentCountry() {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTHost.loadCurrentCountryCode(country => {
                resolve(country);
            })
        })
        //@native end
    },
    /**
     * 获取手机运营商信息
     * 返回值中：
     * name 运营商名称-与手机语言一致
     * simOperator 运营商 国家编码(三位)+网络编码 参考 https://en.wikipedia.org/wiki/Mobile_country_code
     * countryCode 运营商国家码，ISO 3166-1 country code
     * @since 10021
     * @returns {Promise} 运营商信息 {'1':{name:'',simOperator:'',,countryCode:''},'2':{...}}
     */
    getOperatorsInfo() {
        //@native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTHost.loadOperatorsType((ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
        //@native end
    },
    /**
     * jx执行器
     * @typedef IExecutor
     * @since 10002
     * @property {boolean} isReady  - 是否可用
     * @property {boolean} isRunning - 是否运行中
     * @property {*} execute(method, ...args) - 执行某个函数
     * @property {} remove() - 删除
     *
     */
    /**
     * 后台执行文件, 后台最多同时运行三个线程, 超过将销毁最早创建的 executor
     * @since 10002
     * @param {*} jx - 可执行的纯 js 文件, 不使用任何高级语法, 如要使用 es6, 请自行编译通过.
     * @param {json} initialProps - 用于脚本初始化的数据, 在jx文件中为 'initialProps' 对象，使用方法参考样例 或者sampleProject中 ‘com.xiaomi.demo/Main/tutorial/JSExecutor.js’
     * @returns {Promise<IExecutor>}
     * @example
     *
     * var myexecutor = null;
     * Host.createBackgroundExecutor(require('./test.jx'), {name1:"testName"})
     *      .then(executor=>{
     *          myexecutor = executor;
     *          executor.execute("myFunc", 1,2,'a')
     *                  .then(result=>{
     *                      console.log(result);
     *                  })
     *          //支持使用initialProps或者在jx中直接使用
     *          executor.execute("myFunc2", "initialProps.name1").then(res =>{...})
     *          //支持使用obj与arr
     *          executor.execute("SomeObject.myFunc3", {"name":"hello"}, ["a1","a2"]).then(res =>{...})
     * })
     * .then(err=>{...})
     * ....
     * myexecutor&&myexecutor.remove();
     */
    createBackgroundExecutor(jx, initialProps = {}) {
        //@native :=> promise {execute(method, ...args){}, remove(){}}
        return new Promise((resolve, reject) => {
            jx = resolveAssetSource(jx);
            console.log("ready to run jx:" + jx);
            native.MIOTHost.createExecutor(jx.uri, native.isAndroid ? JSON.stringify(initialProps || {}) : initialProps || {}, (ok, res) => {
                if (ok) {
                    const status = { running: false, ready: true };
                    const executor = {
                        get id() { return res },
                        get isReady() {
                            return status.ready;
                        },
                        get isRunning() {
                            return status.running;
                        },
                        execute(method, ...args) {
                            if (!status.ready) {
                                return Promise.reject(1, "thread is not ready");
                            }
                            // if (status.running) {
                            //     return Promise.reject(2, "thread is running");
                            // }
                            // status.running = true;
                            return new Promise((resolve, reject) => {
                                native.MIOTHost.executeMethod(executor.id, method, native.isAndroid ? JSON.stringify([...args]) : [...args],
                                    (ok, res, st) => {
                                        // status.running = false;
                                        if (!status.ready) {
                                            reject("executor is removed");
                                        } else if (ok) {
                                            resolve(res);
                                        } else {
                                            if (st == "destroyed") {
                                                status.ready = false;
                                            }
                                            reject(res);
                                        }
                                    });
                            });
                        },
                        remove() {
                            if (!status.ready) {
                                return;
                            }
                            status.ready = false;
                            native.MIOTHost.removeExecutor(executor.id);
                        }
                    };
                    resolve(executor);
                } else {
                    reject(res);
                }
            });
        });
        //@native end
    },
    /**
     * android 手机是否有NFC功能
     * @since 10021
     * @return {Promise<json>}  {hasNfc:true/false}
     * @example
     * Host.phoneHasNfcForAndroid().then((result)=>{
     *   console.log(result.hasNfc);
     * }))
     */
    phoneHasNfcForAndroid() {
        //@native :=> promise
        if (native.isAndroid) {
            return new Promise((resolve, reject) => {
                native.MIOTHost.phoneHasNfc((isOk, result) => {
                    if (isOk) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                })
            })
        } else {
            return new Promise.reject("not support ios yet");
        }
        //@native end
    },
    /**
     * android 连接指定ssid得wifi 使用此api不需要特别权限
     * @since 10036
     * @return {Promise<JSON>}  
     * @example
     * Host.connectWifiWithSsid().then((result)=>{
     *   console.log(result);
     * }))
     */
    connectWifiWithSsid(ssid) {
      //@native :=> promise
      if (native.isAndroid) {
          return new Promise((resolve, reject) => {
              native.MIOTHost.connectWifiWithSSID(ssid ,(isOk, res) => {
                  if (isOk) {
                      resolve(res);
                  } else {
                      reject(res);
                  }
              })
          })
      } else {
          return new Promise.reject("not support ios yet");
      }
      //@native end
  },
    /**
     * 页面有输入框，需要打开软键盘，页面适配软键盘
     * @since 10027
     * @param {boolean} shouldAdapter  true: 表示进行适配,建议UI用ScrollView包裹起来，当输入框在屏幕的下半部分时，只会触发ScrollView滚动; false： 整个页面滚动, demo可参考SoftKeyboardAdapterTestDemo.js
     * @returns {Promise<boolean>} 设置成功返回true(iOS没有实现这个接口,直接返回true)
     */
    pageShouldAdapterSoftKeyboard(shouldAdapter) {
        //@native :=> promise
        if (native.isAndroid) {
            return new Promise((resolve, reject) => {
                native.MIOTHost.pageShouldAdapterSoftKeyboard(shouldAdapter, (isOk, result) => {
                    if (isOk) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                })
            })
        } else {
            return new Promise.resolve(true);
        }
        //@native end
    },
}
/**
 * Host事件集合
 * @namespace HostEvent
 * @example
 *    import { HostEvent } from 'miot/host';
 *    const subscription = HostEvent.cellPhoneNetworkStateChanged.addListener(
 *       (event)=>{
 *          ...
 *       }
 *     )
 *    ...
 *    subscription.remove()
 *    ...
 *
 */
export const HostEvent = {
    /**
     * 手机网络状态变更事件
     * @since 10031
     * @event
     * @param{object}  接收到的数据 {networkState: xxx}
     *              networkState可取值如下：
     *             -1 ：DefaultState
     *              0 ：网络不可用
     *              1 ：蜂窝网络 2G 3G 4G
     *              2 ：WiFi网络
     *
     * @example
     * 可查看HostEventDemo.js
     *
     */
    cellPhoneNetworkStateChanged: {
        //@native begin
        forever: emitter => (result) => {
            emitter.emit({
                networkState: result.networkState
            });
        }
        //@native end
    }
}
buildEvents(HostEvent)