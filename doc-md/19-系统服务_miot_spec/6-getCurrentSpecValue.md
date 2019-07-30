<a name="module_miot/service/spec.getCurrentSpecValue"></a>

## .getCurrentSpecValue(did) ⇒
刚进入插件时，如果需要获取native缓存的设备的miot-spec数据，则调用此方法获取
注意调用方法的时候，方法要加上async
使用方式：let data = await Service.spec.getCurrentSpecValue(did);

**Kind**: static function  
**Returns**: 缓存的设备的miotSpec属性，返回值同上面的getPropertiesValue方法。此方法只返回code为0（get成功）的数据  
**Since**: 10003  

| Param | Description |
| --- | --- |
| did | 设备的did，必传 |

