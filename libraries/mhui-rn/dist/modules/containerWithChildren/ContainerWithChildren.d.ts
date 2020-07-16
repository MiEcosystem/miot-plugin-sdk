import { Component } from 'react';
interface Props {
    hasShadow: boolean;
}
export default class ContainerWithChildren extends Component<Props, null> {
    static defaultProps: {
        hasShadow: boolean;
    };
    getSizeLevel(itemCount: any): 3 | 2 | 1 | 0;
    getSelectors: () => any;
    render(): JSX.Element | null;
}
export {};
