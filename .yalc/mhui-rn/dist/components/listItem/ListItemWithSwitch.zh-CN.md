## 带开关的列表项-ListItemWithSwitch

### 预览

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_77f18354bfb78e11440c2028f6f4766e.png)

### 基本信息

| 基本信息  |                                                            |
| --------- | ---------------------------------------------------------- |
| 中文名称  | 带开关的列表项                                             |
| 描述      | 常用的列表项，右侧带有开关，可设置标题/标题右侧文字/副标题 |
| 位置      | `miot/ui/ListItem/ListItemWithSwitch`                      |
| SDK_Level | `SDK_10004`                                                |
| 注意事项  | \                                                          |

### 使用方法

```jsx
<ListItemWithSwitch
  title='标题测试标题测试标题测试标题测试标题测试标题测试'
  valueText='测试测试测试测试测试测试测试测试测试测试测试'
  subtitle='副标题测试副标题测试副标题测试副标题测试副标题测试副标题测试'
  onPress={_ => console.log('do what u want to do')}
  onValueChange={value => console.log(value)}
  containerStyle={{ width: width * 0.8, backgroundColor: 'lightblue' }}
  titleStyle={{ fontSize: 17, color: 'red' }}
  subtitleStyle={{ fontSize: 10, color: 'green' }}
  valueTextStyle={{ fontSize: 10, color: 'yellow' }}
  separator={<Separator />}
/>
```

### 参数

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | 左侧主标题 |
| subtitle | <code>string</code> | 左侧副标题，主标题下方 |
| valueText | <code>string</code> | 主标题右侧文案 |
| value | <code>bool</code> | 开关状态，默认值 `false` |
| disabled | <code>bool</code> | 是否禁用开关，默认值 `false` |
| onPress | <code>function</code> | 列表项点击事件，不传则不具有点击态（disabled） |
| onValueChange | <code>function</code> | 开关切换事件 |
| showSeparator | <code>bool</code> | 是否显示分割线，默认值 `true` |
| separator | <code>component</code> | 自定义分割线，不传将显示默认样式的分割线 |
| containerStyle | <code>style</code> | 列表项的自定义样式 |
| titleStyle | <code>style</code> | 主标题的自定义样式 |
| subtitleStyle | <code>style</code> | 副标题的自定义样式 |
| valueTextStyle | <code>style</code> | 主标题右侧文案的自定义样式 |
| switchStyle | <code>style</code> | 开关样式，仅支持宽高 |
| onTintColor |  <code>string</code> | 开关按钮打开时的背景颜色 |
| tintColor | <code>string</code> |  开关按钮关闭时的背景颜色 |
