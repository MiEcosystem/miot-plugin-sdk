import React, { Component } from 'react';
import { ImageSourcePropType, TextStyle, ViewStyle } from 'react-native';
export interface CardMode {
    description: string;
    icon: {
        normal: ImageSourcePropType;
        press: ImageSourcePropType;
        active: ImageSourcePropType;
        activeDisabled: ImageSourcePropType;
    };
    isDisabled: boolean;
    isActive: boolean;
    isPressing: boolean;
}
export interface ModeCardProps {
    radiusType: 'all' | 'none' | 'top' | 'bottom';
    modes: Array<CardMode>;
    modesKey: string;
    pressIn: (index: number, modesKey: string) => void;
    pressOut: (index: number, modesKey: string) => void;
    descriptionStyle: TextStyle;
    activeDescriptionStyle: TextStyle;
    showShadow: boolean;
    modeCardStyle: ViewStyle;
}
declare class ModeCard extends Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    constructor(props: any);
    componentDidMount(): void;
    createModesRN: () => any;
    pressInIcon: (index: any) => void;
    pressOutIcon: (index: any) => void;
    renderModeCard: () => JSX.Element;
    render(): JSX.Element;
}
export default ModeCard;
