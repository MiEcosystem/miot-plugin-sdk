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
export default class ProgressDialog extends Component {
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
     * @member {string}
     */
    message: PropTypes.string,
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