import React from 'react';
import AutomationCard from './AutomationCard';
import { strings as I18n } from "../../../../resources";
import { reportAutoSwitchClick } from "../reportUtils";
import { Text, View } from 'react-native';
import { adjustSize } from '../../../../utils/sizes';
import DynamicColor from '../../../Style/DynamicColor';
import { dynamicStyleSheet } from '../../../Style';
/**
 * 操作模式组件
 * 显示和切换设备的操作模式（标准/快速）
 */
const OperationMode = ({ 
  switchSensorMode,
  switchSensorModeSpec,
  onOpenModeDialog,
  subRef
}) => {
  if (!switchSensorModeSpec) {
    return null;
  }
  const handlePress = () => {
    reportAutoSwitchClick({
      subRef,
      item_type: 'item',
      item_name: 'operation_mode'
    });
    onOpenModeDialog();
  };
  const isQuickMode = switchSensorMode === switchSensorModeSpec.prop?.['Quick Single Click'];
  const subtitle = isQuickMode 
    ? I18n.switch_listItem_title_speedMode 
    : I18n.switch_listItem_title_standardMode;
  return (
    <View>
      <Text style={Styles.sectionTitle}>{I18n.switch_autoCtrl_ctrlSection}</Text>
      <AutomationCard
        title={I18n.switch_listItem_title_operationMode}
        subtitle={subtitle}
        onPress={handlePress}
      />
    </View>
    
  );
};
const Styles = dynamicStyleSheet({
  sectionTitle: {
    fontSize: 13,
    height: 20,
    marginBottom: adjustSize(18),
    paddingHorizontal: adjustSize(84),
    marginTop: adjustSize(54),
    color: new DynamicColor('#8C9DB0', '#92A1B4')
  }
});
export default OperationMode;