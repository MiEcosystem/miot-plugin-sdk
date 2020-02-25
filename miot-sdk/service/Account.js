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
//@native
import native, { Properties } from '../native';
import {report} from '../decorator/ReportDecorator';
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
    //@native => false
    return Properties.of(this).isLoaded;
  }
  /**
   * 当前登录账户userid,不依赖于load方法
   * @type {string}
   * @readonly
   */
  get ID() {
    //@native => 0
    return Properties.of(this).id;
  }
  /**
   *  用户昵称,依赖于load方法
   * @type {string}
   * @readonly
   */
  get nickName() {
    //@native => ""
    return Properties.of(this).nickName;
  }
  /**
   *  用户头像的下载地址,依赖于load方法
   * @type {string}
   * @readonly
   */
  get avatarURL() {
    //@native => ""
    return Properties.of(this).avatarURL;
  }
  /**
   *  用户生日,依赖于load方法
   * @type {string}
   * @readonly
   */
  get birth() {
    //@native => "..."
    return Properties.of(this).birth;
  }
  /**
   *  用户邮箱,依赖于load方法
   * @type {string}
   * @readonly
   */
  get email() {
    //@native => "..."
    return Properties.of(this).email;
  }
  /**
   *  用户电话,依赖于load方法
   * @type {string}
   * @readonly
   */
  get phone() {
    //@native => ""
    return Properties.of(this).phone;
  }
  /**
   *  用户性别,依赖于load方法
   * @type {string}
   * @readonly
   */
  get sex() {
    //@native => ""
    return Properties.of(this).sex;
  }
  /**
   *  用户分享时间,依赖于load方法
   * @type {string}
   * @readonly
   */
  get shareTime() {
    //@native => ""
    return Properties.of(this).shareTime;
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
    //@native :=> Promise.resolve(this);
    //@mark andr done
    const detail = Properties.of(this);
    if (!force && detail.isLoaded) {
      return Promise.resolve(this);
    }
    return new Promise((resolve, reject) => {
      native.MIOTService.loadAccountInfo(detail.id, (isOk, resp) => {
        if (isOk) {
          if (!resp.nickName || resp.nickName === '') {
            resp.nickName = detail.nickName || '';
          }
          Properties.init(this, {
            ...resp,
            isLoaded: true,
            id: detail.id
          });
          resolve(this);
        } else {
          reject(resp);
        }
      });
    });
    //@native end
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
    //@native :=> promise {}
    return new Promise((resolve, reject) => {
      native.MIOTService.loadAccountInfo(accountId, (isOk, resp) => {
        if (isOk && resp) {
          //iOS 下获取某用户信息为直接透传，因此有时为nickname
          resolve({
            ID: resp.id || resp.currentAccountID2 || resp.userid,
            avatarURL: resp.avatarURL,
            birth: resp.birth,
            email: resp.email,
            nickName: resp.nickname || resp.nickName,
            phone: resp.phone,
            sex: resp.sex,
            shareTime: resp.shareTime,
          });
        } else {
          reject(resp);
        }
      });
    });
    //@native end
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
    //@native :=> promise
    return new Promise((resolve, reject) => {
      native.MIOTRPC.standardCall('/home/profiles', { uids: ids }, (ok, res) => {
        if (ok) {
          const accountInfos = [];
          if (res === null || res.list === null || res.list.length === 0) {
            resolve(accountInfos);
          } else {
            const len = res.list.length;
            for (let i = 0; i < len; i++) {
              accountInfos.push({
                ID: res.list[i].userId,
                avatarURL: res.list[i].avatarUrl,
                icon: res.list[i].icon,
                nickName: res.list[i].nickname,
                userName: res.list[i].userName,
              });
            }
            resolve(accountInfos);
          }
        } else {
          reject(res);
        }
      });
    });
    //@native end
  }
}
export default IAccount;