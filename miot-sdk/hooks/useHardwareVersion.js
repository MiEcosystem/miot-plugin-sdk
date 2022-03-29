import { Device } from 'miot';
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
  const mcu = sdk ? lastVersion.replace(sdk, '').slice(1) : lastVersion;
  return {
    sdk: sdk || '',
    mcu: mcu || ''
  };
}