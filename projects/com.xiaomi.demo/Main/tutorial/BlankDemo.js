import React from 'react';

import {
  View,
  Image,
  Easing,
  Animated,
  Text
} from 'react-native';

import { DragGear, NormalGear, SlideGear } from "miot/ui/Gear";

export default class BlankDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.options = Array.from({ length: 101 }, (v, i) => `${ i + 40 }aaaa`);
    this.state = {
      fontSize1: 20,
      fontSize2: 20,
      slideGearSelectIndex: 0
    };
    this.rotation = new Animated.Value(0);
  }

  componentDidMount() {
    this.startAnimation(0);

    let index = 0;
    setInterval(() => {
      if (index >= 1000) {
        index = 0;
      } else {
        index = index + 1;
      }
      this.setState({
        fontSize1: 20 + Math.ceil(index / 40),
        fontSize2: 20 + index / 40.0
      });
    }, 10);

    let i = 0;
    setInterval(() => {
      i = i + 1;
      this.startAnimation(i % 2);
    }, 5000);
  }

  log(...args) {
    console.log(...args);
  }

  startAnimation(value) {
    Animated.timing(this.rotation, {
      toValue: value, // 目标值
      duration: 5000, // 动画时间
      easing: Easing.linear // 缓动函数
    }).start(() => console.log('conpleted'));
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text style={{ backgroundColor: 'gray', width: 200, height: 50, fontSize: this.state.fontSize1 }}>测试intSize</Text>
        <Text style={{ backgroundColor: 'gray', marginTop: 20, width: 200, height: 50, fontSize: this.state.fontSize2 }}>测试floatSize</Text>
        <Animated.Text style={{
          position: 'absolute', top: 450, width: 200, height: 50, textAlign: 'center',
          backgroundColor: 'gray',
          fontSize: 20, transform: [
            {
              scale: this.rotation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2]
              })
            }
          ]
        }}>测试trasnform</Animated.Text>

      </View >
    );
  }
}