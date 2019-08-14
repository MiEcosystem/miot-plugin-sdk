<a name="module_miot/Device--module.exports..IDevice+loadScenes"></a>

## .loadScenes(sceneType, opt) ⇒ <code>Promise.&lt;Array.&lt;IScene&gt;&gt;</code>
加载本设备相关的场景

**Kind**: instance function  
**See**: [module:miot/service/scene](module:miot/service/scene)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sceneType | <code>\*</code> |  | SceneType.Timer(定时场景)，SceneType.Artificial(人工场景)，SceneType.Automatic(自动场景) |
| opt | <code>\*</code> | <code></code> | {identify,name} identify：代表场景的分类，创建场景时可自定义此参数；如果获取场景的时候传入identify，表示获取identify类场景列表；如果不需要对场景分类，此参数可忽略。name:场景名字 |

