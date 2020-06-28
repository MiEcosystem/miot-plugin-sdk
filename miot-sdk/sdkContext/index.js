import React from 'react';
import DarkMode from '../darkmode';
export const SDKContext = React.createContext();
export const SDKContextConsumer = SDKContext.Consumer;
export function injectContext(target) {
  target.contextType = SDKContext;
}
export const SDKContextProvider = (props) => {
  const { children, value } = props;
  const defaultValue = {
    colorScheme: DarkMode.getColorScheme() ? DarkMode.getColorScheme() : 'light',
    ...value
  };
  return (
    <SDKContext.Provider value={defaultValue}>
      {
        children
      }
    </SDKContext.Provider>
  );
};
export const withSDKContext = (Component) => {
  return class extends Component {
    render() {
      const { props } = this;
      return (
        <SDKContextConsumer>
          {
            (values) => <Component {...props} {...values} />
          }
        </SDKContextConsumer>
      );
    }
  };
};