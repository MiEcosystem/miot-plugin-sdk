/**
 * @export public
 * @doc_name 手机系统定位模块
 * @doc_index 4
 * @doc_directory system
 * @module miot/system
 * @description
 * 扩展程序运行时手机系统提供的定位功能，主要包括定位权限的获取，获取当前定位（不同精度），位置信息更新事件等方法
 * @example
 *  import {System} from 'miot'
 *  System.location.getLocation({accuracy:1}).then(res=>{
 *      console.log(res)
 *  })
 */
export { default, LocationEvent } from 'mhrn/system/location';