import { useState } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import useDeepCompareEffect from './useDeepCompareEffect';
export default function useSwitchLightDeviceList(devices = []) {
  const [toggleLightList, setToggleLightList] = useState([]);
  const fetchToggleLightList = () => {
    if (devices?.length) {
      Promise.all(devices.map((device) => {
        if ([
          'mijia.light.group1',
          'mijia.light.group2',
          'mijia.light.group3',
          'mijia.light.group4',
          'mijia.light.group5'
        ].includes(device.model)) {
          return Service.spec.getSpecByKey(device.did, {
            skey: 'light-scene',
            akey: 'toggle'
          });
        }
        return Service.spec.getSpecByKey(device.did, {
          skey: 'light',
          akey: 'toggle'
        });
      })).then((res) => {
        // console.log('fetchToggleLightList----res', JSON.stringify(res));
        const supportToggleDevices = [];
        for (let index = 0; index < res.length; index++) {
          const spec = res[index]?.[0];
          if (spec) {
            const filterDevice = devices[index];
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
                  value: {
                    aiid: spec.aiid,
                    in: [],
                    siid: spec.siid
                  }
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