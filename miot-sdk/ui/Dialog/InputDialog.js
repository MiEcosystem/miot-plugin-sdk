import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { RkTextInput, RkTheme } from 'react-native-ui-kitten';
import { Styles } from '../../resources';
import Checkbox from '../Checkbox/Checkbox';
import Separator from '../Separator';
import AbstractDialog from "./AbstractDialog";
const paddingHorizontal = 29; // 内容的左右边距
const paddingVertical = 23; // 内容的上下边距
const paddingTop = 13; // 输入框和下方内容的间距
const paddingBottom = 6; // 输入框和上方内容的间距
const { width, height } = Dimensions.get('window');
/**
 * @description 输入弹窗的类型
 * @enum {string}
 */
const TYPE = {
  /**
   * 普通，只有输入框
   */
  SIMPLE: 'simple',
  /**
   * 输入框上方有文字说明和下划线超链接
   */
  UNDERLINE: 'underline',
  /**
   * 输入框下方有勾选框和文字
   */
  CHECKBOX: 'checkbox',
  /**
   * 输入框上方有文字说明和下划线超链接
   * 输入框下方有勾选框和文字
   */
  BOTH: 'both',
}
Object.freeze(TYPE);
/**
 * 输入框上方的数据
 * @typedef {Object} UnderlineData
 * @property {string} leftText - 左侧说明文字
 * @property {string} underlineText - 右侧下划线文字
 * @property {function} onPress - 点击下划线文字的回调函数
 */
