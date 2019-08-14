<a name="module_miot/host/file.uploadFile"></a>

## .uploadFile(params) ⇒ <code>Promise</code>
上传文件

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>UploadParams</code> | 参数字典 |

**Example**  
```js
import {Host} from 'miot'
...
let params = {
 uploadUrl: 'http://127.0.0.1:3000',
 method: 'POST', // default 'POST',support 'POST' and 'PUT'
 headers: {
     'Accept': 'application/json',
 },
 fields: {
     'hello': 'world',
 },
 files: [
     {
         fileName: 'fileName.png', // 只能上传插件sandbox里的文件
     },
 ]
};
Host.file.uploadFile(params).then(res => {
 console.log('upload success with res:', res)
}).catch(err => {
 console.log('upload failed with err:', err)
})
...
```
