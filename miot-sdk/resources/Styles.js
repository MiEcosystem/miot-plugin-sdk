/**
 * @since 20190402
 * @author Geeook
 * @description 通用样式统一管理
 * @example
 * <View style={Styles.common.separator} />
 * <Text style={{ backgroundColor: Styles.common.MHGreen }}>
 */
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const PADDING = 24;
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;
const HAIRLINE_COLOR = 'rgba(0,0,0,0.15)';
const MODAL_MARGIN = 10;
const MODAL_WIDTH = width - MODAL_MARGIN * 2;
export default {
  common: {
    padding: PADDING, // 列表项或者分割线距离屏幕左边的距离
    MHGreen: '#32BAC0', // 米家绿
    underlayColor: 'rgba(0,0,0,0.25)', // 点击态蒙层颜色
    hairlineColor: HAIRLINE_COLOR, // 分割线颜色
    backgroundColor: '#f7f7f7', // 通常是插件页面背景颜色
    separatorHeight: SEPARATOR_HEIGHT, // 分割线粗细
    title: { // 常见标题: 列表项/弹窗/卡片
      // fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 20,
      color: '#000',
      // fontFamily: 'MI-LANTING_GB-OUTSIDE-YS',
      // fontFamily: 'Kmedium',
    },
    subtitle: { // 常见副标题: 列表项/弹窗/卡片
      fontSize: 12,
      // lineHeight: 16,
      color: 'rgba(0,0,0,0.6)',
    },
    separator: { // 分割线
      height: SEPARATOR_HEIGHT,
      backgroundColor: HAIRLINE_COLOR,
    },
  },
  dialog: {
    background: { // 蒙层背景
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)', // 蒙层背景色
    },
    modal: { // 弹窗
      position: 'absolute',
      bottom: 20, // 距离屏幕底部的边距
      marginHorizontal: MODAL_MARGIN, // 两端边距
      width: MODAL_WIDTH, // 宽度
      borderRadius: 20, // 圆角
      backgroundColor: '#fff', // 内容背景色
    },
    title: { // 标题容器
      titleHeightThin: 66, // 头部单行标题容器宽度
      titleHeightFat: 85, // 头部双行标题容器宽度
    },
    subtitle: { // 副标题
      width: MODAL_WIDTH * 0.75,
      textAlign: 'center',
      fontSize: 13,
      color: '#666'
    },
    buttons: { // 按钮容器
      height: 50, // 底部按钮的高度
      flexDirection: 'row',
      backgroundColor: 'transparent',
      justifyContent: 'space-between'
    },
    button: { // 单个按钮
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: { // 按钮文字
      fontSize: 14,
      lineHeight: 19,
      color: '#666',
      fontFamily: 'D-DINCondensed-Bold' // TODO: 英文字体，中文加粗效果
    }
  }
}