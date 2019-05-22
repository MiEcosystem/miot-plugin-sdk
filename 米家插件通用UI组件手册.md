# 米家插件通用UI组件手册

## 前言

为了统一米家插件的UI风格，提高插件接入效率，米家插件SDK计划提供给插件开发者一套常用的UI组件，目前正在持续开发输出中。

**已完成**

- [导航栏(TitleBar)](#导航栏TitleBar)
- [普通列表项(ListItem)](#普通列表项ListItem)
- [带开关的列表项(ListItemWithSwitch)](#带开关的列表项ListItemWithSwitch)
- [带滑动条的列表项(ListItemWithSlider)](#带滑动条的列表项ListItemWithSlider)
- [横向分割线(Separator)](#横向分割线Separator)
- [米家插件通用设置(CommonSetting)](#米家插件通用设置CommonSetting)
- [卡片容器](#card)
- [点按选档](#normalgear)
- [拖拽选档](#draggear)
- [单选框](#radio)
- [复选框](#checkbox)
- [开关](#switch)

**开发中**

- 新版导航栏

- 常用卡片

**计划中**

- 米家弹窗

## 导航栏(TitleBar)

### 预览

![](./UIDocImages/titlebar1.png)

![](./UIDocImages/titlebar2.png)

![](./UIDocImages/titlebar3.png)

![](./UIDocImages/titlebar4.png)

![](./UIDocImages/titlebar5.png)

![](./UIDocImages/titlebar6.png)

![](./UIDocImages/titlebar7.png)

 ### 基本信息

| 基本信息  |                                        |
| --------- | -------------------------------------- |
| 中文名称  | 导航栏                                 |
| 描述      | 米家通用导航栏，目前正在开发新版导航栏 |
| 位置      | `miot/ui/TitleBar`                     |
| SDK_Level | `SDK_10000`                            |
| 注意事项  | \                                      |

*⚠️SDK_Level指的是从`SDK_XXXXX`开始可以使用该组件*

### 使用方法

```jsx
<TitleBar
  type='light'
  title='title'
  subTitle='subtitle'
  style={{ height: 65, backgroundColor: '#222' }}
  onPressLeft={() => { navigation.goBack() }}
  onPressLeft2={() => console.log('onPressLeft2')}        
  onPressRight={() => { navigation.navigate('moreMenu', { 'title': '设置' }) }}
  onPressRight2={() => console.log('onPressRight2')}
  showDot={this.state.showDot}
/>
```

### 参数

| Name | Type | Description |
| --- | --- | --- |
| type | `string` | 导航栏类型 options: ["dark", "light"(default)], `dark`默认表示白底黑字， `light`默认表示黑底白字 |
| style | `style` | 导航栏整体的样式， 会覆盖 `type`的默认设置 |
| leftTextStyle | `style` | 左侧文字样式，和 `leftText` 一起使用，不设置使用米家默认值 |
| leftText | `string` | 左侧文字 |
| onPressLeft | `func` | 左侧点击事件，设置了才显示左侧文字或图片，如果设置了`leftText`则显示设置的文字，否则显示默认的返回按钮。 |
| onPressLeft2 | `func` | 左侧的第二个点击事件，设置了才显示默认的关闭按钮， |
| rightTextStyle | `style` | 右侧文字样式，和 `rightText` 一起使用，不设置使用米家默认值 |
| rightText | `string` | 右侧文字 |
| onPressRight | `func` | 右侧点击事件，设置了才显示右侧文字或图片，如果设置了 `rightText` 则显示设置的文字，否则显示默认的更多按钮。 |
| onPressRight2 | `func` | 右侧的第二个点击事件，设置了才显示默认的分享按钮 |
| title | `string` | 中间的标题 |
| subTitle | `string` | 中间的子标题 |
| onPressTitle | `func` | 点击标题的事件 |
| showDot | `bool` | 是否显示右侧更多按钮的小红点 |

## 普通列表项(ListItem)

### 预览

![](./UIDocImages/listitem.png)

### 基本信息

| 基本信息  |                                                      |
| --------- | ---------------------------------------------------- |
| 中文名称  | 普通列表项                                           |
| 描述      | 常用的列表项，带有右箭头，可设置标题/副标题/右侧文字 |
| 位置      | `miot/ui/ListItem/ListItem`                          |
| SDK_Level | `SDK_10004`                                          |
| 注意事项  | \                                                    |

### 使用方法

```jsx
<ListItem
  title='自定义样式'
  subtitle='这是用来测试副标题的文案，尽量写长一点争取可以换行。'
  value='这是一段测试右侧文案'
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
| separator | <code>component</code> | 自定义分割线，不传将显示默认样式的分割线 |
| containerStyle | <code>style</code> | 列表项的自定义样式 |
| titleStyle | <code>style</code> | 标题的自定义样式 |
| subtitleStyle | <code>style</code> | 副标题的自定义样式 |
| valueStyle | <code>style</code> | 右侧文案的自定义样式 |

## 带开关的列表项(ListItemWithSwitch)

### 预览

![](./UIDocImages/listitemwithswitch.png)

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

## 带滑动条的列表项(ListItemWithSlider)

### 预览

![](./UIDocImages/listitemwithslider.png)

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
  onSlidingComplete={value => console.log(value)}
  separator={<Separator />}
/>
```

### 参数

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | 标题 |
| sliderProps | <code>object</code> | `slider` 的属性值<br />默认值<br />{<br />  minimumValue:0,<br />  maximumValue:100,<br />  step:1,<br />  value:50<br />}<br />`minimumValue`: 最小值<br />`maximumValue`: 最大值<br />`step`: 步长<br />`value`: 当前值 |
| showWithPercent | <code>bool</code> | 是否以百分比显示当前值，默认值 `true` |
| sliderStyle | <code>object</code> | `slider` 的自定义样式<br />默认值<br />{<br />minimumTrackTintColor: "#32BAC0",<br />maximumTrackTintColor: "rgba(0,0,0,0.15)",<br />thumbTintColor: "#32BAC0",<br />style: {},<br />trackStyle: { height: 2, borderRadius: 1 },<br />thumbStyle: { width: 24, height: 24, borderRadius: 12 }<br />}<br />`minimumTrackTintColor`: slider 左侧已填充颜色<br />`maximumTrackTintColor`: slider 右侧未填充颜色<br />`thumbTintColor`: 可移动圆圈的填充颜色<br />`style`: slider 容器的自定义样式<br />`trackStyle`: 轨的自定义样式<br />`thumbStyle`: 可移动圆圈的自定义样式 |
| onSlidingComplete | <code>function</code> | 滑动结束回调函数 |
| disabled | <code>bool</code> | 是否禁用滑动，默认值 `false` |
| containerStyle | <code>style</code> | 列表项的自定义样式 |
| titleStyle | <code>style</code> | 标题的自定义样式 |
| valueStyle | <code>style</code> | `value`的自定义样式 |
| showSeparator | <code>bool</code> | 是否显示分割线，默认值 `true` |
| separator | <code>component</code> | 自定义分割线，不传将显示默认样式的分割线 |

## 横向分割线(Separator)

### 预览

![](./UIDocImages/separator.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 横向分割线                                                   |
| 描述      | 横向分割线，常用于导航栏和列表项                             |
| 位置      | `miot/ui/Separator`                                          |
| SDK_Level | `SDK_10004`                                                  |
| 说明      | `<View style={{ height: 0.5, width: 300 }} />`的细分割线在`android`和`iOS`平台上显示不一致，于是才有了它。 |
| 注意事项  | `height`有最大限制(**maxHeight = 1**)                        |

### 使用方法

```jsx
<Separator /> // 通栏
<Separator style={{ marginLeft: 24，height: 2 }} /> // 左边距24，height设置2无效
```

### 参数

| Name | Type | Description |
| --- | --- | --- |
| style | <code>style</code> | 自定义样式 |

## 米家插件通用设置(CommonSetting)

### 预览

#### 一级页面所有设置项

![](./UIDocImages/commonsetting.png)

#### 一级页面必选设置项

![](./UIDocImages/commonsetting1.png)

#### 「更多设置」二级页面所有设置项

![](./UIDocImages/moresetting.png)

#### 「更多设置」二级页面必选设置项

![](./UIDocImages/moresetting1.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 米家插件通用设置                                             |
| 描述      | 米家插件的通用设置，除了必选项外，可以自定义显示哪些设置项。 |
| 位置      | `miot/ui/CommonSetting/CommonSetting`                        |
| SDK_Level | `SDK_10005`                                                  |
| 注意事项  | 鉴于好多插件开发者**使用不当/直接复制demo**，需要说明的注意事项比较多，详见[详细说明](#详细说明)⬇️ |

#### 详细说明

- 

### 使用方法

```jsx
<Separator /> // 通栏
<Separator style={{ marginLeft: 24，height: 2 }} /> // 左边距24，height设置2无效
```

### 参数

## Card

/**

 \* *@export*

 \* *@author* Geeook

 \* *@since* 10004

 \* *@module* ListItemWithSwitch

 \* *@description* 带开关的列表项

 \* *@property* {string} title - 左侧主标题

 \* *@property* {string} subtitle - 左侧副标题，主标题下方

 \* *@property* {string} valueText - 主标题右侧文案

 \* *@property* {bool} value - 开关状态，默认值 false

 \* *@property* {bool} disabled - 是否禁用开关，默认值 false

 \* *@property* {function} onPress - 列表项点击事件，不传则不具有点击态（disabled）

 \* *@property* {function} onValueChange - 开关切换事件

 \* *@property* {bool} showSeparator - 是否显示分割线，默认值 true

 \* *@property* {component} separator - 自定义分割线，不传将显示默认样式的分割线

 \* *@property* {style} containerStyle - 列表项的自定义样式

 \* *@property* {style} titleStyle - 主标题的自定义样式

 \* *@property* {style} subtitleStyle - 副标题的自定义样式

 \* *@property* {style} valueTextStyle - 主标题右侧文案的自定义样式

 */

## NormalGear

/**

 \* *@export*

 \* *@author* Geeook

 \* *@since* 10004

 \* *@module* ListItemWithSwitch

 \* *@description* 带开关的列表项

 \* *@property* {string} title - 左侧主标题

 \* *@property* {string} subtitle - 左侧副标题，主标题下方

 \* *@property* {string} valueText - 主标题右侧文案

 \* *@property* {bool} value - 开关状态，默认值 false

 \* *@property* {bool} disabled - 是否禁用开关，默认值 false

 \* *@property* {function} onPress - 列表项点击事件，不传则不具有点击态（disabled）

 \* *@property* {function} onValueChange - 开关切换事件

 \* *@property* {bool} showSeparator - 是否显示分割线，默认值 true

 \* *@property* {component} separator - 自定义分割线，不传将显示默认样式的分割线

 \* *@property* {style} containerStyle - 列表项的自定义样式

 \* *@property* {style} titleStyle - 主标题的自定义样式

 \* *@property* {style} subtitleStyle - 副标题的自定义样式

 \* *@property* {style} valueTextStyle - 主标题右侧文案的自定义样式

 */

## DragGear

/**

 \* *@export*

 \* *@author* Geeook

 \* *@since* 10004

 \* *@module* ListItemWithSwitch

 \* *@description* 带开关的列表项

 \* *@property* {string} title - 左侧主标题

 \* *@property* {string} subtitle - 左侧副标题，主标题下方

 \* *@property* {string} valueText - 主标题右侧文案

 \* *@property* {bool} value - 开关状态，默认值 false

 \* *@property* {bool} disabled - 是否禁用开关，默认值 false

 \* *@property* {function} onPress - 列表项点击事件，不传则不具有点击态（disabled）

 \* *@property* {function} onValueChange - 开关切换事件

 \* *@property* {bool} showSeparator - 是否显示分割线，默认值 true

 \* *@property* {component} separator - 自定义分割线，不传将显示默认样式的分割线

 \* *@property* {style} containerStyle - 列表项的自定义样式

 \* *@property* {style} titleStyle - 主标题的自定义样式

 \* *@property* {style} subtitleStyle - 副标题的自定义样式

 \* *@property* {style} valueTextStyle - 主标题右侧文案的自定义样式

 */

## Radio

/**

 \* *@export*

 \* *@author* Geeook

 \* *@since* 10004

 \* *@module* ListItemWithSwitch

 \* *@description* 带开关的列表项

 \* *@property* {string} title - 左侧主标题

 \* *@property* {string} subtitle - 左侧副标题，主标题下方

 \* *@property* {string} valueText - 主标题右侧文案

 \* *@property* {bool} value - 开关状态，默认值 false

 \* *@property* {bool} disabled - 是否禁用开关，默认值 false

 \* *@property* {function} onPress - 列表项点击事件，不传则不具有点击态（disabled）

 \* *@property* {function} onValueChange - 开关切换事件

 \* *@property* {bool} showSeparator - 是否显示分割线，默认值 true

 \* *@property* {component} separator - 自定义分割线，不传将显示默认样式的分割线

 \* *@property* {style} containerStyle - 列表项的自定义样式

 \* *@property* {style} titleStyle - 主标题的自定义样式

 \* *@property* {style} subtitleStyle - 副标题的自定义样式

 \* *@property* {style} valueTextStyle - 主标题右侧文案的自定义样式

 */

## Checkbox

/**

 \* *@export*

 \* *@author* Geeook

 \* *@since* 10004

 \* *@module* ListItemWithSwitch

 \* *@description* 带开关的列表项

 \* *@property* {string} title - 左侧主标题

 \* *@property* {string} subtitle - 左侧副标题，主标题下方

 \* *@property* {string} valueText - 主标题右侧文案

 \* *@property* {bool} value - 开关状态，默认值 false

 \* *@property* {bool} disabled - 是否禁用开关，默认值 false

 \* *@property* {function} onPress - 列表项点击事件，不传则不具有点击态（disabled）

 \* *@property* {function} onValueChange - 开关切换事件

 \* *@property* {bool} showSeparator - 是否显示分割线，默认值 true

 \* *@property* {component} separator - 自定义分割线，不传将显示默认样式的分割线

 \* *@property* {style} containerStyle - 列表项的自定义样式

 \* *@property* {style} titleStyle - 主标题的自定义样式

 \* *@property* {style} subtitleStyle - 副标题的自定义样式

 \* *@property* {style} valueTextStyle - 主标题右侧文案的自定义样式

 */

## Switch

/**

 \* *@export*

 \* *@author* Geeook

 \* *@since* 10004

 \* *@module* ListItemWithSwitch

 \* *@description* 带开关的列表项

 \* *@property* {string} title - 左侧主标题

 \* *@property* {string} subtitle - 左侧副标题，主标题下方

 \* *@property* {string} valueText - 主标题右侧文案

 \* *@property* {bool} value - 开关状态，默认值 false

 \* *@property* {bool} disabled - 是否禁用开关，默认值 false

 \* *@property* {function} onPress - 列表项点击事件，不传则不具有点击态（disabled）

 \* *@property* {function} onValueChange - 开关切换事件

 \* *@property* {bool} showSeparator - 是否显示分割线，默认值 true

 \* *@property* {component} separator - 自定义分割线，不传将显示默认样式的分割线

 \* *@property* {style} containerStyle - 列表项的自定义样式

 \* *@property* {style} titleStyle - 主标题的自定义样式

 \* *@property* {style} subtitleStyle - 副标题的自定义样式

 \* *@property* {style} valueTextStyle - 主标题右侧文案的自定义样式

 */