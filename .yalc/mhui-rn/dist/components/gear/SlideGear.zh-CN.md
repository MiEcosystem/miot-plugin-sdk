## 滑动选档-SlideGear

### 预览

![](/docImages/slidegear.gif)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 滑动选档                                                     |
| 描述      | 类似于Slider，使用滑动手势选择具体值。<br />适用于一段范围的选值或者较多档位的切换。 |
| 位置      | `miot/ui/Gear/SlideGear`                                     |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
<Text style={styles.label}>
  {`滑动选择档位(圆形滑块)`}
</Text>
<SlideGear
  options={this.options}
  value={this.state.selectIndex}
  containerStyle={{ width: width * 0.75 }}
  onValueChange={index => this.callback(index)}
  onSlidingComplete={index => this.callback(index)}
/>
<Text style={styles.label}>
  {`滑动选择档位(方形滑块)`}
</Text>
<SlideGear
  type={SlideGear.TYPE.RECTANGLE}
  options={this.options}
  showEndText={false}
  containerStyle={{ width: width * 0.75, height: 66 }}
  blockStyle={{ width: 30, backgroundColor: 'red' }}
  minimumTrackTintColor='lightpink'
  maximumTrackTintColor='skyblue'
  value={this.state.selectIndex}
  onValueChange={index => this.callback(index)}
  onSlidingComplete={index => this.callback(index)}
/>
```

### 参数

#### TYPE(容器和滑块的圆角类型)

| Name      | Type                | Value                              | Description |
| --------- | ------------------- | ---------------------------------- | ----------- |
| CIRCLE    | <code>string</code> | <code>&quot;circle&quot;</code>    | 圆形 ⭕️      |
| RECTANGLE | <code>string</code> | <code>&quot;rectangle&quot;</code> | 方形 ⬜️      |

| Name                  | Type                                           | Description                                                  |
| --------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| type                  | [<code>TYPE</code>](#type容器和滑块的圆角类型) | 容器和滑块的圆角类型                                         |
| options               | <code>array&lt;string&gt;</code>               | 档位可选项，以字符串数组表示，必填                           |
| showEndText           | <code>bool</code>                              | 是否显示两端的文字，即`options`的第一个和最后一个，默认`true` |
| containerStyle        | <code>style</code>                             | 容器样式，设置背景颜色无效                                   |
| blockStyle            | <code>style</code>                             | 滑块样式，尺寸始终比容器小                                   |
| minimumTrackTintColor | <code>string</code>                            | 滑块左侧填充颜色                                             |
| leftTextColor         | <code>string</code>                            | 最左侧文字颜色，`showEndText = true`时有效                   |
| maximumTrackTintColor | <code>string</code>                            | 滑块右侧填充颜色                                             |
| rightTextColor        | <code>string</code>                            | 最右侧文字颜色，`showEndText = true`时有效                   |
| value                 | <code>number</code>                            | 被选择档位的数组下标, `0<=value<=options.length -1`          |
| disabled              | `boolean`                                      | 是否禁用交互，默认`false`(`❗️SDK_10023`新增)                  |
| onValueChange         | <code>function</code>                          | 滑动时的回调函数                                             |
| onSlidingComplete     | <code>function</code>                          | 滑动结束的回调函数                                           |
