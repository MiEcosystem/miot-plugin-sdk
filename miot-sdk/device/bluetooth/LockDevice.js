/**
 * @export public
 * @doc_name 蓝牙锁模块
 * @doc_index 3
 * @doc_directory bluetooth
 * @module miot/device/bluetooth
 * @description 蓝牙锁操作类
 * 蓝牙锁的开发，详见：https://iot.mi.com/new/doc/05-%E7%B1%B3%E5%AE%B6%E6%89%A9%E5%B1%95%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/04-%E8%AE%BE%E5%A4%87%E7%AE%A1%E7%90%86/03-%E6%8C%89%E8%AE%BE%E5%A4%87/02-%E8%93%9D%E7%89%99%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/02-%E8%93%9D%E7%89%99%E8%AE%BE%E5%A4%87%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97.html 中的蓝牙锁部分。  
 * 本文件主要提供了蓝牙锁的开关锁，蓝牙锁密钥的分享，获取一次性开锁密钥，锁相关数据加解密等功能
 * 
 * @example
 *
 *  import {Bluetooth} from 'miot/device/bluetooth'
 *
 * ...
 *  Bluetooth.createBluetoothLE(...).connect(...).then(device => {
        device.securityLock().toggle(0,5000)
       .then(lock => {console.log('toggle success')})
       .catch(err => {console.log('toggle failed'})
    })
 *  Bluetooth.createBluetoothLE(...).securityLock().encryptMessage('message')
    .then(msg => {console.log('encrypted message is ', msg)})
    .catch(err => {console.log('encrypted message failed, ', err})
    Bluetooth.createBluetoothLE(...).securityLock().encryptMessage('decryptedMessage')
    .then(msg => {console.log('decrypt message is ', msg)})
    .catch(err => {console.log('decrypt message failed, ', err})
 * ...
 *
 */
import native, { Properties } from '../../native';
import { report } from "../../decorator/ReportDecorator";
/**
 * 蓝牙锁相关
 * @interface
 *
 */
export default class IBluetoothLock {
    /**
     * 支持小米加密芯片的蓝牙设备，开关蓝牙锁
     * @method
     * @param {int} cmd 操作命令可传入 0 ，1 ，2三个 int 值，分别代表 开锁，上锁，反锁
     * @param {int} timeout 毫秒 蓝牙未响应的超时时间
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).connect(...).then(device => {
     *  device.securityLock.toggle(0,5000)
     *      .then(lock => {console.log('toggle success')})
     *      .catch(err => {console.log('toggle failed'})
     * })
     * ...
     * @returns {Promise<IBluetoothLock>}
     *      resolve：hex string
     *      reject：{code: xxx, message: xxx} 1：设备正在切换中 2：加密失败 3：找不到服务 4：超时
     */
    @report
  toggle(cmd, timeout) {
     return Promise.resolve(null);
  }
    /**
     * 支持小米加密芯片的蓝牙设备，在被分享的设备中，调用此方法，可判断分享的电子钥匙是否有效。**设备owner调用此方法会走reject**
     * @method
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).securityLock.isShareKeyValid()
     *  .then(lock => {console.log('ShareKey is valid')})
     *  .catch(err => {console.log('ShareKey isn't valid'})
     * ...
     * @returns {Promise}
     *      resolve：null
     *      reject：null
     */
    @report
    isShareKeyValid() {
       return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，获取一次性密码组。 **设备owner调用此方法才有效**
     * 假设输入 interval 为 30，则会从当日 0 点开始计算，每 30 分钟为一个刷新间隔。生成的密码在当前刷新间隔及下一个刷新间隔内有效。
     * 如当日 10:19 生成，则该组密码在 10:00 ~ 10:30（当前刷新间隔） 以及 10:30 ~ 11:00 (下一个刷新间隔) 有效。
     * 密码组中每条密码使用一次即过期。
     * 注意设备上获取当前时间（UTC，精度为秒）的准确性由设备保证，否则会有计算误差。
     * @method
     * @param {int} interval 时间间隔，单位为分钟，类型为 number，传入 10 到 60 的整数（建议用整数10，20，30，40，50，60）
     * @param {int} digits 密码位数，类型为 number，传入 6 到 8 的整数
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).securityLock.getOneTimePassword(30,6)
     *  .then(pwd => {console.log('one time password is ', pwd)})
     *  .catch(err => {console.log('get one time password failed, ', err})
     * ...
     * @returns {Promise<int[]>}
     *      resolve：int[8],意思是生成8个一次性密码，每个密码的长度等于digits。比如 [123456,234567,....]
     *      reject：{code: xxx, message:xxx} 1:设备owner才可调用  2:参数不正确  3:生成的密码长度不对  4:网络错误
     */
    @report
    getOneTimePassword(interval, digits) {
       return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，使用此方法将明文加密为密文后，可发送给设备。然后小米加密芯片会解密，设备端可以直接拿到解密后的数据。
     * @method
     * @param {string} message 明文
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).securityLock.encryptMessage('message')
     *  .then(msg => {console.log('encrypted message is ', msg)})
     *  .catch(err => {console.log('encrypted message failed, ', err})
     * ...
     * @returns {Promise<string>}
     *      resolve: 加密后的string
     *      reject：{code: xxx, message: xxx} 1:必须是16进制字符串  2:设备未绑定  3:加密出错  
     */
    @report
    encryptMessage(message) {
       return Promise.resolve(null);
    }
    /**
     * 支持小米加密芯片的蓝牙设备，使用此方法将密文解密为明文
     * @method
     * @param {string} encrypted 密文
     * @example
     * import {Bluetooth} from 'miot'
     * ...
     * Bluetooth.createBluetoothLE(...).securityLock.decryptMessage('decryptedMessage')
     *  .then(msg => {console.log('decrypt message is ', msg)})
     *  .catch(err => {console.log('decrypt message failed, ', err})
     * ...
     * @returns {Promise<string>}
     *      resolve：解密后的string
     *      reject：{code: xxx, message: xxx}  1:必须是16进制字符串  2:设备未绑定 3:解密出错
     */
    @report
    decryptMessage(encrypted) {
       return Promise.resolve(null);
    }
    /**
     * 使用设备的token加密指定数据
     * @since 10004
     * @param {string} data Hex Data String
     * @return {Promise<json>}
     *      resolve：{"result": :"encripted string"} result字段即为加密后的string
     *      reject：{code: xxx, message: xxx} 1:必须16进制字符串  2:获取device token 失败  3:加密失败
     */
    @report
    encryptMessageWithToken(data) {
       return Promise.resolve(null);
    }
    /**
     * 使用设备的token解密指定数据
     * @since 10004
     * @param {strng} data Hex Data String
     * @return {Promise<json>}
     *      resolve：{"result": :"encripted string"} result字段即为解密后的string
     *      reject：{code: xxx, message: xxx} 1:必须16进制字符串  2:获取device token 失败  3:解密失败
     */
    @report
    decryptMessageWithToken(data) {
       return Promise.resolve(null);
    }
}