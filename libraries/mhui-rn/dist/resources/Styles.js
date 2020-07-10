import { Dimensions, StyleSheet } from 'react-native';
const {
  width
} = Dimensions.get('window');
const PADDING = 24;
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;
const HAIRLINE_COLOR = 'rgba(0,0,0,0.15)';
const MODAL_MARGIN = 10;
const MODAL_WIDTH = width - MODAL_MARGIN * 2;
export default {
  MODAL_MARGIN,
  common: {
    /** 列表项或者分割线距离屏幕左边的距离 */
    padding: PADDING,

    /** 米家绿 */
    MHGreen: '#32BAC0',

    /** 点击态蒙层颜色 */
    underlayColor: 'rgba(0,0,0,0.25)',

    /** 分割线颜色 */
    hairlineColor: HAIRLINE_COLOR,

    /** 通常是插件页面背景颜色 */
    backgroundColor: '#f7f7f7',

    /** 分割线粗细 */
    separatorHeight: SEPARATOR_HEIGHT,

    /** 常见标题: 列表项/弹窗/卡片 */
    title: {
      // fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 20,
      color: '#000' // fontFamily: 'MI-LANTING_GB-OUTSIDE-YS',
      // fontFamily: 'Kmedium',

    },

    /**  常见副标题: 列表项/弹窗/卡片 */
    subtitle: {
      fontSize: 12,
      // lineHeight: 16,
      color: 'rgba(0,0,0,0.6)'
    },

    /** 分割线 */
    separator: {
      //
      height: SEPARATOR_HEIGHT,
      backgroundColor: HAIRLINE_COLOR
    }
  },
  dialog: {
    /** 蒙层背景 */
    background: {
      //
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)' // 蒙层背景色

    },

    /** 弹窗 */
    modal: {
      // 弹窗
      position: 'absolute',
      bottom: 20,
      // 距离屏幕底部的边距
      marginHorizontal: MODAL_MARGIN,
      // 两端边距
      width: MODAL_WIDTH,
      // 宽度
      borderRadius: 20,
      // 圆角
      backgroundColor: '#fff' // 内容背景色

    },

    /** 标题容器 */
    title: {
      titleHeightThin: 66,
      // 头部单行标题容器宽度
      titleHeightFat: 85 // 头部双行标题容器宽度

    },

    /** 副标题 */
    subtitle: {
      width: MODAL_WIDTH * 0.75,
      textAlign: 'center',
      fontSize: 13,
      color: '#666'
    },

    /** 按钮容器 */
    buttons: {
      height: 50,
      // 底部按钮的高度
      flexDirection: 'row',
      backgroundColor: 'transparent',
      justifyContent: 'space-between'
    },

    /** 单个按钮 */
    button: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    },

    /** 按钮文字 */
    buttonText: {
      fontSize: 14,
      lineHeight: 19,
      color: '#666',
      fontFamily: 'D-DINCondensed-Bold' // TODO: 英文字体，中文加粗效果

    }
  }
};