export function getBackgroundEventKey(): string;
export function resetClassVariables(): void;
export function getNavigationState(): any;
export function getNavigationEventKey(): string;
export function getContentEventKey(): string;
export const PageWithNormalNavigatorKey: "PageWithNormalNavigator_key";
export default class PageWithNormalNavigator extends React.Component<any, any, any> {
    static propTypes: {
        navigatorParams: PropTypes.Requireable<any>;
        backgroundComponent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        containerStyle: PropTypes.Requireable<any>;
        contentStyle: PropTypes.Requireable<any>;
    };
    constructor(props: any);
    onLayout: (e: any) => void;
    listeners: any[];
    refContent: any;
}
import React from "react";