<a name="module_miot/service/smarthome.getDeviceSetting"></a>

## ~~.getDeviceSetting(params) ⇒ <code>Promise</code>~~
***Deprecated***

获取服务器中 device 对应的数据，内部调用米家代理接口 /device/getsetting

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | 请求参数 |
| params.did | <code>string</code> | did |
| params.settings | <code>Array.&lt;string&gt;</code> | 指定设置的key数组 |

