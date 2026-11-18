import { useState } from "react";
import { DeviceEventEmitter } from 'react-native';
import Service from 'miot/Service';
import Device, { DeviceEvent } from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
import saveSwitchMember from './switchMemberWriter';
const cachedSwitchInfo = {};
// switchCount 取自 spec（switchSpecs.length），单键时用来决定按键名是否回落设备名
export default function useSwitchInfo(did = Device.deviceID, switchCount = 0) {
  const [switchInfo, setSwitchInfo] = useState(cachedSwitchInfo[did] || {});
  // patch 只含要改的字段；整条记录由 saveSwitchMember 以服务端权威值为基底拼出来
  const editSwitchInfo = (memberId, patch) => {
    return saveSwitchMember({ did, memberId, patch }).then((field) => {
      DeviceEventEmitter.emit('EditSwitchInfo_DeviceEventEmitter', {
        ...switchInfo,
        [`${ memberId + 1 }`]: field,
      });
      return field;
    }).catch((err) => {
      console.log('switch-update_membership-key---error', err);
      throw err;
    });
  };
  // console.log('useSwitchInfo----did', did);
  useDeepCompareEffect(() => {
    Service.callSmartHomeAPI('/device/deviceinfo', { get_sub_relation: true, dids: [did] }).then((res) => {
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
      // 单键设备：按键即设备，名称取设备名。member_ship 为空时不伪造条目 ——
      // 伪造的占位值会被写入链路当成基底提交，服务端拒掉整条记录（code: -4）。
      const isSingleKey = switchCount ? switchCount === 1 : Object.keys(members).length === 1;
      if (isSingleKey && members['1']) {
        members['1'].name = Device.name;
      }
      // const subclassIds = Object.values(members).map(({ subclass_id }) => {
      //   return subclass_id;
      // });
      // getAppSwitchIcons(subclassIds).then((res) => {
      // });
      setSwitchInfo(members);
      cachedSwitchInfo[did] = members;
    }).catch((error) => {
      console.log('获取按键信息报错---/device/deviceinfo---error', error);
    });
    const editListener = DeviceEventEmitter.addListener('EditSwitchInfo_DeviceEventEmitter', (value) => {
      if (did !== Device.deviceID) {
        return;
      }
      // console.log('EditSwitchInfo_DeviceEventEmitter----value', JSON.stringify(value));
      setSwitchInfo(value);
    });
    const listener = DeviceEvent.multiSwitchNameChanged.addListener((value) => {
      if (did !== Device.deviceID) {
        return;
      }
      // console.log('multiSwitchNameChanged----value', value);
      // TODO: 通知有个bug，缺了ai_ctrl字段
      //  {"1": {"ai_desc": "left", "home_id": 500001336663, "icon": "", "id": 1, "name": "左键e", "room_id": 500001337801, "subclass_id": 0}, "2": {"ai_desc": "middle", "home_id": 500001336663, "icon": "", "id": 2, "name": "中键", "room_id": 500001337801, "subclass_id": 0}, "3": {"ai_desc": "right", "home_id": 500001336663, "icon": "", "id": 3, "name": "右键", "room_id": 500001337801, "subclass_id": 0}}
      const tempSwitchInfo = { ...switchInfo };
      for (const key in value) {
        tempSwitchInfo[key] = {
          ...switchInfo[key],
          ...value[key],
        };
      }
      setSwitchInfo(tempSwitchInfo);
      cachedSwitchInfo[did] = tempSwitchInfo;
    });
    return () => {
      listener && listener.remove && listener.remove();
      editListener && editListener.remove && editListener.remove();
    };
  }, [did]);
  return {
    switchInfo,
    editSwitchInfo,
  };
}