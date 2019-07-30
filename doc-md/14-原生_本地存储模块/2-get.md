<a name="module_miot/host/storage.get"></a>

## .get(key) ⇒ <code>\*</code>
获取一个key 保存的字符串，如果已经调用 set 则返回对应的值，未调用 set 则返回空字串 ''
如果value已过期，则会reject

**Kind**: static function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

**Example**  
```js
import {Host} from 'miot'
...
var value = await Host.storage.get('prop1')
//or
Host.storage.get('prpp1')
.then(val => {
 //load val success}
 console.log('load value:', val)
)
.catch(err => {
 //load val error 
 if (err === 'expired') {console.log('value for key already expired')}
})
...
```
