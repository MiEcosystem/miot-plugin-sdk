import AndroidModules from './android';
import IosModules from './ios';
import createEventBuilder from './events';
import { DeviceEventEmitter, Platform } from 'react-native';
import utils from './utils';
import resolveAssetResource from 'miot/native/common/node/resolve';

export const Utils = utils;

// 全小写
export const IOS = "ios";
export const ANDROID = "android";

export const DEBUG = "debug";
export const RELEASE = "release";

// check
export const NativeType = (Platform.OS.toLowerCase() === 'android') ? ANDROID : IOS;
export const isAndroid = (NativeType === ANDROID);
export const isIOS = NativeType === IOS;

const nativePropertiesMap = new WeakMap();
export const EcoProperties = {
  init(target, props) {
    nativePropertiesMap.set(target, props || {});
    return target;
  },
  of(target) {
    return nativePropertiesMap.get(target) || {};
  }
};

const modules = isAndroid ? AndroidModules : IosModules;
if (modules.MIOTPackage) {
  resolveAssetResource(modules.MIOTPackage.basePath, modules.MIOTPackage.localFilePath, modules.MIOTPackage.plugPath);
}

function getSystemLanguage() {
  return "cn";
}

// 全局事件处理
const EventRandom = modules.MIOTPackage.eventRandom || "";
export const EventEmitter = {
  addListener(name, callback) {
    return DeviceEventEmitter.addListener(name + EventRandom, callback);
  },
  emit(name, ...args) {
    DeviceEventEmitter.emit(name + EventRandom, ...args);
  }
};

const onPackageInterval = { current: 0, funcs: [], timer: 0 };

const onPackageExit = { funcs: [] };
export const PackageExitAction = {
  register(funcs, binder) {
    if (!onPackageExit.funcs.includes(funcs)) {
      onPackageExit.funcs.push(funcs);
      if (binder) {
        binder(modules.LocalCache);
      }
      return true;
    }
  },
  unregister(funcs) {
    onPackageExit.funcs.forEach((f, i) => {
      if (f == funcs) {
        onPackageExit.funcs[i] = 0;
      }
    });
  },
  execute() {
    const { timer } = onPackageInterval;
    onPackageInterval.timer = 0;
    if (timer) {
      clearTimeout(timer);
    }
    onPackageInterval.funcs = [];
    onPackageInterval.current = 0;
    onPackageExit.funcs.forEach((f, i) => {
      if (f) try {
        f(modules.LocalCache);
        onPackageExit.funcs[i] = 0;
      } catch (e) {
        console.log(e);
      }
    });
    modules.LocalCache.clear();
    onPackageExit.funcs = [];
  }
};

modules.LocalCache.globalEventProfiles = {};
const eventBuilder = createEventBuilder(modules.LocalCache.globalEventProfiles, EventEmitter);
export const createEventManager = eventBuilder.createEventManager;

export const buildEvents = (def) => {
  const ret = createEventManager(def);
  Object.keys(ret).forEach((k) => {
    Utils.setReadonly(def, k, ret[k]);
  });
};

PackageExitAction.register((cache) => {
  cache.globalEventProfiles = {};
});


export default {
  ...modules, language: getSystemLanguage()
};