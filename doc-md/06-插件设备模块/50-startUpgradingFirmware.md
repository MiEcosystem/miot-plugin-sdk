<a name="module_miot/Device--module.exports.IDeviceWifi+startUpgradingFirmware"></a>

## .startUpgradingFirmware() ⇒ <code>Promise.&lt;DeviceVersion&gt;</code>
升级设备固件.可以和Service.smarthome.getAvailableFirmwareForDids搭配使用，先检查是否有可用版本，如果有，展示信息给用户，让用户确认，或者直接升级。
/home/devupgrade

**Kind**: instance function  
**Example**  
```js
Device.getDeviceWifi().startUpgradingFirmware()
 .then(res => console.log('success:', res))
 .catch(err => console.log('failed:', err))
```
