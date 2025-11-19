declare function SpecItem({ dialogCustomKey, siid, piid, title, subtitle, image, selectorSubtitles, items }: {
    dialogCustomKey: any;
    siid: any;
    piid: any;
    title: any;
    subtitle: any;
    image: any;
    selectorSubtitles?: any[] | undefined;
    items: any;
}): JSX.Element | null;
declare namespace SpecItem {
    namespace propTypes {
        const dialogCustomKey: PropTypes.Requireable<string>;
        const siid: PropTypes.Requireable<number>;
        const piid: PropTypes.Requireable<number>;
        const title: PropTypes.Requireable<string>;
        const subtitle: PropTypes.Requireable<string>;
        const image: PropTypes.Requireable<string>;
        const selectorSubtitles: PropTypes.Requireable<(string | null | undefined)[]>;
        const items: PropTypes.Requireable<any[]>;
    }
}
export default SpecItem;
import PropTypes from "prop-types";