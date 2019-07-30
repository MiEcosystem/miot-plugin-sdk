<a name="module_miot/service/storage.getThirdUserConfigs"></a>

## ~~.getThirdUserConfigs(model, ...keys)~~
***Deprecated***

读取三方数据,该接口读取厂商的用户配置信息 /user/get_third_user_config，对应的写的接口为：set_third_user_config。

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | 设备Model |
| ...keys | <code>number</code> | 根据key获取配置,如果不传keys 返回用户该厂商的所有配置 |

**Example**  
```js
getThirdUserConfigs(model, k1,k2,k3).then(res => {...})
```
