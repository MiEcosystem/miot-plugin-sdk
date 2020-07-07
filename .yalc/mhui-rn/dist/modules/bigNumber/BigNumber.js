// @ts-nocheck

/* eslint-disable */
// @native begin
import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { adjustSize } from "../utils/sizes";
import { FontDefault, FontKmedium } from "../utils/fonts";
import { ColorGreen } from "../utils/colors";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
export default class BigNumber extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    themeColor: PropTypes.any,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel
  };

  render() {
    let {
      title,
      number,
      themeColor
    } = this.props;

    if (title === undefined || number === undefined) {
      return null;
    }

    return <View style={Styles.container} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.text,
      accessibilityLabel: this.props.accessibilityLabel
    })}>
        <Text style={Styles.title}>{title}</Text>
        <Text style={[Styles.number, themeColor ? {
        color: themeColor
      } : null]}>{number}</Text>
      </View>;
  }

}
const Styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: adjustSize(42),
    fontFamily: FontDefault,
    color: 'rgba(0, 0, 0, 0.9)'
  },
  number: {
    fontSize: adjustSize(196),
    fontFamily: FontKmedium,
    color: ColorGreen
  }
});