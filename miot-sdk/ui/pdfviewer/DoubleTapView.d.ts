export default class DoubleTapView extends Component<any, any, any> {
    static propTypes: any;
    static defaultProps: {
        delay: number;
        radius: number;
        onSingleTap: () => void;
        onDoubleTap: () => void;
    };
    constructor();
    gestureHandlers: any;
    prevTouchInfo: {
        prevTouchX: number;
        prevTouchY: number;
        prevTouchTimeStamp: number;
    };
    timer: any;
    distance: (x0: any, y0: any, x1: any, y1: any) => string;
    isDoubleTap: (currentTouchTimeStamp: any, { x0, y0 }: {
        x0: any;
        y0: any;
    }) => boolean;
    handlePanResponderRelease: (evt: any, gestureState: any) => void;
}
import { Component } from "react";