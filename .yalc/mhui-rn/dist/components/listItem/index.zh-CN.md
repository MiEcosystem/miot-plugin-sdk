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
  onPress={() => console.log(4)}
  separator={<Separator />}
/>
```

### 参数

| 属性 | 类型 | 描述 | 默认值
| --- | --- | --- | --- |
| title | <code>string</code> | 左侧主标题 | 无
| subtitle | <code>string</code> | 右侧副标题 | `''`
| value | <code>string</code> | 右侧文案 | `''`
| onPress | <code>function</code> | 点击事件 | 无
| disabled | <code>boolean</code> | 是否禁用点击 | `false` 
| showSeparator | <code>boolean</code> | 是否显示分割线 |`true`
| hideArrow | <code>boolean</code> | 是否隐藏右侧箭头图片，(`❗️SDK_10020`新增) |  `false`
| showDot | <code>boolean</code> | 是否显示小红点 (`❗️SDK_10021`新增) | `false`
| separator | <code>React.ReactNode</code> | 自定义分割线，不传将显示默认样式的分割线 | 无
| containerStyle | <code>ViewStyle</code> | 列表项的自定义样式 | `{}`
| titleStyle | <code>TextStyle</code> | 标题的自定义样式 |`{}`
| subtitleStyle | <code>TextStyle</code> | 副标题的自定义样式 |`{}`
| valueStyle | <code>TextStyle</code> | 右侧文案的自定义样式 |`{}`



### 预览

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_3b654d16a8d8e3044829a7a67d96456d.png)

### 基本信息

| 基本信息  |                                                       |
| --------- | ----------------------------------------------------- |
| 中文名称  | 带滑动条的列表项                                      |
| 描述      | 常用的列表项，标题下方有滑动条，可设置标题/滑动条样式 |
| 位置      | `miot/ui/ListItem/ListItemWithSlider`                 |
| SDK_Level | `SDK_10004`                                           |
| 注意事项  | \                                                     |

### 使用方法

```jsx
<ListItemWithSlider
  title='自定义样式的滑动条列表项自定义样式的滑动条列表项'
  sliderProps={{ minimumValue: 25, maximumValue: 75, value: 60 }}
  sliderStyle={{
    minimumTrackTintColor: "red",
    maximumTrackTintColor: "#fff",
    style: { width: width * 0.5, alignSelf: 'center' },
    trackStyle: { height: 4, borderRadius: 2 },
    thumbStyle: { width: 30, height: 30, borderRadius: 15 },
  }}
  containerStyle={{ width: width * 0.8, backgroundColor: 'lightblue' }}
  titleStyle={{ fontSize: 17, color: 'red' }}
  valueStyle={{ fontSize: 10, color: 'yellow' }}
  showWithPercent={false}
  unit={'cal'}
  onValueChange={value => console.log(value)}
  onSlidingComplete={value => console.log(value)}
  separator={<Separator />}
/>
```

### 参数

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| title | <code>string</code> | 标题 |
| sliderProps | <code>object</code> | `slider` 的属性值<br />默认值<br />{<br />  minimumValue:0,<br />  maximumValue:100,<br />  step:1,<br />  value:50<br />}<br />`minimumValue`: 最小值<br />`maximumValue`: 最大值<br />`step`: 步长<br />`value`: 当前值 |
| showWithPercent | <code>boolean</code> | 是否以百分比显示当前值，默认值 `true` |
| unit | `string` | 当前值的单位。`showWithPercent = true` 将不显示单位<br />(`❗️SDK_10020`新增) |
| sliderStyle | <code>object</code> | `slider` 的自定义样式<br />默认值<br />{<br />minimumTrackTintColor: "#32BAC0",<br />maximumTrackTintColor: "rgba(0,0,0,0.15)",<br />thumbTintColor: "#32BAC0",<br />style: {},<br />trackStyle: { height: 2, borderRadius: 1 },<br />thumbStyle: { width: 24, height: 24, borderRadius: 12 }<br />}<br />`minimumTrackTintColor`: slider 左侧已填充颜色<br />`maximumTrackTintColor`: slider 右侧未填充颜色<br />`thumbTintColor`: 可移动圆圈的填充颜色<br />`style`: slider 容器的自定义样式<br />`trackStyle`: 轨的自定义样式<br />`thumbStyle`: 可移动圆圈的自定义样式 |
| onValueChange |  <code>(value: number) => void</code> | 滑动回调函数，返回实时的滑动值(`❗️SDK_10020`新增) |
| onSlidingComplete | <code>(value: number) => void</code> | 滑动结束回调函数 |
| disabled | <code>boolean</code> | 是否禁用滑动，默认值 `false` |
| containerStyle | <code>ViewStyle</code> | 列表项的自定义样式 |
| titleStyle | <code>TextStyle</code> | 标题的自定义样式 |
| valueStyle | <code>TextStyle</code> | `value`的自定义样式 |
| showSeparator | <code>boolean</code> | 是否显示分割线，默认值 `true` |
| separator | <code>ReactNode</code> | 自定义分割线，不传将显示默认样式的分割线 |




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

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| title | <code>string</code> | 左侧主标题 |
| subtitle | <code>string</code> | 左侧副标题，主标题下方 |
| valueText | <code>string</code> | 主标题右侧文案 |
| value | <code>boolean</code> | 开关状态，默认值 `false` |
| disabled | <code>boolean</code> | 是否禁用开关，默认值 `false` |
| onPress | <code>(event: GestureResponderEvent) => void</code> | 列表项点击事件，不传则不具有点击态（disabled） |
| onValueChange | <code>(value: boolean) => void</code> | 开关切换事件 |
| showSeparator | <code>boolean</code> | 是否显示分割线，默认值 `true` |
| separator | <code>ReactNode</code> | 自定义分割线，不传将显示默认样式的分割线 |
| containerStyle | <code>ViewStyle</code> | 列表项的自定义样式 |
| titleStyle | <code>TextStyle</code> | 主标题的自定义样式 |
| subtitleStyle | <code>TextStyle</code> | 副标题的自定义样式 |
| valueTextStyle | <code>TextStyle</code> | 主标题右侧文案的自定义样式 |
| switchStyle | <code>ViewStyle</code> | 主标题右侧开关样式，仅支持宽高，默认值 { width: 44, height: 24 }
