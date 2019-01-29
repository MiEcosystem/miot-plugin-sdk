/**
 * @export
 * @module miot/service/spec
 * @description MIOT Spec 获取 设置 property  调用 action
 *
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
     * 请求获取设备的属性值,获取成功后可以通过 ISpecProperty.value 或者 ISpecProperty.getValue 获取
     * @param {Array}  params [{did: 1, siid: 1, piid: 1},{did: 1, siid:2, piid: 3}]
     * @return {Promise<string>}
     */
    getPropertiesValue(params) {
         return Promise.resolve(null);
    },
    /**
     * 请求设置设备的属性值，设置成功后会更新 Native
     * @param {Array} params [{did: 1, siid: 1, piid: 1, value:'any'},{did: 1, siid:2, piid: 3, value: 'any'}]
     * @return {Promise<string>}
     */
    setPropertiesValue(params) {
         return Promise.resolve(null);
    },
    /**
     * 请求调用设备的方法
     * @param {JSON} params {did: action.did, siid: action.siid, aiid: action.iid, in: action.params}
     * @return {Promise<JSON>}
     */
    doAction(params) {
         return Promise.resolve(null);
    },
    /**
     * @param did 设备的did
     * @return {Promise<JSON>} 设备的Spec属性详情
     */
    getSpecString(did){
	 // @native :=> promise
	   	return new Promise((resolve, reject) => {
			native.MIOTSpec.getSpecString(did,(ok, data) => {
	           if (ok && data) {
	               resolve(data);
	               return;
	           }
	           reject(data);
	       	});
	   })
	   // @native end
    }
}