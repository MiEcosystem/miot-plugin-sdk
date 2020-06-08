import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, View, Image, Text, Animated, Easing } from 'react-native';

function getBackSource(on, active) {
  switch (true) {
    case (on && active): return require('./res/timing-bg-on-active.png');
    case (!on && active): return require('./res/timing-bg-off-active.png');
    case (on && !active): return require('./res/timing-on-normal.png');
    default: return require('./res/timing-off-normal.png');
  }
}

function getForeSource(on, active) {
  switch (true) {
    case (on && active): return require('./res/timing-indicator-on.png');
    case (!on && active): return require('./res/timing-indicator-on.png');
    default: return null;
  }
}

export default class extends PureComponent {
  state = {
    rotate1: new Animated.Value(0),
    rotate2: new Animated.Value(0)
  };

  rotations = {};

  startRotate(k, duration = 15000) {
    this.state[k].setValue(0);
    this.rotations[k] = Animated.timing(this.state[k], {
      toValue: 1,
      duration: duration,
      easing: Easing.linear
    }).start((_) => {
      if (_.finished && this.props.active) {
        this.startRotate(k, duration);
      }
    });
  }

  stopRotation(k) {
    this.rotations[k] && this.rotations[k].stop();
  }

  startRotations() {
    this.startRotate('rotate1', 30000);
    this.startRotate('rotate2', 15000);
  }

  componentDidMount() {
    if (this.props.active) {
      this.startRotations();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.active && !this.props.active) {
      this.startRotations();
      return;
    }
  }

  render() {
    let { on, active } = this.props;
    let back = getBackSource(on, active);
    let fore = getForeSource(on, active);
    let getForeRotation1 = () => {
      return {
        transform: [{
          rotateZ: this.state.rotate1.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }]
      };
    };
    let getForeRotation2 = () => {
      return {
        transform: [{
          rotateZ: this.state.rotate2.interpolate({
            inputRange: [0, 1],
            outputRange: ['135deg', '495deg']
          })
        }]
      };
    };
    return (
      <View>
        <Image source={back} />
        {active ? (
          <Fragment>
            <Animated.Image source={fore} style={[Styles.fore, getForeRotation1()]} />
            <Animated.Image source={fore} style={[Styles.fore, getForeRotation2()]} />
          </Fragment>
        ) : null}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  fore: {
    position: 'absolute',
    left: 39,
    top: 33
  }
});
