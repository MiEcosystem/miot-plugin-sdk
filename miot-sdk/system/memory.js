/**
 * @export public
 * @doc_name 手机性能模块
 * @doc_index 7
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的性能：内存不足警告
 * 
 * @example
 * import {MemoryWarningEvent} from "miot"
 * ...
 * MemoryWarningEvent.onMemoryWarning.addListener(//listener)
 * ...
 */
/**
 * 性能
 * @interface
 *
 */
/**
  * 应用内存不足时的通知
  * @since 10043
  * @returns {number} level 内存告警等级，只有 Android 才有，对应系统宏定义，包括:
  * 5：TRIM_MEMORY_RUNNING_MODERATE；
  * 10：TRIM_MEMORY_RUNNING_LOW；
  * 15：TRIM_MEMORY_RUNNING_CRITICAL。
  * 详见：https://developer.android.com/reference/android/content/ComponentCallbacks2
  * @example MemoryWarningEvent.onMemoryWarning.addListener(this.myListener);
  */
export const MemoryWarningEvent = {
  
  onMemoryWarning: {
  }
};