import { useState, useEffect } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Device from 'miot/device/BasicDevice';
export default function useCurrentSelectHomeInfo() {
  const [currentSelectHomeInfo, setCurrentSelectHomeInfo] = useState({});
  function update() {
    Device.getCurrentSelectHomeInfo().then((res) => {
      setCurrentSelectHomeInfo(res?.data);
    }).catch(() => {});
  }
  useEffect(() => {
    update();
    PackageEvent.packageViewWillAppear.addListener(update);
  }, []);
  return currentSelectHomeInfo;
}