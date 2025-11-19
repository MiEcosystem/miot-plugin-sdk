export namespace ShakeEvent {
    namespace onShake {
        function forever(emitter: any): () => void;
        const sameas: string;
    }
}
export default ShakeInstance;
declare const ShakeInstance: IShake;
/**
 * 摇一摇
 * @interface
 *
 */
export declare class IShake {
  /**
     * 开始监听摇一摇
     * @since 10045
     * @returns {Promise} 成功时：{code:0,message:'success'}
     * 失败时：{code:xxx, message:"xxx" }
     * @example
     *  System.shake.startShakeListener().then((res) => {
      alert(`startShakeListener: ${ JSON.stringify(res) }`);
    }).catch((error) => {
      alert(`startShakeListener: ${ JSON.stringify(error) }`);
    });
     */
  startShakeListener(): Promise<any>;
  /**
     * 停止监听加速度数据
     * @since 10045
     * @returns {Promise} 成功时：{code:0,message:'success'}
     * 失败时：{code:xxx, message:"xxx" }
     * @example
     *  System.shake.stopShakeListener().then((res) => {
      alert(`stopShakeListener: ${ JSON.stringify(res) }`);
    }).catch((error) => {
      alert(`stopShakeListener: ${ JSON.stringify(error) }`);
    });
     */
  stopShakeListener(): Promise<any>;
}