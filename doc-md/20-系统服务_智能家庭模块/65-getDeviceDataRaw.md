<a name="module_miot/service/smarthome.getDeviceDataRaw"></a>

## .getDeviceDataRaw(params)
App获取设备上报操作记录
request /v2/user/get_device_data_raw

**Kind**: static function  
**Since**: 10011  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | 参数 |
| params.did | <code>string</code> | 设备did |
| params.uid | <code>string</code> | 用户UID |
| params.type | <code>string</code> | 查询事件；当查询属性时使用 'prop', 否则使用 'store'操作 |
| params.key | <code>string</code> | 事件名称；当查询属性时value填具体属性，比如"aqi" |
| params.time_start | <code>string</code> | 开始UTC时间 |
| params.time_end | <code>string</code> | 结束UTC时间 |
| params.limit | <code>string</code> | 最多返回结果数目，上限500。注意按需填写，返回数据越多查询越慢 |

