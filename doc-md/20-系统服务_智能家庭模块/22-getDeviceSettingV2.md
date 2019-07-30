<a name="module_miot/service/smarthome.getDeviceSettingV2"></a>

## .getDeviceSettingV2(params) ⇒ <code>Promise</code>
获取服务器中 device 对应的数据，内部调用米家代理接口 /v2/device/getsettingv2

**Kind**: static function  
**Since**: 10010  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> |  |
| params.did | <code>string</code> | 设备did |
| params.last_id | <code>string</code> | 上一次请求返回的id，用于分页 |
| params.prefix_filter | <code>string</code> | filter |
| params.settings | <code>Array.&lt;string&gt;</code> | 指定设置的key数组 |

