import { useState, useEffect } from "react";
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import { DeviceEventEmitter } from 'react-native';
const cachedThirdUserConfigs = {};
export default function useThirdUserConfigs(key, model = Device.model, eventEmitter) {
  const [userConfigs, setUserConfigs] = useState(cachedThirdUserConfigs[`${ key }`] || {});
  useEffect(() => {
    Service.storage.getThirdUserConfigsForOneKey(model, key).then((res) => {
      // console.log('getThirdUserConfigsForOneKey--res----8888', res);
      const configs = res?.data ? JSON.parse(res?.data) : {};
      setUserConfigs(configs);
      cachedThirdUserConfigs[`${ key }`] = configs;
    }).catch((error) => {
      console.log('getThirdUserConfigsForOneKey---/device/deviceinfo---error', error);
    });
    let listener = DeviceEventEmitter.addListener(eventEmitter, (value) => {
      console.log('DeviceEventEmitter--useThirdUserConfigs--value---通知-', value);
      // console.log('DeviceEventEmitter--userConfigs--userConfigs---通知-', userConfigs);
      const configs = {
        ...userConfigs,
        ...(value || {})
      };
      setUserConfigs(configs);
      cachedThirdUserConfigs[`${ key }`] = configs;
      // {"1":{"ai_desc":"","home_id":1,"id":1,"name":"","icon":"","room_id":1},"2":{"ai_desc":"","home_id":1,"id":2,"name":"","icon":"","room_id":1}}
      // setSwitchInfo(value);
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return userConfigs;
}