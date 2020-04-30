import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
export default class Block extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    panHandlers: PropTypes.object,
    onLongPress: PropTypes.func
  };
  render() {
    return (
      <Animated.View
        style={this.props.style}
        {...this.props.panHandlers}
      >
        <TouchableWithoutFeedback
          onLongPress={this.props.onLongPress}
        >
          {this.props.children}
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}