<a name="module_miot/Service"></a>

## miot/Service
系统服务模块，提供了设备，红外，场景，安全，存储，miot-spec协议，账号等子服务模块

  
**Example**  
```js
import {Service} from 'miot'

Service.getServerName().then(res=>{...})
Service.getUTCTimeFromServer().then(...)

Service.smarthome.reportGPSInfo(...).then(...)

Service.account.ID
Serivce.account.nickName
Service.account.avatar
Service.account.load().then(account=>{})

Service.scene.loadTimerScenes(...).then(scenes=>{})
Service.security.loadSecureKeys(...).then(keys=>{
...
})

Service.storage.getUserConfigs(key).then()
```
