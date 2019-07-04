import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

class AnimatedSVGDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rotateZ: new Animated.Value(0),
    }
  }

  componentDidMount() {
    let { rotateZ } = this.state;

    let animation = Animated.timing(                  // 随时间变化而执行动画
      rotateZ,                        // 动画中的变量值
      {
        toValue: 360,
        duration: 4000
      }
    );

    Animated.loop(animation).start();
  }

  render() {
    let { rotateZ } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.rotateView,
          {
            transform: [
              {
                rotateZ: rotateZ.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                })
              },
              { perspective: 1000 } // without this line this Animation will not render on Android while working fine on iOS
            ]
          }
        ]}>
          <Svg height="200" width="200">
            <Circle
              cx="100"
              cy="100"
              r="80"
              stroke="yellow"
              strokeWidth="10"
              fill="transparent"
            />
          </Svg>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  rotateView: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: 'black',
    width: 200
  }
});

export default AnimatedSVGDemo;