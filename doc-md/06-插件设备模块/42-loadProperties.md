<a name="module_miot/Device--module.exports.IDeviceWifi+loadProperties"></a>

## .loadProperties(...propNames) ⇒ <code>Promise.&lt;Map&gt;</code>
加载属性数据
内部调用get_prop 方法,会依据当前环境选择从本地局域网或者云端获取, 并将返回数据写成{key:value}格式

**Kind**: instance function  
**Returns**: <code>Promise.&lt;Map&gt;</code> - Map<name, value>  

| Param | Type |
| --- | --- |
| ...propNames | <code>\*</code> | 

**Example**  
```js
Device.getDeviceWifi().loadProperties("a", "b").then(map=>{
 const a = map.get("a")
 const b = map.get("b")
})
```
