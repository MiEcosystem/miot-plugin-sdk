import App from "./Main";
// import App from './Main/Simple'
import { Package, Entrance } from "miot";
import SceneMain from "../com.zimi.clock/Main/SceneMain";


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
