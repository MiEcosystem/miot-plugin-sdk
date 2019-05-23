import { Entrance, Package } from "miot";
import MainPage from "./Main/index";

switch (Package.entrance) {
    case Entrance.Scene:
        break;
    default:
        Package.entry(MainPage, _ => {
        });
        break;
}
