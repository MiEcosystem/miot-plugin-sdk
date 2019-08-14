<a name="module_miot/ui/TitleBar"></a>

## miot/ui/TitleBar
新版导航栏，可以尝试使用

  
**Properties**

| Name | Description |
| --- | --- |
| type | 导航栏类型 options: ["dark", "light"(default)], dark默认表示白底黑字， light默认表示黑底白字 |
| style | 导航栏整体的样式，会覆盖 type 的默认设置，其中 height 定义的是状态栏下方内容的高度(不能小于30)，默认 height = 55 |
| leftTextStyle | 左侧文字样式，和 leftText 一起使用，不设置使用米家默认值 |
| leftText | 左侧文字 |
| onPressLeft | 左侧点击事件，设置了才显示左侧文字或图片，如果设置了leftText则显示设置的文字，否则显示默认的返回按钮。 |
| onPressLeft2 | 左侧的第二个点击事件，设置了才显示默认的关闭按钮， |
| rightTextStyle | 右侧文字样式，和 rightText 一起使用，不设置使用米家默认值 |
| rightText | 右侧文字 |
| onPressRight | 右侧点击事件，设置了才显示右侧文字或图片，如果设置了 rightText 则显示设置的文字，否则显示默认的更多按钮。 |
| onPressRight2 | 右侧的第二个点击事件，设置了才显示默认的分享按钮 |
| title | 中间的标题 |
| subTitle | 中间的子标题 |
| onPressTitle | 点击标题的事件 |
| showDot | 是否显示右侧更多按钮的空点 |

