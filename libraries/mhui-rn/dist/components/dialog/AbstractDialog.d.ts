import PropTypes from 'prop-types';
import React from 'react';
declare class AbstractDialog extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<number | object>;
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        showTitle: PropTypes.Requireable<boolean>;
        showSubtitle: PropTypes.Requireable<boolean>;
        canDismiss: PropTypes.Requireable<boolean>;
        buttons: PropTypes.Requireable<(PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<any>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        showButton: PropTypes.Requireable<boolean>;
        dialogStyle: PropTypes.Requireable<object>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        animationType: string;
        visible: boolean;
        showTitle: boolean;
        showSubtitle: boolean;
        dialogStyle: {
            unlimitedHeightEnable: boolean;
            allowFontScaling: boolean;
            titleNumberOfLines: number;
            subTitleNumberOfLines: number;
            titleStyle: {};
            subTitleStyle: {};
        };
        canDismiss: boolean;
        buttons: null;
        showButton: boolean;
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    _checkUnlimitedHeightEnable(): boolean;
    renderTitle(): JSX.Element | null;
    renderContent(): {};
    renderButtonGroup(): JSX.Element | null;
    renderOneButton(buttons: any): JSX.Element | null;
    renderTwoButtons(buttons: any): JSX.Element | null;
    render(): JSX.Element;
    dismiss(): void;
}
export default AbstractDialog;
