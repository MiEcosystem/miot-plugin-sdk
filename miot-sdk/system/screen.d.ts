export namespace ScreenLockEvent {
    namespace screenStateChanged {
        function forever(emitter: any): ({ locked }: {
            locked: any;
        }) => void;
        const sameas: string;
    }
}
export default ScreenInstance;
declare const ScreenInstance: IScreen;
export declare class IScreen {
  /**
     * 获取手机屏幕锁屏状态：仅用于android平台
     *
     * @returns {Promise<boolean>} result: 锁屏：true，未锁屏：false
     * @example
     * System.screen.getScreenLockState().then((res) => {
     *      alert(`screenLocakState -> ${res}`)
     * })
     */
  getScreenLockState(): Promise<boolean>;
}