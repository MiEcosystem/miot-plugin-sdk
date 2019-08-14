<a name="module_miot/Package--module.exports.exit"></a>

## .exit(info)
强制退出插件

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| info | <code>\*</code> | 如果不为空, 则等同于设置 Package.exitInfo |

**Example**  
```js
Package.exit({...});
```
**Example**  
```js
Package.exitInfo = {...}
 Package.exit();
```
