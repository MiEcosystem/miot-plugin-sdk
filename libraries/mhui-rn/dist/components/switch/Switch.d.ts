import PropTypes from 'prop-types';
import React from 'react';
import { Animated } from 'react-native';
import { ConfigContext } from '../configProvider';
declare class Switch extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        accessible: PropTypes.Requireable<boolean>;
        accessibilityRole: PropTypes.Requireable<string>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
        accessibilityState: PropTypes.Requireable<PropTypes.InferProps<{
            disabled: PropTypes.Requireable<boolean>;
            selected: PropTypes.Requireable<boolean>;
            checked: PropTypes.Requireable<boolean>;
            busy: PropTypes.Requireable<boolean>;
            expanded: PropTypes.Requireable<boolean>;
        }>>;
        accessibilityValue: PropTypes.Requireable<PropTypes.InferProps<{
            min: PropTypes.Requireable<number>;
            max: PropTypes.Requireable<number>;
            now: PropTypes.Requireable<number>;
            text: PropTypes.Requireable<string | number>;
        }>>;
        value: PropTypes.Validator<boolean>;
        style: PropTypes.Requireable<object>;
        onTintColor: PropTypes.Requireable<string>;
        tintColor: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        onValueChange: PropTypes.Validator<(...args: any[]) => any>;
    };
    static defaultProps: {
        value: boolean;
        style: {};
        onTintColor: string;
        tintColor: string;
        disabled: boolean;
    };
    private colorSwitchCircle;
    private colorSwitchOff;
    offsetX: Animated.Value;
    constructor(props: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    render(): JSX.Element;
    animated(): void;
    _onValueChange(): void;
    componentDidMount(): void;
}
export default Switch;
