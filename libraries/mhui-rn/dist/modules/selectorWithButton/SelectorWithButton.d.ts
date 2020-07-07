import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NOOP, log } from '../utils/fns';
export default class SelectorWithButton extends Component {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        items: PropTypes.Requireable<(PropTypes.InferProps<{
            icon: any;
            iconSelected: any;
            title: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        initSelectedIndexs: PropTypes.Requireable<any[]>;
        onSelected: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        switchDisabled: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<any>;
        multiple: PropTypes.Requireable<boolean>;
        minSelected: PropTypes.Requireable<number>;
        maxSelected: PropTypes.Requireable<number>;
        showSwitch: PropTypes.Requireable<boolean>;
        switchOn: PropTypes.Requireable<boolean>;
        onSwitch: PropTypes.Requireable<(...args: any[]) => any>;
        hasShadow: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        title: string;
        subtitle: string;
        items: never[];
        initSelectedIndexs: number[];
        onSelected: typeof NOOP;
        disabled: boolean;
        switchDisabled: boolean;
        themeColor: string;
        multiple: boolean;
        minSelected: number;
        maxSelected: number;
        showSwitch: boolean;
        switchOn: boolean;
        onSwitch: typeof log;
        hasShadow: boolean;
    };
    state: {
        selectedIndexs: number[];
    };
    select: (index: any) => null | undefined;
    getSizeLevel(items: any): 3 | 2 | 1 | 0;
    getSelectors: () => any;
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        selectedIndexs: any;
    } | null;
    render(): JSX.Element | null;
}
