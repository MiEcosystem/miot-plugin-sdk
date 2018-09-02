/**
 * @export
 * @module miot/ui/MessageDialog
 * @description 消息对话框
 * @mark andr done
 */
import React, {Component} from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
const RCTMessageDialog = requireNativeComponent('RCTMessageDialog', null);
export default class MessageDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    cancel: PropTypes.string,
    confirm: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onDismiss: PropTypes.func,
    ...ViewPropTypes,
  };
  render() {
    return <RCTMessageDialog {...this.props}
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
                             onConfirm={(event) => {
                               if (this.props.onConfirm) {
                                 this.props.onConfirm(event.nativeEvent);
                               }
                             }}/>;
  }
}