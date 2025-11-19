declare function Toast({ position, containerStyle, textStyle, text, duration, onDismiss, visible }: {
    position: any;
    containerStyle: any;
    textStyle: any;
    text: any;
    duration?: number | undefined;
    onDismiss: any;
    visible: any;
}): JSX.Element | null;
declare namespace Toast {
    namespace propTypes {
        const position: PropTypes.Requireable<number>;
        const visible: PropTypes.Requireable<boolean>;
        const containerStyle: PropTypes.Requireable<object>;
        const textStyle: PropTypes.Requireable<any[]>;
        const text: PropTypes.Requireable<string>;
        const duration: PropTypes.Requireable<number>;
        const onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
export default Toast;
import PropTypes from "prop-types";