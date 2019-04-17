/**
 * @export
 * @module miot/ui/ProgressDialog
 * @description 进度对话框，当进度到达max设置之后自动消失
 * @mark andr done
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
export default class ProgressDialog extends Component {
  static propTypes = {
    /**
     * 是否显示
     * @member {bool}
     */
    visible: PropTypes.bool,
    /**
     * 是否允许点击空白区域取消显示   
     * Android Only iOS无效
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
     * 最大进度数值
     * @member {number}
     */
    max: PropTypes.number,
    /**
     * 当前进度值
     * @member {number}
     */
    progress: PropTypes.number,
    /**
     * 消失回调
     * @member {func}
     */
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}