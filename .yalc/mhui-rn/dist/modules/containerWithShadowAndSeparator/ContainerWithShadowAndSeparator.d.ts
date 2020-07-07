import React, { Component } from 'react';
import { ViewStyle } from 'react-native';
interface Props {
    containerStyle: ViewStyle;
    separatorStyle: ViewStyle;
    horizontal: boolean;
}
interface State {
    width: number;
    height: number;
}
export default class ContainerWithShadowAndSeparator extends Component<Props, State> {
    static defaultProps: {
        containerStyle: {};
        separatorStyle: {};
        horizontal: boolean;
    };
    state: {
        width: number;
        height: number;
    };
    getContents(): JSX.Element[] | null;
    onLayout: (e: any) => void;
    render(): React.ReactNode;
}
export {};
