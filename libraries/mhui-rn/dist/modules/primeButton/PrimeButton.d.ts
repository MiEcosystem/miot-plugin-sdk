import { Component } from 'react';
import PropTypes from 'prop-types';
import { NOOP } from '../utils/fns';
export default class PrimeButton extends Component {
    static propTypes: {
        title: PropTypes.Requireable<string>;
        themeColor: PropTypes.Requireable<any>;
        textColor: PropTypes.Requireable<any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        title: string;
        themeColor: string;
        textColor: string;
        onClick: typeof NOOP;
        disabled: boolean;
    };
    onPress: () => void;
    render(): JSX.Element | null;
}
