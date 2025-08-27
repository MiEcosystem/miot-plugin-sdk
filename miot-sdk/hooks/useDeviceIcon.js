import { useState, useEffect } from "react";
import Service from 'miot';
import Device, { DeviceEvent } from 'miot/device/BasicDevice';
export default function useDeviceIcon() {
  let url = Device.iconURL;
  const index = url.indexOf("?");
  Service.smarthome.reportLog(Device.model, `ykjTest --> 产品名称：${ Device.name } iconUrl: ${ url } index -> ${ index }`);
  if (index > -1 && Device.extraObj?.split?.parentId) {
    url = url.slice(0, index);
  }
  Service.smarthome.reportLog(Device.model, `ykjTest --> url: ${ url } Device.extraObj?.split?.parentId -> ${ Device.extraObj?.split?.parentId }`);
  const [iconURL, setIconURL] = useState(url);
  Service.smarthome.reportLog(Device.model, `ykjTest --> iconURL: ${ iconURL }`);
  useEffect(() => {
    if (Device.extraObj?.split?.parentId) {
      Service.smarthome
        .getDeviceIcon({ subclass_id: 0 })
        .then(({ data: { proxy_category_icon } }) => {
          Service.smarthome.reportLog(Device.model, `ykjTest --> proxy_category_icon: ${ proxy_category_icon }`);
          setIconURL(`${ proxy_category_icon }`);
        });
    }
    const listener = DeviceEvent.deviceIconChanged.addListener(() => {
      Service.smarthome.reportLog(Device.model, `ykjTest --> deviceIconChanged -> Device.iconURL -> ${ Device.iconURL } !Device.extraObj?.split?.parentId -> ${ !Device.extraObj?.split?.parentId }`);
      if (!Device.extraObj?.split?.parentId) {
        setIconURL(Device.iconURL);
      }
    });
    return () => {
      listener && listener.remove && listener.remove();
    };
  }, []);
  Service.smarthome.reportLog(Device.model, `ykjTest --> return iconURL -> ${ iconURL }`);
  return iconURL;
}