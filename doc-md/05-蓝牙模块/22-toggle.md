<a name="module_miot/Bluetooth--module.exports.IBluetoothLock+toggle"></a>

## .toggle(cmd, timeout) ⇒ <code>Promise.&lt;IBluetoothLock&gt;</code>
支持小米加密芯片的蓝牙设备，开关蓝牙锁

**Kind**: instance function  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>int</code> | 操作命令可传入 0 ，1 ，2三个 int 值，分别代表 开锁，上锁，反锁 |
| timeout | <code>int</code> | 毫秒 蓝牙未响应的超时时间 |

**Example**  
```js
import {Bluetooth} from 'miot'
...
Bluetooth.createBluetoothLE(...).connect(...).then(device => {
 device.securityLock.toggle(0,5000)
     .then(lock => {console.log('toggle success')})
     .catch(err => {console.log('toggle failed'})
})
...
```
