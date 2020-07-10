import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NOOP, log } from '../utils/fns';
export default class MultiButtons extends Component {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        title: PropTypes.Requireable<string>;
        items: PropTypes.Requireable<(PropTypes.InferProps<{
            icon: any;
            iconSelected: any;
            title: PropTypes.Requireable<string>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        switchDisabled: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<any>;
        showSwitch: PropTypes.Requireable<boolean>;
        switchOn: PropTypes.Requireable<boolean>;
        onSwitch: PropTypes.Requireable<(...args: any[]) => any>;
        hasShadow: PropTypes.Requireable<boolean>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        title: string;
        items: never[];
        onClick: typeof NOOP;
        disabled: boolean;
        switchDisabled: boolean;
        themeColor: string;
        showSwitch: boolean;
        switchOn: boolean;
        onSwitch: typeof log;
        hasShadow: boolean;
    };
    state: {
        activeIndex: number;
    };
    onClick: (index: any) => void;
    getSizeLevel(items: any): 3 | 2 | 1 | 0;
    getSelectors: () => any;
    render(): JSX.Element | null;
}
