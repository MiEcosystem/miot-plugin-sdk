import PropTypes from 'prop-types';
import React from 'react';
declare class ActionSheet extends React.Component {
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        dialogStyle: PropTypes.Requireable<object>;
        options: PropTypes.Requireable<(PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            subtitle: PropTypes.Requireable<string>;
            onPress: PropTypes.Requireable<(...args: any[]) => any>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        buttons: PropTypes.Requireable<(PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<any>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        canDismiss: PropTypes.Requireable<boolean>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        options: never[];
        canDismiss: boolean;
        dialogStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            itemTitleStyle: {};
            itemSubtitleStyle: {};
            itemTitleNumberOfLines: number;
            itemSubtitleNumberOfLines: number;
        };
    };
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    constructor(props: any, context: any);
    render(): JSX.Element;
    _onPress(callback: any): void;
    _onDismiss(): void;
}
export default ActionSheet;
