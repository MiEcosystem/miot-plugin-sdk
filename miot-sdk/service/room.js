//@native begin
import native, { Properties } from "../native";
//@native end
export class IMHRoom {
  /**
   * 房间所属的家庭ID
   */
  get homeID() {
    //@native => 0
    return Properties.of(this).homeId;
  }
  /**
   * 房间ID
   */
  get roomID() {
    //@native => 0
    return Properties.of(this).roomId;
  }
  /**
   * 房间名称
   */
  get name() {
    //@native => 0
    return Properties.of(this).name;
  }
  /**
   * 房间的分享标识
   */
  get shareFlag() {
    //@native => 0
    return Properties.of(this).shareFlag;
  }
  updateName(newName) {
    //@native begin
    let json = Properties.of(this);
    let forkJson = { ...json };
    forkJson.name = newName;
    console.log('change room', forkJson)
    return new Promise((resolve, reject) => {
      native.MHRoom.editRoom(forkJson, (suc, res) => {
        if (suc) {
          json.name = newName;
          resolve("success");
        } else {
          reject({ code: -1, error: res, 'message': "update failed" })
        }
      })
    })
    //@native end
  }
}
//@native
var cachedRooms;
export default {
  /**
   * 获取所有房间列表
   * @param {boolean} [forceReload=false] 是否忽略缓存强制重新加载列表
   * @returns {Rromise<IMHRoom[]>} Promise, 带有房间列表的结果
   */
  loadAllRoom(forceReload = false) {
    //@native begin
    console.log("loadAllRoom", native.MHRoom)
    if (cachedRooms && !forceReload) {
      return new Promise.resolve(cachedRooms);
    }
    console.log("loadAllRoom", native.MHRoom)
    return new Promise((resolve, reject) => {
      native.MHRoom.getRoomList((suc, res) => {
        if (suc) {
          if (res) {
            cachedRooms = res.map((item) => {
              return (Properties.init(new IMHRoom(), { ...item }));
            })
            resolve(cachedRooms);
          } else {
            resolve([]);
          }
        } else {
          reject({ code: 401, message: '当前设备没有权限操作房间功能' })
        }
      });
    });
    //@native end
  },
  /**
   * 使用指定名称创建房间
   * @param {string} name 要创建的房间名
   * @returns {Rromise<IMHRoom>} Promise, 带有房间结果
   */
  createRoom(name) {
    //@native begin
    if (!name) {
      return new Promise.reject({ code: -2, message: '房间名称不能为空' })
    }
    if (typeof name !== "string") {
      return new Promise.reject({ code: -3, message: '房间名称必须是字符串' })
    }
    return new Promise((resolve, reject) => {
      native.MHRoom.addNewRoomWithName(name, (suc, res) => {
        if (suc) {
          if (res) {
            let newRoom = Properties.init(new IMHRoom(), { ...res })
            if (cachedRooms) { cachedRooms.push(newRoom) }
            resolve(newRoom);
          } else {
            reject({ code: 404, message: '未知错误', error: res })
          }
        } else {
          reject({ code: -1, message: '操作失败', error: res })
        }
      })
    })
    //@native end
  }
}