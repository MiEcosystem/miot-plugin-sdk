/**
 * @export public
 * @doc_name 插件导航模块
 * @doc_index 1
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
 *
 *
 *
 */
import { MessageDialog } from 'miot/ui';
import React from 'react';
import { AppRegistry, DeviceEventEmitter, View } from "react-native";
import Service from './Service';
import Device from "./device/BasicDevice";
import Host from './Host';
//@native begin
import native, { buildEvents, PackageExitAction, Properties } from './native';
//@native end
import resolveAssetResource from "./native/common/node/resolve";
import { strings } from './resources';
import ProtocolManager from './utils/protocol-helper'
/**
 * @description JS端通知Native端的事件类型
 * @enum {number}
 */
const EVENT_TYPE = {
    /**
     * 插件路由发生变化
     */
    NAVIGATION_STATE_CHANGE: 1,
}
Object.freeze(EVENT_TYPE);
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
     * @param autoExit
     */
    packageAuthorizationCancel: {
        //@native begin
        always: emitter => () => {
            emitter.emit(true);
            if (native.isAndroid) {
                native.MIOTHost.closeCurrentPage();
            }
        },
        sameas: native.isIOS ? 'kMHPluginReceivingDeviceCancelAuthorization' : 'packageAuthorizationCancel'
        //@native end
    },
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
//@native begin
buildEvents(PackageEvent);
let pluginConfigUpdate;
DeviceEventEmitter.addListener('onPluginConfigUpdate', (data) => {
    Object.assign(native.MIOTDevice, data.device);
    Object.assign(native.MIOTPackage, data.package);
    if (data.service) { Object.assign(native.MIOTService, data.service); }
    if (data.host) { Object.assign(native.MIOTHost, data.host); }
    if (data.file) { Object.assign(native.MIOTFile, data.file); }
    if (data.audio) { Object.assign(native.MIOTAudio, data.audio); }
    resolveAssetResource(native.MIOTPackage.basePath, native.MIOTPackage.localFilePath, native.MIOTPackage.plugPath);
    Properties.init(Device, { ...native.MIOTDevice.currentDevice, _msgset: new Set() });
    console.log("PluginStartTime", 'initPluginConfig', native.MIOTPackage.packageName, Device.deviceID);
    pluginConfigUpdate && pluginConfigUpdate(Device.deviceID);
});
/**
 * entryInfo={entrance:scene|main,info:{json}}
 * @type {{entry: (json|{})}}
 */
const extra = {}
function callPackageLifecycle(type, data) {
    if (!native.MIOTPackage.onPackageLifecycle) {
        return;
    }
    native.MIOTPackage.onPackageLifecycle(type, data || "");
}
/**
 * @description 在插件端发生某些事件，通知native端
 * @param {number} type 事件类型
 * @param {object} data 传入native的数据
 */
