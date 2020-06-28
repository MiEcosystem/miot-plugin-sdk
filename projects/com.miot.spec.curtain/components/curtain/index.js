import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, PanResponder, Animated } from 'react-native';

const SourceBg = require('./res/bg.png');
const SourceCurtainBase = require('./res/curtain-base.png');
const SourceCurtain = require('./res/curtain.png');
const SourceButton = require('./res/button.png');

import getPercent from '../../modules/getPercent';
import { WIDTH, HEIGHT, isIphoneX, shadowUpperMinRatio, shadowUpperMaxRatio, shadowLowerMinRatio, shadowLowerMaxRatio, splitY, curtainBgSplitRatio, curtainBgHeight, curtainBgWidth, curtainBaseWidth, curtainBaseHeight, curtainWidth, curtainHeight, curtainTop, buttonWidth, buttonHeight, buttonTop, getCurtainTop } from '../../modules/consts';


export default class extends Component {
  state = {
    currentValue: new Animated.Value(0),
    opening: true,
    top: splitY() * HEIGHT() - curtainBgSplitRatio * curtainBgHeight - 0
  };

  panResponderLeft = {
    panHandlers: {}
  };
  panResponderRight = {
    panHandlers: {}
  };
  currentValue = 0;
  touchStartValue = 0;
  currentTouchSide = null;

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if(nextProps.value === prevState.currentValue) {
  //     return {};
  //   }
  //   return {
  //     currentValue: nextProps.value
  //   };
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // this.animateTo(nextProps.value);
  }

  componentDidMount() {
    getCurtainTop().then((top) => {
      this.setState({
        top
      });
    }).catch((_) => { });

    this.initPanResponder();
  }

  animateTo = (value, isTouch) => {
    this.aniValue && this.aniValue.stop();
    if (Math.abs(value - this.currentValue) < 1 || isNaN(value)) {
      return;
    }
    if (typeof this.props.ontouchstart === 'function' && isTouch) {
      this.props.ontouchstart();
    }
    this.aniValue = Animated.timing(this.state.currentValue, {
      toValue: value,
      duration: isTouch ? 0 : Math.abs(this.currentValue - value) * 20
    }).start(() => {
      if (typeof this.props.ontouchend === 'function' && isTouch) {
        this.props.ontouchend();
      }
    });
    this.currentValue = value;
  }

  initPanResponder = () => {
    this.panResponderLeft = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: (e, gestureState) => {
        // console.log(gestureState);
        this.currentTouchSide = 'left';
        this.touchStart(gestureState);
      },
      onPanResponderMove: (e, gestureState) => {
        // console.log(gestureState);
        this.touchMove(gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        // console.log(gestureState);
        this.touchEnd(gestureState);
        this.currentTouchSide = null;
      },
      onPanResponderTerminate: (e, gestureState) => {
        // console.log(gestureState);
        this.touchCancel(gestureState);
        this.currentTouchSide = null;
      }
    });

