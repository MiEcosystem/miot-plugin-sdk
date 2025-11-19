/**
 * @export public
 * @doc_name miot_spec
 * @doc_index 4
 * @doc_directory service
 * @module miot/service/spec
 * @description
 * 主要面向的是支持Spec协议的设备， 通过提供的API可以实现与设备之间进行通信等功能;
 * 该模块提供的能力大致如下:
 * 1、获取设备的Spec信息  2、获取或修改设备的属性值  3、请求调用设备的方法
 * @example
 * import { Service } from "miot";
 * Service.spec.getSpecString(xxx).then(res => {
 *  console.log("res", res)
 * }).catch(error => {
 *    console.log("error", error)
 * });
 */
import {report, resultReport} from "../decorator/ReportDecorator";
const SET = "/miotspec/prop/set";
const GET = "/miotspec/prop/get";
const ACTION = "/miotspec/action";
const PROP_CHANGED = "/v2/miotspec/prop_changed";
const SET_PROPERTY_REPORT_CONFIG = '/v2/miotspec-v3/set_property_report_config';
const GET_PROPERTY_REPORT_CONFIG = '/v2/miotspec-v3/get_property_report_config';
/**
 * spec 中的方法
 * @interface
 */
export declare class ISpec {