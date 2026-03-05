import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Device, Host } from "miot";
import { Images } from '../resources';
import I18n from '../resources/Strings';
import { FontMiSansWMedium } from '../utils/fonts';
const COLORS = {
  containerBg: '#ffffff',
  underlay: '#ffffff',
  text: '#000000'
};
const DIMENS = {
  height: 60,
  radius: 20,
  marginH: 12,
  paddingH: 16,
  paddingV: 12,
  leftIcon: 24,
  rightIcon: 22,
  gapLeft: 8,
  gapRight: 6
};
export default function NewGBTipsView(props) {
  const { onPress, visible } = props;
  const leftImageSource = Images.common.remote_control;
  return visible ? (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      underlayColor={COLORS.underlay}
      activeOpacity={0.65}
    >
      <View style={styles.content}>
        <View style={styles.leftWrapper}>
          <Image source={leftImageSource} style={styles.leftImage} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title} numberOfLines={2}>
            {I18n.newGB_remoteControl_disabled_tips}
          </Text>
        </View>
        <View style={styles.rightWrapper}>
          <Image source={Images.common.right_arrow} style={styles.rightArrow} />
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
  onPress: () => {Host.ui.openRemoteControlDialog(Device.deviceID);},
};
const styles = StyleSheet.create({
  container: {
    height: DIMENS.height,
    alignSelf: 'stretch',
    marginHorizontal: DIMENS.marginH,
    backgroundColor: COLORS.containerBg,
    borderRadius: DIMENS.radius,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DIMENS.paddingH,
    paddingVertical: DIMENS.paddingV
  },
  leftWrapper: {
    width: DIMENS.leftIcon,
    height: DIMENS.leftIcon,
    marginRight: DIMENS.gapLeft
  },
  leftImage: {
    width: '100%',
    height: '100%'
  },
  textWrapper: {
    flex: 1
  },
  title: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: FontMiSansWMedium
  },
  rightWrapper: {
    width: DIMENS.rightIcon,
    height: DIMENS.rightIcon,
    marginLeft: DIMENS.gapRight
  },
  rightArrow: {
    width: '100%',
    height: '100%'
  }
});