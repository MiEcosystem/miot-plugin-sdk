declare function BlankView({ type, icon, iconStyle, message, messageTextStyle, button, underline, blankStyle }: {
    type: any;
    icon: any;
    iconStyle: any;
    message: any;
    messageTextStyle: any;
    button: any;
    underline: any;
    blankStyle: any;
}): JSX.Element;
declare namespace BlankView {
    namespace propTypes {
        const type: PropTypes.Requireable<string>;
        const message: PropTypes.Requireable<string>;
        const icon: PropTypes.Requireable<any>;
        const iconStyle: any;
        const blankStyle: any;
        const messageTextStyle: any;
        const button: PropTypes.Requireable<object>;
        const underline: PropTypes.Requireable<object>;
    }
}
export default BlankView;
export type BlankViewType = string;
export namespace BlankViewType {
    const BUTTON: string;
    const UNDERLINE: string;
}
/**
 * 卡片的按钮配置 cardButton
 */
export type cardButton = {
    /**
     * - 按钮标题
     */
    title: string;
    /**
     * - 标题背景色
     */
    themeColor: string;
    /**
     * - 标题颜色
     */
    titleColor: string;
    /**
     * - 按钮宽度
     */
    width: string | number;
    /**
     * - 按钮高度
     */
    height: string | number;
    /**
     * - 按钮圆角
     */
    borderRadius: number;
    /**
     * - 点击事件
     */
    onPress: Function;
};
/**
 * 下划线
 */
export type Underline = {
    /**
     * - 下划线文字
     */
    text: string;
    /**
     * - 文字样式
     */
    textStyle: ViewPropTypes.style;
    /**
     * - 点击下划线的回调函数
     */
    callback: Function;
};
/**
 * 按钮
 */
export type Button = {
    /**
     * - 按钮文字
     */
    text: string;
    /**
     * - 按钮样式
     */
    buttonStyle: ViewPropTypes.style;
    /**
     * - 按钮文字样式
     */
    textStyle: ViewPropTypes.style;
    /**
     * - 点击按钮的回调函数
     */
    callback: Function;
};
import PropTypes from "prop-types";