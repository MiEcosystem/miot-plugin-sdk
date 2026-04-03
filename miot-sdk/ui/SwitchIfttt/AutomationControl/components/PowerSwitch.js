import React from 'react';
import { View } from 'react-native';
import { reportAutoSwitchClick } from "../reportUtils";
import { SUB_REF } from '../utils/constants';
import { ListItemWithSwitch } from "mhui-rn";
import { strings as I18n } from "../../../../resources";
import { dynamicStyleSheet } from '../../../Style';
import { dynamicColor } from '../../../Style/DynamicColor';
const Styles = dynamicStyleSheet({
  automationComponentStyle: {
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 8
  },
  cardWrapper: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden'
  },
  listItemContainerStyle: {
    width: '100%',
    paddingHorizontal: 16
  }
});
/**
 * 电源开关组件
 * 控制设备的开关状态，包含关闭确认逻辑
 */
const PowerSwitch = ({
  switchStatus,
  switchButtonType,
  onSwitchChange,
  onSwitchOn,
  onShowDialog,
  disabled,
}) => {
  const handleValueChange = (value) => {
    if (disabled) return;
    reportAutoSwitchClick({
      subRef: SUB_REF,
      item_type: 'button',
      item_name: 'power_switch',
      item_content: value ? 'true' : 'false',
    });
    if (!value) {
      // 先设置UI关闭，弹窗后处理设备控制
      onSwitchChange(false);
      onShowDialog();
    } else {
      onSwitchOn ? onSwitchOn(true) : onSwitchChange(true);
    }
  };
  return (
    <View style={Styles.automationComponentStyle}>
      <View style={Styles.cardWrapper}>
        <ListItemWithSwitch
          containerStyle={Styles.listItemContainerStyle}
          key="auto-switch"
          title={I18n.switch_autoCtrl_powerSwitch_title}
          value={switchStatus}
          onValueChange={handleValueChange}
          disabled={disabled}
          onTintColor={dynamicColor('#0CCE94', '#00BA7C')}
          tintColor={dynamicColor('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.15)')}
          showSeparator={false}
        />
      </View>
    </View>
  );
};
export default PowerSwitch;