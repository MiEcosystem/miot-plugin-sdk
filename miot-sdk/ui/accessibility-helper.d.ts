export function getAccessibilityConfig({ accessible, accessibilityRole, accessibilityLabel, accessibilityHint, accessibilityState, accessibilityValue }?: {
    accessible: any;
    accessibilityRole: any;
    accessibilityLabel: any;
    accessibilityHint: any;
    accessibilityState: any;
    accessibilityValue: any;
}): {
    accessible: boolean;
};
export const AccessibilityRoles: {};
export namespace AccessibilityPropTypes {
    const accessible: PropTypes.Requireable<boolean>;
    const accessibilityRole: PropTypes.Requireable<string>;
    const accessibilityLabel: PropTypes.Requireable<string | number>;
    const accessibilityHint: PropTypes.Requireable<string | number>;
    const accessibilityState: PropTypes.Requireable<PropTypes.InferProps<{
        disabled: PropTypes.Requireable<boolean>;
        selected: PropTypes.Requireable<boolean>;
        checked: PropTypes.Requireable<boolean>;
        busy: PropTypes.Requireable<boolean>;
        expanded: PropTypes.Requireable<boolean>;
    }>>;
    const accessibilityValue: PropTypes.Requireable<PropTypes.InferProps<{
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        now: PropTypes.Requireable<number>;
        text: PropTypes.Requireable<string | number>;
    }>>;
}
import PropTypes from "prop-types";