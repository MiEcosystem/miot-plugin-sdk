<a name="module_miot/host/file.screenShot"></a>

## .screenShot(imageName) ⇒ <code>Promise.&lt;string&gt;</code>
屏幕全屏截图

**Kind**: static function  
**Returns**: <code>Promise.&lt;string&gt;</code> - - 截图成功回调函数返回存储图片的绝对路径，加载图片时直接使用即可  

| Param | Type | Description |
| --- | --- | --- |
| imageName | <code>string</code> | 图片名称，png, |

**Example**  
```js
<Image source={{local:imageName, scale:PixelRatio.get()}} />
```
