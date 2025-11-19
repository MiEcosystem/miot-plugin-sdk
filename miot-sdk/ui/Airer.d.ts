export default class Airer extends React.Component<any, any, any> {
    static propTypes: {
        position: PropTypes.Requireable<number>;
        lightOn: PropTypes.Requireable<boolean>;
        controlable: PropTypes.Requireable<boolean>;
        onValueChanging: PropTypes.Requireable<(...args: any[]) => any>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        position: number;
        lightOn: boolean;
        controlable: boolean;
        onValueChanging: typeof log;
        onValueChange: typeof log;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    contentEventKey: string;
    currValue: number;
    lastValue: number;
    value: any;
    moveY: any;
    animateToPosition(position: any, duration?: number): void;
    aniPosition: any;
    stopAnimation(): void;
    initPanResponder(): void;
    panResponder: any;
    touchEnd(): void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
}
import React from "react";