<a name="module_ListItemWithSlider"></a>

## ListItemWithSlider
带滑动条的列表项

  
**Since**: 10004  
**Author**: Geeook  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | 标题 |
| sliderProps | <code>object</code> | slider的属性值，默认值 {minimumValue:0,maximumValue:100,step:1,value:50} minimumValue：最小值；maximumValue：最大值；step：步长；value：当前值 |
| showWithPercent | <code>bool</code> | 是否以百分比显示当前值，默认值 true |
| unit | <code>string</code> | 当前值的单位。`showWithPercent = true` 将不显示单位 |
| sliderStyle | <code>object</code> | slider 的自定义样式 默认值  {   minimumTrackTintColor: "#32BAC0", // slider 左侧已填充颜色   maximumTrackTintColor: "rgba(0,0,0,0.15)", // slider 右侧未填充颜色   thumbTintColor: "#32BAC0", // 可移动圆圈的填充颜色   style: {}, // slider 容器的自定义样式   trackStyle: { height: 2, borderRadius: 1 }, // 轨 的自定义样式   thumbStyle: { width: 24, height: 24, borderRadius: 12 }, // 可移动圆圈 的自定义样式 } |
| onValueChange | <code>function</code> | 滑动回调函数，返回实时的滑动值 |
| onSlidingComplete | <code>function</code> | 滑动结束回调函数 |
| disabled | <code>bool</code> | 是否禁用滑动，默认值 false |
| containerStyle | <code>style</code> | 列表项的自定义样式 |
| titleStyle | <code>style</code> | 标题的自定义样式 |
| valueStyle | <code>style</code> | value的自定义样式 |
| showSeparator | <code>bool</code> | 是否显示分割线，默认值 true |
| separator | <code>component</code> | 自定义分割线，不传将显示默认样式的分割线 |

