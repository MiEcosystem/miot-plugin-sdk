<a name="module_miot/Device--module.exports..IDevice+getBluetoothLE"></a>

## .getBluetoothLE(peripheralID) ⇒ <code>IBluetoothLE</code>
获取小米BLE蓝牙控制类, 
注意: 在 iOS 平台上, 如果没有指定peripheralID, 则须先执行Bluetooth.scan(), 
扫描到与device.mac匹配的蓝牙设备之后才能 connect 成功, 否则将不能成功执行后来的所有操作.

**Kind**: instance function  
**See**: [module:miot/Bluetooth](module:miot/Bluetooth)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| peripheralID | <code>string</code> | <code>null</code> | - iOS平台上可以直接指定与设备 mac 匹配的peripheralID, android 平台不需要此参数 |

**Example**  
```js
const peripheralUUID4IOS = ...;

Device.getBluetoothLE(peripheralUUID4IOS).connect()
.then(ble=>{
     ble....
})
.catch(error=>{

})
```
