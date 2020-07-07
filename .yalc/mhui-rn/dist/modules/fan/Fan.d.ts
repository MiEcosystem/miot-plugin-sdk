import { Component } from 'react';
import PropTypes from 'prop-types';
export default class Fan extends Component {
    static propTypes: {
        disabled: PropTypes.Requireable<boolean>;
        noDisableColor: PropTypes.Requireable<boolean>;
        speedLevel: PropTypes.Requireable<number>;
        type: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        disabled: boolean;
        noDisableColor: boolean;
        speedLevel: number;
        type: number;
    };
    render(): JSX.Element;
}
