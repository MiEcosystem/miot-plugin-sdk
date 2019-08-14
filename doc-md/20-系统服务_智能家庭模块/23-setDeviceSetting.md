<a name="module_miot/service/smarthome.setDeviceSetting"></a>

## .setDeviceSetting(params) ⇒ <code>Promise</code>
设置服务器中 device 对应的数据，内部调用米家代理接口/device/setsetting

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | 请求参数 {did:string,settings:map<key,value>} |
| params.did | <code>string</code> | did |
| params.settings | <code>object</code> | 指定设置的key数组 |

