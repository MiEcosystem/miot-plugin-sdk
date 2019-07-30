<a name="module_miot/Bluetooth--module.exports.IBluetoothLock+encryptMessage"></a>

## .encryptMessage(message) ⇒ <code>Promise.&lt;string&gt;</code>
支持小米加密芯片的蓝牙设备，使用此方法将明文加密为密文后，可发送给设备

**Kind**: instance function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | 明文 |

**Example**  
```js
import {Bluetooth} from 'miot'
...
Bluetooth.createBluetoothLE(...).securityLock.encryptMessage('message')
 .then(msg => {console.log('encrypted message is ', msg)})
 .catch(err => {console.log('encrypted message failed, ', err})
...
```
