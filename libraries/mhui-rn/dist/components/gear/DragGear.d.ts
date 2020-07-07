import PropTypes from 'prop-types';
import React from 'react';
declare class DragGear extends React.Component {
    static propTypes: {
        options: PropTypes.Validator<(string | number | null | undefined)[]>;
        containerStyle: PropTypes.Requireable<object>;
        normalStyle: PropTypes.Requireable<object>;
        textStyle: PropTypes.Requireable<object>;
        margin: PropTypes.Requireable<number>;
        maxWidth: PropTypes.Requireable<number>;
        selectColor: PropTypes.Requireable<string>;
        selectIndex: PropTypes.Requireable<number>;
        onSelect: PropTypes.Validator<(...args: any[]) => any>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        numberOfLines: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        clickAccessibilityLables: PropTypes.Requireable<(string | number | null | undefined)[]>;
        clickAccessibilityHints: PropTypes.Requireable<(string | number | null | undefined)[]>;
    };
    static defaultProps: {
        options: never[];
        normalStyle: {};
        margin: number;
        maxWidth: number;
        selectColor: string;
        selectIndex: number;
        allowFontScaling: boolean;
        clickAccessibilityLables: never[];
        clickAccessibilityHints: never[];
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    UNSAFE_componentWillMount(): void;
    getClosetIndex(moveX: any): any;
    _onPanResponderGrant(e: any): void;
    _onPanResponderRelease(e: any, gesture: any): void;
    animated2TargetIndex(index: any): void;
    getCorrectLayout(): {
        optionWidth: any;
        margin: any;
        containerWidth: any;
    };
    calculateCoord(): void;
    getDragRange(callback: any): void;
    renderOptions(): any;
    renderDraggable(): JSX.Element | null;
    render(): JSX.Element | null;
    onPress(index: any): void;
}
export default DragGear;
