import React from 'react';
import PropTypes from 'prop-types';
declare class ImageButton extends React.Component {
    constructor(props: any);
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
    };
    static defaultProps: {
        source: null;
        highlightedSource: null;
        onPress: null;
    };
    _buttonPressIn(): void;
    _buttonPressOut(): void;
    _isButtonPressed(): any;
    render(): JSX.Element;
}
export default ImageButton;
