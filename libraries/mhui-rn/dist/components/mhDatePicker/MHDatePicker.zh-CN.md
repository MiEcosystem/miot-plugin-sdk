## 时间选择器-MHDatePicker

### 预览

![](/docImages/datepicker.png)

![](/docImages/datepicker1.png)

![](/docImages/datepicker2.png)

![](/docImages/datepicker3.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 米家时间选择器                                               |
| 描述      | 米家插件常用的时间选择器弹窗，包括*日期、时间（12/24）、单个*四种模式 |
| 位置      | `miot/ui/MHDatePicker`                                       |
| SDK_Level | `SDK_10021`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
// 当时间选择器是Date 类型时，传参 current、min、max 有三种写法
// 第一种
// let current = new Date();
// current.setDate(current.getDate() - 1); // 初始值为昨天，‘去日不可追’

// let min = new Date();
// min.setFullYear(2018);
// min.setMonth(3);
// min.setDate(16); // 2018-04-16

// let max = new Date();
// max.setFullYear(current.getFullYear() + 10);
// max.setMonth(3);
// max.setDate(16); // 十年以后的-04-16

// 第二种
// let current = ['2019', '06', '03'];
// let min = ['2018', '04', '16'];
// let max = ['2029', '04', '16'];

// 第三种
let current = [2019, 6, 3];
let min = [2018, 4, 16];
let max = [2029, 4, 16];

// 基本用法
// 日期选择器
<MHDatePicker
  visible={this.state.visible}
  title='开启日期'
  type={MHDatePicker.TYPE.DATE}
  onDismiss={_ => this.onDismiss('')}
  onSelect={res => this.onSelect(res, '')}
/>
// 时间选择器（24小时制）
<MHDatePicker
  visible={this.state.visible1}
  title='开始时间'
  type={MHDatePicker.TYPE.TIME24}
  onDismiss={_ => this.onDismiss('1')}
  onSelect={res => this.onSelect(res, '1')}
/>
// 时间选择器（12小时制）
<MHDatePicker
  visible={this.state.visible2}
  title='开始时间'
  type={MHDatePicker.TYPE.TIME12}
  onDismiss={_ => this.onDismiss('2')}
  onSelect={res => this.onSelect(res, '2')}
/>
// 单个选择器
<MHDatePicker
  visible={this.state.visible3}
  title='想要睡多久呢'
  type={MHDatePicker.TYPE.SINGLE}
  singleType={MHDatePicker.SINGLE_TYPE.MINUTE}
  onDismiss={_ => this.onDismiss('3')}
  onSelect={res => this.onSelect(res, '3')}
/>
// 自定义用法
// 自定义日期选择器
<MHDatePicker
  animationType='slide'
  visible={this.state.visible4}
  title='自定义标题(自己处理多语言)，隐藏副标题'
  showSubtitle={false}
  confirmColor='#f0ac3d'
  type={MHDatePicker.TYPE.DATE}
  current={current}
  min={min}
  max={max}
  onSelect={res => this.onSelect(res, '4')}
  onDismiss={_ => this.onDismiss('4')}
/>
// 自定义单个选择器
<MHDatePicker
  animationType='slide'
  visible={this.state.visible5}
  title='自定义标题(自己处理多语言)，隐藏副标题'
  showSubtitle={false}
  confirmColor='#f0ac3d'
  type={MHDatePicker.TYPE.SINGLE}
  singleType={MHDatePicker.SINGLE_TYPE.MINUTE}
  current={['12']}
  min={['10']}
  max={['15']}
  onSelect={res => this.onSelect(res, '5')}
  onDismiss={_ => this.onDismiss('5')}
/>
```

### 参数

#### TYPE(时间选择器类型)

| Name   | Type                | Value                           | Description            |
| ------ | ------------------- | ------------------------------- | ---------------------- |
| SINGLE | <code>string</code> | <code>&quot;single&quot;</code> | 单个picker             |
| TIME24 | <code>string</code> | <code>&quot;time24&quot;</code> | 选择小时分钟，24小时制 |
| TIME12 | <code>string</code> | <code>&quot;time12&quot;</code> | 选择小时分钟，12小时制 |
| DATE   | <code>string</code> | <code>&quot;date&quot;</code>   | 选择年月日             |

#### SINGLE\_TYPE(单个picker时选择器的类型，也就是显示的单位)

| Name   | Type                | Value                           | Description |
| ------ | ------------------- | ------------------------------- | ----------- |
| MONTH  | <code>string</code> | <code>&quot;month&quot;</code>  | 月          |
| DAY    | <code>string</code> | <code>&quot;day&quot;</code>    | 日          |
| HOUR   | <code>string</code> | <code>&quot;hour&quot;</code>   | 时          |
| MINUTE | <code>string</code> | <code>&quot;minute&quot;</code> | 分          |
| SECOND | <code>string</code> | <code>&quot;second&quot;</code> | 秒          |

| Param         | Type                                                         | Description                                                  |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| animationType | <code>string</code>                                          | modal 显示动效, 参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>                                            | 是否显示 modal, 参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| title         | <code>string</code>                                          | 标题                                                         |
| showSubtitle  | <code>bool</code>                                            | 是否显示副标题，副标题显示的内容固定，和`type`有关           |
| confirmColor  | <code>string</code>                                          | 确定按钮的颜色，默认米家绿                                   |
| type          | [<code>TYPE</code>](#type时间选择器类型)                                   | 时间选择器类型                                               |
| singleType    | [<code>SINGLE\_TYPE</code>](#single_type单个picker时选择器的类型也就是显示的单位)                    | 单个picker时的选择器类型                                     |
| current       | <code>array&lt;string&gt;</code> \| <code>arraynumber&gt;</code> \| <code>Date</code> | 当前选中值，可传入数字数组，字符串数组，Date实例，对所有时间选择器类型有效 |
| min           | <code>array&lt;string&gt;</code> \| <code>array&lt;number&gt;</code> \| <code>Date</code> | 最小值，可传入数字数组，字符串数组，Date实例，只对`'single'`和`'date'`类型生效 |
| max           | <code>array&lt;string&gt;</code> \| <code>array&lt;number&gt;</code> \| <code>Date</code> | 最大值，可传入数字数组，字符串数组，Date实例，只对`'single'`和`'date'`类型生效 |
| onSelect      | <code>function</code>                                        | 选好之后的回调函数，返回所有picker的选中值 组成的数组 / 拼接的字符串 / 以及计算出的Date实例, 详见官方 Demo（com.xiaomi.demo->UI能力->时间选择器） |
| onDismiss     | <code>function</code>                                        | 点击`Modal`内容外面/取消按钮/确定按钮，Modal隐藏时的回调函数 |
