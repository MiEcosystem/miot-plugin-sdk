## 单选框-Radio

### 预览

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_gif_71d7b5c65bdb086bda248bbb6e93c4eb.gif)

### 基本信息

| 基本信息  |                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 中文名称  | 单选框                                                                                                                         |
| 描述      | 就像网页上的单选按钮一样，点击某一项就能把它选中，有动画效果。<br />如果按钮为 `disabled` 状态，则显示半透明效果并且不可点击。 |
| 位置      | `miot/ui/Radio`                                                                                                                |
| SDK_Level | `SDK_10020`                                                                                                                    |
| 注意事项  | \                                                                                                                              |

### 使用方法

```jsx
<Radio
  isChecked={false}
  changeCheck={(id) => {console.log(id)}}
  id={1}
  bigCircleStyle={{
    borderWidth: 4,
    width: 40,
    height: 40,
    borderRadius: 20
  }}
  checkedBigCircleStyle={{
    borderColorChecked: '#00C',
    backgroundColorChecked: '#33F',
    borderColor: '#666',
    backgroundColor: '#999'
  }}
  disabled={false}
/>
```

### 参数

| 属性                  | 类型                                | 说明                                                                                                                          |  默认值 |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -- |
| isChecked             | <code>bool</code>                   | 按钮的选中状态 | `false`
| bigCircleStyle        | <code>`StyleProp<TextStyle>`</code> | 大圆的尺寸、圆角半径、边宽 |  `{}`
| checkedBigCircleStyle | <code>`StyleProp<TextStyle>`</code> | 大圆在选中和非选中状态下的边框颜色、背景色。<br />默认值<br />非选中状态：`边框#666，背景#999`。<br />选中状态：`边框#060，背景#090` | `{ borderColorChecked: '#060', backgroundColorChecked: '#090', borderColor: '#666', backgroundColor: '#999' }`
| smallCircleBg         | <code>string</code>                 | 小圆的背景色 | `'white'` |
| changeCheck           | <code>(id: number) => void</code>   | 改变选中状态的函数，参数为单选按钮的 `id`    | `function () {}`
| id                    | <code>number</code>                 | 单选按钮的 id，用来区分不同的按钮，实现单选功能。 | `-1`
| disabled              | `bool`                              | 单选按钮的可选状态，默认值 | `false`
