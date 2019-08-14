<a name="module_miot/service/smarthome.getThirdConfig"></a>

## .getThirdConfig(params) ⇒ <code>Promise</code>
从服务器获取配置文件，/device/getThirdConfig

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>json</code> | 参数 {"name":"config_version","version":1,"lang":"en","app_id":"XXX"} |
| params.name | <code>string</code> | configName |
| params.model | <code>string</code> | device model |
| params.app_id | <code>string</code> | app_id |
| params.lang | <code>string</code> | lang e.g: zh_CN |
| params.result_level | <code>string</code> | 值为1，则不返回content来节省流量， 默认为0 |
| params.version | <code>string</code> | version |

