import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { adjustSize } from '../utils/sizes';
import { FontDefault } from '../utils/fonts';
import { NOOP } from '../utils/fns';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../utils/accessibility-helper';
export default class PrimeButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    themeColor: PropTypes.any,
    textColor: PropTypes.any,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    title: '',
    themeColor: '',
    textColor: '',
    onClick: NOOP,
    disabled: false
  };
  onPress = () => {
    let { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick();
    }
  }
  render() {
    let { title, themeColor, textColor, disabled } = this.props;
    if (!title) {
      return null;
    }
    return (
      <View style={Styles.container}>
        <TouchableOpacity style={[Styles.btn, themeColor ? {
          backgroundColor: themeColor,
          borderColor: themeColor
        } : null]} onPress={this.onPress} disabled={disabled} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityLabel: this.props.accessibilityLabel,
          accessibilityHint: this.props.accessibilityHint,
          accessibilityState: {
            disabled
          }
        })}>
          <Text style={[Styles.title, textColor ? {
            color: textColor
          } : null]}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    marginHorizontal: adjustSize(72)
  },
  btn: {
    height: adjustSize(126),
    justifyContent: 'center',
    borderWidth: Math.min(1, adjustSize(1.5)),
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: adjustSize(15)
  },
  title: {
    fontFamily: FontDefault,
    fontSize: adjustSize(39),
    textAlign: 'center',
    color: '#000'
  }
});