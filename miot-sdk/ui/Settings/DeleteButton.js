import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Device, Host } from 'miot';
import { strings as I18n, Styles as CommonStyle } from '../../resources';
import { dynamicStyleSheet } from '../Style/DynamicStyleSheet';
import DynamicColor from '../Style/DynamicColor';
import { adjustSize } from '../../utils/sizes';
import { FontDefault } from '../../utils/fonts';
export default function DeleteButton({ deleteDeviceMessage }) {
  const { isFamily, isOwner, model, type } = Device;
  if (isFamily) {
    return null;
  }
  const modelKey = (model || '').split('.')[1];
  const i18nKey = `${ modelKey[0].toUpperCase() }${ modelKey.slice(1) }`;
  const title = type === '17' && isOwner ? I18n[`delete${ i18nKey }Group`] : I18n.deleteDevice;
  return (
    <View style={Styles.container}>
      <TouchableOpacity
        style={Styles.btn}
        activeOpacity={0.8}
        onPress={() => {
          Host.ui.openDeleteDevice(deleteDeviceMessage);
        }}
      >
        <Text style={Styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
DeleteButton.propTypes = {
  deleteDeviceMessage: PropTypes.string
};
const Styles = dynamicStyleSheet({
  container: {
    marginTop: adjustSize(39),
    paddingHorizontal: CommonStyle.common.padding
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: adjustSize(36),
    paddingHorizontal: adjustSize(129),
    borderRadius: adjustSize(258),
    backgroundColor: new DynamicColor('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.2)')
  },
  text: {
    fontFamily: FontDefault,
    fontSize: 16,
    lineHeight: 21,
    color: new DynamicColor('#F43F31', '#D92719')
  }
});