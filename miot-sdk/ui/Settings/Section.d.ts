declare function Section({ title, showSeparator, children }: {
    title: any;
    showSeparator?: boolean | undefined;
    children: any;
}): JSX.Element | null;
declare namespace Section {
    namespace propTypes {
        const title: PropTypes.Requireable<string>;
        const showSeparator: PropTypes.Requireable<boolean>;
    }
}
export default Section;
import PropTypes from "prop-types";