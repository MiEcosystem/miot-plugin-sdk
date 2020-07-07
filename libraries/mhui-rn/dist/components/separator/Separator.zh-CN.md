## 分割线-Separator

### 预览

![](http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_png_f09f96a7b8d74950a2cc963b2fe17cc4.png)

### 基本信息

| 基本信息  |                                                              |
| --------- | ------------------------------------------------------------ |
| 中文名称  | 分割线                                                       |
| 描述      | 细分割线，包括横线和竖线，常用于导航栏和列表项等             |
| 位置      | `miot/ui/Separator`                                          |
| SDK_Level | `SDK_10004`                                                  |
| 说明      | `<View style={{ height: 0.5, width: 300 }} />`的细分割线在`android`和`iOS`平台上显示不一致，于是才有了它。 |
| 注意事项  | 细线的宽度有最大限制(**max = 1**)                            |

### 使用方法

```jsx
<Separator /> // 横细线，充满父组件
<Separator style={{ marginLeft: 24，height: 2 }} /> // 左边距24，height设置2无效
<Separator type='column' /> // 竖细线，充满父组件
```

### 参数

| Name | Type | Description |
| --- | --- | --- |
| type | `string` | 分割线类型，横向`row`或者纵向`column`，默认横向<br />(`❗️SDK_10021`新增) |
| style | <code>style</code> | 自定义样式 |
