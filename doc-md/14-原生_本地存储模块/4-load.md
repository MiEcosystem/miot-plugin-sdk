<a name="module_miot/host/storage.load"></a>

## .load(keys) ⇒ <code>promise.&lt;Array.&lt;json&gt;&gt;</code>
获取所有 keys 的 values

**Kind**: static function  
**Returns**: <code>promise.&lt;Array.&lt;json&gt;&gt;</code> - 返回的promise传出的值是values数组，和传入的keys对应 [{key,value}]  

| Param | Type |
| --- | --- |
| keys | <code>array</code> | 

**Example**  
```js
import {Host} from 'miot'
...
Host.storage.load(['key1','key2']).then(res => console.log('success'))
...
```
