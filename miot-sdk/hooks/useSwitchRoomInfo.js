import { useState } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
// 设备未分配房间时，原生会伪造一个该 id 的房间，名字是「默认房间」，不是真实房间
const UNASSIGNED_ROOM_ID = 'mijia.roomid.default';
// refreshToken：调用方改完房间后自增，用于触发重新拉取（读设备自身房间时 roomIds/did 都不变）
export default function useSwitchRoomInfo(roomIds = [], did = Device.deviceID, refreshToken = 0) {
  // console.log('useSwitchRoomInfo----roomIds', roomIds);
  const [roomInfo, setRoomInfo] = useState({});
  const updateRoomInfo = () => {
    if (roomIds?.length > 1) {
      Service.room.getRoomNames(roomIds).then((res) => {
        // console.log('按键房间---res', res);
        const tempRoomInfo = {};
        // 未分配的按键 room_id 存的是 home_id，查不到房间，原生对此返回空串
        roomIds.forEach((roomId, index) => {
          tempRoomInfo[`${ index + 1 }`] = res[index] || '';
        });
        setRoomInfo(tempRoomInfo);
      }).catch((error) => {
        // console.log('获取按键房间报错---getRoomNames---error', error);
      });
    } else {
      Device.getRoomInfoForCurrentHome(did).then((res) => {
        // 接口返回字段是 roomName；未分配时返回的是伪造房间，不展示名称
        const { roomId, roomName } = res?.data || {};
        setRoomInfo({
          '1': roomId === UNASSIGNED_ROOM_ID ? '' : (roomName || ''),
        });
      }).catch(() => {});
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