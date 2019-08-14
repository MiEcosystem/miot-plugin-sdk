<a name="module_miot/service/spec.getPropertiesValue"></a>

## .getPropertiesValue(params) ⇒ <code>Promise.&lt;string&gt;</code>
请求获取设备的属性值,获取成功后可以通过 ISpecProperty.value 或者 ISpecProperty.getValue 获取

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Array</code> | [{did: 1, siid: 1, piid: 1},{did: 1, siid:2, piid: 3}] |

