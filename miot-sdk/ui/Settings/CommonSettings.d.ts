declare function CommonSettings(params: any): JSX.Element;
declare namespace CommonSettings {
    namespace propTypes {
        const navigation: PropTypes.Requireable<object>;
        const options: PropTypes.Requireable<(string | null | undefined)[]>;
        const customOptions: PropTypes.Requireable<any[]>;
        const showDots: PropTypes.Requireable<(string | null | undefined)[]>;
        const extraOptions: PropTypes.Requireable<object>;
    }
}
export default CommonSettings;
export function initCommonSettingsInnerOptions(): void;
export const options: {};
import PropTypes from "prop-types";