import React, { Children } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import DynamicColor from '../Style/DynamicColor';
import { Styles as CommonStyle } from '../../resources';
import { adjustSize } from '../../utils/sizes';
import { FontDefault } from '../../utils/fonts';
export default function Section({ title, showSeparator = true, children }) {
  const filteredChildren = Children.toArray(children).filter((child) => !!child);
  if (!filteredChildren.length) {
    return null;
  }
  return (
    <View style={Styles.container}>
      {showSeparator ? (
        <View style={Styles.separator}></View>
      ) : null}
      {title ? (
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>{title}</Text>
        </View>
      ) : null}
      {filteredChildren}
    </View>
  );
}
Section.propTypes = {
  title: PropTypes.string,
  showSeparator: PropTypes.bool
};
const Styles = dynamicStyleSheet({
  separator: {
    marginVertical: adjustSize(60),
    marginHorizontal: CommonStyle.common.padding,
    height: StyleSheet.hairlineWidth,
    backgroundColor: new DynamicColor('rgba(0, 0, 0, 0.15)', 'rgba(255, 255, 255, 0.15)')
  },
  titleContainer: {
    minHeight: adjustSize(96),
    justifyContent: 'center'
  },
  title: {
    fontFamily: FontDefault,
    fontSize: 12,
    lineHeight: 16,
    color: new DynamicColor('#8C93B0', 'rgba(255, 255, 255, 0.6)'),
    paddingHorizontal: CommonStyle.common.padding
  }
});