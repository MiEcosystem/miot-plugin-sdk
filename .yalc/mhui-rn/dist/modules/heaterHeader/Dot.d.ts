import { Component } from 'react';
import { Animated, ImageSourcePropType } from 'react-native';
interface Props {
    width: number;
    height: number;
    source: ImageSourcePropType;
}
interface State {
    progress: Animated.Value;
}
export default class Dot extends Component<Props, State> {
    state: {
        progress: Animated.Value;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    startAnimation(): void;
    stopAnimation(): void;
    render(): JSX.Element;
}
export declare function createDot(width: number, height: number, source: ImageSourcePropType): JSX.Element;
export {};
