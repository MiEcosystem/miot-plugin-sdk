declare function BasicInfo({ options, customOptions, showDots, extraOptions }?: {
    options: any;
    customOptions: any;
    showDots: any;
    extraOptions: any;
}): JSX.Element | null;
declare namespace BasicInfo {
    namespace propTypes {
        const options: PropTypes.Requireable<(string | null | undefined)[]>;
        const customOptions: PropTypes.Requireable<any[]>;
        const showDots: PropTypes.Requireable<(string | null | undefined)[]>;
        const extraOptions: PropTypes.Requireable<object>;
    }
}
export default BasicInfo;
import PropTypes from "prop-types";