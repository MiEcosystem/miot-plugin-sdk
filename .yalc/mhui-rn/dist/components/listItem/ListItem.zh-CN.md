## 普通列表项-ListItem

### 预览

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_9a70b4bc22847b4a6492ec09dcb0ce3b.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 普通列表项                                                   |
| 描述      | 常用的列表项，带有右箭头（可隐藏），可设置标题/副标题/右侧文字 |
| 位置      | `miot/ui/ListItem/ListItem`                                  |
| SDK_Level | `SDK_10004`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
<ListItem
  title='自定义样式'
  subtitle='这是用来测试副标题的文案，尽量写长一点争取可以换行。'
  value='这是一段测试右侧文案'
  hideArrow={true}
  showDot={true}
  containerStyle={{ width: width * 0.8, backgroundColor: 'lightblue' }}
  titleStyle={{ fontSize: 17, color: 'red' }}
  subtitleStyle={{ fontSize: 10, color: 'green' }}
  valueStyle={{ fontSize: 10, color: 'yellow' }}
  onPress={_ => console.log(4)}
  separator={<Separator />}
/>
```

### 参数

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | 左侧主标题 |
| subtitle | <code>string</code> | 右侧副标题 |
| value | <code>string</code> | 右侧文案 |
| onPress | <code>function</code> | 点击事件 |
| disabled | <code>bool</code> | 是否禁用点击，默认值 `false` |
| showSeparator | <code>bool</code> | 是否显示分割线，默认值 `true` |
| hideArrow | `bool` | 是否隐藏右侧箭头图片，默认值 `false`(`❗️SDK_10020`新增) |
| showDot | `bool` | 是否显示小红点，默认值`false`(`❗️SDK_10021`新增) |
| separator | <code>component</code> | 自定义分割线，不传将显示默认样式的分割线 |
| containerStyle | <code>style</code> | 列表项的自定义样式 |
| titleStyle | <code>style</code> | 标题的自定义样式 |
| subtitleStyle | <code>style</code> | 副标题的自定义样式 |
| valueStyle | <code>style</code> | 右侧文案的自定义样式 |
