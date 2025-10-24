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
export const Fonts = {
  mjTextTitle1R: {
    fontSize: 32,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextTitle2M: {
    fontSize: 24,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextTitle3M: {
    fontSize: 20,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextTitle3R: {
    fontSize: 20,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextTitle4M: {
    fontSize: 18,
    fontFamily: 'MiSansW-Medium'
  },
  // Subtitle
  mjTextSubtitle1M: {
    fontSize: 16,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextSubtitle2M: {
    fontSize: 15,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextSubtitle3M: {
    fontSize: 14,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextSubtitle3R: {
    fontSize: 14,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextSubtitle4M: {
    fontSize: 12,
    fontFamily: 'MiSansW-Medium'
  },
  // Button
  mjTextButton1M: {
    fontSize: 17,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextButton2M: {
    fontSize: 14,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextButton3R: {
    fontSize: 13,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextButton4R: {
    fontSize: 12,
    fontFamily: 'MiSansW-Regular'
  },
  // Headline
  mjTextHeadline1M: {
    fontSize: 17,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextHeadline1R: {
    fontSize: 17,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextHeadline2M: {
    fontSize: 16,
    fontFamily: 'MiSansW-Medium'
  },
  // Body
  mjTextBody1R: {
    fontSize: 16,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextBody2R: {
    fontSize: 14,
    fontFamily: 'MiSansW-Regular'
  },
  // Footnote
  mjTextFootnote1R: {
    fontSize: 14,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextFootnote2R: {
    fontSize: 13,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextFootnote3R: {
    fontSize: 12,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextFootnote4R: {
    fontSize: 11,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextFootnote5R: {
    fontSize: 10,
    fontFamily: 'MiSansW-Regular'
  },
  // Custom
  mjTextCustom32M: {
    fontSize: 32,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom24M: {
    fontSize: 24,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom20M: {
    fontSize: 20,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom20R: {
    fontSize: 20,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextCustom18M: {
    fontSize: 18,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom18R: {
    fontSize: 18,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextCustom16M: {
    fontSize: 16,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom16R: {
    fontSize: 16,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextCustom15M: {
    fontSize: 15,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom15R: {
    fontSize: 15,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextCustom14M: {
    fontSize: 14,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom14R: {
    fontSize: 14,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextCustom13M: {
    fontSize: 13,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom13R: {
    fontSize: 13,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextCustom12M: {
    fontSize: 12,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom12R: {
    fontSize: 12,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextCustom11M: {
    fontSize: 11,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom11R: {
    fontSize: 11,
    fontFamily: 'MiSansW-Regular'
  },
  mjTextCustom10M: {
    fontSize: 10,
    fontFamily: 'MiSansW-Medium'
  },
  mjTextCustom10R: {
    fontSize: 10,
    fontFamily: 'MiSansW-Regular'
  } };
export default Fonts;