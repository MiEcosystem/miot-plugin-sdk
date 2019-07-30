<a name="module_miot/service/smarthome.delDeviceData"></a>

## .delDeviceData(params)
删除用户的设备信息（prop和event 除外）.
删除对应时间戳的上报的数据，无法删除type为prop和event,删除后可用get_user_device_data校验。
如果get_user_device_data校验返回的为[]表示删除成功。
user/del_user_device_data

**Kind**: static function  
**Since**: 10004  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | {did:'', type: '', key:'',time:number} did:设备ID ;type: 要删除的类型 ;key: 事件名称. motion/alarm ;time:时间戳，单位秒 |
| params.did | <code>string</code> | 设备id。 必选参数 |
| params.type | <code>string</code> | type 定义与SDS表中type一致。必选参数。可参考SDS文档中的示例 |
| params.key | <code>string</code> | key 事件名，可自定义,定义与SDS表中key一致。必选参数 |
| params.time | <code>string</code> | 指定时间戳 |
| params.value | <code>string</code> | 指定值 |

