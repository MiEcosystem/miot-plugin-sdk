<a name="module_miot/device/bluetooth/blespec"></a>

## miot/device/bluetooth/blespec
该模块主要用于ble直连spec相关能力，相关使用demo见com.xiaomi.bledemo.

**Doc_name**: ble直连spec  
**Doc_index**: 6  
**Doc_directory**: bluetooth  

* [miot/device/bluetooth/blespec](#module_miot/device/bluetooth/blespec)
    * [~BleSpec](#module_miot/device/bluetooth/blespec..BleSpec)
        * [.setPropertiesValue(mac, json)](#module_miot/device/bluetooth/blespec..BleSpec+setPropertiesValue)
        * [.getPropertiesValue(mac, json)](#module_miot/device/bluetooth/blespec..BleSpec+getPropertiesValue)
        * [.doAction(mac, json)](#module_miot/device/bluetooth/blespec..BleSpec+doAction)

<a name="module_miot/device/bluetooth/blespec..BleSpec"></a>

### miot/device/bluetooth/blespec~BleSpec
**Kind**: inner interface of [<code>miot/device/bluetooth/blespec</code>](#module_miot/device/bluetooth/blespec)  

* [~BleSpec](#module_miot/device/bluetooth/blespec..BleSpec)
    * [.setPropertiesValue(mac, json)](#module_miot/device/bluetooth/blespec..BleSpec+setPropertiesValue)
    * [.getPropertiesValue(mac, json)](#module_miot/device/bluetooth/blespec..BleSpec+getPropertiesValue)
    * [.doAction(mac, json)](#module_miot/device/bluetooth/blespec..BleSpec+doAction)

<a name="module_miot/device/bluetooth/blespec..BleSpec+setPropertiesValue"></a>

#### bleSpec.setPropertiesValue(mac, json)
ble直连spec：设置property，调用前确保已连接蓝牙连接。

**Kind**: instance method of [<code>BleSpec</code>](#module_miot/device/bluetooth/blespec..BleSpec)  
**Since**: 10040  

| Param | Type | Description |
| --- | --- | --- |
| mac | <code>string</code> | 蓝牙设备的Mac地址，iOS设备传uuid |
| json | <code>string</code> | json格式：{objects[]{siid/piid/value/type}}，type是number类型：其值用来标识value的值类型，取值如下： bool：0，uint8：1，int8：2，uint16：3，int16：4，uint32：5，int32：6，uint64：7，int64：8，float：9，string：10 ； |

**Example**  
```js
import {Bluetooth} from 'miot';

let mac= 'aa:bb:cc:dd:ee:ff';
let data= {objects:[{siid:1,piid:2,value:'abc',type:10}]};
data = JSON.stringify(data);
Bluetooth.spec.setPropertiesValue(mac,data)
         .then(res=>console.log(JSON.stringify(res)))
         .catch(err=>console.log(JSON.stringify(err))
```
<a name="module_miot/device/bluetooth/blespec..BleSpec+getPropertiesValue"></a>

#### bleSpec.getPropertiesValue(mac, json)
ble直连spec：读property，调用前确保已连接蓝牙连接。

**Kind**: instance method of [<code>BleSpec</code>](#module_miot/device/bluetooth/blespec..BleSpec)  
**Since**: 10040  

| Param | Type | Description |
| --- | --- | --- |
| mac | <code>string</code> | 蓝牙设备的Mac地址，iOS设备传uuid |
| json | <code>string</code> | json格式：{objects[]{siid/piid}} |

**Example**  
```js
import {Bluetooth} from 'miot';

let mac= 'aa:bb:cc:dd:ee:ff';
let data= {objects:[{siid:1,piid:2}]};
data = JSON.stringify(data);
Bluetooth.spec.getPropertiesValue(mac,data)
         .then(res=>console.log(JSON.stringify(res)))
         .catch(err=>console.log(JSON.stringify(err))
```
<a name="module_miot/device/bluetooth/blespec..BleSpec+doAction"></a>

#### bleSpec.doAction(mac, json)
ble直连spec：doAction，调用前确保已连接蓝牙连接。

**Kind**: instance method of [<code>BleSpec</code>](#module_miot/device/bluetooth/blespec..BleSpec)  
**Since**: 10040  

| Param | Type | Description |
| --- | --- | --- |
| mac | <code>string</code> | 蓝牙设备的Mac地址，iOS设备传uuid |
| json | <code>string</code> | json格式：{siid,aiid,objects[]{piid/value/type} }，type是number类型：其值用来标识value的值类型，取值如下： bool：0，uint8：1，int8：2，uint16：3，int16：4，uint32：5，int32：6，uint64：7，int64：8，float：9，string：10 ； |

**Example**  
```js
import {Bluetooth} from 'miot';

let mac= 'aa:bb:cc:dd:ee:ff';
let data= {siid:1,aiid:2,objects:[{piid:2,value:'abc',type:10}]};
data = JSON.stringify(data);
Bluetooth.spec.doAction(mac,data)
         .then(res=>console.log(JSON.stringify(res)))
         .catch(err=>console.log(JSON.stringify(err))
```
