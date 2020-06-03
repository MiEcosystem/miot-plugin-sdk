import React, { Component } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import Svg, { Rect, Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';

import getPercent from '../../modules/getPercent';

import { WIDTH, HEIGHT, isIphoneX, darkColorStart1, darkColorEnd1, darkColorStart2, darkColorEnd2, lightColorStart, lightColorEnd, shadowUpperMinRatio, shadowUpperMaxRatio, shadowLowerMinRatio, shadowLowerMaxRatio, splitY, getSafeExtraHeight, getColorBetween } from '../../modules/consts';

export default class extends Component {
  state = {
    currentValue: new Animated.Value(0),
    value: 0
  };

  currentValue = 0;

  animateTo = (value) => {
    // value = Math.max(100, Math.min(0, parseInt(value, 10)));
    this.aniValue && this.aniValue.stop();
    if (Math.abs(value - this.currentValue) < 1) {
      return;
    }
    this.aniValue = Animated.timing(this.state.currentValue, {
      toValue: value,
      duration: Math.abs(this.currentValue - value) * 20
    }).start();
    this.currentValue = value;
  }

  componentDidMount() {
    this.state.currentValue.addListener((v) => {
      if (isNaN(v.value)) {
        return;
      }
      this.setState({
        value: v.value
      });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // this.animateTo(nextProps.value);
  }

  render() {
    // value:0-全开，1-全关
    let { value } = this.state;
    value = Math.min(100, Math.max(0, value));
    let width = WIDTH;
    let height = HEIGHT();
    let splitHeight = height * splitY();
    let upperDiffX = (1 - getPercent(value, 0, 100, shadowUpperMinRatio, shadowUpperMaxRatio)) * width / 2;
    let lowerDiffX = (1 - getPercent(value, 0, 100, shadowLowerMinRatio, shadowLowerMaxRatio)) * width / 2;
    let darkColorStart = getColorBetween(value, darkColorStart1, darkColorStart2);
    let darkColorEnd = getColorBetween(value, darkColorEnd1, darkColorEnd2);

    let lightPoints = `${ upperDiffX },${ splitHeight } ${ width - upperDiffX },${ splitHeight } ${ width - lowerDiffX },${ height } ${ lowerDiffX },${ height }`;
    return (
      <View style={[StyleSheet.absoluteFill, Styles.container]}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${ width } ${ height }`}>
          <Defs>
            <LinearGradient id="dark" x1="0" y1="0" x2="0" y2={height}>
              <Stop offset="0" stopColor={darkColorStart} />
              <Stop offset="1" stopColor={darkColorEnd} />
            </LinearGradient>
            <LinearGradient id="light" x1="0" y1="0" x2="0" y2={splitHeight}>
              <Stop offset="0" stopColor={lightColorStart} />
              <Stop offset="1" stopColor={lightColorEnd} />
            </LinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill="url(#dark)"
          />
          <Polygon
            points={lightPoints}
            fill="url(#light)"
          />
        </Svg>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
