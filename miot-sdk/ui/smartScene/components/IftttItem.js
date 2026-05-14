import React, { useEffect } from 'react';
import { dynamicStyleSheet } from "../../Style";
import { adjustSize } from "../../../utils/sizes";
import DynamicColor from "../../Style/DynamicColor";
import { Host } from "../../../index";
import { NativeModules, Text, TouchableOpacity, View, Image } from "react-native";
import { AccessibilityRoles, getAccessibilityConfig } from "../../../utils/accessibility-helper";
import PropTypes from "prop-types";
import Images, { getImage } from "../images";
import { IftttTemplateUtils } from '../utils';
const {
  isMiui,
  isHyperOs
} = NativeModules?.MIOTHost?.systemInfo || {}; // 红米手机 isMiui = true
const isMiPhone = isMiui || isHyperOs;
const Styles = dynamicStyleSheet({
  container: {
    borderRadius: adjustSize(42),
    paddingHorizontal: adjustSize(42),
    paddingTop: adjustSize(42),
    flexDirection: 'column',
    backgroundColor: new DynamicColor('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.14)')
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  },
  iconContainer: {
    marginBottom: adjustSize(24),
    minHeight: adjustSize(108),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  sceneIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain'
  },
  titleContainer: {
    flexDirection: 'column',
    marginBottom: 14
  },
  title: {
    fontSize: Host.locale.language.includes('zh') ? 15 : 14,
    color: new DynamicColor('#000000', 'rgba(255, 255, 255, 0.90)'),
    lineHeight: 20,
    marginBottom: adjustSize(12),
    fontFamily: isMiPhone ? 'sans-serif-medium' : 'sans-serif',
    fontWeight: '500'
  },
  subtitle: {
    fontSize: Host.locale.language.includes('zh') ? 12 : 11,
    color: new DynamicColor('rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0.50)'),
    lineHeight: 16,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  subtitleSubscript: {
    fontSize: Host.locale.language.includes('zh') ? 12 : 11,
    color: new DynamicColor('rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0.50)'),
    lineHeight: 16,
    fontFamily: isMiPhone ? 'sans-serif-medium' : 'sans-serif',
    fontWeight: '500'
  }
});
const IftttItem = (
  {
    themeBackgroundColor,
    disabled,
    onPress,
    hasBorderRadius = true,
    trackParams = {},
    title,
    subtitle,
    subtitleSubscript,
    containerStyle,
    titleStyle,
    subtitleStyle,
    subtitleSubscriptStyle,
    triggerIcons = [],
    actionIcons = [],
    iconContainerStyle,
    accessible,
    accessibilityLabel,
    accessibilityHint,
    lines,
    setLines
  }) => {
  const opacity = disabled ? 0.3 : 1;
  const formatThemeBackgroundColor = themeBackgroundColor;
  const containerStyleMixed = [Styles.container, containerStyle, formatThemeBackgroundColor ? {
    backgroundColor: formatThemeBackgroundColor
  } : null, hasBorderRadius ? null : {
    borderRadius: 0
  }];
  useEffect(() => {
    IftttTemplateUtils.report('expose', trackParams);
  }, []);
  const onCardPress = () => {
    if (typeof onPress === 'function' && !disabled) {
      onPress();
    }
  };
  const onAccessibilityAction = (
    {
      nativeEvent: {
        actionName
      }
    }) => {
    if (disabled || !onPress || actionName !== 'activate') {
      return;
    }
    onCardPress();
  };
  const handleTextLayout = (e) => {
    // e.nativeEvent.lines 是一个数组，包含每行的信息
    const numberOfLines = e.nativeEvent.lines.length;
    console.log("numberOfLines:", numberOfLines);
    if (numberOfLines === 2) {
      setLines(2);
    }
  };
  return (
    <TouchableOpacity style={containerStyleMixed} onPress={onCardPress} {...getAccessibilityConfig({
      accessible: accessible,
      accessibilityRole: AccessibilityRoles.button,
      accessibilityLabel: accessibilityLabel,
      accessibilityHint: accessibilityHint,
      accessibilityState: {
        disabled
      }
    })} accessibilityActions={[{
      name: 'activate'
    }]} onAccessibilityAction={onAccessibilityAction} activeOpacity={0.8}>
      {<View style={Styles.titleContainer}>
        {title ? <Text
          onTextLayout={handleTextLayout}
          style={[Styles.title, {
            opacity
          }, titleStyle, { minHeight: 20 * lines }]} numberOfLines={2}>{title}
        </Text> : null}
        {subtitle ? <Text style={[Styles.subtitle, {
          opacity
        }, subtitleStyle]} numberOfLines={1}>{subtitle}
          {subtitleSubscript ? <Text style={[Styles.subtitle, subtitleSubscriptStyle]}>
            {subtitleSubscript}
          </Text> : null}
        </Text> : null}
      </View>}
      <View style={{
        flex: 1
      }}></View>
      <View style={[Styles.iconContainer, iconContainerStyle, { opacity }]}>
        {
          triggerIcons?.length
            ? triggerIcons.map((icon) => {
              return <Image key={icon} style={Styles.sceneIcon} source={{ uri: icon }}/>;
            })
            : <Image key={'trigger'} style={Styles.sceneIcon} source={Images['mi-logo']}/>
        }
        <Image style={Styles.arrowIcon} source={getImage('connect_arrow')}/>
        {
          actionIcons?.length
            ? actionIcons.map((icon) => {
              return <Image key={icon} style={Styles.sceneIcon} source={{ uri: icon }}/>;
            })
            : <Image key={'action'} style={Styles.sceneIcon} source={Images['mi-logo']}/>
        }
      </View>
    </TouchableOpacity>
  );
};
IftttItem.propTypes = {
  themeColor: PropTypes.string,
  themeBackgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  invisible: PropTypes.bool,
  hasShadow: PropTypes.bool,
  hasBorderRadius: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleSubscript: PropTypes.string,
  onPress: PropTypes.func,
  containerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  subtitleStyle: PropTypes.any,
  subtitleSubscriptStyle: PropTypes.any,
  triggerIcons: PropTypes.any,
  actionIcons: PropTypes.any,
  iconDisabled: PropTypes.any,
  iconContainerStyle: PropTypes.any,
  iconStyle: PropTypes.any,
  accessible: PropTypes.any,
  accessibilityLabel: PropTypes.any,
  accessibilityHint: PropTypes.any,
  lines: PropTypes.any,
  setLines: PropTypes.func
};
export default IftttItem;