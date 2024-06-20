/**
 * Author: liyueda@xiaomi.com
 * Date: 2023-06-25 14:26:01
 * LastEditors: liyueda@xiaomi.com
 * LastEditTime: 2023-07-25 16:43:53
 * FilePath: /miwear-rn-plugin/miwear-workspace/miwear-sdk/eco/ecoNative/android/index.js
 * Description:
 *
 * Copyright (c) 2023 by 小米生态链软件部, All Rights Reserved.
 */
/**
 * @file native/android
 * @description 安卓端的本地接口
 *
 */

import { NativeModules } from 'react-native';

const LocalCache = { currentDevice: {}, bluetoothDevicies: new Map() };
LocalCache.clear = () => {
  LocalCache.currentDevice = {};
  LocalCache.bluetoothDevicies = new Map();
};

const {
  Package,
  Device,
  Service,
  Host,
  File,
  EcoDebug,
  EcoBlueTooth,
  ECODevice,
  EcoHost,
  EcoDB,
  ECOService,
  EcoCache,
  MIOTPackage
} = NativeModules;

console.log(`Service=${ Service }`);

export default {
  MIOTPackage,
  Package,
  Device,
  Service,
  Host,
  File,
  EcoDebug,
  LocalCache,
  EcoBlueTooth,
  ECODevice,
  EcoHost,
  EcoDB,
  ECOService,
  EcoCache
};