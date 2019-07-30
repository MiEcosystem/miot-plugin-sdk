<a name="module_miot/ui/ProgressDialog"></a>

## miot/ui/ProgressDialog
进度对话框，当进度到达max设置之后自动消失

  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| visible | <code>bool</code> | 是否可见 |
| cancelable | <code>bool</code> | 是否允许点击空白区域取消显示,仅限Android |
| title | <code>string</code> | 标题 |
| message | <code>string</code> | 副标题，内容 |
| max | <code>number</code> | 最大进度值 |
| progress | <code>number</code> | 当前进度值 |
| onDismiss | <code>func</code> | 对话框消失回调 |
| timeout | <code>number</code> | 超时自动隐藏，设置0或者不设置不会自动隐藏 |

