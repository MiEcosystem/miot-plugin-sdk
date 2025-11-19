export default ScanCodeInstance;
declare const ScanCodeInstance: IScanCode;
/**
 * 扫码
 * @interface
 *
 */
export declare class IScanCode {
  /**
     * 使用米家APP进行扫码操作
     * @since 10043
     * @return {Promise<Object>} res
     * 成功时：{"code":0, "data":xxx},data.result:string,扫码结果
     * 失败时：{"code":-1, "message":"xxx" }；
     * @example
     *  System.scancode.scanCode().then((res) => {
      if (res && res.data) {
        alert(`getScanCode success,result:${ res.data.result }`);
      } else {
        alert(`getScanCode fail,${ JSON.stringify(res) }`);
      }
    }).catch((error) => {
      alert(`getScanCode fail,${ JSON.stringify(error) }`);
    });
     */
  scanCode(): Promise<Object>;
}