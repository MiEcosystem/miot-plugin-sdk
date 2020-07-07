import React, { PureComponent } from 'react';
import { ITheme } from '../../styles/themes';
declare type Modify<T, R> = Omit<T, keyof R> & R;
export declare type ConfigContextProps = {
    language?: Languages;
    theme: Themes;
    colorScheme?: ColorScheme;
    environment?: Environment;
};
export declare type ConfigContextShape = Modify<ConfigContextProps, {
    theme: ITheme;
}>;
export declare const ConfigContext: React.Context<Partial<Modify<ConfigContextProps, {
    theme: ITheme;
}>>>;
export declare const ConfigConsumer: React.Consumer<Partial<Modify<ConfigContextProps, {
    theme: ITheme;
}>>>;
declare type Languages = 'zh' | 'zh_tw' | 'zh_hk' | 'en' | 'ko' | 'ru' | 'es' | 'fr' | 'it' | 'de' | 'id' | 'pl' | 'vi' | 'ja' | 'th' | 'tr' | 'nl' | 'pt';
declare type Themes = 'default';
declare type ColorScheme = 'light' | 'dark';
declare type Environment = 'mihome' | 'native' | 'web';
export declare class ConfigProvider extends PureComponent<ConfigContextProps, {}> {
    render(): JSX.Element;
}
export {};
