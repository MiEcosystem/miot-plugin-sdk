import { Device, Service } from "../../../index";
import { DeviceEventEmitter } from "react-native";
import native from "../../../native";
import { EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY, SWITCH_DEVICE_TYPE } from "../Const";
// import mockGetSceneList from "./mock/GetSceneList";
// import mockGetSceneTCAConfigV3 from "./mock/GetSceneTCAConfigV3";
export async function apiSaveWirelessSwitchMode(switchModeSpec, value) {
  const t = {
    did: Device.deviceID,
    siid: switchModeSpec.siid,
    piid: switchModeSpec.piid,
    value
  };
  if (switchModeSpec.miid) {
    t.miid = switchModeSpec.miid;
  }
  try {
    const res = await Service.spec.setPropertiesValue([t]);
    const { code } = res[0];
    return [0, 1].includes(code);
  } catch (error) {
    console.log("apiSaveWirelessSwitchMode", error);
    return false;
  }
}
export async function apiSaveSwitchType(settings) {
  try {
    const res = await Service.smarthome.setDeviceSetting({
      did: Device.deviceID,
      settings
    });
    return true;
  } catch (error) {
    return false;
  }
}
export function getSceneTcaConfigV3(homeDataList) {
  // return Promise.resolve(mockGetSceneTCAConfigV3);
  const params = {
    app_version: 9,
    query_type: 1,
    with_spec: 1,
    limit: 10,
    status_filter: 1,
    home_data_list: [homeDataList]
  };
  return new Promise((resolve, reject) => {
    native.MIOTRPC.standardCall("/appgateway/miot/appsceneservice/AppSceneService/GetSceneTCAConfigV3", params, (ok, res) => {
      if (ok) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
}
export function loadAllScenesV2(homeID, deviceID) {
  // return Promise.resolve(mockGetSceneList.scene_info_list);
  if (!deviceID) {
    return Promise.reject("deviceID can not be null");
  }
  const params = {
    home_id: homeID,
    did: deviceID,
    app_version: 12
  };
  return new Promise((resolve, reject) => {
    native.MIOTRPC.standardCall("/appgateway/miot/appsceneservice/AppSceneService/GetSceneList", params, (ok, res) => {
      if (ok && res?.scene_info_list) {
        resolve(res.scene_info_list);
      } else {
        reject(res);
      }
    });
  });
}