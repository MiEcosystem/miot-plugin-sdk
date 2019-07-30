<a name="module_miot/service/smarthome.batchGetDeviceDatas"></a>

## .batchGetDeviceDatas(params) ⇒ <code>Promise</code>
获取设备的属性，属性设置会在设备被删除时清空
api call /device/batchdevicedatas

error code: 
0 - 成功
-7 - 没有找到注册的设备
-6 - 设备对应uid不为0 
-4 - server err

**Kind**: static function  
**Since**: 10005  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Array.&lt;object&gt;</code> | 参数 |
| params[].did | <code>string</code> | did |
| params[].props | <code>Array.&lt;string&gt;</code> | props 列表,属性需要以"prop.s_"开头 e.g ["prop.s_aaa","prop.s_bbb"] |

**Example**  
```js
let params = {'did':Device.deviceID, 'props': [   
 "prop.s_push_switch"
]}   
Service.smarthome.batchGetDeviceDatas([params]).then(...)
```
