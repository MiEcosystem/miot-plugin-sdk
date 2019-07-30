<a name="module_miot/host/crypto.pointsToImageBase64"></a>

## .pointsToImageBase64(width, height, points, colorsMap)
ApiLevel: 10020

**Kind**: static function  
**Since**: 10020
2019.05.16  针对第三方要求新增的接口
扫地机的地图转换
根据点集合长宽以及每个点对应的颜色值生成bitmap并返回其base64字符串  

| Param | Description |
| --- | --- |
| width | : 图片宽度 |
| height | : 图片高度 |
| points | : 点集合字符串 |
| colorsMap | : 点值与颜色之间对应关系JSON字符串 -1 墙 #666666 0 背景 #E6EAEE 1 发现区域 #C6D8FA >=10 房间区域 |

