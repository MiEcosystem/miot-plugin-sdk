import { NativeModules } from 'react-native';

const MiWearService = NativeModules.MiWearService;

export const LEVEL_INFO = 0;

export const LEVEL_DEBUG = 1;

class Logger {

  /**
   * 添加一条日志打点。
   * 开发者应该在拓展程序内合适时机调用该接口，打点信息会自动写入文件，按 Model 归类，即一个 Model 生成一个日志文件。
   * 当用户反馈问题时，勾选 “同时上传日志”，则该 Model 的日志会跟随用户反馈上传，
   * @param {string} model 要打 log 到哪个 model 下, 格式必须形如aaa.bbb.ccc, 否者无效
   * @param {string} log 具体的 log 数据
   * @returns {void}
   *
   */
  addLog(model, level, log) {
    if (!model) return;
    // 直接执行, 无返回
    if (!/^(\S+\.)+\S+$/.test(model)) {
      return;
    }

    MiWearService.addLog(model, level, `${ log }`);
  }

  addInfoLog(model, log) {
    this.addLog(model, LEVEL_INFO, log);
  }

  /**
   * 添加一条SDK日志调试信息，SDK内部使用，不对外暴露
   */
  addSDKLog(...logs) {
    let model = 'rn.sdk.filelog';
    let log = logs.reduce((ret, l) => {
      if (l instanceof Error) {
        l = l.toString();
      }
      return `${ ret } ${ JSON.stringify(l) }`;
    }, '');
    this.addInfoLog(model, log);
  }
      
}

const LogInstance = new Logger();

export default class Log {

  static i(model, msg) {
    LogInstance.addInfoLog(model, msg);
  }

  static d(model, msg) {
    LogInstance.addLog(model, LEVEL_DEBUG, msg);
  }

  /**
   * 添加一条SDK日志调试信息，SDK内部使用
   */
  static sdkLog(...logs) {
    LogInstance.addSDKLog(logs);
  }
}