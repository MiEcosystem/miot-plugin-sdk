import React, {Component} from 'react';
import {StyleSheet, View, Image, Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import {adjustSize} from '../utils/sizes';
const SourceUpper = require('../resources/images/airer-upper.png');
const SourceCenter = require('../resources/images/airer-center.png');
const SourceLower = require('../resources/images/airer-lower.png');
const SourceLight = require('../resources/images/airer-light.png');
const CenterHeight = adjustSize(585);
export default class Airer extends Component {
  static propTypes = {
    position: PropTypes.number,
    lightOn: PropTypes.bool
  };
  static defaultProps = {
    position: 0,
    lightOn: false
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
      duration: Math.abs(currValue - position) * 3,
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
  render() {
    let {lightOn} = this.props;
    let {value} = this.state;
    let height = value.interpolate({
      inputRange: [0, 100],
      outputRange: [0, CenterHeight]
    });
    return (
      <View style={Styles.container}>
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
  }
});