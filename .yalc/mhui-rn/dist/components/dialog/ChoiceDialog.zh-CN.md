
## 米家弹窗-选择弹窗-ChoiceDialog

### 预览

![](/docImages/choicedialog.gif)

![](/docImages/choicedialog1.gif)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 选择弹窗                                                     |
| 描述      | 弹窗让用户从不同选项中选择一项或者多项 |
| 位置      | `miot/ui/Dialog/ChoiceDialog`                                 |
| SDK_Level | `SDK_10022`                                                  |
| 注意事项  |  |

### 使用方法

```jsx
<ChoiceDialog
  visible={this.state.visible16}
  title={'单选弹窗'}
  options={[
    {
      title: 'Test',
      subtitle: 'test',
    },
    {
      title: 'Test',
    },
    {
      title: '测试',
      subtitle: '测试',
    }
  ]}
  selectedIndexArray={this.state.selectedIndexArray}
  onDismiss={_ => this.onDismiss('16')}
  onSelect={result => this.state.selectedIndexArray = result}
/>
<ChoiceDialog
  type={ChoiceDialog.TYPE.MULTIPLE}
  visible={this.state.visible17}
  title={'多选弹窗'}
  options={[
    {
      title: '🙈',
      subtitle: '🙈',
    },
    {
      title: '🙉',
      subtitle: '🙉',
    },
    {
      title: '🙊',
      subtitle: '🙊',
    }
  ]}
  selectedIndexArray={this.state.selectedIndexArray1}
  color="#f0ac3d"
  buttons={[
    {
      text: '保存',
      style: { color: 'lightblue' },
      callback: result => {
        console.log(`选中的选项`, result);
        this.setState({
          visible17: false,
          selectedIndexArray1: result
        });
      }
    }
  ]}
  onDismiss={_ => this.onDismiss('17')}
/>
```

### 参数

#### TYPE(选择弹窗的类型)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| SINGLE | <code>string</code> | <code>&quot;single&quot;</code> | 单选弹窗，将不显示底部按钮，选择某项之后弹窗消失 |
| MULTIPLE | <code>string</code> | <code>&quot;multiple&quot;</code> | 多选弹窗 |

#### Opiton(可选项)

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | 主文案 |
| subtitle | <code>string</code> | 副文案 |

| Param              | Type                                              | Description                                                  |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------ |
| animationType      | <code>string</code>                               | modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype |
| visible            | <code>bool</code>                                 | 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible |
| type               | [<code>TYPE</code>](#TYPE选择弹窗的类型)          | 选择弹窗类型，定义是单选弹窗还是多选弹窗，默认是单选弹窗     |
| title              | <code>string</code>                               | 标题                                                         |
| options            | [<code>Array&lt;Opiton&gt;</code>](#Opiton可选项) | 可选项                                                       |
| selectedIndexArray | <code>Array&lt;number&gt;</code>                  | 选中选项的下标，默认全部未选中                               |
| color              | <code>string</code>                               | 选中态颜色，单选时表示选中文字颜色，多选时表示勾选框勾选背景颜色，默认米家绿 |
| icon               | <code>number</code>                               | 选项被选中时的选中图标，放在文字前面，`TYPE.SINGLE`可用，默认绿色右箭头图片 |
| buttons            | [<code>Array&lt;Button&gt;</code>](#button按钮)   | 和`AbstractDialog`的`buttons`属性相同                        |
| onSelect           | <code>function</code>                             | 选项选择后的确认回调，返回选中选项的下标数组，`TYPE.SINGLE`可用 |
| onDismiss          | <code>function</code>                             | Modal 隐藏时的回调函数                                       |
