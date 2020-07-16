## 米家弹窗-加载弹窗-LoadingDialog

### 预览

![](/docImages/loadingdialog.gif)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 加载弹窗                                                     |
| 描述      | 通过加载动画和文案提示用户需要等待，点击背景不会隐藏，可通过改变`visible` 属性隐藏，也可以设置超时时间 |
| 位置      | `miot/ui/Dialog/LoadingDialog`                               |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
<LoadingDialog
  visible={this.state.visible2}
  message='加载中，请稍后...'
  timeout={3000}
  onDismiss={_ => this.onDismiss('2')}
/>
```

### 参数

| Param         | Type                  | Description                                                  |
| ------------- | --------------------- | ------------------------------------------------------------ |
| animationType | <code>string</code>   | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>     | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| message       | <code>string</code>   | 显示文字                                                     |
| timeout       | <code>number</code>   | Modal 隐藏的超时时间(ms)，如果不主动设置隐藏的话             |
| onDismiss     | <code>function</code> | Modal隐藏时的回调函数                                        |

[⬆️回到目录](#目录)

***

## 米家弹窗-进度弹窗-ProgressDialog

### 预览

![](/docImages/progressdialog.gif)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 进度弹窗                                                     |
| 描述      | 在需要用户长时间等待的时候，告知用户当前进度，比如最常用场景：下载。点击背景不会隐藏，可通过改变`visible` 属性隐藏，也可以设置`autoDismiss`在进度完成后自动隐藏 |
| 位置      | `miot/ui/Dialog/ProgressDialog`                              |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
<ProgressDialog
  autoDismiss
  visible={this.state.visible3}
  message='下载中，请稍后...'
  color='#f0ac3d'
  unfilledColor='#fff'
  textColor='blue'
  progress={this.state.progress}
  onDismiss={_ => this.onDismiss('3')}
/>
```

### 参数

| Param         | Type                  | Description                                                  |
| ------------- | --------------------- | ------------------------------------------------------------ |
| animationType | <code>string</code>   | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible       | <code>bool</code>     | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| message       | <code>string</code>   | 提示信息文字                                                 |
| progress      | <code>number</code>   | 当前进度，默认`0`，范围为 `0～1`                             |
| color         | <code>string</code>   | progressBar 填充颜色，默认米家绿                             |
| unfilledColor | <code>string</code>   | progressBar 未填充颜色，默认`#f1f1f1`                        |
| textColor     | <code>string</code>   | 进度百分比文字颜色，默认米家绿                               |
| autoDismiss   | <code>bool</code>     | 是否在进度条读完之后自动隐藏 Modal, 默认`false`              |
| onDismiss     | <code>function</code> | Modal 隐藏时的回调函数                                       |
