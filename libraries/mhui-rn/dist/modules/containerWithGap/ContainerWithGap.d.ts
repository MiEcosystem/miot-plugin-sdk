import { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class ContainerWithGap extends PureComponent {
    static propTypes: {
        containerStyle: PropTypes.Requireable<any>;
        horizontal: PropTypes.Requireable<boolean>;
        gap: PropTypes.Requireable<number>;
        outerGap: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        containerStyle: {};
        horizontal: boolean;
        gap: number;
        outerGap: number;
    };
    getContents(): any;
    render(): JSX.Element | null;
}
