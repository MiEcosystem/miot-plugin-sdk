import { useState, useEffect } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Device from 'miot/device/BasicDevice';
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
  return [isFreqDevice, setIsFreqDevice];
}