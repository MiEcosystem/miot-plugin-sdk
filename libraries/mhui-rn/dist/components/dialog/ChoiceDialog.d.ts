import PropTypes from 'prop-types';
import React from 'react';
declare class ChoiceDialog extends React.Component {
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        type: PropTypes.Requireable<any>;
        visible: PropTypes.Requireable<boolean>;
        options: PropTypes.Requireable<(PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            subtitle: PropTypes.Requireable<string>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        selectedIndexArray: PropTypes.Requireable<(number | null | undefined)[]>;
        color: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<number>;
        buttons: PropTypes.Requireable<(PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<any>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
        }> | null | undefined)[]>;
        title: PropTypes.Requireable<string>;
        dialogStyle: PropTypes.Requireable<object>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        type: string;
        options: never[];
        selectedIndexArray: never[];
        dialogStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            titleStyle: {};
            itemTitleStyle: {};
            itemSubtitleStyle: {};
            itemTitleNumberOfLines: number;
            itemSubtitleNumberOfLines: number;
        };
    };
    static TYPE: {
        SINGLE: string;
        MULTIPLE: string;
    };
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    constructor(props: any, context: any);
    render(): JSX.Element | null;
    _onPress(selected: any, index: any): void;
    _onDismiss(): void;
}
export default ChoiceDialog;
