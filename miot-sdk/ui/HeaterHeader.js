import React, { Component, PureComponent } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { adjustSize } from '../utils/sizes';
import { FontDefault } from '../utils/fonts';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../utils/accessibility-helper';
const Source0 = require('../resources/images/heater-dot0.png');
const Source1 = require('../resources/images/heater-dot1.png');
const Source2 = require('../resources/images/heater-dot2.png');
const Source3 = require('../resources/images/heater-dot3.png');
const Source4 = require('../resources/images/heater-dot4.png');
const Source5 = require('../resources/images/heater-dot5.png');
const Source6 = require('../resources/images/heater-dot6.png');
function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
export default class HeaterHeader extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    themeColor: PropTypes.any,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel
  };
  render() {
    let { title, disabled, themeColor } = this.props;
    let color = disabled ? '#47525F' : (themeColor || '#FA9E19');
    if (!title) {
      return null;
    }
    return (
      <View style={Styles.container} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.text,
        accessibilityLabel: this.props.accessibilityLabel
      })}>
        <Text style={[Styles.title, {
          color
        }]}>{title}</Text>
      </View>
    );
  }
}
class Dot extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.height,
    source: PropTypes.any
  };
  state = {
    progress: new Animated.Value(0)
  };
  startAnimation() {
    this.ani && this.ani.stop();
    this.ani = Animated.timing(this.state.progress, {
      toValue: 1,
      duration: getRandomBetween(12000, 24000)
    }).start(({ finished }) => {
      if (finished) {
        this.state.progress.setValue(0);
        this.startAnimation();
      }
    });
  }
  stopAnimation() {
    this.ani && this.ani.stop();
  }
  componentDidMount() {
    this.startAnimation();
  }
  componentWillUnmount() {
    this.stopAnimation();
  }
  render() {
    let { width, height, source } = this.props;
    let { progress } = this.state;
    let originLeft = getRandomBetween(20, 350);
    let opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    let bottom = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [`${ getRandomBetween(0, 20) }%`, '100%']
    });
    let left = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [originLeft - 3, originLeft + 3]
    });
    return (
      <Animated.Image style={[StylesDot.container, {
        width,
        height,
        opacity,
        bottom,
        left
      }]} source={source} />
    );
  }
}
class Dot0 extends Component {
  render() {
    return (
      <Dot width={26} height={28} source={Source0} />
    );
  }
}
class Dot1 extends Component {
  render() {
    return (
      <Dot width={4} height={4} source={Source1} />
    );
  }
}
class Dot2 extends Component {
  render() {
    return (
      <Dot width={3} height={3} source={Source2} />
    );
  }
}
class Dot3 extends Component {
  render() {
    return (
      <Dot width={16} height={16} source={Source3} />
    );
  }
}
class Dot4 extends Component {
  render() {
    return (
      <Dot width={8} height={8} source={Source4} />
    );
  }
}
class Dot5 extends Component {
  render() {
    return (
      <Dot width={22} height={22} source={Source5} />
    );
  }
}
class Dot6 extends Component {
  render() {
    return (
      <Dot width={83} height={83} source={Source6} />
    );
  }
}
export class Background extends Component {
  static propTypes = {
    on: PropTypes.bool,
    themeColor: PropTypes.any
  };
  static defaultProps = {
    on: false,
    themeColor: null
  };
  getDots() {
    // let { themeColor } = this.props;
    let dots = [];
    let Dots = [Dot0, Dot1, Dot2, Dot3, Dot4, Dot5, Dot6].reverse();
    let dotCount = [14, 11, 18, 10, 11, 10, 11].reverse();
    dotCount.forEach((c, index) => {
      let DotN = Dots[index];
      for (let i = 0; i < c; i++) {
        dots.push(
          <DotN key={String(index) + String(i)} />
        );
      }
    });
    return dots;
  }
  render() {
    let { on } = this.props;
    if (!on) {
      return null;
    }
    let dots = this.getDots();
    return (
      <View style={StylesBackground.container}>
        {dots}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    paddingVertical: adjustSize(195)
  },
  title: {
    fontFamily: FontDefault,
    fontSize: adjustSize(210),
    textAlign: 'center',
    color: '#f00'
  }
});
const StylesDot = StyleSheet.create({
  container: {
    position: 'absolute',
    resizeMode: 'contain'
  }
});
const StylesBackground = StyleSheet.create({
  container: {
    height: adjustSize(1263)
  }
});