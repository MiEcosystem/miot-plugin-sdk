import React, { Component } from 'react';
import { ConfigContext } from '../configProvider';
declare class Radio extends Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    constructor(props: any);
    private colorSwitchCircle;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    changeStatus: (scaleTo: any, opacityTo: any) => void;
    changeRadioCheck: () => void;
    render(): JSX.Element;
}
export default Radio;
