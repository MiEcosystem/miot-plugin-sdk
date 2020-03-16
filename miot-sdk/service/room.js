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
//@native begin
import native, { Properties } from '../native';
import {report} from "../decorator/ReportDecorator";
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
    //@native begin
    const json = Properties.of(this);
    const forkJson = { ...json };
    forkJson.name = newName;
    return new Promise((resolve, reject) => {
      native.MHRoom.editRoom(forkJson, (suc, res) => {
        if (suc) {
          json.name = newName;
          resolve({ code: 0, data: 'update success' });
        }
        else {
          reject({ code: -1, message: res });
        }
      });
    });
    //@native end
  }
}
//@native
let cachedRooms;
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
    //@native begin
    if (cachedRooms && !forceReload) {
      return new Promise.resolve(cachedRooms);
    }
    return new Promise((resolve, reject) => {
      native.MHRoom.getRoomList((suc, res) => {
        if (suc) {
          if (res) {
            cachedRooms = res.map(item => (Properties.init(new IMHRoom(), { ...item })));
            resolve(cachedRooms);
          }
          else {
            resolve([]);
          }
        }
        else {
          reject({ code: 401, message: '当前设备没有权限操作房间功能' });
        }
      });
    });
    //@native end
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
    //@native begin
    if (!name) {
      return new Promise.reject({ code: -2, message: '房间名称不能为空' });
    }
    if (typeof name !== 'string') {
      return new Promise.reject({ code: -3, message: '房间名称必须是字符串' });
    }
    return new Promise((resolve, reject) => {
      native.MHRoom.addNewRoomWithName(name, (suc, res) => {
        if (suc) {
          if (res) {
            const newRoom = Properties.init(new IMHRoom(), { ...res });
            if (cachedRooms) {
              cachedRooms.push(newRoom);
            }
            resolve(newRoom);
          } else {
            reject({ code: 404, message: res });
          }
        } else {
          reject({ code: -1, message: res });
        }
      });
    });
    //@native end
  }
};
const MiotRoomInstance = new IMiotRoom();
export default MiotRoomInstance;