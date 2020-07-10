## 米家弹窗-分享弹窗-ShareDialog

### 预览

![](/docImages/sharedialog.png)

![](/docImages/sharedialog.gif)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 分享弹窗                                                     |
| 描述      | 弹窗提示，让用户选择分享到指定平台                             |
| 位置      | `miot/ui/Dialog/ShareDialog`                                 |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  | `Android`下`Swiper`和`Modal`显示有冲突，所以需要`Modal`先显示，`Swiper`后显示。表现为弹窗先显示后，图标才开始刷新显示，属于正常现象 |

### 使用方法

```jsx
<ShareDialog
  visible={this.state.visible13}
  title='不分页的分享弹窗'
  onDismiss={_ => this.onDismiss('13')}
/>
<ShareDialog
  visible={this.state.visible14}
  title='分页的分享弹窗'
  options={
    Array.from({ length: 15 }, (v, i) => ({
      icon: testIcon,
      text: [`米家`, `微信`, `QQ`, `微博`, `朋友圈`, `收藏`, `即刻`][~~(Math.random() * 7)],
      callback: () => console.log('分享成功')
    }))
  }
  onDismiss={_ => this.onDismiss('14')}
/>
```

### 参数

#### Opiton(分享选项)

| Name | Type | Description |
| --- | --- | --- |
| icon | <code>number</code> | 图标的资源, `require('../xx/xx.png’)` |
| text | <code>string</code> | 图标下方的文字说明 |
| callback | <code>function</code> | 点击图标的回调函数 |

| Param | Type | Description |
| --- | --- | --- |
| animationType | <code>string</code> | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible | <code>bool</code> | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| title | <code>string</code> | 标题文字 |
| options | [<code>Array&lt;Opiton&gt;</code>](#Opiton分享选项) | 分享选项，一页最多显示**8个**，当可选项**>8个**时，允许左右滑动分页 |
| buttons | [<code>Array&lt;Button&gt;</code>](#button按钮)    | 和`AbstractDialog`的`buttons`属性相同    |
| onDismiss | <code>function</code> | Modal 隐藏时的回调函数 |
