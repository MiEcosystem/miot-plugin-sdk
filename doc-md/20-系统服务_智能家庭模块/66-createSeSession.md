<a name="module_miot/service/smarthome.createSeSession"></a>

## .createSeSession(params)
透传米家APP与小米支付创建session
request /v2/nfckey/create_se_session

**Kind**: static function  
**Since**: 10011  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params |
| params.did | <code>string</code> | did |
| params.reqData | <code>object</code> | // 透传给Mipay的数据 |
| params.reqData.userId | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.cplc | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.deviceType | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.deviceId | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.timestamp | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.sign | <code>string</code> | // 透传给Mipay的数据 |

