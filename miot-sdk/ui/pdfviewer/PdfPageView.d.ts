declare class PdfPageView extends PureComponent<any, any, any> {
  constructor(props: Readonly<any>);
  constructor(props: any, context?: any);
    _getStylePropsProps: () => {
        width: any;
        height: any;
    } | {
        width?: undefined;
        height?: undefined;
    };
}
declare namespace PdfPageView {
    const propTypes: any;
    namespace defaultProps {
        const style: {};
    }
}
export default PdfPageView;
import { PureComponent } from "react";