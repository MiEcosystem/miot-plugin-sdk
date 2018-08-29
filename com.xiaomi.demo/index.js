import App from "./Main";
// import App from './Main/Simple'
import { Package } from "miot";
import {
  AppRegistry
} from "react-native";

// AppRegistry.registerComponent("com.xiaomi.demo", () => App);
Package.entry(App);
