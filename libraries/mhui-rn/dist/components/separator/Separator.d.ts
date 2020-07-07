import React from 'react';
import PropTypes from 'prop-types';
declare class Separator extends React.PureComponent {
    static propTypes: {
        type: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        type: string;
    };
    render(): JSX.Element | undefined;
}
export default Separator;
