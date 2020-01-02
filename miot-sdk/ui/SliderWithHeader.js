//@native begin
import React, {Component, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Switch from './Switch';
import SlideGear from './Gear/SlideGear';
import ContainerWithShadowAndSeparator from './ContainerWithShadowAndSeparator';
import {log} from '../utils/fns';
import {adjustSize} from '../utils/sizes';
import {FontDefault} from '../utils/fonts';
import {ColorGreen} from '../utils/colors';
export default class SliderWithHeader extends Component {
  static propTypes = {
    options: PropTypes.array,
    initValue: PropTypes.any,
    onSlidingChange: PropTypes.func,
    onSlidingComplete: PropTypes.func,
    disabled: PropTypes.bool,
    switchDisabled: PropTypes.bool,
    themeColor: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showSwitch: PropTypes.bool,
    switchOn: PropTypes.bool,
    onSwitch: PropTypes.func,
    hasShadow: PropTypes.bool
  };
  static defaultProps = {
    options: [],
    initValue: null,
    onSlidingChange: log,
    onSlidingComplete: log,
    disabled: false,
    switchDisabled: false,
    themeColor: '',
    title: '',
    subtitle: '',
    showSwitch: false,
    switchOn: true,
    onSwitch: log,
    hasShadow: true
  };
  onSlidingChange = (v) => {
    let {onSlidingChange, options} = this.props;
    onSlidingChange(options[v]);
  }
  onSlidingComplete = (v) => {
    let {onSlidingComplete, options} = this.props;
    onSlidingComplete(options[v]);
  }
  render() {
    let {options, disabled, switchDisabled, themeColor, showSwitch, switchOn, onSwitch, initValue, title, subtitle, hasShadow} = this.props;
    if(!options || !options.length) {
      return null;
    }
    let initSelectedIndex = options.findIndex(option => {
      return option === initValue;
    });
    let Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    return (
      <Wrap>
        <View style={Styles.container}>
        {title || subtitle || showSwitch ? (
          <View style={[Styles.header, disabled ? {
            opacity: 0.3
          } : null]}>
            {title || subtitle ? (
              <View style={Styles.titleContainer}>
                {title ? (
                  <Text style={Styles.title}>{title}</Text>
                ) : null}
                {title && subtitle ? (
                  <View style={Styles.titleSeparator}></View>
                ) : null}
                {subtitle ? (
                  <Text style={Styles.subtitle}>{subtitle}</Text>
                ) : null}
              </View>
            ) : null}
            {showSwitch ? (
              <Switch disabled={disabled} value={switchOn} onTintColor={themeColor || ColorGreen} onValueChange={onSwitch} />
            ) : null}
          </View>
        ) : null}
          <View style={[Styles.sliderContainer, title || subtitle || showSwitch ? Styles.sliderContainerWithHeader : null]}>
            <SlideGear disabled={disabled || (showSwitch && switchDisabled)} containerStyle={Styles.slider} options={options} minimumTrackTintColor={themeColor || ColorGreen} value={Math.max(0, initSelectedIndex)} onValueChange={this.onSlidingChange} onSlidingComplete={this.onSlidingComplete} />
          </View>
        </View>
      </Wrap>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: adjustSize(60)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.15)'
  },
  titleContainer: {
    flex: 1,
    height: adjustSize(156),
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: adjustSize(42),
    fontFamily: FontDefault,
    color: '#000'
  },
  titleSeparator: {
    width: 1,
    height: adjustSize(42),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: adjustSize(18)
  },
  subtitle: {
    fontSize: adjustSize(36),
    fontFamily: FontDefault,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  sliderContainer: {
    paddingVertical: adjustSize(60)
  },
  sliderContainerWithHeader: {
    paddingTop: 0
  }
});
//@native end