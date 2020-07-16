import { Component } from 'react';
import { ImageSourcePropType } from 'react-native';
import { NOOP } from '../utils/fns';
interface Props {
    disabled: boolean;
    items: Array<ImageSourcePropType>;
    selectedIndex: number;
    invisible: boolean;
    onSelect: (index: number) => void;
}
export default class TypeSelector extends Component<Props, null> {
    static defaultProps: {
        disabled: boolean;
        items: never[];
        selectedIndex: number;
        invisible: boolean;
        onSelect: typeof NOOP;
    };
    onPress: (index: any) => void;
    getItems(): JSX.Element[];
    render(): JSX.Element;
}
export {};
