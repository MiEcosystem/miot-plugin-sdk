<a name="module_miot/ui/AMapView"></a>

# miot/ui/AMapView
地图的 js 桥接，内部使用高德地图实现，

**Export**:   
**Mark**: andr done  
<a name="module_miot/ui/AMapView..showsUserLocation"></a>

## miot/ui/AMapView~showsUserLocation : <code>bool</code>
是否显示用户位置

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..trafficEnabled"></a>

## miot/ui/AMapView~trafficEnabled : <code>bool</code>
是否显示交通状况

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..showsScale"></a>

## miot/ui/AMapView~showsScale : <code>bool</code>
是否显示坐标尺

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..showsCompass"></a>

## miot/ui/AMapView~showsCompass : <code>bool</code>
是否显示指南针

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..zoomEnabled"></a>

## miot/ui/AMapView~zoomEnabled : <code>bool</code>
是否允许用户缩放

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..pausesLocationUpdatesAutomatically"></a>

## miot/ui/AMapView~pausesLocationUpdatesAutomatically : <code>bool</code>
是否自动暂停位置更新

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..allowsBackgroundLocationUpdates"></a>

## miot/ui/AMapView~allowsBackgroundLocationUpdates : <code>bool</code>
允许后台更新位置信息

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..desiredAccuracy"></a>

## miot/ui/AMapView~desiredAccuracy : <code>number</code>
定位精度

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..distanceFilter"></a>

## miot/ui/AMapView~distanceFilter : <code>number</code>
设定定位的最小更新距离，即移动多远会提示移动

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..scaleOrigin"></a>

## miot/ui/AMapView~scaleOrigin : <code>object</code>
比例尺原点位置  
格式：{'x':number, 'y':number}

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..mapType"></a>

## miot/ui/AMapView~mapType : <code>number</code>
地图类型  
0< 普通地图 1< 卫星地图

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..headingFilter"></a>

## miot/ui/AMapView~headingFilter : <code>number</code>
设定最小更新角度。默认为1度。

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..zoomLevel"></a>

## miot/ui/AMapView~zoomLevel : <code>number</code>
缩放级别, [3, 20]

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..centerCoordinate"></a>

## miot/ui/AMapView~centerCoordinate : <code>object</code>
中心点坐标  
格式：{latitude: number, longitude: number}

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..userTrackingMode"></a>

## miot/ui/AMapView~userTrackingMode : <code>string</code>
定位用户位置的模式   
none < 不追踪用户的location更新  
follow < 追踪用户的location更新  
followWithHeading < 追踪用户的location与heading更新

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..compassOrigin"></a>

## miot/ui/AMapView~compassOrigin : <code>object</code>
罗盘原点位置  
格式：{'x':number, 'y':number}

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..userLocation"></a>

## miot/ui/AMapView~userLocation : <code>object</code>
用户定位

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..userLocationRepresentation"></a>

## miot/ui/AMapView~userLocationRepresentation : <code>object</code>
用户位置显示样式控制  
格式：{'image':'imagePath', 'imageScale': number, 'showsAccuracyRing':boolean, 'showsHeadingIndicator': boolean, 'lineWidth':number, 'fillColor': color, 'strokeColor': color, 'lineDashPattern':[]}

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..annotations"></a>

## miot/ui/AMapView~annotations : <code>array</code>
标记点数组  
格式：[{'coordinate':{latitude: number, longitude: number}, 'title':'aaa', 'subtitle':'', 'id':'', 'image':'imagePath'}]

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..circles"></a>

## miot/ui/AMapView~circles : <code>array</code>
绘制圆形layer数组  
格式: [{'coordinate':{latitude: number, longitude: number}, 'radius':number, 'strokeColor': color, 'fillColor': color ,'id': 'string', 'lineWidth': numebr}]

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..polylines"></a>

## miot/ui/AMapView~polylines : <code>array</code>
绘制线条数组,默认格式  
格式: ['coordinates':[{latitude: number, longitude: number}], 'id':'string']

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..multiPolylines"></a>

## miot/ui/AMapView~multiPolylines : <code>array</code>
绘制自定义线条数组  
drawStyleIndexes: 颜色索引数组(使用颜色数组中的指定色),成员为number,且为非负数，负数按0处理
colors: 颜色数组，用于渲染线段
格式: ['coordinates':[{latitude: number, longitude: number}], 'drawStyleIndexes': [], colors: [color], 'renderGradient': boolean, 'renderLineWidth': number]

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..onUpdateUserLocation"></a>

## miot/ui/AMapView~onUpdateUserLocation : <code>func</code>
用户位置更新回调

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..onSingleTappedAtCoordinate"></a>

## miot/ui/AMapView~onSingleTappedAtCoordinate : <code>func</code>
点击某坐标回调

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..onSelectAnnotationView"></a>

## miot/ui/AMapView~onSelectAnnotationView : <code>func</code>
选中某点标记回调

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..onMapWillZoomByUser"></a>

## miot/ui/AMapView~onMapWillZoomByUser : <code>func</code>
用户缩放地图回调，将要缩放

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
<a name="module_miot/ui/AMapView..onMapDidZoomByUser"></a>

## miot/ui/AMapView~onMapDidZoomByUser : <code>func</code>
用户缩放地图回调，已经缩放

**Kind**: inner property of [<code>miot/ui/AMapView</code>](#module_miot/ui/AMapView)  
