export default MiTvInstance;
declare const MiTvInstance: IMiTv;
/**
 * @export
 */
declare class IMiTv {
  /**
     * @param params 传入需要使用的红外方法
     * @since 10074
     * @returns Promise
     * @example
     *     let params = {
     *       action : 'power'
     *     };
     *     Host.MiTv.sendInfrared(params).then((res)=> {
     *       console.log("res : ---------- : " , res);
     *     }).catch(err => {
     *       console.log("error : =========" , err);
     *     });
     */
  sendInfrared(params: any): Promise<any>;
  isSupportPlatformId(): boolean;
}