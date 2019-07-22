import { Device, Entrance, Host, Package, PackageEvent } from "miot";
import App from "./Main";
import Scene from './Main/SceneMain';
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
switch (Package.entrance) {
    case Entrance.Scene:
        Package.entry(Scene, _ => {
        });
        break;
    default:
        Package.entry(App, _ => {
        });
        break;
}
