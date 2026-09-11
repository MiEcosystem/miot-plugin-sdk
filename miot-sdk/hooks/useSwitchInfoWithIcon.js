import { useState, createContext } from "react";
import { DeviceEventEmitter } from 'react-native';
import Service from 'miot/Service';
import Device, { DeviceEvent } from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
const cachedSwitchInfo = {};
const ctx = createContext();
export default function useSwitchInfoWithIcon(did = Device.deviceID) {
  const [switchInfo, setSwitchInfo] = useState(cachedSwitchInfo[did] || {});
  const editSwitchInfo = (memberId, member) => {
    return new Promise((resolve, reject) => {
      const editInfo = {
        ...switchInfo,
        [`${ memberId + 1 }`]: member
      };
      Service.callSmartHomeAPI('/v2/device/update_membership', {
        did,
        update_fields: [{
          id: memberId + 1,
          field: member
        }]
      }).then((res) => {
        DeviceEventEmitter.emit('EditSwitchInfo_DeviceEventEmitter', editInfo);
        resolve(res);
      }).catch((err) => {
        reject(err);
        console.log('switch-update_membership-key---error', err);
      });
    });
  };
  // console.log('useSwitchInfo----did', did);
  useDeepCompareEffect(() => {
    const editListener = DeviceEventEmitter.addListener('EditSwitchInfo_DeviceEventEmitter', (value) => {
      if (did !== Device.deviceID) {
        return;
      }
      // console.log('EditSwitchInfo_DeviceEventEmitter----value', JSON.stringify(value));
      setSwitchInfo(value);
    });
    // 获取开关按键图标接口
    const getAppSwitchIcons = (subclassIds) => {
      const promises = subclassIds.map(([subclass_id, key]) => {
        return Service.smarthome.getDeviceIcon({ subclass_id }).then((res) => {
          return [res?.data?.proxy_category_icon || 'switch-default-icon', key];
        }).catch(() => {
          return ['switch-default-icon', key];
        });
      });
      return Promise.all(promises);
    };
    const loadSwitchInfo = () => {
      Service.callSmartHomeAPI('/device/deviceinfo', { get_sub_relation: true, dids: [did] }).then(async(res) => {
        // console.log('getSwitchInfo--res', JSON.stringify(res));
        // "member_ship": {
        //   "1": {
        //     "id": 1,
        //     "name": "左键12",
        //     "room_id": 500001090363,
        //     "home_id": 500001000000,
        //     "ai_desc": "left",
        //     "icon": ""
        //   },
        //   "2": {
        //     "id": 2,
        //     "name": "右键",
        //     "room_id": 500001090363,
        //     "home_id": 500001000000,
        //     "ai_desc": "right",
        //     "icon": ""
        //   }
        // },
        let members = {};
        if (res && res.list && res.list[0] && res.list[0].member_ship) {
          members = res.list[0].member_ship;
        }
        // 单键设备
        if (Object.keys(members).length === 1) {
          members['1'].name = Device.name;
        }
        const subclass_ids = [];
        for (let key in members) {
          subclass_ids.push([members[key].subclass_id, key]);
        }
        const icons = await getAppSwitchIcons(subclass_ids);
        for (let [icon, key] of icons) {
          members[key].icon = icon === 'switch-default-icon' ? Device.iconURL : icon;
        }
        setSwitchInfo(members);
        cachedSwitchInfo[did] = members;
      }).catch((error) => {
        console.log('获取按键信息报错---/device/deviceinfo---error', error);
      });
    };
    // 监听原生更换名称、图标事件
    const listener = DeviceEvent.multiSwitchNameChanged.addListener(async(value) => {
      loadSwitchInfo();
    });
    loadSwitchInfo();
    return () => {
      listener && listener.remove && listener.remove();
      editListener && editListener.remove && editListener.remove();
    };
  }, [did]);
  return {
    switchInfo,
    editSwitchInfo
  };
}