function onPluginEvent(type, data = {}) {
    if (!native.MIOTPackage.onDeventJs) return;
    if (native.isIOS) {
        native.MIOTPackage.onDeventJs(type, data, () => { });
    }
    else {
        native.MIOTPackage.onDeventJs(type, data);
    }
}
class PackageRoot extends React.Component {
    constructor() {
        super();
        this.state = { did: '' };//插件的唯一标识，当改变的时候要重新刷新插件
        pluginConfigUpdate = (did) => {
            this.setState({
                did,
                showFirmwareUpdateAlert: false,
                firmwareUpdateTitle: '',
                firmwareUpdateSure: '',
                firmwareUpdateCancel: '',
                packageExitOnFirmwareUpdateCancel: false,
                isShowingPrivacyLicenseDialog: false
            })
        };
    }
    componentWillMount() {
        if (extra.willLoad) {
            return;
        }
        extra.willLoad = true;
        callPackageLifecycle("willMount")
        //系统初始化
        if (extra.afterPackageEntry) {
            extra.afterPackageEntry();
            extra.afterPackageEntry = null;
        }
        //package will load
        PackageEvent.packageWillLoad.emit();
        this.ShowPrivacyLicenseDialogListener = DeviceEventEmitter.addListener('MH_Event_ShowPrivacyLicenseDialog', (params) => {
            console.log("received MH_Event_ShowPrivacyLicenseDialog...", params)
            let { isShowingPrivacyLicenseDialog } = params;
            if (isShowingPrivacyLicenseDialog) {
                this.setState({
                    showFirmwareUpdateAlert: false,
                    isShowingPrivacyLicenseDialog: isShowingPrivacyLicenseDialog,
                })
            } else {
                // 什么也用不做
            }
        });
        this.onNavigationStateChange = DeviceEventEmitter.addListener('onNavigationStateChange', ({ action, prevNav, nav }) => {
            // 路由入栈或者出栈
            if (action.type === 'Navigation/NAVIGATE'
                || action.type === 'Navigation/BACK'
                || action.type === 'Navigation/PUSH'
                || action.type === 'Navigation/POP'
                || action.type === 'Navigation/REPLACE') {
                onPluginEvent(EVENT_TYPE.NAVIGATION_STATE_CHANGE,
                    {
                        routeIndex: prevNav.index,
                        routeName: prevNav.routes[prevNav.index].routeName,
                        event: 'hide'
                    });
            }
            // 跳转完成
            if (action.type === 'Navigation/COMPLETE_TRANSITION') {
                onPluginEvent(EVENT_TYPE.NAVIGATION_STATE_CHANGE,
                    {
                        routeIndex: nav.index,
                        routeName: nav.routes[nav.index].routeName,
                        event: 'show'
                    });
            }
        });
    }
    componentDidMount() {
        if (extra.didLoaded) {
            return;
        }
        extra.didLoaded = true;
        //package did loaded
        callPackageLifecycle("didMount")
        onPluginEvent(EVENT_TYPE.NAVIGATION_STATE_CHANGE,
            {
                routeIndex: 0,
                routeName: '',
                event: 'show'
            });
        PackageEvent.packageDidLoaded.emit();
        this.checkLegalInformationAuthorization().then(res => {
            console.log('resolve yes', res);
        }).catch(err => {
            console.log('resolve false', err);
        });
        this.listener = DeviceEventEmitter.addListener('MH_FirmwareNeedUpdateAlert', (params) => {
            Device.needUpgrade = params.needUpgrade;
            if (this.state.isShowingPrivacyLicenseDialog) {
                // 如果当前插件正在显示隐私协议弹窗，就不进行强制升级检查
                return;
            }
            let { needUpgrade, force, upgrading, latestVersion } = params;
            Host.storage.get('mh_firmware_last_op_time' + Device.deviceID).then(val => {
                if (val) {
                    let now = new Date().getTime()
                    let last = val;
                    let offset = now - last;
                    return new Promise.resolve(offset < 600000);
                } else {
                    return new Promise.resolve(false);
                }
            }).then(alreadyShow => {
                //已经显示过，并且不是强制升级
                if (alreadyShow && !force) { return; }
                if (force) {
                    if (upgrading) {
                        this.setState({
                            firmwareUpdateTitle: strings.firmwareUpgradeForceUpdating,
                            firmwareUpdateSure: strings.firmwareUpgradeLook,
                            firmwareUpdateCancel: strings.firmwareUpgradeExit,
                            packageExitOnFirmwareUpdateCancel: true,
                            showFirmwareUpdateAlert: true
                        })
                    } else if (needUpgrade) {
                        this.setState({
                            firmwareUpdateTitle: strings.firmwareUpgradeForceUpdate,
                            firmwareUpdateSure: strings.firmwareUpgradeUpdate,
                            firmwareUpdateCancel: strings.firmwareUpgradeExit,
                            packageExitOnFirmwareUpdateCancel: true,
                            showFirmwareUpdateAlert: true
                        })
                    }
                } else {
                    if (upgrading) {
                        //do nothing
                    } else if (needUpgrade && latestVersion) {
                        this.setState({
                            firmwareUpdateTitle: strings.firmwareUpgradeNew_pre + latestVersion + strings.firmwareUpgradeNew_sub,
                            firmwareUpdateSure: strings.firmwareUpgradeUpdate,
                            firmwareUpdateCancel: strings.cancel,
                            packageExitOnFirmwareUpdateCancel: false,
                            showFirmwareUpdateAlert: true
                        })
                    }
                }
            })
        });
        if (extra.package && !extra.package.disableAutoCheckUpgrade && !this.state.isShowingPrivacyLicenseDialog) {
            Device.checkFirmwareUpdateAndAlert().then(res => {
            }).catch(err => {
            })
        }
    }
    componentWillUnmount() {
        extra.willLoad = false;
        extra.didLoaded = false;
        callPackageLifecycle("willUnmount")
        PackageExitAction.execute();
        PackageEvent.packageWillExit.emit();
        this.listener && this.listener.remove();
        this.ShowPrivacyLicenseDialogListener && this.ShowPrivacyLicenseDialogListener.remove();
        ProtocolManager.setLegalInfoAuthHasShowed(false);
    }
    checkLegalInformationAuthorization() {
        if (true == ProtocolManager.getLegalInfoAuthHasShowed()) {
            return new Promise.reject("隐私授权已确认");
        }
        if (false == Device.isOnline) {
            // console.log('checkLegalInformationAuthorization catch:', '设备离线');
            return new Promise.reject("设备离线");
        }
        if ((Device.isShared || Device.isFamily)) {
            return new Promise.reject("分享设备不建议进行弹窗请求隐私授权。");
        }
        return new Promise((resolve, reject) => {
            Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_auth_config"] }]).then(res => {
                // console.log('batchGetDeviceDatas ', res);
                let alreadyAuthed = true;
                if (!res) {
                    reject("data error res null");
                    return;
                }
                let result = res[Device.deviceID];
                if (!result) {
                    reject("data error result null");
                    return;
                }
                let config = result['prop.s_auth_config'];
                if (config) {
                    try {
                        let authJson = JSON.parse(config);
                        // console.log('auth config ', authJson)
                        alreadyAuthed = authJson.privacyAuthed && true;
                    } catch (err) {
                        reject("json parse error");
                        return;
                    }
                } else {
                    // 设备初识化进入 没有注册过这个设备的s_auth_config属性就会为null 并不代表已经同意了用户协议
                    alreadyAuthed = false;
                }
                if (alreadyAuthed) {
                    reject("已经授权");
                } else {
                    ProtocolManager.getLegalAuthInfoProtocol().then(protocol => {
                        if (!protocol || !protocol.privacyURL) {
                            reject("获取url失败");
                            return;
                        }
                        if (protocol.privacyURL) {
                            protocol.privacyURL = ProtocolManager.resolveUrlWithLink(protocol.privacyURL);
                        }
                        if (protocol.agreementURL) {
                            protocol.agreementURL = ProtocolManager.resolveUrlWithLink(protocol.agreementURL);
                        }
                        if (protocol.hideAgreement) {
                            delete protocol['agreementURL']//iOS下设置为“”则隐藏该项目
                        }
                        if (protocol.experiencePlanURL) {
                            protocol.experiencePlanURL = ProtocolManager.resolveUrlWithLink(protocol.experiencePlanURL);
                        }
                        if (protocol.hideUserExperiencePlan) {
                            delete protocol['experiencePlanURL']
                        }
                        if (true == ProtocolManager.getLegalInfoAuthHasShowed()) {
                            reject('隐私授权已确认');
                            return;
                        }
                        DeviceEventEmitter.emit('MH_Event_ShowPrivacyLicenseDialog', { isShowingPrivacyLicenseDialog: true });
                        ProtocolManager.setLegalInfoAuthHasShowed(true);
                        native.MIOTHost.showDeclarationWithConfig(protocol, (ret, res) => {
                            if (ret === 'ok' || ret === true || ret === 'true') {
                                Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_auth_config": JSON.stringify({ 'privacyAuthed': true }) } }]);
                                resolve('ok');
                            } else {
                                Package.exit();
                                reject("不同意协议，插件退出");
                                return;
                            }
                        });
                    }).catch(err => {
                        reject(err);
                    });
                }
            }).catch(err => {
                // console.log('batchGetDeviceDatas catch:', err);
                reject(err);
            });
        });
    }
    render() {
        const { App } = extra;
        return <View style={{ flex: 1 }}>
            <App key={this.state.did} ></App>
            <MessageDialog title=''
                message={this.state.firmwareUpdateTitle}
                cancelable={true}
                cancel={this.state.firmwareUpdateCancel}
                confirm={this.state.firmwareUpdateSure}
                onCancel={(e) => {
                    if (this.state.packageExitOnFirmwareUpdateCancel) {
                        Package.exit();
                    }
                }}
                onConfirm={(e) => {
                    Host.ui.openDeviceUpgradePage();
                }}
                onDismiss={() => {
                    let now = new Date().getTime()
                    Host.storage.set('mh_firmware_last_op_time' + Device.deviceID, now)
                    // console.log('onDismiss');
                }}
                visible={this.state.showFirmwareUpdateAlert} />
        </View>
    }
}
//@native end
/**
 * @export
 */
