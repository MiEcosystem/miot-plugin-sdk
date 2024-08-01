import { useState, useEffect } from "react";
import Service from 'miot/Service';
import Device, { DeviceEvent } from 'miot/device/BasicDevice';
export default function useDeviceIcon() {
  let url = Device.iconURL;
  const index = url.indexOf("?");
  if (index > -1 && Device.extraObj?.split?.parentId) {
    url = url.slice(0, index);
  }
  const [iconURL, setIconURL] = useState(url);
  useEffect(() => {
    if (Device.extraObj?.split?.parentId) {
      Service.smarthome
        .getDeviceIcon({ subclass_id: 0 })
        .then(({ data: { proxy_category_icon } }) => {
          setIconURL(`${ proxy_category_icon }`);
        });
    }
    const listener = DeviceEvent.deviceIconChanged.addListener(() => {
      if (!Device.extraObj?.split?.parentId) {
        setIconURL(Device.iconURL);
      }
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return iconURL;
}