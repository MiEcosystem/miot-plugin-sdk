<a name="module_miot/host/file.dataLengthOfBase64Data"></a>

## .dataLengthOfBase64Data(base64Data) ⇒ <code>Promise</code>
获取 base64 编码的数据长度

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| base64Data | <code>string</code> | base64 编码的字符串 |

**Example**  
```js
import {Host} from 'miot'
...
let len = await Host.file.dataLengthOfBase64Data('data')
//or
Host.file.dataLengthOfBase64Data('data').then(len => console.log('len:', len))
...
```