    this.panResponderRight = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: (e, gestureState) => {
        // console.log(gestureState);
        this.currentTouchSide = 'right';
        this.touchStart(gestureState);
      },
      onPanResponderMove: (e, gestureState) => {
        // console.log(gestureState);
        this.touchMove(gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        // console.log(gestureState);
        this.touchEnd(gestureState);
        this.currentTouchSide = null;
      },
      onPanResponderTerminate: (e, gestureState) => {
        // console.log(gestureState);
        this.touchCancel(gestureState);
        this.currentTouchSide = null;
      }
    });
  }

  touchStart = (gestureState) => {
    this.touchStartValue = this.currentValue;
  }
  touchMove = (gestureState) => {
    // this.rafMove && cancelAnimationFrame(this.rafMove);
    // this.rafMove = requestAnimationFrame(() => {
    let currentTouchSide = this.currentTouchSide;
    if (!currentTouchSide) {
      return;
    }
    let vx = gestureState.vx;
    let diffValue = this.getValueFromUpperDiffX(gestureState.dx * (currentTouchSide === 'left' ? -1 : 1));
    let targetValue = Math.min(100, Math.max(0, diffValue + this.touchStartValue));
    this.animateTo(targetValue, true);
    this.setState((state) => {
      let opening = state.opening;
      if ((vx < 0 && currentTouchSide === 'left') || (vx > 0 && currentTouchSide === 'right')) {
        opening = true;
      } else if ((vx > 0 && currentTouchSide === 'left') || (vx < 0 && currentTouchSide === 'right')) {
        opening = false;
      }
      return {
        opening
      };
    });
    this.emitChanging(targetValue);
    // });
  }
  touchEnd = (gestureState) => {
    // 触发onChange回调
    let currentTouchSide = this.currentTouchSide;
    if (!currentTouchSide) {
      return;
    }
    let vx = gestureState.vx;
    let diffValue = this.getValueFromUpperDiffX(gestureState.dx * (currentTouchSide === 'left' ? -1 : 1));
    let targetValue = Math.round(Math.min(100, Math.max(0, diffValue + this.touchStartValue)));
    if (targetValue === this.touchStartValue) {
      return;
    }
    this.animateTo(targetValue, true);
    this.emitChanged(targetValue);
  }
  touchCancel = (gestureState) => {
    // 恢复之前的值
    this.animateTo(this.touchStartValue, true);
  }

  emitChanging = (value) => {
    if (typeof this.props.onChanging === 'function') {
      this.props.onChanging(value);
    }
  }

  emitChanged = (value) => {
    if (typeof this.props.onChanged === 'function') {
      this.props.onChanged(value);
    }
  }

  getUpperDiffXFromValue = (currentValue) => {
    let value = Math.min(100, Math.max(0, currentValue));
    return (1 - getPercent(value, 0, 100, shadowUpperMinRatio, shadowUpperMaxRatio)) * WIDTH / 2;
  }

  getValueFromUpperDiffX = (upperDiffX) => {
    return upperDiffX * 2 / WIDTH / shadowUpperMaxRatio * 100;
  }

  render() {
    let { top, currentValue, opening } = this.state;
    let upperCurtainX = this.getUpperDiffXFromValue(100);
    let upperCurtainBaseX = upperCurtainX - curtainBaseWidth + 2;

    let upperCurtainWidth = currentValue.interpolate({
      inputRange: [0, 100],
      outputRange: [this.getUpperDiffXFromValue(0) - upperCurtainX, 0]
    });
    let upperButtonX = currentValue.interpolate({
      inputRange: [0, 100],
      outputRange: [this.getUpperDiffXFromValue(0) - buttonWidth, upperCurtainX - buttonWidth]
    });

    return (
      <View style={[Styles.container, {
        paddingTop: top
      }]}>
        <View style={Styles.containerInner}>
          <Image style={Styles.bg} source={SourceBg} />
          <Image style={[Styles.curtainBase, Styles.curtainBaseLeft, {
            left: upperCurtainBaseX
          }]} source={SourceCurtainBase} />
          <Animated.Image source={SourceCurtain} style={[Styles.curtainWrap, Styles.curtainWrapLeft, {
            width: upperCurtainWidth
          }]} />
          <Animated.Image source={SourceCurtain} style={[Styles.curtainWrap, Styles.curtainWrapRight, {
            width: upperCurtainWidth
          }]} />
          <Image style={[Styles.curtainBase, Styles.curtainBaseRight, {
            right: upperCurtainBaseX
          }]} source={SourceCurtainBase} />
          <Animated.Image style={[Styles.button, {
            left: upperButtonX,
            transform: [{
              scaleX: opening ? 1 : -1
            }]
          }]} source={SourceButton} {...this.panResponderLeft.panHandlers} />
          <Animated.Image style={[Styles.button, {
            right: upperButtonX,
            transform: [{
              scaleX: opening ? -1 : 1
            }]
          }]} source={SourceButton} {...this.panResponderRight.panHandlers} />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  bg: {
    position: 'absolute',
    top: 0,
    width: curtainBgWidth,
    height: curtainBgHeight
  },
  curtainBase: {
    position: 'absolute',
    top: curtainTop,
    height: curtainBaseHeight
  },
  curtainBaseLeft: {

  },
  curtainBaseRight: {
    transform: [{
      scaleX: -1
    }]
  },
  curtainWrap: {
    top: curtainTop,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#fcfcde',
    resizeMode: 'stretch',
    height: curtainBaseHeight
  },
  curtainWrapLeft: {
    left: (1 - shadowUpperMaxRatio) * WIDTH / 2
  },
  curtainWrapRight: {
    right: (1 - shadowUpperMaxRatio) * WIDTH / 2,
    transform: [{
      scaleX: -1
    }]
  },
  button: {
    position: 'absolute',
    top: buttonTop,
    width: buttonWidth,
    height: buttonHeight
  }
});
