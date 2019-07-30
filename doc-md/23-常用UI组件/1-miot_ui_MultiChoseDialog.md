<a name="miot/ui/MultiChoseDialog"></a>

## miot/ui/MultiChoseDialog : <code>func</code>
回调会带一个 object 的参数，object.position为点击第几个条目，object.check 为选中状态

**Kind**: global variable  
  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| visible | <code>bool</code> | 是否可见 |
| cancelable | <code>bool</code> | 是否允许点击空白区域取消显示,仅限Android |
| title | <code>string</code> | 标题 |
| timeout | <code>number</code> | 超时自动隐藏，设置0或者不设置不会自动隐藏 |
| dataSource | <code>array</code> | 数据源，建议 array 的每个item 是一个 object，object 至少有展示条目名称、选中状态两个字段 |
| dataKey | <code>string</code> | 用于表示显示的字段名，dataSource每个条目显示名称 object 的字段名 |
| checkKey | <code>string</code> | 用于表示选中的字段名，dataSource每个条目选中状态 object 的字段名 |
| cancel | <code>string</code> | 取消标题 |
| confirm | <code>string</code> | 确认标题 |
| onConfirm | <code>func</code> | 确认点击回调 |
| onCancel | <code>func</code> | 取消点击回调 |
| onDismiss | <code>func</code> | 对话框消失回调 |
| onCheck | <code>func</code> | 某一行选中状态变更回调 |

**Example**  
```js
import {MultiChoseDialog} from 'miot/ui'
//dataSource列表数据中，dataKey所定义的值('dataKeyName') 对应项为展示的名称， 与checkKey所定义的值('checkKeyName') 对应的boolean值表示是否选中
<MultiChoseDialog 
dataSource = {[{'dataKeyName':'displayName1','checkKeyName':false}, {'dataKeyName':'displayName2','checkKeyName':true} ]}
dataKey = {'dataKeyName'}
checkKey = {'checkKeyName'}
/>
```
**Example**  
```js
某一行选中状态变更回调
```
**Example**  
```js
import {MultiChoseDialog} from 'miot/ui'
<MultiChoseDialog 
...
onCheck={res => {
 console.log('click at row ', res.position, ' with checked ', res.check)
}}
/>
```
