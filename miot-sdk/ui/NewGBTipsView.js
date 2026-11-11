import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { DarkMode, Device, Host } from "miot";
import { Images } from '../resources';
import I18n from '../resources/Strings';
import { Fonts } from './hyperOSUI';
// 深浅色两套色值：浅色模式与深色模式分别取用，避免依赖 SDK 自动反色
const THEME_COLORS = {
  light: {
    containerBg: '#FFFFFF',
    underlay: '#FFFFFF',
    text: '#000000',
  },
  dark: {
    containerBg: 'xm#242424',
    underlay: 'xm#242424',
    text: '#FFFFFF',
  },
};
const DIMENS = {
  radius: 20,
  paddingH: 16,
  paddingV: 12,
  leftIcon: 24,
  rightIcon: 16,
  gapLeft: 8,
  gapRight: 6,
};
export default function NewGBTipsView(props) {
  const { onPress, visible } = props;
  const leftImageSource = Images.common.remote_control;
  const leftImageSourceDark = Images.common.remote_control_dark;
  const rightArrow = Images.common.new_GB_right_arrow;
  const rightArrowDark = Images.common.new_GB_right_arrow_dark;
  const colorScheme = DarkMode.getColorScheme() || 'light';
  // 与图片切换共用同一份 colorScheme，取出当前模式下的背景/高亮/文字色
  const themeColors = THEME_COLORS[colorScheme] || THEME_COLORS.light;
  return visible ? (
    <TouchableHighlight
      style={[styles.container, { backgroundColor: themeColors.containerBg }]}
      onPress={onPress}
      underlayColor={themeColors.underlay}
      activeOpacity={0.65}
    >
      <View style={styles.content}>
        <View style={styles.leftWrapper}>
          <Image source={colorScheme === 'light' ? leftImageSource : leftImageSourceDark} style={styles.leftImage} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={[styles.title, { color: themeColors.text }]} numberOfLines={3}>
            {I18n.newGB_remoteControl_disabled_tips}
          </Text>
        </View>
        <View style={styles.rightWrapper}>
          <Image source={colorScheme === 'light' ? rightArrow : rightArrowDark} style={styles.rightArrow} />
        </View>
      </View>
    </TouchableHighlight>
  ) : null;
}
NewGBTipsView.propTypes = {
  onPress: PropTypes.func,
  visible: PropTypes.bool,
};
NewGBTipsView.defaultProps = {
  visible: true,
  onPress: () => { Host.ui.openRemoteControlDialog(Device.deviceID); },
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    alignSelf: 'stretch',
    borderRadius: DIMENS.radius,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DIMENS.paddingH,
    paddingVertical: DIMENS.paddingV,
    minHeight: 60
  },
  leftWrapper: {
    width: DIMENS.leftIcon,
    height: DIMENS.leftIcon,
    marginRight: DIMENS.gapLeft,
  },
  leftImage: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    ...Fonts.fontSystem16Medium,
  },
  rightWrapper: {
    width: DIMENS.rightIcon,
    height: DIMENS.rightIcon,
    marginLeft: DIMENS.gapRight,
  },
  rightArrow: {
    width: '100%',
    height: '100%',
  },
});