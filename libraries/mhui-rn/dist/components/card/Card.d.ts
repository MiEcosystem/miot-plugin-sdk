import PropTypes from 'prop-types';
import React from 'react';
import { ViewStyle, StyleProp, ImageStyle, TextStyle } from 'react-native';
export interface CardProps {
    innerView: React.ReactNode;
    icon: number;
    text: string;
    visible: boolean;
    showDismiss: boolean;
    disabled: boolean;
    showShadow: boolean;
    onPress: () => void;
    cardStyle: ViewStyle;
    iconStyle: StyleProp<ImageStyle>;
    textStyle: TextStyle;
    underlayColor: string;
    shadowColor: string;
    shadowOpacity: number;
}
interface CardState {
    showShadow: boolean;
}
declare class Card extends React.Component<CardProps, CardState> {
    static propTypes: {
        innerView: PropTypes.Requireable<object>;
        icon: PropTypes.Requireable<number>;
        text: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        showDismiss: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        dismiss: PropTypes.Requireable<(...args: any[]) => any>;
        showShadow: PropTypes.Requireable<boolean>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        cardStyle: PropTypes.Requireable<object>;
        iconStyle: PropTypes.Requireable<object>;
        textStyle: PropTypes.Requireable<object>;
        underlayColor: PropTypes.Requireable<string>;
        shadowColor: PropTypes.Requireable<string>;
        shadowOpacity: PropTypes.Requireable<number>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        numberOfLines: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
        dismissAccessibilityLabel: PropTypes.Requireable<string | number>;
        dismissAccessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        visible: boolean;
        showDismiss: boolean;
        disabled: boolean;
        showShadow: boolean;
        cardStyle: {};
        shadowColor: string;
        shadowOpacity: number;
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    renderCardIOS(): JSX.Element;
    renderCardAndroid(): JSX.Element;
    getCorrectStyle(): {
        shadowAndroidStyle: {
            marginTop: number;
        };
        cardStyle: {};
    };
    render(): JSX.Element | undefined;
}
export default Card;
