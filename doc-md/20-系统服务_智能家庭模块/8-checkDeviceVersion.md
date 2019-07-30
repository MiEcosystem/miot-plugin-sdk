<a name="module_miot/service/smarthome.checkDeviceVersion"></a>

## .checkDeviceVersion(设备did, pid) ⇒ <code>Promise.&lt;DeviceVersion&gt;</code>
获取指定设备的新版本信息
/home/checkversion

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| 设备did | <code>string</code> |  |
| pid | <code>number</code> | 设备类型，使用Device.type,即可 |

**Example**  
```js
Device.getDeviceWifi().checkVersion()
 .then(res => console.log('success:', res))
 .catch(err => console.log('failed:', err))
```
