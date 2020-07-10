## 新版导航栏-NavigationBar

### 预览

![](/docImages/NavigationBar1.png)

![](/docImages/NavigationBar2.png)

![](/docImages/NavigationBar3.png)

![](/docImages/NavigationBar4.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 米家插件导航栏                                               |
| 描述      | 新版的米家插件导航栏，根据最新的米家插件设计规范开发<br />按照设计规范要求，推荐插件开发者使用新版导航栏 |
| 位置      | `miot/ui/NavigationBar`                                      |
| SDK_Level | `SDK_10021`                                                  |
| 注意事项  | \                                                            |

### 使用方法

```jsx
<NavigationBar
  backgroundColor='transparent'
  type={NavigationBar.TYPE.DARK}
  left={[
    {
      key: NavigationBar.ICON.BACK,
      onPress: _ => this.props.navigation.goBack()
    },
    {
      key: NavigationBar.ICON.CLOSE,
      onPress: _ => console.log('onPress')
    }
  ]}
  right={[
    {
      key: NavigationBar.ICON.COLLECT,
      disable: true,
      onPress: _ => console.log('onPress')
    },
    {
      key: NavigationBar.ICON.MORE,
      showDot: this.state.showDot,
      onPress: _ => console.log('onPress')
    }
  ]}
  title='标题'
  subtitle='副标题'
  onPressTitle={_ => console.log('onPressTitle')}
/>
```

### 参数

| Name            | Type                             | Description                                                  |
| --------------- | -------------------------------- | ------------------------------------------------------------ |
| type            | <code>string</code>              | 导航栏类型：<br />`NavigationBar.TYPE.DARK` 表示深色背景白色文字<br />`NavigationBar.TYPE.LIGHT` 相反 |
| backgroundColor | <code>object</code>              | 导航栏背景色                                                 |
| left            | <code>array&lt;object&gt;</code> | 左侧按钮的集合，最多显示两个，多余无效，每个按钮用一个`object`表示<br /> {<br />key // 按钮的key，在`NavigationBar.ICON`中枚举定义<br />disable // 是否禁用按钮<br />showDot // 是否显示小红点<br />onPress // 点击按钮的回调函数<br />} |
| right           | <code>array&lt;object&gt;</code> | 右侧按钮的集合，最多显示两个，多余无效，每个按钮用一个`object`表示 `{ key, disable, showDot, onPress }` |
| title           | <code>string</code>              | 中间的标题                                                   |
| subtitle        | <code>string</code>              | 中间的副标题                                                 |
| onPressTitle    | <code>string</code>              | 点击标题的事件                                               |

### NavigationBar.ICON 图标列表

| 枚举值                            | 中文描述      | 图标                                           |
| --------------------------------- | ------------- | ---------------------------------------------- |
| `NavigationBar.ICON.ADD`          | 添加          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_7ccf55590a69335e40e48e240e39869d.png)          |
| `NavigationBar.ICON.BACK`         | 返回          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_a72697ad5383cd965d1f5da99b13dfde.png)         |
| `NavigationBar.ICON.CLOSE`        | 关闭          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_d35f976043f235de24909250d598e868.png)        |
| `NavigationBar.ICON.COLLECT`      | 收藏/喜欢     | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_e9ed693a293650c929b08136d96a8b74.png)      |
| `NavigationBar.ICON.COMPLETE`     | 完成/确认     | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_c26675a39bcbf1c8afcb891e55cba5ac.png)     |
| `NavigationBar.ICON.DELETE`       | 删除          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_d48d9d390f73c3935c80660b52cce1aa.png)       |
| `NavigationBar.ICON.DETAIL`       | 详情          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_f5c51d461533ba83a4a102a030834215.png)       |
| `NavigationBar.ICON.MORE`         | 更多          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_c0736e40bba7a04a1b168ed310793e12.png)         |
| `NavigationBar.ICON.NEXT`         | 下一步/下一页 | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_3f496a03b789a67853a157ace968bb6d.png)         |
| `NavigationBar.ICON.PROFILE`      | 个人中心/我的 | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_56d9814cd6134a047e2d54b89afb3f12.png)      |
| `NavigationBar.ICON.QR`           | 二维码/扫一扫 | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_486a1e0428b0b9f17a23b6153bc378f7.png)           |
| `NavigationBar.ICON.SEARCH`       | 搜索          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_eee0fcefe47f91e92df426dcc8de77d5.png)       |
| `NavigationBar.ICON.SELECT_ALL`   | 全选          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_43667d031961e8d228f7d8fe95c4d737.png)   |
| `NavigationBar.ICON.SELECTED_ALL` | 全部选中      | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_ad7c33661c0acd83c35eefd81cc10a13.png) |
| `NavigationBar.ICON.SHARE`        | 分享          | ![](https://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_070572b2e8a1f784c92a968be3a19204.png)        |

### 和`Titlebar` 对比

- 在原有图标基础上支持更多的图标（共16种），但不支持自定义图标，只能从 [NavigationBar.ICON](#navigationbaricon-图标列表) 中选择，图标样式也有改动
- 传参有改动，删除 `leftTextStyle/leftText/rightTextStyle/rightText/style`，增加 `left/right/backgroundColor`
- `type` 含义变更：之前 `dark` 表示白底黑字，容易误导，现在表示**深色背景白色文字**
- 考虑到某些语言不好兼容的情况，导航栏左右侧只支持图标，不再支持文字
- 导航栏高度固定，不允许更改，背景色仍然可以自定义
