<a name="module_miot/host/file.readFileToHexString"></a>

## .readFileToHexString(fileName) ⇒ <code>Promise</code>
读本地文件

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |

**Example**  
```js
import {Host} from 'miot'
...
Host.filereadFileToHexString('name').then(content =>{
 console.log('file content:', content)
})
```
