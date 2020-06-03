import React, { Component } from 'react';
import { TouchableWithoutFeedback, Animated } from 'react-native';

export default function(Image) {
  return class extends Component {
    state = {
      scale: new Animated.Value(0)
    };

    scale = () => {
      this.scaleAnimation && this.scaleAnimation.stop();
      this.state.scale.setValue(0);
      this.scaleAnimation = Animated.timing(this.state.scale, {
        toValue: 1
      });
      this.scaleAnimation.start();
    }

    onPressIn = () => {
      this.scale();
    }

    render() {
      let { onPress, disabled, ...rest } = this.props;
      let scale = this.state.scale.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [1, 0.85, 1]
      });
      return (
        <TouchableWithoutFeedback disabled={!!disabled} onPress={onPress} onPressIn={this.onPressIn}>
          <Animated.View style={{ transform: [{ scale: scale }] }}>
            <Image {...rest} />
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }
  };
}
