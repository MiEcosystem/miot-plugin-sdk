import PropTypes from 'prop-types';
import React from 'react';
declare class ListItemWithSwitch extends React.Component {
    static propTypes: {
        title: PropTypes.Validator<string>;
        subtitle: PropTypes.Requireable<string>;
        valueText: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        onValueChange: PropTypes.Validator<(...args: any[]) => any>;
        showSeparator: PropTypes.Requireable<boolean>;
        separator: PropTypes.Requireable<PropTypes.ReactElementLike>;
        containerStyle: PropTypes.Requireable<object>;
        titleStyle: PropTypes.Requireable<object>;
        subtitleStyle: PropTypes.Requireable<object>;
        valueTextStyle: PropTypes.Requireable<object>;
        switchStyle: PropTypes.Requireable<object>;
        tintColor: PropTypes.Requireable<string>;
        onTintColor: PropTypes.Requireable<string>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        subtitleNumberOfLines: PropTypes.Requireable<number>;
        valueNumberOfLines: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        title: string;
        subtitle: string;
        valueText: string;
        value: boolean;
        disabled: boolean;
        showSeparator: boolean;
        containerStyle: {};
        titleStyle: {};
        subtitleStyle: {};
        valueTextStyle: {};
        switchStyle: {};
        tintColor: undefined;
        onTintColor: undefined;
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
    };
    constructor(props: any, context: any);
    render(): JSX.Element;
    renderSeparator(): any;
    _onValueChange(value: any): void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
}
export default ListItemWithSwitch;
