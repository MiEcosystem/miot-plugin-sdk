<a name="module_miot/host/file.writeFile"></a>

## .writeFile(fileName, utf8Content) ⇒ <code>Promise</code>
写文件

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |
| utf8Content | <code>string</code> | 文件内容字符串 |

**Example**  
```js
import {Host} from 'miot'
...
Host.filewriteFile('name', 'content').then(_ =>{
 //写入成功
 console.log('write success')
})
...
```
