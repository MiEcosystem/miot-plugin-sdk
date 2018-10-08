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
     */
    dataSource: PropTypes.array,
    /**
     * 
     * @member {string}   
     */
    dataKey: PropTypes.string,
    /**
     * 
     * @member {string}   
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