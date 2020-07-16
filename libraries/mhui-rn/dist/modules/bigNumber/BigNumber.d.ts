import { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class BigNumber extends PureComponent {
    static propTypes: {
        title: PropTypes.Requireable<string>;
        number: PropTypes.Requireable<string | number>;
        themeColor: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
    };
    render(): JSX.Element | null;
}
