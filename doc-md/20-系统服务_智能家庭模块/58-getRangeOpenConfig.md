<a name="module_miot/service/smarthome.getRangeOpenConfig"></a>

## ~~.getRangeOpenConfig(params)~~
***Deprecated***

call api /v2/home/range_get_open_config

**Kind**: static function  
**Since**: 10005  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>json</code> | json params {did:string, category:string, configids:array, offset: int, limit:int}, did: 设备did。 category 配置类别， configids： 配置id 为空时返回所有配置，不超过20个，不为空时没有数量限制， offset 偏移；limit 数量，不超过20 |

