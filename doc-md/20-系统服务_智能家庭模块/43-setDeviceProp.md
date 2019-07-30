<a name="module_miot/service/smarthome.setDeviceProp"></a>

## .setDeviceProp(params)
设置设备属性，e.g 配置摄像头/门铃设备的属性
props最多20个, 属性需要以"prop.s_"开头。

error code: 
0 - 成功
-7 - 没有找到注册的设备
-6 - 设备对应uid不为0 
-4 - server err

**Kind**: static function  
**Since**: 10004  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | 参数 |
| params.did | <code>string</code> | did |
| params.props | <code>object</code> | props 键值对， 属性需要以"prop.s_"开头 |

**Example**  
```js
let params = {'did':Device.deviceID, 'props': {   
 "prop.s_notify_screen_dev_enable":"0", //0,关； 1，开   
 "prop.s_notify_screen_dev_did":"123456789" // 接收rpc的音响设备  
}}   
Service.smarthome.setDeviceProp(params).then(...)
```
