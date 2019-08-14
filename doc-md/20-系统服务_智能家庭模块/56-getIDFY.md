<a name="module_miot/service/smarthome.getIDFY"></a>

## .getIDFY(params)
call api /scene/idfy_get

**Kind**: static function  
**Since**: 10005  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | json params |
| params.indetify | <code>string</code> | 唯一标识符，场景的id，一般填did |

**Example**  
```js
let params = {identify:Device.deviceID}
Service.smarthome.getIDFY(params)
```
