import { getSwitchCount } from "../SwitchIfttt/utils";
import { Package, Service } from "../../index";
import Device from "../../device/BasicDevice";
import { reportAutoSwitchView } from "../SwitchIfttt/AutomationControl/reportUtils";
export async function reportSettingView({
  ref = "plugin_more_setting",
  subRef = "plugin_more_setting"
}) {
  await Service.smarthome.updatePluginPageRef({
    ref: ref,
    subRef
  });
}
export async function reportSettingClick({
  ref = "plugin_more_setting",
  subRef = "plugin_more_setting",
  ...others
}) {
  reportSettingView({ ref, subRef });
  const params = {
    ref,
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
  await Service.smarthome.reportEventRefChannel("click", params);
}