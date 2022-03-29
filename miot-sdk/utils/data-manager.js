import { DeviceEventEmitter } from 'react-native';
import { Service, Device, DeviceEvent } from 'miot';
const SpecKeyEventPrefix = '__MiotDataManagerEvent__';
const Cached = {};
const DataSources = {
  fromOther: 'fromOther',
  fromEvent: 'fromEvent',
  fromSet: 'fromSet',
  fromReset: 'fromReset'
};
const ListenedSpecKeys = {};
let MessageListener = null;
function isValidSpec(spec) {
  const { siid, piid, eiid } = spec || {};
  return siid && (piid || eiid);
}
export function getSpecKey({ siid, piid, eiid }, prefix) {
  const key = `${ piid ? 'prop' : eiid ? 'event' : 'unknown' }.${ siid }.${ piid || eiid }`;
  return prefix ? `${ prefix }.${ key }` : key;
}
function getSpecEventKey(spec) {
  return getSpecKey(spec, SpecKeyEventPrefix);
}
function decodeSpecKey(key) {
  const [type, siid, iid] = key.split('.');
  return {
    siid: parseInt(siid, 10),
    [type === 'prop' ? 'piid' : 'eiid']: parseInt(iid, 10)
  };
}
export function listen(spec, fn) {
  if (!isValidSpec(spec) || !(fn instanceof Function)) {
    return;
  }
  const cached = getPropFromCache(spec);
  if (cached) {
    fn({ ...spec, value: cached.value });
  }
  const l1 = tryGetAndSubscribe(spec, !cached);
  const l2 = DeviceEventEmitter.addListener(getSpecEventKey(spec), fn);
  return {
    remove() {
      l1 && l1.remove && l1.remove();
      l2 && l2.remove && l2.remove();
    }
  };
}
export function setProps(specs = []) {
  const did = Device.deviceID;
  const targetSpecs = specs.filter(isValidSpec).map((spec) => {
    return { ...spec, did };
  });
  targetSpecs.forEach((spec) => {
    updateCache({
      ...spec,
      dataSource: DataSources.fromSet
    });
  });
  return Service.spec.setPropertiesValue(targetSpecs).then((vs) => {
    let hasError = !vs || (vs.length < targetSpecs.length);
    targetSpecs.forEach((spec) => {
      const key = getSpecKey(spec);
      const v = vs.find((v) => getSpecKey(v) === key) || {};
      if ([0, 1].includes(v.code)) { return; }
      hasError = true;
      updateCache({
        ...spec,
        dataSource: DataSources.fromReset
      });
    });
    return hasError ? Promise.reject() : Promise.resolve();
  });
}
function tryGetAndSubscribe(spec, needGet) {
  if (!isValidSpec(spec)) { return; }
  // get, 如果已有缓存结果，说明调过接口，不需要再调用
  if (spec.piid && needGet) {
    getPropsFromCloud([spec]);
  }
  const key = getSpecKey(spec);
  // 如果已经监听过，就不需要再重复监听
  // 但是为了在取消监听时判断是否真的要取消监听，用计数来判断
  if (ListenedSpecKeys[key] && ListenedSpecKeys[key].count) {
    ListenedSpecKeys[key].count += 1;
    return getListener(spec);
  }
  // 如果没监听过，就监听
  ListenedSpecKeys[key] = {
    count: 1,
    listener: subscribePropsFromCloud([spec])
  };
  return getListener(spec);
}
function getListener(spec) {
  return {
    remove() {
      const key = getSpecKey(spec);
      const listenedKey = ListenedSpecKeys[key] || {};
      if (listenedKey.count <= 0) { return; }
      listenedKey.count -= 1;
      if (listenedKey.listener) {
        listenedKey.listener().then((l) => {
          l && l.remove && l.remove();
        }).catch(() => {});
      }
    }
  };
}
function getPropsFromCloud(specs) {
  const did = Device.deviceID;
  Service.spec.getPropertiesValue(specs.map((spec) => {
    return { ...spec, did };
  })).then((vs) => {
    vs.forEach(updateCache);
  }).catch(() => {});
}
function updateCache(v) {
  if (!isValidSpec(v)) { return; }
  const {
    dataSource = DataSources.fromOther,
    updateTime, eventTime, value
  } = v;
  const key = getSpecKey(v);
  const ekey = getSpecEventKey(v);
  const cached = Cached[key];
  let hasChanged = false;
  let emitValue = undefined;
  // 新数据
  if (!cached) {
    Cached[key] = {
      ...v,
      dataSource
    };
    hasChanged = true;
    emitValue = value;
    DeviceEventEmitter.emit(ekey, { ...Cached[key], value: emitValue });
    return;
  }
  // 上报的数据
  if (dataSource === DataSources.fromEvent && eventTime <= (cached.updateTime || 0)) {
    return;
  }
  hasChanged = value !== cached.value;
  if (dataSource === DataSources.fromEvent) {
    cached.updateTime = eventTime;
    cached.value = value;
    emitValue = value;
  }
  // set 的数据
  if (dataSource === DataSources.fromSet) {
    emitValue = value;
  }
  // reset 的数据
  if (dataSource === DataSources.fromReset) {
    if (cached.lastDataSource === DataSources.fromSet) {
      emitValue = cached.value;
    }
  }
  // 其他
  if (dataSource === DataSources.fromOther) {
    if (updateTime > (cached.updateTime || 0)) {
      cached.updateTime = updateTime;
      cached.value = value;
      emitValue = value;
      hasChanged = true;
    }
  }
  cached.lastDataSource = dataSource;
  if (hasChanged) {
    DeviceEventEmitter.emit(ekey, { ...cached, value: emitValue });
  }
  return;
}
function subscribePropsFromCloud(specs) {
  if (!MessageListener) {
    MessageListener = DeviceEvent.deviceReceivedMessages.addListener((device, messages, originData) => {
      if (!device || device.deviceID !== Device.deviceID || !messages) {
        return;
      }
      (originData || []).forEach(({ key, time, value }) => {
        const spec = decodeSpecKey(key);
        updateCache({
          ...spec,
          eventTime: time,
          value: value[0],
          dataSource: DataSources.fromEvent
        });
      });
    });
  }
  return Device.getDeviceWifi().listenMessages(...specs.map(getSpecKey));
}
function getPropFromCache(spec) {
  return Cached[getSpecKey(spec)];
}