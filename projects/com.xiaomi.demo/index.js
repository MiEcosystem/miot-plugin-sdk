import App from "./Main";
import {Package, Entrance, PackageEvent, Host, Device} from "miot";
PackageEvent.packageAuthorizationCancel.addListener(()=>{
    // 用户撤销授权,需要清除缓存
    console.log("packageAuthorizationCancel");
    let licenseKey = "license-"+Device.deviceID;
    Host.storage.set(licenseKey, false);
    Package.exit();
})
PackageEvent.packageViewWillAppear.addListener(()=>{console.log("packageViewWillAppear")});
PackageEvent.packageWillLoad.addListener(()=>{console.log("packageWillLoad")});
PackageEvent.packageDidLoaded.addListener(()=>{console.log("packageDidLoaded")});
PackageEvent.packageDidResume.addListener(()=>{console.log("packageDidResume")});
PackageEvent.packageWillPause.addListener(()=>{console.log("packageWillPause")});
PackageEvent.packageWillExit.addListener(()=>{console.log("packageWillExit")});
switch (Package.entrance) {
    case Entrance.Scene:
        Package.entry(require('./Main/SceneMain'), _ => {
        });
        break;
    default:
        Package.entry(App, _ => {
        });
        break;
}
