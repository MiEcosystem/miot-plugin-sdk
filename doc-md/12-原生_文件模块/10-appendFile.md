<a name="module_miot/host/file.appendFile"></a>

## .appendFile(fileName, utf8Content) ⇒ <code>Promise</code>
向已存在的文件追加内容

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |
| utf8Content | <code>string</code> | 文件内容字符串 |

**Example**  
```js
import {Host} from 'miot'
...
Host.fileappendFile('name', 'base64').then(_ =>{
 //写入成功
 console.log('write success')
})
...
```
