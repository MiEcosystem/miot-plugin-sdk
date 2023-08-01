import { useState, useEffect } from 'react';
import { Device, DeviceEvent } from 'miot';
export default function useDeviceIcon() {
  const [iconURL, setIconURL] = useState(Device.iconURL);
  useEffect(() => {
    const listener = DeviceEvent.deviceIconChanged.addListener(() => {
      setIconURL(Device.iconURL);
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return iconURL;
}