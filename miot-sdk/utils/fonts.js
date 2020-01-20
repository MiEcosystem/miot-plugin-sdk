//@native begin
import {Platform} from 'react-native';
// 字体
export const FontKmedium = 'KMedium';
export const FontLantingLight = 'MI-LANTING--GBK1-Light';
export const FontDsDigital = 'DS-Digital';
export const FontDefault = Platform.OS === 'ios' ? null : FontKmedium;
//@native end