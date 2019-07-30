<a name="module_miot/Device--module.exports.IDeviceWifi+setFirmwareNotCheckUpdate"></a>

## .setFirmwareNotCheckUpdate(notCheck) ⇒ <code>Promise</code>
设置设备控制页不检查固件升级
Android暂未适配

**Kind**: instance function  

| Param | Type | Description |
| --- | --- | --- |
| notCheck | <code>boolean</code> | 是否 不检查更新 true-不自动检查 false-自动检查 |

**Example**  
```js
Device.getDeviceWifi().setFirmwareNotCheckUpdate(true|false)
 .then(res => console.log('success:', res))
 .catch(err => console.log('failed:', err))
```
