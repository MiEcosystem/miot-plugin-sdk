import { Device, Service } from "../../../index";
import { DeviceEventEmitter } from "react-native";
import native from "../../../native";
import { EMITTER_MIOT_SWITCH_DEVICE_SETTING_TYPE_KEY, SWITCH_DEVICE_TYPE } from "../Const";
import { strings as I18n } from "../../../resources";
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
      if (ok) {
        resolve(res?.scene_info_list || []);
      } else {
        reject(res);
      }
    });
  });
}
function byteStringLength(str) {
  if (str) {
    return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
  }
  return 0;
}
function charInvalidString(str) {
  if (!str) {
    return false;
  }
  const pattern = new RegExp('[!$^*{}<>?\\[\\]=|]');
  if (pattern.test(str)) {
    return true;
  }
  if (str.indexOf('--') !== -1) {
    return true;
  }
  if (str.indexOf('\\') !== -1) {
    return true;
  }
  return false;
}
function isEmojiCodePoint(codePoint) {
  // Core emoji ranges + modern extensions.
  if ((codePoint >= 0x1F300 && codePoint <= 0x1F5FF)
    || (codePoint >= 0x1F600 && codePoint <= 0x1F64F)
    || (codePoint >= 0x1F680 && codePoint <= 0x1F6FF)
    || (codePoint >= 0x1F700 && codePoint <= 0x1F77F)
    || (codePoint >= 0x1F780 && codePoint <= 0x1F7FF)
    || (codePoint >= 0x1F800 && codePoint <= 0x1F8FF)
    || (codePoint >= 0x1F900 && codePoint <= 0x1F9FF)
    || (codePoint >= 0x1FA70 && codePoint <= 0x1FAFF)
    || (codePoint >= 0x1F1E6 && codePoint <= 0x1F1FF)
    || (codePoint >= 0x2600 && codePoint <= 0x26FF)
    || (codePoint >= 0x2700 && codePoint <= 0x27BF)
    || (codePoint >= 0x2B05 && codePoint <= 0x2B07)
    || (codePoint >= 0x2934 && codePoint <= 0x2935)
    || codePoint === 0x2B50
    || codePoint === 0x2B1B
    || codePoint === 0x2B1C
    || codePoint === 0x231A
    || codePoint === 0x2B55) {
    return true;
  }
  // Emoji composition chars / keycap / variation selector / joiner.
  if (codePoint === 0x20E3 || codePoint === 0xFE0F || codePoint === 0x200D) {
    return true;
  }
  // Symbols that often present as emoji.
  if (codePoint === 0x00A9 || codePoint === 0x00AE || codePoint === 0x203C
    || codePoint === 0x2049 || codePoint === 0x2122 || codePoint === 0x2139
    || codePoint === 0x3030 || codePoint === 0x303D || codePoint === 0x3297
    || codePoint === 0x3299) {
    return true;
  }
  return false;
}
function emojiInvalidString(str) {
  if (str) {
    for (let i = 0; i < str.length; i += 1) {
      const codePoint = str.codePointAt(i);
      if (isEmojiCodePoint(codePoint)) {
        return true;
      }
      if (codePoint > 0xFFFF) {
        i += 1;
      }
    }
  }
  return false;
}
/**
 * 校验按键名称合法性
 * @param {string} name
 * @returns {{ valid: boolean, message?: string }}
 */
export function isValidName(name) {
  if (!name || name === ' ') {
    return { valid: false, message: I18n.nameIsEmpty };
  }
  if (byteStringLength(name) > 40) {
    return { valid: false, message: I18n.nameTooLong };
  }
  if (charInvalidString(name)) {
    return { valid: false, message: I18n.nameHasChars };
  }
  if (emojiInvalidString(name)) {
    return { valid: false, message: I18n.nameNotSupportEmoji };
  }
  return { valid: true };
}