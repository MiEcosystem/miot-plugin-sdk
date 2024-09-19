import native from './ecoNative';
export default class EcoBlueTooth {
  constructor() { }
  static sendPacket(id, type, params) {
    return new Promise((resolve, reject) => {
      native.EcoBlueTooth.sendPacket(id, type, params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 蓝牙连接设备
   * @param {*} did 设备did
   * @param {*} mac 设备mac地址
   * @param {*} model 设备model
   * @returns 
   */
  static connectDevice(did, mac, model) {
    return new Promise((resolve, reject) => {
      native.EcoBlueTooth.connectDeviceWith(did, mac, model, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
}
/**
 * 原生端蓝牙命令下发数据(EcoWearPacket)需要的packetType
 */
export const EcoBlePacketType = {
  System: 2, /** 系统设置相关 */
  Fitness: 8, /** 运动相关--目前健身设备独有 */
  ScaleData: 32, /** 秤相关 */
  DeviceSysyem: 33 /** 设备信息相关 */
};
/**
 * 原生端蓝牙命令下发数据(EcoWearPacket)需要的packetId
 * EcoBleScaleDataID 对应 EcoBlePacketType.ScaleData
 * 主要用在八电极体脂秤的功能模块中
 */
export const EcoBlePacketScaleDataID = {
  setUsrInfo: 0, /** 设置用户信息 (userType: 0-主账号; 1-虚拟成员; 2-共享账号; 3-访客) */
  delUsrInfo: 1, /** 删除用户信息-虚拟用户等 */
  unBindUsrInfo: 2, /** 解绑用户-分享用户 */
  setUnit: 3, /** 设置秤面单位 */
  getUnit: 4, /** 获取秤面单位 */
  shankeHeart: 5, /** 八电极没用到 */
  changeMode: 6, /** 切换秤工作模式--(workMode: 0-体脂秤模式; 1-抱婴称重; 2-平衡测试; 3-普通模式) */
  updateBaseWeight: 7, /** 重新测量 */
  balanceTime: 8, /** 平衡测试时间--设备主动上报 */
  updateInfantRes: 9, /** 抱婴称重 - 婴儿体重结果数据--设备主动上报 */
  getHistoryData: 10, /** 秤内保存的历史数据 */
  uploadVisitorRes: 11, /** 八电极未使用 */
  uploadBodyComposition: 12, /** 更新体脂相关数据--设备主动上报 */
  uploadWeighProcedure: 13, /** 更新实时体重--设备主动上报 */
  bindUser: 14, /** 绑定主帐号 */
  getUserBun: 15, /** 获取称内用户数量 */
  uploadChildData: 16, /** 匹配到的用户数据(婴儿，虚拟用户等)---设备主动上报 */
  getUserList: 17, /** 设备内保存的用户信息--设备主动上报-- getUserBun发送成功后 */
  getUserInfoExt: 18, /** 八电极没用到 */
  setUserInfoExt: 19 /** 设置用户体脂率 */
};
/**
 * 原生端蓝牙命令下发数据(EcoWearPacket)需要的packetId
 * EcoBleSystemId 对应 EcoBlePacketType.System
 */
export const EcoBlePacketSystemId = {
  /** 八电极暂时只用到这一个 */
  syncProtoVersion: 82 /** 同步固件与APP端兼容协议版本 */
};
/**
 * 原生端蓝牙命令下发数据(EcoWearPacket)需要的packetId
 * EcoBleFitnessID 对应 EcoBlePacketType.Fitness
 */
export const EcoBlePacketFitnessID = {
  /** 八电极未使用，健身设备使用 */
};
/**
 * 原生端蓝牙命令下发数据(EcoWearPacket)需要的packetId
 * EcoBleDeviceSystemID 对应 EcoBlePacketType.DeviceSysyem
 */
export const EcoBlePacketDeviceSystemID = {
  syncTime: 0, /** 同步时间 */
  getVersion: 1, /** 获取固件版本 */
  getWifi: 2, /** 获取WiFi信息 */
  queryBattery: 3, /** 查询电量 */
  modifyWifi: 4, /** 配置WiFi信息 */
  netConfigure: 5, /** 配置WiFi数据 */
  restoreFactory: 30 /** 恢复出厂设置，参数cmd 0啥也不改，1只是重置wifi，2恢复出厂设置 */
};
export const EcoBlePacketCMD = {
  resetWifiCmd: 1, // 重置WiFi cmd 
  restoreFactoryCmd: 2 // 恢复出厂设置 cmd
};