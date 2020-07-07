class Logger {
  static theme = {
    ok: {
      background: 'purple',
      color: 'white'
    },
    error: {
      background: 'red',
      color: 'white'
    },
    warning: {
      background: 'darkorange',
      color: 'white'
    },
    attention: {
      background: '#ffdc00',
      color: 'black'
    },
    success: {
      background: '#bada55',
      color: 'black'
    },
    info: {
      background: '#abdcfb',
      color: 'black'
    },
    default: {
      background: 'white',
      color: 'black'
    }
  };

  static warn(message) {
    const styles = [`color: ${Logger.theme.warning.color}`, `background: ${Logger.theme.warning.background}`, 'padding: 5px', 'font-size: 14px'].join(';'); // eslint-disable-next-line no-console

    if (__DEV__ && console.warn) {
      // eslint-disable-next-line no-console
      console.warn('%c%s', styles, message);
    }
  }

}

export default Logger;