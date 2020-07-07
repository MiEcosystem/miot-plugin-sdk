import PropTypes from 'prop-types';
import React from 'react';
import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native';
export interface CardBaseProps {
    innerView: React.ReactNode;
    icon: number;
    text: string;
    visible: boolean;
    showDismiss: boolean;
    disabled: boolean;
    dismiss: () => void;
    onPress: () => void;
    cardStyle: ViewStyle;
    iconStyle: StyleProp<ImageStyle>;
    textStyle: TextStyle;
    underlayColor: string;
}
export default class CardBase extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        innerView: PropTypes.Requireable<object>;
        icon: PropTypes.Requireable<number>;
        text: PropTypes.Requireable<string>;
        showDismiss: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        dismiss: PropTypes.Requireable<(...args: any[]) => any>;
        visible: PropTypes.Requireable<boolean>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        cardStyle: PropTypes.Requireable<object>;
        iconStyle: PropTypes.Requireable<object>;
        textStyle: PropTypes.Requireable<object>;
        underlayColor: PropTypes.Requireable<string>;
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
        showDismiss: boolean;
        disabled: boolean;
        visible: boolean;
        underlayColor: string;
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
    };
    constructor(props: any, context: any);
    componentDidMount(): void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    renderInner(): JSX.Element;
    renderClose(): JSX.Element | null;
    getCorrectStyle(cardStyle: any): {
        animatedViewStyle: {};
        containerStyle: {};
    };
    render(): JSX.Element;
    dismiss(): void;
}
