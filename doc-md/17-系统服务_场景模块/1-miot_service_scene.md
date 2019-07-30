<a name="module_miot/service/scene"></a>

## miot/service/scene
场景相关服务, 包括定时,人工与自动场景

  
**Example**  
```js
import {Service, Device, SceneType} from 'miot';
  //加载此设备所有的定时场景
  Service.scene.loadScenes(Device.deviceID, SceneType.Timer)
  .then((sceneArr) => {
     if(sceneArr.length > 0){
        const scene = sceneArr[0];
        scene.setting.enable_push = 1;
        ...
        scene.save().then((res)=>{
           console.log(res)
        });
     }
 });
```
**Example**  
```js
//加载此设备名称为name，类别为identify的所有人工场景
   Service.scene.loadArtificialScenes(Device.deviceID, {name:'...', identify:'...'})
   .then(arr=>{...}).catch(err=>{...})
```
**Example**  
```js
//加载此设备的所有定时场景
  Device.loadTimerScenes().then((sceneArr) => {
    ...
  })
  .catch(err=>{
     console.log(err)
  })
```
