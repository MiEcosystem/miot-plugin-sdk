import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Styles } from '../../resources';
import Checkbox from '../Checkbox/Checkbox';
import Separator from '../Separator';
import AbstractDialog from "./AbstractDialog";
const paddingHorizontal = 29; // 内容的左右边距
const paddingVertical = 26; // 内容的上下边距
const marginVertical = 30; // 输入框和上下内容的间距
const blockSize = 45; // 小方块的尺寸
const { height } = Dimensions.get('window');
/**
 * 勾选框相关数据
 * @typedef {Object} CheckboxData
 * @property {boolean} checked - 勾选框的初始勾选状态
 * @property {string} text - 勾选框右侧的说明文字
 */
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
 * @module PinCodeDialog
 * @description 密码/验证码弹窗，用于输入密码/验证码
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} title - 标题文字
 * @param {string} message - 文字说明
 * @param {number} digit - 输入框数量，允许3～6个，默认是6个
 * @param {string} color - 勾选框的勾选颜色 / 输入框focus时的边框颜色，默认米家绿
 * @param {CheckboxData} checkboxData - 输入框下方的勾选状态和描述文字，如果不传将不显示
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 */
export default class PinCodeDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    digit: PropTypes.oneOf([3, 4, 5, 6]),
    checkboxData: PropTypes.object,
    buttons: PropTypes.arrayOf(PropTypes.object),
    onDismiss: PropTypes.func,
  }
  static defaultProps = {
    digit: 6,
    color: Styles.common.MHGreen,
  }
  componentWillReceiveProps(props) {
    if (props.visible === true) {
      this.state.numArr = Array.from({ length: this.digit }, v => undefined);
      this.state.value = '';
    }
    this.process(props);
  }
  constructor(props, context) {
    super(props, context);
    this.digit = this.props.digit;
    if (this.digit > 6 || this.digit < 3) {
      this.digit = 6;
      console.warn('digit should range within [3, 6]');
    }
    const numArr = Array.from({ length: this.digit }, v => undefined);
    this.state = {
      numArr,
      value: '',
      checked: false
    }
    this.process(props);
  }
  process(props) {
    this.state.checked = (props.checkboxData || {})['checked'] || false;
    const buttons = props.buttons;
    if (buttons instanceof Array) {
      const button = buttons[buttons.length - 1]; // 取最后一个按钮进行拦截
      if (button && button.callback) {
        const callbackOrigin = button.callback;
        button.callback = () => {
          callbackOrigin({
            checked: this.state.checked,
            numArr: this.state.numArr
          });
        }
      }
    }
    this.buttons = buttons;
  }
  /**
   * 
   * @param {string} text 
   */
  _onChangeText(text) {
    console.log(text);
    if (/^\d*$/.test(text)) {
      if (text.length <= this.digit) {
        const numArr = this.state.numArr.map((v, i) => text[i]);
        this.setState({ numArr });
      }
      this.setState({ value: text.slice(0, this.digit) });
    }
    else {
      const value = text.match(/\d*/)[0];
      this.setState({ value });
    }
  }
  /**
   * 输入框上方的文字说明
   */
  renderUpExtra() {
    if (!this.props.message) return null;
    return (
      <Text style={styles.message}>
        {this.props.message || ''}
      </Text>
    )
  }
  /**
   * 一组Text
   */
  renderTextGroup() {
    return Array.from({ length: this.digit }, (v, i) => i)
      .map((v, i) => {
        const marginLeft = i === 0 ? {} : { marginLeft: 66 / this.digit };
        const focusIndex = this.state.numArr.indexOf(undefined);
        const borderColor = i === focusIndex ? { borderColor: this.props.color } : {};
        return (
          <View
            key={i}
            style={[styles.blockContainer, marginLeft, borderColor]}
          >
            <Text style={styles.blockText}>
              {this.state.numArr[i] || ''}
            </Text>
          </View>
        )
      });
  }
  /**
   * 输入框下方的勾选框和文字
   */
  renderDownExtra() {
    if (!(this.props.checkboxData instanceof Object)) return null;
    const { text } = this.props.checkboxData;
    return (
      <TouchableOpacity
        onPress={_ => this.onPressCheckbox()}
        activeOpacity={1}
      >
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={this.state.checked}
            checkedColor={this.props.color}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10
            }}
            onValueChange={checked => this.state.checked = checked}
          />
          <Text
            style={styles.checkboxText}
            numberOfLines={1}
          >
            {text || ''}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    if (!this.props.visible) return null;
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.props.visible}
        title={this.props.title}
        buttons={this.buttons}
        onDismiss={_ => this._onDismiss()}
        style={{ bottom: ~~(height * 0.38) }}
      >
        <View style={[styles.container]}>
          {this.renderUpExtra()}
          <View style={styles.pinCodeContainer}>
            <View style={styles.textGroup}>
              {this.renderTextGroup()}
            </View>
            <TextInput
              autoFocus={true}
              caretHidden={true}
              style={styles.textinput}
              value={this.state.value}
              selectionColor='#ffffff'
              underlineColorAndroid='transparent'
              onChangeText={text => this._onChangeText(text)}
              keyboardType='numeric'
            />
          </View>
          {this.renderDownExtra()}
        </View>
        <Separator />
      </AbstractDialog>
    );
  }
  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  }
  onPressCheckbox() {
    this.setState({ checked: !this.state.checked });
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal,
    paddingBottom: paddingVertical,
    backgroundColor: '#fff',
    borderRadius: Styles.dialog.modal.borderRadius,
  },
  message: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 18,
    flex: 1,
  },
  pinCodeContainer: {
    marginVertical,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    position: 'absolute',
    width: Styles.dialog.modal.width - paddingHorizontal * 2,
    height: 45 + marginVertical * 2,
    backgroundColor: 'transparent',
    color: 'transparent',
  },
  textGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  blockContainer: {
    height: blockSize,
    width: blockSize,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderWidth: 0.8,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  blockText: {
    color: '#000000',
    fontSize: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#999'
  },
});