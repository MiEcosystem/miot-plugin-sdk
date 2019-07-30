<a name="module_miot/Bluetooth--module.exports.createBluetoothLE"></a>

## .createBluetoothLE(macOrPeripheralID) ⇒ <code>IBluetoothLE</code>
创建BLE蓝牙设备,

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| macOrPeripheralID | <code>string</code> | - iOS传 peripheralUUID, android 传 mac |

**Example**  
```js
import Bluetooth from 'miot/Bluetooth'
  const ble = Bluetooth.createBluetoothLE("a.b.c...")
```
