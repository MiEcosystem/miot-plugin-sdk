## 导航栏-TitleBar

### 预览

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_acb178a700580c1731c619debf50d12b.png)

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_678254c3dbe5781f9db92b4c814a6978.png)

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_160b4081a4bb163392c097da3eebcb2c.png)

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_0558de421000dc8d0af834f57bd104e1.png)

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_3ad4688fd5449bee7ea84b172c07426c.png)

 ### 基本信息

| 基本信息  |                                        |
| --------- | -------------------------------------- |
| 中文名称  | 导航栏                                 |
| 描述      | 米家通用导航栏，目前正在开发新版导航栏 |
| 位置      | `miot/ui/TitleBar`                     |
| SDK_Level | `SDK_10000`                            |
| 注意事项  | \                                      |

**⚠️SDK_Level指的是从`SDK_XXXXX`开始可以使用该组件**

### 使用方法

```jsx
<TitleBar
  type='light'
  title='title'
  subTitle='subtitle'
  style={{ height: 65, backgroundColor: '#222' }}
  onPressLeft={() => { navigation.goBack() }}
  onPressLeft2={() => console.log('onPressLeft2')}        
  onPressRight={() => { navigation.navigate('moreMenu', { 'title': '设置' }) }}
  onPressRight2={() => console.log('onPressRight2')}
  showDot={this.state.showDot}
/>
```

### 参数

| 属性 | 类型 | 说明 | 默认值
| --- | --- | --- | -- |
| type | `string` | 导航栏类型 `"dark" | "light"`, `dark`默认表示白底黑字， `light`默认表示黑底白字 | `'light'`
| style | `style` | 导航栏整体的样式， 会覆盖 `type`的默认设置 |
| leftTextStyle | `style` | 左侧文字样式，和 `leftText` 一起使用，不设置使用米家默认值 |
| leftText | `string` | 左侧文字 |
| onPressLeft | `func` | 左侧点击事件，设置了才显示左侧文字或图片，如果设置了`leftText`则显示设置的文字，否则显示默认的返回按钮。 |
| onPressLeft2 | `func` | 左侧的第二个点击事件，设置了才显示默认的关闭按钮， |
| rightTextStyle | `style` | 右侧文字样式，和 `rightText` 一起使用，不设置使用米家默认值 |
| rightText | `string` | 右侧文字 |
| onPressRight | `func` | 右侧点击事件，设置了才显示右侧文字或图片，如果设置了 `rightText` 则显示设置的文字，否则显示默认的更多按钮。 |
| onPressRight2 | `func` | 右侧的第二个点击事件，设置了才显示默认的分享按钮 |
| title | `string` | 中间的标题 |
| subTitle | `string` | 中间的子标题 |
| onPressTitle | `func` | 点击标题的事件 |
| showDot | `bool` | 是否显示右侧更多按钮的小红点 |
