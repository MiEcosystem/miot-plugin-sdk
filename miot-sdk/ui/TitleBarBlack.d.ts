export default class TitleBarBlack extends React.Component<any, any, any> {
    static propTypes: {
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
    constructor(props: any);
}
import React from "react";