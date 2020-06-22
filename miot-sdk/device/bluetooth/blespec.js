/**
 * @exports public
 * @doc_name ble直连spec
 * @doc_index 6
 * @doc_directory bluetooth
 * @module miot/device/bluetooth/blespec
 * @description 该模块主要用于ble直连spec相关能力，相关使用demo见com.xiaomi.bledemo.
 */
/**
 * @interface
 */
class BleSpec {
  /**
   * ble直连spec：设置property，调用前确保已连接蓝牙连接。
   * @since 10040
   * @param {string} mac 蓝牙设备的Mac地址，iOS设备传uuid
   * @param {string} json json格式：{objects[]{siid/piid/value/type}}，type是number类型：其值用来标识value的值类型，取值如下：
   * bool：0，uint8：1，int8：2，uint16：3，int16：4，uint32：5，int32：6，uint64：7，int64：8，float：9，string：10 ；
   * @example
   * import {Bluetooth} from 'miot';
   * 
   * let mac= 'aa:bb:cc:dd:ee:ff';
   * let data= {objects:[{siid:1,piid:2,value:'abc',type:10}]};
   * data = JSON.stringify(data);
   * Bluetooth.spec.setPropertiesValue(mac,data)
   *          .then(res=>console.log(JSON.stringify(res)))
   *          .catch(err=>console.log(JSON.stringify(err))
   */
  @report
  setPropertiesValue(mac, json) {
     return Promise.resolve(null);
  }
  /**
   * ble直连spec：读property，调用前确保已连接蓝牙连接。
   * @since 10040
   * @param {string} mac 蓝牙设备的Mac地址，iOS设备传uuid
   * @param {string} json json格式：{objects[]{siid/piid}}
   * @example
   * 
   * import {Bluetooth} from 'miot';
   * 
   * let mac= 'aa:bb:cc:dd:ee:ff';
   * let data= {objects:[{siid:1,piid:2}]};
   * data = JSON.stringify(data);
   * Bluetooth.spec.getPropertiesValue(mac,data)
   *          .then(res=>console.log(JSON.stringify(res)))
   *          .catch(err=>console.log(JSON.stringify(err))
   */
  @report
  getPropertiesValue(mac, json) {
     return Promise.resolve(null);
  }
  /**
   * ble直连spec：doAction，调用前确保已连接蓝牙连接。
   * @since 10040
   * @param {string} mac 蓝牙设备的Mac地址，iOS设备传uuid
   * @param {string} json json格式：{siid,aiid,objects[]{piid/value/type} }，type是number类型：其值用来标识value的值类型，取值如下：
   * bool：0，uint8：1，int8：2，uint16：3，int16：4，uint32：5，int32：6，uint64：7，int64：8，float：9，string：10 ；
   * @example
   * import {Bluetooth} from 'miot';
   * 
   * let mac= 'aa:bb:cc:dd:ee:ff';
   * let data= {siid:1,aiid:2,objects:[{piid:2,value:'abc',type:10}]};
   * data = JSON.stringify(data);
   * Bluetooth.spec.doAction(mac,data)
   *          .then(res=>console.log(JSON.stringify(res)))
   *          .catch(err=>console.log(JSON.stringify(err))
   */
  @report
  doAction(mac, json) {
     return Promise.resolve(null);
  }
}
const BleSpecInstance = new BleSpec();
export default BleSpecInstance;