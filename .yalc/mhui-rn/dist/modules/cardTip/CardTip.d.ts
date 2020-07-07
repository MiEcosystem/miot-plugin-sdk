import { PureComponent } from 'react';
import { Props as CardButtonProps } from '../cardButton/CardButton';
interface Props extends CardButtonProps {
    closable: boolean;
}
interface State {
    visible: boolean;
}
export default class CardTip extends PureComponent<Props, State> {
    state: {
        visible: boolean;
    };
    hide: () => void;
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        visible: boolean;
    } | null;
    render(): JSX.Element | null;
}
export {};
