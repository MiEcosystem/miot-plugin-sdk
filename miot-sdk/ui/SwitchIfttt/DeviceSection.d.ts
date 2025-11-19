export default class DeviceSection extends React.Component<any, any, any> {
    static propTypes: {
        title: PropTypes.Requireable<string>;
        titleStyle: PropTypes.Requireable<object>;
        items: PropTypes.Requireable<any[]>;
        selectedItem: PropTypes.Requireable<object>;
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
    changeCheck: (select: any, item: any) => void;
    renderDeviceItems: () => JSX.Element;
}
import React from "react";