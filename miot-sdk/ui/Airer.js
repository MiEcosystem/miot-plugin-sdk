import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated, Easing, PanResponder, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { adjustSize } from '../utils/sizes';
import { log } from '../utils/fns';
import { getContentEventKey } from './PageWithNormalNavigator';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../utils/accessibility-helper';
const SourceUpper = require('../resources/images/airer-upper.png');
const SourceCenter = require('../resources/images/airer-center.png');
const SourceLower = require('../resources/images/airer-lower.png');
const SourceLight = require('../resources/images/airer-light.png');
const CenterHeight = adjustSize(585);
function getCurrentValue(lastValue, moveY, min = 0, max = 100) {
  let diffValue = 100 / CenterHeight * moveY;
  let value = lastValue - diffValue;
  return Math.min(max, Math.max(min, value));
}
export default class Airer extends Component {
  static propTypes = {
    position: PropTypes.number,
    lightOn: PropTypes.bool,
    controlable: PropTypes.bool,
    onValueChanging: PropTypes.func,
    onValueChange: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    position: 0,
    lightOn: false,
    controlable: false,
    onValueChanging: log,
    onValueChange: log
  };
  contentEventKey = getContentEventKey();
  currValue = 0;
  lastValue = 0;
  value = new Animated.Value(0);
  moveY = new Animated.Value(0);
  animateToPosition(position, duration = 30) {
    if (isNaN(position) || !isFinite(position)) {
      return;
    }
    this.stopAnimation();
    let currValue = this.currValue;
    this.aniPosition = Animated.timing(this.value, {
      toValue: position,
      duration: Math.abs(currValue - position) * duration,
      easing: Easing.inOut(Easing.linear)
    }).start();
  }
  stopAnimation() {
    this.aniPosition && this.aniPosition.stop();
  }
  initPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onShouldBlockNativeResponder: () => false,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        DeviceEventEmitter.emit(this.contentEventKey, {
          scrollEnabled: false
        });
      },
      onPanResponderMove: Animated.event([null, {
        dy: this.moveY
      }]),
      onPanResponderRelease: this.touchEnd.bind(this),
      onPanResponderTerminate: this.touchEnd.bind(this)
    });
  }
  touchEnd() {
    this.lastValue = this.currValue;
    this.props.onValueChange(this.lastValue);
    DeviceEventEmitter.emit(this.contentEventKey, {
      scrollEnabled: true
    });
  }
  onAccessibilityAction = ({ nativeEvent: { actionName } }) => {
    const { controlable, onValueChange } = this.props;
    if (!controlable) {
      return;
    }
    let targetValue = this.lastValue;
    switch (actionName) {
      case 'increment':
        targetValue += 10;
        break;
      case 'decrement':
        targetValue -= 10;
        break;
    }
    targetValue = Math.min(100, Math.max(0, targetValue));
    this.value.setValue(targetValue);
    this.lastValue = targetValue;
    onValueChange(targetValue);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let props = this.props;
    this.lastValue = nextProps.position;
    if (nextProps && props && nextProps.position === props.position) {
      return;
    }
    this.animateToPosition(nextProps.position);
  }
  UNSAFE_componentWillMount() {
    this.moveY.addListener((e) => {
      let currValue = getCurrentValue(this.lastValue, e.value);
      this.animateToPosition(currValue, 0);
      this.props.onValueChanging(currValue);
    });
    this.initPanResponder();
  }
  componentDidMount() {
    this.value.addListener(({ value }) => {
      this.currValue = value;
    });
  }
  componentWillUnmount() {
    this.stopAnimation();
  }
  render() {
    let { lightOn, controlable } = this.props;
    let { value } = this;
    let height = value.interpolate({
      inputRange: [0, 100],
      outputRange: [CenterHeight, 0]
    });
    let panHandlers = controlable ? this.panResponder.panHandlers : {};
    return (
      <View style={Styles.container} {...panHandlers}
        {...getAccessibilityConfig({
          accessible: controlable ? this.props.accessible : false,
          accessibilityRole: AccessibilityRoles.adjustable,
          accessibilityHint: this.props.accessibilityHint
        })}
        accessibilityActions={[
          { name: 'increment' },
          { name: 'decrement' }
        ]}
        onAccessibilityAction={this.onAccessibilityAction}
      >
        <Image style={Styles.upper} source={SourceUpper} />
        <Animated.Image style={[Styles.center, {
          height
        }]} source={SourceCenter} />
        <Animated.Image style={[Styles.light, lightOn ? {
          height
        } : {
          display: 'none',
          height: 0
        }]} source={SourceLight} />
        <Image style={Styles.lower} source={SourceLower} />
        <Animated.View style={[Styles.btnWrap, {
          top: height,
          opacity: controlable ? 1 : 0
        }]}>
          <View style={Styles.btn}>
            <View style={Styles.btnInner}></View>
          </View>
        </Animated.View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: adjustSize(90),
    paddingBottom: adjustSize(222),
    height: adjustSize(1035)
  },
  upper: {
    zIndex: 40,
    width: adjustSize(738),
    height: adjustSize(93),
    resizeMode: 'stretch'
  },
  center: {
    zIndex: 30,
    width: adjustSize(636),
    height: CenterHeight,
    marginTop: adjustSize(-9),
    resizeMode: 'stretch'
  },
  light: {
    zIndex: 20,
    width: adjustSize(858),
    height: adjustSize(369),
    resizeMode: 'stretch',
    position: 'absolute',
    top: adjustSize(183)
  },
  lower: {
    zIndex: 10,
    width: adjustSize(984),
    height: adjustSize(132),
    marginTop: adjustSize(-78),
    resizeMode: 'stretch'
  },
  btnWrap: {
    zIndex: 31,
    position: 'absolute',
    marginTop: adjustSize(195),
    alignSelf: 'center',
    overflow: 'hidden'
  },
  btn: {
    width: adjustSize(120),
    height: adjustSize(120),
    marginTop: adjustSize(-60),
    borderRadius: adjustSize(60),
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  btnInner: {
    width: adjustSize(48),
    height: adjustSize(9),
    borderRadius: adjustSize(6),
    backgroundColor: '#3daeff',
    marginTop: adjustSize(81)
  }
});