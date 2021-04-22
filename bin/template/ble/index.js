
import { Package } from 'miot';

import App from './main';

/**
 * 自动BLE/Mesh设备升级检查，即使设置了alertDialog为true，也仅仅会在直连完成后才弹窗，红点进插件就可以显示
 * @param redPoit 红点
 * @param alertDialog 弹窗
 * @param authType 蓝牙连接类型(0: 普通小米蓝牙协议设备(新接入设备已废弃该类型)，1: 安全芯片小米蓝牙设备（比如锁类产品） 4: Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新蓝牙设备) 5: mesh 设备)
 * @since 10039
 * @example
 * Package.BLEAutoCheckUpgradeOptions = {
 *   enable: true,
 *   redPoint: true,
 *   alertDialog: true,
 *   authType: 5
 * }
 */
Package.BLEAutoCheckUpgradeOptions = {
  enable: true,
  redPoint: true,
  alertDialog: true,
  authType: 4 // 此处值需要开发者根据具体蓝牙设备类型来做相关修改
};

Package.entry(App, () => {});

