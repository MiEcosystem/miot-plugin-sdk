<a name="module_miot/Bluetooth--module.exports.IBluetoothLock+isShareKeyValid"></a>

## .isShareKeyValid() ⇒ <code>Promise.&lt;IBluetoothLock&gt;</code>
支持小米加密芯片的蓝牙设备，在被分享的设备中，调用此方法，可判断分享的电子钥匙是否有效

**Kind**: instance function  
**Example**  
```js
import {Bluetooth} from 'miot'
...
Bluetooth.createBluetoothLE(...).securityLock.isShareKeyValid()
 .then(lock => {console.log('ShareKey is valid')})
 .catch(err => {console.log('ShareKey isn't valid'})
...
```
