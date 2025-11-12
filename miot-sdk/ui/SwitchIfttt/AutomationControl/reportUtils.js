import { getSwitchCount } from "../utils";
import { Package, Service } from "../../../index";
import Device from "../../../device/BasicDevice";
let refString = "";
async function getSwitchRefName() {
  if (refString === "") {
    const switchCount = await getSwitchCount();
    refString = `plugins_switch_${ switchCount.toString().padStart(2, '0') }`;
  }
  return refString;
}
export async function reportAutoSwitchView({
  ref = "",
  subRef = ""
}) {
  const refName = await getSwitchRefName();
  await Service.smarthome.updatePluginPageRef({
    ref: ref || refName,
    subRef
  });
}
export async function reportAutoSwitchClick({
  ref = "",
  subRef = "",
  ...others
}) {
  const refName = await getSwitchRefName();
  reportAutoSwitchView({
    ref,
    subRef
  }).then(() => {
    const params = {
      ref: ref || refName,
      subRef,
      did: Device.deviceID,
      device_model: Device.model,
      mac: Device.mac,
      plugin_form: 0,
      package_id: Package.packageID,
      package_name: Package.packageName,
      plugin_id: Package.pluginID,
      plugin_version: Package.version,
      ...others
    };
    Service.smarthome.reportEventRefChannel("click", params);
  });
}
export async function reportAutoSwitchExpose({
  subRef = "",
  ...others
}) {
  const refName = await getSwitchRefName();
  reportAutoSwitchView({
    subRef
  }).then(() => {
    const params = {
      ref: refName,
      subRef,
      did: Device.deviceID,
      device_model: Device.model,
      mac: Device.mac,
      plugin_form: 0,
      package_id: Package.packageID,
      package_name: Package.packageName,
      plugin_id: Package.pluginID,
      plugin_version: Package.version,
      ...others
    };
    Service.smarthome.reportEventRefChannel("expose", params);
  });
}