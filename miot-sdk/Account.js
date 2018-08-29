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

import native from "./native";
import {Properties} from './native'

/**
 * @interface
 *
 * @expo interface
 */
class IAccount{

    /**
     * 用户详情是否已经加载
     * @type {boolean}
     * @readonly
     * 
     * @expo get
     */
    get isLoaded(){
        return Properties.of(this).isLoaded;
    }

  /**
   * 当前登录账户 userid
   * @type {string}
    * @readonly
    * 
    * @expo get
   */
    get ID(){
        //加密? md5?
        return Properties.of(this).id;
    }

  /**
   * 当前登录账户 用户昵称
   * @type {string}
     * @readonly
     * 
     * @expo get
   */
    get nickName(){
        return Properties.of(this).nickName;
    }

  /**
   * 当前登录账户 用户头像的下载地址
   * @type {string}
     * @readonly
     * 
     * @expo get
   */
    get avatarURL(){
        return Properties.of(this).avatarURL;
    }
 
  /**
   * 当前登录账户 用户生日
   * @type {string}
     * @readonly
     * 
     * @expo get
   */
    get birth(){
        return Properties.of(this).birth;
    }

  /**
   * 当前登录账户 用户邮箱
   * @type {string}
     * @readonly
     * 
     * @expo get
   */
    get email(){
        return Properties.of(this).email;
    }

  /**
   * 当前登录账户 用户电话
   * @type {string}
     * @readonly
     * 
     * @expo get
   */
    get phone(){
        return Properties.of(this).phone;
    }

  /**
   * 当前登录账户 用户性别
   * @type {string}
     * @readonly
     * 
     * @expo get
   */
    get sex(){
        return Properties.of(this).sex;
    }

  /**
   * 当前登录账户 用户分享时间
   * @type {string}
     * @readonly
     * 
     * @expo get
   */
    get shareTime(){
        return Properties.of(this).shareTime;
    }

  /**
   * 加载用户信息，回调方法中会返回时才有用户信息
   * @method
   * @param {boolean} force 强制刷新缓存，加载米家服务器的用户信息
   * @return {Promise<IAccount>} 
   *
   * @mark andr done
   *  
   * @expo method
   */
    load(force=false){
        const detail = Properties.of(this);
        if(!force && detail.isLoaded){
            return Promise.resolve(this);
        }

        return new Promise((resolve, reject)=>{

            native.MIOTService.loadAccountInfo(detail.id,
                (status, resp)=>{
                    if(status) {
                        Properties.init(this, {...resp, isLoaded:true});
                        resolve(this)
                    } else {
                        reject({ok:false, message:""})
                    }
                })
        });
    }

}

/**
 * @expo default
 */
export default IAccount;
