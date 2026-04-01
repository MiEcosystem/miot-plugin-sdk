import { Platform } from 'react-native';
// 字体
export const FontKmedium = 'KMedium';
export const FontLantingLight = 'MI-LANTING--GBK1-Light';
export const FontDsDigital = 'DS-Digital';
export const FontSystem = 'sans-serif-medium';
export const FontDefault = Platform.OS === 'ios' ? null : FontSystem;
export const FontPrimary = {
  fontFamily: 'sans-serif-medium',
  fontWeight: Platform.OS === 'ios' ? '500' : 'normal'
};
export const FontSecondary = {
  fontFamily: 'sans-serif',
  fontWeight: 'normal'
};
// 以下是自 10079后新增的字体 
// 以下字体是动态下载然后动态注册进入米家的，可能会存在首次打开app不生效的问题 （可能的原因是正在下载等）
// 若出现设置字体不生效的问题，通常重启app或重新进入插件可以解决。
export const FontMiSansWLight = 'MiSansW-Light';
export const FontMiSansWRegular = 'MiSansW-Regular';
export const FontMiSansWMedium = 'MiSansW-Medium';
export const FontMiSansWDemibold = 'MiSansW-Demibold';
export const FontMiSansWHeavy = 'MiSansW-Heavy';
export const FontMILanProRegular = Platform.OS === 'ios' ? 'MILanPro--GB1-4' : 'MI-Lan-Pro-Regular';
export const FontMILanProNormal = Platform.OS === 'ios' ? 'MILanPro_NORMAL--GB1-4' : 'MI-Lan-Pro-Normal';
export const FontMILanProMedium = Platform.OS === 'ios' ? 'MILanPro_MEDIUM--GB1-4' : 'MI-Lan-Pro-Medium';