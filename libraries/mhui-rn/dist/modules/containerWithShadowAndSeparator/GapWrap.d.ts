import React, { Component } from 'react';
import { LayoutChangeEvent, ViewStyle } from 'react-native';
interface Props {
    hasSeparator: boolean;
    separatorStyle: ViewStyle;
}
interface State {
    shown: boolean;
}
export default class GapWrap extends Component<Props, State> {
    state: {
        shown: boolean;
    };
    onLayout: (e: LayoutChangeEvent) => void;
    render(): React.ReactNode;
}
export {};
