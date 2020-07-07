// @ts-nocheck

/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { Icons } from "../../resources/Icons";
import Colors from "../../utils/Colors";
import { Switch } from "../../components/switch";
import { ContainerWithShadowAndSeparator } from "../containerWithShadowAndSeparator";
import { adjustSize } from "../utils/sizes";
import { FontDefault, FontKmedium } from "../utils/fonts";
export default class CardButton extends PureComponent {
  static defaultProps = {
    underlayColor: 'rgba(0, 0, 0, 0.05)',
    hasShadow: true
  };
  onPress = () => {
    const {
      disabled,
      onPress
    } = this.props;

    if (typeof onPress === 'function' && !disabled) {
      onPress();
    }
  };

  render() {
    const {
      containerStyle,
      themeColor,
      themeBackgroundColor,
      underlayColor,
      hasShadow,
      iconContainerStyle,
      iconStyle,
      icon,
      iconText,
      title,
      subtitle,
      onSwitch,
      switchOn,
      disabled,
      onPress,
      rightText,
      rightArrow
    } = this.props;
    const opacity = disabled ? 0.3 : 1;

    if (!icon && !iconText && !title && !subtitle && !onSwitch) {
      return null;
    }

    const Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    return <Wrap>
        <TouchableHighlight style={[Styles.container, containerStyle, themeBackgroundColor ? {
        backgroundColor: themeBackgroundColor
      } : null]} underlayColor={disabled || !onPress ? themeBackgroundColor || '#fff' : underlayColor} onPress={this.onPress}>
          <>
            {icon || iconText ? <View style={[Styles.iconContainer, iconContainerStyle, {
            backgroundColor: themeColor || Colors.green,
            opacity
          }]}>
                {icon ? <Image style={[Styles.icon, iconStyle]} source={icon} /> : <Text style={Styles.iconText}>{iconText}</Text>}
              </View> : null}
            <View style={[Styles.titleContainer, {
            opacity
          }]}>
              {title ? <Text style={Styles.title}>{title}</Text> : null}
              {subtitle ? <Text style={Styles.subtitle}>{subtitle}</Text> : null}
            </View>
            {onSwitch ? <View style={Styles.switchContainer}>
                <Switch value={switchOn} onValueChange={onSwitch} onTintColor={themeColor || Colors.green} disabled={disabled} />
              </View> : rightText || rightArrow ? <>
                {rightText ? <Text style={Styles.rightText}>{rightText}</Text> : null}
                {rightArrow ? <Image style={Styles.rightArrow} source={Icons.rightArrow} /> : null}
              </> : null}
          </>
        </TouchableHighlight>
      </Wrap>;
  }

}
const Styles = StyleSheet.create({
  container: {
    height: adjustSize(240),
    paddingHorizontal: adjustSize(60),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  iconContainer: {
    marginRight: adjustSize(39),
    width: adjustSize(120),
    height: adjustSize(120),
    borderRadius: adjustSize(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: adjustSize(72),
    height: adjustSize(72),
    resizeMode: 'contain'
  },
  iconText: {
    fontFamily: FontKmedium,
    fontSize: adjustSize(60),
    color: '#fff'
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontFamily: FontDefault,
    fontSize: adjustSize(45),
    color: '#000'
  },
  subtitle: {
    fontFamily: FontDefault,
    fontSize: adjustSize(36),
    lineHeight: adjustSize(42),
    color: '#999'
  },
  switchContainer: {
    marginLeft: adjustSize(30)
  },
  rightText: {
    fontFamily: FontDefault,
    fontSize: adjustSize(36),
    color: '#999',
    marginLeft: adjustSize(30)
  }
});