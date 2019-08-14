<a name="module_miot/service/smarthome.resetLockPrimaryKey"></a>

## .resetLockPrimaryKey(params)
透传锁主密钥重置
request /v2/nfckey/reset_lock_primarykey

**Kind**: static function  
**Since**: 10011  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params |
| params.did | <code>string</code> | did |
| params.reqData | <code>object</code> | // 透传给Mipay的数据 |
| params.reqData.sessionId | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.partnerId | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.userId | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.cplc | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.timestamp | <code>string</code> | // 透传给Mipay的数据 |
| params.reqData.sign | <code>string</code> | // 透传给Mipay的数据 |

