<a name="module_miot/host/file.isFileExists"></a>

## .isFileExists(fileName) ⇒ <code>Promise.&lt;boolean&gt;</code>
判断文件是否存在

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |

**Example**  
```js
import {Host} from 'miot'
...
let fileExist = await Host.file.isFileExists('fileName')
//or
Host.file.isFileExists('fileName').then(res => {
console.log('file exist at path:', res)
}).catch(err => {
// file name error or get file path with error
})
```
