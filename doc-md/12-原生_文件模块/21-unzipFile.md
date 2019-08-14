<a name="module_miot/host/file.unzipFile"></a>

## .unzipFile(fileName) ⇒ <code>Promise</code>
解压缩一个zip文件，解压缩后的文件会直接存储在插件存储空间的根目录下

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | 文件名（插件存储空间内的文件） * @param {string} desitinationPath - 目标解压缩文件夹，默认解压到当前文件夹，如果指定名称，压缩包内容会解压到指定文件夹 |

