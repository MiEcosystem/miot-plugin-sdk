import { Dimensions, Platform, NativeModules } from 'react-native';
import { Resources, Device, Host, Service } from 'miot';
import I18n from './i18n';
import getPercent from './getPercent';

const StatusBarManager = NativeModules.StatusBarManager;

const window = Dimensions.get('window');
const isIos = Platform.OS === 'ios';

// const isMix3 = Host.systemInfo.mobileModel === 'MIX 3';
// console.log(Host.systemInfo)

export const DeviceID = Device.deviceID;
export const PROTOCOLCACHEKEY = `PROTOCOLCACHE:${ DeviceID }`;
export const INSTANCECACHEKEY = `INSTANCECACHE:${ DeviceID }`;
export const REVERSECACHEKEY = `REVERSECACHE:${ DeviceID }`;

export const SwitchKey = 'motor-control';
export const CurrentPositionKey = 'target-position';
export const TargetPositionKey = 'target-position';
export const ReverseKey = 'motor-reverse';

// i18n
Resources.registerStrings(I18n);
export const LocalizedString = Resources.strings;

export const WIDTH = window.width;
// export const HEIGHT = window.height + (isMix3 ? 48 : 0);
let theHeight = window.height;
if (!isIos) {
  Host.getPhoneScreenInfo().then((res) => {
    theHeight = res.viewHeight;
  }).catch();
}
export function HEIGHT() {
  if (theHeight) {
    return theHeight;
  }
}
export const isIphoneX = isIos && WIDTH === 375 && HEIGHT === 812;
export const shadowUpperMinRatio = 0;
export const shadowUpperMaxRatio = 1 - 55 * 2 / 360;
export const shadowLowerMinRatio = 0;
export const shadowLowerMaxRatio = 3;
export const curtainBgSplitRatio = 915 / 1100;
export const curtainBgWidth = WIDTH;
export const curtainBgHeight = WIDTH / 1080 * 1100;
export const curtainBaseWidth = 23 / 360 * WIDTH;
export const curtainBaseHeight = 300 / 360 * WIDTH;
export const curtainWidth = 15 / 360 * WIDTH;
export const curtainHeight = 300 / 360 * WIDTH;
export const curtainTop = 2 / 360 * WIDTH;
export const buttonWidth = 45 / 360 * WIDTH;
export const buttonHeight = buttonWidth;
export const buttonTop = curtainBgHeight * curtainBgSplitRatio * 0.4 - buttonHeight / 2;
// export const splitY = (curtainBgHeight + 20 + 44 + (isIphoneX ? 44 : 0)) / HEIGHT;
export function splitY() {
  return (curtainBgHeight + 20 + 44 + (isIphoneX ? 44 : 0)) / HEIGHT();
}

export const darkColorStart1 = '#4048EF';
export const darkColorEnd1 = '#5A7BEF';
export const darkColorStart2 = '#6083FF';
export const darkColorEnd2 = '#60BBFF';
export const lightColorStart = '#6083FF';
export const lightColorEnd = '#AADBFF';

export function fixNum(n) {
  if (!n) {
    return '00';
  }
  if (String(n).length < 2) {
    return `0${ n }`;
  }
  return n;
}

export function getColorBetween(value, color1, color2) {
  let reg = /\#[1-9a-f]/i;
  if (!reg.test(color1) || !reg.test(color2)) {
    return color1;
  }
  let rgb1 = [color1.slice(1, 3), color1.slice(3, 5), color1.slice(5)];
  let rgb2 = [color2.slice(1, 3), color2.slice(3, 5), color2.slice(5)];
  let r = fixNum(Math.round(getPercent(value, 0, 100, parseInt(`0x${ rgb1[0] }`, 16), parseInt(`0x${ rgb2[0] }`, 16))).toString(16));
  let g = fixNum(Math.round(getPercent(value, 0, 100, parseInt(`0x${ rgb1[1] }`, 16), parseInt(`0x${ rgb2[1] }`, 16))).toString(16));
  let b = fixNum(Math.round(getPercent(value, 0, 100, parseInt(`0x${ rgb1[2] }`, 16), parseInt(`0x${ rgb2[2] }`, 16))).toString(16));
  let ret = `#${ r }${ g }${ b }`;
  return ret;
}

export function formatTimerTime(time) {
  if (!time) {
    return false;
  }
  let ts = time.split(/\s+/);
  let now = new Date();
  let y = now.getFullYear();
  let m = ts[3] - 1;
  let d = ts[2] - 0;
  let h = ts[1] - 0;
  let i = ts[0] - 0;
  return new Date(y, m, d, h, i, 0);
}

export function getSafeExtraHeight() {
  return new Promise((resolve, reject) => {
    if (getSafeExtraHeight.result) {
      resolve(getSafeExtraHeight.result);
      return;
    }
    if (!isIos) {
      getSafeExtraHeight.result = {
        top: StatusBarManager.HEIGHT + 44,
        bottom: 0
      };
      resolve(getSafeExtraHeight.result);
      return;
    }
    StatusBarManager.getHeight((res) => {
      getSafeExtraHeight.result = {
        top: 44 + res.height,
        bottom: isIphoneX ? 34 : 0
      };
      resolve(getSafeExtraHeight.result);
    });
  });
}

export function getCurtainTop() {
  return new Promise((resolve, reject) => {
    getSafeExtraHeight().then((res) => {
      resolve(splitY() * HEIGHT() - curtainBgSplitRatio * curtainBgHeight - (res.top || 0));
    });
  });
}

export function getPropByInstanceAndIids(instance, iids) {
  if (!instance || !instance.services || !iids || !iids.siid || !iids.piid) {
    return;
  }
  let { siid, piid } = iids;
  let service = instance.services.find((s) => {
    return s.iid === siid;
  });
  if (!service) {
    return;
  }
  let prop = service.properties.find((p) => {
    return p.iid === piid;
  });
  return prop;
}

export function getInstanceFromCache(cb) {
  Host.storage.get(INSTANCECACHEKEY).then((instance) => {
    if (typeof instance === 'string') {
      instance = JSON.parse(instance);
    }
    cb(instance);
  }).catch((err) => {
    cb();
  });
}

export function getInstanceFromNet(cb) {
  Service.spec.getSpecString(DeviceID).then((instance) => {
    // console.log(instance)
    if (typeof instance === 'string') {
      instance = JSON.parse(instance);
    }
    Host.storage.set(INSTANCECACHEKEY, instance, {
      // 缓存30天
      expire: 3600 * 24 * 30
    });
    cb(instance);
  }).catch((err) => {
    // console.log(err)
    cb();
  });
}

export function getDefinitionWithKeyFromInstance(instance, ...keys) {
  // console.log(instance);
  let ret = {};
  if (!keys || !keys.length) {
    return ret;
  }
  let needFound = keys.length;
  // for(let service of instance.services.values()) {
  for (let i = 0, ls = instance.services.length; i < ls; i++) {
    let service = instance.services[i];
    let props = service.properties;
    // for(let prop of props.values()) {
    for (let n = 0, lp = props.length; n < lp; n++) {
      let prop = props[n];
      let key = prop.type.split(':')[3];
      if (keys.indexOf(key) !== -1) {
        if (!ret[key]) {
          needFound -= 1;
        }
        ret[key] = {
          ...prop,
          siid: service.iid,
          piid: prop.iid
        };
      }
      if (!needFound) {
        return ret;
      }
    }
  }
  return ret;
}
