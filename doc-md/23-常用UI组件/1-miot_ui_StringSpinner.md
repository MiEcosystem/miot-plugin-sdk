<a name="module_miot/ui/StringSpinner"></a>

## miot/ui/StringSpinner
字符串选择器,兼容NumberSpinner（支持NumberSpinner的所有属性）

  
**Since**: 10020  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| visible | <code>bool</code> | 是否可见 |
| style | <code>style</code> | 开关样式，仅支持宽高 |
| dataSource | <code>array.&lt;string&gt;</code> | 数据源 |
| defaultValue | <code>string</code> | 默认值 |
| onValueChanged | <code>func</code> | 值改变的回调 |
| unit | <code>string</code> | 单位 默认：无 |
| pickerInnerStyle.textColor | <code>string</code> | 文字颜色 默认值 #000000 |
| pickerInnerStyle.selectTextColor | <code>string</code> | 文字选中颜色 默认值 #00aa71 |
| pickerInnerStyle.selectBgColor | <code>string</code> | 文字选中背景 默认值 #ffffff |
| pickerInnerStyle.unitTextColor | <code>string</code> | 单位字体颜色 默认值 #00aa71 |
| pickerInnerStyle.lineColor | <code>string</code> | 分割线颜色 默认值 #e5e5e5 |
| pickerInnerStyle.fontSize | <code>number</code> | 文字大小 默认值 22 |
| pickerInnerStyle.selectFontSize | <code>number</code> | 文字选中大小 默认值 22 |
| pickerInnerStyle.unitFontSize | <code>number</code> | 单位字体大小 默认值 12 |
| pickerInnerStyle.rowHeight | <code>number</code> | 行高 默认值 42 |

**Example**  
```js
<StringSpinner
    style={{ width: 300, height: 300, backgroundColor: '#ffffff', }}
    dataSource={['a', 'b', 'c', 'd']}
    defaultValue={'c'}
    pickerInnerStyle={{ lineColor: "#cc0000", textColor: "#ff0000", selectTextColor: "#0000FF", fontSize: 12, selectFontSize: 30, rowHeight: 70, selectBgColor: "#f5f5f5" }}
    onValueChanged={(data) => { this.updateOneValue(data) }}
/>
```
