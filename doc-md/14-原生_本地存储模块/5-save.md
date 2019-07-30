<a name="module_miot/host/storage.save"></a>

## .save(keyValues, [opt]) ⇒ <code>void</code>
保存所有 keyValues 的数据，例如{key1:value1 , key2:value2 , key3:value3}
每个 key 可单独更新数据，如果调用 set(key2,value4) 则只更新 key2，key1和 key3的值保持不变

**Kind**: static function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| keyValues | <code>Object</code> |  | 需要存储的数据 |
| [opt] | <code>object</code> | <code>{ expire: 0 }</code> | opt.expire 有效期 从保存的时候开始 expire ms以内数据有效。 |

**Example**  
```js
import {Host} from 'miot'
...
Host.storage.save({'key1':'val1','key2':'val2'})
//or
Host.storage.save({'key1':'val1','key2':'val2'}, {expire:3600})
...
```
