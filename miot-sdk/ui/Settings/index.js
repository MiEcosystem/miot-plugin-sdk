import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { dynamicStyleSheet } from '../Style/DynamicStyleSheet';
import BasicInfo from './BasicInfo';
import FeatureSettings from './FeatureSettings';
import CommonSettings, { options as firstOptions } from './CommonSettings';
import DeleteButton from './DeleteButton';
import { options as secondOptions } from './DeviceInfoPage';
// 参照老的CommonSetting 导出keys 及其他辅助内容
export const AllOptions = {
  ...firstOptions,
  ...secondOptions
};
export const SETTING_KEYS = {
  first_options: AllOptions,
  second_options: AllOptions
};
export {
  AllOptions as firstAllOptions,
  AllOptions as secondAllOptions
};
export function resetClassVariables() {}
export const AllOptionsWeight = {};
export default function Settings({
  navigation,
  options,
  firstOptions,
  secondOptions,
  showDot,
  extraOptions,
  firstCustomOptions,
  secondCustomOptions,
  children
}) {
  const mergedOptions = [...new Set(...(options || []), firstOptions || [], secondOptions || [])];
  return (
    <View style={Styles.container}>
      <BasicInfo navigation={navigation} options={mergedOptions} customOptions={secondCustomOptions} showDots={showDot} extraOptions={extraOptions} />
      <FeatureSettings navigation={navigation} options={mergedOptions} customOptions={firstCustomOptions} showDots={showDot} extraOptions={extraOptions}>{children}</FeatureSettings>
      <CommonSettings navigation={navigation} options={mergedOptions} customOptions={firstCustomOptions} showDots={showDot} extraOptions={extraOptions} />
      <DeleteButton />
    </View>
  );
}
Settings.propTypes = {
  // 导航实例，optional, 不涉及插件自定义页面则不需要
  navigation: CommonSettings.propTypes.navigation,
  // 需要展示的项目列表，相当于firstOptions 和secondOptions 的并集
  // 因为项目放在哪一页是sdk 内部决定的，对调用者而言，不需要区分是first 还是second
  // example: [Alloptions.ifttt, AllOptions.share]
  options: CommonSettings.propTypes.options,
  // 用于兼容原CommonSetting 里的firstOptions, 不建议使用
  firstOptions: CommonSettings.propTypes.options,
  // 用于兼容原CommonSetting 里的secondOptions, 不建议使用
  secondOptions: BasicInfo.propTypes.options,
  // 用于兼容原CommonSetting 里的showDot, 不建议使用
  showDot: CommonSettings.propTypes.showDot,
  // 额外配置
  extraOptions: PropTypes.shape({
    // 即便没有配置到options 里，有些项也会显示
    // 可以通过此配置，过滤掉部分项，使其不显示
    // example: [AllOptions.help]
    excludeRequiredOptions: CommonSettings.propTypes.excludeOptions,
    // 某项的交互的前置操作，可选
    // 该前置操作须为promise，resolve 后才会执行正常操作
    // example: { ifttt: () => { if (somehow) { return Promise.resolve(); } return Promise.reject(); } }
    preOperations: PropTypes.object,
    // 是否使用sdk 提供的固件升级页
    // 仅当值为false 时，才尝试用插件自己的固件升级页
    showUpgrade: PropTypes.bool,
    // 插件自己的固件升级页标识，与showUpgrade: false 配合使用
    upgradePageKey: PropTypes.string,
    // 若为蓝牙设备，则需要根据bleOtaAuthType 判断是否进特定的蓝牙固件升级页
    bleOtaAuthType: PropTypes.number,
    networkInfoConfig: PropTypes.object,
    // 插件端设置时区后是否需要后台同步到设备端
    syncDevice: PropTypes.bool,
    // 删除设备时的提示文案
    deleteDeviceMessage: PropTypes.string,
    // licenseUrl/policyUrl, option 和线上隐私，建议优先级：线上 > option > licenseUrl/policyUrl
    // 用于兼容原CommonSetting 里的extraOptions.licenseUrl, 设置内置用户协议资源，不建议使用
    // 建议使用线上隐私
    licenseUrl: PropTypes.any,
    // 用于兼容原CommonSetting 里的extraOptions.policyUrl, 设置内置隐私政策资源，不建议使用
    // 建议使用线上隐私
    policyUrl: PropTypes.any,
    // 用于兼容原CommonSetting 里的extraOptions.option, 设置内置隐私政策和用户协议资源，不建议使用
    // 建议使用线上隐私
    option: PropTypes.shape({
      privacyURL: PropTypes.any,
      agreementURL: PropTypes.any,
      hideAgreement: PropTypes.bool,
      experiencePlanURL: PropTypes.any,
      hideUserExperiencePlan: PropTypes.bool
    })
  }),
  // 功能设置中用户自定义项目，需传入组件实例
  // example: [(<ListItem />)]
  firstCustomOptions: CommonSettings.propTypes.customOptions,
  // 更多设备信息中用户自定义项目，需传入组件实例
  // example: [(<ListItem />)]
  secondCustomOptions: BasicInfo.propTypes.customOptions
};
const Styles = dynamicStyleSheet({
  container: {}
});