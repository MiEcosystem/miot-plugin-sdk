/**
 * @export
 * @module miot/ui/LoadingDialog
 * @description 加载对话框
 * @mark andr done
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import native from '.././native'
export default class ProgressDialog extends Component {
  static propTypes = {
    /**
     * 是否可见
     * @member {bool}
     */
    visible: PropTypes.bool,
    /**
     * 是否允许点击空白区域取消显示  
     * Android Only     
     * @member {bool}
     */
    cancelable: PropTypes.bool,
    /**
     * 标题
     * @member {string}
     */
    title: PropTypes.string,
    /**
     * 副标题，内容
     * @member {string}
     */
    message: PropTypes.string,
    /**
     * 超时自动隐藏，设置0或者不设置不会自动隐藏
     * @member {number}
     */
    timeout: PropTypes.number,
    /**
     * 消失回调
     * @member {func}
     */
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
    let showText = this.props.message?this.props.message:this.props.title;
     return null
  }
}