import PropTypes from 'prop-types';
import React from 'react';
import { ViewStyle } from 'react-native';
declare class BlankPage extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        type: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<any>;
        underline: PropTypes.Requireable<object>;
        button: PropTypes.Requireable<object>;
        iconStyle: PropTypes.Validator<import("react-native").StyleProp<ViewStyle>> | undefined;
        message: PropTypes.Validator<string>;
        desc: PropTypes.Requireable<string>;
        extraInfo: PropTypes.Requireable<string>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        type: string;
        underline: {};
        button: {};
        icon: any;
    };
    constructor(props: any);
    static TYPE: {
        BUTTON: string;
        UNDERLINE: string;
    };
    renderCenter(): JSX.Element;
    renderBottom(): JSX.Element;
    onPress(callback: any): void;
    render(): JSX.Element;
}
export default BlankPage;
