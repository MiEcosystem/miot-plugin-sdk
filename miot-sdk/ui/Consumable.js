import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import PrimeButton from './PrimeButton';
import { ColorGreen } from '../utils/colors';
import { FontDefault } from '../utils/fonts';
import { adjustSize } from '../utils/sizes';
import { NOOP } from '../utils/fns';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../utils/accessibility-helper';
export default function Consumable(props) {
  let { title, titleColor, subtitle, subtitleColor, reset, buy, icon, onBuy, onReset } = props;
  return (
    <View style={Styles.container}>
      <View style={Styles.content} {...getAccessibilityConfig({
        accessible: props.accessible,
        accessibilityRole: AccessibilityRoles.text
      })}>
        {icon ? (
          <Image style={Styles.imageWrap} source={icon} />
        ) : null}
        {title ? (
          <Text style={[Styles.title, titleColor ? {
            color: titleColor
          } : null]}>{title}</Text>
        ) : null}
        {subtitle ? (
          <Text style={[Styles.subtitle, subtitleColor ? {
            color: subtitleColor
          } : null]}>{subtitle}</Text>
        ) : null}
      </View>
      {buy && reset ? (
        <View style={Styles.buttons}>
          <TouchableOpacity style={Styles.buttonWrap} activeOpacity={0.8} onPress={onBuy} {...getAccessibilityConfig({
            accessible: props.accessible,
            accessibilityRole: AccessibilityRoles.button,
            accessibilityHint: props.buyAccessibilityHint
          })}>
            <Text style={Styles.button}>{buy}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Styles.buttonWrap, {
            borderLeftWidth: StyleSheet.hairlineWidth
          }]} activeOpacity={0.8} onPress={onReset} {...getAccessibilityConfig({
            accessible: props.accessible,
            accessibilityRole: AccessibilityRoles.button,
            accessibilityHint: props.resetAccessibilityHint
          })}>
            <Text style={Styles.button}>{reset}</Text>
          </TouchableOpacity>
        </View>
      ) : buy ? (
        <PrimeButton title={buy} themeColor={ColorGreen} textColor="#fff" onClick={onBuy} {...getAccessibilityConfig({
          accessible: props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityHint: props.buyAccessibilityHint
        })} />
      ) : reset ? (
        <PrimeButton title={reset} themeColor={ColorGreen} textColor="#fff" onClick={onReset} {...getAccessibilityConfig({
          accessible: props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityHint: props.resetAccessibilityHint
        })} />
      ) : null}
    </View>
  );
}
Consumable.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.any,
  subtitle: PropTypes.string,
  subtitleColor: PropTypes.any,
  reset: PropTypes.string,
  buy: PropTypes.string,
  icon: PropTypes.any,
  onBuy: PropTypes.func,
  onReset: PropTypes.func,
  accessible: AccessibilityPropTypes.accessible,
  resetAccessibilityHint: AccessibilityPropTypes.accessibilityHint,
  buyAccessibilityHint: AccessibilityPropTypes.accessibilityHint
};
Consumable.defaultProps = {
  title: '',
  titleColor: '',
  subtitle: '',
  subtitleColor: '',
  reset: '',
  buy: '',
  icon: null,
  onBuy: NOOP,
  onReset: NOOP
};
const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginTop: adjustSize(144)
  },
  imageWrap: {
    width: adjustSize(684),
    height: adjustSize(1056),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: adjustSize(75)
  },
  title: {
    fontFamily: FontDefault,
    fontSize: adjustSize(60),
    fontWeight: '700',
    color: '#000',
    alignSelf: 'center',
    marginHorizontal: adjustSize(72),
    marginBottom: adjustSize(6)
  },
  subtitle: {
    fontFamily: FontDefault,
    fontSize: adjustSize(54),
    color: '#000',
    alignSelf: 'center',
    marginHorizontal: adjustSize(72)
  },
  buttons: {
    flexDirection: 'row',
    marginHorizontal: adjustSize(72),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: adjustSize(15)
  },
  buttonWrap: {
    flex: 1,
    height: adjustSize(144),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },
  button: {
    fontFamily: FontDefault,
    fontSize: adjustSize(39),
    color: '#4C4C4C'
  },
  normalButton: {
    marginHorizontal: 0,
    flex: 1
  }
});