//@native begin
import React, {Component, Fragment} from 'react';
import Resources, {Language} from '../resources';
import i18n from '../resources/Strings';
import {LoadingDialog, MessageDialog, InputDialog, ChoiceDialog} from '../ui/Dialog';
import {getNavigationEventKey} from '../ui/PageWithNormalNavigator';
import {NOOP, log} from './fns';
const LANGUAGE = Resources.getLanguage();
// const i18n = (Resources.createI18n({
//   zh: {
//     handling: '处理中...',
//     error: '处理失败，请稍后重试',
//     ok: '确定'
//   }
// }, LANGUAGE) || {}).strings;
// let componentRef = null;
let componentRefs = {};
export const TYPES = {
  loading: 'loading',
  message: 'message',
  input: 'input',
  selector: 'selector'
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
    // componentRef = this;
    componentRefs[getNavigationEventKey()] = this;
  }
  componentWillUnmount() {
    // 可能先退出页面，后执行此处，导致获取到的key不对并误删
    // componentRefs[getNavigationEventKey()] = null;
  }
  render() {
    let {type, visible, message, inputs, timeout, buttons, options, selectedIndexs, selectorType, onSelect} = this.state;
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
        {visible && type === TYPES.selector ? (
          <ChoiceDialog visible={visible && type === TYPES.selector} title={message} options={options} selectedIndexArray={selectedIndexs} type={selectorType} onSelect={onSelect} />
        ) : null}
      </Fragment>
    );
  }
}
export function hideDialog() {
  let componentRef = componentRefs[getNavigationEventKey()];
  componentRef && componentRef.hide();
}
export function showError({
  message = i18n.error,
  timeout = 2000
} = {
  message: i18n.error,
  timeout: 2000
}) {
  let componentRef = componentRefs[getNavigationEventKey()];
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
  let componentRef = componentRefs[getNavigationEventKey()];
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
  let componentRef = componentRefs[getNavigationEventKey()];
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
  let componentRef = componentRefs[getNavigationEventKey()];
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
export function showSelector({
  message = '',
  selectedIndexs = [],
  options = [],
  onSelect = log
} = {
  message: '',
  selectedIndexs: [],
  options: [],
  onSelect: log
}) {
  if(!options || !options.length) {
    return;
  }
  let componentRef = componentRefs[getNavigationEventKey()];
  componentRef && componentRef.setState({
    type: TYPES.selector,
    visible: true,
    message,
    selectedIndexs,
    options,
    onSelect
  });
};
//@native end