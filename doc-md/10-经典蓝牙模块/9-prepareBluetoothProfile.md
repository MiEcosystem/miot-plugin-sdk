<a name="module_miot/ClassicBluetooth.prepareBluetoothProfile"></a>

## .prepareBluetoothProfile(profile) ⇒ <code>Promise.&lt;any&gt;</code>
事先准备要需要的BluetoothProfile, 具体的类型是profile, 具体的数值参考Android Api: BluetoothProfile.HEADSET，BluetoothProfile.A2DP
HEADSET = 1;A2DP = 2;HEALTH = 3;

**Kind**: static function  
**Returns**: <code>Promise.&lt;any&gt;</code> - 成功进入then, 返回对应的profile，失败进入catch  
**Since**: 10023  

| Param | Type |
| --- | --- |
| profile | <code>int</code> | 

