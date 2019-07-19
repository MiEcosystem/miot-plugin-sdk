import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { strings, Styles } from '../../resources';
import Separator from '../Separator';
const { width, height } = Dimensions.get('window');
const underlayColor = 'rgba(0,0,0,.05)';
/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @property {function} callback - 点击按钮的回调函数
 */
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module AbstractDialog
 * @description 通用弹窗容器，包括头部标题和底部按钮，内容自定义
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {style} style - modal 的自定义样式
 * @param {string} title - 标题
 * @param {string} subtitle - 副标题
 * @param {bool} showTitle - 是否显示标题，如果`false`，整个标题都不显示（包括副标题），默认`true`
 * @param {bool} showSubtitle - 是否显示副标题，默认`false`
 * @param {bool} canDismiss - 是否允许点击蒙层背景隐藏 Modal，默认`true`
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {bool} showButton - 是否显示按钮，默认`true`
 * @param {function} onDismiss - 点击`Modal`内容外面/取消按钮/确定按钮，Modal隐藏时的回调函数
 */
export default class AbstractDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showTitle: PropTypes.bool,
    showSubtitle: PropTypes.bool,
    canDismiss: PropTypes.bool,
    buttons: PropTypes.arrayOf(PropTypes.object),
    showButton: PropTypes.bool,
    onDismiss: PropTypes.func,
  }
  static defaultProps = {
    animationType: 'fade',
    visible: false,
    showTitle: true,
    showSubtitle: false,
    canDismiss: true,
    buttons: [
      {
        text: strings.cancel,
      },
      {
        text: strings.ok,
        style: {
          color: Styles.common.MHGreen
        }
      },
    ],
    showButton: true
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: this.props.visible
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({ visible: newProps.visible });
    }
  }
  /**
   * 标题部分
   */
  renderTitle() {
    if (!this.props.showTitle) return null;
    const { titleHeightFat, titleHeightThin } = Styles.dialog.title;
    const height = {
      height: this.props.showSubtitle ? titleHeightFat : titleHeightThin
    }
    const marginBottom = this.props.showSubtitle ? { marginBottom: 6 } : {};
    return (
      <View style={[styles.titleContainer, height]}>
        <Text
          numberOfLines={1}
          style={[{
            width: Styles.dialog.modal.width * 0.75,
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
            color: '#000'
          }, marginBottom]}
        >
          {this.props.title || ''}
        </Text>
        {this.props.showSubtitle
          ? <Text
            numberOfLines={1}
            style={Styles.dialog.subtitle}
          >
            {this.props.subtitle}
          </Text>
          : null
        }
      </View>
    )
  }
  /**
   * 中间内容
   */
  renderContent() {
    if (this.props.children) return this.props.children;
    return (
      <View>
        <Separator />
        <View style={styles.content}>
          <Text>⬆️可自定义标题和副标题⬆️</Text>
          <Text>可自定义内容</Text>
          <Text>⬇️可自定义按钮文字和样式⬇️</Text>
        </View>
        <Separator />
      </View>
    )
  }
  /**
   * 底部按钮
   */
  renderButtonGroup() {
    if (!this.props.showButton) return null;
    const buttons = this.props.buttons;
    if (!(buttons instanceof Array)) return null;
    if (buttons.length === 1) return this.renderOneButton(buttons);
    if (buttons.length === 2) return this.renderTwoButtons(buttons);
    else {
      console.warn('只允许设置1～2个按钮');
      return null;
    }
  }
  /**
   * 一个按钮
   * @param {object[]} buttons 
   */
  renderOneButton(buttons) {
    const button0 = buttons[0];
    if (typeof button0 !== 'object') return null;
    let callback = button0.callback;
    if (callback === undefined || !(callback instanceof Function)) {
      callback = _ => this.dismiss();
    }
    return (
      <View style={Styles.dialog.buttons}>
        <TouchableHighlight
          style={[
            Styles.dialog.button,
            {
              borderBottomLeftRadius: Styles.dialog.modal.borderRadius
            }
          ]}
          onPress={callback}
          underlayColor={underlayColor}
        >
          <Text style={[Styles.dialog.buttonText, button0.style]}>
            {button0.text || strings.ok}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
  /**
   * 两个按钮
   * @param {object[]} buttons 
   */
  renderTwoButtons(buttons) {
    const button0 = buttons[0], button1 = buttons[1];
    if (typeof button0 !== 'object'
      || typeof button1 !== 'object') return null;
    let callback0 = button0.callback;
    let callback1 = button1.callback;
    if (callback0 === undefined || !(callback0 instanceof Function)) {
      callback0 = _ => this.dismiss();
    }
    if (callback1 === undefined || !(callback1 instanceof Function)) {
      callback1 = _ => this.dismiss();
    }
    return (
      <View style={Styles.dialog.buttons}>
        <TouchableHighlight
          style={[
            Styles.dialog.button,
            {
              borderBottomLeftRadius: Styles.dialog.modal.borderRadius
            }
          ]}
          onPress={callback0}
          underlayColor={underlayColor}
        >
          <Text style={[Styles.dialog.buttonText, button0.style]}>
            {button0.text || strings.cancel}
          </Text>
        </TouchableHighlight>
        <Separator type='column' style={{ height: Styles.dialog.buttons.height }} />
        <TouchableHighlight
          style={[
            Styles.dialog.button,
            {
              borderBottomRightRadius: Styles.dialog.modal.borderRadius
            }
          ]}
          onPress={callback1}
          underlayColor={underlayColor}
        >
          <Text style={[Styles.dialog.buttonText, { color: Styles.common.MHGreen }, button1.style]}>
            {button1.text || strings.ok}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
  render() {
    return (
      <Modal
        animationType={this.props.animationType}
        transparent={true}
        visible={this.state.visible}
        onRequestClose={_ => this.dismiss()}
      >
        <View style={Styles.dialog.background}>
          <TouchableWithoutFeedback onPress={_ => this.dismiss()} >
            <View style={{ width, height }} />
          </TouchableWithoutFeedback>
          <View style={[Styles.dialog.modal, this.props.style]}>
            {this.renderTitle()}
            {this.renderContent()}
            {this.renderButtonGroup()}
          </View>
        </View>
      </Modal>
    );
  }
  /**
   * 隐藏 Modal
   */
  dismiss() {
    if (this.props.canDismiss) {
      this.setState({ visible: false });
      this.props.onDismiss && this.props.onDismiss();
    }
  }
}
const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: Styles.dialog.modal.width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});