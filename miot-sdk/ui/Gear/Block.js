import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
export default class Block extends React.Component {
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