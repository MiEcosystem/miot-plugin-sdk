import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { AccessibilityPropTypes, getAccessibilityConfig } from '../../utils/accessibility-helper';
export default class Block extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    panHandlers: PropTypes.object,
    onLongPress: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel
  };
  render() {
    return (
      <Animated.View
        style={this.props.style}
        {...this.props.panHandlers}
      >
        <TouchableWithoutFeedback
          onLongPress={this.props.onLongPress}
          {...getAccessibilityConfig({
            accessible: false
          })}
        >
          {this.props.children}
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}