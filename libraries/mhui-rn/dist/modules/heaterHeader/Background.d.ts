import { Component } from 'react';
interface Props {
    on: boolean;
    themeColor: string;
}
export default class Background extends Component<Props, null> {
    static defaultProps: {
        on: boolean;
        themeColor: null;
    };
    getDots(): any[];
    render(): JSX.Element | null;
}
export {};
