import { useState } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import useDeepCompareEffect from './useDeepCompareEffect';
const lightSpecialTriggerType = {
  'yeelink.light.mbulb3': {
    skey: 'yeelight-scene',
    pkey: 'toggle'
  },
  'yeelink.light.light3': {
    skey: 'yeelight-scene',
    pkey: 'toggle'
  },
  'mijia.light.group5': {
    skey: 'light-scene',
    akey: 'toggle'
  },
  'mijia.light.group4': {
    skey: 'light-scene',
    akey: 'toggle'
  },
  'mijia.light.group3': {
    skey: 'light-scene',
    akey: 'toggle'
  },
  'mijia.light.group2': {
    skey: 'light-scene',
    akey: 'toggle'
  },
  'mijia.light.group1': {
    skey: 'light-scene',
    akey: 'toggle'
  },
  'yeelink.light.spot2': {
    skey: 'light-scene',
    pkey: 'toggle-scene'
  },
  'yeelink.light.ml8': {
    skey: 'light-scene',
    pkey: 'toggle-scene'
  },
  'yeelink.light.ml7': {
    skey: 'light-scene',
    pkey: 'toggle-scene'
  },
  'yeelink.light.ml6': {
    skey: 'light-scene',
    pkey: 'toggle-scene'
  }
};
export default function useSwitchLightDeviceList(devices = []) {
  const [toggleLightList, setToggleLightList] = useState([]);
  const fetchToggleLightList = () => {
    if (devices?.length) {
      Promise.all(devices.map((device) => {
        let params = {
          skey: 'light',
          akey: 'toggle'
        };
        if (lightSpecialTriggerType[device.model]) {
          params = lightSpecialTriggerType[device.model];
        }
        return Service.spec.getSpecByKey(device.did, params);
      })).then((res) => {
        // console.log('fetchToggleLightList----res', JSON.stringify(res));
        const supportToggleDevices = [];
        for (let index = 0; index < res.length; index++) {
          const spec = res[index]?.[0];
          if (spec) {
            const { siid, piid, aiid } = spec;
            const filterDevice = devices[index];
            const payload_jsonValue = {
              in: [],
              siid,
              piid,
              aiid
            };
            supportToggleDevices.push({
              ...filterDevice,
              action: {
                sa_id: 15172,
                // sa_id: 1,
                from: 1,
                group_id: 0,
                id: 15172,
                order: 1,
                type: 0,
                name: filterDevice.deviceName,
                payload: '',
                payload_json: {
                  command: 'action',
                  delay_time: 0,
                  device_name: filterDevice.deviceName,
                  did: filterDevice.did,
                  model: filterDevice.model,
                  value: payload_jsonValue
                },
                protocol_type: 2
              }
            });
          }
        }
        //
        // console.log('fetchToggleLightList---supportToggleDevices-1111111', JSON.stringify(supportToggleDevices));
        setToggleLightList(supportToggleDevices);
      });
    }
  };
  useDeepCompareEffect(() => {
    fetchToggleLightList();
    const listener = PackageEvent.packageViewWillAppear.addListener(() => {
      fetchToggleLightList();
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, [devices]);
  return toggleLightList;
}