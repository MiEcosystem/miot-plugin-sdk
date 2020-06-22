import { Dimensions } from 'react-native';
import { Resources, Device, Host, Service } from 'miot';
import I18n from './i18n';

const window = Dimensions.get('window');
export const WIDTH = window.width;
export const HEIGHT = window.height;

// i18n
Resources.registerStrings(I18n);
export const LocalizedString = Resources.strings;

export const DeviceID = Device.deviceID;
export const INSTANCECACHEKEY = `INSTANCECACHE:${ DeviceID }`;
export const PROTOCOLCACHEKEY = `PROTOCOLCACHE:${ DeviceID }`;

export const SwitchKey = 'on';
export const BrightnessKey = 'brightness';
export const TemperatureKey = 'color-temperature';

export function NOOP() {}

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

export function fixNum(n) {
  return (`00${ n }`).slice(-2);
}

export function adjustSize(n) {
  return n / 360 * WIDTH;
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
