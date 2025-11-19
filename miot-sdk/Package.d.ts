export const DEBUG: "debug";
export const RELEASE: "release";
declare namespace _default {
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
    function entry(RootComponent: React.Component<any, any, any>, afterPackageEntry?: Function): void;
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
    function entry(RootComponent: React.Component<any, any, any>, afterPackageEntry?: Function): void;
    function _packageRootNavigationStack(): any;
    function _packageRootNavigationStack(): any;
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
    function exit(info?: JSON): void;
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
    function exit(info?: JSON): void;
    function navigate(name: any, params: {} | undefined, push: any): void;
    function navigate(name: any, params: {} | undefined, push: any): void;
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
    function installModule(moduleId: string): json;
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
    function installModule(moduleId: string): json;
}
export default _default;
import { Entrance } from "./Entrance";
import { PackageEvent } from "./event/PackageEvent";
export class PackageRoot extends React.Component<any, any, any> {
  constructor();
    darkModeListener: (value: any) => void;
    _devicePinStatusListener: any;
    ShowPrivacyLicenseDialogListener: any;
    onNavigationStateChange: any;
    listener: any;
    bleUpgradeObserver: any;
    checkWifiFirmwareUpdateAndAlert(): void;
    resetClassVariables(): void;
    onClassVariablesReseted(): void;
    pluginPrivacyPlatformCheck(): void;
    onDismiss(): void;
}
import React from "react";
export { Entrance, PackageEvent };