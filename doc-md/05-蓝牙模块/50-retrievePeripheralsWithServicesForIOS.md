<a name="module_miot/Bluetooth--module.exports.retrievePeripheralsWithServicesForIOS"></a>

## .retrievePeripheralsWithServicesForIOS(...serviceUUIDs) ⇒ <code>Promise.&lt;Map.&lt;uuid, Bluetooth&gt;&gt;</code>
iOS 平台通过 serviceUUID 获取已连接 BLE Peripheral，适用于可穿戴长连接设备
对应 coreBLuetooth 中 retrieveConnectedPeripheralsWithServices:(NSArray<CBUUID *> *)serviceUUIDs 方法

**Kind**: static function  
**Returns**: <code>Promise.&lt;Map.&lt;uuid, Bluetooth&gt;&gt;</code> - //@mark ios done  

| Param | Type | Description |
| --- | --- | --- |
| ...serviceUUIDs | <code>string</code> | Peripheral  serviceUUIDs |

**Example**  
```js
Bluetooth.retrievePeripheralsWithServicesForIOS("serviceUUID1","serviceUUID2","serviceUUID3")
```
