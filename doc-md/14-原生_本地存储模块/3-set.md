<a name="module_miot/host/storage.set"></a>

## .set(key, val, [opt]) ⇒ <code>void</code>
和 get 相对应，持久化一个 key=value 的数据

**Kind**: static function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | 获取 value 时传入的唯一标识 |
| val | <code>object</code> |  | 要保存的数据 |
| [opt] | <code>object</code> | <code>{ expire: 0 }</code> | opt.expire 有效期 从保存的时候开始 expire ms以内数据有效。 |

**Example**  
```js
import {Host} from 'miot'
...
Host.storage.set('key1','value1')
//or
Host.storage.set('key1','value1', {expire:3600})
...
```
