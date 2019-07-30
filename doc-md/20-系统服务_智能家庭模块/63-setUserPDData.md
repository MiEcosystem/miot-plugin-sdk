<a name="module_miot/service/smarthome.setUserPDData"></a>

## .setUserPDData(params)
设置用户信息
call /user/setpdata, 其中的time为关键信息，在getpdata使用时将利用此值。

**Kind**: static function  
**Since**: 10010  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params |
| params.time | <code>long</code> | setpddata的时间戳 |
| params.key | <code>string</code> | key 字串 |
| params.value | <code>string</code> | value值 |

