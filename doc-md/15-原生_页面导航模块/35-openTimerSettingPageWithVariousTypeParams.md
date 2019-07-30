<a name="module_miot/host/ui.openTimerSettingPageWithVariousTypeParams"></a>

## .openTimerSettingPageWithVariousTypeParams(onMethod, onParam, offMethod, offParam)
**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| onMethod | <code>string</code> | 定时到时设备“开”执行的 RPC 指令命令字字符串，指硬件端，打开定时应该执行的方法，请咨询硬件工程师,miot-spec下，一般为：set_properties |
| onParam | <code>json</code> | 定时到时设备“开”执行的 RPC 指令参数，可以是字符串、数字、字典、数组，指硬件端，打开定时应该传入的参数，请咨询硬件工程师，iot-spec下，一般为：[{did,siid,piid,value}] |
| offMethod | <code>string</code> | 定时到时设备“关”执行的 RPC 指令命令字字符串,,参数请与嵌入式的同学沟通，指硬件端，关闭定时应该执行的方法，请咨询硬件工程师，miot-spec下，一般为：set_properties |
| offParam | <code>json</code> | 定时到时设备“关”执行的 RPC 指令参数，可以是字符串、数字、字典、数组，指硬件端，关闭定时应该传入的参数，请咨询硬件工程师，miot-spec下，一般为：[{did,siid,piid,value}] |

**Example**  
```js
Host.ui.openTimerSettingPageWithVariousTypeParams("power_on", ["on", "title"], 'off',"title"}),
```
