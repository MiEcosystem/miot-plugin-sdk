import { useState, useEffect } from "react";
import { Device, DeviceEvent, Service } from "miot";
export default function useDeviceIcon() {
  const [iconURL, setIconURL] = useState(Device.iconURL);
  useEffect(() => {
    Service.smarthome.reportLog(
      Device.model,
      `IconHook ${ JSON.stringify(Device.extraObj) } ${ Device.iconURL }`
    );
    if (Device.extraObj?.split?.parentId) {
      Service.smarthome.reportLog(
        Device.model,
        `IconHook ${ Device.extraObj.split.parentId }`
      );
      Service.smarthome
        .getDeviceIcon({ subclass_id: 0 })
        .then(({ data: { proxy_category_icon } }) => {
          Service.smarthome.reportLog(
            Device.model,
            `IconHook ${ proxy_category_icon }`
          );
          setIconURL(proxy_category_icon);
        });
    }
    const listener = DeviceEvent.deviceIconChanged.addListener(() => {
      Service.smarthome.reportLog(
        Device.model,
        `IconHook ${ JSON.stringify(Device.extraObj) } ${ Device.iconURL }`
      );
      if (!Device.extraObj?.split?.parentId) {
        Service.smarthome.reportLog(
          Device.model,
          `IconHook ${ Device.extraObj.split.parentId }`
        );
        setIconURL(Device.iconURL);
      }
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  return iconURL;
}