import { PureComponent } from 'react';
import { ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
export interface Props {
    title: string;
    subtitle: string;
    containerStyle: ViewStyle;
    disabled: boolean;
    themeColor: string;
    themeBackgroundColor: string;
    underlayColor: string;
    hasShadow: boolean;
    iconContainerStyle: ViewStyle;
    iconStyle: ImageStyle;
    icon: ImageSourcePropType;
    iconText: string;
    switchOn: boolean;
    rightText: string;
    rightArrow: boolean;
    onPress: () => void;
    onSwitch: (value: boolean) => void;
}
export default class CardButton extends PureComponent<Props, null> {
    static defaultProps: {
        underlayColor: string;
        hasShadow: boolean;
    };
    onPress: () => void;
    render(): JSX.Element | null;
}
