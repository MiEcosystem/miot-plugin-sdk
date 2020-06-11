/**
 * @export public
 * @doc_name 报警电话设置模块
 * @doc_index 9
 * @since 10040
 * @doc_directory service
 * @module miot/service/alarmPhone
 * @description 针对门锁或传感器 设置报警电话逻辑
 * @example
 * import { Service } from "miot";
 * Service.alarmPhone.addNewAlarmPhone('break_lock_alarm', Device.deviceID, 'miot', '13888888888').then((res) => {
 *   if (res && res.code == 0 && res.result.info_id) {
 *       alert('resolve success! ' + JSON.stringify(res));
 *   } else {
 *       alert('resolve fail! ' + JSON.stringify(res));
 *   }
 * }).catch((err) => {
 *   alert('reject ' + JSON.stringify(err));
 * });
 */
/**
 * 房间
 * @interface
 */
export class IAlarmPhone {
  /**
   * 新增报警电话
   * @since 10040
   * @param {string} type type包含以下几种字段
   *    break_lock_alarm  (撬锁 10040新增) 
   *    hijack_alarm      (胁迫开锁，10040新增)
   * @param {string} did  设备id
   * @param {string} name  设置姓名
   * @param {string} phone_number 设置电话
   * @returns {Promise<Object>} 新增成功服务端会下发新的 info_id 用作唯一标识，开发者需要手动绑定 info_id与新增条目的关系
   * 成功时：{"code":0,"message":"ok","result":{"info_id":<xxxxxx>}}
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  addNewAlarmPhone(type, did, name, phone_number) {
  }
  /**
   * 编辑已存在的报警电话信息
   * @since 10040
   * @param {string} type type包含以下几种字段
   *    break_lock_alarm  (撬锁 10040新增) 
   *    hijack_alarm      (胁迫开锁，10040新增)
   * @param {string} did  设备id
   * @param {string} info_id 唯一识别id
   * @param {string} name  设置姓名
   * @param {string} phone_number 设置电话
   * @returns {Promise<Object>} 修改成功服务端会下发 info_id 确认修改的条目信息
   * 成功时：{"code":0,"message":"ok","result":{"info_id":<xxxxxx>}}
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  editAlarmPhone(type, did, info_id, name, phone_number) {
  }
  /**
   * 删除已存在的报警电话信息
   * @since 10040
   * @param {string} type type包含以下几种字段
   *    break_lock_alarm  (撬锁 10040新增) 
   *    hijack_alarm      (胁迫开锁，10040新增)
   * @param {string} did  设备id
   * @param {string} info_id 唯一识别id
   * @returns {Promise<Object>} 修改成功服务端会下发 info_id 确认修改的条目信息
   * 成功时：{"code":0,"message":"ok","result":{"info_id":<xxxxxx>}}
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  deleteAlarmPhone(type, did, info_id) {
  }
  /**
   * 获取所有的已设置的报警电话信息
   * @since 10040
   * @param {array} types type包含以下几种字段 
   *  注意：此接口需要接受一个数组，如果查询多条可以使用 ["break_lock_alarm","hijack_alarm"]
   *        查询单条可以使用 ["break_lock_alarm"]
   *    break_lock_alarm  (撬锁 10040新增) 
   *    hijack_alarm      (胁迫开锁，10040新增)
   * @param {string} did  设备id
   * @returns {Promise<Object>} 查询成功会返回所有的保存的信息
   * 成功时：{"code":0,"message":"ok","result":{
   *           "break_lock_alarm":[{
   *             "info_id":"123456",
   *             "contact_name":"张三",
   *             "phone_number":"18513468888",
   *             "create_time":1589342399,
   *             "update_time":1589342399,
   *             "info_id":"testinfoid1"
   *            }],
   *            "hijack_alarm":[{
   *              "info_id":"123457",
   *              "contact_name":"张三",
   *              "phone_number":"18513468888",
   *              "create_time":1589342399,
   *              "update_time":1589342399,
   *              "info_id":"testinfoid2"
   *            }]
   *        }}
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  getAllAlarmPhone(types, did) {
  }
}
const AlarmPhoneInstance = new IAlarmPhone();
export default AlarmPhoneInstance;