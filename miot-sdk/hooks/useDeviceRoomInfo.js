import { useState, useEffect } from 'react';
import { Device } from 'miot';
export default function useDeviceRoomInfo(did = Device.deviceID) {
  const [roomInfo, setRoomInfo] = useState({});
  useEffect(() => {
    Device.getRoomInfoForCurrentHome(did).then((roomInfo) => {
      setRoomInfo(roomInfo?.data);
    }).catch(() => {});
  }, [did]);
  return roomInfo;
}