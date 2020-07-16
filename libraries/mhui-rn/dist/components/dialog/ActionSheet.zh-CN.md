## 米家弹窗-操作列表-ActionSheet

### 预览

![](/docImages/actionsheet.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 操作列表                                                     |
| 描述      | 弹窗提示，让用户选择不同的操作，和iOS原生的[ActionSheet](https://facebook.github.io/react-native/docs/0.54/actionsheetios#docsNav)相似 |
| 位置      | `miot/ui/Dialog/ActionSheet`                                 |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  |  |

### 使用方法

```jsx
<ActionSheet
  visible={this.state.visible15}
  options={[
    {
      title: '🙈',
      subtitle: '🙈',
      onPress: _ => console.log('非礼勿视')
    },
    {
      title: '🙉',
      onPress: _ => console.log('非礼勿听')
    },
    {
      title: '🙊',
      subtitle: '🙊',
      onPress: _ => console.log('非礼勿言')
    }
  ]}
  buttons={[
    {
      text: '取消',
      style: { color: 'lightblue' },
      callback: _ => this.setState({ visible15: false })
    }
  ]}
  onDismiss={_ => this.onDismiss('15')}
/>
```

### 参数

#### Opiton(可点击的选项)

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | 主文案 |
| subtitle | <code>string</code> | 副文案 |
| onPress | <code>function</code> | 点击回调函数 |

| Param | Type | Description |
| --- | --- | --- |
| animationType | <code>string</code> | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible | <code>bool</code> | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| options | [<code>Array&lt;Opiton&gt;</code>](#Opiton可点击的选项) | 可点击的选项 |
| buttons | [<code>Array&lt;Button&gt;</code>](#button按钮)        | 和`AbstractDialog`的`buttons`属性相同 |
| onDismiss | <code>function</code> | Modal 隐藏时的回调函数 |
