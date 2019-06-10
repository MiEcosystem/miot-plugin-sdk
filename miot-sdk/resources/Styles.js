/**
 * @since 20190402
 * @author Geeook
 * @description 通用样式统一管理
 * @example
 * <View style={Styles.common.separator} />
 * <Text style={{ backgroundColor: Styles.common.MHGreen }}>
 */
import { StyleSheet } from 'react-native';
const PADDING = 24;
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;
const HAIRLINE_COLOR = 'rgba(0,0,0,0.15)';
export default {
  common: {
    padding: PADDING,
    MHGreen: '#32BAC0',
    underlayColor: 'rgba(0,0,0,0.25)',
    hairlineColor: HAIRLINE_COLOR,
    backgroundColor: '#f7f7f7',
    separatorHeight: SEPARATOR_HEIGHT,
    title: {
      // fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 20,
      color: '#000',
      // fontFamily: 'MI-LANTING_GB-OUTSIDE-YS',
      // fontFamily: 'Kmedium',
    },
    subtitle: {
      fontSize: 12,
      // lineHeight: 16,
      color: 'rgba(0,0,0,0.6)',
    },
    separator: {
      height: SEPARATOR_HEIGHT,
      backgroundColor: HAIRLINE_COLOR,
    },
  }
}