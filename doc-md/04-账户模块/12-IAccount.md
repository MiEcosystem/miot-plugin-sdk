<a name="module_miot/Account..IAccount"></a>

## ~IAccount
用户信息属性与方法说明

**Kind**: inner interface  
**Example**  
```js
import {Service} from 'miot'
...
console.log(Service.account.ID)
if (Service.account.isLoaded) {
 console.log(Service.account.nickName)
}else {
 Service.account.load().then(account=>{
     console.log(Service.account.nickName)
     ...
 })
}
...
```
