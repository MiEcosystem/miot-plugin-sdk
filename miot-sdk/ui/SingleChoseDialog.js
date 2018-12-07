/**
 * @export
 * @module miot/ui/SingleChoseDialog
 * @description 单选对话框
 * @mark andr done
 *
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
export default class SingleChoseDialog extends Component {
  static propTypes = {
    /**
     *
     * @member {bool}
     */
    visible: PropTypes.bool,
    /**
     *
     * @member {string}
     */
    title: PropTypes.string,
    /**
     * 超时自动隐藏，设置0或者不设置不会自动隐藏
     * @member {number}
     */
    timeout: PropTypes.number,
    /**
     *
     * @member {array}
     */
    dataSource: PropTypes.array,
    /**
     *
     * @member {string}
     * @description dataSource每个条目显示名称 object 的字段名
     *
     */
    dataKey: PropTypes.string,
    /**
     *
     * @member {number}
     * @description 选中第几个数据的 index
     *
     */
    check: PropTypes.number,
    /**
     *
     * @member {string}
     */
    cancel: PropTypes.string,
    /**
     *
     * @member {string}
     */
    confirm: PropTypes.string,
    /**
     *
     * @member {func}
     */
    onConfirm: PropTypes.func,
    /**
     *
     * @member {func}
     */
    onCancel: PropTypes.func,
    /**
     *
     * @member {func}
     */
    onCheck: PropTypes.func,
    /**
     *
     * @member {func}
     */
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
     return null
  }
}