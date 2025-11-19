import PropTypes from "prop-types";
export interface ViewChildContext {
  readonly isInAParentText: boolean;
}
export const ViewContextTypes: {
  isInAParentText: PropTypes.Requireable<boolean>;
};