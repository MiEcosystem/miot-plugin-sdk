import React, {Component} from 'react';
import {StyleSheet, View, Image, Animated, Easing, PanResponder} from 'react-native';
import PropTypes from 'prop-types';
import {adjustSize} from '../utils/sizes';
import {log} from '../utils/fns';
const SourceCurtainPole = require('../resources/images/curtain-pole.png');
const SourceCurtainLight = require('../resources/images/curtain-light.png');
const SourceCurtainDark = require('../resources/images/curtain-dark.png');
const SourceCurtainBg = require('../resources/images/curtain-bg.png');
const Width858 = adjustSize(858);
const Width429 = adjustSize(429);
const Width108 = adjustSize(108);
function getCurrentValue(type, isLeft, lastValue, moveX, min = 0, max = 100) {
  let diffValue = 100 / (type === 0 ? Width429 : Width858) * moveX;
  let value = lastValue + (isLeft ? -1 : 1) * diffValue;
  return Math.min(max, Math.max(min, value));
}
export default class Curtain extends Component {
  static propTypes = {
    // 0:双开，1:左，2:右
    type: PropTypes.oneOf([0, 1, 2]),
    position: PropTypes.number,
    onValueChanging: PropTypes.func,
    onValueChange: PropTypes.func
  };
  static defaultProps = {
    type: 0,
    position: 0,
    onValueChanging: log,
    onValueChange: log
  };
  currValue = 0;
  lastValue = 0;
  value = new Animated.Value(0);
  leftX = new Animated.Value(0);
  rightX = new Animated.Value(0);
  animateToPosition(position, duration = 30) {
    if(isNaN(position) || !isFinite(position)) {
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
  initPanResponder(type) {
    this.panResponderLeft = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: log,
      onPanResponderMove: Animated.event([null, {
        dx: this.leftX
      }]),
      onPanResponderRelease: this.touchEnd.bind(this),
      onPanResponderTerminate: this.touchEnd.bind(this)
    });
    this.panResponderRight = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: log,
      onPanResponderMove: Animated.event([null, {
        dx: this.rightX
      }]),
      onPanResponderRelease: this.touchEnd.bind(this),
      onPanResponderTerminate: this.touchEnd.bind(this)
    });
  }
  touchEnd(e, gestureState) {
    this.lastValue = this.currValue;
    this.props.onValueChange(this.lastValue);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let props = this.props;
    this.lastValue = nextProps.position;
    if(nextProps.type !== props.type) {
      this.initPanResponder(nextProps.type);
    }
    if(nextProps.position !== props.position) {
      this.animateToPosition(nextProps.position);
    }
  }
  componentWillMount() {
    this.leftX.addListener(e => {
      let currValue = getCurrentValue(this.props.type, true, this.lastValue, e.value);
      this.animateToPosition(currValue, 0);
      this.props.onValueChanging(currValue);
    });
    this.rightX.addListener(e => {
      let currValue = getCurrentValue(this.props.type, false, this.lastValue, e.value);
      this.animateToPosition(currValue, 0);
      this.props.onValueChanging(currValue);
    });
    this.initPanResponder(this.props.type);
  }
  componentDidMount() {
    this.value.addListener(({value}) => {
      this.currValue = value;
    });
  }
  componentWillUnmount() {
    this.stopAnimation();
  }
  getCurtains() {
    let {type} = this.props;
    let ret = [];
    let l = type === 0 ? 7 : 13;
    for(let i = 0; i < l; i++) {
      ret.push(
        <Image key={String(i)} style={Styles.curtainSingle} source={i % 2 === 0 ? SourceCurtainDark : SourceCurtainLight} />
      );
    }
    return ret;
  }
  render() {
    let {type} = this.props;
    let value = this.value;
    let curtains = this.getCurtains();
    let width = value.interpolate({
      inputRange: [0, 100],
      outputRange: type === 0 ? [Width429, Width108] : [Width858, Width108]
    });
    return (
      <View style={Styles.container}>
        <Image style={Styles.bg} source={SourceCurtainBg} />
        <Image style={Styles.pole} source={SourceCurtainPole} />
        <View style={Styles.curtains}>
          {[0, 1].indexOf(type) === -1 ? null : (
            <View style={Styles.curtainWrap} {...this.panResponderLeft.panHandlers}>
              <Animated.View style={[Styles.curtain, Styles.curtainLeft, {
                width
              }]}>
                {curtains}
                <View style={Styles.curtainBtn}>
                  <View style={Styles.curtainBtnInner}></View>
                </View>
              </Animated.View>
            </View>
          )}
          {[0, 2].indexOf(type) === -1 ? null : (
            <View style={Styles.curtainWrap} {...this.panResponderRight.panHandlers}>
              <Animated.View style={[Styles.curtain, Styles.curtainRight, {
                width
              }]}>
                {curtains}
                <View style={Styles.curtainBtn}>
                  <View style={Styles.curtainBtnInner}></View>
                </View>
              </Animated.View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: adjustSize(249),
    paddingBottom: adjustSize(60)
  },
  bg: {
    position: 'absolute',
    left: '50%',
    marginLeft: adjustSize(-540),
    top: adjustSize(249),
    width: adjustSize(1080),
    height: adjustSize(879),
    resizeMode: 'contain'
  },
  pole: {
    width: adjustSize(882),
    height: adjustSize(21),
    resizeMode: 'contain'
  },
  curtains: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: adjustSize(858)
  },
  curtainWrap: {
    flex: 1,
    height: adjustSize(858)
  },
  curtain: {
    position: 'absolute',
    height: adjustSize(858),
    flexDirection: 'row',
    overflow: 'hidden'
  },
  curtainSingle: {
    flex: 1,
    height: adjustSize(858)
  },
  curtainLeft: {
    left: 0
  },
  curtainRight: {
    right: 0,
    transform: [{
      scaleX: -1
    }]
  },
  curtainBtn: {
    position: 'absolute',
    width: adjustSize(120),
    height: adjustSize(120),
    top: '50%',
    marginTop: adjustSize(-60),
    borderRadius: adjustSize(60),
    right: 0,
    marginRight: adjustSize(-60),
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  curtainBtnInner: {
    width: adjustSize(9),
    height: adjustSize(48),
    borderRadius: adjustSize(6),
    backgroundColor: '#5898FF',
    marginLeft: adjustSize(30)
  }
});