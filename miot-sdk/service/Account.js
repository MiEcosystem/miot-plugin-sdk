/**
 * @export public
 * @doc_name 账户模块
 * @doc_index 9
 * @doc_directory service
 * @module miot/service/Account
 * @description
 * 用于获取当前用户信息,通过Service.account获取当前用户对象实例。
 * 其中Service.account.ID可直接使用，其余属性需要使用Service.account.load().then()来进行获取，可参考下方Example。
 * 具体的可用属性与方法请参考Interface -> IAccount类API说明。
 * IAccount不支持直接创建使用，如需使用请调用：
 * Service.account.load().then((info)=>{info 中各个字段才有值}}）)
 * @example
 * import {Service} from 'miot'
 * console.log(Service.account.ID)
 * Service.account.load().then(account=>{
 *  console.log(Service.account.nickName)
 * })
 *
 */
import { report } from '../decorator/ReportDecorator';
/**
 * @interface
 * @description
 * 用户信息属性与方法说明
 * @example
 * import {Service} from 'miot'
 * ...
 * console.log(Service.account.ID)
 * if (Service.account.isLoaded) {
 *  console.log(Service.account.nickName)
 * }else {
 *  Service.account.load().then(account=>{
 *      console.log(Service.account.nickName)
 *      ...
 *  })
 * }
 * ...
 */
class IAccount {
  /**
   * 用户详情是否已经加载,不依赖于load方法。
   * 如果已加载则所有属性可直接使用。
   * @type {boolean}
   * @readonly
   *
   */
  get isLoaded() {
     return  false
  }
  /**
   * 当前登录账户userid,不依赖于load方法
   * @type {string}
   * @readonly
   */
  get ID() {
     return  0
  }
  /**
   *  用户昵称,依赖于load方法
   * @type {string}
   * @readonly
   */
  get nickName() {
     return  ""
  }
  /**
   *  用户头像的下载地址,依赖于load方法
   * @type {string}
   * @readonly
   */
  get avatarURL() {
     return  ""
  }
  /**
   *  用户生日,依赖于load方法
   * @type {string}
   * @readonly
   */
  get birth() {
     return  "..."
  }
  /**
   *  用户邮箱,依赖于load方法
   * @type {string}
   * @readonly
   */
  get email() {
     return  "..."
  }
  /**
   *  用户电话,依赖于load方法
   * @type {string}
   * @readonly
   */
  get phone() {
     return  ""
  }
  /**
   *  用户性别,依赖于load方法
   * @type {string}
   * @readonly
   */
  get sex() {
     return  ""
  }
  /**
   *  用户分享时间,依赖于load方法
   * @type {string}
   * @readonly
   */
  get shareTime() {
     return  ""
  }
  /**
   * 加载用户信息，所有依赖于load的用户信息需要在回调方法中会返回时才有值
   * @method
   * @param {boolean} force 是否从网络获取信息， true:表示从网络进行获取数据  false：表示从缓存获取数据; 默认为false
   * @return {Promise<IAccount>}
   * 成功时：{IAccount}  可以查看 IAccount 类(位于Account.js中)具体信息
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  load(force = false) {
     return Promise.resolve(this);
  }
  /**
   * 获取指定某一账号id的信息
   * @since 10032
   * @param accountId  账号id 或 手机号
   * @returns {Promise<unknown>}
   * 成功时：{IAccount}  可以查看 IAccount 类(位于Account.js中)具体信息
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  getAccountInfoById(accountId) {
     return Promise.resolve({});
  }
  /**
   * 批量获取账号信息
   * @since 10032
   * @param {Array<string>} ids  数组，仅支持账号id，不支持手机号查询
   * @returns {Promise<object[]>}  账号信息列表(数组结构)
   * 成功时：[{ID:xxx, avatarURL: {size_75:xxx,size_90:xxx,...}, icon:xxx, nickName:xxx, userName:xxx}, ...]
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  getAccountInfoList(ids) {
     return Promise.resolve(null);
  }
}
export default IAccount;