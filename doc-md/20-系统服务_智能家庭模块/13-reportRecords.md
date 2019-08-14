<a name="module_miot/service/smarthome.reportRecords"></a>

## .reportRecords(deviceID, records)
上报设备数据 /device/event

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| deviceID | <code>string</code> | 设备ID |
| records | <code>array.&lt;map&gt;</code> | [{type,key,value}] 其中：type为'prop'或'event'，key，value均为自定义string |

**Example**  
```js
Service.smarthome.reportRecords("deviceID", [{type:"prop",key:"b",value:"c"}])
```
