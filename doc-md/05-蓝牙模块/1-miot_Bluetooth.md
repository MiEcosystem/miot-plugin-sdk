<a name="module_miot/Bluetooth"></a>

## miot/Bluetooth
蓝牙设备操作类

  
**Example**  
```js
import {Device} from 'miot'

const ble = Device.getBluetoothLE();
ble.connect().then(ble=>{

 ble.startDiscoverServices("a-b-c-d-e", ...)
  ...
});

...
ble.getService("a-b-c-d-e").startDiscoverCharacteristics("1-2-3-4-5",...)

...
const charac = ble.getService('...').getCharacteristic('...')
charac.setNotify().then(characteristic=>{}).catch(err=>{});
charac.read().then(characteristic=>{characteristic.value ... }).catch(err=>{});
charac.write().then(characteristic=>{}).catch(err=>{})

...

ble.disconnect()
```
