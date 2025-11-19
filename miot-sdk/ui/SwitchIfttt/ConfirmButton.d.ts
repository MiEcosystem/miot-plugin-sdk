export default class ConfirmButton extends React.Component<any, any, any> {
    static propTypes: {
        title: PropTypes.Requireable<string>;
        themeColor: PropTypes.Requireable<any>;
        textColor: PropTypes.Requireable<any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        clickInterval: PropTypes.Requireable<number>;
        onPressIn: PropTypes.Requireable<(...args: any[]) => any>;
        onPressOut: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        icon: PropTypes.Requireable<any>;
        iconSelected: PropTypes.Requireable<any>;
        containerStyle: PropTypes.Requireable<any>;
        btnStyle: PropTypes.Requireable<any>;
        iconStyle: PropTypes.Requireable<any>;
        textStyle: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        title: string;
        themeColor: string;
        textColor: string;
        icon: null;
        containerStyle: {};
        iconStyle: {};
        btnStyle: {};
        textStyle: {};
        onClick: typeof NOOP;
        clickInterval: number;
        onLongPress: typeof NOOP;
        onPressIn: typeof NOOP;
        onPressOut: typeof NOOP;
        disabled: boolean;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    onPress: () => void;
    onLongPress: () => void;
    _longPressInterval: NodeJS.Timeout | undefined;
    onPressIn: () => void;
    onPressOut: () => void;
}
import React from "react";