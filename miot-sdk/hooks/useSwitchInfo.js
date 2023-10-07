import { useState, useEffect } from "react";
import { Device, DeviceEvent, Service } from "miot";
export default function useSwitchInfo(did = Device.deviceID) {
  const [switchInfo, setSwitchInfo] = useState({});
  const getAppSwitchIcons = (subclassIds) => {
    const promises = subclassIds.map((subclass_id) => {
      return Service.smarthome.getDeviceIcon({ subclass_id }).then((res) => {
        return res?.data?.proxy_category_icon || Device.iconUrl;
      }).catch(() => {
        return Device.iconUrl;
      });
    });
    return Promise.all(promises);
  };
  useEffect(() => {
    Service.callSmartHomeAPI('/device/deviceinfo', { get_sub_relation: true, dids: [did] }).then((res) => {
      console.log('getSwitchInfo--res', JSON.stringify(res));
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
      // const subclassIds = Object.values(members).map(({ subclass_id }) => {
      //   return subclass_id;
      // });
      // getAppSwitchIcons(subclassIds).then((res) => {
      // });
      setSwitchInfo(members);
    }).catch((error) => {
      console.log('获取按键信息报错---/device/deviceinfo---error', error);
    });
    const listener = DeviceEvent.multiSwitchNameChanged.addListener((value) => {
      if (did !== Device.deviceID) {
        return;
      }
      console.log('multiSwitchNameChanged----value', value);
      // TODO: 通知有个bug，缺了ai_ctrl字段
      //  {"1": {"ai_desc": "left", "home_id": 500001336663, "icon": "", "id": 1, "name": "左键e", "room_id": 500001337801, "subclass_id": 0}, "2": {"ai_desc": "middle", "home_id": 500001336663, "icon": "", "id": 2, "name": "中键", "room_id": 500001337801, "subclass_id": 0}, "3": {"ai_desc": "right", "home_id": 500001336663, "icon": "", "id": 3, "name": "右键", "room_id": 500001337801, "subclass_id": 0}}
      const tempSwitchInfo = { ...switchInfo };
      for (const key in value) {
        tempSwitchInfo[key] = {
          ...switchInfo[key],
          ...value[key]
        };
      }
      setSwitchInfo(tempSwitchInfo);
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return switchInfo;
}