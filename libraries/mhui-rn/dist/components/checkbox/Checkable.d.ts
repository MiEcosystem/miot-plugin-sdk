import PropTypes from 'prop-types';
import React from 'react';
export interface CheckableProps {
    size: number;
    visible: boolean;
}
export default class Checkable extends React.Component {
    static propTypes: {
        size: PropTypes.Validator<number>;
        visible: PropTypes.Validator<boolean>;
    };
    static defaultProps: {
        size: number;
        visible: boolean;
    };
    constructor(props: any, context: any);
    render(): JSX.Element;
}
