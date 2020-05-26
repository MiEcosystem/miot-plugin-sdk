import { Entrance, Package } from "miot";
import MainPage from "./Main/index";

Package.BLEAutoCheckUpgradeOptions = {
  enable: true,
  redPoint: true,
  alertDialog: true,
  authType: 5
};

switch (Package.entrance) {
  case Entrance.Scene:
    break;
  default:
    Package.entry(MainPage, (_) => {
    });
    break;
}
