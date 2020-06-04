import PropTypes from 'prop-types';
const roles = ['none', 'button', 'link', 'search', 'image', 'keyboardkey', 'text', 'adjustable', 'imagebutton', 'header', 'summary', 'alert', 'checkbox', 'combobox', 'menu', 'menubar', 'menuitem', 'progressbar', 'radio', 'radiogroup', 'scrollbar', 'spinbutton', 'switch', 'tab', 'tablist', 'timer', 'toolbar'];
export const AccessibilityRoles = roles.reduce((total, role) => {
  total[role] = role;
  return total;
}, {});
export const AccessibilityPropTypes = {
  accessible: PropTypes.bool,
  accessibilityRole: PropTypes.oneOf(roles),
  accessibilityLabel: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  accessibilityHint: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  accessibilityState: PropTypes.shape({
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    checked: PropTypes.bool,
    busy: PropTypes.bool,
    expanded: PropTypes.bool
  }),
  accessibilityValue: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    now: PropTypes.number,
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};
export function getAccessibilityConfig({ accessible, accessibilityRole, accessibilityLabel, accessibilityHint, accessibilityState, accessibilityValue } = {}) {
  return {
    accessible: accessible === false ? false : true,
    accessibilityRole,
    accessibilityLabel,
    // accessibilityHint与accessibilityLabel相同时，会被忽略
    accessibilityHint,
    accessibilityState,
    accessibilityValue
  };
}