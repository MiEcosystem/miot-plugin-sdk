<a name="module_miot/host/file.amapScreenShot"></a>

## .amapScreenShot(viewRef, imageName) ⇒ <code>Promise</code>
高德地图截屏

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| viewRef | <code>number</code> | MAMapView(MHMapView的父类)的引用 |
| imageName | <code>string</code> | 图片名称，自动添加后缀png |

**Example**  
```js
const findNodeHandle = require('findNodeHandle');
const myMapViewRef = findNodeHandle(this.refs.myMapView);
const imageName = 'mapToShare.png';
let imageToShow = null;
Host.file.amapScreenShot(myMapViewRef, imageName).then(() => {
   imageToShow = <Image source={{local:imageName}}>
   console.log("ok");
});
```
