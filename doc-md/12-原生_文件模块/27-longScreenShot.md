<a name="module_miot/host/file.longScreenShot"></a>

## .longScreenShot(viewRef, imageName) ⇒ <code>Promise.&lt;string&gt;</code>
长截屏，用来截scrollView，会把超出屏幕的部分也截到

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| viewRef | <code>number</code> | scrollView的引用 |
| imageName | <code>string</code> | 图片名称，png |

**Example**  
```js
var findNodeHandle = require('findNodeHandle');
 var myScrollView = findNodeHandle(this.refs.myScrollView);
 Host.file.longScreenShot(myScrollView, 'test2.png').then(imagePath=>{
     console.log(imagePath);
 });
```
