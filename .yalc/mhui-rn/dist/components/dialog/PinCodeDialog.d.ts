import PropTypes from 'prop-types';
import React from 'react';
declare class PinCodeDialog extends React.Component {
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        title: PropTypes.Requireable<string>;
        message: PropTypes.Requireable<string>;
        digit: PropTypes.Requireable<number>;
        color: PropTypes.Requireable<any>;
        dialogStyle: PropTypes.Requireable<object>;
        checkboxData: PropTypes.Requireable<PropTypes.InferProps<{
            checked: PropTypes.Requireable<boolean>;
            text: PropTypes.Requireable<string>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }>>;
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
        digit: number;
        color: string;
        checkboxData: {};
        dialogStyle: {
            unlimitedHeightEnable: boolean;
            allowFontScaling: boolean;
            titleNumberOfLines: number;
            messageNumberOfLines: number;
            titleStyle: {};
            messageStyle: {};
            digitStyle: {};
        };
    };
    UNSAFE_componentWillReceiveProps(props: any): void;
    constructor(props: any, context: any);
    process(props: any): void;
    _onChangeText(text: any): void;
    renderUpExtra(): JSX.Element | null;
    renderTextGroup(): JSX.Element[];
    renderDownExtra(): JSX.Element | null;
    render(): JSX.Element | null;
    _onDismiss(): void;
    onPressCheckbox(): void;
}
export default PinCodeDialog;
