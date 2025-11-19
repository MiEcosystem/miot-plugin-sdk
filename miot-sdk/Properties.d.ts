export function createProperties(): IProperties;
/**
 * 根设备属性缓存对象
 * @static
 */
export const RootDeviceProperties: IProperties;
export default RootDeviceProperties;
/**
 * @export private
 * @module miot/Properties
 * @desc 用于设备属性集合的本地缓存工具类
 *
 * @example
 *   //加载根设备的属性缓存对象
 *   import {Device, DeviceProperties} from "miot"
 *
 *   const eventSubscription = DeviceProperties.addListener(["prop1", "prop2"], (deviceProps, changeProps)=>{
 *
 *   })
 *
 *   ...
 *
 *   Device.getDeviceWifi().loadProperties("prop1", "prop2")
 *      .then(propsMap=>{
 *          DeviceProperties.setProperties(propsMap).notifyPropertiesChanged();
 *       })
 *      .catch(err=>{})
 *
 *    ...
 *    eventSubscription.remove()
 *
 * @example
 *   //创建新的设备属性缓存对象
 *   import {createProperties} from "miot/Properties"
 *   const myDeviceProperties = createProperties();
 *
 *   ...
 *
 *   myDeviceProperties.clear();
 *
 */
/**
 * @interface
 */
declare class IProperties {
  /**
       * 获取属性
       * @param {*} name
       */
  getProperty(name: any): any;
  /**
       * 设置属性, 同时将设置属性数值被改变
       * @param {*} name
       * @param {*} value
       * @returns {IProperties}
       */
  setProperty(name: any, value: any): IProperties;
  /**
       * 获取所有的属性名
       * @returns {Set<string>}
       */
  getPropertyNames(): Set<string>;
  /**
       * 判断是否存在某个属性
       * @param {*} name
       * @returns {boolean}
       */
  hasProperty(name: any): boolean;
  /**
       * 删除属性
       * @param {string} name -属性名称, 如果为*则表示删除所有属性
       * @returns {IProperties}
       */
  removeProperty(name: string): IProperties;
  /**
       * 删除一系列属性
       * @param {Array<string>} names -如果第一个 name 为*, 则表示删除所有属性
       * @returns {IProperties}
       */
  removeProperties(...names: Array<string>): IProperties;
  /**
       * 删除所有属性
       * @returns {IProperties}
       */
  removeAllProperties(): IProperties;
    _properties: Map<any, any> | undefined;
    _status: Map<any, any> | undefined;
    /**
       * 某个属性值是否被改变过
       * @param {*} name
       * @returns {boolean}
       */
    isPropertyChanged(name: any): boolean;
    /**
       * 批量获取属性的 Map
       * @param {*} names -属性名
       * @returns {Map<string, object>}
       *
       */
    getProperties(...names: any): Map<string, object>;
    /**
       * 批量设置属性值
       * @param {*} nameValues --属性数值map, 可以为Map<string, object>或object
       * @param {function} nameConvertor --转换属性名, 如果没有则不转换
       *
       * @example
       *     Map map = new Map();
       *     map.set("a", 1)
       *     map.set("b", 2)
       *     myDeviceProperties.setProperties(map, n=>n.startsWith("prop.")?n.substr(5):n)
       *
       * @example
       *   myDeviceProperties.setProperties({a:1, "b":2})
       *
       *
       */
    setProperties(nameValues: any, nameConvertor?: Function): IProperties;
    /**
       * 监听属性变化事件
       * @param {*} names -要监听的属性名, 可以为string 或数组, 如果为*则表示监听所有的属性变化
       * @param {*} callback
       * @returns {EventSubscription}
       *
       * @example
       *      const eventSubscription = myDeviceProperties.addListener("prop1", (deviceProperties)=>{...})
       *      ...
       *      eventSubscription.remove()
       *
       * @example
       *      const sub =  myDeviceProperties.addListener("*", (deviceProperties)=>{...})
       *      ...
       *      sub.remove()
       *
       * @example
       *      const sub = myDeviceProperties.addListener(["prop1", "prop2"], (deviceProperties)=>{...})
       *      ...
       *      sub.remove()
       *
       */
    addListener(names: any, callback: any): EventSubscription;
    /**
       * 检查并触发属性变化事件, 一般情况下, 在设置了新的属性数值后, 应该调用此方法触发监听事件
       * @param {*} names -属性名, 如果为空或 names[0]=="*" 则自动检查所有的属性变化
       * @returns {IProperties}
       *
       * @example
       *      myDeviceProperties.notifyPropertiesChanged()
       *      myDeviceProperties.notifyPropertiesChanged("*")
       *
       * @example
       *      myDeviceProperties.notifyPropertiesChanged("prop1", "prop2")
       *
       *
       */
    notifyPropertiesChanged(...names: any): IProperties;
    /**
       * 强制触发属性相关事件,但不会检查相关属性是否已经改变
       * @param {*} names -如果names[0]=="*"则表示触发所有的事件
       * @returns {IProperties}
       */
    triggerListeners(...names: any): IProperties;
    /**
       * 删除属性相关的事件
       * @param {*} names -属性名, 如果 names[0] == "*", 表示删除所有事件监听
       * @returns {IProperties}
       *
       */
    removeListeners(...names: any): IProperties;
    /**
       * 删除所有的事件监听
       * @returns {IProperties}
       */
    removeAllListeners(): IProperties;
    _listeners: Set<any> | undefined;
    /**
       * 清除缓存并删除所有的事件监听
       * @returns {IProperties}
       */
    clear(): IProperties;
}