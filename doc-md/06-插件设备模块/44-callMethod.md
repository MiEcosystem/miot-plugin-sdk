<a name="module_miot/Device--module.exports.IDeviceWifi+callMethod"></a>

## .callMethod(method, args, extraPayload) ⇒ <code>Promise.&lt;json&gt;</code>
调用设备方法
若与设备通信处于同一个 wifi 下会使用局域网传输数据，如果不在同一个 wifi 下由米家服务器转发请求

**Kind**: instance function  
**Returns**: <code>Promise.&lt;json&gt;</code> - {code:0,result:{},id:""}  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | 方法名 |
| args | <code>json</code> | 参数 |
| extraPayload | <code>json</code> | 额外参数，根据设备需求设定。在payload数据中设置额外参数 |

**Example**  
```js
Device.getDeviceWifi().callMethod('getProps', [prop1,prop2])
 .then(res => console.log('success:', res))
 .catch(err => console.error('failed:', err))
//对应payload参考：
//{'method': 'getProps', 'params':[prop1,prop2]}

Device.getDeviceWifi().callMethod('getProps', [prop1,prop2], {sid:Device.deviceID, 'key1':'xxxx'})
 .then(res => console.log('success:', res))
 .catch(err => console.error('failed:', err))
//对应payload参考：
//{'method': 'getProps', 'params':[prop1,prop2], 'sid':'xxxxx', 'key1': 'xxxx'}
```
