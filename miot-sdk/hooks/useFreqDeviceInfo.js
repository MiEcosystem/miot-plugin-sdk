import { useState, useEffect } from 'react';
import { Device, PackageEvent } from 'miot';
export default function useFreqDeviceInfo() {
  const [isFreqDevice, setIsFreqDevice] = useState(false);
  function update() {
    Device.getFreqFlag().then((res) => {
      setIsFreqDevice(res?.data);
    }).catch(() => {});
  }
  useEffect(() => {
    update();
    PackageEvent.packageViewWillAppear.addListener(update);
  }, []);
  return isFreqDevice;
}