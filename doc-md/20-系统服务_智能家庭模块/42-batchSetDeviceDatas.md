<a name="module_miot/service/smarthome.batchSetDeviceDatas"></a>

## .batchSetDeviceDatas(params)
设置设备属性, 属性设置会在设备被删除时清空
备注： props最多20个，最多同时300个设备（目前max设备数)，属性需要以prop.s_ 开头

error code: 
0 - 成功
7 - 没有找到注册的设备
6 - 设备对应uid为0 
4 - server err

**Kind**: static function  
**Since**: 10005  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Array.&lt;object&gt;</code> | {did: string, props: json} |
| params[].did | <code>string</code> | did |
| params[].props | <code>object</code> | props 键值对， 属性需要以"prop.s_"开头 |

**Example**  
```js
let params = {'did':Device.deviceID, 'props': {   
 "prop.s_push_switch_xxx":"0"
}}   
Service.smarthome.batchSetDeviceDatas([params]).then(...)
```
