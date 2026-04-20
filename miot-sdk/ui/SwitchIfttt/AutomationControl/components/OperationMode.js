import React from 'react';
import AutomationCard from './AutomationCard';
import { strings as I18n } from "../../../../resources";
import { Text, View } from 'react-native';
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
  disabled,
}) => {
  if (!switchSensorModeSpec) {
    return null;
  }
  const handlePress = () => {
    if (disabled) return;
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
        onPress={disabled ? undefined : handlePress}
        icon={disabled ? null : undefined}
      />
    </View>
  );
};
const Styles = dynamicStyleSheet({
  sectionTitle: {
    fontSize: 13,
    height: 20,
    marginBottom: 6,
    paddingHorizontal: 32,
    marginTop: 8,
    color: new DynamicColor('#8C9DB0', '#92A1B4')
  }
});
export default OperationMode;