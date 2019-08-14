import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import ChoiceItem from '../ListItem/ChoiceItem';
import Separator from '../Separator';
import AbstractDialog from './AbstractDialog';
/**
 * @description 选择弹窗的类型
 * @enum {string}
 */
const TYPE = {
  /**
   * 单选弹窗，将不显示底部按钮，点击某项之后弹窗消失
   */
  SINGLE: 'single',
  /**
   * 多选弹窗
   */
  MULTIPLE: 'multiple',
}
Object.freeze(TYPE);
/**
 * 可选项
 * @typedef {Object} Opiton
 * @property {string} title - 主文案
 * @property {string} subtitle - 副文案
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
 * @since 10022
 * @module ChoiceDialog
 * @description 选项弹窗，有选择态，可以定义是单选还是多选
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {TYPE} type - 选项弹窗类型，定义是单选弹窗还是多选弹窗，默认是单选弹窗
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} title - 标题
 * @param {Opiton[]} options - 可选项
 * @param {number[]} selectedIndexArray - 选中选项的下标，默认全部未选中
 * @param {string} color - 选中态颜色，单选时表示选中文字颜色，多选时表示勾选框勾选背景颜色，默认米家绿
 * @param {number} icon - 选项被选中时的选中图标，放在文字前面，`TYPE.SINGLE`可用，默认绿色右箭头图片
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {function} onSelect - 选项选择后的确认回调，返回选中选项的下标数组，`TYPE.SINGLE`可用
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 */
export default class ChoiceDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    type: PropTypes.oneOf([TYPE.STATELESS, TYPE.SINGLE, TYPE.MULTIPLE]),
    visible: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    selectedIndexArray: PropTypes.arrayOf(PropTypes.number),
    color: PropTypes.string,
    icon: PropTypes.number,
    buttons: PropTypes.arrayOf(PropTypes.object),
    onDismiss: PropTypes.func,
  }
  static defaultProps = {
    type: TYPE.SINGLE,
    options: [],
    selectedIndexArray: [],
  }
  /**
   * @description 选择弹窗的类型
   * @enum {string}
   */
  static TYPE = TYPE
  componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({ visible: newProps.visible });
    }
    const selectedArray = Array.from({ length: newProps.options.length },
      (v, i) => newProps.selectedIndexArray.includes(i));
    this.setState({ selectedArray });
  }
  constructor(props, context) {
    super(props, context);
    const buttons = props.buttons;
    if (buttons instanceof Array) {
      const button = buttons[buttons.length - 1]; // 取最后一个按钮进行拦截
      if (button && button.callback) {
        const callbackOrigin = button.callback;
        button.callback = () => {
          const selectedIndexArray = [];
          for (let i = 0; i < this.state.selectedArray.length; i++) {
            const item = this.state.selectedArray[i];
            if (item) selectedIndexArray.push(i);
          }
          callbackOrigin(selectedIndexArray);
        }
      }
    }
    this.buttons = buttons;
    this.state = {
      visible: props.visible,
      selectedArray: [],
    }
  }
  render() {
    if (!this.props.visible) return null;
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.state.visible}
        title={this.props.title}
        showButton={this.props.type === TYPE.MULTIPLE}
        buttons={this.buttons}
        onDismiss={_ => this._onDismiss()}
      >
        {this.props.options.map((option, index) => {
          return (
            <View
              key={(option.title || '') + index}
            >
              <Separator />
              <ChoiceItem
                type={this.props.type}
                title={option.title || ''}
                subtitle={option.subtitle || ''}
                selected={this.state.selectedArray[index]}
                color={this.props.color}
                icon={this.props.icon}
                onPress={selected => this._onPress(selected, index)}
              />
            </View>
          )
        })}
        {this.props.type === TYPE.MULTIPLE
          ? <Separator />
          : null
        }
      </AbstractDialog>
    );
  }
  _onPress(selected, index) {
    if (selected) console.log(`第${index + 1}项被选中`);
    else console.log(`第${index + 1}项取消选中`);
    if (this.props.type === TYPE.SINGLE) {
      const selectedArray = Array.from({ length: this.props.options.length }, v => false);
      selectedArray[index] = selected;
      this.setState({
        selectedArray,
        visible: false
      });
      this._onDismiss();
      this.props.onSelect && this.props.onSelect([index]);
    }
    else {
      const selectedArray = this.state.selectedArray;
      selectedArray[index] = selected;
      this.setState({ selectedArray });
    }
  }
  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  }
}