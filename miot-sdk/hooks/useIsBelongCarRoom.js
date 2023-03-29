import { useState, useEffect } from 'react';
import { Device, PackageEvent } from 'miot';
export default function useIsBelongCarRoom() {
  const [isCarRoom, setIsCarRoom] = useState(false);
  function getIsCarRoom() {
    Device.isBelongToCarRoom().then((res) => {
      setIsCarRoom(res?.data);
    }).catch(() => {});
  }
  useEffect(() => {
    getIsCarRoom();
  }, []);
  return isCarRoom;
}