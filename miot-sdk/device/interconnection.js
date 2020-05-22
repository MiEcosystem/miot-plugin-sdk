/**
 * 获取支持的设备列表
 * @since 10039
 * @param {string} category 关联能力标识，在appConfig 文件中配置，比如sensor_ht，默认为全部
 * @param {string} sameRoom 是否过滤为与该设备同一个房间，默认为false
 * @return {Promise<Array>} [{model, mac, did, pdid, category, device, homeId, roomId, roomName}]
 */
export function getSupportedDevices(category, sameRoom) {
}
/**
 * 扫描并监听扫描结果
 * @since 10039
 * @param {object} params 参数
 * @param {array} params.list [{mac, pdid}] 要扫描的设备列表，为空则扫描appConfig 中配置的全部可支持设备
 * @param {number} params.timeout 扫描时间，单位为秒，默认为10
 * @param {string} params.category 关联能力标识，在appConfig 文件中配置，比如sensor_ht，默认为全部
 * @param {bool} params.sameRoom 是否过滤为与该设备同一个房间，默认为false
 * @param {function} fn 扫描后的回调，参数是扫描结果列表[{mac, pdid, rssi}]，rssi <= -127 则表示扫描失败，一般认为超过-90 则信号较弱
 * @param {function} onfail 扫描失败
 * @return {object} {remove} 提供remove 方法移除监听（比如componentWillUnmount 时），避免内存泄漏
 */
export function scan({ list = [], timeout, category, sameRoom } = {}, fn, onfail) {
}
/**
 * 获取关联信息
 * @since 10039
 * @param {string} mac 目标设备的mac，不填则为全部
 * @return {Promise<Array>} [{mac, pdid, enabled}]
 */
export function getLinkage(mac) {
}
/**
 * 获取支持的设备列表及对应关联信息
 * @since 10039
 * @param {string} category 关联能力标识，在appConfig 文件中配置，比如sensor_ht，默认为全部
 * @param {bool} sameRoom 是否过滤为与该设备同一个房间，默认为false
 * @return {Promise<Array>} [{model, mac, did, pdid, category, device, homeId, roomId, roomName, enabled, linked}]
 */
export function getSupportedDevicesWithLinkage(category, sameRoom) {
}
/**
 * 增加关联
 * @since 10039
 * @param {string} mac 要关联的设备mac
 * @param {string} intvl 数据上报频率，单位为妙，默认为10
 * @return {Promise<void>}
 */
export function addLinkage(mac, intvl = 10) {
}
/**
 * 删除关联
 * @since 10039
 * @param {string} mac 要删除关联的设备mac，不填则为全部
 * @return {Promise<void>}
 */
export function removeLinkage(mac) {
}
/**
 * 关联开关
 * @since 10039
 * @param {string} mac 要设置开关的设备mac，不填则为全部
 * @param {bool} enabled 开启还是关闭
 * @return {Promise<void>}
 */
export function setEnable(mac, enabled) {
}
// 统一导出
export default {
  getSupportedDevices, scan, getLinkage, getSupportedDevicesWithLinkage, addLinkage, removeLinkage, setEnable
};