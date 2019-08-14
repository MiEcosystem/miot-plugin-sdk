<a name="module_miot/host/ui.openDevice"></a>

## .openDevice(did, model, params) ⇒ <code>Promise.&lt;json&gt;</code>
打开用户账号下某一设备的插件

**Kind**: static function  
**Returns**: <code>Promise.&lt;json&gt;</code> - 打开插件失败，返回错误信息；打开插件成功，无回调信息  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| did | <code>string</code> |  | 设备的did |
| model | <code>string</code> |  | 设备的model |
| params | <code>object</code> |  | 额外参数，打开插件时传入，也有部分特殊功能定义字段如下： |
| [params.dismiss_current_plug] | <code>boolean</code> | <code>true</code> | since 10020 。是否在推出新的插件页面时，关掉当前页面，返回app首页。iOS Only |

