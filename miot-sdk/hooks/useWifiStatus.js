import { useState, useEffect } from 'react';
import { Device, DeviceEvent } from 'miot';
export default function useWifiStatus() {
  const [isOnline, setIsOnline] = useState(!!Device.isOnline);
  useEffect(() => {
    const listener = DeviceEvent.deviceStatusChanged.addListener(() => {
      setIsOnline(!!Device.isOnline);
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return isOnline;
}