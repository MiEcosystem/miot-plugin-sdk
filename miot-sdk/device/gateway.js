export default class IDeviceGateWay {
  /**
   * 获取设备ID，same as Device.deviceID
   * @since 10020
   */
  get deviceID() {
     return  ""
  }
  /**
   * 获取子设备列表
   * @since 10020
   * @returns Promise
   */
  getSubDevices() {
     return Promise.resolve([]);
  }
  /**
   * 获取支持连接的model列表
   */
  supportModelToConnect() {
  }
  /**
   * 获取蓝牙网关关联的普通蓝牙和蓝牙mesh设备列表。
   * @param {string} [did=Device.deviceID] 蓝牙网关的did，可以为空，为空时默认取当前的Device.deviceID
   * @returns {Promise} 返回数组设备信息的promise， {"mesh":[], "normal":""}
   */
  getLinkedBTDevices(did = null) {
     return Promise.resolve([]);
  }
}