<a name="module_miot/Bluetooth--module.exports.retrievePeripheralsForIOS"></a>

## .retrievePeripheralsForIOS(...UUIDs) ⇒ <code>Promise.&lt;Map.&lt;uuid, Bluetooth&gt;&gt;</code>
iOS 平台获取已连接 BLE Peripheral，适用于可穿戴长连接设备
对应 coreBLuetooth 中 retrievePeripheralsWithIdentifiers:(NSArray<NSUUID *> *)identifiers 方法

**Kind**: static function  
**Returns**: <code>Promise.&lt;Map.&lt;uuid, Bluetooth&gt;&gt;</code> - //@mark ios done  

| Param | Type | Description |
| --- | --- | --- |
| ...UUIDs | <code>string</code> | Peripheral UUIDs |

**Example**  
```js
Bluetooth.retrievePeripheralsForIOS("PeripheralUUID1","PeripheralUUID2","PeripheralUUID3")
```
