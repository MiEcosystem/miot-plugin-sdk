<a name="module_miot/service/spec"></a>

## miot/service/spec
MIOT Spec 获取 设置 property  调用 action

**Export**: public  
**Doc_name**: 系统服务_miot_spec  
**Doc_index**: 19  

* [miot/service/spec](#module_miot/service/spec)
    * [.getPropertiesValue(params)](#module_miot/service/spec.getPropertiesValue) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setPropertiesValue(params)](#module_miot/service/spec.setPropertiesValue) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.doAction(params)](#module_miot/service/spec.doAction) ⇒ <code>Promise.&lt;JSON&gt;</code>
    * [.getSpecString(did)](#module_miot/service/spec.getSpecString) ⇒ <code>Promise.&lt;JSON&gt;</code>
    * [.getCurrentSpecValue(did)](#module_miot/service/spec.getCurrentSpecValue) ⇒

<a name="module_miot/service/spec.getPropertiesValue"></a>

### miot/service/spec.getPropertiesValue(params) ⇒ <code>Promise.&lt;string&gt;</code>
请求获取设备的属性值,获取成功后可以通过 ISpecProperty.value 或者 ISpecProperty.getValue 获取

**Kind**: static method of [<code>miot/service/spec</code>](#module_miot/service/spec)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Array</code> | [{did: 1, siid: 1, piid: 1},{did: 1, siid:2, piid: 3}] |

<a name="module_miot/service/spec.setPropertiesValue"></a>

### miot/service/spec.setPropertiesValue(params) ⇒ <code>Promise.&lt;string&gt;</code>
请求设置设备的属性值，设置成功后会更新 Native

**Kind**: static method of [<code>miot/service/spec</code>](#module_miot/service/spec)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Array</code> | [{did: 1, siid: 1, piid: 1, value:'any'},{did: 1, siid:2, piid: 3, value: 'any'}] |

<a name="module_miot/service/spec.doAction"></a>

### miot/service/spec.doAction(params) ⇒ <code>Promise.&lt;JSON&gt;</code>
请求调用设备的方法

**Kind**: static method of [<code>miot/service/spec</code>](#module_miot/service/spec)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>JSON</code> | {did: action.did, siid: action.siid, aiid: action.iid, in: action.params} |

<a name="module_miot/service/spec.getSpecString"></a>

### miot/service/spec.getSpecString(did) ⇒ <code>Promise.&lt;JSON&gt;</code>
**Kind**: static method of [<code>miot/service/spec</code>](#module_miot/service/spec)  
**Returns**: <code>Promise.&lt;JSON&gt;</code> - 设备的Spec属性详情  

| Param | Description |
| --- | --- |
| did | 设备的did |

<a name="module_miot/service/spec.getCurrentSpecValue"></a>

### miot/service/spec.getCurrentSpecValue(did) ⇒
刚进入插件时，如果需要获取native缓存的设备的miot-spec数据，则调用此方法获取
注意调用方法的时候，方法要加上async
使用方式：let data = await Service.spec.getCurrentSpecValue(did);

**Kind**: static method of [<code>miot/service/spec</code>](#module_miot/service/spec)  
**Returns**: 缓存的设备的miotSpec属性，返回值同上面的getPropertiesValue方法。此方法只返回code为0（get成功）的数据  
**Since**: 10003  

| Param | Description |
| --- | --- |
| did | 设备的did，必传 |

