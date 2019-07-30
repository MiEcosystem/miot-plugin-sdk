<a name="module_miot/Package--module.exports.exitInfo"></a>

## .exitInfo : <code>json</code>
退出后返回给调用者的信息, 例如自定义场景

**Kind**: static member  
**Example**  
```js
//自定义trigger场景保存退出 finishCustomSceneSetupWithTrigger
var trigger = Package.entryInfo;
trigger.payload = { 'xxx': 'xxx' };//trigger payload 数据
Package.exitInfo = trigger; 

//自定义action场景保存退出 finishCustomSceneSetupWithAction
var action = Package.entryInfo;
action.payload = { 'xxx': 'xxx' };//action payload 数据
Package.exitInfo = action; 
...
Package.exit();
```
