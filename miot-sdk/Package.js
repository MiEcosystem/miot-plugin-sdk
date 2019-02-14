/**
 * @export
 * @module miot/Package
 * @description 扩展程序包参数, 主要来自于{@link packageInfo.json} 的配置与系统本身的特性
 * @example
 *  import {Package} from 'miot'
 *  import Package from 'miot/Package'
 *
 *      Package.entrance
 *      Package.entryInfo
 *      Package.exitInfo={...}
 *
 *     Package.pluginID
 *     Package.packageID
 *     Package.packageName
 *     Package.version
 *     Package.minApiLevel
 *     Package.buildType
 *     Package.isDebug
 *     Package.models
 *
 *     Package.entry(App, ()=>{...});
 *     Package.exit({...});
 *
 *
 *
 */
import {
    AppRegistry, DeviceEventEmitter
} from "react-native";
import React from 'react';
import RootDevice from "./Device";
import resolveAssetResource from "./native/common/node/resolve";
export const DEBUG = "debug";
export const RELEASE = "release";
/**
 * 扩展程序调用的入口类型
 * @namespace Entrance
 */
export const Entrance = {
    /**
     * 主入口
     * @const
     */
    Main: "main",
    /**
     * 场景入口
     * @const
     */
    Scene: "scene"
}
Object.freeze(Entrance)
/**
 * Package事件名集合
 * @namespace PackageEvent
 * @example
 *    import {PackageEvent} from 'miot'
 *    const subscription = PackageEvent.packageWillPause.addListener(()=>{
 *          ...
 *     })
 *    ...
 *    subscription.remove()
 *    ...
 *
 *
 */
export const PackageEvent = {
    /**
     * 插件将要加载
     * @event
     *
     */
    packageWillLoad: { local: true },
    /**
     * 插件加载完成事件
     * @event
     */
    packageDidLoaded: { local: true },
    /**
    * 插件将暂时退出前台事件
    * @event
    */
    packageWillPause: { always: true },
    /**
    * 插件将重回前台事件
    * @event
    */
    packageDidResume: { always: true },
    /**
     * 用户撤销隐私授权时的回调
     * @event
     */
    packageAuthorizationCancel: { always: true, sameas: native.isIOS ? 'kMHPluginReceivingDeviceCancelAuthorization' : 'packageAuthorizationCancel' },
    /**
     * 插件接收到场景等通知消息
     * @event
     *
     *
     */
    packageReceivedInformation: { always: true, sameas: native.isIOS ? 'kMHPluginReceivingForegroundPushEvent' : undefined },
    /**
    * 插件将退出事件
    * @event
    */
    packageWillExit: { always: true },
    /**
    * 从 Native 界面返回到插件,可以通过监听此事件更新已加载过的视图，或进行相应的事件处理。
    * @event
    */
    packageViewWillAppear: { always: true, sameas: native.isIOS ? 'viewWillAppear' : undefined }
};
/**
 * @export
 */
export default {
    
    /**
     * 入口类型
     * @const
     * @type {Entrance}
     * @readonly
     *
     */
    get entrance() {
         return  Entrance.Main
    },
    /**
     * 入口信息
     * @const
     * @type {json}
     * @readonly
     *
     */
    get entryInfo() {
         return  {}
    },
    /**
     * 退出后返回给调用者的信息, 例如自定义场景
     * @member {json}
     *
     * @example
     * //自定义trigger场景保存退出 finishCustomSceneSetupWithTrigger
     * var trigger = Package.entryInfo;
     * trigger.payload = { 'xxx': 'xxx' };//trigger payload 数据
     * Package.exitInfo = trigger; // 设置exitInfo之后插件就会正常退出，无需再调用 Package.exit();
     *
     * //自定义action场景保存退出 finishCustomSceneSetupWithAction
     * var action = Package.entryInfo;
     * action.payload = { 'xxx': 'xxx' };//action payload 数据
     * Package.exitInfo = action; // 设置exitInfo之后插件就会正常退出，无需再调用 Package.exit();
     */
    get exitInfo() {
         return  {}
    },
    set exitInfo(info) {
    },
    /**
     * 小米开放平台生成的插件包 ID
     * @const
     * @type {int}
     * @readonly
     *
     */
    get packageID() {
         return  0
    },
    /**
     * 程序包的版本号, 来自于{@link project.json} 的 {@link version}
     * @const
     * @type {string}
     * @readonly
     *
     */
    get version() {
         return  ""
    },
    /**
     * 程序包名, 来自于{@link project.json} 的 {@link package_name}
     * @const
     * @type {string}
     * @readonly
     *
     */
    get packageName() {
         return  ""
    },
    /**
     * 扩展程序适用的最低 API level, 来自于{@link project.json} 的 {@link min_api_level}
     * @const
     * @type {int}
     * @readonly
     *
     */
    get minApiLevel() {
         return  0
    },
    /**
     * 发布类型, debug | release
     * @const
     * @type {string}
     * @readonly
     *
     */
    get buildType() {
         return  "release"
    },
    /**
     * 判断是否是调试版本
     * @const
     * @type {boolean}
     * @readonly
     *
     */
    get isDebug() {
         return  false
    },
    /**
     * 适配的固件 model, 来自于@link packageInfo.json 的
     * @const
     * @type {string}
     * @readonly
     *
     */
    get models() {
         return  ""
    },
    /**
     * 系统入口
     * @method
     * @param {React.Component} RootComponent 入口的React Component模块
     * @param {function} afterPackageEntry 进入后, RootComponent 加载之前执行, 缺省为空
     * @example
     *
     * import SceneMain from '...';
     * import App from '...';
     *
     * import {Package, Entrance} from 'miot';
     *
     * switch(Package.entrance){
     *   case Entrance.Scene:
     *      Package.entry(SceneMain, ()=>{...});
     *      break;
     *   default:
     *      Package.entry(App, ()=>{...});
     *      break;
     * }
     *
     */
    entry(RootComponent, afterPackageEntry = null) {
    },
    /**
     * 强制退出插件
     * @method
     * @param {*} info -如果不为空, 则等同于设置 Package.exitInfo
     */
    exit(info = null) {
    }
}