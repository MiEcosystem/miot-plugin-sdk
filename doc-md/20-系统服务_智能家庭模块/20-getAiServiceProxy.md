<a name="module_miot/service/smarthome.getAiServiceProxy"></a>

## .getAiServiceProxy(params) ⇒ <code>Promise</code>
获取小爱接口数据，内部调用米家代理接口/v2/api/aivs

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>json</code> | 请求参数 {path:string,params:map,header:map,payload:map,env:int,req_method:string,req_header:map} |
| params.path | <code>string</code> |  |
| params.params | <code>string</code> |  |
| params.params.did | <code>string</code> |  |
| params.params.client_id | <code>string</code> |  |
| params.header | <code>string</code> |  |
| params.env | <code>string</code> |  |
| params.req_method | <code>string</code> |  |
| params.req_header | <code>string</code> |  |

**Example**  
```js
Service.smarthome.getAiServiceProxy({
 path: "/api/aivs/xxx",
 params: { did : "xx", client_id: "xx"},
 header: { name : "xx"},
 env: 1,
 req_method: "POST",
 req_header: {"Content-Type":"xx"}
}).then()
```
