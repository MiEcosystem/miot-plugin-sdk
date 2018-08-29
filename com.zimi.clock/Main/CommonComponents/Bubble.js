'use strict';

import React from 'react';

import {
  Animated,
  Easing,
  PixelRatio,
  StyleSheet,
  View,
} from 'react-native';

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);

    this.height = new Animated.Value(0);
    this.leftWidth = new Animated.Value(0);
    this.rightWidth = new Animated.Value(0);
    this.dialogText = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.height.setValue(0.1);
    this.leftWidth.setValue(0.1);
    this.rightWidth.setValue(0.1);
    this.dialogText.setValue(0.1);
    const createAnimation = function (value, easing, delay = 0, duration = 400) {
      return Animated.timing(
        value,
        {
          toValue: 1,
          duration,
          easing,
          delay
        }
      )
    }
    Animated.parallel([
      createAnimation(this.height, Easing.ease, this.props.delay),
      createAnimation(this.leftWidth, Easing.ease, this.props.delay),
      createAnimation(this.rightWidth, Easing.ease, this.props.delay),
      createAnimation(this.dialogText, Easing.ease, this.props.delay),
    ]).start()
  }

  render() {
    const height = this.height.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.height]
    });
    const leftWidth = this.leftWidth.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.bubbleWidthLeft]
    });
    const rightWidth = this.rightWidth.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.bubbleWidthRight]
    });
    const dialogText = this.dialogText.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.fontSize]
    });

    var bubbleLeftStyle = {
      width: leftWidth,
      height: height,
    };
    var bubbleRightStyle = {
      width: rightWidth,
      height: height,
    };
    var textContainerStyle = {
      height: height,
      borderTopColor: this.props.color,
      borderBottomColor: this.props.color,
    };
    var textStyle = {
      fontSize: dialogText,
      color: this.props.color,
    };

    return (
      <View style={{ flexDirection: "row", position: "absolute", right: 20, bottom: 0 }}>
        <Animated.Image
          resizeMode="contain"
          source={this.props.rightBubbleleft}
          style={bubbleLeftStyle}
        />
        <Animated.View style={[styles.textContainer, textContainerStyle]}>
          <Animated.Text style={textStyle}>
            {this.props.text}
          </Animated.Text>
        </Animated.View>
        <Animated.Image
          resizeMode="contain"
          source={this.props.rightBubbleright}
          style={bubbleRightStyle}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  textContainer: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
});
