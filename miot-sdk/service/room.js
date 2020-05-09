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
   * 获取所有房间列表
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
}
const MiotRoomInstance = new IMiotRoom();
export default MiotRoomInstance;