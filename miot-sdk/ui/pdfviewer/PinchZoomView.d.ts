export default class PinchZoomView extends Component<any, any, any> {
    static propTypes: any;
    static defaultProps: {
        scalable: boolean;
        onScaleChanged: (scale: any) => void;
    };
    constructor(props: any);
    distant: number;
    gestureHandlers: any;
    _handleStartShouldSetPanResponder: (e: any, gestureState: any) => boolean;
    _handleMoveShouldSetPanResponder: (e: any, gestureState: any) => boolean;
    _handlePanResponderGrant: (e: any, gestureState: any) => void;
    _handlePanResponderEnd: (e: any, gestureState: any) => void;
    _handlePanResponderTerminate: (e: any, gestureState: any) => void;
    _handlePanResponderMove: (e: any, gestureState: any) => void;
}
import { Component } from "react";