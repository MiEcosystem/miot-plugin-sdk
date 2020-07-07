import PropTypes from 'prop-types';
import React from 'react';
import { ConfigContext } from '../configProvider';
declare class LoadingDialog extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        message: PropTypes.Requireable<string>;
        timeout: PropTypes.Requireable<number>;
        dialogStyle: PropTypes.Requireable<object>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        dialogStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            messageStyle: {};
        };
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    render(): JSX.Element;
    componentWillUnmount(): void;
}
export default LoadingDialog;
