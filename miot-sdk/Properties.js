/**
 * @export
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
class IProperties{
    /**
     * 获取属性
     * @param {*} name 
     */
    getProperty(name){
        return this._properties.get(name);
    }
    /**
     * 设置属性, 同时将设置属性数值被改变
     * @param {*} name 
     * @param {*} value 
     * @returns {IProperties}
     */
    setProperty(name, value){
        this._properties.set(name, value)
        this._status.set(name, true)
        return this;
    }
    /**
     * 获取所有的属性名
     * @returns {Set<string>}
     */
    getPropertyNames(){
        return this._properties.keys();
    }
    /**
     * 判断是否存在某个属性
     * @param {*} name 
     * @returns {boolean}
     */
    hasProperty(name){
        return this._properties.has(name);
    }
    /**
     * 删除属性
     * @param {string} name -属性名称, 如果为*则表示删除所有属性 
     * @returns {IProperties}
     */
    removeProperty(name){
        if(!name){
            return this;
        }
        if(name == "*"){
            return this.removeAllProperties();
        }
        this._properties.delete(name);
        this._status.delete(name);
        return this;
    }
    /**
     * 删除一系列属性
     * @param {Array<string>} names -如果第一个 name 为*, 则表示删除所有属性
     * @returns {IProperties}
     */
    removeProperties(...names){
        if(names.length < 1){
            return this;
        }
        if(names[0] == "*"){
            return this.removeAllProperties();
        }
        names.forEach(name=>this.removeProperty(name))
        return this;
    }
    /**
     * 删除所有属性
     * @returns {IProperties}
     */
    removeAllProperties(){
        this._properties = new Map();
        this._status = new Map();
        return this;
    }
    /**
     * 某个属性值是否被改变过
     * @param {*} name 
     * @returns {boolean}
     */
    isPropertyChanged(name){
        return this._status.get(name);
    }
    /**
     * 批量获取属性的 Map
     * @param {*} names -属性名
     * @returns {Map<string, object>}
     * 
     */
    getProperties(...names){
        const props = new Map();
        names.forEach(name=>props.set(name, this.getProperty(name)||null))
        return props;
    }
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
    setProperties(nameValues, nameConvertor=null){ 
        if(!nameValues){
            return this;
        }
        switch(typeof(nameConvertor)){
            case 'function': break;
            case 'string':{
                const prefix = nameConvertor;
                nameConvertor=n=>n.startsWith(prefix)?n.substring(prefix.length):n;
                break;
            }
            default:
                nameConvertor = n=>n;
                break;
        }
        if(nameValues.constructor.name == 'Map'){
            nameValues.forEach((value, key)=>{
                this.setProperty(nameConvertor(key), value);
            })
        }else{
            Object.keys(nameValues).forEach(name=>{
                this.setProperty(nameConvertor(name), nameValues[name]);
            })
        }
        return this;
    }
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
    addListener(names, callback){ 
        if(!callback){
            if(typeof(names) == 'function'){
                callback = names;
                names = "*";
            }else{
                return {remove(){}};
            }
        }
        const props = Array.isArray(names)?names:(names?[names]:null);
        if(!props || props.length < 1 || !props[0]){
            return {remove(){}};
        }
        const listener = {props, isAny:props[0]=="*", callback}
        this._listeners.add(listener);
        const self = this;
        return {
            remove(){
                self._listeners.delete(listener);
            }
        }
    }
 
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
    notifyPropertiesChanged(...names){
        if(this._listeners.size < 1){
            return this;
        }
        const props = (names.length < 1 || names[0] == "*")?this._properties.keys():names;
        let tempProps = [...props];
        const changed = tempProps.filter(p=>this.isPropertyChanged(p));
        changed.forEach(p=>this._status.delete(p))
        return this.triggerListeners(...changed);
    }
    /**
     * 强制触发属性相关事件,但不会检查相关属性是否已经改变
     * @param {*} names -如果names[0]=="*"则表示触发所有的事件
     * @returns {IProperties}
     */
    triggerListeners(...names){
        if(this._listeners.size < 1 || names.length < 1){
            return this;
        }
        const isAll = names[0] == "*";
        setImmediate(()=>{
            this._listeners.forEach(({props, isAny, callback})=>{
                if(isAll || isAny || props.find(p=>names.indexOf(p)>=0)){
                    callback(this, {
                        getChangeProps(){
                            let changeProps = [];
                            if(isAll){
                                if(isAny){
                                    changeProps = [...this._properties];
                                }else{
                                    changeProps = props;
                                }
                            }else{
                                if(isAny){
                                    changeProps = names;
                                }else{
                                    props.forEach((p)=>{
                                        names.indexOf(p) >= 0 ? changeProps.push(p):null;
                                    })
                                }
                            }
                            return changeProps;
                        }
                    });
                }
            })
        },0);
        return this;
    }
    /**
     * 删除属性相关的事件
     * @param {*} names -属性名, 如果 names[0] == "*", 表示删除所有事件监听
     * @returns {IProperties}
     * 
     */
    removeListeners(...names){
        if(names.length < 1){
            return this;
        }
        if(names[0] == "*"){
            return this.removeAllListeners();
        }
        const needRemove = new Set();
        this._listeners.forEach(listener=>{
            const {props, isAny} = listener;
            if(isAny)return;
            listener.props = props.filter(p=>names.indexOf(p)<0);
            if(listener.props.length < 1){
                needRemove.add(listener);
            }
        });
        needRemove.forEach(listener=>this._listeners.remove(listener));
        return this;
    }
    /**
     * 删除所有的事件监听
     * @returns {IProperties}
     */
    removeAllListeners(){
        this._listeners = new Set();
        return this;
    }
    /**
     * 清除缓存并删除所有的事件监听
     * @returns {IProperties}
     */
    clear(){
        return this.removeAllListeners().removeAllProperties();
    }
 }
/**
 * 创建一个新的属性缓存对象
 * @static
 */
 export const createProperties = ()=>{
    const ps =  new IProperties();
    ps._properties = new Map();
    ps._status = new Map();
    ps._listeners = new Set();
    return ps;
 }
/**
 * 根设备属性缓存对象
 * @static
 */
export const RootDeviceProperties = createProperties();
export default RootDeviceProperties;