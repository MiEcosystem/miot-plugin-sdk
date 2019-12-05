/**
 * @export public
 * @doc_name 账户模块
 * @doc_index 4
 * @doc_directory sdk
 * @module miot/Account
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
import native, { Properties } from './native';
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
     * @param {boolean} force 强制刷新缓存，加载米家服务器的用户信息
     * @return {Promise<IAccount>}  
     * 
     */
    load(force = false) {
        //@native :=> Promise.resolve(this);
        //@mark andr done
        const detail = Properties.of(this);
        if (!force && detail.isLoaded) {
            return Promise.resolve(this);
        }
        return new Promise((resolve, reject) => {
            native.MIOTService.loadAccountInfo(detail.id,
                (status, resp) => {
                    if (status) {
                        if (!resp.nickName || resp.nickName == '') {
                            resp.nickName = detail.nickName || "";
                        }
                        Properties.init(this, {
                            ...resp, isLoaded: true,
                            id: detail.id
                        });
                        resolve(this)
                    } else {
                        reject({ ok: false, message: "" })
                    }
                })
        });
        //@native end
    }
}
export default IAccount;