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
import React from 'react';
import { AppRegistry, DeviceEventEmitter, View, I18nManager } from "react-native";
import { SDKContextProvider } from 'miot/sdkContext';
import Service, { CurrentAccount } from './Service';
import Device, { DeviceEvent, PollPropMap } from "./device/BasicDevice";
import { strings } from './resources';
import { initI18nsStings } from './resources/Strings';
import { ConfigProvider } from 'mhui-rn';
import { DarkMode } from 'miot/Device';
import { MessageDialog } from 'miot/ui/Dialog';
import Host from './Host';
import { PackageEvent } from './event/PackageEvent';
import { Entrance } from './Entrance';
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
export { Entrance };
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
export { PackageEvent };
   pluginPrivacyPlatformCheck() {
    if (Device.isWearableDevice) {
      PackageEvent.packageAuthorizationAgreed.emit();
      return;
    }
     ProtocolManager.pluginLegalInformationCheck().then((res) => {
       console.log('Package check pluginLegalInformationCheck resolve result: ', res);
       ProtocolManager.protocolMangerReportLog('[Privacy Debug] Package: Package check pluginLegalInformationCheck resolve result: ', res);
       if (res?.code == 0) {
         let mes = res?.data?.result;
         if (mes === ProtocolManager.ProtocolManager_PrivacyAgree || mes === ProtocolManager.ProtocolManager_PrivacyAgreeChanges) {
           PackageEvent.packageAuthorizationAgreed.emit();
           return;
         }
       }
     }).catch((err) => {
       console.log('Package check pluginLegalInformationCheck catch error: ', err);
       ProtocolManager.protocolMangerReportLog('[Privacy Debug] Package: Package check pluginLegalInformationCheck catch error: ', err);
       let mess = err?.message;
       if (mess === ProtocolManager.ProtocolManager_PrivacyRejected) {
         native.MIOTHost.closeCurrentPage({ 'animated': true });
       }
     });
   }
   render() {
     const currentColorScheme = native.MIOTService.currentDarkMode ? native.MIOTService.currentDarkMode : "light";
     const media = { screenType: 'phone' };
     if (Host.isPad) { media.screenType = 'tablet'; }
     return (
       <View style={{ flex: 1 }}>
         <SDKContextProvider value={{ colorScheme: currentColorScheme }}>
           <ConfigProvider media={media} language={Host.locale.language} colorScheme={currentColorScheme}>
             <AppContainter did={this.state.did} ref={(ref) => { AppContainterRef = ref; }} />
           </ConfigProvider>
         </SDKContextProvider>
         <MessageDialog
           type={MessageDialog.TYPE.SIMPLE}
           title=""
           visible={this.state.showFirmwareUpdateAlert}
           message={this.state.firmwareUpdateTitle}
           canDismiss={this.state.firmwareUpdateDialogCanDismiss}
           buttons={[
             {
               text: this.state.firmwareUpdateCancel,
               callback: () => {
                 DeviceEventEmitter.emit('MH_Event_FirmwareUpdateDialog', { isSure: false });
                 if (this.state.packageExitOnFirmwareUpdateCancel) {
                   native.MIOTHost.closeCurrentPage({ 'animated': true });
                 }
                 this.onDismiss();
               }
             },
             {
               text: this.state.firmwareUpdateSure,
               callback: () => {
                 DeviceEventEmitter.emit('MH_Event_FirmwareUpdateDialog', { isSure: true });
                 this.onDismiss();
                 let { navigation, upgradePageKey, upgradePageParams } = extra?.package?._wifiDeviceUpgradeOptions || {};
                 if (Device.type === Device.DEVICE_TYPE.WIFI_SINGLE_MODEL_DEVICE && navigation && upgradePageKey) {
                   navigation.navigate(upgradePageKey, upgradePageParams || {});
                   return;
                 } 
                 if (AutoOTAABTestHelper.autootaSupported(Device.type, Device.model)) {
                   // wifi设备固件升级 Q3实验性功能 固件自动升级
                   this.props.navigation.navigate('FirmwareUpgradeAuto', { needRenderHeader: true });
                   return;
                 }
                 Device.needUpgrade = false;
                 if ((Device.type == 6 || Device.type == 16) && extra.package && extra.package._bleAutoCheckUpgradeOptions && extra.package._bleAutoCheckUpgradeOptions.enable) {
                   let authType = extra.package._bleAutoCheckUpgradeOptions.authType;
                   Host.ui.openBleCommonDeviceUpgradePage({ auth_type: authType });
                 } else {
                   Host.ui.openDeviceUpgradePage(1);
                 }
               }
             }
           ]}
           onDismiss={() => { this.onDismiss(); }
           }
         />
       </View>
     );
   }
   onDismiss() {
     this.setState({ showFirmwareUpdateAlert: false });
     let now = new Date().getTime();
     Host.storage.set(`mh_firmware_last_op_time${ Device.deviceID }`, now);
   }
}
export { PackageRoot };
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
    * wifi设备升级参数 目前sdk要求所有wifi设备都需要开启固件升级检查，但是开发者可以自行实现检查的页面的逻辑
    * @param navigation 传入包含upgradePageKey的navigation，否则可能会出现无法跳转的情况
    * @param upgradePageKey 要跳转的page key 通常是在index中定义的
    * @param upgradePageParams 要跳转的page params
    * @since 10080
    * @example
    * Package.wifiDeviceUpgradeOptions = {
    *   navigation: xxx,
    *   upgradePageKey: 'xxxUpgradePage',
    *   upgradePageParams: { xxx: xxx },
    * }
    */
  set wifiDeviceUpgradeOptions(options) {
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