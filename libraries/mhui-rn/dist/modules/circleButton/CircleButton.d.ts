import { Component } from 'react';
import { ImageSourcePropType } from 'react-native';
interface Props {
    sizeLevel: 0 | 1 | 2 | 3;
    themeColor: string;
    disabled: boolean;
    showHighlight: boolean;
    selected: boolean;
    horizontal: boolean;
    onPress: () => void;
    title: string;
    icon: ImageSourcePropType;
    iconSelected: ImageSourcePropType;
    iconText: number | string;
}
interface State {
    isPressing: boolean;
}
export default class CircleButton extends Component<Props, State> {
    static defaultProps: {
        sizeLevel: number;
        themeColor: string;
        offColor: string;
        disabled: boolean;
        showHighlight: boolean;
        selected: boolean;
        horizontal: boolean;
        onPress: () => void;
        title: string;
        icon: null;
        iconSelected: null;
        iconText: string;
    };
    state: {
        isPressing: boolean;
    };
    onPress: () => void;
    onPressIn: () => void;
    onPressOut: () => void;
    render(): JSX.Element;
}
export {};
