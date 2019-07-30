<a name="module_miot/service/storage.setThirdUserConfigsForOneKey"></a>

## .setThirdUserConfigsForOneKey(model, key, data)
写数据 /user/set_user_config
创建或修改设置插件自由存储空间。如果数据超过服务器设置的阈值，自动分段存储到云端。
但是分段存储会占用额外的key，比如key=100时，分出的新段会存储在101,102,103...等后续相邻的key上，
因此如果插件方需要存储多个key-value，建议多个key之间相差较大

**Kind**: static function  
**Since**: 10023  

| Param | Type |
| --- | --- |
| model | <code>string</code> | 
| key | <code>number</code> | 
| data | <code>json</code> | 

