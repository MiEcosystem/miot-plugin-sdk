import { useState, useEffect } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Host from 'miot/Host';
import Device from 'miot/device/BasicDevice';
let freqCameraInfo = {
  isFreqDevice: false,
  canUpgrade: false
};
export default function useFreqCameraInfo() {
  const [info, setInfo] = useState();
  function clear() {
    Host.ui.clearFreqCameraNeedShowRedPoint();
    freqCameraInfo = {
      ...freqCameraInfo,
      canUpgrade: false
    };
    setInfo(freqCameraInfo);
  }
  function update() {
    Promise.all([Device.getFreqCameraFlag(), Host.ui.getFreqCameraNeedShowRedPoint()]).then(([flag, need]) => {
      const isFreqDevice = flag?.data;
      const canUpgrade = need?.freqCameraNeedShowRedPoint;
      freqCameraInfo = {
        isFreqDevice,
        canUpgrade
      };
      setInfo(freqCameraInfo);
    }).catch(() => {});
  }
  useEffect(() => {
    update();
    PackageEvent.packageViewWillAppear.addListener(update);
  }, []);
  return [info, clear];
}