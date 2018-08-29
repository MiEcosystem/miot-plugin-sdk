'use strict';

import React from 'react';

import {
  Animated,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  View,
  Easing,
  ImageBackground,
} from 'react-native';

var LocalizedStrings = require('./MHLocalizableString.js').string;
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ratioW = screenWidth / 752;

export default class Tip extends React.Component {
  constructor(props) {
    super(props);
    this.container = props.showBubble ? {} : { justifyContent: "center" };
    this.bigIcon = props.showBubble ? { marginTop: 190 * ratioW } : {};
    this.iconSize = props.iconSize ? { width: props.iconSize, height: props.iconSize } : {};

    this.bubbleHeight = new Animated.Value(0);
    this.bubbleWidth = new Animated.Value(0);
    this.dialogText = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.bubbleHeight.setValue(0.1);
    this.bubbleWidth.setValue(0.1);
    this.dialogText.setValue(0.1);
    const createAnimation = function (value, easing, duration = 600, delay = 0) {
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
      createAnimation(this.bubbleHeight, Easing.ease),
      createAnimation(this.bubbleWidth, Easing.ease),
      createAnimation(this.dialogText, Easing.ease),
    ]).start()
  }

  render() {
    const tip = LocalizedStrings.youCanSayLikeThis;

    const bubbleHeight = this.bubbleHeight.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 42 * ratioW, 84 * ratioW]
    });
    const bubbleWidth = this.bubbleWidth.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 285 * ratioW, 570 * ratioW]
    });
    const dialogText = this.dialogText.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 17 * ratioW, 34 * ratioW]
    });

    return (
      <View
        style={[styles.container, this.container, { backgroundColor: this.props.backgroundColor }]}
      >
        <Image style={[styles.bigIcon, this.bigIcon, this.iconSize]} source={this.props.iconUri} />
        {this.props.showBubble &&
          <Text style={styles.subTitle}>{tip}</Text>
        }
        {this.props.showBubble &&
          <View style={{ width: screenWidth, flex: 1 }}>
            <Animated.Image
              resizeMode="contain"
              source={require('../../Resources/common/clock_alarmclock_bubble_normal.png')}
              style={[
                styles.bubble,
                { height: bubbleHeight, width: bubbleWidth }
              ]}
            />
            <Animated.View
              style={[
                styles.bubble,
                { height: bubbleHeight, width: bubbleWidth, justifyContent: "center" }
              ]}
            >
              <Animated.Text style={[styles.dialog, { fontSize: dialogText }]}>{this.props.dialogText}</Animated.Text>
            </Animated.View>
          </View>
        }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 684 * ratioW,
    alignItems: 'center',
  },
  bigIcon: {
    width: 204 * ratioW,
    height: 204 * ratioW,
  },
  subTitle: {
    marginTop: 34 * ratioW,
    fontSize: 26 * ratioW,
    color: "rgba(255,255,255,0.6)"
  },
  bubble: {
    position: "absolute",
    right: (screenWidth - 570 * ratioW) / 2,
    bottom: 106 * ratioW,
  },
  dialog: {
    alignSelf: 'center',
    color: '#ffffff',
  },
});
