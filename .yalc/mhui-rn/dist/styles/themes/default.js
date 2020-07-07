// @native begin

/** 米家默认主题 */
import DynamicColor from "../DynamicColor";
const defaultTheme = {
  /**
   * 客户端主色
   */
  colorPrimary: new DynamicColor('#32bac0', '#25a9af'),
  colorPrimaryFocus: new DynamicColor('#25a9af', '#158b90'),
  // 点击态
  colorPrimaryDisabled: new DynamicColor('rgba(50,186,192,0.3)', 'rgba(37,169,175, 0.3)'),
  // 不可点击态

  /**
   * 警示色
   */
  colorWarn: new DynamicColor('#f43f31', '#d92719'),
  colorWarnFocus: new DynamicColor('#d53c32', '#b62920'),
  colorWarnDisabled: new DynamicColor('#rgba(244,63,49,0.3)', '#b62920'),

  /**
   * 字体颜色
   * */
  colorBlack: new DynamicColor('#000000', '#e6e6e6'),
  colorGrayHeavier: new DynamicColor('#333333', '#cccccc'),
  colorGrayHeavy: new DynamicColor('#4c4c4c', '#b3b3b3'),
  colorGrayNormal: new DynamicColor('#666666', '#999999'),
  colorGrayLight: new DynamicColor('#7f7f7f', '#808080'),
  colorGrayLighter: new DynamicColor('#999999', '#666666'),
  colorWhite: new DynamicColor('#ffffff', '#000000'),

  /**
   * 按钮 */
  colorBtnGreenNor: new DynamicColor('#32bac0', '#25a9af'),
  colorBtnGreenPres: new DynamicColor('#25a9af', '#158b90'),
  colorBtnGrayNor: new DynamicColor('#f5f5f5', '#333333'),
  colorBtnGrayPres: new DynamicColor('#e2e2e2', '#666666'),
  colorBackground: new DynamicColor('#f7f7f7', '#000000'),
  colorOverLayerBlack: new DynamicColor('rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)'),
  colorSeparator: new DynamicColor('#e5e5e5', '#262626'),
  colorForeground: new DynamicColor('#ffffff', '#1a1a1a')
};
export default defaultTheme;