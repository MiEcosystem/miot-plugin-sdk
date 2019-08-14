<a name="module_miot/service/smarthome.getDeviceData"></a>

## .getDeviceData(params) ⇒ <code>Promise</code>
查询用户名下设备上报的属性和事件
获取设备属性和事件历史记录，订阅消息直接写入到服务器，不需要插件添加.
通下面的set_user_device_data的参数一一对应， /user/get_user_device_data

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>json</code> | 参数\{did,type,key,time_start,time_end,limit}含义如下： |
| params.did | <code>string</code> | 设备id。 必选参数 |
| params.uid | <code>string</code> | 要查询的用户id 。必选参数 |
| params.key | <code>string</code> | 事件名，可自定义,定义与SDS表中key一致。必选参数 |
| params.type | <code>string</code> | 定义与SDS表中type一致。必选参数。可参考SDS文档中的示例 |
| params.time_start | <code>string</code> | 数据起点。必选参数 |
| params.time_end | <code>string</code> | 数据终点。必选参数，time_end必须大于time_start, |
| params.group | <code>string</code> | 返回数据的方式，默认raw,可选值为hour、day、week、month。可选参数. |
| params.limit | <code>string</code> | 返回数据的条数，默认20，最大1000。可选参数. |

