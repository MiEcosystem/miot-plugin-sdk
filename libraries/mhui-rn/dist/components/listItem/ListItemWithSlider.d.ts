import PropTypes from 'prop-types';
import React from 'react';
declare class ListItemWithSlider extends React.Component {
    static propTypes: {
        title: PropTypes.Validator<string>;
        subtitle: PropTypes.Requireable<string>;
        sliderProps: PropTypes.Requireable<object>;
        showWithPercent: PropTypes.Requireable<boolean>;
        unit: PropTypes.Requireable<string>;
        sliderStyle: PropTypes.Requireable<object>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        onSlidingComplete: PropTypes.Validator<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        containerStyle: PropTypes.Requireable<object>;
        titleStyle: PropTypes.Requireable<object>;
        valueStyle: PropTypes.Requireable<object>;
        showSeparator: PropTypes.Requireable<boolean>;
        separator: PropTypes.Requireable<PropTypes.ReactElementLike>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        valueNumberOfLines: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        title: string;
        subtitle: string;
        showWithPercent: boolean;
        unit: string;
        disabled: boolean;
        containerStyle: {};
        titleStyle: {};
        valueStyle: {};
        showSeparator: boolean;
        onSlidingComplete: () => void;
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
    };
    constructor(props: any, context: any);
    render(): JSX.Element;
    renderSeparator(): any;
    format(val: any): string;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    _onValueChange(value: any): void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    _onSlidingComplete(value: any): void;
}
export default ListItemWithSlider;
