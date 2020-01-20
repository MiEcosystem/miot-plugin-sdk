//@native begin
import React, {Component, Fragment} from 'react';
import Resources, {Language} from '../resources';
import i18n from '../resources/Strings';
import {LoadingDialog, MessageDialog, InputDialog} from '../ui/Dialog';
import {NOOP, log} from './fns';
const LANGUAGE = Resources.getLanguage();
// const i18n = (Resources.createI18n({
//   zh: {
//     handling: '处理中...',
//     error: '处理失败，请稍后重试',
//     ok: '确定'
//   }
// }, LANGUAGE) || {}).strings;
let componentRef = null;
export const TYPES = {
  loading: 'loading',
  message: 'message',
  input: 'input'
};
export class DialogComponent extends Component {
  state = {
    type: null,
    visible: false,
    message: '',
    timeout: 3000
  };
  hide = () => {
    this.setState({
      visible: false
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.visible === false && nextState.visible === false) {
      return false;
    }
    return true;
  }
  componentDidMount() {
    componentRef = this;
  }
  render() {
    let {type, visible, message, inputs, timeout, buttons} = this.state;
    return (
      <Fragment>
        {visible && type === TYPES.loading ? (
          <LoadingDialog visible={visible && type === TYPES.loading} message={message} timeout={timeout || 0} onDismiss={this.hide} />
        ) : null}
        {visible && type === TYPES.message ? (
          <MessageDialog visible={visible && type === TYPES.message} message={message} buttons={buttons} onDismiss={this.hide} />
        ) : null}
        {visible && type === TYPES.input ? (
          <InputDialog visible={visible && type === TYPES.input} title={message} inputs={inputs} buttons={buttons} onDismiss={this.hide} />
        ) : null}
      </Fragment>
    );
  }
}
export function hideDialog() {
  componentRef && componentRef.hide();
}
export function showError({
  message = i18n.error,
  timeout = 2000
} = {
  message: i18n.error,
  timeout: 2000
}) {
  componentRef && componentRef.setState({
    type: TYPES.loading,
    visible: true,
    message,
    timeout
  });
}
export function showLoading({
  message = i18n.handling
} = {
  message: i18n.handling
}) {
  componentRef && componentRef.setState({
    type: TYPES.loading,
    visible: true,
    message
  });
}
export function showMessage({
  message = '',
  buttons = [{
    text: i18n.ok,
    callback: NOOP
  }]
} = {
  message: '',
  buttons: [{
    text: i18n.ok,
    callback: NOOP
  }]
}) {
  if(!message) {
    return;
  }
  componentRef && componentRef.setState({
    type: TYPES.message,
    visible: true,
    message,
    buttons: buttons.map(button => {
      return {
        ...button,
        callback: () => {
          hideDialog();
          button.callback();
        }
      }
    })
  });
}
export function showInput({
  message = '',
  inputs = [{
    placeholder: '',
    defaultValue: ''
  }],
  // buttons = [{
  //   text: i18n.cancel,
  //   callback: hideDialog
  // }, {
  //   text: i18n.ok,
  //   callback: log
  // }],
  onConfirm = log
} = {
  message: '',
  inputs: [{
    placeholder: '',
    defaultValue: ''
  }],
  buttons: [{
    text: i18n.cancel,
    callback: hideDialog
  }, {
    text: i18n.ok,
    callback: log
  }],
  onConfirm: log
}) {
  if(!message) {
    return;
  }
  componentRef && componentRef.setState({
    type: TYPES.input,
    visible: true,
    message,
    inputs,
    buttons: [{
      text: i18n.cancel,
      callback: hideDialog
    }, {
      text: i18n.ok,
      callback: e => {
        hideDialog();
        if(onConfirm) {
          onConfirm(e && e.textInputArray ? e.textInputArray[0] : '');
        }
      }
    }]
  });
}
//@native end