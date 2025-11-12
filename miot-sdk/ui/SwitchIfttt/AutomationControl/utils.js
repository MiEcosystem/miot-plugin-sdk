import { Device, Service } from "../../../index";
import { DeviceEventEmitter } from "react-native";
import { EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY, SWITCH_DEVICE_TYPE } from "../Const";
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
    return ![0, 1].includes(code);
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