import React from 'react';
import { View } from 'react-native';
import { ListItemWithSwitch } from "mhui-rn";
import { strings as I18n } from "../../../../resources";
import { dynamicStyleSheet } from '../../../Style';
import { dynamicColor } from '../../../Style/DynamicColor';
import { reportAutoSwitchClick, reportAutoSwitchExpose } from "../reportUtils";
import { adjustSize } from '../../../../utils/sizes';
const Styles = dynamicStyleSheet({
  automationComponentStyle: {
    width: '100%',
    paddingHorizontal: adjustSize(48),
    marginBottom: adjustSize(48)
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
                       subRef
                     }) => {
  const handleValueChange = (value) => {
    reportAutoSwitchClick({
      subRef,
      item_type: 'button',
      item_name: 'power_switch',
      item_content: value ? 'on' : 'off'
    });
    if (!value) {
      // 先设置UI关闭，弹窗后处理设备控制
      onSwitchChange(false);
      reportAutoSwitchExpose({
        subRef,
        item_type: 'dialog',
        item_name: 'power_switch_comfrim_dialog'
      });
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
        subtitle={I18n.switch_autoCtrl_powerSwitch_desc}
        value={switchStatus}
        onValueChange={handleValueChange}
        onTintColor={dynamicColor('#0CCE94', '#00BA7C')}
        tintColor={dynamicColor('rgba(0,0,0,0.06)', 'rgba(255,255,255,0.15)')}
          showSeparator={false}
        />
      </View>
    </View>
  );
};
export default PowerSwitch;