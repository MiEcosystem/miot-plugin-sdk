<a name="module_miot/ClassicBluetooth.connectBluetoothProfile"></a>

## .connectBluetoothProfile(macAddress, profile) ⇒ <code>Promise.&lt;any&gt;</code>
连接类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务

**Kind**: static function  
**Returns**: <code>Promise.&lt;any&gt;</code> - 成功进入then, 返回值没有实际作用，失败进入catch  
**Since**: 10023  

| Param | Type | Description |
| --- | --- | --- |
| macAddress | <code>string</code> | 需要查询的设备macAddress |
| profile | <code>int</code> | BluetoothProfile 接口类的类型（ BluetoothProfile.HEADSET，BluetoothProfile.A2DP等） |

