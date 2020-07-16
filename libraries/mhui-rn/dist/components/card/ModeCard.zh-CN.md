## 模式卡片-ModeCard

### 预览

![](/docImages/modecard.png)

![](/docImages/modecard.gif)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 模式卡片                                                     |
| 描述      | 此卡片用于3-5个属于同一级别和类别的功能或模式逻辑下，只能选中其中一个。 |
| 位置      | `miot/ui/ModeCard`                                           |
| SDK_Level | `SDK_10021`                                                  |
| 说明      | 可以设置卡片的圆角类型，与标题拼接在一起。可以设置是否显示阴影，模式3、4可以添加描述。详见[使用方法](#使用方法-9)⬇️。 |
| 注意事项  | 由于安卓的阴影显示存在问题，在和标题进行卡片拼接时，不能显示阴影，`showShadow` 属性请传入 `false`。 |

### 使用方法

```jsx
// 无标题
<ModeCard
  modes={modes3}
  pressIn={this.pressInDemo}
  pressOut={this.pressOutDemo}
  modesKey='modes3'
  descriptionStyle={{
    color: 'blue',
  }}
  activeDescriptionStyle={{
    color: 'red',
    fontWeight: '700'
  }}
  modeCardStyle={{
    marginTop: 20,
  }}
/>

// 有标题
<View style={styles.cardTop}>
  <Text style={styles.title}>主标题</Text>
  <Text style={styles.subtitle}>副标题</Text>
</View>
<ModeCard
  modes={modes2}
  pressIn={this.pressInDemo}
  pressOut={this.pressOutDemo}
  modesKey='modes2'
  radiusType='bottom'
  showShadow={false}
/>
```

### 参数

#### CARD\_RADIUS\_TYPE(卡片圆角类型)

| Name   | Type                | Value                           | Description      |
| ------ | ------------------- | ------------------------------- | ---------------- |
| ALL    | <code>string</code> | <code>&quot;all&quot;</code>    | 四角都是圆角     |
| NONE   | <code>string</code> | <code>&quot;none&quot;</code>   | 四角都是直角     |
| TOP    | <code>string</code> | <code>&quot;top&quot;</code>    | 上方圆角下方直角 |
| BOTTOM | <code>string</code> | <code>&quot;bottom&quot;</code> | 上方直角下方圆角 |

| Param                  | Type                                                         | Description                                                  |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| modes                  | <code>array</code>                                           | 模式数组，默认值：`[]`                                       |
| radiusType             | [<code>CARD\_RADIUS\_TYPE</code>](#card_radius_type卡片圆角类型-1) | 卡片圆角类型，定义四个角是圆角还是直角，默认是 `CARD_RADIUS_TYPE.ALL`，所有的卡片类型有效 |
| pressIn                | <code>function</code>                                        | 按下模式时执行的函数，默认值：`function(){}`                 |
| pressOut               | <code>function</code>                                        | 手指抬起模式时执行的函数，默认值：`function(){}`             |
| modesKey               | <code>string</code>                                          | 模式数组对应的 key，默认值：`''`                             |
| descriptionStyle       | <code>style</code>                                           | 描述文字的样式，默认值：`{}`                                 |
| activeDescriptionStyle | <code>style</code>                                           | 描述文字的高亮样式，默认值：`{}`                             |
| showShadow             | <code>bool</code>                                            | 是否显示卡片阴影, 默认值 `true`。由于安卓的阴影显示存在问题，在和标题进行卡片拼接时，不能显示阴影，请传入 `false` |
| modeCardStyle          | <code>style</code>                                           | 模式卡片样式, 默认值 `{}`                                    |
