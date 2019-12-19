import React, {Component} from 'react';
import {StyleSheet, View, Image, Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import {adjustSize} from '../utils/sizes';
const SourceCurtainPole = require('../resources/images/curtain-pole.png');
const SourceCurtainLight = require('../resources/images/curtain-light.png');
const SourceCurtainDark = require('../resources/images/curtain-dark.png');
const SourceCurtainBg = require('../resources/images/curtain-bg.png');
export default class Curtain extends Component {
  static propTypes = {
    // 0:双开，1:左，2:右
    type: PropTypes.oneOf([0, 1, 2]),
    position: PropTypes.number
  };
  static defaultProps = {
    type: 0,
    position: 0
  };
  state = {
    value: new Animated.Value(0)
  };
  currValue = 0;
  animateToPosition(position) {
    if(isNaN(position) || !isFinite(position)) {
      return;
    }
    this.stopAnimation();
    let currValue = this.currValue;
    this.aniPosition = Animated.timing(this.state.value, {
      toValue: position,
      duration: Math.abs(currValue - position) * 100,
      easing: Easing.inOut(Easing.linear)
    }).start();
  }
  stopAnimation() {
    this.aniPosition && this.aniPosition.stop();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    let props = this.props;
    if(nextProps && props && nextProps.position === props.position) {
      return;
    }
    this.animateToPosition(nextProps.position);
  }
  componentDidMount() {
    this.state.value.addListener(({value}) => {
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
    let {value} = this.state;
    let curtains = this.getCurtains();
    let width = value.interpolate({
      inputRange: [0, 100],
      outputRange: type === 0 ? [adjustSize(429), adjustSize(108)] : [adjustSize(858), adjustSize(108)]
    });
    return (
      <View style={Styles.container}>
        <Image style={Styles.bg} source={SourceCurtainBg} />
        <Image style={Styles.pole} source={SourceCurtainPole} />
        <View style={Styles.curtains}>
          {[0, 1].indexOf(type) === -1 ? null : (
            <Animated.View style={[Styles.curtain, Styles.curtainLeft, {
              width
            }]}>
              {curtains}
            </Animated.View>
          )}
          {[0, 2].indexOf(type) === -1 ? null : (
            <Animated.View style={[Styles.curtain, Styles.curtainRight, {
              width
            }]}>
              {curtains}
            </Animated.View>
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
  curtain: {
    position: 'absolute',
    // flex: 1,
    height: adjustSize(858),
    flexDirection: 'row'
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
  }
});