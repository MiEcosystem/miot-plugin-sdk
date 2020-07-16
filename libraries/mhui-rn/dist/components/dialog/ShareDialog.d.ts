import PropTypes from 'prop-types';
import React from 'react';
import { ConfigContext } from '../configProvider';
declare class ShareDialog extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        title: PropTypes.Requireable<string>;
        dialogStyle: PropTypes.Requireable<object>;
        options: PropTypes.Requireable<(PropTypes.InferProps<{
            icon: PropTypes.Requireable<any>;
            text: PropTypes.Requireable<string>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        buttons: PropTypes.Requireable<(PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<any>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        options: {
            icon: any;
            text: string;
            callback: () => void;
        }[];
        dialogStyle: {
            unlimitedHeightEnable: boolean;
            allowFontScaling: boolean;
            titleNumberOfLines: number;
            itemTextNumberOfLines: number;
        };
    };
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    constructor(props: any, context: any);
    renderIcons(options: any, index: any): JSX.Element;
    renderIconsPages(options: any): JSX.Element;
    render(): JSX.Element;
    _onDismiss(): void;
}
export default ShareDialog;
