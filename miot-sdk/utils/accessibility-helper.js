import { isAndroid } from '../native/';
import PropTypes from 'prop-types';
const roles = ['none', 'button', 'link', 'search', 'image', 'keyboardkey', 'text', 'adjustable', 'imagebutton', 'header', 'summary', 'alert', 'checkbox', 'combobox', 'menu', 'menubar', 'menuitem', 'progressbar', 'radio', 'radiogroup', 'scrollbar', 'spinbutton', 'switch', 'tab', 'tablist', 'timer', 'toolbar'];
export const AccessibilityRoles = roles.reduce((total, role) => {
  total[role] = role;
  return total;
}, {});
export const AccessibilityPropTypes = {
  accessible: PropTypes.bool,
  accessibilityRole: PropTypes.oneOf(roles),
  accessibilityLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  accessibilityHint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  const isAccessible = accessible === false ? false : true;
  const accessibility = {
    accessible: isAccessible
  };
  if (!accessibility.accessible) {
    if (isAndroid) {
      // accessibility.importantForAccessibility = 'no';
      accessibility.focusable = false;
    }
    return accessibility;
  }
  // if (accessibilityRole) {
  accessibility.accessibilityRole = String(accessibilityRole || AccessibilityRoles.none);
  // }
  if (accessibilityLabel !== undefined && accessibilityLabel !== null) {
    accessibility.accessibilityLabel = String(accessibilityLabel);
  } else if ([AccessibilityRoles.image, AccessibilityRoles.imagebutton].indexOf(accessibility.accessibilityRole) !== -1) {
    // 如果元素无文案，且accessibilityLabel 为空，则会不展示无障碍选框
    // 因此手动设置accessibilityLabel 为非空
    accessibility.accessibilityLabel = ' ';
  }
  if (accessibilityHint !== undefined && accessibilityHint !== null) {
    accessibility.accessibilityHint = String(accessibilityHint);
  }
  if (accessibilityState && typeof accessibilityState === 'object') {
    accessibility.accessibilityState = accessibilityState;
  }
  if (accessibilityValue && typeof accessibilityValue === 'object') {
    accessibility.accessibilityValue = accessibilityValue;
  }
  return accessibility;
}