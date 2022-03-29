import { useState, useEffect } from 'react';
import { Service, Device, Host, Package } from 'miot';
function getSplitInfo() {
  return Service.callSmartHomeAPI('/v2/home/device_support_split', {
    dids: [Device.deviceID]
  }).then((res) => {
    return res?.supports?.[Device.deviceID] || {};
  });
}
function setSplitInfo(split) {
  const did = Device.deviceID;
  const parentId = Device.extraObj?.split?.parentId;
  const targetDid = (!split && parentId) ? parentId : did;
  Service.smarthome.reportMJFStatLog('multiple_switch_ck', {
    type: split ? 1 : 0
  });
  return Service.callSmartHomeAPI('/v2/home/device_split_merge', {
    did: targetDid,
    pattern: split ? 'split' : 'merge'
  }).then(() => {
    Host.notifyMultikeyStateChanged({
      did: targetDid,
      splitFlag: split ? 1 : 0
    });
    Package.exit();
  }).catch((error) => {
    Service.smarthome.reportLog(Device.model, `Service.smarthome.device_split_merge error: ${ split ? 'split' : 'merge' } failed`);
    Service.smarthome.reportLog(Device.model, `Service.smarthome.device_split_merge error: ${ JSON.stringify(error) }`);
  });
}
export default function useMultiKeySplitInfo() {
  const [info, setInfo] = useState({
    count: 0,
    split: false
  });
  function setSplit(split) {
    setSplitInfo(split).then(() => {
      setInfo({
        ...info,
        split
      });
    }).catch(() => {});
  }
  useEffect(() => {
    getSplitInfo().then((res) => {
      const parentId = Device.extraObj?.split?.parentId;
      const isSubDevice = !!parentId;
      const keyNum = res?.keyNum || 0;
      const count = keyNum > 0 ? keyNum : 0;
      const split = isSubDevice ? true : (res?.splitFlag === 1);
      setInfo({
        count,
        split
      });
    }).catch(() => {});
  }, []);
  return [info, setSplit];
}