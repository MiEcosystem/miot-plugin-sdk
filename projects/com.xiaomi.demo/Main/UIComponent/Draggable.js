import Block from "miot/ui/Gear/Block";
import React, { Component } from "react";
import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";

export default class Draggable extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.Value(0),
      scale: new Animated.Value(1),
    };
    this.currentLocation = 0; // 记录当前拖拽组件的相对位置
    this._onMoveShouldSetPanResponder = true;
    this.state.pan.addListener(e => {
      if (e.value < 0) {
        this.currentLocation = 0;
        console.log('e.value, this.currentLocation', e.value, this.currentLocation);
        return;
      }
      if (e.value > 250) {
        this.currentLocation = 250;
        console.log('e.value, this.currentLocation', e.value, this.currentLocation);
        return;
      }
      this.currentLocation = e.value;
      console.log('e.value, this.currentLocation', e.value, this.currentLocation);
    });
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => this._onMoveShouldSetPanResponder,
      onMoveShouldSetPanResponderCapture: () => this._onMoveShouldSetPanResponder,
      onShouldBlockNativeResponder: () => false,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e, gesture) => {
        // 每次拖拽手势开始时，需要重置当前拖拽组件的相对位置为上次停留的位置
        console.log('onPanResponderGrant: this.currentLocation', this.currentLocation);
        console.log('drag start');
        this.state.pan.setOffset(this.currentLocation);
        this.state.pan.setValue(0);
        // clearTimeout(this.recoverTimer);
        // this.recoverTimer = null;
        Animated.timing(this.state.scale, {
          toValue: 1.3,
          duration: 100,
        }).start();
      },
      onPanResponderMove: Animated.event([null,
        { dx: this.state.pan }
      ]),
      onPanResponderRelease: this._onPanResponderRelease.bind(this)
    })
  }

  _onPanResponderRelease(e, gesture) {
    // 释放后就近放置
    const { moveX, moveY, x0, y0, dx, dy } = gesture;
    console.log('release');
    // this._onMoveShouldSetPanResponder = false;
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 100,
    }).start();
    console.log({ moveX, moveY, x0, y0, dx, dy });
  }

  // startDragAnimation() {
  //   console.log('long press, drag');
  //   this.recoverTimer = setTimeout(_ => this._onPanResponderRelease({}, {}), 1000);
  //   Animated.timing(this.state.scale, {
  //     toValue: 1.3,
  //     duration: 100,
  //   }).start();
  //   this._onMoveShouldSetPanResponder = true;
  // }

  render() {
    const panStyle = {
      transform: [
        {
          translateX: this.state.pan.interpolate({
            inputRange: [-1, 0, 250, 251],
            outputRange: [0, 0, 250, 250],
          })
        },
        {
          scale: this.state.scale
        }
      ]
    }

    return (
      <Block
        panHandlers={this.panResponder.panHandlers}
        style={[panStyle, styles.circle]}
      >
        <View style={styles.touchArea}>
          <View style={styles.innerCircle}>
            <Text style={{ fontSize: 25 }}>{'🤟'}</Text>
          </View>
        </View>
      </Block>
    );
  }
}

const CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: 20,
    left: 50,
  },
  touchArea: {
    backgroundColor: 'transparent',
    width: CIRCLE_RADIUS * 3,
    height: CIRCLE_RADIUS * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    backgroundColor: 'lightblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
