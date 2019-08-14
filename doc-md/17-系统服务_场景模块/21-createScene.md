<a name="module_miot/service/scene--module.exports.createScene"></a>

## .createScene ⇒ <code>IScene</code>
创建场景

**Kind**: static member  

| Param | Type | Description |
| --- | --- | --- |
| deviceID | <code>string</code> | 设备id |
| sceneType | <code>int</code> | 场景类型 |
| opt | <code>Object</code> | {identify,name,setting} 同上面的identify，name |

**Example**  
```js
import {Service, Device, SceneType} from 'miot'
const scene = Service.scene.createScene(Device.deviceID, SceneType.Timer, {
     identify:'identify',
     name:'myTimer',
     setting:{...}
});

scene.save().then(scene=>{
  ...
})
```
