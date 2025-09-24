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
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextTitle2M: {
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextTitle3M: {
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextTitle3R: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextTitle4M: {
    fontSize: 18,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  // Subtitle
  mjTextSubtitle1M: {
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextSubtitle2M: {
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextSubtitle3M: {
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextSubtitle3R: {
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextSubtitle4M: {
    fontSize: 12,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  // Button
  mjTextButton1M: {
    fontSize: 17,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextButton2M: {
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextButton3R: {
    fontSize: 13,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextButton4R: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  // Headline
  mjTextHeadline1M: {
    fontSize: 17,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextHeadline1R: {
    fontSize: 17,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextHeadline2M: {
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  // Body
  mjTextBody1R: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextBody2R: {
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  // Footnote
  mjTextFootnote1R: {
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextFootnote2R: {
    fontSize: 13,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextFootnote3R: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextFootnote4R: {
    fontSize: 11,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextFootnote5R: {
    fontSize: 10,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  // Custom
  mjTextCustom32M: {
    fontSize: 32,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom24M: {
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom20M: {
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom20R: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextCustom18M: {
    fontSize: 18,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom18R: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextCustom16M: {
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom16R: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextCustom15M: {
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom15R: {
    fontSize: 15,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextCustom14M: {
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom14R: {
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextCustom13M: {
    fontSize: 13,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom13R: {
    fontSize: 13,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextCustom12M: {
    fontSize: 12,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom12R: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextCustom11M: {
    fontSize: 11,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom11R: {
    fontSize: 11,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  },
  mjTextCustom10M: {
    fontSize: 10,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500'
  },
  mjTextCustom10R: {
    fontSize: 10,
    fontFamily: 'sans-serif',
    fontWeight: '400'
  }
};
export default Fonts;