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
// import Device ,{_find_device} from './../Device'
import { report, resultReport } from "../decorator/ReportDecorator";
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
class ISpec {
  /**
   * 请求获取设备的属性值； 由于是发起网络请求，数据的正确性可以通过抓包来查看；
   * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
   * code 具体表示什么意思可以查看：https://iot.mi.com/new/doc/extension-development/basic-functions/communication#%E9%94%99%E8%AF%AF%E7%A0%81
   * 参数中miid 表示spec-v3 中的module id, 请根据spec 版本自行添加此参数
   * @param {Array}  params [{did: 1, miid: 1, siid: 1, piid: 1},{did: 1, miid: 1, siid:2, piid: 3},……]
   * @param {int} datasource 从10036开始增加datasource，可不传（不传的默认dataSource=1）,dataSource可选值如下:
   * datasource=1  优先从服务器缓存读取，没有读取到下发rpc；不能保证取到的一定是最新值
   * datasource=2  直接下发rpc，每次都是设备返回的最新值
   * datasource=3  直接读缓存;没有缓存的 code 是 -70xxxx；可能取不到值
   * 后台的默认策略是datasource=3；开发者可根据需求特性选择dataSource的值，如果对实时性要求不高，建议dataSource=1或者dataSource=3,以减轻后台服务的压力
   * @return {Promise<JSON>}
   * 成功时分两种情况：
   * 获取设备属性成功时： [{"did":"xxx","miid":x,"siid":x,"piid":x,"code":0，value: xxx },……]
   * 获取设备属性失败时： [{"did":"xxx","miid":x,"siid":x,"piid":x,"code":xxx},……]
   * 失败时：{code:xxx, message:xxx}
   */
  @report
  @resultReport
  getPropertiesValue(params, datasource = 1) {
     return Promise.resolve(null);
  }
  /**
   * 请求设置设备的属性值，由于是发起网络请求，数据的正确性可以通过抓包来查看；
   * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
   * code 具体表示什么意思可以查看：https://iot.mi.com/new/doc/extension-development/basic-functions/communication#%E9%94%99%E8%AF%AF%E7%A0%81
   * 参数中miid 表示spec-v3 中的module id, 请根据spec 版本自行添加此参数
   * @param {Array} params [{did: 1, miid: 1, siid: 1, piid: 1, value:'any'},{did: 1, miid: 1, siid:2, piid: 3, value: 'any'},……]
   * @return {Promise<JSON>}
   * 成功时分两种情况：
   * 设置设备属性成功时：  [{"did":"xxx","miid":x,"siid":x,"piid":x,"code":0 },……]
   * 设置设备属性失败时：  [{"did":"xxx","miid":x,"siid":x,"piid":x,"code":xxx },……]
   * 失败时：{code:xxx, message:xxx}
   */
  @report
  @resultReport
  setPropertiesValue(params) {
     return Promise.resolve(null);
  }
  /**
   * 请求调用设备的方法,由于是发起网络请求，数据的正确性可以通过抓包来查看；
   * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
   * code 具体表示什么意思可以查看：https://iot.mi.com/new/doc/extension-development/basic-functions/communication#%E9%94%99%E8%AF%AF%E7%A0%81
   * 参数中miid 表示spec-v3 中的module id, 请根据spec 版本自行添加此参数
   * @param {JSON} params {did: action.did, miid: action.miid, siid: action.siid, aiid: action.iid, in: action.params},其中，action.params为数组。例如 {did: 1, siid: 1, aiid: 1, in: [17,"shanghai"]}
   * @return {Promise<JSON>}
   * 成功时分两种情况：
   * 方法执行成功时：  {"did":"xxx","miid":x,"siid":x,"piid":x,"code":0 }
   * 方法执行失败时：  {"did":"xxx","miid":x,"siid":x,"piid":x,"code":xxx }
   * 失败时：{code:xxx, message:xxx}
   */
  @report
  @resultReport
  doAction(params) {
     return Promise.resolve(null);
  }
  /**
   * 该接口用来上报设备属性，一般供蓝牙设备使用
   * 参数中miid 表示spec-v3 中的module id, 请根据spec 版本自行添加此参数
   * @since SDK10045
   * @param {JSON} params {"props": [{"did": "xxx", "miid":x, "siid": 1, "piid": 1, "value": "xxx(参考spec定义的类型设置)", "tid": 123(与网关接口定义一致)}], "version": ""}
   * @return {Promise<JSON>} {"results": [{"did": "xxx", "miid":x, "siid": 1, "piid": 1, "code": 0}]}
   */
  @report
  reportPropChanged(params) {
     return Promise.resolve(null);
  }
  /**
   * 获取设备的spec详情, 由于是发起网络请求，数据的正确性可以通过抓包来查看；
   * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
   * @param did 设备的did
   * @return {Promise<JSON>} 设备的Spec属性详情
   * 方法执行成功时：直接返回设备具体内容，json结构字符串
   * 失败时：{code:xxx, message:xxx}
   */
  @report
  getSpecString(did) {
     return Promise.resolve(null);
  }
  /**
   * 刚进入插件时，如果需要获取米家APP缓存的设备的miot-spec数据，则调用此方法获取，有可能没有数据,不建议使用
   * 注意调用方法的时候，方法要加上async
   * 使用方式：let data = await Service.spec.getCurrentSpecValue(did);
   * @since 10003
   * @param did 设备的did，必传
   * @return {} 缓存的设备的miotSpec属性，
   * 方法执行成功时,Android iOS返回数据格式不一样
   * Android：string类型, {"code":0, "result":"[]"} or {"code":0, "result":"[{"did":"xxx","siid":x,"piid":x,"code":0 }, ...]"}
   * iOS： 返回值同上面的getPropertiesValue方法。此方法只返回code为0（get成功）的数据
   */
  @report
  getCurrentSpecValue(did) {
     return Promise.resolve(null);
  }
  /**
   * 查询属性上报规则
   * spec-v3 引入
   * 参数中miid 表示spec-v3 中的module id, 请根据spec 版本自行添加此参数
   * @since SDK10048
   * @param {JSON} params {"did": "xxx", "miid":x, "siid": 1, "piid": 1}
   * @param {String} version 和设备端设计同步字段，默认为空字符串，一般情况下建议不传该参数
   * @return {Promise<JSON>} {"results": {"did": "xxx", "miid":x, "siid": 1, "piid": 1,  "minimum_report_interval": 1, "maximum_report_interval": 100, "reportable_change": 5}} minimum_report_interval:最小上报间隔，单位（s）,maximum_report_interval:最大上报间隔，单位（s），为0指无穷大，即不需要周期上报,reportable_change:可上报的变化阈值，同属性数据类型
   */
  @report
  getPropertyReportConfig(params, version = '') {
     return Promise.resolve(null);
  }
  cachedParsedInstance = {};
  getInstanceWithCache(did) {
     return Promise.resolve(null);
  }
  getSpecByKey(did, { mkey, skey, pkey, akey, ekey } = {}) {
     return Promise.resolve(null);
  }
  getSpecByIid(did, { miid, siid, piid, aiid, eiid }) {
     return Promise.resolve(null);
  }
  /**
   * 设置属性上报规则
   * spec-v3 引入
   * 参数中miid 表示spec-v3 中的module id, 请根据spec 版本自行添加此参数
   * @since SDK10048
   * @param {JSON} params {"did": "xxx", "miid":x, "siid": 1, "piid": 1, minimum_report_interval: 1, maximum_report_interval: 100, reportable_change: 5} minimum_report_interval:最小上报间隔，单位（s）,maximum_report_interval:最大上报间隔，单位（s），为0指无穷大，即不需要周期上报,reportable_change:可上报的变化阈值，同属性数据类型
   * @param {String} version 和设备端设计同步字段，默认为空字符串，一般情况下建议不传该参数
   * @return {Promise<JSON>} {"results": {"did": "xxx", "miid":x, "siid": 1, "piid": 1, "code": 0}}
   */
  @report
  setPropertyReportConfig(params, version = '') {
     return Promise.resolve(null);
  }
}
const SpecInstance = new ISpec();
export default SpecInstance;