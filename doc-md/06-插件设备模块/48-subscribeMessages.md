<a name="module_miot/Device--module.exports.IDeviceWifi+subscribeMessages"></a>

## .subscribeMessages(...propertyOrEventNames) ⇒ <code>Promise.&lt;EventSubscription&gt;</code>
订阅设备消息

**Kind**: instance function  

| Param | Type | Description |
| --- | --- | --- |
| ...propertyOrEventNames | <code>string</code> | 在开发平台上声明的 prop 与 event 名，注意消息格式为：prop.xxxxx 或者 event.xxxxx ，表示订阅的是设备的属性变化，还是设备的事件响应.如果是miot-spec设备。则为prop.siid.piid，event.siid.eiid |

**Example**  
```js
import {Device, DeviceEvent} from 'miot'
...
//监听 属性变化和事件响应
const listener = DeviceEvent.deviceReceivedMessages.addListener(
(device, messages)=>{
 if(messages.has('prop.color')){
   console.log('获取到属性变化：',messages.get('prop.color'));
    ...
 } else if (messages.has('event.powerOn')){
   console.log('获取到事件响应：',messages.get('event.powerOn'));
   ...
 }
 ...
})
...
  //添加订阅：属性变更和事件响应
let msgSubscription = null;
Device.getDeviceWifi().subscribeMessages('prop.color','event.powerOn')
.then(subcription => {
   //call this when you need to unsubscribe the message
  msgSubscription = subcription;
})
.catch(() => console.log('subscribe failed'))
...

...
//unsubscribe the props
msgSubscription&&msgSubscription.remove();
listener&&listener.remove();
```
