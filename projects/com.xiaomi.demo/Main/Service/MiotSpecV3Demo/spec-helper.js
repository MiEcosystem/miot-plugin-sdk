import { DeviceEventEmitter } from 'react-native';
import { Device, Service, DeviceEvent } from 'miot';

let CachedSpecValues = {};

let AllReadSpecs = [];
let AllNotifySpecs = [];

function log(...rest) {
  console.log(...rest);
}

const CODES = {
  success(code) {
    return code >= 0;
  },

  handling(code) {
    return code === 1;
  },

  error(code) {
    return !CODES.success(code) && !CODES.handling(code);
  }
};

export const SubTypes = ['properties', 'actions', 'events'];
export const SubTypesShort = ['prop', 'action', 'event'];
export const SubIidKeys = ['piid', 'aiid', 'eiid'];

const listeners = [];
let listenerReceivedMessage = null;

function getSpecType({ eiid, aiid }) {
  return eiid ? 'event' : aiid ? 'action' : 'prop';
}

function getSpecNotifyKey({ miid, siid, eiid, aiid, piid }) {
  return getSpecKey({ miid, siid, eiid, aiid, piid });
}

export function getSpecKey({ miid, siid, eiid, aiid, piid }) {
  const type = getSpecType({ eiid, aiid, piid });
  return miid ? `${ type }.${ miid }.${ siid }.${ eiid || aiid || piid }` : `${ type }.${ siid }.${ eiid || aiid || piid }`;
}

export function getSpecEventkey({ miid, siid, eiid, aiid, piid }) {
  const type = getSpecType({ eiid, aiid, piid });
  return miid ? `specValueChanged.${ type }.${ miid }.${ siid }.${ eiid || aiid || piid }` : `specValueChanged.${ type }.${ siid }.${ eiid || aiid || piid }`;
}

export function listen(spec, fn = log) {
  if (!spec || typeof fn !== 'function') {
    return;
  }
  const specKey = getSpecKey(spec);
  const specEkey = getSpecEventkey(spec);
  const value = CachedSpecValues[specKey];
  if (value !== undefined && value !== null) {
    fn(value);
  }
  return DeviceEventEmitter.addListener(specEkey, fn);
}

function updateCachedSpecValues(pvs) {
  console.log('updateCachedSpecValues', pvs);
  if (!pvs || !pvs.length) {
    return;
  }
  pvs.forEach((pv) => {
    const { miid, siid, piid, eiid, code, value } = pv || { code: -999 };
    if (!CODES.success(code)) {
      return;
    }
    const copyPv = {
      miid,
      siid,
      [eiid ? 'eiid' : 'piid']: eiid || piid,
      type: eiid ? SubTypesShort[2] : SubTypesShort[0]
    };
    const specKey = getSpecKey(copyPv);
    const specEkey = getSpecEventkey(copyPv);
    const cachedValue = CachedSpecValues[specKey] ? CachedSpecValues[specKey].value : null;
    if (
      cachedValue === undefined ||
      cachedValue === null ||
      (cachedValue !== value)
    ) {
      CachedSpecValues[specKey] = value;
      DeviceEventEmitter.emit(specEkey, value);
    }
  });
}

function getRemoteSpecValues(specs) {
  if (!specs || !specs.length) {
    return;
  }
  Service.spec.getPropertiesValue(specs).then((res) => {
    console.log('getRemoteSpecValues:success', specs, res);
    updateCachedSpecValues(res);
  }).catch((e) => {
    log('getRemoteSpecValues:fail', specs, e);
  });
}

function subscribeRemoteSpecValues(specs) {
  if (!listenerReceivedMessage) {
    listenerReceivedMessage = DeviceEvent.deviceReceivedMessages.addListener((device, message, data) => {
      console.log(device, message, data);
      if (device.deviceID !== Device.deviceID) {
        return;
      }
      const pvs = [];
      for (let [key, value] of message) {
        console.log('listenerReceivedMessage', key, value);
        let [type, miid, siid, iid] = key.split('.');
        if (!iid) {
          iid = siid;
          siid = miid;
          miid = undefined;
        }
        pvs.push(iid ? {
          code: 0,
          miid: parseInt(miid || 0, 10),
          siid: parseInt(siid || 0, 10),
          [type === 'event' ? 'eiid' : type === 'action' ? 'aiid' : 'piid']: parseInt(iid || 0, 10),
          value: value[0],
          did: Device.deviceID
        } : null);
      }
      updateCachedSpecValues(pvs);
    });
  }
  Device.getDeviceWifi().subscribeMessages(...specs).then((listener) => {
    listeners.push(listener);
    console.log('subscribeRemoteSpecValues:success', specs);
  }).catch((e) => {
    log('subscribeRemoteSpecValues:fail', specs, e);
  });
}

export function setSpecValue(spec, value) {
  if (!spec.access || !spec.access.includes('write')) {
    return;
  }
  const param = {
    did: Device.deviceID,
    value
  };
  if (spec.miid) {
    param.miid = spec.miid;
  }
  if (spec.siid) {
    param.siid = spec.siid;
  }
  if (spec.piid) {
    param.piid = spec.piid;
  }
  if (!param.siid || !param.piid) {
    return;
  }
  Service.spec.setPropertiesValue([param]).then((res) => {
    console.log('setSpecValue:success', param, res);
    updateCachedSpecValues([{
      ...(res[0] || {}),
      ...param
    }]);
  }).catch(log);
}

export function triggerSpecAction(spec, ins) {
  const param = {
    did: Device.deviceID,
    in: ins || []
  };
  if (spec.miid) {
    param.miid = spec.miid;
  }
  if (spec.siid) {
    param.siid = spec.siid;
  }
  if (spec.aiid) {
    param.aiid = spec.aiid;
  }
  if (!param.siid || !param.aiid) {
    return;
  }
  Service.spec.doAction(param).then((res) => {
    console.log('triggerSpecAction', res);
  }).catch(log);
}

export function init(instance) {
  if (!instance || (!instance.modules || !instance.modules.length)) {
    return;
  }
  instance.modules.forEach((module) => {
    const miid = module.iid;
    (module.services || []).forEach((service) => {
      const siid = service.iid;
      (service.properties || []).forEach(({ iid, access }) => {
        if (access.includes('read')) {
          AllReadSpecs.push({
            miid,
            siid,
            piid: iid,
            did: Device.deviceID
          });
        }
        if (access.includes('notify')) {
          AllNotifySpecs.push(getSpecNotifyKey({ miid, siid, piid: iid }));
        }
      });
      (service.events || []).forEach(({ iid }) => {
        AllNotifySpecs.push(getSpecNotifyKey({ miid, siid, eiid: iid }));
      });
    });
  });
  if (AllReadSpecs.length) {
    getRemoteSpecValues(AllReadSpecs);
  }
  if (AllNotifySpecs.length) {
    subscribeRemoteSpecValues(AllNotifySpecs);
  }
}

export function deinit() {
  while (listeners.length) {
    let listener = listeners.pop();
    listener && listener.remove && listener.remove();
  }
  Device.getDeviceWifi().unlistenMessages(...AllNotifySpecs);

  CachedSpecValues = {};
  AllReadSpecs = [];
  AllNotifySpecs = [];

  listenerReceivedMessage && listenerReceivedMessage.remove && listenerReceivedMessage.remove();
  listenerReceivedMessage = null;
}
