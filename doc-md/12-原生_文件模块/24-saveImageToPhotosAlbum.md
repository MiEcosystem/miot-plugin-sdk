<a name="module_miot/host/file.saveImageToPhotosAlbum"></a>

## .saveImageToPhotosAlbum(fileName) ⇒ <code>Promise</code>
保存指定照片文件到系统相册

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |

**Example**  
```js
import {Host} from 'miot'
...
Host.file.saveImageToPhotosAlbum('name').then(_ =>{
 console.log('successful save to PhotosAlbum')
})
...
```
