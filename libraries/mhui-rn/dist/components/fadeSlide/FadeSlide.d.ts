import PropTypes from 'prop-types';
import { Component } from 'react';
import { Animated } from 'react-native';
interface FadeSlideProps {
    isShown: boolean;
    childrenHeight: number;
}
interface FadeSlideState {
    height: Animated.Value;
    opacity: Animated.Value;
}
declare class FadeSlide extends Component<FadeSlideProps, FadeSlideState> {
    static defaultProps: {
        isShown: boolean;
        childrenHeight: number;
    };
    static propTypes: {
        isShown: PropTypes.Requireable<boolean>;
        childrenHeight: PropTypes.Requireable<number>;
    };
    constructor(props: FadeSlideProps);
    UNSAFE_componentWillReceiveProps(nextProps: FadeSlideProps): void;
    changeStatus: (heightTo: number | Animated.Value | Animated.ValueXY | {
        x: number;
        y: number;
    }, opacityTo: number | Animated.Value | Animated.ValueXY | {
        x: number;
        y: number;
    }) => void;
    render(): JSX.Element;
}
export default FadeSlide;
