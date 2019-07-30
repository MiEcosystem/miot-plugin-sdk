<a name="module_miot/host/file.deleteFile"></a>

## .deleteFile(fileName) ⇒ <code>Promise</code>
删除文件

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |

**Example**  
```js
import {Host} from 'miot'
...
Host.filedeleteFile('name').then(_ =>{
 console.log('delete success')
})
...
```
