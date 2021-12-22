import { IOS, NativeType } from "../native";
import { resetClassVariables as resetClassVariablesInterconnection } from 'miot/device/interconnection';
import { resetClassVariables as resetClassVariablesCommonSetting } from 'miot/ui/CommonSetting/CommonSetting';
import { resetClassVariables as resetClassVariablesFirmwareUpgradeAuto } from 'miot/ui/CommonSetting/FirmwareUpgradeAuto';
import { resetClassVariables as resetClassVariablesPageWithNormalNavigator } from 'miot/ui/PageWithNormalNavigator';
export const isIOS = (NativeType === IOS);
export default class ReuseHelper {
  static resetClassVariables() {
    if (isIOS) {
      return;
    }
    console.log('ReuseHelper resetClassVariables: ');
    resetClassVariablesInterconnection();
    resetClassVariablesCommonSetting();
    resetClassVariablesFirmwareUpgradeAuto();
    resetClassVariablesPageWithNormalNavigator();
  }
}