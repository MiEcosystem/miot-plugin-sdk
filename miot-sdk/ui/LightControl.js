//@native begin
import React, {Component, PureComponent, Fragment} from 'react';
import {StyleSheet, DeviceEventEmitter, View, ScrollView, Image, ART} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Device from '../device';
import NavigationBar from './NavigationBar';
import Separator from './Separator';
import {Styles as CommonStyle} from '../resources';
import PropTypes from 'prop-types';
import Lodash from 'lodash-node';
import {Svg, Rect, Defs, RadialGradient, LinearGradient, Stop} from 'react-native-svg';
import {DialogComponent} from '../utils/dialog-manager';
import {window, adjustSize} from '../utils/sizes';
import {log} from '../utils/fns';
import {transformHexToDigtal, transformDigtalToHex, colorGetterforRange} from '../utils/colors';
const SourceBrightnessHigh = require('../resources/images/brightness-high.png');
const SourceBrightnessLow = require('../resources/images/brightness-low.png');
const SourceTriangle = require('../resources/images/triangle.png');
const SourceBlur = require('../resources/images/blur.png');
function getOpacityFromBrightness(brightness) {
  return (50 - brightness / 2) / 100;
}
// const {Surface, LinearGradient, Shape, Path, RadialGradient} = ART;
const ColorRange = {
  '0.00': '#FF0000',
  '0.09': '#FF0081',
  '0.19': '#BF00FC',
  '0.28': '#0600F9',
  '0.38': '#007CFF',
  '0.48': '#00EEFF',
  '0.58': '#00FDA4',
  '0.68': '#01FF00',
  '0.77': '#9AFF00',
  '0.84': '#FFFA00',
  '0.94': '#FFA100',
  '1.00': '#FF0000'
};
const ColorTemperatureRange = {
  '0.00': '#CDE6FB',
  // '0.03': '#BBDEF2',
  // '0.06': '#FFEDC5',
  '1.00': '#FFAF01'
};
function getLinearStopsColor(range) {
  let ret = [];
  for(let k in range) {
    if(range.hasOwnProperty(k) && !isNaN(k) && k - 0 >= 0 && k - 1 <= 0) {
      ret.push(
        <Stop key={k} offset={k} stopColor={range[k]} stopOpacity="1" />
      );
    }
  }
  return ret;
}
const LinearStopsColor = getLinearStopsColor(ColorRange);
const LinearStopsColorTemperature = getLinearStopsColor(ColorTemperatureRange);
// const LinearGradientColor = new LinearGradient(ColorRange, 0, 0, adjustSize(900), 0);
// const LinearGradientColorTemperature = new LinearGradient(ColorTemperatureRange, 0, 0, adjustSize(900), 0);
const ColorGetter = colorGetterforRange(ColorRange);
const ColorTemperatureGetter = colorGetterforRange(ColorTemperatureRange);
function getBrightnessIndicatorBottom(percent) {
  percent = Math.max(0, Math.min(100, percent));
  return adjustSize(891 - 81 - 63 - 120) / 100 * percent + adjustSize(60 - 21);
}
function getColorOrColorTemperatureIndicatorLeft(percent) {
  percent = Math.max(0, Math.min(100, percent));
  return adjustSize(900 - 12) / 100 * percent + adjustSize(12);
}
function getColorTemperaturePercent(v, [min, max]) {
  return 100 - (v < min ? 0 : v > max ? 100 : min === max ? 50 : ((v - min) / (max - min) * 100));
}
function getColorTemperatureFromPercent(percent, [min, max]) {
  return min === max ? min : Math.round((max - min) * (100 - percent) / 100) + min;
}
function mergePercent(value = 0, min = 0, max = 1, targetMin = 0, targetMax = 1) {
  if(min >= max || targetMin >= targetMax || value >= max) {
    return targetMax;
  }
  if(value <= min) {
    return targetMin;
  }
  return (value - min) / (max - min) * (targetMax - targetMin) + targetMin;
}
export function getColorTemperatureColor(colorTemperature, [min, max, step]) {
  return ColorTemperatureGetter.getColorFromPercent(getColorTemperaturePercent(colorTemperature, [min, max, step]));
}
export class Background extends PureComponent {
  render() {
    let {disabled, brightness, supportBrightness, color, supportColor, colorTemperature, supportColorTemperature, colorTemperatureRange, pos, SourceBgOff} = this.props;
    let targetColor = supportColor ? transformDigtalToHex(color) : supportColorTemperature ? getColorTemperatureColor(colorTemperature, colorTemperatureRange) : '#FFEFCB';
    let WIDTH = window.width;
    let HEIGHT = window.height;
    return (
      <View style={StylesBackground.container}>
        {disabled ? (
          <Image style={StylesBackground.disabledContainer} source={SourceBgOff} />
        ) : ((
          <Fragment>
            <View style={[StylesBackground.colorOrColorTemperatureContainer, {
              backgroundColor: targetColor
            }]}></View>
            <Svg width={WIDTH} height={HEIGHT}>
              <Defs>
                <RadialGradient
                  id="radialGradient"
                  cx={WIDTH / 2}
                  cy={314 / 780 * HEIGHT}
                  rx={(1 - 314 / 780) * HEIGHT}
                  ry={(1 - 314 / 780) * HEIGHT}
                  fx={WIDTH / 2}
                  fy={314 / 780 * HEIGHT}
                >
                  <Stop offset="0" stopColor="#fff" stopOpacity="0.6" />
                  <Stop offset="1" stopColor="#fff" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#radialGradient)" />
            </Svg>
          </Fragment>
        ))}
        {disabled || !supportBrightness ? null : (
          <View style={[StylesBackground.brightness, {
            opacity: getOpacityFromBrightness(brightness)
          }]}></View>
        )}
        {(disabled || !pos) ? null : (
          <Image style={{
            position: 'absolute',
            left: pos.pageX,
            top: pos.pageY,
            width: adjustSize(192),
            height: adjustSize(192),
            marginLeft: adjustSize(-96),
            marginTop: adjustSize(-96),
            resizeMode: 'contain'
          }} source={SourceBlur} />
        )}
      </View>
    );
  }
}
export default class LightControl extends Component {
  static defaultProps = {
    disabled: false,
    supportBrightness: false,
    brightness: 20,
    brightnessRange: [0, 100, 1],
    onBrightnessChanging: log,
    onBrightnessChanged: log,
    supportColor: false,
    color: 128833,
    onColorChanging: log,
    onColorChanged: log,
    supportColorTemperature: false,
    colorTemperature: 4288,
    colorTemperatureRange: [2600, 7600, 1],
    onColorTemperatureChanging: log,
    onColorTemperatureChanged: log,
    onSetStart: log,
    onSetEnd: log
  };
  state = {
    // 0-非调节，1-垂直，2-水平
    direction: 0,
    brightness: 0,
    color: 0,
    colorTemperature: 0
  };
  static getDerivedStateFromProps(props, state) {
    let {direction} = state;
    // 操作中，不接受外部传props引起的更新
    let brightnessRange = props.brightnessRange;
    return direction ? null : {
      brightnessPercent: props.supportBrightness ? mergePercent(props.brightness, brightnessRange ? brightnessRange[0] : 0, brightnessRange ? brightnessRange[1] : 100, 0, 100) : 100,
      colorPercent: props.supportColor ? ColorGetter.getPercentFromColor(transformDigtalToHex(props.color)) * 100 : 0,
      colorTemperaturePercent: props.supportColorTemperature ? getColorTemperaturePercent(props.colorTemperature, props.colorTemperatureRange) : 0
    };
  }
  width = window.width;
  height = window.height;
  onLayout = e => {
    let layout = e.nativeEvent.layout;
    this.width = layout.width;
    this.height = layout.height;
  }
  initResponders() {
    let x0 = null, y0 = null;
    let brightnessPercent0 = null;
    let colorPercent0 = null;
    let onmove = Lodash.throttle(e => {
      let {disabled, supportBrightness, brightnessRange, onBrightnessChanging, supportColor, onColorChanging, supportColorTemperature, onColorTemperatureChanging, colorTemperatureRange, onSetStart} = this.props;
      let {direction} = this.state;
      let width = this.width;
      let height = this.height;
      if(disabled || x0 === null || y0 === null) {
        return;
      }
      let {pageX, pageY} = e;
      let diffX = pageX - x0;
      let diffY = pageY - y0;
      let absX = Math.abs(diffX);
      let absY = Math.abs(diffY);
      if(!direction && (absX > 5 || absY > 5)) {
        direction = absX < absY ? 1 : 2;
        this.setState({
          direction
        });
        typeof onSetStart === 'function' && onSetStart();
      }
      if(!direction) {
        return;
      }
      if(direction === 1 && supportBrightness && onBrightnessChanging) {
        let newBrightnessPercent = Math.min(100, Math.max(0, brightnessPercent0 - (diffY / adjustSize(660) * 100)));
        this.setState({
          brightnessPercent: newBrightnessPercent
        });
        onBrightnessChanging(Math.round(mergePercent(newBrightnessPercent, 0, 100, brightnessRange ? brightnessRange[0] : 0, brightnessRange ? brightnessRange[1] : 100)), {pageX, pageY});
        return;
      }
      if(direction === 2 && supportColor && onColorChanging) {
        // +100 是为了防止出现负数
        let newColorPercent = (colorPercent0 + (diffX / adjustSize(900) * 100) + 100) % 100;
        this.setState({
          colorPercent: newColorPercent
        });
        onColorChanging(transformHexToDigtal(ColorGetter.getColorFromPercent(newColorPercent)), {pageX, pageY});
        return;
      }
      if(direction === 2 && supportColorTemperature && onColorTemperatureChanging) {
        // +100 是为了防止出现负数
        let newColorTemperaturePercent = (colorTemperaturePercent0 + (diffX / adjustSize(900) * 100) + 100) % 100;
        this.setState({
          colorTemperaturePercent: newColorTemperaturePercent
        });
        onColorTemperatureChanging(Math.round(getColorTemperatureFromPercent(newColorTemperaturePercent, colorTemperatureRange)), {pageX, pageY});
        return;
      }
    }, 60);
    this.responders = {
      onStartShouldSetResponder: e => {
        let {disabled, supportBrightness, supportColor, supportColorTemperature} = this.props;
        return !disabled && (supportBrightness || supportColor || supportColorTemperature);
      },
      // onResponderTerminationRequest: e => {
      //   let {disabled} = this.props;
      //   return disabled;
      // },
      onResponderGrant: e => {
        let {pageX, pageY} = e.nativeEvent;
        x0 = pageX;
        y0 = pageY;
        brightnessPercent0 = this.state.brightnessPercent;
        colorPercent0 = this.state.colorPercent;
        colorTemperaturePercent0 = this.state.colorTemperaturePercent;
        this.setState({
          direction: 0
        });
      },
      onResponderMove: e => {
        onmove(e.nativeEvent);
      },
      onResponderRelease: e => {
        let {onSetEnd, supportBrightness, brightnessRange, onBrightnessChanged, supportColor, onColorChanged, supportColorTemperature, colorTemperatureRange, onColorTemperatureChanged} = this.props;
        this.setState(state => {
          let direction = state.direction;
          x0 = null;
          y0 = null;
          brightnessPercent0 = null;
          colorPercent0 = null;
          colorTemperaturePercent0 = null;
          if(direction === 1 && supportBrightness && typeof onBrightnessChanged === 'function') {
            onBrightnessChanged(Math.round(mergePercent(state.brightnessPercent, 0, 100, brightnessRange ? brightnessRange[0] : 0, brightnessRange ? brightnessRange[1] : 100)));
          }
          if(direction === 2 && supportColor && typeof onColorChanged === 'function') {
            onColorChanged(transformHexToDigtal(ColorGetter.getColorFromPercent(state.colorPercent)));
          }
          if(direction === 2 && supportColorTemperature && typeof onColorTemperatureChanged === 'function') {
            onColorTemperatureChanged(Math.round(getColorTemperatureFromPercent(state.colorTemperaturePercent, colorTemperatureRange)));
          }
          if(typeof onSetEnd === 'function') {
            onSetEnd();
          }
          return {
            direction: 0
          };
        });
        // this.setState({
        //   direction: 0
        // });
        // typeof onSetEnd === 'function' && onSetEnd();
      }
    };
  }
  removeResponders() {
    this.responders && (this.responders = null);
  }
  componentDidMount() {
    this.initResponders();
  }
  componentWillUnmount() {
    this.removeResponders();
  }
  render() {
    let {
      disabled,
      supportBrightness,
      supportColor,
      supportColorTemperature
    } = this.props;
    let {direction, brightnessPercent, colorPercent, colorTemperaturePercent} = this.state;
    let linearStops = supportColor ? LinearStopsColor : supportColorTemperature ? LinearStopsColorTemperature : null;
    let showBrightness = !disabled && supportBrightness && direction === 1;
    let showColorOrColorTemperature = !disabled && (supportColor || supportColorTemperature) && direction === 2;
    return (
      <View style={Styles.container} {...this.responders} onLayout={this.onLayout}>
        <View style={[Styles.brightness, {
          opacity: showBrightness ? 1 : 0
        }]}>
          <Image style={Styles.iconBrightnessHigh} source={SourceBrightnessHigh} />
          <View style={Styles.brightnessBar}>
            <View style={Styles.brightnessBarBack}>
              <View key={String(Math.round(Date.now() / 100))} style={[Styles.brightnessBarFore, {
                height: (brightnessPercent || 0) + '%'
              }]}></View>
            </View>
            <Image key={String(Math.round(Date.now() / 100))} style={[Styles.iconBrightnessIndicator, {
              bottom: getBrightnessIndicatorBottom(brightnessPercent || 0)
            }]} source={SourceTriangle} />
          </View>
          <Image style={Styles.iconBrightnessLow} source={SourceBrightnessLow} />
        </View>
        <View style={[Styles.colorOrColorTemperature, {
          opacity: showColorOrColorTemperature ? 1 : 0
        }]}>
          <Image style={[Styles.iconColorOrColorTemperatureIndicator, {
            left: getColorOrColorTemperatureIndicatorLeft(supportColor ? (colorPercent || 0) : (colorTemperaturePercent || 0))
          }]} source={SourceTriangle} />
          {showColorOrColorTemperature ? (
            <Svg width={adjustSize(900)} height={adjustSize(12)}>
              <Defs>
                <LinearGradient
                  id="linearGradient"
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                >
                  {linearStops}
                </LinearGradient>
              </Defs>
              <Rect width={adjustSize(900)} height={adjustSize(12)} fill="url(#linearGradient)" />
            </Svg>
          ) : null}
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  brightness: {
    position: 'absolute',
    left: adjustSize(84),
    width: adjustSize(117),
    height: adjustSize(891),
    top: adjustSize(210),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconBrightnessHigh: {
    width: adjustSize(90),
    height: adjustSize(81)
  },
  iconBrightnessLow: {
    width: adjustSize(48),
    height: adjustSize(63)
  },
  brightnessBar: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  brightnessBarBack: {
    marginVertical: adjustSize(60),
    width: adjustSize(18),
    flex: 1,
    borderRadius: adjustSize(120),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.24)',
    overflow: 'hidden'
  },
  brightnessBarFore: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff'
  },
  iconBrightnessIndicator: {
    position: 'absolute',
    right: 0,
    width: adjustSize(27),
    height: adjustSize(42)
  },
  colorOrColorTemperature: {
    position: 'absolute',
    width: adjustSize(942),
    left: '50%',
    marginLeft: adjustSize(-942 / 2),
    alignItems: 'center'
  },
  iconColorOrColorTemperatureIndicator: {
    alignSelf: 'flex-start',
    marginBottom: adjustSize(6),
    transform: [{
      rotateZ: '-90deg'
    }]
  },
  colorOrColorTemperatureBar: {
    width: adjustSize(900),
    height: adjustSize(12),
    backgroundColor: '#f00',
    borderRadius: adjustSize(6),
    overflow: 'hidden'
  }
});
const StylesBackground = StyleSheet.create({
  container: {
    flex: 1
  },
  disabledContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    resizeMode: 'cover'
  },
  blankContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  colorOrColorTemperatureContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
  brightness: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)'
  }
});
//@native end