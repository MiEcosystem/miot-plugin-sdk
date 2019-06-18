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
  updateName(newName) {
  }
}
export default {
  /**
   * 获取所有房间列表
   * @param {boolean} [forceReload=false] 是否忽略缓存强制重新加载列表
   * @returns {Rromise<IMHRoom[]>} Promise, 带有房间列表的结果
   */
  loadAllRoom(forceReload = false) {
  },
  /**
   * 使用指定名称创建房间
   * @param {string} name 要创建的房间名
   * @returns {Rromise<IMHRoom>} Promise, 带有房间结果
   */
  createRoom(name) {
  }
}