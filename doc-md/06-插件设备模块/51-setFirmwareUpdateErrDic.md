<a name="module_miot/Device--module.exports.IDeviceWifi+setFirmwareUpdateErrDic"></a>

## .setFirmwareUpdateErrDic(message) ⇒
为设备固件升级失败添加自定义的errorCode与错误提示信息的索引
注意 分享过来的设备是无法进行固件升级的，所以此时此方法无效。
Android暂未适配

**Kind**: instance function  
**Returns**: boolean 设置是否成功  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>json</code> | 以errorCode为key，以错误提示信息为value的字典。key和value的数据类型都须是string。 |

**Example**  
```js
let ret = Device.getDeviceWifi().setFirmwareUpdateErrDic({"3":'无法连接'})
```
