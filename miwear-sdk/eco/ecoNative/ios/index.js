/**
 * Author: liyueda@xiaomi.com
 * Date: 2023-06-25 14:26:01
 * LastEditors: liyueda@xiaomi.com
 * LastEditTime: 2023-07-25 16:44:02
 * FilePath: /miwear-rn-plugin/miwear-workspace/miwear-sdk/eco/ecoNative/ios/index.js
 * Description:
 *
 * Copyright (c) 2023 by 小米生态链软件部, All Rights Reserved.
 */
import { NativeModules } from 'react-native';
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
const LocalCache = { currentDevice: {}, bluetoothDevicies: new Map() };
LocalCache.clear = () => {
  LocalCache.currentDevice = {};
  LocalCache.bluetoothDevicies = new Map();
};
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