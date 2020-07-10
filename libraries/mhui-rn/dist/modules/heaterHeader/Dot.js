// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { Animated, StyleSheet } from 'react-native';

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default class Dot extends Component {
  state = {
    progress: new Animated.Value(0)
  };

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  startAnimation() {
    this.ani && this.ani.stop();
    this.ani = Animated.timing(this.state.progress, {
      toValue: 1,
      duration: getRandomBetween(12000, 24000)
    }).start(({
      finished
    }) => {
      if (finished) {
        this.state.progress.setValue(0);
        this.startAnimation();
      }
    });
  }

  stopAnimation() {
    this.ani && this.ani.stop();
  }

  render() {
    const {
      width,
      height,
      source
    } = this.props;
    const {
      progress
    } = this.state;
    const originLeft = getRandomBetween(20, 350);
    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const bottom = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [`${getRandomBetween(0, 20)}%`, '100%']
    });
    const left = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [originLeft - 3, originLeft + 3]
    });
    return <Animated.Image style={[StylesDot.container, {
      width,
      height,
      opacity,
      bottom,
      left
    }]} source={source} />;
  }

}
export function createDot(width, height, source) {
  return <Dot width={width} height={height} source={source} />;
}
const StylesDot = StyleSheet.create({
  container: {
    position: 'absolute',
    resizeMode: 'contain'
  }
});