export default class ImageButton extends React.Component<any, any, any> {
    static initialState: {
        buttonPressed: boolean;
    };
    static propTypes: {
        source: PropTypes.Requireable<any>;
        highlightedSource: PropTypes.Requireable<any>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
        accessibilityRole: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        source: null;
        highlightedSource: null;
        onPress: null;
    };
    constructor(props: any);
    _buttonPressIn(): void;
    _buttonPressOut(): void;
    _isButtonPressed(): boolean;
}
import React from "react";