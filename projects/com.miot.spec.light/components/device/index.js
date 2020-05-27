import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import Image from './image';

export default class extends Component {
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
    let props = this.props;
    let { on, disabled, onPress, title, ...rest } = props;
    let titleStyle = on ? Styles.titleOn : Styles.titleOff;
    let scale = this.state.scale.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [1, 0.85, 1]
    });
    return (
      <Animated.View style={{ transform: [{ scale: scale }] }}>
        <Image on={on} {...rest} />
        <View style={Styles.title}>
          <Text style={[Styles.titleText, titleStyle]}>{title}</Text>
        </View>
        <TouchableWithoutFeedback disabled={!!disabled} onPress={onPress} onPressIn={this.onPressIn}>
          <View style={Styles.touchArea}></View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const Styles = StyleSheet.create({
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 32
  },
  titleText: {
    fontSize: 17,
    textAlign: 'center'
  },
  titleOn: {
    color: '#fff'
  },
  titleOff: {
    color: '#000'
  },
  touchArea: {
    position: 'absolute',
    left: '50%',
    top: 38,
    width: 150,
    height: 150,
    // backgroundColor: 'rgba(255, 0, 0, 0.5)',
    transform: [{
      translateX: -75
    }]
  }
});
