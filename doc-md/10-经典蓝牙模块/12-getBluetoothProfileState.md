<a name="module_miot/ClassicBluetooth.getBluetoothProfileState"></a>

## .getBluetoothProfileState(macAddress, profile) ⇒ <code>Promise.&lt;any&gt;</code>
获取类型为profile的BluetoothProfile的当前状态, 返回值有四个选项,参考android api : BluetoothProfile.STATE_DISCONNECTED等
STATE_DISCONNECTED = 0; STATE_CONNECTING = 1;STATE_CONNECTED = 2;TATE_DISCONNECTING = 3;

**Kind**: static function  
**Returns**: <code>Promise.&lt;any&gt;</code> - 成功进入then, 返回值{"state": 0}，失败进入catch  
**Since**: 10023  

| Param | Type |
| --- | --- |
| macAddress | <code>string</code> | 
| profile | <code>int</code> | 

