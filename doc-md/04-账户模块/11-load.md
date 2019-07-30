<a name="module_miot/Account..IAccount+load"></a>

## .load(force) ⇒ <code>Promise.&lt;IAccount&gt;</code>
加载用户信息，所有依赖于load的用户信息需要在回调方法中会返回时才有值

**Kind**: instance function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| force | <code>boolean</code> | <code>false</code> | 强制刷新缓存，加载米家服务器的用户信息 |

