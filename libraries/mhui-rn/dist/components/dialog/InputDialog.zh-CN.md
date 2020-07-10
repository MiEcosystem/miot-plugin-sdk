## 米家弹窗-输入弹窗-InputDialog

### 预览

![](/docImages/inputdialog.png)

![](/docImages/inputdialog1.png)

![](/docImages/inputdialog2.png)

![](/docImages/inputdialog3.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 输入弹窗                                                     |
| 描述      | 提示用户录入信息并记录。输入框弹窗的业务场景有时候会很复杂，如果本组件无法满足你的业务需求，请使用 `AbstractDialog` 参考本组件源码自行实现 |
| 位置      | `miot/ui/Dialog/InputDialog`                                 |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  | `TextInput` 的 `onEndEditing`不能使用                        |

### 使用方法

```jsx
<InputDialog
  visible={this.state.visible8}
  title='最简单输入弹窗'
  onDismiss={_ => this.onDismiss('8')}
/>
<InputDialog
  type={InputDialog.TYPE.UNDERLINE}
  visible={this.state.visible9}
  title='带下划线输入弹窗'
  underlineData={{
    leftText: '请输入你的ID',
    underlineText: '还没有ID？注册一个',
    onPress: _ => alert('你注册的ID是123456')
  }}
  buttons={[
    {
      text: '取消',
      style: { color: 'lightpink' },
      callback: _ => this.setState({ visible9: false })
    },
    {
      text: '保存',
      style: { color: 'lightblue' },
      callback: result => {
        console.log(`结果`, result);
        this.setState({ visible9: false });
      }
    },
  ]}
  onDismiss={_ => this.onDismiss('9')}
/>
<InputDialog
  type={InputDialog.TYPE.CHECKBOX}
  visible={this.state.visible10}
  title='带☑️输入弹窗'
  checkboxData={{
    checked: true,
      text: '记住密码'
  }}
  buttons={[
    {
      text: '取消',
      style: { color: 'lightpink' },
      callback: _ => this.setState({ visible10: false })
    },
    {
      text: '保存',
      style: { color: 'lightblue' },
      callback: result => {
        console.log(`结果`, result);
        this.setState({ visible10: false });
      }
    },
  ]}
  onDismiss={_ => this.onDismiss('10')}
/>
<InputDialog
  visible={this.state.visible11}
  type={InputDialog.TYPE.BOTH}
  color='#f0ac3d'
  title='多TextInput复杂输入弹窗'
  underlineData={{
    leftText: '请输入你的ID',
    underlineText: '还没有ID？注册一个',
    onPress: _ => alert('你注册的ID是123456')
  }}
  inputs={this.state.inputs}
  checkboxData={this.state.checkboxData}
  buttons={[
    {
      text: '取消',
      style: { color: 'lightpink' },
      callback: _ => this.setState({ visible11: false })
    },
    {
      text: '保存',
      style: { color: 'lightblue' },
      callback: result => {
        console.log(`结果`, result);
        this.setState({ visible11: false });
      }
    },
  ]}
  onDismiss={_ => this.onDismiss('11')}
/>
```

### 参数

#### TYPE(输入弹窗的类型)

| Name      | Type                | Default                            | Description                                                 |
| --------- | ------------------- | ---------------------------------- | ----------------------------------------------------------- |
| SIMPLE    | <code>string</code> | <code>&quot;simple&quot;</code>    | 普通，只有输入框                                            |
| UNDERLINE | <code>string</code> | <code>&quot;underline&quot;</code> | 输入框上方有文字说明和下划线超链接                          |
| CHECKBOX  | <code>string</code> | <code>&quot;checkbox&quot;</code>  | 输入框下方有勾选框和文字                                    |
| BOTH      | <code>string</code> | <code>&quot;both&quot;</code>      | 输入框上方有文字说明和下划线超链接 输入框下方有勾选框和文字 |

#### UnderlineData(输入框上方下划线数据)

| Name          | Type                  | Description              |
| ------------- | --------------------- | ------------------------ |
| leftText      | <code>string</code>   | 左侧说明文字             |
| underlineText | <code>string</code>   | 右侧下划线文字           |
| onPress       | <code>function</code> | 点击下划线文字的回调函数 |

#### Input(输入框)

| Name           | Type                  | Description                                                  |
| -------------- | --------------------- | ------------------------------------------------------------ |
| placeholder    | <code>string</code>   | 占位文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#placeholder |
| defaultValue   | <code>string</code>   | 初始默认文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#defaultvalue |
| onChangeText   | <code>function</code> | 文字变化回调，参考 https://facebook.github.io/react-native/docs/0.54/textinput#onchangetext |
| textInputProps | <code>Object</code>   | 其他 TextInput 支持的属性，参考 https://facebook.github.io/react-native/docs/0.54/textinput#props |

#### CheckboxData(输入框下方勾选框数据)

| Name    | Type                 | Description          |
| ------- | -------------------- | -------------------- |
| checked | <code>boolean</code> | 勾选框的初始勾选状态 |
| text    | <code>string</code>  | 勾选框右侧的说明文字 |

| Param         | Type                                                         | Description                                                  |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| animationType | <code>string</code>                                          | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>                                            | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| type          | [<code>TYPE</code>](#TYPE输入弹窗的类型)                     | 输入弹窗的类型。是否只有输入框，输入框上方是否有下划线超链接，输入框下方是否有勾选项，详见 `TYPE`，默认 `TYPE.SIMPLE` |
| color         | <code>string</code>                                          | 下划线超链接的文字颜色 / 勾选框的勾选颜色，默认米家绿        |
| title         | <code>string</code>                                          | 标题文字                                                     |
| underlineData | [<code>UnderlineData</code>](#UnderlineData输入框上方下划线数据) | 输入框上方的数据，包括左侧说明文字，右侧下划线文字及其点击回调函数，只对 `TYPE.UNDERLINE` 和 `TYPE.BOTH` 有效 |
| inputs        | [<code>Array&lt;Input&gt;</code>](#Input输入框)              | 输入框数组，定义输入框的属性，对所有的 `TYPE` 有效           |
| checkboxData  | [<code>CheckboxData</code>](#CheckboxData输入框下方勾选框数据) | 输入框下方的数据，包括勾选状态，描述文字，只对 `TYPE.CHECKBOX` 和 `TYPE.BOTH` 有效 |
| buttons       | [<code>Array&lt;Button&gt;</code>](#button按钮)              | 和`AbstractDialog`的`buttons`属性相同                        |
| onDismiss     | <code>function</code>                                        | Modal 隐藏时的回调函数                                       |
