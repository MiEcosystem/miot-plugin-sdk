import { useState } from "react";
import { Device, Service } from "miot";
import useDeepCompareEffect from './useDeepCompareEffect';
export default function useSwitchMemberIcon(subclass_id) {
  const [switchIcon, setSwitchIcon] = useState({});
  const fetchSwitchMemberIcon = () => {
    Service.smarthome.getDeviceIcon({ subclass_id }).then((res) => {
      setSwitchIcon(res?.data?.proxy_category_icon || Device.iconUrl);
    }).catch(() => {
      setSwitchIcon(Device.iconUrl);
    });
  };
  useDeepCompareEffect(() => {
    fetchSwitchMemberIcon();
  }, [subclass_id]);
  return switchIcon;
}