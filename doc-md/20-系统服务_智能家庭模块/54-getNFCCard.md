<a name="module_miot/service/smarthome.getNFCCard"></a>

## .getNFCCard(params) ⇒ <code>json</code>
米家app查询NFC卡信息，使用did查询did下绑定的NFC卡列表信息

**Kind**: static function  
**Returns**: <code>json</code> - 卡片结果数组  
**Since**: 10003  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>json</code> | {did:''} |

**Example**  
```js
response:
ret={
        "code":0,
        "message":"ok",
        "result":{
            "list":[{
                "did":"1234567",
                "uid":123456789,                    //设备owner的用户id
                "cid":"111122223333444455",
                "name":"家",                            //用户设置的卡名称
                "type":1,                                  //卡片类型，1：手机NFC卡，2：实体卡
                "status":1,                               //卡片状态，1：有效， 0： 无效
                "issuer_id":"666666",
                "time_stamp":1234567890,   // 开卡时间
                "extra":{
                    "deviceModel":"RedMi 4X",
                    "OS":"MIUI 9.5"
                    }
                },
                {
                ...
                }
                ]
        }
    }
```
