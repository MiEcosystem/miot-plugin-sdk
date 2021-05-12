/**
 * @export public
 * @doc_name 云端配置
 * @doc_index 6
 * @doc_directory service
 * @module miot/service/storage
 * @description MIOT 云端提供的暂存服务
 *
 */
import { report } from "../decorator/ReportDecorator";
/**
 * 云端配置管理
 * @interface
 *
 */
class ICloudStorage {
  /**
   * 读取米家的用户配置信息 /user/get_user_config（获取/user/set_user_config写入的用户配置）
   * @param {number} componentId 厂商APP_ID(Cloud ID)，需要向小米申请, 0 和 1 预留
   * @param {...number} keys 保存的数据索引，从0开始
   * @returns {Promise} key，value结构数据
   * @deprecated 10023开始废弃，建议使用 getThirdUserConfigsForOneKey
   * @example
   * getUserConfigs(componentId, k1,k2,k3).then(res => {...})
   */
  @report
  getUserConfigs(componentId, ...keys) {
     return Promise.resolve(null);
  }
  /**
   * 读取三方数据,该接口读取厂商的用户配置信息 /user/get_third_user_config，对应的写的接口为：set_third_user_config。
   * @param {string} model 设备Model
   * @param  {...number} keys 根据key获取配置,如果不传keys 返回用户该厂商的所有配置
   * @deprecated 10023开始废弃，建议使用getThirdUserConfigsForOneKey, 与setThirdUserConfigsForOneKey配套使用
   * @example
   * getThirdUserConfigs(model, k1,k2,k3).then(res => {...})
   */
  @report
  getThirdUserConfigs(model, ...keys) {
     return Promise.resolve(null);
  }
  /**
   * 写数据 /user/set_user_config
   * @param {string} componentId 厂商APP_ID(Cloud ID)，需要向小米申请，0和1预留
   * @param {*} data   key，value结构数据
   * @returns {Promise}
   * @deprecated 10023开始废弃，建议使用 setThirdUserConfigsForOneKey, data数据量支持分段保存
   */
  @report
  setUserConfigs(componentId, data) {
     return Promise.resolve(null);
  }
  /**
   * 写数据 /user/set_user_config， data的数据量不能超过2048字节
   * @param {string} model
   * @param {number} key
   * @param {json} data
   * @deprecated 10023开始废弃，建议使用setThirdUserConfigsForOneKey, data数据量支持分段保存
   */
  @report
  setThirdUserConfigs(model, key, data) {
     return Promise.resolve(null);
  }
  /**
   * 写数据 /user/set_user_config
   * 创建或修改设置插件自由存储空间。如果数据超过服务器设置的阈值，自动分段存储到云端。
   * 但是分段存储会占用额外的key，比如key=100时，分出的新段会存储在101,102,103...等后续相邻的key上，
   * 因此如果插件方需要存储多个key-value，建议多个key之间相差较大
   * @since 10023
   * @param {string} model
   * @param {number} key
   * @param {json} data
   * @returns {Rromise<any>} Promise
   * 成功时：true
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  setThirdUserConfigsForOneKey(model, key, data) {
     return Promise.resolve(null);
  }
  /**
   * 与setThirdUserConfigsForOneKey配套使用，会把分段的数据自动合并后返回，使得分段行为对调用者透明
   * @since 10023
   * @param model
   * @param key
   * @returns {Promise<any>}
   * 成功时：{key:xxx, data:xxx}   data 为set时的数据
   * 失败时：{"code":xxx, "message":"xxx" }
   */
  @report
  getThirdUserConfigsForOneKey(model, key) {
     return Promise.resolve(null);
  }
  /**
   * 列出云盘指定文件夹下的内容
   * @since 10054
   * @param parentId 文件夹 id
   * @param pageNo 可选 页码, 默认第一页
   * @param limit 每页最多个数
   * @returns Promise<object>
   * 成功时: {
   *          hasMore:false, // 是否有更多
   *          records:[
   *                    modifyTime: 12345       // 修改时间，时间戳
   *                    createTime: 12345       // 创建时间，时间戳
   *                    name: hello             // 名称
   *                    id: xxxx                // 元素 id
   *                    type: folder            // 元素类型 folder 或 file
   *                    parentId: abc           // 文件的父id
   *                    revision: abc           // 文件版本号
   *                    size: 123               // 文件大小
   *                    label: doc              // 文件类型 folder: 文件夹, pic: 图片, doc:文档, video:视频, audio:音频, txt:, pdf:pdf文档 ppt:文档 xlsx:表格, other:其他.
   *                    sha1: abc123
   *          ]
   *        }
   * 失败时: {
   *          code:-1,        // 错误码，非0数字
   *          message:""      // 错误信息
   *        }
   */
  @report
  listMiCloudItem(parentId, pageNo = 1, limit = 500) {
     return Promise.resolve(null);
  }
  /**
   * 重命名云盘项目
   * @since 10054
   * @param id 文件或者文件夹 id
   * @param name 新名称
   * @returns Promise
   * 成功时: {id: 原 id }
   * 失败时: 与 listMiCloudItem 相同
   */
  @report
  renameMiCloudItem(id, newName) {
     return Promise.resolve(null);
  }
  /**
   * 创建云盘文件夹
   * @since 10054
   * @param parentId 父文件夹 id, 根目录 id 是 '0'
   * @param name 指定的名称
   * @returns Promise
   * 成功时: {id: 创建的文件夹 id}
   * 失败时: 与 listMiCloudItem 相同
   */
  @report
  createMiCloudFolder(parentId, name) {
     return Promise.resolve(null);
  }
  /**
   * 上传文件到小米云盘指定目录中
   * @since 10054
   * @param parentId 要上传到的文件夹的 id
   * @param name 要上传的文件名, 与 Host.file 中的 filename 含义一致
   * @returns Promise
   * 成功时: { code:0, data: { id: 上传的文件 id } }
   * 失败时: 与 listMiCloudItem 相同
  */
   @report
  uploadMiCloudFile(parentId, name) {
     return Promise.resolve(null);
  }
  /**
   * 下载小米云盘文件
   * @since 10054
   * @param id 要下载到的文件的 id
   * @param name 可选, 要下载保存的文件名, 与 Host.file 中的 filename 含义一致, 不填则使用原始文件名，下载到缓存根目录
   * @returns Promise
   * {
   *    code:0,       // 成功时为 0，失败为其它
   *    message: ''   // 失败信息,
   *    data: filepath
   * }
  */
   @report
   downloadMiCloudFile(id, name = '') {
      return Promise.resolve(null);
  }
  /**
   * 批量管理文件。 操作是异步的，如果耗时长
   * @since 10054
   * @param operateType {string}
   *    MOVE:     移动
   *    COPY:     复制
   *    DELETE:   删除
   *    OVERWRITE:覆盖
   *    NEWCOPY:  重命名拷贝
   *    PPT_TO_PDF_CREATE:  图片转pdf生成
   *    PPT_TO_PDF_SAVE:    图片转pdf保存
   * @param recoreds{array<{id:xxx, parentId:xxx}>} 文件 id 和 目标文件夹 id (删除不用) 的数组, 最多100个
   * @returns Promise
   * {
   *    code: 0,      // 成功时为 0, 失败时非 0
   *    message: abc  // 描述信息
   *    data: {
   *      status: SUCCESS,
   *      taskId: xxxx,
   *      operateType: xxx
   *    }
   * }
   * 失败时: 与 listMiCloudItem 相同, 新增可选字段 failedRecords 表示操作失败的 id 列表
  */
  @report
   manageMiCloudFile(operateType, recoreds) {
      return Promise.resolve(null);
   }
}
const CloudStorageInstance = new ICloudStorage();
export default CloudStorageInstance;