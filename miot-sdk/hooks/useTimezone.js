import { useState, useEffect } from 'react';
import { Device, DeviceEvent } from 'miot';
export default function useTimezone() {
  const [timezone, setTimezone] = useState('');
  function getTimezone() {
    Device.getDeviceTimeZone().then((res) => {
      setTimezone(res?.timeZone || '');
    }).catch(() => {});
  }
  useEffect(() => {
    getTimezone();
    const listener = DeviceEvent.deviceTimeZoneChanged.addListener(getTimezone);
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return timezone;
}