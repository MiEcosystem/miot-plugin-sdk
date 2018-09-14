/**
 * @export
 * @module miot/Account
 * @description IAccount 类, 插件并不能直接创建此类
 *      调用Service.account.load().then((info)=>{info 中各个字段才有值}}）)， 除用户的 id：Service.account.ID，不能直接获取其他字段
 * @example
 *   import {Service} from 'miot'
 *   console.log(Service.account.ID)
 *   Service.account.load().then(account=>{
 *      console.log(Service.account.nickName)
 *   })
 *
 *
 *
 *
 *
 */
/**
 * @interface 
 */
class IAccount{
    /**
     * 用户详情是否已经加载
     * @type {boolean}
     * @readonly
     *  
     */
    get isLoaded(){
         return  false
    }
  /**
   * 当前登录账户 userid
   * @type {string}
   * @readonly 
   */
    get ID(){
         return  0
    }
  /**
   * 当前登录账户 用户昵称
   * @type {string}
   * @readonly 
   */
    get nickName(){
         return  ""
    }
  /**
   * 当前登录账户 用户头像的下载地址
   * @type {string}
   * @readonly 
   */
    get avatarURL(){
         return  ""
    }
 
  /**
   * 当前登录账户 用户生日
   * @type {string}
   * @readonly 
   */
    get birth(){
         return  "..."
    }
  /**
   * 当前登录账户 用户邮箱
   * @type {string}
   * @readonly 
   */
    get email(){
         return  "..."
    }
  /**
   * 当前登录账户 用户电话
   * @type {string}
   * @readonly 
   */
    get phone(){
         return  ""
    }
  /**
   * 当前登录账户 用户性别
   * @type {string}
   * @readonly 
   */
    get sex(){
         return  ""
    }
  /**
   * 当前登录账户 用户分享时间
   * @type {string}
   * @readonly 
   */
    get shareTime(){
         return  ""
    }
  /**
   * 加载用户信息，回调方法中会返回时才有用户信息
   * @method
   * @param {boolean} force 强制刷新缓存，加载米家服务器的用户信息
   * @return {Promise<IAccount>}  
   * 
   */
    load(force=false){
         return Promise.resolve(this);
    }
}
export default IAccount;