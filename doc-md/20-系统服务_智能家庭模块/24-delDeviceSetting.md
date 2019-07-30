<a name="module_miot/service/smarthome.delDeviceSetting"></a>

## .delDeviceSetting(params) ⇒ <code>Promise</code>
删除服务器中 device 对应的数据，内部调用米家代理接口/device/delsetting

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>json</code> | 请求参数 |
| params.did | <code>string</code> | did |
| params.settings | <code>object</code> | 指定要删除的key数组 |

