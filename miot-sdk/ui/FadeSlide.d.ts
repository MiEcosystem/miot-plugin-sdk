/**
 * @export
 * @author Li Yue
 * @since 10030
 * @module Radio
 * @description 组件的显示、隐藏效果，下拉淡入和收起淡出。
 * @property {bool} isShown - 组件的显示状态，默认值 false
 * @property {number} childrenHeight - 子组件的总高度，默认值0
 */
declare class FadeSlide extends React.Component<any, any, any> {
  constructor(props: any);
    changeStatus: (heightTo: any, opacityTo: any) => void;
}
declare namespace FadeSlide {
    namespace defaultProps {
        const isShown: boolean;
        const childrenHeight: number;
    }
    namespace propTypes {
        const isShown_1: PropTypes.Requireable<boolean>;
        export { isShown_1 as isShown };
        const childrenHeight_1: PropTypes.Requireable<number>;
        export { childrenHeight_1 as childrenHeight };
    }
}
export default FadeSlide;
import React from "react";
import PropTypes from "prop-types";