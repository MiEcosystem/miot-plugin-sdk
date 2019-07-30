<a name="module_miot/host/ui.addOrCopyIR"></a>

## .addOrCopyIR(did, type, models, extra)
添加或者复制一个红外遥控器

**Kind**: static function  
**Since**: 10003  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| did | <code>string</code> |  | 设备did |
| type | <code>number</code> |  | 0：添加遥控器；1：复制遥控器。默认0 |
| models | <code>array</code> |  | 一组红外遥控器model，只传入一个model将直接跳转到相应的品牌列表或者机顶盒列表，支持的models见文档。默认空数组[] |
| extra | <code>object</code> |  | 额外配置，会传入打开的插件页，也有部分特殊功能定义字段如下： |
| [extra.create_device] | <code>boolean</code> | <code>true</code> | 米家首页列表是否展示虚拟遥控器设备。默认true。暂时只有android支持 |
| [extra.dismiss_current_plug] | <code>boolean</code> | <code>true</code> | since 10020 。在推出新的插件页面时，关掉当前页面，返回app首页。iOS Only |

