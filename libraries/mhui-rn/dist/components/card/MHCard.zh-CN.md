## 常用卡片-MHCard

### 预览

![](/docImages/mhcard.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 常用卡片                                                     |
| 描述      | 基于卡片容器开发的米家插件常用的功能卡片，有阴影，有弹出和收起动效。 |
| 位置      | `miot/ui/Card/MHCard`                                        |
| SDK_Level | `SDK_10021`                                                  |
| 说明      | 可以通过设置卡片四角的圆角，把小卡片拼接成一个大的卡片List，详见[使用方法](#使用方法-8)⬇️。 |
| 注意事项  | \                                                            |

### 使用方法

```jsx
// 右侧文字 + 箭头
<MHCard
  title='标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题'
  titleStyle={{ color: '#f0ac3d', fontSize: 18 }}
  subtitle='副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题'
  subtitleStyle={{ color: 'blue', fontSize: 15 }}
  rightText='测试测试测试测试测试测试测试测试测试'
  rightTextStyle={{ color: '#f43f31', fontSize: 13 }}
  cardType={MHCard.CARD_TYPE.NORMAL}
  cardRadiusType={MHCard.CARD_RADIUS_TYPE.ALL}
  onPress={_ => console.log('onPress')}
  showShadow={true}
  visible={this.state.visible5}
  marginTop={15}
/>

// 右侧开关
<MHCard
  title='标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题'
  titleStyle={{ color: '#f0ac3d', fontSize: 18 }}
  subtitle='副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题副标题'
  subtitleStyle={{ color: 'blue', fontSize: 15 }}
  cardType={MHCard.CARD_TYPE.SWITCH}
  cardRadiusType={MHCard.CARD_RADIUS_TYPE.NONE}
  onValueChange={value => console.log(value)}
  onPress={_ => console.log('onPress')}
  switchValue={this.state.value}
  tintColor='#666'
  onTintColor='#67b688'
  showShadow={true}
  marginTop={15}
/>

// 拼接成卡片List
<MHCard
  title='滤芯购买'
  subtitle='约可用27天，去商城看看'
  rightText='20 %'
  marginTop={15}
  cardType={MHCard.CARD_TYPE.NORMAL}
  cardRadiusType={MHCard.CARD_RADIUS_TYPE.TOP} // 上圆角
  onPress={_ => console.log('onPress')}
/>
<Separator style={{ height: 0.75 }} />
<MHCard
  title='警报器提示音'
  onValueChange={value => console.log(value)}
  switchValue={this.state.value}
  onTintColor='#67b688'
  cardType={MHCard.CARD_TYPE.SWITCH}
  cardRadiusType={MHCard.CARD_RADIUS_TYPE.NONE} // 无圆角
/>
<Separator style={{ height: 0.75 }} />
<MHCard
  title='运行异常提醒'
  subtitle='当设备运行异常时，将通知提醒您'
  disabled={true}
  switchValue={this.state.value}
  onTintColor='#67b688'
  onValueChange={value => console.log(value)}
  cardType={MHCard.CARD_TYPE.SWITCH}
  showShadow={true}
  cardRadiusType={MHCard.CARD_RADIUS_TYPE.BOTTOM}
/>
```

### 参数

#### CARD\_TYPE(卡片类型)

| Name   | Type                | Value                           | Description                |
| ------ | ------------------- | ------------------------------- | -------------------------- |
| NORMAL | <code>string</code> | <code>&quot;normal&quot;</code> | 普通卡片，卡片右侧不是开关 |
| SWITCH | <code>string</code> | <code>&quot;switch&quot;</code> | 开关卡片，卡片右侧是开关   |

#### CARD\_RADIUS\_TYPE(卡片圆角类型)

| Name   | Type                | Value                           | Description      |
| ------ | ------------------- | ------------------------------- | ---------------- |
| ALL    | <code>string</code> | <code>&quot;all&quot;</code>    | 四角都是圆角     |
| NONE   | <code>string</code> | <code>&quot;none&quot;</code>   | 四角都是直角     |
| TOP    | <code>string</code> | <code>&quot;top&quot;</code>    | 上方圆角下方直角 |
| BOTTOM | <code>string</code> | <code>&quot;bottom&quot;</code> | 上方直角下方圆角 |

| Param          | Type                                                 | Description                                                  |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| cardType       | [<code>CARD\_TYPE</code>](#card_type卡片类型)                | 卡片类型，右侧是否是开关，默认是 `CARD_TYPE.NORMAL`          |
| cardRadiusType | [<code>CARD\_RADIUS\_TYPE</code>](#card_radius_type卡片圆角类型) | 卡片圆角类型，定义四个角是圆角还是直角，默认是 `CARD_RADIUS_TYPE.ALL`，所有的卡片类型有效 |
| iconContainerStyle | <code>style</code> | 图标容器的样式 |
| icon | <code>number</code> | 左侧图标的资源 id, 参照`Image`的`resource`属性，所有的卡片类型有效 |
| iconStyle | <code>style</code> | 图标的样式 |
| title          | <code>string</code>                                  | 左侧主标题，所有的卡片类型有效                               |
| titleStyle     | <code>style</code>                                   | 左侧主标题的自定义样式，所有的卡片类型有效                   |
| subtitle       | <code>string</code>                                  | 左侧副标题，如果有的话，显示在主标题的下方，没有则不显示，所有的卡片类型有效 |
| subtitleStyle  | <code>style</code>                                   | 左侧副标题的自定义样式，所有的卡片类型有效                   |
| rightText      | <code>string</code>                                  | 右侧文案，如果有的话，显示在右箭头的左侧，没有则不显示，当卡片类型是`CARD_TYPE.NORMAL`有效 |
| rightTextStyle | <code>style</code>                                   | 右侧文案的自定义样式，当卡片类型是`CARD_TYPE.NORMAL`有效     |
| hideArrow      | <code>bool</code>                                    | 是否隐藏右侧箭头图片，默认值 `false`，当卡片类型是`CARD_TYPE.NORMAL`有效 |
| onPress        | <code>function</code>                                | 点击卡片的回调函数，所有的卡片类型有效                       |
| switchValue    | <code>bool</code>                                    | 开关的状态，默认是 `false`，当卡片类型是`CARD_TYPE.SWITCH`有效 |
| onTintColor    | <code>string</code>                                  | 开关打开时的背景颜色，当卡片类型是`CARD_TYPE.SWITCH`有效     |
| tintColor      | <code>string</code>                                  | 开关关闭时的背景颜色，当卡片类型是`CARD_TYPE.SWITCH`有效     |
| onValueChange  | <code>function</code>                                | 点击卡片开关的回调函数，当卡片类型是`CARD_TYPE.SWITCH`有效   |
| disabled       | <code>bool</code>                                    | 是否禁用卡片，默认是 `false`，禁用时显示不可点击态，所有的卡片类型有效 |
| visible        | <code>bool</code>                                    | 是否显示卡片，默认是 `true`，改变该值将显示/隐藏卡片，有弹出和收起动效，所有的卡片类型有效 |
| showShadow     | <code>bool</code>                                    | 是否显示卡片阴影，默认是 `false`，所有的卡片类型有效         |
| marginTop      | <code>number</code>                                  | 卡片的上边距，默认 `0`，所有的卡片类型有效                   |
