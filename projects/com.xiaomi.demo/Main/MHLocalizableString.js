import LocalizedStrings from '../CommonModules/LocalizedStrings';
import IntlMessageFormat from 'intl-messageformat';
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/zh-Hans.js';
import 'intl/locale-data/jsonp/zh-Hant.js';
import 'intl/locale-data/jsonp/ko-KR.js';
export const strings = {
  'en': {
    NUM_PHOTOS: 'You have {numPhotos, plural, ' +
      '=0 {no photos.}' +
      '=1 {one photo.}' +
      'other {# photos.}}',
    t1: 'tttttttt',
    t2: ['tl{1}'],
    t3: ['tt{1},{2}', [0, 'zero'], [1, 'one'], [2, 'two,{2}', 1], [v => v > 100, 'more']],
    t4: {
      t5: [() => 'akjasdkljflkasdjf'],
      t6: ['yyy{1}'],
    },
    setting: 'setting',
    featureSetting: 'Shortcut settings',
    commonSetting: 'Common settings',
    deviceName: 'Device name',
    locationManagement: 'Locations',
    shareDevice: 'Share device',
    ifttt: 'Automation',
    firmwareUpgrate: 'Check for firmware updates',
    moreSetting: 'Additional settings',
    addToDesktop: 'Add to Home screen',
    resetDevice: 'Reset device',
    licenseAndPolicy: 'User Agreement & Privacy Policy',
    device_more_activity_rename: 'Rename',
    device_more_activity_about: 'About',
    device_more_activity_help: 'Tutorial',
    device_more_activity_firmware_update: 'Check for firmware updates',
    device_more_activity_noti_quick_op: 'Notification center shortcuts',
    device_more_activity_unbind: 'Remove device',
    device_more_activity_feedback: 'Feedback',
    device_more_activity_scence: 'Automation',
    device_more_activity_help_feedback: 'Help',
    device_more_activity_reset: 'Reset',
    device_more_activity_setting: 'Settings',
    device_more_activity_common_setting: 'General settings',
    device_more_activity_network_info: 'Network info',
    device_more_activity_license_privacy: 'User Agreement and Privacy Policy',
    device_more_activity_license: 'User Agreement',
    device_more_activity_privacy: ' Privacy Policy ',
    device_more_activity_cancel_license_privacy: 'Withdraw the authorization from User Agreement and Privacy Policy',
    OpenLibList: 'open source library test',
    ViewTest: ' test view',
      cancel: "Cancel",
      ok: "OK",
      save: "Save",
      saved: "Saved successfully",
      voiceBroadcast:'voice control'
  },
  'zh': {
    NUM_PHOTOS: 'Usted {numPhotos, plural, ' +
      '=0 {no tiene fotos.}' +
      '=1 {tiene una foto.}' +
      'other {tiene # fotos.}}',
    t1: 'tttttttt',
    t2: ['tt{1}'],
    t3: ['tt{1},{2}', [0, 'zero'], [1, 'one'], [2, 'two,{2}', 1], [v => v > 100, 'more']],
    t4: {
      t5: [() => 'akjasdkljflkasdjf'],
      t6: ['yyy{1}'],
    },
    setting: '设置',
    featureSetting: '功能设置',
    commonSetting: '通用设置',
    deviceName: '设备名称',
    locationManagement: '位置管理',
    shareDevice: '设备共享',
    ifttt: '自动化',
    firmwareUpgrate: '检查固件升级',
    moreSetting: '更多设置',
    addToDesktop: '添加到桌面',
    resetDevice: '重置设备',
    licenseAndPolicy: '使用条款和隐私政策',
    device_more_activity_rename: '重命名',
    device_more_activity_about: '关于',
    device_more_activity_help: '玩法教程',
    device_more_activity_firmware_update: '检查固件更新',
    device_more_activity_noti_quick_op: '通知中心快捷开关',
    device_more_activity_unbind: '删除设备',
    device_more_activity_feedback: '反馈',
    device_more_activity_reset: '重置',
    device_more_activity_setting: '设置',
    device_more_activity_scence: '智能',
    device_more_activity_help_feedback: '使用帮助',
    device_more_activity_common_setting: '通用设置',
    device_more_activity_network_info: '网络信息',
    device_more_activity_license_privacy: '使用条款和隐私政策',
    device_more_activity_license: '使用条款',
    device_more_activity_privacy: '隐私政策',
    device_more_activity_cancel_license_privacy: '撤销“使用条款和隐私政策”授权',
    home_title: '虚拟设备',
    home_subtitle: '子设备',
    control_demo: ' 控制示例',
    cloud_debug: ' 云端调试',
    my_product: ' 创建自己的产品',
    OpenLibList: ' 第三方库测试',
    ViewTest: ' 常用的 view 测试',
  },
  'zh-tw': {
    NUM_PHOTOS: 'You have {numPhotos, plural, ' +
      '=0 {no photos.}' +
      '=1 {one photo.}' +
      'other {# photos.}}',
    setting: '設置',
    featureSetting: '功能設定',
    commonSetting: '一般設定',
    deviceName: '裝置名稱',
    locationManagement: '位置管理',
    shareDevice: '裝置共用',
    ifttt: '自動化',
    firmwareUpgrate: '檢查韌體更新',
    moreSetting: '更多設定',
    addToDesktop: '新增到桌面',
    resetDevice: '重置裝置',
    licenseAndPolicy: '用戶協議和隱私政策',
  },
  'zh-hk': {
    NUM_PHOTOS: 'You have {numPhotos, plural, ' +
      '=0 {no photos.}' +
      '=1 {one photo.}' +
      'other {# photos.}}',
    setting: '設置',
    featureSetting: 'feature setting',
    commonSetting: '一般設定',
    deviceName: '裝置名稱',
    locationManagement: '位置管理',
    shareDevice: '裝置共用',
    ifttt: '自動化',
    firmwareUpgrate: '檢查韌體更新',
    moreSetting: '更多設定',
    addToDesktop: '新增到桌面',
    resetDevice: '重置裝置',
    licenseAndPolicy: '用戶協議和隱私政策',
  },
  'ko': {
    NUM_PHOTOS: 'You have {numPhotos, plural, ' +
      '=0 {no photos.}' +
      '=1 {one photo.}' +
      'other {# photos.}}',
    featureSetting: '바로가기 설정',
    commonSetting: '일반 설정',
    deviceName: '기기 이름',
    locationManagement: '위치',
    shareDevice: '기기 공유',
    ifttt: '자동화',
    firmwareUpgrate: '펌웨어 업데이트 확인',
    moreSetting: '추가 설정',
    addToDesktop: '홈 화면에 추가',
    resetDevice: '기기 초기화',
    licenseAndPolicy: '이용 약관 & 개인 정보 보호 정책',
  },
};
export const localStrings = new LocalizedStrings(strings);

export function getString(key, obj = null) {
  if (obj) {
    return new IntlMessageFormat(localStrings[key], localStrings.language).format(obj);
  } else {
    return localStrings[key];
  }
}
