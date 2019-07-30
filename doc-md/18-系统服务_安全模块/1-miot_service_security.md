<a name="module_miot/service/security"></a>

## miot/service/security
安全相关服务

  
**Example**  
```js
import {Service} from 'miot'

Service.security.shareSecureKey(deviceID, shareUid, {})
 .then(secureKey=>{
    ...
 })

Service.security.loadSecureKeys(deviceID).then(secureKeys=>{
   if(secureKeys.length > 0){
      const key = secureKeys[0];
      key.status = 1;
      key.save().then(key=>{...})
   }
})
```
