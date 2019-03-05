import App from "./Main";
import { Package, Entrance, PackageEvent } from "miot";
PackageEvent.packageAuthorizationCancel.addListener(()=>{
    console.log("packageAuthorizationCancel");
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
