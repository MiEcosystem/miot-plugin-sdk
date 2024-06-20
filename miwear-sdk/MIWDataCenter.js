import native from "./native";
export default class MIWDataCenter {
  constructor() {}
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
}