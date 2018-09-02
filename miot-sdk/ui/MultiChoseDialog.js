/**
 * @export
 * @module miot/ui/MultiChoseDialog
 * @description 多选对话框
 * @mark andr done
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
const RCTMultiChoseDialog = requireNativeComponent('RCTMultiChoseDialog', null);
export default class MultiChoseDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    dataSource: PropTypes.array,
    dataKey: PropTypes.string,
    checkKey: PropTypes.string,
    cancel: PropTypes.string,
    confirm: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onCheck: PropTypes.func,
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
    return <RCTMultiChoseDialog {...this.props}
                                onDismiss={(event) => {
                                  if (this.props.onDismiss) {
                                    this.props.onDismiss(event.nativeEvent);
                                  }
                                }}
                                onCancel={(event) => {
                                  if (this.props.onCancel) {
                                    this.props.onCancel(event.nativeEvent);
                                  }
                                }}
                                onCheck={(event) => {
                                  if (this.props.onCheck) {
                                    this.props.onCheck(event.nativeEvent);
                                  }
                                }}
                                onConfirm={(event) => {
                                  if (this.props.onConfirm) {
                                    this.props.onConfirm(event.nativeEvent);
                                  }
                                }}/>;
  }
}