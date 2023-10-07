import { useState, useEffect } from "react";
import { Device, DeviceEvent, Service } from "miot";
import { DeviceEventEmitter } from 'react-native';
export default function useThirdUserConfigs(key, model = Device.model, eventEmitter) {
  const [userConfigs, setUserConfigs] = useState({});
  useEffect(() => {
    Service.storage.getThirdUserConfigsForOneKey(model, key).then((res) => {
      console.log('getThirdUserConfigsForOneKey--res----8888', res);
      setUserConfigs(res?.data ? JSON.parse(res?.data) : {});
    }).catch((error) => {
      console.log('getThirdUserConfigsForOneKey---/device/deviceinfo---error', error);
    });
    let listener = DeviceEventEmitter.addListener(eventEmitter, (value) => {
      console.log('DeviceEventEmitter--useThirdUserConfigs--value---通知-', value);
      console.log('DeviceEventEmitter--userConfigs--userConfigs---通知-', userConfigs);
      setUserConfigs(value);
      // {"1":{"ai_desc":"","home_id":1,"id":1,"name":"","icon":"","room_id":1},"2":{"ai_desc":"","home_id":1,"id":2,"name":"","icon":"","room_id":1}}
      // setSwitchInfo(value);
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return userConfigs;
}