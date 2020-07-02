import { Styles } from 'miot/resources';
import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Checkable from './Checkable';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
const SIZE = 40;
const UNCHECKED_BACKGROUNDCOLOR = '#f0f0f0';
const UNCHECKED_BORDER_COLOR = 'rgba(0,0,0,0.1)';
/**
 * @export
 * @author Geeook
 * @since 10011
 * @module Checkbox
 * @description 带动效的复选框
 * @property {style} style - 样式
 * @property {bool} disabled - 是否禁用，默认 false
 * @property {bool} checked - 是否勾选，默认 false
 * @property {string} checkedColor - 勾选背景颜色，默认米家绿
 * @property {function} onValueChange - 点击回调函数
 */
export default class Checkbox extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onValueChange: PropTypes.func,
    checkedColor: PropTypes.string,
    label: PropTypes.string,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  }
  static defaultProps = {
    style: {},
    disabled: false,
    checked: false,
    checkedColor: Styles.common.MHGreen
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('Checkbox');
    this.state = {
      checked: this.props.checked
    };
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.checked !== this.state.checked) {
      this.setState({ checked: newProps.checked });
    }
  }
  backgroundColor = new Animated.Value(0);
  render() {
    const toValue = this.state.checked ? 1 : 0;
    const backgroundColor = this.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: [UNCHECKED_BACKGROUNDCOLOR, this.props.checkedColor]
    });
    const { borderWidth, borderColor, width, height } = this.props.style;
    const size = Math.min(width || SIZE, height || SIZE);
    const borderStyle = this.state.checked
      ? { borderWidth: 0 }
      : {
        borderWidth: borderWidth || 1,
        borderColor: borderColor || UNCHECKED_BORDER_COLOR
      };
    Animated.timing(this.backgroundColor,
      {
        toValue,
        duration: 200
      }
    ).start();
    return (
      <Animated.View style={[
        styles.container,
        this.props.style,
        borderStyle,
        { backgroundColor }
      ]}
      >
        <TouchableWithoutFeedback
          disabled={this.props.disabled}
          onPress={() => this._onValueChange()}
          {...getAccessibilityConfig({
            ...this.props,
            accessibilityRole: AccessibilityRoles.checkbox,
            accessibilityLabel: this.props.accessibilityLabel || this.props.label,
            accessibilityState: {
              disabled: !!this.props.disabled,
              checked: !!this.state.checked
            }
          })}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Checkable
              size={size}
              visible={this.state.checked}
            />
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
  _onValueChange() {
    const checked = !this.state.checked;
    if (this.props.onValueChange) {
      this.props.onValueChange(checked);
    }
    this.setState({ checked });
  }
}
const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE
  }
});