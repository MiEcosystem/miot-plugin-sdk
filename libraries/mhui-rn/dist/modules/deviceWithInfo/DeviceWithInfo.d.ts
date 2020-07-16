import { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class DeviceWithInfo extends PureComponent {
    static propTypes: {
        icon: PropTypes.Requireable<any>;
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        holdPlace: PropTypes.Requireable<boolean>;
        progress: PropTypes.Requireable<number>;
        themeColor: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
    };
    render(): JSX.Element;
}
