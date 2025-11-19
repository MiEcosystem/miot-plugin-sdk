export namespace AccelerometerChangeEvent {
    namespace onAccelerometerChange {
        function forever(emitter: any): (result: any) => void;
        const sameas: string;
    }
}
declare const AccelerometerInstance: IAccelerometer;
/**
 * 加速计
 * @interface
 *
 */
export declare class IAccelerometer {
  /**
     * 开始监听加速度数据
     * @since 10043
     * @param {string} interval 监听加速度数据回调函数的执行频率。其合法值如下：
     * game 适用于更新游戏的回调频率，在 20ms/次 左右；
     * ui 适用于更新 UI 的回调频率，在 60ms/次 左右；
     * normal 普通的回调频率，在 200ms/次 左右。
     * @returns {Promise<json>} 成功时：{code:0,message:'success'}
     * @example
     *  System.accelerometer.startAccelerometer(interval.a).then((res) => {
          alert(`startAccelerometer: ${ JSON.stringify(res) }`);
        }).catch((error) => {
          alert(`startAccelerometer: ${ JSON.stringify(error) }`);
        });
     */
  startAccelerometer(interval: string): Promise<object>;
  /**
     * 停止监听加速度数据
     * @since 10043
     * @returns {Promise<json>} 成功时：{code:0,message:'success'}
     * @example
     *  System.accelerometer.stopAccelerometer().then((res) => {
            alert(`stopAccelerometer: ${ JSON.stringify(res) }`);
          }).catch((error) => {
            alert(`stopAccelerometer: ${ JSON.stringify(error) }`);
          });
        }
     */
  stopAccelerometer(): Promise<object>;
}
export default AccelerometerInstance;