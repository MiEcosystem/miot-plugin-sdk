<a name="module_miot/Device--module.exports..IDevice+changeDeviceName"></a>

## .changeDeviceName(newName, did) ⇒ <code>Promise</code>
修改设备/子设备的名字，注意不支持蓝牙网关对子设备名称的修改

**Kind**: instance function  
**Returns**: <code>Promise</code> - 成功进入then，失败进入catch，成功时，res为新名称。同时，DeviceEvent的deviceNameChanged会被触发  
**Since**: 10022  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| newName | <code>String</code> |  | 设备的新的名称 |
| did | <code>String</code> | <code></code> | 如果修改自身的名称，可不传，如果修改子设备的，则需要传子设备的did。如果did是其他，调用此方法会走reject |