/**
 * 输入框
 * @typedef {Object} Input
 * @property {string} placeholder - 占位文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#placeholder
 * @property {string} defaultValue - 初始默认文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#defaultvalue
 * @property {function} onChangeText - 文字变化回调，参考 https://facebook.github.io/react-native/docs/0.54/textinput#onchangetext
 * @property {Object} textInputProps - 其他 TextInput 支持的属性，参考 https://facebook.github.io/react-native/docs/0.54/textinput#props
 */
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
 * @module InputDialog
 * @description 输入弹窗，提示用户录入信息并记录。输入框弹窗的业务场景有时候会很复杂，如果本组件无法满足你的业务需求，请使用 `AbstractDialog` 参考本组件源码自行实现
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {TYPE} type - 输入弹窗的类型。是否只有输入框，输入框上方是否有下划线超链接，输入框下方是否有勾选项，详见 `TYPE`，默认 `TYPE.SIMPLE`
 * @param {string} color - 下划线超链接的文字颜色 / 勾选框的勾选颜色，默认米家绿
 * @param {string} title - 标题文字
 * @param {UnderlineData} underlineData - 输入框上方的数据，包括左侧说明文字，右侧下划线文字及其点击回调函数，只对 `TYPE.UNDERLINE` 和 `TYPE.BOTH` 有效
 * @param {Input[]} inputs - 输入框数组，定义输入框的属性，对所有的 `TYPE` 有效
 * @param {CheckboxData} checkboxData - 输入框下方的数据，包括勾选状态，描述文字，只对 `TYPE.CHECKBOX` 和 `TYPE.BOTH` 有效
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 */
export default class InputDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    type: PropTypes.oneOf([TYPE.SIMPLE, TYPE.UNDERLINE, TYPE.CHECKBOX, TYPE.BOTH]),
    color: PropTypes.string,
    title: PropTypes.string,
    underlineData: PropTypes.object,
    inputs: PropTypes.arrayOf(PropTypes.object),
    checkboxData: PropTypes.object,
    buttons: PropTypes.arrayOf(PropTypes.object),
    onDismiss: PropTypes.func,
  }
  static defaultProps = {
    type: TYPE.SIMPLE,
    color: Styles.common.MHGreen,
    underlineData: {},
    checkboxData: {},
  }
  /**
   * @description 输入弹窗的类型
   * @enum {string}
   */
  static TYPE = TYPE
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: false
    }
    RkTheme.setType('RkTextInput', 'mhtextinput', {
      input: {
        marginVertical: 0,
        color: '#000000',
        marginLeft: 16,
        fontSize: 14,
      },
      underlineWidth: 0.3,
      marginVertical: 0,
      placeholderTextColor: '#999999',
      height: 40,
      backgroundColor: '#f9f9f9',
      borderRadius: 6,
      borderWidth: 0.3,
      borderColor: '#e5e5e5',
    });
    this.process(props);
  }
  componentWillReceiveProps(props) {
    this.process(props);
  }
  process(props) {
    // 默认一个 Input
    this.textInputArray = [];
    this.inputs = props.inputs || [{
      placeholder: '自定义占位字符',
      defaultValue: '自定义默认值',
      textInputProps: { autoFocus: true }
    }]
    // 拦截 onChangeText，记录输入文字
    for (let i = 0; i < this.inputs.length; i++) {
      const input = this.inputs[i];
      if (input !== undefined) {
        this.textInputArray.push(input.defaultValue || '');
        const onChangeTextOrigin = input.onChangeText;
        input.onChangeText = text => {
          this._onChangeText(text, i);
          if (onChangeTextOrigin instanceof Function) {
            onChangeTextOrigin(text);
          }
        }
      }
    }
    this.state.checked = props.checkboxData.checked || false;
    this.hasPressUnderlineText = false;
    // 拦截确认按钮的回调函数，传入 InputDialog 的一些信息
    const buttons = props.buttons;
    if (buttons instanceof Array) {
      const button = buttons[buttons.length - 1];
      if (button && button.callback) {
        const callbackOrigin = button.callback;
        button.callback = () => {
          callbackOrigin({
            hasPressUnderlineText: this.hasPressUnderlineText,
            checked: this.state.checked,
            textInputArray: this.textInputArray
          });
        }
      }
    }
    this.buttons = buttons;
  }
  /**
   * 拦截onChangeText事件，记录输入值
   */
  _onChangeText(text, index) {
    this.textInputArray[index] = text;
  }
  /**
   * 输入框上方的文字说明和下划线超链接
   */
  renderUpExtra() {
    if (this.props.type === TYPE.BOTH
      || this.props.type === TYPE.UNDERLINE) {
      const { leftText, underlineText } = this.props.underlineData;
      return (
        <View style={styles.underlineContainer}>
          <Text
            numberOfLines={1}
            style={styles.label}
          >
            {leftText || ''}
          </Text>
          <Text
            style={[styles.underlineText, { color: this.props.color }]}
            numberOfLines={1}
            onPress={_ => this.onPressUnderlineText()}
          >
            {underlineText || ''}
          </Text>
        </View>
      )
    }
    else return null;
  }
  /**
   * 一组输入框
   */
  renderInputGroup() {
    return this.inputs.map((input, index) => {
      if (input === undefined) return null;
      const margin = index === 0 ? {} : { marginTop: 12 };
      return (
        <RkTextInput
          key={index + (input.placeholder || '')}
          style={margin}
          placeholder={input.placeholder || ''}
          onChangeText={input.onChangeText}
          rkType='mhtextinput'
          defaultValue={input.defaultValue || ''}
          {...(input.textInputProps || {})}
        />
      )
    });
  }
  /**
   * 输入框下方的勾选框和文字
   */
  renderDownExtra() {
    if (this.props.type === TYPE.BOTH
      || this.props.type === TYPE.CHECKBOX) {
      const { text } = this.props.checkboxData;
      return (
        <TouchableOpacity
          onPress={_ => this.onPressCheckbox()}
          activeOpacity={1}
          style={{ paddingTop }}
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
    else return null;
  }
  render() {
    if (!this.props.visible) return null;
    const absDialogStyle = Platform.OS === 'ios' ? {bottom: ~~(height * 0.45)} : {}
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.props.visible}
        title={this.props.title}
        buttons={this.buttons}
        onDismiss={_ => this._onDismiss()}
        style={absDialogStyle}
      >
        <View style={[styles.container]}>
          {this.renderUpExtra()}
          {this.renderInputGroup()}
          {this.renderDownExtra()}
        </View>
        <Separator />
      </AbstractDialog>
    );
  }
  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  }
  onPressUnderlineText() {
    this.hasPressUnderlineText = true;
    const { onPress } = this.props.underlineData;
    onPress && onPress();
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
  underlineContainer: {
    paddingBottom,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)',
    flex: 1,
  },
  underlineText: {
    flex: 1,
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontSize: 14,
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