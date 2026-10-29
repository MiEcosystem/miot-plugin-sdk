import { useState, useEffect } from "react";
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import { DeviceEventEmitter } from 'react-native';
const cachedDeviceSettings = {};
function getDeviceSettingsCacheKey(key) {
  return `${ Service.account.ID }-${ Device.deviceID }-${ key }`;
}
export default function useDeviceSettings(key, settings, eventEmitter) {
  const [userSettings, setUserSettings] = useState(cachedDeviceSettings[getDeviceSettingsCacheKey(key)] || {});
  useEffect(() => {
    Service.smarthome.getDeviceSettingV2({
      did: Device.deviceID,
      settings: settings
    }).then((res) => {
      const result = res?.result?.settings || {};
      // console.log('getDeviceSettingV2--res', res);
      Service.smarthome.reportLog(Device.model, `[miot.plugin.spec, ${ new Date() }, Get switchTypeSettings: ]${ JSON.stringify({ result }) }`);
      setUserSettings(result);
      cachedDeviceSettings[getDeviceSettingsCacheKey(key)] = result;
    }).catch((e) => {
      console.log('getDeviceSettingV2--e', e);
    });
    
    let listener = DeviceEventEmitter.addListener(eventEmitter, (value) => {
      // console.log('DeviceEventEmitter--useDeviceSettings--value---通知-', value);
      const editResult = {
        ...useDeviceSettings,
        ...value
      };
      cachedDeviceSettings[getDeviceSettingsCacheKey(key)] = editResult;
      setUserSettings(editResult);
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return userSettings;
}