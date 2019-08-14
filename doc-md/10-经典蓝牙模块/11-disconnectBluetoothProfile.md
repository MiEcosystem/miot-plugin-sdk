<a name="module_miot/ClassicBluetooth.disconnectBluetoothProfile"></a>

## .disconnectBluetoothProfile(macAddress, profile) ⇒ <code>Promise.&lt;any&gt;</code>
断开类型为profile（比如BluetoothProfile.HEADSET，BluetoothProfile.A2DP) 的蓝牙服务

**Kind**: static function  
**Returns**: <code>Promise.&lt;any&gt;</code> - 成功进入then, 返回值没有实际作用，失败进入catch  
**Since**: 10023  

| Param | Type |
| --- | --- |
| macAddress | <code>string</code> | 
| profile | <code>int</code> | 

