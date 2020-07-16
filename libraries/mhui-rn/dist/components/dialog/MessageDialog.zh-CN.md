## 米家弹窗-消息弹窗-MessageDialog

### 预览

![](/docImages/messagedialog.png)

![](/docImages/messagedialog1.png)

![](/docImages/messagedialog2.png)

![](/docImages/messagedialog3.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 消息弹窗                                                     |
| 描述      | 弹出一段消息文字提示用户。允许多行文案，但请尽量精简，组件最多显示**15**行。同时允许其他交互，比如勾选和下划线点击 |
| 位置      | `miot/ui/Dialog/MessageDialog`                               |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
// 无标题
<MessageDialog
  visible={this.state.visible4}
  buttons={[
    {
      text: '我了解了',
      style: { color: 'lightpink' },
      callback: _ => this.setState({ visible4: false })
    },
  ]}
  onDismiss={_ => this.onDismiss('4')}
/>
// 有标题
<MessageDialog
  visible={this.state.visible5}
  title='消息弹窗自定义标题'
  message={testText}
  buttons={[
    {
      text: '消失',
      style: { color: 'lightpink' },
      callback: _ => this.setState({ visible5: false })
    },
    {
      text: '不消失',
      style: { color: 'lightblue' },
      callback: _ => console.log('不消失')
    },
  ]}
  onDismiss={_ => this.onDismiss('5')}
/>
// 带下划线
<MessageDialog
  type={MessageDialog.TYPE.UNDERLINE}
  visible={this.state.visible6}
  color='#f0ac3d'
  title='下划线消息弹窗'
  message={testText}
  extraText='你点我一下试试'
  extra={{
    onPress: _ => alert('点击了下划线')
  }}
  buttons={[
    {
      text: '取消',
      style: { color: 'lightpink' },
      callback: _ => this.setState({ visible6: false })
    },
    {
      text: '确认',
      style: { color: 'lightblue' },
      callback: obj => {
        console.log(`是否点击了下划线: ${obj.hasPressUnderlineText}`);
        this.setState({ visible6: false })
      }
    },
  ]}
  onDismiss={_ => this.onDismiss('6')}
/>
// 带勾选框
<MessageDialog
  type={MessageDialog.TYPE.CHECKBOX}
  visible={this.state.visible7}
  color='#f0ac3d'
  title='勾选框消息弹窗'
  message={testText}
  extraText='快点我试试'
  extra={this.state.extra}
  buttons={[
    {
      text: '取消',
      style: { color: 'lightpink' },
      callback: _ => this.setState({ visible7: false })
    },
    {
      text: '确认',
      style: { color: 'lightblue' },
      callback: obj => {
        console.log(`是否勾选: ${obj.checked}`);
        this.setState({ visible7: false })
      }
    },
  ]}
  onDismiss={_ => this.onDismiss('7')}
/>
```

### 参数

#### TYPE(消息弹窗的类型)

| Name      | Type                | Default                            | Description        |
| --------- | ------------------- | ---------------------------------- | ------------------ |
| SIMPLE    | <code>string</code> | <code>&quot;simple&quot;</code>    | 普通，只有提示文字 |
| UNDERLINE | <code>string</code> | <code>&quot;underline&quot;</code> | 带下划线超链接     |
| CHECKBOX  | <code>string</code> | <code>&quot;checkbox&quot;</code>  | 带勾选框           |

#### Extra(下划线超链接或者勾选框需要的其他数据)
| Name    | Type                  | Description                                        |
| ------- | --------------------- | -------------------------------------------------- |
| checked | <code>boolean</code>  | 勾选框的初始勾选状态，只对`TYPE.CHECKBOX`有效      |
| onPress | <code>function</code> | 点击下划线链接的回调函数，只对`TYPE.UNDERLINE`有效 |

| Param         | Type                                                         | Description                                                  |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| animationType | <code>string</code>                                          | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>                                            | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| type          | [<code>TYPE</code>](#type消息弹窗的类型)                     | 消息弹窗的类型。是否只有提示文字，是否有下划线超链接，或者是否有勾选项，详见 `TYPE`，默认 `TYPE.SIMPLE` |
| color         | <code>string</code>                                          | 下划线超链接的文字颜色 / 勾选框的勾选颜色，默认米家绿        |
| title         | <code>string</code>                                          | 标题文字，不传或者为空字符串将不显示标题栏，默认不显示       |
| message       | <code>string</code>                                          | 提示信息文字，可显示单行或者多行，最多**15**行               |
| extraText     | <code>string</code>                                          | 下划线超链接的文字 / 勾选框右侧的说明文字                    |
| extra         | [<code>Extra</code>](#extra下划线超链接或者勾选框需要的其他数据) | 下划线超链接或者勾选框需要的其他数据，只对`TYPE.UNDERLINE`和`TYPE.CHECKBOX`有效 |
| buttons       | [<code>Array&lt;Button&gt;</code>](#button按钮)              | 和`AbstractDialog`的`buttons`属性相同                        |
| onDismiss     | <code>function</code>                                        | Modal 隐藏时的回调函数                                       |
