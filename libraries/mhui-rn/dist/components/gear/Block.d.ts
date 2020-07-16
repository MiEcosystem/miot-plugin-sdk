import React from 'react';
import PropTypes from 'prop-types';
export default class Block extends React.Component {
    static propTypes: {
        style: PropTypes.Requireable<any>;
        panHandlers: PropTypes.Requireable<object>;
        onLongPress: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
    };
    render(): JSX.Element;
}
