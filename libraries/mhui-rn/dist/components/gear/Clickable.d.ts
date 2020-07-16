import PropTypes from 'prop-types';
import React from 'react';
import { Animated } from 'react-native';
export default class Clickable extends React.Component {
    static propTypes: {
        select: PropTypes.Requireable<boolean>;
        selectColor: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        onPress: PropTypes.Validator<(...args: any[]) => any>;
        text: PropTypes.Validator<string | number>;
        textStyle: PropTypes.Requireable<object>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        numberOfLines: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        select: boolean;
        selectColor: string;
        allowFontScaling: boolean;
    };
    animatedValue: Animated.Value;
    render(): JSX.Element;
}
