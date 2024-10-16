import { useState } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import useDeepCompareEffect from './useDeepCompareEffect';
function arrayGroup(array, size) {
  if (array?.length > size) {
    const group = [];
    for (let index = 0; index < array.length; index = index + size) {
      group.push(array.slice(index, index + size));
    }
    return group;
  }
  return [array];
}
export default function useSwitchLightDeviceList(devices = []) {
  const [toggleLightList, setToggleLightList] = useState([]);
  const generateSwitchDevice = (devices, devicesSpecs, devicesInfo) => {
    const supportToggleDevices = [];
    for (let index = 0; index < devicesSpecs.length; index++) {
      const specs = devicesSpecs[index];
      const deviceInfo = devicesInfo[index];
      if (specs.length) {
        // 设备
        const filterDevice = devices[index];
        // specs
        const spiltButtons = specs.map((spec, specIndex) => {
          const memberInfo = deviceInfo?.member_ship?.[`${ specIndex + 1 }`];
          return {
            ...filterDevice,
            action: {
              group_id: 0,
              order: 1,
              id: 36019,
              type: 0,
              name: memberInfo?.name || filterDevice?.deviceName,
              // payload: '',
              payload_json: {
                command: 'action',
                delay_time: 0,
                device_name: filterDevice?.deviceName,
                did: filterDevice.did,
                model: filterDevice.model,
                value: {
                  aiid: spec.aiid,
                  in: [],
                  siid: spec.siid
                }
              },
              sa_id: 36019,
              from: 1
              // device_group_id: 0
            },
            ...(memberInfo?.room_id ? { 
              roomId: memberInfo?.room_id,
              deviceName: specs.length > 1 ? `${ memberInfo?.name }-${ filterDevice?.deviceName }` : memberInfo?.name,
              memberId: specIndex
            } : {
              memberId: specIndex
            })
          };
        });
        supportToggleDevices.push(...spiltButtons);
      }
    }
    return supportToggleDevices;
  };
  const fetchToggleLightList = () => {
    if (devices?.length) {
      Promise.all(devices.map((device) => {
        return Service.spec.getSpecByKey(device.did, {
          skey: 'switch',
          akey: 'toggle'
        });
      })).then((specs) => {
        // console.log('fetchToggleLightList----res', JSON.stringify(specs));
        
        Promise.all(arrayGroup(devices, 50).map((group) => {
          return Service.callSmartHomeAPI('/device/deviceinfo', { get_sub_relation: true, dids: group.map((device) => {
            return device.did;
          }) }).then((deviceInfo) => {
            // console.log('getSwitchInfo--res', JSON.stringify(deviceInfo));
            return deviceInfo;
          }).catch((error) => {
            console.log('获取按键信息报错---/device/deviceinfo---error', error);
            return [];
          });
        })).then((deviceInfos) => {
          const deviceInfo = deviceInfos.reduce((p, c) => {
            return p.concat(c?.list || []);
          }, []);
          // console.log('getSwitchInfo--res', JSON.stringify(deviceInfo));
          // console.log('getSwitchInfo--length', deviceInfo?.length, 'devices----', devices.length);
          const supportToggleDevices = generateSwitchDevice(devices, specs, deviceInfo || []);
          // console.log('获取按键设备组合---', JSON.stringify(supportToggleDevices));
          setToggleLightList(supportToggleDevices);
        });
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