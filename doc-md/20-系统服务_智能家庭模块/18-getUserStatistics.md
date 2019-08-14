<a name="module_miot/service/smarthome.getUserStatistics"></a>

## .getUserStatistics(params) ⇒ <code>Promise.&lt;Object&gt;</code>
提供返回设备数据统计服务，使用该接口需要配置产品model以支持使用，建议找对接的产品人员进行操作。
图表📈统计接口 /v2/user/statistics
注:由于sds限额问题，可能会出现一次拉不到或者拉不完数据的情况，会返回code:0和message:“sds throttle”

**Kind**: static function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - {
        "code": 0,
        "message": "ok",
        "result": [
            {
                "value": "[12,34]", // 为一个数组形式json串
                "time": 1543593600 // 时间戳
            },
            {
                "value": "[10,11]",
                "time": 1541001600
            }]
    }  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> |  |
| params.did | <code>string</code> | did |
| params.data_type | <code>string</code> | 数据类型 包括： 采样统计 日统计:stat_day_v3 / 周统计:stat_week_v3 / 月统计:stat_month_v3; |
| params.key | <code>string</code> | 需要统计的字段，即统计上报对应的key |
| params.time_start | <code>number</code> | 开始时间 |
| params.time_end | <code>number</code> | 结束时间 |
| params.limit | <code>number</code> | 限制次数，0为默认条数 |

