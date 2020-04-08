import React from 'react';
import { Entrance, API_LEVEL, PackageEvent, Package, Device, Service, Host } from 'miot';
import { View, Text, TouchableOpacity } from 'react-native';
import App from "./Main";
// import Scene from './Main/SceneMain';
import { PluginEntrance } from "./Main/PluginEntrance";


PackageEvent.packageAuthorizationCancel.addListener(() => {
    // 用户撤销授权,需要清除缓存
    console.log("packageAuthorizationCancel");
    let licenseKey = "license-" + Device.deviceID;
    Host.storage.set(licenseKey, false);
    Package.exit();
})

PackageEvent.packageViewWillAppear.addListener(() => { console.log("packageViewWillAppear") });
PackageEvent.packageWillLoad.addListener(() => { console.log("packageWillLoad") });
PackageEvent.packageDidLoaded.addListener(() => { console.log("packageDidLoaded") });
PackageEvent.packageDidResume.addListener(() => { console.log("packageDidResume") });
PackageEvent.packageWillPause.addListener(() => { console.log("packageWillPause") });
PackageEvent.packageWillExit.addListener(() => { console.log("packageWillExit") });

/**
 * 是否需要自动检测wifi固件强制升级, 此属性对分享的设备、虚拟设备、离线设备无效
 * Package.disableAutoCheckUpgrade = false  表示会自动检测， 当发现需要强制升级时，进入插件会自动出现强制升级的弹窗,反之则不会
 * @type {boolean}
 */
Package.disableAutoCheckUpgrade = false;

/**
 * 插件开发者可以在此判断，需要进入插件哪个页面, 同时也可以在 例如：App.js 中做判断，需要进入哪个页面
 * 通过 Host.ui.openPluginPage 打开插件某一页面，如果需要返回到插件首页，应该去首页的componentDidMount里面处理（可参考MainPage.js）。
 */
class Apps extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'powderblue' }}>
            <TouchableOpacity>
            <Text>hello, this is a tiny plugin project of MIOT</Text>
            </TouchableOpacity>
        </View>
        )
    }
}
switch (Package.entrance) {
    case Entrance.Scene:
        Package.entry(App, _ => {})
        break;
    case PluginEntrance.Setting:
        Package.entry(App, _ => {});
        break;
    default:
        Package.entry(App, _ => {})
        break;
}
