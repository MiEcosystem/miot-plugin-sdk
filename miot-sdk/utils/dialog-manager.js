export function hideDialog(customKey) {
  let componentRef = componentRefs[customKey || getNavigationEventKey()];
  componentRef && componentRef.hide();
}
export function showError({
  message = i18n.error,
  timeout = 2000
} = {
  message: i18n.error,
  timeout: 2000
}, customKey) {
  let componentRef = componentRefs[customKey || getNavigationEventKey()];
  componentRef && componentRef.setState({
    type: TYPES.loading,
    visible: true,
    loadingParams: {
      message,
      timeout
    }
  });
}
export function showLoading({
  message = i18n.handling
} = {
  message: i18n.handling
}, customKey) {
  let componentRef = componentRefs[customKey || getNavigationEventKey()];
  componentRef && componentRef.setState({
    type: TYPES.loading,
    visible: true,
    loadingParams: {
      message
    }
  });
}
export function showMessage({
  message = '',
  buttons = [{
    text: i18n.ok,
    callback: NOOP
  }],
  messageStyle = {}
} = {
  message: '',
  buttons: [{
    text: i18n.ok,
    callback: NOOP
  }],
  messageStyle: {}
}, customKey) {
  if (!message) {
    return;
  }
  let componentRef = componentRefs[customKey || getNavigationEventKey()];
  componentRef && componentRef.setState({
    type: TYPES.message,
    visible: true,
    messageParams: {
      message,
      messageStyle,
      buttons: buttons.map((button) => {
        return {
          ...button,
          callback: () => {
            hideDialog();
            button.callback();
          }
        };
      })
    }
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
}, customKey) {
  if (!message) {
    return;
  }
  let componentRef = componentRefs[customKey || getNavigationEventKey()];
  componentRef && componentRef.setState({
    type: TYPES.input,
    visible: true,
    inputParams: {
      message,
      inputs,
      buttons: [{
        text: i18n.cancel,
        callback: hideDialog
      }, {
        text: i18n.ok,
        callback: (e) => {
          hideDialog();
          if (onConfirm) {
            onConfirm(e && e.textInputArray ? e.textInputArray[0] : '');
          }
        }
      }]
    }
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
}, customKey) {
  if (!options || !options.length) {
    return;
  }
  let componentRef = componentRefs[customKey || getNavigationEventKey()];
  componentRef && componentRef.setState({
    type: TYPES.selector,
    visible: true,
    selectorParams: {
      message,
      selectedIndexs,
      options,
      onSelect
    }
  });
}
export function showCustom({
  title = '',
  subtitle = '',
  buttons = [{
    text: i18n.cancel,
    callback: hideDialog
  }, {
    text: i18n.ok,
    callback: hideDialog
  }],
  onConfirm,
  component,
  componentProps,
  ...rest
} = {
  title: '',
  subtitle: '',
  buttons: [{
    text: i18n.cancel,
    callback: hideDialog
  }, {
    text: i18n.ok,
    callback: hideDialog
  }]
}, customKey) {
  let componentRef = componentRefs[customKey || getNavigationEventKey()];
  if (buttons[1] && onConfirm) {
    let callback = buttons[1].callback;
    buttons[1].callback = () => {
      callback();
      onConfirm();
    };
  }
  componentRef && componentRef.setState({
    type: TYPES.custom,
    visible: true,
    customParams: {
      title,
      subtitle,
      buttons,
      ...rest,
      CustomComponent: component,
      customProps: componentProps
    }
  });
}
export function showTimepicker(params, customKey) {
  let componentRef = componentRefs[customKey || getNavigationEventKey()];
  componentRef && componentRef.setState({
    type: TYPES.timepicker,
    visible: true,
    timepickerParams: {
      ...params,
      onDismiss: () => {
        hideDialog();
      }
    }
  });
}