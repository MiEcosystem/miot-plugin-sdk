declare function DeleteButton({ deleteDeviceMessage }: {
    deleteDeviceMessage: any;
}): JSX.Element | null;
declare namespace DeleteButton {
    namespace propTypes {
        const deleteDeviceMessage: PropTypes.Requireable<string>;
    }
}
export default DeleteButton;
import PropTypes from "prop-types";