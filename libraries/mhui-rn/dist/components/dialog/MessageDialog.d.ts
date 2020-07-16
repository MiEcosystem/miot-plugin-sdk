import PropTypes from 'prop-types';
import React from 'react';
declare class MessageDialog extends React.Component {
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        type: PropTypes.Requireable<string>;
        color: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        message: PropTypes.Requireable<string>;
        messageStyle: any;
        extraText: PropTypes.Requireable<string>;
        extra: PropTypes.Requireable<object>;
        buttons: PropTypes.Requireable<(object | null | undefined)[]>;
        dialogStyle: PropTypes.Requireable<object>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        type: string;
        color: string;
        message: string;
        messageStyle: {};
        dialogStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            titleNumberOfLines: number;
            messageNumberOfLines: number;
            extraTextNumberOfLines: number;
            titleStyle: {};
            extraTextStyle: {};
        };
        extra: {};
    };
    static TYPE: {
        SIMPLE: string;
        UNDERLINE: string;
        CHECKBOX: string;
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(props: any): void;
    process(props: any): void;
    renderExtra(): JSX.Element | null;
    render(): JSX.Element | null;
    _onDismiss(): void;
    onPressUnderlineText(): void;
    onPressCheckbox(): void;
}
export default MessageDialog;
