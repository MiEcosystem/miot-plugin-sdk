<a name="module_miot/host/file.writeFileThroughBase64"></a>

## .writeFileThroughBase64(fileName, base64Content) ⇒ <code>Promise</code>
写文件，输入为 Base64 编码字符串

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 文件名, 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |
| base64Content | <code>string</code> | base64编码后的文件内容字符串 |

**Example**  
```js
import {Host} from 'miot'
...
Host.filewriteFileThroughBase64('name', 'base64').then(_ =>{
 //写入成功
 console.log('write success')
})
...
```
