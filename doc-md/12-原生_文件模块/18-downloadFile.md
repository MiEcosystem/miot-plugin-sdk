<a name="module_miot/host/file.downloadFile"></a>

## .downloadFile(url, fileName) ⇒ <code>Promise</code>
下载文件到插件沙盒目录

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | 文件地址 |
| fileName | <code>string</code> | 存储到本地的文件名 |

**Example**  
```js
import {Host} from 'miot'
...
Host.file.downloadFile('url', 'targetName').then(res =>{
 console.log('download success with res:', res)
}).catch(err => {
 console.log('download failed with err:', err)
})
...
```
