<a name="module_miot/host/ui.openCountDownPage"></a>

## .openCountDownPage(isCountDownOn, setting)
开启倒计时界面

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| isCountDownOn | <code>Boolean</code> | 设备的当前状态:YES 为开启，所以我们启动关闭倒计时; NO  为关闭，所以我们启动开启倒计时 |
| setting | <code>object</code> | 设置倒计时页面的属性 |
| setting.onMethod | <code>string</code> | 指硬件端，打开 倒计时应该 执行的方法，请咨询硬件工程师 |
| setting.onParam | <code>string</code> | 指硬件端，打开 倒计时应该 传入的参数，请咨询硬件工程师 |
| setting.offMethod | <code>string</code> | 指硬件端，关闭 倒计时应该 执行的方法，请咨询硬件工程师 |
| setting.offParam | <code>string</code> | 指硬件端，关闭 倒计时应该 传入的参数，请咨询硬件工程师 |
| setting.identify | <code>string</code> | since 10021, 用于设置倒计时的identify |

**Example**  
```js
Host.ui.openCountDownPage(true, {onMethod:"power_on", offMethod:'power_off', onParam:'on', offParam:'off'})
```
