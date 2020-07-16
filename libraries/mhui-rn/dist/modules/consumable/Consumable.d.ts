/// <reference types="react" />
import PropTypes from 'prop-types';
import { NOOP } from '../utils/fns';
declare function Consumable(props: any): JSX.Element;
declare namespace Consumable {
    var propTypes: {
        title: PropTypes.Requireable<string>;
        titleColor: PropTypes.Requireable<any>;
        subtitle: PropTypes.Requireable<string>;
        subtitleColor: PropTypes.Requireable<any>;
        reset: PropTypes.Requireable<string>;
        buy: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<any>;
        onBuy: PropTypes.Requireable<(...args: any[]) => any>;
        onReset: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        resetAccessibilityHint: PropTypes.Requireable<string | number>;
        buyAccessibilityHint: PropTypes.Requireable<string | number>;
    };
    var defaultProps: {
        title: string;
        titleColor: string;
        subtitle: string;
        subtitleColor: string;
        reset: string;
        buy: string;
        icon: null;
        onBuy: typeof NOOP;
        onReset: typeof NOOP;
    };
}
export default Consumable;
