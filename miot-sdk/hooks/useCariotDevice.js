import { useState, useEffect } from 'react';
import { Device, PackageEvent } from 'miot';
export default function useCariotDevice(did = Device.deviceID) {
  const [isCariotDevice, judgeCariotDevice] = useState({});
  useEffect(() => {
    Device.isBelongToCarRoom(did).then((isCariotDevice) => {
      judgeCariotDevice(isCariotDevice?.data);
    }).catch(() => { });
  }, []);
  
  return isCariotDevice;
}