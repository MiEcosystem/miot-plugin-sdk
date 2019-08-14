<a name="module_miot/host/ui.openTimerSettingPageWithOptions"></a>

## .openTimerSettingPageWithOptions(options)
扩展自 openTimerSettingPageWithVariousTypeParams , 新增支持自定义name使用

**Kind**: static function  
**Since**: 10010 ,SDKLevel 10010 开始提供使用  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | 配置信息 |
| options.onMethod | <code>string</code> | 配置定时开启的 method 名，同上面openTimerSettingPageWithVariousTypeParams的参数onMethod |
| options.onParam | <code>string</code> | 配置定时开启的 参数，同上面openTimerSettingPageWithVariousTypeParams的参数onParam |
| options.offMethod | <code>string</code> | 配置定时关闭的 method 名，同上面openTimerSettingPageWithVariousTypeParams的参数offMethod |
| options.offParam | <code>string</code> | 配置定时关闭的 参数，同上面openTimerSettingPageWithVariousTypeParams的参数offParam |
| options.displayName | <code>string</code> | 配置场景日志显示的名称 |
| options.identify | <code>string</code> | 自定义定时Identifier |
| options.onTimerTips | <code>string</code> | 定时列表页面、设置时间页面 打开副标题（默认：开启时间） |
| options.offTimerTips | <code>string</code> | 定时列表页面、设置时间页面 关闭时间副标题（默认：关闭时间） |
| options.listTimerTips | <code>string</code> | 定时列表页面 定时时间段副标题（默认：开启时段） |
| options.bothTimerMustBeSet | <code>boolean</code> | 是否强制要求设置时间段？ true: 强制设置时间段(默认：false)如果设置true,忽略下面三个参数 |
| options.showOnTimerType | <code>boolean</code> | 是否可以创建：定时开启？ true: 可以，false:不可以(默认：true) |
| options.showOffTimerType | <code>boolean</code> | 是否可以创建：定时关闭？ true: 可以，false:不可以(默认：true) |
| options.showPeriodTimerType | <code>boolean</code> | 是否可以创建：时间段定时？ true: 可以，false:不可以(默认：true) 注意：showOnTimerType、showOffTimerType、showPeriodTimerType三个参数至少有一个为true，才有效，否则三个中任意都会被忽略掉 |

**Example**  
```js
Host.ui.openTimerSettingPageWithOptions({onMethod:"power_on", onParam: "on", offMethod: "power_off", offParam: "off", displayName:"设置xxx定时"，identify:"plug_usb_countdowm"})
```
