<a name="module_miot/Device--module.exports.IDeviceWifi+localPing"></a>

## .localPing() ⇒ <code>Promise.&lt;boolean&gt;</code>
ping 操作 检查设备本地局域网通信是否可用

**Kind**: instance function  
**Example**  
```js
Device.getDeviceWifi().localPing()
 .then(res => console.log('success:', res))
 .catch(err => console.log('failed:', err))
```
