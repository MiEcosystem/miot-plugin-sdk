<a name="module_miot/service/smarthome.editIDFY"></a>

## .editIDFY(params)
call api /scene/idfy_get

**Kind**: static function  
**Since**: 10005  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | json params |

**Example**  
```js
let params = {"identify":"554011","st_id":7,"setting":{"aqi_link":"0","exception_alert":"1","blue_sky_alert":"0"},"authed":["554011"]}
Service.smarthome.editIDFY(params)
```
