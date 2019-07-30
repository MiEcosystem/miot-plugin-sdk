<a name="module_miot/host/file.readFile"></a>

## .readFile(fileName, [opt]) ⇒ <code>Promise</code>
读本地文件

**Kind**: static function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fileName | <code>string</code> |  | 文件名,可以是多重文件夹嵌套文件， e.g 'path/path2/filename.txt' |
| [opt] | <code>json</code> | <code>{}</code> | 其他设置项 |

**Example**  
```js
import {Host} from 'miot'
...
Host.filereadFile('name').then(content =>{
 console.log('file content:', content)
})
```
