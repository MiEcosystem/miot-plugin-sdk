import React from 'react';
import PropTypes from 'prop-types';
export interface RectangleProps {
    width: number;
    height: number;
    degree: number;
}
declare class Rectangle extends React.PureComponent<RectangleProps, null> {
    static propTypes: {
        width: PropTypes.Validator<number>;
        height: PropTypes.Validator<number>;
        degree: PropTypes.Validator<number>;
    };
    render(): JSX.Element;
}
export default Rectangle;
