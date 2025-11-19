export default class ChoiceDialogWithIcon extends React.Component<any, any, any> {
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        type: PropTypes.Requireable<string>;
        maxSelected: PropTypes.Requireable<number>;
        visible: PropTypes.Requireable<boolean>;
        options: PropTypes.Requireable<(PropTypes.InferProps<{
            icon: PropTypes.Requireable<any>;
            title: PropTypes.Requireable<string>;
            titleStyle: PropTypes.Requireable<object>;
            subtitle: PropTypes.Requireable<string>;
            extraSubtitle: PropTypes.Requireable<string>;
            extraSubtitleStyle: PropTypes.Requireable<object>;
            checked: PropTypes.Requireable<boolean>;
            disabled: PropTypes.Requireable<boolean>;
            checkedColor: PropTypes.Requireable<string>;
            onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
            accessible: PropTypes.Requireable<boolean>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        extraSubtitleStyle: PropTypes.Requireable<object>;
        selectedIndexArray: PropTypes.Requireable<(number | null | undefined)[]>;
        buttons: PropTypes.Requireable<(PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<any>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
            backgroundColor: PropTypes.Requireable<PropTypes.InferProps<{
                bgColorNormal: PropTypes.Requireable<string>;
                bgColorPressed: PropTypes.Requireable<string>;
            }>>;
            titleColor: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        title: PropTypes.Requireable<string>;
        dialogStyle: PropTypes.Requireable<object>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        type: string;
        maxSelected: number;
        options: never[];
        selectedIndexArray: never[];
    };
    static TYPE: {
        /**
         * 单选
         */
        SINGLE: string;
        /**
         * 多选
         */
        MULTIPLE: string;
    };
    constructor(props: any, context: any);
    onValueChange(checked: any, index: any): void;
}
import React from "react";