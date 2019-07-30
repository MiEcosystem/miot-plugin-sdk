<a name="module_miot/resources.getString"></a>

## .getString(key, ...params) ⇒ <code>string</code>
根据主键名获取用户自定义的国际化字符串

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | 主键名 |
| ...params | <code>any</code> | 参数 |

**Example**  
```js
res.getString('t1.tx', 1)
   res.getString('t2')
```
