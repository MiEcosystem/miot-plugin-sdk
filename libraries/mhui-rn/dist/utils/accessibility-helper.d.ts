import PropTypes from 'prop-types';
export declare const AccessibilityRoles: {};
export declare const AccessibilityPropTypes: {
    accessible: PropTypes.Requireable<boolean>;
    accessibilityRole: PropTypes.Requireable<string>;
    accessibilityLabel: PropTypes.Requireable<string | number>;
    accessibilityHint: PropTypes.Requireable<string | number>;
    accessibilityState: PropTypes.Requireable<PropTypes.InferProps<{
        disabled: PropTypes.Requireable<boolean>;
        selected: PropTypes.Requireable<boolean>;
        checked: PropTypes.Requireable<boolean>;
        busy: PropTypes.Requireable<boolean>;
        expanded: PropTypes.Requireable<boolean>;
    }>>;
    accessibilityValue: PropTypes.Requireable<PropTypes.InferProps<{
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        now: PropTypes.Requireable<number>;
        text: PropTypes.Requireable<string | number>;
    }>>;
};
export declare function getAccessibilityConfig({ accessible, accessibilityRole, accessibilityLabel, accessibilityHint, accessibilityState, accessibilityValue, }?: {
    accessible: any;
    accessibilityRole: any;
    accessibilityLabel: any;
    accessibilityHint: any;
    accessibilityState: any;
    accessibilityValue: any;
}): {
    accessible: boolean;
};
