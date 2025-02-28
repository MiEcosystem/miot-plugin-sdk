import { useState } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
import useDeepCompareEffect from './useDeepCompareEffect';
export default function useSwitchRoomInfo(roomIds = [], did = Device.deviceID) {
  // console.log('useSwitchRoomInfo----roomIds', roomIds);
  const [roomInfo, setRoomInfo] = useState({});
  const updateRoomInfo = () => {
    if (roomIds?.length > 1) {
      Service.room.getRoomNames(roomIds).then((res) => {
        // console.log('按键房间---res', res);
        const tempRoomInfo = {};
        roomIds.forEach((roomId, index) => {
          tempRoomInfo[`${ index + 1 }`] = roomId === 0 ? '未分配' : res[index];
        });
        setRoomInfo(tempRoomInfo);
      }).catch((error) => {
        // console.log('获取按键房间报错---getRoomNames---error', error);
      });
    } else {
      Device.getRoomInfoForCurrentHome(did).then((roomInfo) => {
        setRoomInfo({
          '1': roomInfo?.data?.name
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
  }, [roomIds]);
  return roomInfo;
}