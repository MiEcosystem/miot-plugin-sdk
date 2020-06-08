import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';
import { Styles } from '../resources';
import { AccessibilityRoles, AccessibilityPropTypes, getAccessibilityConfig } from '../utils/accessibility-helper';
const { width, height } = Dimensions.get('window');
const ratio = 0.2; // 中间图片距离顶部的距离和页面高度的比例
const imageMarginTop = height * ratio;
const imageContainerSize = 138;
const imageWidth = 84;
const imageHeight = 114;
const imageSource = require('../resources/images/blank_page_icon.png');
const padding = 40; // 正文描述文字距离边界左右间距
const safeBottom = 20; // 底部按钮安全距离
/**
 * @description 空白页面底部视图类型
 * @enum {string}
 */
const TYPE = {
  /**
   * 底部是按钮
   */
  BUTTON: 'button',
  /**
   * 底部是下划线超链接
   */
  UNDERLINE: 'underline'
};
Object.freeze(TYPE);
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
 * @export
 * @author Geeook
 * @since 10024
 * @module BlankPage
 * @description 空白页面组件
 * @param {TYPE} type - 空白页面底部视图类型，是按钮还是下划线，默认是按钮
 * @param {Underline} underline - 下划线相关数据，`TYPE.UNDERLINE`时有效
 * @param {Button} button - 按钮相关数据，`TYPE.BUTTON`时有效
 * @param {resource} icon - 图标资源
 * @param {ViewPropTypes.style} iconStyle - 图标样式
 * @param {string} message - 图标正下方的主要文案，必填
 * @param {string} desc - `message`下方的描述解释文案，选填
 * @param {string} extraInfo - 底部按钮上方的描述解释文案，选填，`TYPE.BUTTON`时有效
 */
export default class BlankPage extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([TYPE.BUTTON, TYPE.UNDERLINE]),
    icon: PropTypes.any,
    underline: PropTypes.object,
    button: PropTypes.object,
    iconStyle: ViewPropTypes.style,
    message: PropTypes.string.isRequired,
    desc: PropTypes.string,
    extraInfo: PropTypes.string,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  }
  static defaultProps = {
    type: TYPE.BUTTON,
    underline: {},
    button: {},
    icon: imageSource
  }
  /**
   * @description 空白页面底部视图类型
   * @enum {string}
   */
  static TYPE = TYPE
  /**
   * 中间的图标 + 文字
   */
  renderCenter() {
    return (
      <View style={styles.center}>
        <View style={styles.imageContainer}>
          <Image
            source={this.props.icon}
            style={[styles.image, this.props.iconStyle]}
            resizeMode="contain"
          />
        </View>
        <Text
          numberOfLines={1}
          style={styles.message || ''}
        >
          {this.props.message}
        </Text>
        {this.props.desc
          ? <Text
            numberOfLines={3}
            style={[styles.desc, { marginTop: 10 }]}
          >
            {this.props.desc || ''}
          </Text>
          : null
        }
      </View>
    );
  }
  /**
   * 底部的按钮或者下划线
   */
  renderBottom() {
    if (this.props.type === TYPE.UNDERLINE) {
      const { text, callback, textStyle } = this.props.underline;
      return (
        <View style={[styles.bottom, { marginBottom: safeBottom * 2 }]}>
          <Text
            onPress={() => this.onPress(callback)}
            numberOfLines={1}
            style={[
              styles.desc,
              {
                textDecorationLine: 'underline',
                color: Styles.common.MHGreen,
                textAlign: 'center'
              },
              textStyle
            ]}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.link,
              accessibilityLabel: text,
              accessibilityHint: this.props.accessibilityHint
            })}
          >
            {text}
          </Text>
        </View>
      );
    } else {
      let fontFamily = {};
      if (Platform.OS === 'android') fontFamily = { fontFamily: 'Kmedium' };
      const { text, callback, buttonStyle, textStyle } = this.props.button;
      return (
        <View style={styles.bottom}>
          {this.props.extraInfo
            ? <Text
              numberOfLines={2}
              style={styles.desc}
              {...getAccessibilityConfig({
                accessible: this.props.accessible,
                accessibilityRole: AccessibilityRoles.text,
                accessibilityLabel: this.props.extraInfo,
                accessibilityHint: this.props.accessibilityHint
              })}
            >
              {this.props.extraInfo}
            </Text>
            : null
          }
          <RkButton
            style={[styles.buttonContainer, buttonStyle]}
            onPress={() => this.onPress(callback)}
            activeOpacity={0.8}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.button,
              accessibilityLabel: text,
              accessibilityHint: this.props.accessibilityHint
            })}
          >
            <Text style={[styles.buttonText, fontFamily, textStyle]}>
              {text}
            </Text>
          </RkButton>
        </View>
      );
    }
  }
  onPress(callback) {
    if (typeof callback === 'function') {
      callback();
    } else {
      if (__DEV__ && console.warn) {
        console.warn('请传入有效的点击回调函数');
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderCenter()}
        <View style={{ flex: 1 }}></View>
        {this.renderBottom()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    width
  },
  center: {
    marginTop: imageMarginTop,
    width,
    alignItems: 'center'
  },
  imageContainer: {
    width: imageContainerSize,
    height: imageContainerSize,
    alignItems: 'center'
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    marginTop: 5
  },
  message: {
    width,
    fontSize: 15,
    color: '#999',
    textAlign: 'center'
  },
  desc: {
    width,
    paddingHorizontal: padding,
    fontSize: 13,
    color: '#999',
    lineHeight: 18
  },
  bottom: {
    width,
    marginBottom: safeBottom
  },
  buttonContainer: {
    width: width - Styles.common.padding * 2,
    height: 42,
    borderRadius: 5,
    marginTop: 21,
    backgroundColor: Styles.common.MHGreen,
    marginHorizontal: Styles.common.padding
  },
  buttonText: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: 18
  }
});