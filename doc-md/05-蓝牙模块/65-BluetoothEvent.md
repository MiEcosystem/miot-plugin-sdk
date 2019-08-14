<a name="module_miot/Bluetooth--module.exports..BluetoothEvent"></a>

## ~BluetoothEvent : <code>object</code>
蓝牙事件名集合

**Kind**: inner namespace  
**Example**  
```js
import {BluetoothEvent} from 'miot'
   const subscription = BluetoothEvent.bluetoothServiceDiscovered.addListener(
      (bluetooth, ...services)=>{
         ...
      }
    )
   ...
   subscription.remove()
   ...
```
