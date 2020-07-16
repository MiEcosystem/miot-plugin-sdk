import { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class HeaterHeader extends PureComponent {
    static propTypes: {
        title: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
    };
    render(): JSX.Element | null;
}
export declare class Background extends Component {
    static propTypes: {
        on: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        on: boolean;
        themeColor: null;
    };
    getDots(): any[];
    render(): JSX.Element | null;
}
