import { Component } from 'react';
import PropTypes from 'prop-types';
import { log } from '../utils/fns';
export default class WallSwitch extends Component {
    static propTypes: {
        items: PropTypes.Requireable<(PropTypes.InferProps<{
            isOn: PropTypes.Requireable<boolean>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        onSwitch: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        items: never[];
        onSwitch: typeof log;
    };
    switch: (index: any) => void;
    getItems: (items: any) => any;
    render(): JSX.Element | null;
}
