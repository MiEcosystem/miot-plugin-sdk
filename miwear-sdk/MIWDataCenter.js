import native from "./native";
export default class MIWDataCenter {
  constructor() { }
  /**
   * 主账户把计算结果同步至穿戴数据库
   * weightJson 用户体重相关数据 JSON字符串
   * {
   *  time: xx,
   *  did: xx,
   *  weight: xx,
   *  ...
   * }
   *
   *
   */
  static insertUserWeightToDatabaseFromPlugin(weightJson) {
    return new Promise((resolve, reject) => {
      native.MiWearDataBase.insertUserWeightToDatabaseFromPlugin(
        weightJson,
        (isSuccess, result) => {
          if (isSuccess) {
            resolve(result);
          } else {
            reject(result);
          }
        }
      );
    });
  }
  /**
   * 删除数据库中的主账号体重
   * did: 设备id
   * time：测量时间戳(毫秒)
   */
  static deleteUserWeightFromDatabase(did, time) {
    return new Promise((resolve, reject) => {
      native.MiWearDataBase.deleteUserWeightFromDatabase(
        did,
        stringify(time),
        (isSuccess, result) => {
          if (isSuccess) {
            resolve(result);
          } else {
            reject(result);
          }
        }
      );
    });
  }
  /**
   * 向运动健康同步运动数据
   * @param {JSON} params 
   * @param {String} params.did 设备id
   * @param {String} params.reportDataString 运动报告数据（十六进制字符串形式）
   * @param {String} params.recordDataString 运动打点数据（十六进制字符串形式）
   * @param {Array<String>} params.dailyData 日常打点数据（十六进制字符串，数组包装）
   * @param {Number} params.startTimestamp 运动开始时间戳（秒）
   * @param {Boolean} params.needJumpToReportPage 数据存储完成后是否需要跳转到运动健康报告页
   * @returns {Promise}
   */
  static insertFitnessDataToDatabase(params) {
    return new Promise((resolve, reject) => {
      native.MiWearDataBase.insertSportDataToDatabase(params, (isSuccess, result) => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  }
}