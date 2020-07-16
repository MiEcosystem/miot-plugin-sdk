## 图片按钮-ImageButton

### 基本信息

| 基本信息  |                                           |
| --------- | ----------------------------------------- |
| 中文名称  | 图片按钮                                  |
| 描述      | 可以被点击的图片， 点击时可以切换显示图片 |
| 位置      | `miot/ui/imageButton`               |
| SDK_Level | `SDK_10011`                               |
| 注意事项  | \                                         |

### 使用方法

```jsx
<ImageButton
  style={{width: 66, height: 58}}
  source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
  highlightedSource={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
  onPress={() => { console.log('onPress')} }
/>

```

### 参数

| 属性              | 类型                                                                                    | 说明                            | 默认值      |
| ----------------- | --------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| style             | <code>ImageStyle</code> [详情](https://reactnative.dev/docs/image.html#style)           | 图片的样式                      | `null`        |
| source            | <code>ImageSourcePropType</code> [详情](https://reactnative.dev/docs/image.html#source) | Image 的source                        |  `null`     |
disabled  | <code>boolean</code> | 如果设为true，则禁止此组件的一切交互。 | `false`
| highlightedSource | <code>ImageSourcePropType</code> [详情](https://reactnative.dev/docs/image.html#source) | 点击时 Image 组件的 source 属性 | `null`        |
| onPress           | <code>() => void</code>                                                                 | 点击时的回调函数                | `null` |
