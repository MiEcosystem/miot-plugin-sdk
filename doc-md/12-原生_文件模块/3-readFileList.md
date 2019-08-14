<a name="module_miot/host/file.readFileList"></a>

## .readFileList() ⇒ <code>Promise</code>
读取沙盒内文件列表
* @param {string} subFolder 读取沙盒文件夹下某子文件夹中文件内容，用于解压缩文件中带有文件夹，或者读取指定文件夹解压后的文件,标准path结构，不以'/'开头

**Kind**: static function  
**Example**  
```js
import {Host} from 'miot'
...
Host.file.readFileList().then(res => {
 console.log('read fiel list:', res)
})

Host.file.readFileList('mysubfolder/aaa').then(res => {
 console.log('read fiel list:', res)
})
```
