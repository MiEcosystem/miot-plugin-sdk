<a name="module_miot/Account"></a>

## miot/Account
用于获取当前用户信息,通过Service.account获取当前用户对象实例。  
其中Service.account.ID可直接使用，其余属性需要使用Service.account.load().then()来进行获取，可参考下方Example。  
具体的可用属性与方法请参考Interface -> IAccount类API说明。  
IAccount不支持直接创建使用，如需使用请调用：  
Service.account.load().then((info)=>{info 中各个字段才有值}}）)

  
**Example**  
```js
import {Service} from 'miot'
console.log(Service.account.ID)
Service.account.load().then(account=>{
 console.log(Service.account.nickName)
})
```
