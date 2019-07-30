<a name="module_miot/ui/SingleChoseDialog"></a>

## miot/ui/SingleChoseDialog
单选对话框

  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| visible | <code>bool</code> | 是否可见 |
| cancelable | <code>bool</code> | 是否允许点击空白区域取消显示,仅限Android |
| title | <code>string</code> | 标题 |
| timeout | <code>number</code> | 超时自动隐藏，设置0或者不设置不会自动隐藏 |
| dataSource | <code>array.&lt;string&gt;</code> | 数据源 |
| check | <code>number</code> | 选中第几个数据源 |
| cancel | <code>string</code> | 取消标题 |
| confirm | <code>string</code> | 确认标题 |
| onConfirm | <code>func</code> | 确认点击回调 |
| onCancel | <code>func</code> | 取消点击回调 |
| onDismiss | <code>func</code> | 对话框消失回调 |
| onCheck | <code>func</code> | 某一行选中状态变更回调 |

**Example**  
```js
import {SingleChoseDialog} from 'miot/ui'
<SingleChoseDialog 
dataSource={['message0', 'message1', 'message2', 'message3', 'message4', 'message5', 'message6']}
...
/>
```
