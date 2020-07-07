import { Component } from 'react';
import { Props as SelectorWithButtonProps } from '../selectorWithButton';
interface Props {
    title: string;
    subtitle: string;
    disabled: boolean;
    secondShow: boolean;
    secondDisabled: boolean;
    first: SelectorWithButtonProps;
    second: SelectorWithButtonProps;
    hasShadow: boolean;
}
export default class DoubleSelectors extends Component<Props, null> {
    static defaultProps: {
        title: string;
        subtitle: string;
        disabled: boolean;
        secondShow: boolean;
        secondDisabled: boolean;
        first: {
            items: never[];
        };
        second: {
            items: never[];
        };
        hasShadow: boolean;
    };
    render(): JSX.Element;
}
export {};
