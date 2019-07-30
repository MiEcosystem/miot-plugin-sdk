import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChoiceItem from '../ListItem/ChoiceItem';
import Separator from '../Separator';
import AbstractDialog from './AbstractDialog';
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
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 */
export default class ActionSheet extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    buttons: PropTypes.arrayOf(PropTypes.object),
    onDismiss: PropTypes.func,
  }
  static defaultProps = {
    options: []
  }
  componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({ visible: newProps.visible });
    }
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: props.visible
    }
  }
  render() {
    return (
      <AbstractDialog
        animationType={this.props.animationType}
        visible={this.state.visible}
        showTitle={false}
        buttons={this.props.buttons}
        onDismiss={_ => this._onDismiss()}
      >
        {this.props.options.map((option, index) => {
          return (
            <View
              key={(option.title || '') + index}
            >
              <ChoiceItem
                title={option.title || ''}
                subtitle={option.subtitle || ''}
                onPress={_ => this._onPress(option.onPress)}
              />
              <Separator />
            </View>
          )
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