import { Component } from 'react';
import PropTypes from 'prop-types';
export default class ImageHeader extends Component {
    static propTypes: {
        icon: PropTypes.Requireable<any>;
        iconStyle: PropTypes.Requireable<any>;
        containerStyle: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
    };
    render(): JSX.Element | null;
}
