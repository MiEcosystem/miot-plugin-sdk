import { useState } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
// 设备未分配房间时，原生会伪造一个该 id 的房间，名字是「默认房间」，不是真实房间
const UNASSIGNED_ROOM_ID = 'mijia.roomid.default';
// 设备自身所在房间名。未分配房间时原生返回伪造的「默认房间」，按产品要求不展示，返回空串。
const getDeviceRoomName = (did) => {
  return Device.getRoomInfoForCurrentHome(did).then((res) => {
    // 接口返回字段是 roomName，不是 name
    const { roomId, roomName } = res?.data || {};
    return roomId === UNASSIGNED_ROOM_ID ? '' : (roomName || '');
  }).catch(() => '');
};
// refreshToken：调用方改完房间后自增，用于触发重新拉取（读设备自身房间时 roomIds/did 都不变）
// did 显式传 null 表示目标设备还没确定（如拆键按键的 did 异步获取中），此时不请求，
// 避免退到 Device.deviceID 去显示别的设备的房间
export default function useSwitchRoomInfo(roomIds = [], did = Device.deviceID, refreshToken = 0) {
  // console.log('useSwitchRoomInfo----roomIds', roomIds);
  const [roomInfo, setRoomInfo] = useState({});
  const updateRoomInfo = () => {
    if (roomIds?.length > 1) {
      // 没单独配过房间的按键回落设备自身房间（room_id 是哨兵 -1 或查不到名字），
      // 与插件首页 switch-multi-key.js 的 getSwitchRoomNames 同口径。
      Promise.all([Service.room.getRoomNames(roomIds), getDeviceRoomName()]).then(([names, fallback]) => {
        const tempRoomInfo = {};
        roomIds.forEach((roomId, index) => {
          tempRoomInfo[`${ index + 1 }`] = names[index] || fallback;
        });
        setRoomInfo(tempRoomInfo);
      }).catch((error) => {
        console.log('获取按键房间报错---getRoomNames---error', error);
      });
    } else if (did) {
      getDeviceRoomName(did).then((roomName) => {
        setRoomInfo({ '1': roomName });
      });
    }
  };
  useDeepCompareEffect(() => {
    updateRoomInfo();
    const listener = PackageEvent.packageViewWillAppear.addListener(() => {
      updateRoomInfo();
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, [roomIds, did, refreshToken]);
  return roomInfo;
}