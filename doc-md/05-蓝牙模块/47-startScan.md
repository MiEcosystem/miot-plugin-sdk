<a name="module_miot/Bluetooth--module.exports.startScan"></a>

## .startScan(durationInMillis, ...serviceUUIDs) ⇒ <code>void</code>
开始扫描蓝牙设备

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| durationInMillis | <code>int</code> | 扫描时长 |
| ...serviceUUIDs | <code>string</code> | 指定扫描, 为空时扫描全部 |

**Example**  
```js
import Bluetooth from 'miot/Bluetooth'
     Bluetooth.startScan(3000, 'FE95','FE96')
```
