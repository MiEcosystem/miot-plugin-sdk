import { Package, Entrance } from "miot";
import MainPage from "./Main/MainPage";

switch (Package.entrance) {
    case Entrance.Scene:
        break;
    default:
        Package.entry(MainPage, _ => {
        });
        break;
}
