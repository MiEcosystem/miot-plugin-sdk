import { useState, createContext } from "react";
import { DeviceEventEmitter } from 'react-native';
import Service from 'miot/Service';
import Device, { DeviceEvent } from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
import saveSwitchMember from './switchMemberWriter';
const cachedSwitchInfo = {};
const ctx = createContext();
// switchCount 取自 spec（switchSpecs.length），单键时用来决定按键名是否回落设备名
export default function useSwitchInfoWithIcon(did = Device.deviceID, switchCount = 0) {
  const [switchInfo, setSwitchInfo] = useState(cachedSwitchInfo[did] || {});
  // patch 只含要改的字段；整条记录由 saveSwitchMember 以服务端权威值为基底拼出来
  const editSwitchInfo = (memberId, patch) => {
    const key = `${ memberId + 1 }`;
    return saveSwitchMember({ did, memberId, patch }).then((field) => {
      DeviceEventEmitter.emit('EditSwitchInfo_DeviceEventEmitter', {
        ...switchInfo,
        // field.icon 是服务端原始值（通常为空），state 里存的是解析过的图片 URL，
        // 下游读 icon 当图片用，不能被原始值盖掉
        [key]: { ...field, icon: switchInfo[key]?.icon || field.icon },
      });
      return field;
    }).catch((err) => {
      console.log('switch-update_membership-key---error', err);
      throw err;
    });
  };
  // console.log('useSwitchInfo----did', did);
  useDeepCompareEffect(() => {
    const editListener = DeviceEventEmitter.addListener('EditSwitchInfo_DeviceEventEmitter', (value) => {
      if (did !== Device.deviceID) {
        return;
      }
      setSwitchInfo(value);
      // 同步模块级缓存，否则页面重新挂载时首帧会拿到编辑前的旧快照
      // （useSwitchInfo.js 的原生事件分支本来就这么做，这里之前漏了）
      cachedSwitchInfo[did] = value;
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
        // 单键设备：按键即设备，名称取设备名。member_ship 为空时不伪造条目 ——
        // 伪造的占位值会被写入链路当成基底提交，服务端拒掉整条记录（code: -4）。
        const isSingleKey = switchCount ? switchCount === 1 : Object.keys(members).length === 1;
        if (isSingleKey && members['1']) {
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
    editSwitchInfo,
  };
}