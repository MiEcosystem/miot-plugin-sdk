export default class DeviceCell extends React.Component<any, any, any> {
    static propTypes: {
        icon: PropTypes.Requireable<any>;
        title: PropTypes.Requireable<string>;
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
    };
    static defaultProps: {
        onValueChange: () => void;
    };
    constructor(props: any, ...rest: any[]);
    changeCheck: () => void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
}
import React from "react";