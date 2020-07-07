import { Component } from 'react';
import PropTypes from 'prop-types';
export default class CurtainStyle extends Component {
    static propTypes: {
        icons: PropTypes.Requireable<any[]>;
        titles: PropTypes.Requireable<(string | null | undefined)[]>;
        ids: PropTypes.Requireable<any[]>;
        checkedId: PropTypes.Requireable<string | number>;
        disabled: PropTypes.Requireable<boolean>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabels: PropTypes.Requireable<(string | number | null | undefined)[]>;
        accessibilityHints: PropTypes.Requireable<(string | number | null | undefined)[]>;
    };
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }, id: any) => void;
    getItems(): any;
    onCheckChange: (id: any) => void;
    render(): JSX.Element;
}
