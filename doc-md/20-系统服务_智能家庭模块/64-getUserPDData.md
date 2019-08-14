<a name="module_miot/service/smarthome.getUserPDData"></a>

## .getUserPDData(params)
获取用户信息
call /user/getpdata
此接口的时间戳范围是反的，即：time_start > time_end ,否则获取不到。

**Kind**: static function  
**Since**: 10010  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params |
| params.time_end | <code>object</code> | 筛选结果的时间戳 |
| params.time_start | <code>object</code> | 筛选结果的时间戳 |
| params.key | <code>object</code> | 获取的key |

