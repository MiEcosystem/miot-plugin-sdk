export namespace CompassChangeEvent {
    namespace onCompassChange {
        function forever(emitter: any): (result: any) => void;
        const sameas: string;
    }
}
export default CompassInstance;
declare const CompassInstance: ICompass;
/**
 * 罗盘
 * @interface
 *
 */
export declare class ICompass {
  /**
     * 开始监听罗盘数据
     * @since 10043
     * @param {string} interval 监听罗盘数据回调函数的执行频率。其合法值如下：
     * game 适用于更新游戏的回调频率，在 20ms/次 左右；
     * ui 适用于更新 UI 的回调频率，在 60ms/次 左右；
     * normal 普通的回调频率，在 200ms/次 左右。
     * @returns {Promise<json>} 成功时：{code:0,message:'success'}
     * @example
     *  System.compass.startCompass(interval.c).then((res) => {
          alert(`startCompass: ${ JSON.stringify(res) }`);
        }).catch((error) => {
          console.log(error);
        });
     */
  startCompass(interval: string): Promise<object>;
  /**
     * 停止监听罗盘数据
     * @since 10043
     * @returns {Promise<json>} 成功时：{code:0,message:'success'}
     * @example
     *  System.compass.stopCompass().then((res) => {
            alert(`stopCompass: ${ JSON.stringify(res) }`);
          }).catch((error) => {
            console.log(error);
          });
        }
     */
  stopCompass(): Promise<object>;
}