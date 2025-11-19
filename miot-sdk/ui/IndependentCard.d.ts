export default IndependentCard;
declare class IndependentCard extends React.Component<any, any, any> {
  constructor(props: any);
    changeSwitchValue: () => void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
}
declare namespace IndependentCard {
    namespace defaultProps {
        export const radiusType: string;
        export const picture: number;
        export const title1: string;
        export const title2: string;
        export const value: boolean;
        export const switchKey: string;
        export function changeValue(): void;
        export const onTintColor: string;
        export { OFF_COLOR as tintColor };
        export const switchStyle: {};
        export const disabled: boolean;
        export const disabledCard: boolean;
    }
    namespace propTypes {
        const radiusType_1: PropTypes.Requireable<string>;
        export { radiusType_1 as radiusType };
        const picture_1: PropTypes.Requireable<number>;
        export { picture_1 as picture };
        const title1_1: PropTypes.Requireable<string>;
        export { title1_1 as title1 };
        const title2_1: PropTypes.Requireable<string>;
        export { title2_1 as title2 };
        const switchKey_1: PropTypes.Requireable<string>;
        export { switchKey_1 as switchKey };
        const value_1: PropTypes.Requireable<boolean>;
        export { value_1 as value };
        const changeValue_1: PropTypes.Requireable<(...args: any[]) => any>;
        export { changeValue_1 as changeValue };
        const onTintColor_1: PropTypes.Requireable<string>;
        export { onTintColor_1 as onTintColor };
        export const tintColor: PropTypes.Requireable<string>;
        const switchStyle_1: PropTypes.Requireable<object>;
        export { switchStyle_1 as switchStyle };
        const disabled_1: PropTypes.Requireable<boolean>;
        export { disabled_1 as disabled };
        const disabledCard_1: PropTypes.Requireable<boolean>;
        export { disabledCard_1 as disabledCard };
        export const accessible: PropTypes.Requireable<boolean>;
        export const accessibilityLabel: PropTypes.Requireable<string | number>;
        export const accessibilityHint: PropTypes.Requireable<string | number>;
    }
}
import React from "react";
declare const OFF_COLOR: "#f0f0f0";
import PropTypes from "prop-types";