<a name="module_miot/service/smarthome.handleSEResponse"></a>

## .handleSEResponse(params)
处理芯片返回
request /v2/nfckey/handle_se_response

**Kind**: static function  
**Since**: 10011  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params |
| params.did | <code>string</code> | did |
| params.reqData | <code>object</code> | // 透传给Mipay的数据 |
| params.reqData.sessionId | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.userId | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.cplc | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.seResps | <code>Array.&lt;object&gt;</code> | // 这是一个数组透传给Mipay的数据 |
| params.reqData.seResps[].data | <code>string</code> | // 这是一个透传给Mipay的数据 |
| params.reqData.seResps[].statusWord | <code>string</code> | // 这是一个透传给Mipay的数据 |
| params.reqData.timestamp | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.sign | <code>string</code> | // 透传给Mipay的数据 |

**Example**  
```js
let param = {
 "did":"1234567",
 "reqData":{ // 透传给Mipay的数据
     "sessionId":"999999999", 
     "userId":"12340000",
     "cplc":"asdghjklmnbvd",
     "seResps":[
         {"data":"","statusWord":"9000"},
         {"data":"","statusWord":"6A80"}
     ],
     "timestamp":1234567890,
     "sign":"shaddgkldsjlkeri"
 }
}
```
