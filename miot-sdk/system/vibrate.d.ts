export default VibrateInstance;
declare const VibrateInstance: IVibrate;
/**
 * 震动
 * @interface
 *
 */
export declare class IVibrate {
  /**
     * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
     * @since 10043
     * @example System.vibrate.vibrateShort();
     */
  vibrateShort(): void;
  /**
     * 使手机发生较长时间的振动（400 ms)
     * @since 10043
     * @example System.vibrate.vibrateLong();
     */
  vibrateLong(): void;
}