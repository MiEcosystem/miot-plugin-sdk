/// <reference types="react" />
interface Props {
    titles: Array<string>;
    subtitle: string;
}
declare function BathHeader(props: Props): JSX.Element;
declare namespace BathHeader {
    var defaultProps: {
        titles: never[];
        subtitle: string;
    };
}
export default BathHeader;
