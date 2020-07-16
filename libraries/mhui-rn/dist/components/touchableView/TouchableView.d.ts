import PropTypes from 'prop-types';
import React from 'react';
export default class TouchableView extends React.Component {
    static propTypes: {
        delayLongPress: PropTypes.Requireable<number>;
        delayPressIn: PropTypes.Requireable<number>;
        delayPressOut: PropTypes.Requireable<number>;
        disabled: PropTypes.Requireable<boolean>;
        onLongPress: PropTypes.Requireable<(...args: any[]) => any>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        viewStyle: PropTypes.Validator<import("react-native").StyleProp<import("react-native").ViewStyle>> | undefined;
        underlayColor: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        delayLongPress: number;
        delayPressIn: number;
        delayPressOut: number;
        disabled: boolean;
        viewStyle: {};
        underlayColor: string;
    };
    constructor(props: any, context: any);
    render(): JSX.Element;
}
