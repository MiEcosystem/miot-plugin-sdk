<a name="module_miot/ui/InputDialog"></a>

## miot/ui/InputDialog
输入对话框

  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| visible | <code>bool</code> | 是否可见 |
| cancelable | <code>bool</code> | 是否允许点击空白区域取消显示,仅限Android |
| singleLine | <code>bool</code> | 是否单行显示 |
| title | <code>string</code> | 标题 |
| message | <code>string</code> | 副标题，内容 |
| placeholder | <code>string</code> | 输入框placeholder，默认为空 |
| defaultText | <code>string</code> | 输入框默认初始值，默认为空 |
| cancel | <code>string</code> | 取消标题 |
| confirm | <code>string</code> | 确认标题 |
| onConfirm | <code>func</code> | 确认点击回调 |
| onCancel | <code>func</code> | 取消点击回调 |
| onDismiss | <code>func</code> | 对话框消失回调 |
| timeout | <code>number</code> | 超时自动隐藏，设置0或者不设置不会自动隐藏 |

