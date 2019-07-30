<a name="module_miot/Bluetooth--module.exports.createBluetoothClassic"></a>

## .createBluetoothClassic(macOrPeripheralID) ⇒ <code>IBluetoothClassic</code>
创建经典蓝牙设备

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| macOrPeripheralID | <code>string</code> | - iOS传 peripheralUUID, android 传 mac |

**Example**  
```js
import Bluetooth from 'miot/Bluetooth'
  const bludtoothClassic = Bluetooth.createBluetoothClassic("a.b.c...")
```
