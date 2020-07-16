import { PureComponent } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
export default class SmallNumber extends PureComponent {
    static propTypes: {
        list: PropTypes.Requireable<(PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            number: PropTypes.Requireable<string | number>;
            themeColor: PropTypes.Requireable<any>;
            titleThemeColor: PropTypes.Requireable<any>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        themeColor: PropTypes.Requireable<any>;
        titleThemeColor: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
    };
    offsetX: Animated.Value;
    containerWidth: number;
    centerWidth: number;
    centerX: number;
    onLayoutContainer: (e: any) => void;
    onLayoutCenter: (e: any) => void;
    getItems: () => any;
    render(): JSX.Element | null;
}
