<a name="module_miot/service/smarthome.getUserDeviceLog"></a>

## .getUserDeviceLog(params)
用于按照时间顺序拉取指定uid,did的发生的属性事件
/v2/user/get_user_device_log

**Kind**: static function  
**Since**: 10004  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | 参数 |
| params.did | <code>string</code> |  |
| params.limit | <code>number</code> | 目前最大为50 |
| params.time_start | <code>number</code> | 开始时间 |
| params.time_end | <code>number</code> | 结束时间 |

