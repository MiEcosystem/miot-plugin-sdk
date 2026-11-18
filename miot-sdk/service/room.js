/**
 * @export public
 * @doc_name 房间模块
 * @doc_index 8
 * @doc_directory service
 * @module miot/service/Room
 * @description
 * 家庭房间管理是指对米家APP中“米家 tab”页面的房间进行管理，主要包括房间信息的获取、增加和修改。
 * 开发者需要注意的是由于该系列API会影响到米家APP的用户体验，因此做了权限的控制，
 * 如果开发者有使用该系列API的需求， 需要与SDK开发人员进行沟通获取权限。
 * 对于家庭房间管理模块，目前我们提供能力主要在于信息的获取、增加和修改，细分具体如下:
 * 1、获取所有房间列表信息  2、创建（新增）房间  3、修改房间名称
 * @example
 * import { Service } from "miot";
 * Service.room.loadAllRoom(true).then((rooms)=>{
 *   console.log(rooms)
 * }).catch((error)=>{
 *  console.log(error)
 * })
 *
 */
/**
 * 房间
 * @interface
 */
export class IMHRoom {
  /**
   * 房间所属的家庭ID
   */
  get homeID() {
     return  0
  }
  /**
   * 房间ID
   */
  get roomID() {
     return  0
  }
  /**
   * 房间名称
   */
  get name() {
     return  0
  }
  /**
   * 房间的分享标识
   */
  get shareFlag() {
     return  0
  }
  /**
   * 房间支持的设备did列表，目前只有小爱音箱有权限
   */
  get didList() {
     return  []
  }
  /**
   * 更新房间名称
   * @since 10020
   * @param newName 新的房间名称
   * @returns {Promise<unknown>}
   * 成功时：{"code":0, "data":'update success'}
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  updateName(newName) {
  }
}
/**
 * @export
 */
class IMiotRoom {
  /**
   * 获取当前家庭所有房间列表
   * @since 10020
   * @param {boolean} [forceReload=false] 是否从强制从网络获取；  false:表示从缓存获取  true：从网络获取； 默认为false
   * @returns {Rromise<IMHRoom[]>} Promise, 带有房间列表的结果, IMHRoom的数据结构参考IMHRoom类
   * 成功时：[{IMHRoom},...]
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  loadAllRoom(forceReload = false) {
  }
  /**
   * 使用指定名称创建房间
   * @since 10020
   * @param {string} name 要创建的房间名
   * @returns {Rromise<IMHRoom>} Promise, 带有房间结果,  IMHRoom的数据结构参考IMHRoom类
   * 成功时：{IMHRoom}
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  createRoom(name) {
  }
  /**
   * 多用于多键开关获取其按键所在的房间名称，通过getMultiSwitchName接口拿到roomId，再通过此接口获取房间名称
   * @since 10061
   * @param {array} roomIds 要获取的房间名称的ids
   * @returns {Promise<array>}
   * 成功时：返回数组[roomName1, roomName2, ...]
   * 失败时：[]
   * @example 
   * Service.smarthome.getMultiSwitchName(Device.deviceID).then(res => {
   *  if (res) {
   *    console.log('getMultiSwitchName: ' + JSON.stringify(res));
   *    let roomIds = Object.keys(res).map(obj => (res[obj].room_id));
   *    Service.room.getRoomNames(roomIds).then(res => {
   *      if (res) {
   *        ...
   *        console.log('getRoomNames: ' + JSON.stringify(res));
   *      }
   *    }).catch(err => {
   *      console.log('getRoomNames: ' + JSON.stringify(err));
   *    })
   *  }
   * }).catch(err => {
   *  console.log('getMultiSwitchName: ' + JSON.stringify(err));
   * })
   */
  @report
  getRoomNames(roomIds) {
  }
  /**
   * 将设备移动到当前家庭下已存在的房间，并刷新米家首页设备列表。
   * 仅做移动，不创建房间、不修改房间名；设备从原房间移出由服务端自动完成，无需传入原房间。
   * 多键开关拆键后每个按键是独立设备，可用该接口单独调整按键所在房间。
   * @since 10120
   * @param {string} roomId 目标房间ID，必须是当前家庭下已存在的房间
   * @param {array} [dids] 要移动的设备did列表，缺省为当前设备
   * @returns {Promise}
   * 成功时：{"code":0, "data":xxx}
   * 失败时：{"code":xxx, "message":"xxx" }
   * @example
   * import { Service } from 'miot';
   * Service.room.moveDevicesToRoom('500001090363').then(() => {
   *   console.log('move success');
   * }).catch((error) => {
   *   console.log(error);
   * })
   */
  @report
  moveDevicesToRoom(roomId, dids) {
  }
}
const MiotRoomInstance = new IMiotRoom();
export default MiotRoomInstance;