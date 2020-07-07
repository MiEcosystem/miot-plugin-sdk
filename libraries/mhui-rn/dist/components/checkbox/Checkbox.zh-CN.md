## 复选框-Checkbox

### 预览

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_gif_0eadec20d0c24848124287c1774d3d7b.gif)

### 基本信息

| 基本信息  |                             |
| --------- | --------------------------- |
| 中文名称  | 复选框                      |
| 描述      | 多选时可使用，有动效。      |
| 位置      | `miot/ui/Checkbox/Checkbox` |
| SDK_Level | `SDK_10011`                 |
| 注意事项  | \                           |

### 使用方法

```jsx
// 方形
<Checkbox
  style={{ width: 60, height: 60 }}
  checked={true}
  checkedColor='lightgreen'
  onValueChange={checked => {console.log(checked)}}
/>
// 圆形
<Checkbox
  style={{ width: 60, height: 60, borderRadius: 30 }}
  checked={false}
  checkedColor='lightgreen'
  onValueChange={checked => {console.log(checked)}}
/>
```

### 参数

| 属性          | 类型                | 说明              |  默认值|
| ------------- | ------------------- | ------------------------ | -- |
| style         | <code>style</code>  | 样式                     | {}
| disabled      | <code>bool</code>   | 是否禁用   | `false`
| checked       | <code>bool</code>   | 是否勾选   |  `false`
| checkedColor  | <code>string</code> | 勾选背景颜色 | `'#32BAC0'`
| onValueChange | <code>`(checked: boolean) => void`</code>          | 点击回调函数   | 无
