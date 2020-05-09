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
//import Device ,{_find_device} from './../Device'
const SET = "/miotspec/prop/set";
const GET = "/miotspec/prop/get";
const ACTION = "/miotspec/action";
//
///**
// * spec 中的方法
// * @interface
// */
//export class ISpecAction {
//    /**
//     * 请求参数，在发送请求前设置
//     * @type {Array}
//     *
//     */
//    set params(params: Array) {
//        //@native => false
//        Properties.of(this).params = params;
//    }
//
//    /**
//     * 获取设置的请求参数，发送请求的时候框架内部使用
//     * @return {Array}
//     */
//    get params() {
//        //@native => false
//        return Properties.of(this).params;
//    }
//
//    /**
//     * 获取设备 id
//     * @type {string}
//     * @readonly
//     *
//     */
//    get did() {
//        //@native => false
//        return Properties.of(this).did;
//    }
//
//    /**
//     * 获取service iid
//     * @type {int}
//     * @readonly
//     *
//     */
//    get siid() {
//        //@native => false
//        return Properties.of(this).siid;
//    }
//
//    /**
//     * 获取协议的 id
//     * @type {int}
//     * @readonly
//     *
//     */
//    get iid() {
//        //@native => false
//        return Properties.of(this).protocol.iid;
//    }
//
//    /**
//     * 获取协议
//     * @type {JSON}
//     * @readonly
//     *
//     */
//    get protocol() {
//        //@native => false
//        return Properties.of(this).protocol;
//    }
//
//    /**
//     * 获取type的 urn
//     * @type {string}
//     * @readonly
//     *
//     */
//    get type() {
//        //@native => false
//        return Properties.of(this).protocol.type;
//    }
//
//    /**
//     * 获取协议的描述
//     * @type {string}
//     * @readonly
//     *
//     */
//    get description() {
//        //@native => false
//        return Properties.of(this).protocol.description;
//    }
//
//    /**
//     * 获取协议的描述 输入参数列表
//     * @type {Array}
//     * @readonly
//     *
//     */
//    get in() {
//        //@native => false
//        return Properties.of(this).protocol.in;
//    }
//
//    /**
//     * 获取协议的描述 输出参数列表
//     * @type {Array}
//     * @readonly
//     *
//     */
//    get out() {
//        //@native => false
//        return Properties.of(this).protocol.out;
//    }
//}
//
///**
// * spec 中的属性
// * @interface
// */
//export class ISpecProperty {
//
//    /**
//     *  从Native获取，如果 setPropertiesValue 接口返回失败，和设备的真实状态一致。
//     * @return {Promise<any>}
//     */
//    getValue() {
//        //@native :=> promise
//        return new Promise((resolve, reject) => {
//            native.MIOTSpec.getProperty(this.did, this.siid, this.iid, (ok, res) => {
//                if (ok) {
//                    resolve(res ? JSON.parse(res) : res);
//                } else {
//                    reject(res);
//                }
//            })
//        })
//        //@native end
//    }
//
//    /**
//     * js 中缓存值，如果 setPropertiesValue 调用失败，和设备的真实状态不一致。
//     * @return {any}
//     */
//    get value() {
//        //@native => false
//        return Properties.of(this).value;
//    }
//
//    /**
//     * 请求设置硬件属性的请求参数
//     * @type {any}
//     * @param value
//     */
//    set value(value) {
//        //@native => false
//        Properties.of(this).value = value;
//    }
//
//    /**
//     * 请求设置硬件属性的响应码
//     * @type {int}
//     */
//    get code() {
//        //@native => false
//        return Properties.of(this).code;
//    }
//
//    /**
//     * 请求设置硬件属性的响应码
//     * @type {int}
//     */
//    set code(code) {
//        //@native => false
//        Properties.of(this).code = code;
//    }
//
//    /**
//     * 获取设备 id
//     * @type {string}
//     * @readonly
//     *
//     */
//    get did() {
//        //@native => false
//        return Properties.of(this).did;
//    }
//
//    /**
//     * 获取service iid
//     * @type {int}
//     * @readonly
//     *
//     */
//    get siid() {
//        //@native => false
//        return Properties.of(this).siid;
//    }
//
//    /**
//     * 获取协议 id
//     * @type {int}
//     * @readonly
//     *
//     */
//    get iid() {
//        //@native => false
//        return Properties.of(this).protocol.iid;
//    }
//
//    /**
//     * 获取协议
//     * @type {JSON}
//     * @readonly
//     *
//     */
//    get protocol() {
//        //@native => false
//        return Properties.of(this).protocol;
//    }
//
//    /**
//     * 获取type的 urn
//     * @type {string}
//     * @readonly
//     *
//     */
//    get type() {
//        //@native => false
//        return Properties.of(this).protocol.type;
//    }
//
//    /**
//     * 获取协议的描述
//     * @type {string}
//     * @readonly
//     *
//     */
//    get description() {
//        //@native => false
//        return Properties.of(this).protocol.description;
//    }
//
//    /**
//     * 获取协议的 value 类型, bool、uint8、uint16、uint32、int8、int16、int32、int64、float、string、hex
//     * @type {string}
//     * @readonly
//     *
//     */
//    get format() {
//        //@native => false
//        return Properties.of(this).protocol.format;
//    }
//
//    /**
//     * 获取协议的权限，read、write、notify
//     * @type {string}
//     * @readonly
//     *
//     */
//    get access() {
//        //@native => false
//        return Properties.of(this).protocol.access;
//    }
//
//    /**
//     * 获取协议的单位
//     * percentage(百分比)
//     * celsius    摄氏度
//     * seconds    秒
//     * minutes    分
//     * hours    小时
//     * days    天
//     * kelvin    开氏温标
//     * pascal    帕斯卡(大气压强单位)
//     * arcdegrees    弧度(角度单位)
//     * rgb    RGB(颜色)
//     * watt    瓦特(功率)
//     * litre    升
//     * ppm    ppm浓度
//     * lux    勒克斯(照度)
//     * mg/m3    毫克每立方米
//     * @type {string}
//     * @readonly
//     *
//     */
//    get unit() {
//        //@native => false
//        return Properties.of(this).protocol.unit;
//    }
//
//    /**
//     * 获取协议的取值范围
//     * @type {Array} [16, 32, 0.5] 最小值，最大值，步进
//     * @readonly
//     *
//     */
//    get valueRange() {
//        //@native => false
//        return Properties.of(this).protocol['value-range'];
//    }
//
//    /**
//     * 获取协议的取值列表[ {"value": 1, "description": "Monday"},{"value": 2, "description": "Tuesday"},{"value": 3, "description": "Wednesday"}]
//     * @type {Array}
//     * @readonly
//     *
//     */
//    get valueList() {
//        //@native => false
//        return Properties.of(this).protocol['value-list'];
//    }
//
//    /**
//     * 获取协议的字符串最大长度
//     * @type {int}
//     * @readonly
//     *
//     */
//    get maxLength() {
//        //@native => false
//        return Properties.of(this).protocol['max-length'];
//    }
//}
//
///**
// * spec 中的服务，包含 property:ISpecProperty,action:ISpecAction,event:暂时未使用到
// * @interface
// */
//export class ISpecService {
//
//    /**
//     * 获取协议下的 property
//     * @type {ISpecProperty}
//     * @readonly
//     *
//     */
//    getProperty(piid) {
//        //@native => false
//        return this.getProperties().get(piid);
//    }
//
//    /**
//     * 获取协议下的所有 property
//     * @type {ISpecProperty[]}
//     * @readonly
//     *
//     */
//    getProperties() {
//        //@native :=> promise
//        //@mark andr done
//        //@mark iOS done
//        let properties = Properties.of(this).properties;
//        if (!properties) {
//            properties = Properties.of(this).properties = new Map();
//            const protocolProperties = Properties.of(this).protocol.properties;
//            if (protocolProperties) {
//                protocolProperties.forEach(item => {
//                    properties.set(item.iid, Properties.init(new ISpecProperty(), {
//                        did: this.did, siid: this.iid, protocol: item
//                    }));
//                })
//            }
//        }
//        return properties;
//        //@native end
//    }
//
//    /**
//     * 获取协议下的 action
//     * @type {ISpecAction}
//     * @readonly
//     *
//     */
//    getAction(aiid) {
//        //@native => false
//        return this.getActions().get(aiid);
//    }
//
//    /**
//     * 获取协议下的所有 action
//     * @type {ISpecAction[]}
//     * @readonly
//     *
//     */
//    getActions() {
//        //@native :=> promise
//        //@mark andr done
//        //@mark iOS done
//        let actions = Properties.of(this).actions;
//        if (!actions) {
//            actions = Properties.of(this).actions = new Map();
//            const protocolActions = Properties.of(this).protocol.actions;
//            if (protocolActions) {
//                protocolActions.forEach(item => {
//                    actions.set(item.iid, Properties.init(new ISpecAction(), {
//                        did: this.did, siid: this.iid, protocol: item
//                    }));
//                })
//            }
//        }
//        return actions;
//        //@native end
//    }
//
//    /**
//     * 获取设备 id
//     * @type {string}
//     * @readonly
//     *
//     */
//    get did() {
//        //@native => false
//        return Properties.of(this).did;
//    }
//
//    /**
//     * 获取协议的 iid
//     * @type {int}
//     * @readonly
//     *
//     */
//    get iid() {
//        //@native => false
//        return Properties.of(this).protocol.iid;
//    }
//
//    /**
//     * 获取协议
//     * @type {JSON}
//     * @readonly
//     *
//     */
//    get protocol() {
//        //@native => false
//        return Properties.of(this).protocol;
//    }
//
//    /**
//     * 获取type的 urn
//     * @type {string}
//     * @readonly
//     *
//     */
//    get type() {
//        //@native => false
//        return Properties.of(this).protocol.type;
//    }
//
//    /**
//     * 获取协议的描述
//     * @type {string}
//     * @readonly
//     *
//     */
//    get description() {
//        //@native => false
//        return Properties.of(this).protocol.description;
//    }
//}
//
///**
// *
// * miot spec 的封装
// * @interface
// *
// *
// */
//export class IDeviceSpec {
//
//    /**
//     * 从 Native 获取到 spec 的描述文件，根据描述文件可以生成设备的属性和方法，必须先调用这个方法,如果不支持 spec 会 catch error
//     * @return {Promise<ISpecDevice>}
//     */
//    initFromNative() {
//        return new Promise((resolve, reject) => {
//            if (this.protocol) {
//                resolve(this);
//            } else {
//                native.MIOTSpec.getSpecString(Properties.of(this).did, (ok, data) => {
//                    if (ok && data) {
//                        Properties.of(this).protocol = JSON.parse(data);
//                        resolve(this);
//                        return;
//                    }
//                    reject(data);
//                });
//            }
//        });
//    }
//
//    /**
//     * 获取协议下的 service
//     * @type {ISpecService}
//     * @readonly
//     *
//     */
//    getService(siid) {
//        //@native => false
//        return this.getServices().get(siid);
//    }
//
//    /**
//     * 获取协议下的 service
//     * @type {IDeviceSpecService[]}
//     * @readonly
//     *
//     */
//    getService(id) {
//        //@native :=> promise
//        //@mark andr done
//        //@mark iOS done
//        let services = Properties.of(this).services;
//        if (!services) {
//            services = Properties.of(this).services = new Map();
//            const protocolServices = Properties.of(this).protocol.services;
//            if (protocolServices) {
//                protocolServices.forEach(item => {
//                    services.set(item.iid, Properties.init(new ISpecService(), {
//                        did: this.did, protocol: item
//                    }));
//                })
//            }
//        }
//        return services;
//        //@native end
//    }
//
//    /**
//     * 获取设备 id
//     * @type {string}
//     * @readonly
//     *
//     */
//    get did() {
//        //@native => false
//        return Properties.of(this).did;
//    }
//
//    /**
//     * 获取协议
//     * @type {JSON}
//     * @readonly
//     *
//     */
//    get protocol() {
//        //@native => false
//        return Properties.of(this).protocol;
//    }
//
//    /**
//     * 获取type的 urn
//     * @type {string}
//     * @readonly
//     *
//     */
//    get type() {
//        //@native => false
//        return Properties.of(this).protocol.type;
//    }
//
//    /**
//     * 获取协议的描述
//     * @type {string}
//     * @readonly
//     *
//     */
//    get description() {
//        //@native => false
//        return Properties.of(this).protocol.description;
//    }
//
//    /**
//     * 订阅设备消息
//     * @method
//     * @param {...ISpecProperty} props
//     * @returns {Promise<EventSubscription>}
//     *
//     */
//    subscribeMessages(...props: ISpecProperty) {
//        //@native :=> promise {}
//        let params = [];
//        props.forEach((item) => {
//            params.push("prop." + item.siid + "." + item.iid)
//        });
//        return Device.getDeviceWifi().subscribeMessages(...params);
//        //@native end
//    }
//
//    /**
//     * 请求获取设备的属性值,获取成功后可以通过 ISpecProperty.value 或者 ISpecProperty.getValue 获取
//     * @param {...ISpecProperty} props
//     * @return {Promise<ISpecDevice>}
//     */
//    getPropertiesValue(...props: ISpecProperty) {
//        //@native :=> promise
//        let params = [];
//        props.forEach(prop => {
//            params.push({did: prop.did, siid: prop.siid, piid: prop.iid});
//        });
//        return new Promise((resolve, reject) => {
//            native.MIOTRPC.standardCall(GET, {'params': params}, (ok, res) => {
//                if (ok) {
//                    res.forEach(item => {
//                        try {
//                            let prop = _find_device(item.did).device.getSpecDevice().getService(item.siid).getProperty(item.piid);
//                            prop.value = item.value;
//                            prop.code = item.code;//值为0 才能生效
//                            native.MIOTSpec.setProperty(prop.did, prop.siid, prop.iid, prop.code, JSON.stringify(prop.value));
//                        } catch (e) {
//                            console.log(e);
//                        }
//                    });
//                    resolve(this);
//                } else {
//                    reject(this);
//                }
//            })
//        })
//        //@native end
//    }
//
//    /**
//     * 请求设置设备的属性值，设置成功后会更新 Native
//     * @param {...ISpecProperty} props
//     * @return {Promise<ISpecDevice>}
//     */
//    setPropertiesValue(...props: ISpecProperty) {
//        //@native :=> promise
//        let params = [];
//        props.forEach(prop => {
//            params.push({did: prop.did, siid: prop.siid, piid: prop.iid, value: prop.value});
//        });
//        return new Promise((resolve, reject) => {
//            native.MIOTRPC.standardCall(SET, {'params': params}, (ok, res) => {
//                if (ok) {
//                    res.forEach(item => {
//                        try {
//                            let prop = _find_device(item.did).device.getSpecDevice().getService(item.siid).getProperty(item.piid);
//                            prop.code = item.code;//值为0 才能生效
//                            native.MIOTSpec.setProperty(prop.did, prop.siid, prop.iid, prop.code, JSON.stringify(prop.value));
//                        } catch (e) {
//                            console.log(e);
//                        }
//                    });
//                    resolve(this);
//                } else {
//                    reject(this);
//                }
//            })
//        })
//        //@native end
//    }
//
//    /**
//     * 请求调用设备的方法
//     * @param {ISpecAction} action
//     * @return {Promise<JSON>}
//     */
//    doAction(action: ISpecAction) {
//        //@native :=> promise
//        let params = {did: action.did, siid: action.siid, aiid: action.iid, in: action.params};
//        return new Promise((resolve, reject) => {
//            native.MIOTRPC.standardCall(ACTION, {'params': params}, (ok, res) => {
//                if (ok) {
//                    resolve(res);
//                } else {
//                    reject(res);
//                }
//            })
//        })
//        //@native end
//    }
//}
export default {
    ///**
    // * 创建Spec设备,  miot/Device.getDeviceSpec() 或者 DeviceSpec.createSpec(miot/Device.deviceID)
    // * @method
    // * @param {string} deviceID
    // * @returns {ISpecDevice}
    // */
    //createSpec(deviceID) {
    //    //@native :=> null
    //    return Properties.init(new ISpecDevice(), {did: deviceID});
    //    //@native end
    //},
    /**
     * 请求获取设备的属性值； 由于是发起网络请求，数据的正确性可以通过抓包来查看；
     * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
     * code 具体表示什么意思可以查看： https://iot.mi.com/new/doc/05-米家扩展程序开发指南/05-功能接口/06-MIOT-Spec.html
     * @param {Array}  params [{did: 1, siid: 1, piid: 1},{did: 1, siid:2, piid: 3},……]
     * @param {int} datasource 从10036开始增加datasource:
     * datasource=1  优先从缓存读取，没有读取到下发rpc
     * datasource=2  直接下发rpc
     * datasource=3  直接读缓存;没有缓存的 code 是 -70xxxx
     * 后台的默认策略是datasource=3
     * @return {Promise<JSON>}
     * 成功时分两种情况：
     * 获取设备属性成功时： [{"did":"xxx","siid":x,"piid":x,"code":0，value: xxx },……]
     * 获取设备属性失败时： [{"did":"xxx","siid":x,"piid":x,"code":xxx},……]
     * 失败时：{code:xxx, message:xxx}
     */
    getPropertiesValue(params,datasource = 1) {
         return Promise.resolve(null);
    },
    /**
     * 请求设置设备的属性值，由于是发起网络请求，数据的正确性可以通过抓包来查看；
     * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
     * code 具体表示什么意思可以查看： https://iot.mi.com/new/doc/05-米家扩展程序开发指南/05-功能接口/06-MIOT-Spec.html
     * @param {Array} params [{did: 1, siid: 1, piid: 1, value:'any'},{did: 1, siid:2, piid: 3, value: 'any'},……]
     * @return {Promise<JSON>}
     * 成功时分两种情况：
     * 设置设备属性成功时：  [{"did":"xxx","siid":x,"piid":x,"code":0 },……]
     * 设置设备属性失败时：  [{"did":"xxx","siid":x,"piid":x,"code":xxx },……]
     * 失败时：{code:xxx, message:xxx}
     */
    setPropertiesValue(params) {
         return Promise.resolve(null);
    },
    /**
     * 请求调用设备的方法,由于是发起网络请求，数据的正确性可以通过抓包来查看；
     * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
     * code 具体表示什么意思可以查看： https://iot.mi.com/new/doc/05-米家扩展程序开发指南/05-功能接口/06-MIOT-Spec.html
     * @param {JSON} params {did: action.did, siid: action.siid, aiid: action.iid, in: action.params},其中，action.params为数组。例如 {did: 1, siid: 1, aiid: 1, in: [17,"shanghai"]}
     * @return {Promise<JSON>}
     * 成功时分两种情况：
     * 方法执行成功时：  {"did":"xxx","siid":x,"piid":x,"code":0 }
     * 方法执行失败时：  {"did":"xxx","siid":x,"piid":x,"code":xxx }
     * 失败时：{code:xxx, message:xxx}
     */
    doAction(params) {
         return Promise.resolve(null);
    },
    /**
     * 获取设备的spec详情, 由于是发起网络请求，数据的正确性可以通过抓包来查看；
     * 只要网络请求成功会代码会执行到then（与具体是否获取到设备属性值无关）， 网络请求失败则会执行到catch
     * @param did 设备的did
     * @return {Promise<JSON>} 设备的Spec属性详情
     * 方法执行成功时：直接返回设备具体内容，json结构字符串
     * 失败时：{code:xxx, message:xxx}
     */
    getSpecString(did) {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTSpec.getSpecString(did, (ok, data) => {
                if (ok && data) {
                    resolve(data);
                    return;
                }
                reject(data);
            });
        })
        // @native end
    },
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
    getCurrentSpecValue(did) {
        // @native :=> promise
        return native.MIOTSpec.getCurrentSpecValueWithDid(did);
        // @native end
    }
}