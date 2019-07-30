<a name="module_miot/Device--module.exports..IDevice+getSubDevices"></a>

## .getSubDevices() ⇒ <code>Promise.&lt;Array.&lt;IDevice&gt;&gt;</code>
获取子设备列表，一般网关才会有子设备

**Kind**: instance function  
**Since**: 10004  
**Example**  
```js
import 'Device' from 'miot'
Device.getSubDevices()
.then(devices => {//get device list})
```
