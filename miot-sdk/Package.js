/**
 * @export public
 * @doc_name 插件导航模块
 * @doc_index 8
 * @doc_directory sdk
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
 */
import { MessageDialog } from 'miot/ui/Dialog';
import React from 'react';
import { AppRegistry, DeviceEventEmitter, View, I18nManager } from "react-native";
import Device, { DeviceEvent, PollPropMap } from "./device/BasicDevice";
import Service, { CurrentAccount } from './Service';
import Host from './Host';
import resolveAssetResource from "./native/common/node/resolve";
import { strings } from './resources';
import ProtocolManager from './utils/protocol-helper';
import ReuseHelper from './utils/reuse-helper';
import rnPackageJSON from 'react-native/package.json';
import PropTypes from 'prop-types';
import { DarkMode } from 'miot/Device';
import { SDKContextProvider } from 'miot/sdkContext';
import { ConfigProvider } from 'mhui-rn';
/**
  * @description JS端通知Native端的事件类型
  * @enum {number}
  */
const EVENT_TYPE = {
  /**
    * 插件路由发生变化
    */
  NAVIGATION_STATE_CHANGE: 1
};
Object.freeze(EVENT_TYPE);
export const DEBUG = "debug";
export const RELEASE = "release";
const kMaxFetchNavTimes = 3;
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
};
Object.freeze(Entrance);
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
  */
export const PackageEvent = {
  /**
    * 插件将要加载
    * @event
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
    * SDK弹出的隐私同意时的回调
    * @event
    * @since 10037
    */
  packageAuthorizationAgreed: { always: true },
  /**
    * 用户撤销隐私授权时的回调
    * @event
    * @param autoExit
    */
  packageAuthorizationCancel: {
  },
  /**
    * 插件接收到场景等通知消息
    * @event
    */
  packageReceivedInformation: { always: true, sameas: isIOS ? 'kMHPluginReceivingForegroundPushEvent' : undefined },
  /**
    * 插件将退出事件
    * @event
    */
  packageWillExit: { always: true },
  /**
    * 从 Native 界面返回到插件,可以通过监听此事件更新已加载过的视图，或进行相应的事件处理。
    * @event
    */
  packageViewWillAppear: { always: true, sameas: isIOS ? 'viewWillAppear' : undefined },
  /**
    * 插件收到外部APP跳转带过来的信息
    * @event
    * @since 10053
    */
  packageReceivedOutAppInformation: { always: true },
  /**
    * 从插件页面离开到 Native 界面, iOS Only
    * @since 10038
    * @event
    */
  packageViewWillDisappearIOS: { always: true, sameas: isIOS ? 'packageViewWillDisappearIOS' : undefined },
  /**
    * 插件进入后台(Android only)
    * 在插件内，用户按下home键，米家进入后台会发送该通知
    * @since 10048
    * @event
    */
  packageWillStopAndroid: { always: true, sameas: isIOS ? undefined : 'packageWillStop' }
};
/**
  * @export
  */
export default {
  /**
    * 入口类型,Main or Scene or 用户自定义（Host.ui.openPluginPage(did, pageName, pageParams) 中 pageName的值）
    * @const
    * @type {Entrance}
    * @readonly
    */
  get entrance() {
     return  Entrance.Main
  },
  /**
    * 入口类型参数, Host.ui.openPluginPage(did, pageName, pageParams) 中 pageParams的值
    * @const
    * @type {object}
    * @readonly
    */
  get pageParams() {
     return  {}
  },
  /**
    * 打开rn插件时，从native传递到RN的初始化数据信息
    * @const
    * @type {json}
    * @readonly
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
    * Package.exitInfo = trigger;
    *
    * //自定义action场景保存退出 finishCustomSceneSetupWithAction
    * var action = Package.entryInfo;
    * action.payload = { 'xxx': 'xxx' };//action payload 数据
    * Package.exitInfo = action;
    * ...
    * Package.exit();
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
    */
  get packageID() {
     return  0
  },
  get pluginID() {
     return  0
  },
  /**
    * 程序包的版本号, 来自于{@link project.json} 的 {@link version}
    * @const
    * @type {string}
    * @readonly
    */
  get version() {
     return  ""
  },
  /**
    * 获取React Native版本
    */
  get rnVersion() {
    return rnPackageJSON.version;
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
    */
  get minApiLevel() {
     return  0
  },
  /**
    * 发布类型, debug | release
    * @const
    * @type {string}
    * @readonly
    */
  get buildType() {
     return  "release"
  },
  /**
    * 判断是否是调试版本
    * @const
    * @type {boolean}
    * @readonly
    */
  get isDebug() {
     return  false
  },
  /**
    * 适配的固件 model, 来自于@link packageInfo.json 的
    * @const
    * @type {string}
    * @readonly
    */
  get models() {
     return  ""
  },
  /**
    * 自动BLE/Mesh设备升级检查，即使设置了alertDialog为true，也仅仅会在直连完成后才弹窗，红点进插件就可以显示
    * @param redPoit 红点
    * @param alertDialog 弹窗
    * @param authType 蓝牙连接类型(0: 普通小米蓝牙协议设备(新接入设备已废弃该类型)，1: 安全芯片小米蓝牙设备（比如锁类产品） 4: Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新蓝牙设备) 5: mesh 设备)
    * @since 10039
    * @example
    * Package.BLEAutoCheckUpgradeOptions = {
    *   enable: true,
    *   redPoint: true,
    *   alertDialog: true,
    *   authType: 5
    * }
    */
  set BLEAutoCheckUpgradeOptions(options) {
     return  ""
  },
  /**
    * 系统入口
    * @method
    * @param {React.Component} RootComponent 入口的React Component模块
    * @param {function} afterPackageEntry 进入后, RootComponent 加载之前执行, 缺省为空
    * @example
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
    */
  entry(RootComponent, afterPackageEntry = null) {
  },
  /**
    * 强制退出插件
    * @method
    * @param {JSON} info -如果不为空, 则等同于设置 Package.exitInfo
    * SDK_10052  新增 animated字段 eg: Package.exit({'animated': false}) 表示退出时不使用动画 目前只在ios生效，默认为true
    * @example
    *   Package.exit({...});
    * @example
    *  Package.exitInfo = {...}
    *  Package.exit();
    */
  exit(info = null) {
  },
  /**
    * since 10052
    * android only
    * 部分插件用到的功能不会跟着米家APP一起安装，需要先安装再使用(请求安装的接口是installModule)，
    * 已经安装的模块多次调用installModule不会重复安装。
    * 需要调用前需要安装的功能有：
    *  react-native-opencv 从10052开始引入，对应的moduleId为RnOpencv，Android平台需要先安装再使用，iOS则没这个要求
    * @param {string} moduleId 可选值：RnOpencv(对应为react-native-opencv)
    * @returns {json} 返回值：安装成功或已安装返回{code:0,data:{installed:true}}，安装失败返回{code:0,data:{installed:false}}
    * @example
    * const moduleId = 'RnOpencv';
    * Package.installModule(moduleId).then(res=>{
    *      if(res && res.data && res.data.installed){
    *        console.log(`module:${moduleId} is installed`).
    *      }
    *    }).catch(err=>{
    *       console.log('installeModule error:',JSON.stringify(err));
    *    })
    */
  installModule(moduleId) {
     return Promise.resolve(null);
  }
};