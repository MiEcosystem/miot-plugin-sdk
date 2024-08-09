/**
 * @export public
 * @doc_name 手机蓝牙模块
 * @doc_index 14
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机蓝牙
 *
 * @example
 * import {System} from "miot"
 * ...
 * System.bluetooth.startAdvertising(params);
 * ...
 */
import native from "../native";
/**
 * 蓝牙
 * @interface
 *
 */
class IBluetooth {
  /**
   * 开启蓝牙广播
   * @param {*} params 格式如下
   *  {
        serviceUUIDs: ["xxxxxxxx-yyyy-zzzz-aaaa-bbbbbbbbbbbb"],  // Android 最多多只能有1个，多个系统会报错； iOS 表示该 uuid 的 service 在前台时不在overflow区(不用明确标识也能被搜索到)(后台时还是会被放到overflow区)
        localName: "xxx",   // iOS 在后台时，local name 不可见
        timeout: 10, // 时间长度，到时自动关闭
        services: [   // 注意，由于 iOS 广播时长默认 30ms, 过多的service将不能及时发送，建议控制在 2 个以内
            {
                uuid: 'xxxxxxxx-yyyy-zzzz-aaaa-bbbbbbbbbbbb',   // service uuid 注意格式
                primary: true,  // 主service
                characteristics: [
                    {
                      uuid: 'xxxxxxxx-yyyy-zzzz-aaaa-bbbbbbbbbbbb'  // characteristic uuid
                    }
                ]
            }
        ]
      }
   */
  @report
  startAdvertising(params) {
  }
}
const BluetoothInstance = new IBluetooth();
export default BluetoothInstance;