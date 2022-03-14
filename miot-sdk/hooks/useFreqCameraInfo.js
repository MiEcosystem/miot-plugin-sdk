import { useState, useEffect } from 'react';
import { Host, Device, PackageEvent } from 'miot';
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
    Promise.all(Device.getFreqCameraFlag(), Host.ui.getFreqCameraNeedShowRedPoint()).then(([flag, need]) => {
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