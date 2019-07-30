<a name="module_miot/service/smarthome.getUserInfoList"></a>

## .getUserInfoList(uids) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
通过UID批量获取用户信息

**Kind**: static function  
**Since**: 10005  

| Param | Type | Description |
| --- | --- | --- |
| uids | <code>Array.&lt;string&gt;</code> | uid数组，仅支持uid，不支持手机号查询 |

**Example**  
```js
Service.smarthome.getUserInfoList([uid1,uid2]).then(res => {
 console.log('user info :', res.list)
})
```
