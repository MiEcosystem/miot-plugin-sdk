## 米家弹窗-通用弹窗容器-AbstractDialog

### 背景

SDK在开放之初就内置了一些Dialog，比如：`InputDialog`、`MessageDialog`和`LoadingDialog`等。但这些弹窗都是由原生组件导出，不易维护和修改，且存在着一些问题：

- [Loading Dialog样式Android和iOS的不一致 #938](https://github.com/MiEcosystem/miot-plugin-sdk/issues/938)
- [米家Dialog类组件文字颜色是否可以提供自定义 #921](https://github.com/MiEcosystem/miot-plugin-sdk/issues/921)
- [InputDialog 控件在 iOS 端调用不起来，在 android 可以 #908](https://github.com/MiEcosystem/miot-plugin-sdk/issues/908)
- [新Dialog需求 #877](https://github.com/MiEcosystem/miot-plugin-sdk/issues/877)
- [各种 Dialog 的各种问题 #719](https://github.com/MiEcosystem/miot-plugin-sdk/issues/719)
- [Loading Dialog 在iOS上无法手动取消 #554](https://github.com/MiEcosystem/miot-plugin-sdk/issues/554)
- [SingleChoiceDialog更新Check属性后无法更新选中项目（iOS表现正常） #454](https://github.com/MiEcosystem/miot-plugin-sdk/issues/454)
- [MessageDialog 为什么只显示一次？ #222](https://github.com/MiEcosystem/miot-plugin-sdk/issues/222)
- [MessageDialog 问题 #214](https://github.com/MiEcosystem/miot-plugin-sdk/issues/214)
- [LoadingDialog 相关 #123](https://github.com/MiEcosystem/miot-plugin-sdk/issues/123)
- [miot/ui Dialog 相关组件疑问 #110](https://github.com/MiEcosystem/miot-plugin-sdk/issues/110)

这些问题的解决依赖于两个平台的APP发版，十分不灵活，因此我们用纯JS实现了一组弹窗，并抽象出通用的弹窗容器，允许开发者在满足设计规范的同时自定义弹窗内容。以下所有的弹窗都是基于`AbstractDialog`实现，如果开发者在实现自定义弹窗的时候有任何问题，可以阅读源码参考。

### 预览

![](/docImages/abstractdialog.png)

![](/docImages/abstractdialog1.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 米家插件通用弹窗容器                                         |
| 描述      | 符合米家插件设计规范的通用弹窗容器，除顶部标题和底部按钮外，可自定义弹窗内容 |
| 位置      | `miot/ui/Dialog/AbstractDialog`                              |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
<AbstractDialog
  visible={this.state.visible0}
  title={testTitle}
  subtitle={testTitle}
  showSubtitle
  onDismiss={_ => this.onDismiss('0')}
/>

// 自定义内容
<AbstractDialog
  visible={this.state.visible1}
  title={testTitle}
  subtitle={testTitle}
  showSubtitle
  onDismiss={_ => this.onDismiss('1')}
  buttons={[
    {
      text: '是吗',
      style: { color: 'lightpink' },
      callback: _ => console.log('是吗')
    },
    {
      text: '是啊',
      style: { color: '#f0ac3d' },
      callback: _ => console.log('是啊')
    }
  ]}
>
  <View
    style={{
      flex: 1,
      height: 200,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >
    <Text>你看她笑得多开心啊</Text>
  </View>
</AbstractDialog>
```

### 参数

#### Button(按钮)

| Name     | Type                  | Description        |
| -------- | --------------------- | ------------------ |
| text     | <code>string</code>   | 按钮的文字         |
| style    | <code>style</code>    | 按钮的样式         |
| callback | <code>function</code> | 点击按钮的回调函数 |

| Param         | Type                                            | Description                                                  |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| animationType | <code>string</code>                             | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>                               | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| style         | <code>style</code>                              | modal 的自定义样式                                           |
| title         | <code>string</code>                             | 标题                                                         |
| subtitle      | <code>string</code>                             | 副标题                                                       |
| showTitle     | <code>bool</code>                               | 是否显示标题，如果`false`，整个标题都不显示（包括副标题），默认`true` |
| showSubtitle  | <code>bool</code>                               | 是否显示副标题，默认`false`                                  |
| canDismiss    | <code>bool</code>                               | 是否允许点击蒙层背景隐藏 Modal，默认`true`                   |
| buttons       | [<code>Array&lt;Button&gt;</code>](#button按钮) | 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal |
| showButton    | <code>bool</code>                               | 是否显示按钮，默认`true`                                     |
| onDismiss     | <code>function</code>                           | 点击`Modal`内容外面/取消按钮/确定按钮，Modal隐藏时的回调函数 |
