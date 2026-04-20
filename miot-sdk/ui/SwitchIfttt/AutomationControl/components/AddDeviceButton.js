import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import DarkMode from 'miot/darkmode';
import { dynamicColor } from "../../../Style";
import { Fonts } from 'miot/ui/hyperOSUI';
import { strings as I18n } from "../../../../resources";
import AutoDeviceInfoButton from './AutoDeviceInfoButton';
import { colorToken } from 'mhui-rn/dist/hyperOS';
import Illustration from '../Images/svg/Illustration';
/**
 * 添加设备按钮组件
 * 用于普通设备模式下展示"添加设备"入口
 */
const AddDeviceButton = ({ onPress, style, disabled }) => {
  const isDark = DarkMode.getColorScheme() !== 'light';
  const fill = isDark ? 'rgba(12, 206, 148, 0.1)' : 'rgba(0, 186, 124, 0.15)';
  const fillBack = isDark ? 'rgba(12, 206, 148, 1)': 'rgba(0, 186, 124, 1)'
  return (
    <TouchableHighlight
      style={{ width: '100%' }}
      underlayColor="transparent"
      disabled={disabled}
      onPress={() => {
        onPress && onPress();
      }}>
      <View style={[Styles.container, style]}>
        <Illustration
          style={[disabled && Styles.iconDisabled]}
          width={50}
          height={50}
          fill={fill}
          fillBack={fillBack}
        />
        <View style={Styles.titleContainer}>
          <Text style={[Styles.titleStyle, disabled && Styles.titleDisabled]}
            numberOfLines={3}>
            {I18n.automation_add_control_device}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
const Styles = {
  container: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: dynamicColor('rgba(0, 0, 0, .04)', 'rgba(255, 255, 255, 0.14)'),
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 6,
    alignItems: "center",
    marginTop: 10,
  },
  titleStyle: {
    ...Fonts.fontSystem15Medium,
    color: colorToken.accentGreenContent,
    paddingHorizontal: 4
  },
  titleDisabled: {
    color: colorToken.accentGreenLow,
  },
  iconDisabled: {
    opacity: 0.5,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 4,
    color: colorToken.accentGreenContent,
    flexDirection: "row",
    alignItems: "center",
  }
};
export default AddDeviceButton;