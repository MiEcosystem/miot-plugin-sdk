import {report} from '../decorator/ReportDecorator';
/**
 * @export
 */
class IKookong {
  /**
   *  注册sdk
   *  暂时米家只支持KooKong sdk的压缩方案，非压缩方案暂不支持，如果需要支持非压缩方案，请联系米家或者提交工单
   *
   *  @since 10035
   *  @param {string} apikey    key
   *  @param {string} checkid  非数量限制客户 传nil即可 数量限制客户 传要指定设备的id
   *  @returns {Promise<bool, json>} 第一个bool代表是否调用成功 第二个参数代表返回信息
   *  json可能返回的值 
   *  {"code":0,"message":"success"}
   *  {"code":-1,"message":"register sdk failed"}
   */
  @report
  registerWithKey(apikey, checkid) {
     return 
  }
  /**
   *  创建 带状态控制的空凋控制实例
   *
   *  @since 10035
   *  @param {string} managerIdentifier    ACManager对应的唯一的key,一般是自定义的string
   *  @param {string} remoteid 遥控器id
   *  @param {json} irData 码库数据
   *  @param {array} array 用户上次使用空调保存的各种模式及模式下的状态值
   *  @returns {Promise<bool, json>} 第一个bool代表是否调用成功 第二个参数代表返回信息
   *  json可能返回的值 
   *  {"code":0,"message":"success"}
   *  {"code":-2,"message":"create manager fail"}
   *  {"code":-1,"message":"identifier cannot be null"}
   */
  @report
  createZipACManager(managerIdentifier, remoteid, irData, array) {
     return Promise.resolve(null);
  }
  /**
   *  创建 带状态控制的空凋控制实例
   *
   *  @since 10035
   *  @param {string} managerIdentifier    ACManager对应的唯一的key,一般是自定义的string
   *  @param {json} irData 码库数据
   *  @returns {Promise<bool, json>} 第一个bool代表是否调用成功 第二个参数代表返回信息
   *  json可能返回的值 
   *  {"code":0,"message":"success"}
   *  {"code":-2,"message":"create manager fail"}
   *  {"code":-1,"message":"identifier cannot be null"}
   */
  @report
  createNonACManager(managerIdentifier, irData) {
     return Promise.resolve(null);
  }
  /**
   *  移除 带状态控制的空凋控制实例 一般在退出插件时候调用
   *
   *  @since 10035
   *  @param {string} managerIdentifier    ACManager对应的唯一的key,一般是自定义的string
   *  @returns {Promise<bool, json>} 第一个bool代表是否调用成功 第二个参数代表返回信息
   *  json可能返回的值 
   *  {"code":0,"message":"success"}
   *  {"code":-1,"message":"identifier cannot be null"}
   */
  @report
  removeACManager(managerIdentifier) {
     return Promise.resolve(null);
  }
  /**
   *  判断是否可以支持 风量 风向 温度 的控制
   *
   *  @since 10035
   *  @param {string} managerIdentifier    ACManager对应的唯一的key,一般是自定义的string
   *  @param {int} type    1：风量  2：风向 3：温度
   *  @returns {Promise<bool, json>} 第一个bool代表是否调用成功
   *  json可能返回的值 :
   *  {"code":0,"message":"success","data":{"result":#bool#}}
   *  {"code":-2,"message":"input params error"}
   *  {"code":-1,"message":"identifier cannot be null"}
   *  {"code":-102,"message":"not found manager, make sure you have already called createZipACManager yet"}
   */
  @report
  canControlWithType(managerIdentifier, type = -1) {
     return Promise.resolve(null);
  }
  /**
   *  获取当前控制的指定type的值
   *  
   *  @since 10035
   *  @param {string} managerIdentifier    ACManager对应的唯一的key,一般是自定义的string
   *  @param {int} type 0：模式 1：风量  2：风向 3：温度 4：开关状态 103：扫风模式
   *                    当type=103时，ios默认不做任何控制处理，默认返回成功
   *  @returns {Promise<bool, json>} 第一个bool代表是否调用成功
   *  json可能返回的值 
   *  {"code":0,"message":"success","data":{"result":#int#}}
   *  {"code":-2,"message":"input params error"}
   *  {"code":-1,"message":"identifier cannot be null"}
   *  {"code":-102,"message":"not found manager, make sure you have already called createZipACManager yet"}
   */
  @report
  getCurrentValueWithType(managerIdentifier, type) {
     return Promise.resolve(null);
  }
  /**
   *  获取当前控制的指定type的所有的能控制的值
   *
   *  @since 10035
   *  @param {string} managerIdentifier    ACManager对应的唯一的key,一般是自定义的string
   *  @param {int} type 0：模式 1：风量  2：风向 5：遥控器参数 6：按键参数  101 获取某些状态下的缺失温度 102 获取无状态控制实例的所有按键集合
   *  @returns {Promise<bool, json>} 第一个bool代表是否调用成功
   *  json可能返回的值 
   *  {"code":0,"message":"success","data":{"result":#array#}}
   *  {"code":-2,"message":"input params error"}
   *  {"code":-1,"message":"identifier cannot be null"}
   *  {"code":-102,"message":"not found manager, make sure you have already called createZipACManager yet"}
   */
  @report
  getAllSupportValueWithType(managerIdentifier, type) {
     return Promise.resolve(null);
  }
  /**
   *  发送控制指令
   *  
   *  @since 10035
   *  @param {string} managerIdentifier    ACManager对应的唯一的key
   *  @param {int} stateValue 控制值 sdk不对该值做任何处理，直接透传回native
   *  @param {int} type 0：模式 1：风量  2：风向 3：温度 4：开关状态 103：扫风模式
   *                    当type=103时，ios默认不做任何控制处理，默认返回成功
   *  @returns {Promise<bool, json>} 第一个bool代表是否调用成功，第二个参数json代表返回具体信息
   *          值得注意的是，由于红外是无法知道执行结果的，所以调用成功不代表执行成功。
   *  json可能返回的值 
   *  {"code":0,"message":"success"}
   *  {"code":-2,"message":"input params error"}
   *  {"code":-1,"message":"identifier cannot be null"}
   *  {"code":-102,"message":"not found manager, make sure you have already called createZipACManager yet"}
   */
  @report
  changeStateValueForType(managerIdentifier, stateValue, type) {
     return Promise.resolve(null);
  }
}
const Kookoong = new IKookong();
export default Kookoong;