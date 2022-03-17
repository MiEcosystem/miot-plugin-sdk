import { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { Device } from 'miot';
export default function useCanUpgrade() {
  const [canUpgrade, setCanUpgrade] = useState(Device.needUpgrade);
  const { type } = Device;
  useEffect(() => {
    DeviceEventEmitter.addListener('MH_FirmwareNeedUpdateAlert', (res) => {
      if (['6', '16'].includes(type) || !res) {
        return;
      }
      setCanUpgrade(!!res?.needUpgrade);
    });
  }, []);
  return canUpgrade;
}