import App from "./Main";
import Simple from './Main/Simple'
import { Package, Entrance } from "miot"; 

switch (Package.entrance) {
    case Entrance.Scene:
        Package.entry(Simple, _ => {
        });
        break;
    default:
        Package.entry(App, _ => {
        });
        break;
}
