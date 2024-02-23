import { useState, useEffect } from 'react';
import { PackageEvent } from 'miot/event/PackageEvent';
import Device from 'miot/device/BasicDevice';
export default function useHomeDeviceList() {
  const [homeDeviceList, setHomeDeviceList] = useState([]);
  const fetchHomeDeviceList = () => {
    Device.getHomeDeviceList().then((res) => {
      setHomeDeviceList(res?.data?.commonDevices || []);
      // console.log('getHomeDeviceList---res', JSON.stringify(res));
    }).catch(() => {});
  };
  useEffect(() => {
    fetchHomeDeviceList();
    const listener = PackageEvent.packageViewWillAppear.addListener(() => {
      fetchHomeDeviceList();
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return homeDeviceList;
}