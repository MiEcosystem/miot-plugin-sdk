import PropTypes from 'prop-types';
import React from 'react';
declare class NormalGear extends React.Component {
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
        selectIndex: number;
        allowFontScaling: boolean;
        clickAccessibilityLables: never[];
        clickAccessibilityHints: never[];
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    renderOptions(): any;
    getCorrectLayout(): {
        optionWidth: any;
        margin: any;
        containerWidth: any;
    };
    render(): JSX.Element | null;
    onPress(index: any): void;
}
export default NormalGear;
