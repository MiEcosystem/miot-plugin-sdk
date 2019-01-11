import App from "./Main";
import SceneMain from './Main/SceneMain'
import { Package, Entrance, PackageEvent } from "miot";

PackageEvent.packageAuthorizationCancel.addListener(()=>{
    console.log("packageAuthorizationCancel");
    Package.exit();
})

switch (Package.entrance) {
    case Entrance.Scene:
        Package.entry(SceneMain, _ => {
        });
        break;
    default:
        Package.entry(App, _ => {
        });
        break;
}
