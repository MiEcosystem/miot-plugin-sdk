<a name="module_miot/Device--module.exports..DeviceEvent.event_deviceReceivedMessages"></a>

## "deviceReceivedMessages" (device, messages, originData)
设备消息

**Kind**: event emitted  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>IDevice</code> |  |
| messages | <code>Map.&lt;string, object&gt;</code> | 接收到的数据 |
| originData | <code>array</code> | 接收到的数据, [{key,time,value}] |

**Example**  
```js
import {Device, DeviceEvent} from 'miot'

let msgSubscription = null;
Device.getDeviceWifi().subscribeMessages("prop.power", "event.something").then(subcription=>{
     msgSubscription = subcription;
});
...
const subscription = DeviceEvent.deviceReceivedMessages.addListener(
(device, messages)=>{
  if(messages.has('prop.power')){
     const power = messages.get('prop.power');
     ...
  }
  ...
})
...

msgSubscription&&msgSubscription.remove();
```
