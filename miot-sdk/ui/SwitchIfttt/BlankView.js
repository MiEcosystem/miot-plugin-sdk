import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import { dynamicStyleSheet } from 'miot/ui/Style/DynamicStyleSheet';
import { adjustSize } from 'miot/utils/sizes';
import DynamicColor, { dynamicColor } from 'miot/ui/Style/DynamicColor';
import ConfirmButton from './ConfirmButton';
import { ViewPropTypes } from 'react-native';
import { FontMILanProNormal } from 'miot/utils/fonts';
import { Images } from '../../resources';
import DarkMode from 'miot/darkmode';
/**
 * 卡片的按钮配置 cardButton
 * @typedef {object} cardButton
 * @property {string} title - 按钮标题
 * @property {string} themeColor - 标题背景色
 * @property {string} titleColor - 标题颜色
 * @property {string | number} width - 按钮宽度
 * @property {string | number} height - 按钮高度
 * @property {number} borderRadius - 按钮圆角
 * @property {function} onPress - 点击事件
 */
/**
 * 下划线
 * @typedef {Object} Underline
 * @property {string} text - 下划线文字
 * @property {ViewPropTypes.style} textStyle - 文字样式
 * @property {function} callback - 点击下划线的回调函数
 */
/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮文字
 * @property {ViewPropTypes.style} buttonStyle - 按钮样式
 * @property {ViewPropTypes.style} textStyle - 按钮文字样式
 * @property {function} callback - 点击按钮的回调函数
 */
/**
 * @description 空白页面底部视图类型
 * @enum {string}
 */
export const BlankViewType = {
  /**
   * 底部是按钮
   */
  BUTTON: 'button',
  /**
   * 底部是下划线超链接
   */
  UNDERLINE: 'underline'
};
Object.freeze(BlankViewType);
const styles = dynamicStyleSheet({
  containerStyle: {
    marginHorizontal: adjustSize(93),
    alignItems: 'center'
  },
  normalText: {
    fontFamily: FontMILanProNormal,
    textAlign: 'left',
    color: new DynamicColor('rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.4)'),
    fontSize: 14
  },
  highlightText: {
    fontFamily: FontMILanProNormal,
    fontSize: 14,
    color: new DynamicColor('#0D9DFF', '#0089E5'),
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '400'
  },
  messageText: {
    fontFamily: FontMILanProNormal,
    width: adjustSize(600),
    fontSize: 14,
    color: new DynamicColor('rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 0.4)'),
    textAlign: 'center',
    marginTop: adjustSize(36)
  },
  imageStyle: {
    width: adjustSize(276),
    height: adjustSize(180),
    marginTop: 5,
    alignItems: 'center'
  },
  attributeContainer: {
    // flex: 1,
    alignItems: 'center',
    marginTop: adjustSize(36),
    paddingHorizontal: adjustSize(3)
  },
  buttonContainer: {
    // flex: 1,
    marginTop: adjustSize(42)
  }
});
export default function BlankView({
  type,
  icon,
  iconStyle,
  message,
  messageTextStyle,
  button,
  underline,
  blankStyle
}) {
  const { buttonTitle, buttonStyle, buttonCallback } = button || {};
  const { text, highlightText, textStyle, highlightStyle, highlightCallback } = underline || {};
  // 查找underline的位置, 统一转化为小写查找规避多语言问题
  const lowerText = text?.toLowerCase();
  const lowerHighText = highlightText?.toLowerCase();
  const highLightIndex = lowerText?.indexOf(lowerHighText);
  // 计算underline的位置前后的文案
  const prefixText = highLightIndex !== -1 ? text?.substr(0, highLightIndex) : text;
  const suffixText = highLightIndex !== -1 ? text?.substr(highLightIndex + highlightText.length, text.length - highlightText.length - prefixText.length) : '';
  const attributeText = (
    <View
      style={styles.attributeContainer}
    >
      <Text style={[styles.normalText, textStyle]}>{prefixText}
        <Text
          style={[styles.highlightText, highlightStyle]}
          onPress={() => highlightCallback && highlightCallback()}
        >
          {highlightText}
        </Text>
        <Text
          style={[styles.normalText, textStyle]}
        >
          {suffixText}
        </Text>
      </Text>
    </View>
  );
  const buttonComponent = (
    <View
      style={styles.buttonContainer}>
      <ConfirmButton
        title={buttonTitle}
        containerStyle={buttonStyle?.containerStyle}
        themeColor={buttonStyle?.backgroundColor ? buttonStyle?.backgroundColor : dynamicColor('rgba(13, 157, 255, 0.1)', 'rgba(13, 157, 255, 0.1)')}
        textStyle={buttonStyle?.textStyle}
        onClick={() => {
          buttonCallback && buttonCallback();
        }}
      />
    </View>
  );
  return (
    <View
      style={[styles.containerStyle, blankStyle]}>
      <Image
        source={icon ? icon : DarkMode.getColorScheme() === 'light' ? Images.common.list_empty : Images.common.list_empty_dark}
        style={[styles.imageStyle, iconStyle]}
        resizeMode="cover"
      />
      {message ?
        <Text
          numberOfLines={3}
          style={[styles.messageText, messageTextStyle]}
        >
          {message}
        </Text> : null}
      {type === BlankViewType.BUTTON ? buttonComponent : attributeText}
    </View>
  );
}
BlankView.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.any,
  iconStyle: ViewPropTypes.style,
  blankStyle: ViewPropTypes.style,
  messageTextStyle: ViewPropTypes.style,
  button: PropTypes.object,
  underline: PropTypes.object
};