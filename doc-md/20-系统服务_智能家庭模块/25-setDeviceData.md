<a name="module_miot/service/smarthome.setDeviceData"></a>

## .setDeviceData(params) ⇒ <code>Promise</code>
添加设备属性和事件历史记录，/user/set_user_device_data

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | 参数 |
| params.did | <code>string</code> | 设备did， |
| params.uid | <code>string</code> | 添加到哪个用户下,一般为 Device.ownerId， |
| params.type | <code>string</code> | 属性为prop事件为event，属性名不需要prop或者event前缀，亦可以自定义， |
| params.key | <code>string</code> | 要保存的数据K |
| params.value | <code>string</code> | 要保存的数据V |
| params.time | <code>number</code> | 触发时间戳， |

