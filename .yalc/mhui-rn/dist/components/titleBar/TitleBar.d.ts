import PropTypes from 'prop-types';
import React, { Component } from 'react';
declare class TitleBar extends Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        type: PropTypes.Requireable<string>;
        leftTextStyle: PropTypes.Requireable<any>;
        rightTextStyle: PropTypes.Requireable<any>;
        style: PropTypes.Requireable<any>;
        leftText: PropTypes.Requireable<string>;
        rightText: PropTypes.Requireable<string>;
        onPressLeft: PropTypes.Requireable<(...args: any[]) => any>;
        onPressLeft2: PropTypes.Requireable<(...args: any[]) => any>;
        onPressRight: PropTypes.Requireable<(...args: any[]) => any>;
        onPressRight2: PropTypes.Requireable<(...args: any[]) => any>;
        onPressTitle: PropTypes.Requireable<(...args: any[]) => any>;
        title: PropTypes.Requireable<string>;
        subTitle: PropTypes.Requireable<string>;
        titleStyle: any;
        subtitleStyle: any;
        allowFontScaling: PropTypes.Requireable<boolean>;
        showDot: PropTypes.Requireable<boolean>;
        accessible: PropTypes.Requireable<boolean>;
        leftAccessibilityLabel: PropTypes.Requireable<string | number>;
        leftAccessibilityHint: PropTypes.Requireable<string | number>;
        left2AccessibilityLabel: PropTypes.Requireable<string | number>;
        left2AccessibilityHint: PropTypes.Requireable<string | number>;
        rightAccessibilityLabel: PropTypes.Requireable<string | number>;
        rightAccessibilityHint: PropTypes.Requireable<string | number>;
        right2AccessibilityLabel: PropTypes.Requireable<string | number>;
        right2AccessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        type: string;
        allowFontScaling: boolean;
        titleStyle: {};
        subtitleStyle: {};
    };
    constructor(props: any);
    UNSAFE_componentWillMount(): void;
    render(): JSX.Element;
}
export default TitleBar;
