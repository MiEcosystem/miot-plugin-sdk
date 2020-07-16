import { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { log } from '../utils/fns';
export default class Curtain extends Component {
    static propTypes: {
        type: PropTypes.Requireable<number>;
        position: PropTypes.Requireable<number>;
        onValueChanging: PropTypes.Requireable<(...args: any[]) => any>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        type: number;
        position: number;
        onValueChanging: typeof log;
        onValueChange: typeof log;
    };
    currValue: number;
    lastValue: number;
    value: Animated.Value;
    leftX: Animated.Value;
    rightX: Animated.Value;
    animateToPosition(position: any, duration?: number): void;
    stopAnimation(): void;
    initPanResponder(): void;
    touchEnd(): void;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    UNSAFE_componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getCurtains(): JSX.Element[];
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    render(): JSX.Element;
}
