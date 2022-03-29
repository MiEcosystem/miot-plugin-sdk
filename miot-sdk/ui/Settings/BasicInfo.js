import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Device, Host } from 'miot';
import { dynamicStyleSheet } from '../Style/DynamicStyleSheet';
import DynamicColor from '../Style/DynamicColor';
import { strings as I18n, Styles as CommonStyle } from '../../resources';
import { adjustSize } from '../../utils/sizes';
import { FontDefault } from '../../utils/fonts';
import ListItem from '../ListItem/ListItem';
import useDeviceName from '../../hooks/useDeviceName';
import useDeviceRoomInfo from '../../hooks/useDeviceRoomInfo';
export default function BasicInfo({ options, customOptions, showDots, extraOptions } = {}) {
  const { iconURL } = Device;
  const roomInfo = useDeviceRoomInfo();
  const name = useDeviceName();
  return (
    <View style={Styles.container}>
      <View style={Styles.content}>
        <Image style={Styles.icon} source={{
          uri: iconURL
        }} />
        <View style={Styles.text}>
          <Text style={Styles.title}>{name}</Text>
          <Text style={Styles.subtitle}>{roomInfo?.roomName}</Text>
        </View>
      </View>
      <ListItem
        title={I18n.moreDeviceInfo}
        onPress={() => {
          Host.ui.openDeviceInfoPage({ params: { options, customOptions, showDots, extraOptions } });
        }}
        showSeparator={false}
        useNewType={true}
      />
    </View>
  );
}
BasicInfo.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  customOptions: PropTypes.array,
  showDots: PropTypes.arrayOf(PropTypes.string),
  extraOptions: PropTypes.object
};
const Styles = dynamicStyleSheet({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: adjustSize(51),
    marginRight: CommonStyle.common.padding,
    paddingVertical: adjustSize(21)
  },
  icon: {
    width: adjustSize(240),
    height: adjustSize(240),
    resizeMode: 'contain',
    marginRight: adjustSize(30)
  },
  title: {
    fontFamily: FontDefault,
    fontSize: 24,
    lineHeight: 32,
    color: new DynamicColor('rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.8)')
  },
  subtitle: {
    fontFamily: FontDefault,
    fontSize: 14,
    lineHeight: 20,
    color: new DynamicColor('rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0.5)')
  }
});