<a name="module_miot/Bluetooth--module.exports.IBluetoothLock+getOneTimePassword"></a>

## .getOneTimePassword(interval, digits) ⇒ <code>Promise.&lt;Array.&lt;int&gt;&gt;</code>
支持小米加密芯片的蓝牙设备，获取一次性密码组
假设输入 interval 为 30，则会从当日 0 点开始计算，每 30 分钟为一个刷新间隔。生成的密码在当前刷新间隔及下一个刷新间隔内有效。
如当日 10:19 生成，则该组密码在 10:00 ~ 10:30（当前刷新间隔） 以及 10:30 ~ 11:00 (下一个刷新间隔) 有效。
密码组中每条密码使用一次即过期。
注意设备上获取当前时间（UTC，精度为秒）的准确性由设备保证，否则会有计算误差。

**Kind**: instance function  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>int</code> | 时间间隔，单位为分钟，类型为 number，传入 10 到 60 的整数 |
| digits | <code>int</code> | 密码位数，类型为 number，传入 6 到 8 的整数 |

**Example**  
```js
import {Bluetooth} from 'miot'
...
Bluetooth.createBluetoothLE(...).securityLock.getOneTimePassword(30,6)
 .then(pwd => {console.log('one time password is ', pwd)})
 .catch(err => {console.log('get one time password failed, ', err})
...
```
