import React, { PureComponent } from 'react';
import { LayoutChangeEvent } from 'react-native';
interface Props {
    gap: number;
    horizontal: boolean;
}
interface State {
    shown: boolean;
}
export default class GapWrap extends PureComponent<Props, State> {
    state: {
        shown: boolean;
    };
    onLayout: (e: LayoutChangeEvent) => void;
    render(): React.ReactNode;
}
export {};
