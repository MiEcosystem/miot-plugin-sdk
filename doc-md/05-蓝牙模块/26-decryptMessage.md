<a name="module_miot/Bluetooth--module.exports.IBluetoothLock+decryptMessage"></a>

## .decryptMessage(encrypted) ⇒ <code>Promise.&lt;string&gt;</code>
支持小米加密芯片的蓝牙设备，使用此方法将密文解密为明文

**Kind**: instance function  

| Param | Type | Description |
| --- | --- | --- |
| encrypted | <code>string</code> | 密文 |

**Example**  
```js
import {Bluetooth} from 'miot'
...
Bluetooth.createBluetoothLE(...).securityLock.encryptMessage('decryptedMessage')
 .then(msg => {console.log('decrypt message is ', msg)})
 .catch(err => {console.log('decrypt message failed, ', err})
...
```
