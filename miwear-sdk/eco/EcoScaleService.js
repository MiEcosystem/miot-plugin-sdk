import EcoDevice from './device/BasicDevice';
import Host from "miwear/host/Host";
import { isIOS } from 'miot/native';
import EcoBlueTooth, { EcoBlePacketDeviceSystemID, EcoBlePacketScaleDataID, EcoBlePacketType } from './EcoBlueTooth';
import EcoHost from './EcoHost';
export default class EcoScaleService {
  constructor() { }
  /**
   * 进入访客模式
   * @param {string} did 设备id
   * @param {number} userAge  年龄
   * @param {number} userSex  性别 0:女 1:男
   * @param {number} userHeight 身高
   * @param {string} nickName 昵称
   * @returns 
   */
  static startVisitWeight(did, userAge, userSex, userHeight, nickName) {
    let param = {
      did: did,
      userType: EcoUserType.VISITOR_USER,
      userHeight: userHeight,
      userAge: userAge,
      userSex: userSex,
      nickName: nickName,
      userWeight: 0
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.setUsrInfo, EcoBlePacketType.ScaleData, param);
  }
  /**
   * 同步主账号体重到秤
   * @param {string} did 设备id
   * @param {number} weight 体重
   * @param {number} unit 单位 1:kg 2:lb 3:斤
   * @param {number} userAge 年龄
   * @param {number} userSex 性别
   * @param {number} userHeight 身高
   * @returns 
   */
  static updateMainUserToScale(did, userWeight, unit, userAge, userSex, userHeight) {
    let param = {
      did: did,
      userType: EcoUserType.MAIN_USER,
      userWeight: userWeight,
      unit: unit,
      userAge: userAge,
      userSex: userSex,
      userHeight: userHeight
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.setUsrInfo, EcoBlePacketType.ScaleData, param);
  }
  /**
   * 同步虚拟账号信息到秤
   * @param {string} did 设备id
   * @param {string} accountId 虚拟用户id
   * @param {number} userAge 用户年龄
   * @param {number} userSex 性别 0:女 1:男
   * @param {number} userHeight 身高
   * @param {number} userWeight 体重
   * @param {number} unit 单位 1:kg 2:lb 3:斤
   * @returns 
   */
  static updateVirtualUserWeightToScale(did, accountId, userAge, userSex, userHeight, userWeight, unit) {
    let param = {
      did: did,
      userType: EcoUserType.VIRTUAL_USER,
      userHeight: userHeight,
      userAge: userAge,
      userSex: userSex,
      userWeight: userWeight,
      unit: unit,
      userId: accountId
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.setUsrInfo, EcoBlePacketType.ScaleData, param);
  }
  /**
   * 下秤重新测量
   * @param {string} did 设备id
   * @returns 
   */
  static reWeight(did) {
    let param = {
      did: did
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.updateBaseWeight, EcoBlePacketType.ScaleData, param);
  }
  /**
   * 开始抱婴称重
   * @param {string} did 设备id
   * @returns 
   */
  static startBabyWeight(did) {
    let param = {
      did: did,
      mode: EcoMode.MODE_BABY
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.changeMode, EcoBlePacketType.ScaleData, param);
  }
  /**
   * 结束抱婴称重
   * @param {string} did 设备id
   * @returns 
   */
  static endBabyWeight(did) {
    let param = {
      did: did,
      mode: EcoMode.MODE_NORMAL
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.changeMode, EcoBlePacketType.ScaleData, param);
  }
  /**
   * 开始平衡模式
   * @param {string} did 设备id
   * @returns 
   */
  static startBalanced(did) {
    let param = {
      did: did,
      mode: EcoMode.MODE_BALANCED
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.changeMode, EcoBlePacketType.ScaleData, param);
  }
  /**
   * 结束平衡模式
   * @param {string} did 设备id
   * @returns 
   */
  static endBalanced(did) {
    let param = {
      did: did,
      mode: EcoMode.MODE_NORMAL
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketScaleDataID.changeMode, EcoBlePacketType.ScaleData, param);
  }
  /**
   * 更新虚拟用户数据到云端
   * @param {string} accountId 虚拟用户id
   * @param {string} name 昵称
   * @param {number} sex 性别
   * @param {number} height 身高
   * @param {number} weightTarget 体重 
   * @param {string} birth 出生日期（时间戳）
   * @returns 
   */
  static updateVirtualUserInfoToServer(accountId, name, sex, height, weightTarget, birth) {
    let url = "eco/scale/account/update";
    let params = {
      accountId: accountId,
      name: name,
      height: height,
      weightTarget: weightTarget,
      birth: birth,
      sex: sex
    };
    return new Promise((resolve, reject) => {
      Host.requestApi(url, isIOS ? JSON.stringify(params) : params).then((res) => {
        resolve(res);
      }).catch((e) => {
        reject(e);
      });
    });
  }
  /**
   * 跳转虚拟用户确认信息页面
   * @param {string} did  设备id
   * @param {string} accountId 虚拟用户id
   * @param {string} name 昵称
   * @param {number} sex 性别 男1 女0
   * @param {string} birth 生日时间戳
   * @param {number} height 身高
   * @param {number} weight 体重
   * @param {number} unit 单位 1：kg 2:lb 3:斤
   * @param {string} time 创建时间戳（毫秒）
   * @param {number} heartRate 心率
   * @param {number} zk1 阻抗1
   * @param {number} zk2 阻抗2
   * @param {number} zk3 阻抗3
   * @param {number} zk4 阻抗4
   * @param {number} zk5 阻抗5
   * @param {number} zk6 阻抗6
   * @param {number} zk7 阻抗7
   * @param {number} zk8 阻抗8
   * @param {number} zk9 阻抗9
   * @param {number} zk10 阻抗10
   * @param {number} zk11 阻抗11
   * @param {number} zk12 阻抗12
   * @returns 
   */
  static gotoVirtualUserConfimInfoPage(did, accountId, name, sex, birth, height, weight, unit, time, heartRate, zk1, zk2, zk3, zk4, zk5, zk6, zk7, zk8, zk9, zk10, zk11, zk12) {
    let params = {
      userType: 2,
      accountId: `${ accountId }`,
      name: `${ name }`,
      sex: Number(sex),
      birth: `${ birth }`,
      height: Number(height),
      weight: Number(weight),
      unit: Number(unit),
      time: `${ time }`,
      heartRate: Number(heartRate),
      zk1: zk1,
      zk2: zk2,
      zk3: zk3,
      zk4: zk4,
      zk5: zk5,
      zk6: zk6,
      zk7: zk7,
      zk8: zk8,
      zk9: zk9,
      zk10: zk10,
      zk11: zk11,
      zk12: zk12
    };
    return new Promise((resolve, reject) => {
      EcoHost.gotoConfirmInfoPage(did, params, (isSuccess, response) => {
        console.log("suc", isSuccess);
        if (isSuccess && response) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }
  /**
   * 跳转主用户确认信息页面
   * @param {string} did  设备id
   * @param {number} weight 体重
   * @param {number} unit 单位 1：kg 2:lb 3:斤
   * @param {string} time 创建时间戳（毫秒）
   * @param {number} heartRate 心率
   * @param {number} zk1 阻抗1
   * @param {number} zk2 阻抗2
   * @param {number} zk3 阻抗3
   * @param {number} zk4 阻抗4
   * @param {number} zk5 阻抗5
   * @param {number} zk6 阻抗6
   * @param {number} zk7 阻抗7
   * @param {number} zk8 阻抗8
   * @param {number} zk9 阻抗9
   * @param {number} zk10 阻抗10
   * @param {number} zk11 阻抗11
   * @param {number} zk12 阻抗12
   * @returns 
   */
  static gotoMainUserConfimInfoPage(did, weight, unit, time, heartRate, zk1, zk2, zk3, zk4, zk5, zk6, zk7, zk8, zk9, zk10, zk11, zk12) {
    let params = {
      userType: 1,
      weight: Number(weight),
      unit: Number(unit),
      time: `${ time }`,
      heartRate: Number(heartRate),
      zk1: zk1,
      zk2: zk2,
      zk3: zk3,
      zk4: zk4,
      zk5: zk5,
      zk6: zk6,
      zk7: zk7,
      zk8: zk8,
      zk9: zk9,
      zk10: zk10,
      zk11: zk11,
      zk12: zk12
    };
    return new Promise((resolve, reject) => {
      EcoHost.gotoConfirmInfoPage(did, params, (isSuccess, response) => {
        console.log("suc", isSuccess);
        if (isSuccess && response) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }
  /**
  * 获取固件版本信息
  * @returns 
  */
  static getDeviceVersion() {
    let param = {
      did: EcoDevice.deviceID
    };
    return EcoBlueTooth.sendPacket(EcoBlePacketDeviceSystemID.getVersion, EcoBlePacketType.DeviceSysyem, param);
  }
}
export const EcoUserType = {
  // 主账号0 虚拟账号1 共享用户2 访客3
  MAIN_USER: 0, /** 主用户 */
  VIRTUAL_USER: 1, /** 虚拟用户 */
  SHARE_USER: 2, /** 共享用户 */
  VISITOR_USER: 3 /** 访客 */
};
export const EcoMode = {
  MODE_BABY: 1, /** 抱婴称重 */
  MODE_BALANCED: 2, /** 平衡模式 */
  MODE_NORMAL: 3 /** 正常模式 */
};