## 数字选择器-NumberSpinner

### 预览

![](/docImages/numberspinner.gif)

### 基本信息

| 基本信息  |                                                     |
| --------- | --------------------------------------------------- |
| 中文名称  | 数字选择器                                          |
| 描述      | 类似于iOS的滚轴，通过滚动选择具体数字（仅支持数字） |
| 位置      | `miot/ui/NumberSpinner`                             |
| SDK_Level | `SDK_10003`                                         |
| 注意事项  | \                                                   |

### 使用方法

```jsx
<NumberSpinner
  style={{width:300, height:200}}
  maxValue={30}
  minValue={-100}
  interval={2.5}
  defaultValue={80}
  valueFormat={"%.1f"}
  unit={"km"}
  onNumberChanged={data=>{
    console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
  }}
/>
```

### 参数

| Name            | Type                | Description   |
| --------------- | ------------------- | ------------- |
| visible         | <code>bool</code>   | 是否可见      |
| unit            | <code>string</code> | 单位          |
| max             | <code>int</code>    | 最大值        |
| min             | <code>int</code>    | 最小值        |
| interval        | <code>int</code>    | 步长，默认为1 |
| defaultValue    | <code>int</code>    | 默认值        |
| valueFormat     | <code>string</code> | 格式          |
| onNumberChanged | <code>func</code>   | 值改变的回调  |
