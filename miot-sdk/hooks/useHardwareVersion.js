import Device from 'miot/device/BasicDevice';
export default function useHardwareVersion(device = Device) {
  const { lastVersion } = device || {};
  if (!lastVersion) {
    return {
      sdk: '',
      mcu: ''
    };
  }
  const rSdk = /^\d+\.\d+.\d+(\_\d+)?/;
  const vSdk = rSdk.exec(lastVersion);
  const sdk = vSdk ? vSdk[0] : '';
  let mcu = sdk ? lastVersion.replace(sdk, '').slice(1) : lastVersion;
  if (!mcu && device && device.currentMcuVersion) {
    mcu = device.currentMcuVersion;
  }
  return {
    sdk: sdk || '',
    mcu: mcu || ''
  };
}