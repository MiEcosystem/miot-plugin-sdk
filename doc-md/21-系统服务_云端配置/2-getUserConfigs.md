<a name="module_miot/service/storage.getUserConfigs"></a>

## ~~.getUserConfigs(componentId, ...keys) ⇒ <code>Promise</code>~~
***Deprecated***

读取米家的用户配置信息 /user/get_user_config（获取/user/set_user_config写入的用户配置）

**Kind**: static function  
**Returns**: <code>Promise</code> - key，value结构数据  

| Param | Type | Description |
| --- | --- | --- |
| componentId | <code>number</code> | 厂商APP_ID(Cloud ID)，需要向小米申请, 0 和 1 预留 |
| ...keys | <code>number</code> | 保存的数据索引，从0开始 |

**Example**  
```js
getUserConfigs(componentId, k1,k2,k3).then(res => {...})
```
