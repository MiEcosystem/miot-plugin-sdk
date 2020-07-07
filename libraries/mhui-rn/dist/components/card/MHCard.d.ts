import PropTypes from 'prop-types';
import React from 'react';
import { ViewStyle, TextStyle, StyleProp, ImageStyle } from 'react-native';
export interface MHCardProps {
    cardType: 'normal' | 'switch';
    cardRadiusType: 'all' | 'none' | 'top' | 'bottom';
    iconContainerStyle: ViewStyle;
    icon: number;
    iconStyle: StyleProp<ImageStyle>;
    title: string;
    titleStyle: TextStyle;
    subtitle: string;
    subtitleStyle: TextStyle;
    rightText: string;
    rightTextStyle: TextStyle;
    hideArrow: boolean;
    onPress: () => void;
    switchValue: boolean;
    onTintColor: string;
    tintColor: string;
    onValueChange: () => void;
    disabled: boolean;
    visible: boolean;
    showShadow: boolean;
    marginTop: number;
}
declare class MHCard extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        cardType: PropTypes.Requireable<string>;
        cardRadiusType: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        iconContainerStyle: PropTypes.Requireable<object>;
        icon: PropTypes.Validator<number>;
        iconStyle: PropTypes.Requireable<object>;
        title: PropTypes.Validator<string>;
        titleStyle: PropTypes.Requireable<object>;
        subtitle: PropTypes.Requireable<string>;
        subtitleStyle: PropTypes.Requireable<object>;
        rightText: PropTypes.Requireable<string>;
        rightTextStyle: PropTypes.Requireable<object>;
        hideArrow: PropTypes.Requireable<boolean>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        switchValue: PropTypes.Requireable<boolean>;
        onTintColor: PropTypes.Requireable<string>;
        tintColor: PropTypes.Requireable<string>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        showShadow: PropTypes.Requireable<boolean>;
        marginTop: PropTypes.Requireable<number>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        subtitleNumberOfLines: PropTypes.Requireable<number>;
        rightTextNumberOfLines: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        cardType: string;
        cardRadiusType: string;
        icon: any;
        hideArrow: boolean;
        switchValue: boolean;
        disabled: boolean;
        visible: boolean;
        showShadow: boolean;
        marginTop: number;
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
    };
    static CARD_TYPE: {
        NORMAL: string;
        SWITCH: string;
    };
    static CARD_RADIUS_TYPE: {
        ALL: string;
        NONE: string;
        TOP: string;
        BOTTOM: string;
    };
    constructor(props: any);
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    renderInnerView(): JSX.Element;
    renderRight(): JSX.Element | null | undefined;
    render(): JSX.Element;
}
export default MHCard;
