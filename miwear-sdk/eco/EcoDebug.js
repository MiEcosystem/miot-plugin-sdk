import native from './ecoNative';
/**
 * Debug
 * message:一条信息字符串
*/
export default class EcoDebug {
  constructor() {
    this.message = "";
  }
  /**
   * 获取调试信息
   * 调用示例：
   * EcoDebug.getDebugInfo()
      .then((info) => {
      })
      .catch((error) => {
        console.log("error", error);
      });
   * 
  */
  static getDebugInfo() {
    return new Promise((resolve, reject) => {
      native.EcoDebug.getDebugInfo((isOk, response) => {
        if (isOk && response) {
          let debugInfo = new EcoDebug();
          let { message } = response;
          debugInfo.message = message;
          resolve(debugInfo);
        } else {
          reject(response);
        }
      });
    });
  }
}