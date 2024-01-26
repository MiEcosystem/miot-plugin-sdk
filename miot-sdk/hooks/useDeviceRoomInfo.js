import { useState, useEffect } from 'react';
import Device from 'miot/device/BasicDevice';
import { PackageEvent } from 'miot/event/PackageEvent';
export default function useDeviceRoomInfo(did = Device.deviceID) {
  const [roomInfo, setRoomInfo] = useState({});
  function updateRoomInfo() {
    Device.getRoomInfoForCurrentHome(did).then((roomInfo) => {
      setRoomInfo(roomInfo?.data);
    }).catch(() => {});
  }
  useEffect(() => {
    updateRoomInfo();
    const listener = PackageEvent.packageViewWillAppear.addListener(() => {
      updateRoomInfo();
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, [did]);
  return roomInfo;
}