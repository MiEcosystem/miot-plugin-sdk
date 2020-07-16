## 开关-Switch

### 预览

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_gif_e4cab8878fee60aa93c8b85e05b52611.gif)

### 基本信息

| 基本信息  |                      |
| --------- | -------------------- |
| 中文名称  | 开关                 |
| 描述      | 简单的开关，有动效。 |
| 位置      | `components/switch`  |
| SDK_Level | `SDK_10020`          |
| 注意事项  | \                    |

### 使用方法

```jsx
<Switch
  style={{ width: 60, height: 30 }}
  onTintColor='red'
  tintColor='blue'
  value={true}
  disabled={false}
  onValueChange={value => { console.log(value) }}
/>
```

### 参数

| 属性          | 类型                                  | 说明                 | 默认值  |
| ------------- | ------------------------------------- | -------------------- | ------- |
| value         | <code>bool</code>                     | 开关状态             | `false`   |
| style         | <code>`StyleProp<TextStyle>`</code>                    | 开关样式，仅支持宽高 | `{}`      |
| onTintColor   | <code>string</code>                   | 打开时的背景颜色     | `'#32BAC0'` |
| tintColor     | <code>string</code>                   | 关闭时的背景颜色     | `'#F0F0F0'` |
| disabled      | <code>bool</code>                     | 是否禁用             | `false`   |
| onValueChange | <code>(value: boolean) => void</code> | 切换开关的回调函数   | 无
 