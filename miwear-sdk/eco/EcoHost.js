import native from './ecoNative';
export default class EcoHost {
  /**
   * 检查WiFi状态
   * @returns  isSuccess  true 成功  false  失败
   */
  static checkNetWorkConnect() {
    return new Promise((resolve, reject) => {
      native.EcoHost.checkNetWorkConnect((isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
  * 检查手机蓝牙开关状态
  * @returns isSuccess  true 成功  false  失败
  */
  static checkBlePower() {
    return new Promise((resolve, reject) => {
      native.EcoHost.checkBlePower((isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 获取设备隐私政策链接
   * @returns 获取
   */
  static getPrivacyPoilcyUrl() {
    return new Promise((resolve, reject) => {
      native.EcoHost.getPrivacyPoilcyUrl((isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 设备配网
   * 调用原生配网功能
   * @param {*} type 配网类型 Int ，从1开始（八电极使用：1,默认：1）
   */
  static configurationNetWork(type) {
    return new Promise((resolve, reject) => {
      native.EcoHost.configurationNetWork(type, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 获取是否为debug包
   * @returns 获取
   */
  static isDebugApk() {
    return new Promise((resolve, reject) => {
      native.EcoHost.isDebugApk((isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 跳转历史记录页面
   * @returns 获取
   */
  static goToMainWeightHistoryPage() {
    native.EcoHost.goToMainWeightHistoryPage();
  }
  /* 解绑设备
  * @returns  isSuccess  true 成功  false  失败
  */
  static unbindDevice(did) {
    return new Promise((resolve, reject) => {
      native.EcoHost.unbindDevice(did, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 断开连接
   */
  static disconnectDevice(did) {
    native.EcoHost.disconnectDevice(did);
  }
  static destroyEcoCall(did) {
    native.EcoHost.destroyEcoCall(did);
  }
  static refreshEcoList(did) {
    return new Promise((resolve, reject) => {
      native.EcoHost.refreshEcoList(did, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 计算体脂数据
   * sex ：性别（男：1，女：0）
   * age：年龄
   * height：身高
   * weight：体重
   * zk1, zk2, zk3, zk4, zk5, zk6, zk7, zk8, zk9, zk10, zk11, zk12 ：12项阻抗（顺序不能错）
   * 文档：https://xiaomi.f.mioffice.cn/docx/doxk4irk0njY8AA3kikfYkEWzsh
   */
  static calculateBodyFat(sex, age, height, weight, zk1, zk2, zk3, zk4, zk5, zk6, zk7, zk8, zk9, zk10, zk11, zk12) {
    return new Promise((resolve, reject) => {
      native.EcoHost.calculateBodyFat(sex, age, height, weight, zk1, zk2, zk3, zk4, zk5, zk6, zk7, zk8, zk9, zk10, zk11, zk12, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 跳转虚拟账号体脂数据页面
   * accountId： string 虚拟用户id
   * noBodyFat ：boolean 是否显示体脂计算失败弹框
   * isSupportVmBody：boolean 固件是否支持虚拟成员测脂
   */
  static goVmDataPage(accountId, noBodyFat, isSupportVmBody) {
    native.EcoHost.goVmDataPage(`${ accountId }`, noBodyFat, isSupportVmBody);
  }
  /**
   * 跳转主账号体脂数据页面
   * noBodyFat ： 是否显示体脂计算失败弹框
   */
  static goMainUserDataPage(noBodyFat) {
    native.EcoHost.goMainUserDataPage(noBodyFat);
  }
  /**
   * 跳转数据报告页面
   * nickNamne: 昵称
   * sex：性别（男：1，女：0）
   * age：年龄
   * height：身高
   * time：测量时间戳(毫秒)
   * params：体脂参数 
   * 文档：https://xiaomi.f.mioffice.cn/docx/doxk4PDukWlpOjx2dvvAccdNSne
   */
  static gotoDataReportPage(nickName, sex, age, height, time, params) {
    return new Promise((resolve, reject) => {
      native.EcoHost.gotoDataReportPage(nickName, sex, age, height, time, params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 跳转添加虚拟成员页面
   * did:  设备id
   * params：体脂参数 params新增flag属性 0:新增虚拟成员 1:编辑虚拟成员
   *         新增name属性 虚拟用户昵称
   *         新增accountId属性 虚拟用户id
   *         新增fromPage属性 1:称重页面 2:待认领界面
   *         新增weights属性 增加体重数组传递
   *         weights: [
   *          {
   *            weight: 体重 //eg: 69.2
   *            unit:  //weight的称重单位, 1:kg，2：lb，3：斤
   *            zk1: 阻抗1
   *            zk2: 阻抗2
   *            zk3:阻抗3
   *            zk4:阻抗4
   *            zk5: 阻抗5
   *            zk6: 阻抗6
   *            zk7: 阻抗7
   *            zk8: 阻抗8
   *            zk9: 阻抗9
   *            zk10:阻抗10
   *            zk11: 阻抗11
   *            zk12:阻抗12
   *            heartRate:心率
   *            time: 测量时间戳（毫秒）
   *          }
   *         ]
   * 文档：https://xiaomi.f.mioffice.cn/docx/doxk4w7m4RY0VBzvRtIofd3AnUf
   * 
   * 
   */
  static gotoAddVirtualAccountPage(did, params) {
    native.EcoHost.gotoAddVirtualAccountPage(did, params);
  }
  /**
   * 获取设备连接状态。
   * result : key connectState 
   * @see EcoDevceConnectState
   * @param {} did 
   * @returns 
   */
  static getConnectState(did) {
    return new Promise((resolve, reject) => {
      native.EcoHost.getConnectState(did, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /**
   * 获取小米账号身高、体重相关信息
   * @returns 
   */
  static getAccountHeightWeight() {
    return new Promise((resolve, reject) => {
      native.EcoHost.getAccountHeightWeight((isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  static deleteByDidAndCreateTimeParamsList(list) {
    let param = JSON.stringify(list);
    console.log(`params = ${ param }`);
    return new Promise((resolve, reject) => {
      native.EcoHost.deleteByDidAndCreateTimeParamsList(param, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  /* 跳转确认用户信息成员页面
  * 文档：https://xiaomi.f.mioffice.cn/docx/doxk46Jl2ftEO82d5q8Ku7ElCZc
  */
  static gotoConfirmInfoPage(did, params) {
    return new Promise((resolve, reject) => {
      native.EcoHost.gotoConfirmInfoPage(did, params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
  static getPluginVersion(model) {
    return new Promise((resolve, reject) => {
      native.EcoHost.getPluginVersion(model, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
}