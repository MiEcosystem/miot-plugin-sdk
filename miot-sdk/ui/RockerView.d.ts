export default class RockerView extends React.Component<any, any, any> {
    static propTypes: {
        enableClick: PropTypes.Requireable<boolean>;
        enableDrag: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onGestureStart: PropTypes.Requireable<(...args: any[]) => any>;
        onGestureMove: PropTypes.Requireable<(...args: any[]) => any>;
        onGestureEnd: PropTypes.Requireable<(...args: any[]) => any>;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
}
import React from "react";