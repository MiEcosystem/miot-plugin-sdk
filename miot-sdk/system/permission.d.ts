export namespace Permissions {
    const CAMERA: string;
    const RECORD_AUDIO: string;
    const LOCATION: string;
}
export namespace SystemConfig {
    const NOTIFICATION: string;
}
export default PermissionInstance;
declare const PermissionInstance: IPermission;
export declare class IPermission {
  /**
     * @typedef {Object} PermissionInfo
     * @property {number} type iOS 中，为 PHOTOS 时， 0表示未选择， 1，2表示无权限，3表示有权限，4表示部分照片有权限
     */
  /**
      * @typedef {Object} PermissionRes
      * @property {number} code 0表示成功，其他表示失败
      * @property {string} message 信息描述
      * @property {Object<PermissionInfo>} info 可选
      */
  /**
      * 弹出提示框向用户请求某项权限。返回一个 Promise,表示处理完成
      * @since 10047
      * @param permission Permissions中的某项权限
      * @return {Promise<PermissionRes>} 申请成功或失败
      * @example
      *  System.permission.requestInfo(Permissions.CAMERA).then((res) => {
            alert(`requestPermission,result:${ res }`);
          }).catch((error) => {
            alert(`requestPermission,error:${ JSON.parse(error) }`);
          });
      */
  requestInfo(permission: any): Promise<{
        /**
         * 0表示成功，其他表示失败
         */
        code: number;
        /**
         * 信息描述
         */
        message: string;
        /**
         * 可选
         */
        info: any;
    }>;
    /**
     * 弹出提示框向用户请求某项权限。返回一个 Promise,表示处理完成
     * @since 10043
     * @param permission Permissions中的某项权限
     * @return {Promise<Boolean>} 申请成功或失败
     * @example
     *  System.permission.request(Permissions.CAMERA).then((res) => {
      alert(`requestPermission,result:${ res }`);
    }).catch((error) => {
      alert(`requestPermission,error:${ JSON.parse(error) }`);
    });
     */
    request: (permission: any) => Promise<boolean>;
    _request(permission: any, returnInfo?: boolean): any;
    /**
     * 检查是否给予APP某项系统权限，有别于会弹出系统弹窗的那些“高敏感”权限，这里指的是一些安全性低的权限，比如是否打开了APP推送通知的权限
     * @param type{SystemConfig<string>} 某项权限类型
     * @return {Promise<object>}
     * 成功时object:{
     *   code:0,
     *   data: {
     *     enable: true/false
     *     status: (iOS通知权限: 0/1/2/3/4 分别对应状态：NotDetermined/Denied/Authorized/Provisional/Ephemeral)
     *   }
     * }
     * 失败时object:{
     *   code:-1,
     *   message:"xxxxxx"
     * }
     */
    checkAPPSystemConfigEnable(type: {
        NOTIFICATION: string;
    }): Promise<object>;
    /**
     * 打开设置权限的页面，用于引导用户启用某项低敏感的权限
     * @param type{SystemConfig<string>}
     */
    openAPPSystemConfigPage(type: {
        NOTIFICATION: string;
    }): void;
}