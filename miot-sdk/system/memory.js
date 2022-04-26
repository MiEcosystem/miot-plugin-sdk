/**
 * @export public
 * @doc_name 手机性能模块
 * @doc_index 7
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机的性能：内存不足警告
 * @example
 * import {MemoryWarningEvent} from "miot"
 * ...
 * MemoryWarningEvent.onMemoryWarning.addListener(//listener)
 * ...
 */
export { MemoryWarningEvent } from 'mhrn/system/memory';