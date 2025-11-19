declare function ScrollViewWithHeader({ bigIcon, bigTitle, subtitle, bigGapStyle, type, children, contentStyle, containerStyle }: {
    bigIcon: any;
    bigTitle: any;
    subtitle: any;
    bigGapStyle: any;
    type: any;
    children: any;
    contentStyle: any;
    containerStyle: any;
}): JSX.Element;
declare namespace ScrollViewWithHeader {
    namespace propTypes {
        const title: PropTypes.Requireable<string>;
        const subTitle: PropTypes.Requireable<string>;
        const bigIcon: PropTypes.Requireable<any>;
        const bigTitle: PropTypes.Requireable<string>;
        const subtitle: PropTypes.Requireable<string>;
        const bigGapStyle: PropTypes.Requireable<object>;
        const type: PropTypes.Requireable<string>;
        const contentStyle: PropTypes.Requireable<object>;
        const containerStyle: PropTypes.Requireable<object>;
    }
}
export default ScrollViewWithHeader;
import PropTypes from "prop-types";