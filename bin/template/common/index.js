
import { Package } from 'miot';

import App from './main';

/**
 * 是否需要自动检测wifi固件强制升级, 自动检测出需要升级则会出现弹窗提示升级
 * 此属性对分享的设备、虚拟设备、离线设备无效, 如果是蓝牙设备请将disableAutoCheckUpgrade设置为true
 * Package.disableAutoCheckUpgrade = false  表示会自动检测， 当发现需要强制升级时，进入插件会自动出现强制升级的弹窗,反之则不会
 * @type {boolean}
 */
Package.disableAutoCheckUpgrade = false;

Package.entry(App, () => {});

