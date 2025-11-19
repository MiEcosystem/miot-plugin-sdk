export const kSTDGuideDialogShowedKeyPrefix: "kSTDGuideDialogShowedKeyPrefix";
export default class STDGuideDialog extends React.Component<any, any, any> {
    static propTypes: {
        category: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
    };
    constructor(props: any, context: any);
    imageSource(): any;
    dismiss(valid: any): void;
}
import React from "react";