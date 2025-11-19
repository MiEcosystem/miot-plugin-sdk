export default HealthInstance;
declare const HealthInstance: IHealth;
/**
 * 健康app相关
 * @interface
 *
 */
export declare class IHealth {
  /**
     * @since 10078
     * 请求与系统健康App交互的权限
     * @param {jsonObject} params 传递的jsonObject对象参数
     * @example
     * let params={
     *  readObjTypes: ['BodyMass','LeanBodyMass','BodyMassIndex','BodyFatPercentage','JumpRope']从苹果健康读取数据 array类型 //数据含义依次对应：体重|去脂体重|身高体重指数|体脂率|跳绳
     *  writeObjTypes: ||写入数据到苹果健康 数据类型以及参数值同readObjTypes
     * }
     * System.health.requestHealthAuthorization(params);
     *  * @returns {object} 成功时，返回：
     * { code: 0,
     *   data: true
     * }
     * 失败时，返回：透传
     * { code: xx, message: 'xx' }
     */
  requestHealthAuthorization(params: jsonObject): object;
  /**
     * @since 10078
     * 获取健康类型的权限
     * @param {jsonObject} params 传递的jsonObject对象参数
     * @example
     * let params={
     *  authObjType: 'BodyMass' ｜string类型 具体参数值可参考requestHealthAuthorization API参数authObjTypes定义
     * }
     * System.health.getHealthAuthorizationStatus(params);
     *  * @returns {object} 成功时，返回：
     * { code: 0,
     *    data: {
     *     authStatus: xx | int类型 0:没有请求过权限 1:用户主动关闭了权限 2:权限开启
     *    }
     * }
     * 失败时，返回：透传
     * { code: xx, message: 'xx' }
     */
  getHealthAuthorizationStatus(params: jsonObject): object;
  /**
     * @since 10078
     * 同步数据到健康App
     * @param {jsonObject} params 传递的jsonObject对象参数
     * @example
     * let params={
     *  authObjType: 'BodyMass' ｜string类型 具体参数值可参考requestHealthAuthorization API参数authObjTypes定义
     *  objValue:xx    | double类型 体重(g)|去脂体重(g)|身高体重指数(count)|体脂率(0.0 - 1.0)
     *  startTime: xx，| 以秒为单位的时间戳
     *  endTime: xx    |以秒为单位的时间戳
     *  duration:xx    |timeInterval类型 时长 不传默认是结束和开始时间差
     *  energyBurned:xx |double类型 消耗的卡路里 单位卡
     *  titleForNumOfJRope:xx |string类型 跳绳次数的title 跳绳体能训练专用
     *  numOfJRope:xx  |long类型 跳绳次数 跳绳体能训练专用
     * }
     * System.health.getHealthAuthorizationStatus(params);
     *  * @returns {object} 成功时，返回：
     * { code: 0,
     *    data: true
     * }
     * 失败时，返回：透传
     * { code: xx, message: 'xx' }
     */
  writeDataToHealthApp(params: jsonObject): object;
}