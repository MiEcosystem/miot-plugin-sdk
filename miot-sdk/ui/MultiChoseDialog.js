/**
 * @export
 * @module miot/ui/MultiChoseDialog
 * @description 多选对话框
 * @mark andr done
 */
import React, {Component} from 'react';
import { requireNativeComponent, ViewPropTypes, } from 'react-native';
import PropTypes from 'prop-types';
export default class MultiChoseDialog extends Component {
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
     *
     * @member {array}
     * @description 建议 array 的每个item 是一个 object，object 至少有展示条目名称、选中状态两个字段
     */
    dataSource: PropTypes.array,
    /**
     *
     * @member {string}
     * @description dataSource每个条目显示名称 object 的字段名
     */
    dataKey: PropTypes.string,
    /**
     *
     * @member {string}
     * @description dataSource每个条目选中状态 object 的字段名
     */
    checkKey: PropTypes.string,
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
     * @description 回调会带一个 object 的参数，object.position为点击第几个条目，object.check 为选中状态
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
