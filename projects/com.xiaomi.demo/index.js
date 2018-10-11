import App from "./Main";
import SceneMain from './Main/SceneMain'
import { Package, Entrance } from "miot";

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
