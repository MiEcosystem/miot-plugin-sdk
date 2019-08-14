<a name="module_miot/service/spec.doAction"></a>

## .doAction(params) ⇒ <code>Promise.&lt;JSON&gt;</code>
请求调用设备的方法

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>JSON</code> | {did: action.did, siid: action.siid, aiid: action.iid, in: action.params},其中，action.params为数组。例如 {did: 1, siid: 1, aiid: 1, in: [17,"shanghai"]} |