export default {
    //@native begin
    get extraEntry() {
        if (!extra.entry) {
            let temp = native.MIOTPackage.entryInfo || {};
            extra.entry = typeof (temp) == "string" ? JSON.parse(temp) : temp;
        }
        return extra.entry;
    },
    //@native end
    /**
     * 入口类型,Main or Scene or 用户自定义（Host.ui.openPluginPage(did, pageName, pageParams) 中 pageName的值）
     * @const
     * @type {Entrance}
     * @readonly
     *
     */
    get entrance() {
        //@native => Entrance.Main
        return this.extraEntry.entrance || Entrance.Main;
    },
    /**
     * 入口类型参数, Host.ui.openPluginPage(did, pageName, pageParams) 中 pageParams的值
     * @const
     * @type {object}
     * @readonly
     *
     */
    get pageParams() {
        //@native => {}
        //@native begin
        // 保证是json，Android传递过来是字符串格式
        if (this.entryInfo && this.entryInfo.pageParams && typeof this.entryInfo.pageParams === 'string') {
            this.entryInfo.pageParams = JSON.parse(this.entryInfo.pageParams);
        }
        return this.entryInfo.pageParams || {};
        //@native end
    },
    /**
     * 打开rn插件时，从native传递到RN的初始化数据信息
     * @const
     * @type {json}
     * @readonly
     *
     */
    get entryInfo() {
        //@native => {}
        //@native begin
        if (this.extraEntry.info && this.extraEntry.info.payload && this.extraEntry.info.payload.androidData) {
            this.extraEntry.info.payload.androidData = JSON.parse(this.extraEntry.info.payload.androidData);
            this.extraEntry.info.payload.id = this.extraEntry.info.payload.id || this.extraEntry.info.payload.androidData.actionId;
        }
        return this.extraEntry.info || {};
        //@native end
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
        //@native => {}
        return extra.exitInfo;
    },
    set exitInfo(info) {
        //@native begin
        extra.exitInfo = info;
        native.MIOTPackage.setExitInfo(this.entrance, JSON.stringify(info || {}));
        //@native end
    },
    /**
     * 小米开放平台生成的插件包 ID
     * @const
     * @type {int}
     * @readonly
     *
     */
    get packageID() {
        //@native => 0
        return native.MIOTPackage.packageID;
    },
    get pluginID() {
        //@native => 0
        return native.MIOTPackage.pluginID;
    },
    /**
     * 程序包的版本号, 来自于{@link project.json} 的 {@link version}
     * @const
     * @type {string}
     * @readonly
     *
     */
    get version() {
        //@native => ""
        return native.MIOTPackage.version;
    },
    /**
     * 获取React Native版本
     */
    get rnVersion() {
        return "0.54.4";
    },
    /**
     * 程序包名, 来自于{@link project.json} 的 {@link package_name}
     * @const
     * @type {string}
     * @readonly
     *
     */
    get packageName() {
        //@native => ""
        return native.MIOTPackage.packageName;
    },
    /**
     * 扩展程序适用的最低 API level, 来自于{@link project.json} 的 {@link min_api_level}
     * @const
     * @type {int}
     * @readonly
     *
     */
    get minApiLevel() {
        //@native => 0
        return native.isAndroid ? native.MIOTHost.systemInfo.hostApiLevel : native.MIOTHost.apiLevel;
    },
    /**
     * 发布类型, debug | release
     * @const
     * @type {string}
     * @readonly
     *
     */
    get buildType() {
        //@native => "release"
        return native.MIOTPackage.buildType;
    },
    /**
     * 判断是否是调试版本
     * @const
     * @type {boolean}
     * @readonly
     *
     */
    get isDebug() {
        //@native => false
        return this.buildType === DEBUG;
    },
    /**
     * 适配的固件 model, 来自于@link packageInfo.json 的
     * @const
     * @type {string}
     * @readonly
     *
     */
    get models() {
        //@native => ""
        return native.MIOTPackage.models;
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
        //@native begin
        // const self = Properties.of(this);
        const { App } = extra;
        // if (App) {
        //     throw "warning, the package is already started.";
        // }
        // if (!RootComponent) {
        //     throw "warning, the first params for entry is required.";
        // }
        extra.App = RootComponent;
        extra.afterPackageEntry = afterPackageEntry;
        extra.package = this;
        let packName = this.packageName;
        // 给小爱智能 tab 使用
        // AppRegistry.registerComponent('com.xiaomi.miottab', () => PackageRoot);
        AppRegistry.registerComponent(packName, () => PackageRoot);
        console.log("PluginStartTime  " + Date.now(), packName);
        //@native end
    },
    /**
     * 强制退出插件
     * @method
     * @param {*} info -如果不为空, 则等同于设置 Package.exitInfo
     * @example
     *
     *   Package.exit({...});
     *
     * @example
     *  Package.exitInfo = {...}
     *  Package.exit();
     *
     */
    exit(info = null) {
        //@native begin
        if (info) {
            this.exitInfo = info;
        }
        // native.MIOTPackage.exit(JSON.stringify({point:this.entryInfo, info:info||this.exitInfo}));
        native.MIOTHost.closeCurrentPage();
        //@native end
    }
}