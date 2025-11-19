export namespace GyroscopeChangeEvent {
    namespace onGyroscopeChange {
        function forever(emitter: any): (result: any) => void;
        const sameas: string;
    }
}
export default GyroscopeInstance;
declare const GyroscopeInstance: IGyroscope;
/**
 * 陀螺仪
 * @interface
 *
 */
export declare class IGyroscope {
  /**
     * 开始监听陀螺仪数据
     * @since 10043
     * @param {string} interval 监听陀螺仪数据回调函数的执行频率。其合法值如下：
     * game 适用于更新游戏的回调频率，在 20ms/次 左右；
     * ui 适用于更新 UI 的回调频率，在 60ms/次 左右；
     * normal 普通的回调频率，在 200ms/次 左右。
     * @returns {Promise<json>} 成功时：{code:0,message:'success'}
     * @example
     *  System.gyroscope.startGyroscope(interval.c).then((res) => {
          alert(`startGyroscope: ${ JSON.stringify(res) }`);
        }).catch((error) => {
          console.log(error);
        });
     */
  startGyroscope(interval: string): Promise<json>;
  /**
     * 停止监听陀螺仪数据
     * @since 10043
     * @returns {Promise<json>} 成功时：{code:0,message:'success'}
     * @example
     *  System.gyroscope.stopGyroscope().then((res) => {
            alert(`stopGyroscope: ${ JSON.stringify(res) }`);
          }).catch((error) => {
            console.log(error);
          });
        }
     */
  stopGyroscope(): Promise<json>;
}