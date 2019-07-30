<a name="module_miot/host/file.appendFileThroughBase64"></a>

## .appendFileThroughBase64(fileName, base64Content) ⇒ <code>Promise</code>
向已存在的文件追加内容，输入为base64编码字符串

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |
| base64Content | <code>string</code> | base64编码后的文件内容字符串 |

**Example**  
```js
import {Host} from 'miot'
...
Host.fileappendFileThroughBase64('name', 'base64').then(_ =>{
 //写入成功
 console.log('write success')
})
...
```
