import { useState, useEffect } from 'react';
import { Device, DeviceEvent } from 'miot';
export default function useDeviceName() {
  const [name, setName] = useState(Device.name);
  useEffect(() => {
    const listener = DeviceEvent.deviceNameChanged.addListener(() => {
      setName(Device.name);
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return name;
}