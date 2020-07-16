import React, { createContext, PureComponent } from 'react';
import { getTheme } from "../../styles/themes";
import { currentDarkMode, language } from "../../native/mihome";
export const ConfigContext = createContext({
  language: language,
  theme: getTheme('default', currentDarkMode),
  colorScheme: currentDarkMode,
  environment: 'mihome'
});
export const ConfigConsumer = ConfigContext.Consumer;
export class ConfigProvider extends PureComponent {
  render() {
    const config = {
      language: this.props.language || 'zh',
      theme: getTheme('default', this.props.colorScheme || 'light'),
      colorScheme: this.props.colorScheme || 'light',
      environment: this.props.environment || 'native'
    };
    return <ConfigContext.Provider value={{ ...config
    }}>
        {this.props.children}
      </ConfigContext.Provider>;
  }

}