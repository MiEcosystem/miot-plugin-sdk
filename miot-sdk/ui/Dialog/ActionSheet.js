import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import ChoiceItem from '../ListItem/ChoiceItem';
import Separator from '../Separator';
import AbstractDialog from './AbstractDialog';
import tr from "../../resources/strings/tr";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from '../../utils/accessibility-helper';
import { referenceReport } from '../../decorator/ReportDecorator';
/**
 * 可点击的选项
 * @typedef {Object} Opiton
 * @property {string} title - 主文案
 * @property {string} subtitle - 副文案
 * @property {function} onPress - 点击回调函数
 */
/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @property {bool} allowFontScaling - text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @property {number} numberOfLines - text文字的行数， 默认 undefined (兼容旧版)
 * @property {function} callback - 点击按钮的回调函数
 */
/**
 * @export
 * @author Geeook
 * @since 10022
 * @module ActionSheet
 * @description 选项弹窗，无选择态，点击后弹窗消失
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {Opiton[]} options - 可点击的选项
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {Object} dialogStyle - 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {bool} dialogStyle.unlimitedHeightEnable - 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {style} dialogStyle.itemTitleStyle - 控制item  title 样式
 * @param {style} dialogStyle.itemSubtitleStyle - 控制item  subtitle 样式
 * @param {bool} dialogStyle.itemTitleNumberOfLines - 控制item  title 行数 默认为1
 * @param {bool} dialogStyle.itemSubtitleNumberOfLines - 控制item  subtitle 行数 默认为1
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 * @param {bool} canDismiss - 点击背景时是否隐藏，默认ture
 */
export default class ActionSheet extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    dialogStyle: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      onPress: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    buttons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.any,
      callback: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    onDismiss: PropTypes.func,
    canDismiss: PropTypes.bool,
    accessible: AccessibilityPropTypes.accessible
  }
  static defaultProps = {
    options: [],
    canDismiss: true,
    dialogStyle: {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      itemTitleStyle: {},
      itemSubtitleStyle: {},
      itemTitleNumberOfLines: 1,
      itemSubtitleNumberOfLines: 1
    }
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({ visible: newProps.visible });
    }
  }
  constructor(props, context) {
    super(props, context);
    referenceReport('ActionSheet');
    this.state = {
      visible: props.visible
    };
  }
  render() {
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.state.visible}
        dialogStyle={this.props.dialogStyle}
        showTitle={false}
        buttons={this.props.buttons}
        onDismiss={() => this._onDismiss()}
        canDismiss={this.props.canDismiss}
        {...getAccessibilityConfig({
          accessible: this.props.accessible
        })}
      >
        {this.props.options.map((option, index) => {
          return (
            <View
              key={(option.title || '') + index}
            >
              <ChoiceItem
                title={option.title || ''}
                titleStyle={this.props.dialogStyle.itemTitleStyle}
                subtitle={option.subtitle || ''}
                subtitleStyle={this.props.dialogStyle.itemSubtitleStyle}
                allowFontScaling={this.props.dialogStyle.allowFontScaling}
                unlimitedHeightEnable={this.props.dialogStyle.unlimitedHeightEnable}
                titleNumberOfLines={this.props.dialogStyle.itemTitleNumberOfLines}
                subtitleNumberOfLines={this.props.dialogStyle.itemSubtitleNumberOfLines}
                onPress={() => this._onPress(option.onPress)}
                {...getAccessibilityConfig({
                  accessible: this.props.accessible,
                  accessibilityRole: AccessibilityRoles.button,
                  accessibilityLabel: option.accessibilityLabel,
                  accessibilityHint: option.accessibilityHint
                })}
              />
              <Separator />
            </View>
          );
        })}
      </AbstractDialog>
    );
  }
  _onPress(callback) {
    callback && callback();
    this.setState({ visible: false });
    this._onDismiss();
  }
  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  }
}