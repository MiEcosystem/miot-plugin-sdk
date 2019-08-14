<a name="module_miot/Device"></a>

## miot/Device
设备相关 API
IDevice 当前设备实例对象，用于获取当前设备属性等
IDeviceWifi 当前设备网络操作实例对象，用于发送设备网络操作请求等
DeviceEvent 当前设备的可订阅事件，用于订阅设备名称状态变化等

  
**Example**  
```js
import {Device} from 'miot'
...
//IDevice
//属性获取
let did = Device.deviceID
let deviceModel = Device.model
//设备方法，e.g 场景创建
let scene = Device.createTimerScene(params)

//IDeviceWifi
//wifi方法 e.g RPC请求
Device.getDeviceWifi().callMethod('method_name', params)
 .then(res => {//here is the success result})
 .catch(err => {//error happened})
...
其余具体使用请参考具体API文档
```
