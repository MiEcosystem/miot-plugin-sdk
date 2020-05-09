import React, {PureComponent, Component} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';
import {Svg, Defs, LinearGradient, Stop, Path, Ellipse, ClipPath} from 'react-native-svg';
import PropTypes from 'prop-types';
import {adjustSize} from '../utils/sizes';
const Size708 = adjustSize(708);
function getCircleCenter(type, index) {
  switch(type) {
    case 0:
    case 1:
      return {
        x: 0,
        y: 0
      };
    case 2:
      return {
        x: ([3, -2, -1, 2])[index] || 0,
        y: 0
      };
    case 3:
      return {
        x: ([2, -2, -1, 0])[index] || 0,
        y: 0
      };
    case -1:
    default:
      return {
        x: 0,
        y: 0
      };
  }
}
function getCircleColors(type, index) {
  switch(type) {
    case 0:
      return ([['#475154'], ['#475154', '#4A5867'], ['#2D3947'], ['#F7F7F7']])[index] || '#475154';
    case 1:
      return ([['#00AEFF'], ['#00AEFF', '#5BCCFF'], ['#007DFF'], ['#F7F7F7']])[index] || '#00AEFF';
    case 2:
      return ([['#00B7AF'], ['#00B7AF', '#0BCEB7'], ['#05CFC6'], ['#F7F7F7']])[index] || '#00B7AF';
    case 3:
      return ([['#7538F7'], ['#7538F7', '#B88CFF'], ['#7231FB'], ['#F7F7F7']])[index] || '#7538F7';
    case 4:
      return ([['#5067F9'], ['#5067F9', '#589BFB'], ['#2240F7'], ['#F7F7F7']])[index] || '#5067F9';
    default:
      return ([['#FFFFFF'], ['#FFFFFF', '#FFFFFF'], ['#FFFFFF'], ['#F7F7F7']])[index] || '#FFFFFF';
  }
}
function getCircleOpacity(type, index) {
  switch(type) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      return ([0.2, 1, 1, 1])[index] || 1;
    case -1:
    default:
      return ([0.2, 0.6, 1, 1])[index] || 1;
  }
}
class Circle extends Component {
  state = {
    rotation: new Animated.Value(0)
  };
  inited = false;
  currentValue = 0;
  rotate({disabled, duration = 4000}) {
    if(!this.inited) {
      return;
    }
    if(disabled) {
      this.stopRotation();
      return;
    }
    this.startRotation(duration);
  }
  startRotation(duration = 4000, isReset = false) {
    this.stopRotation();
    this.aniRotation = Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: isReset ? duration : duration * ((1 - this.currentValue) || 0.01),
      easing: Easing.inOut(Easing.linear)
    }).start(({finished}) => {
      if(finished) {
        if(this.props.disabled) {
          return;
        }
        this.state.rotation.setValue(0);
        this.startRotation(this.props.duration, true);
      }
    });
  }
  stopRotation() {
    // this.aniRotation && this.aniRotation.stop();
    this.state.rotation.stopAnimation(v => {
      this.currentValue = v;
    });
    this.aniRotation = null;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.disabled) {
      this.stopRotation();
      return;
    }
    if(nextProps && this.props && nextProps.duration === this.props.duration && nextProps.disabled === this.props.disabled) {
      return;
    }
    this.rotate(nextProps || {});
  }
  componentDidMount() {
    this.inited = true;
    this.rotate(this.props);
  }
  componentWillUnmount() {
    this.stopRotation();
  }
  render() {
    let {color, opacity, rx, ry, center: {x, y}, initRotation, counterClock, centerInner: {x: ix, y: iy}, rxInner, ryInner} = this.props;
    let {rotation} = this.state;
    let r = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: !counterClock ? ['0deg', '360deg'] : ['360deg', '0deg']
    });
    let d = `
      M${118 + x - rx} ${118 + y}
      A${rx} ${ry} 0 0 1 ${118 + x + rx} ${118 + y}
      L${118 + ix + rxInner} ${118 + iy}
      A${rxInner} ${ryInner} 0 0 0 ${118 + ix - rxInner} ${118 + iy}
      A${rxInner} ${ryInner} 0 0 0 ${118 + ix + rxInner} ${118 + iy}
      L${118 + x + rx} ${118 + y}
      A${rx} ${ry} 0 0 1 ${118 + x - rx} ${118 + y}
    `;
    return (
      <Animated.View style={[Styles.circleWrap, {
        transform: [{
          rotate: r
        }]
      }]}>
        <Svg width={Size708} height={Size708} viewBox="0 0 236 236">
          <Defs>
            <LinearGradient id="circleGradient" x1="0" y1="0" x2="236" y2="236">
              <Stop offset="0" stopColor={color[1] || color[0]} stopOpacity={opacity} />
              <Stop offset="1" stopColor={color[0]} stopOpacity={opacity} />
            </LinearGradient>
          </Defs>
          <Path rotation={0} origin={118, 118} d={d} fill="url(#circleGradient)" />
        </Svg>
      </Animated.View>
    );
  }
}
export default class Fan extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    // 默认情况下，disable时为黑色，当此值为true时，可以在暂停动画的基础上，使用type对应的颜色
    noDisableColor: PropTypes.bool,
    speedLevel: PropTypes.number,
    // 白色/关闭/直吹风/自然风/睡眠风/自动
    type: PropTypes.oneOf([-1, 0, 1, 2, 3, 4]),
    // 中心颜色一定要填，因为根据ui动效分解图，用多个圆叠加起来实现，中心会有外层圆的颜色
    // 20/02/18优化逻辑，可以去掉此参数
    // centerColor: PropTypes.any
  };
  static defaultProps = {
    disabled: false,
    noDisableColor: false,
    speedLevel: 1,
    type: -1
  };
  render() {
    let {disabled, type, speedLevel, noDisableColor} = this.props;
    let centerInner = getCircleCenter(type, 3);
    let rxInner = 91;
    let ryInner = 91;
    return (
      <View style={Styles.container}>
        <Circle disabled={disabled} initRotation={-15} counterClock={true} opacity={getCircleOpacity(disabled ? 0 : type, 0)} color={getCircleColors(disabled && !noDisableColor ? 0 : type, 0)} duration={6000 / speedLevel} type={type} rx={113} ry={107} center={getCircleCenter(type, 0)} centerInner={centerInner} rxInner={rxInner} ryInner={ryInner} />
        <Circle disabled={disabled} initRotation={0} counterClock={false} opacity={getCircleOpacity(disabled ? 0 : type, 1)} color={getCircleColors(disabled && !noDisableColor ? 0 : type, 1)} duration={5200 / speedLevel} type={type} rx={105} ry={105} center={getCircleCenter(type, 1)} centerInner={centerInner} rxInner={rxInner} ryInner={ryInner} />
        <Circle disabled={disabled} initRotation={45} counterClock={false} opacity={getCircleOpacity(disabled ? 0 : type, 2)} color={getCircleColors(disabled && !noDisableColor ? 0 : type, 2)} duration={4000 / speedLevel} type={type} rx={102} ry={95} center={getCircleCenter(type, 2)} centerInner={centerInner} rxInner={rxInner} ryInner={ryInner} />
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    marginVertical: adjustSize(165),
    width: Size708,
    height: Size708,
    alignSelf: 'center'
  },
  circleWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }
});