import { Platform } from 'react-native';
export const FontKmedium = 'KMedium';
export const FontLantingLight = 'MI-LANTING--GBK1-Light';
export const FontDsDigital = 'DS-Digital';
export const FontDefault = Platform.OS === 'ios' ? undefined : FontKmedium;