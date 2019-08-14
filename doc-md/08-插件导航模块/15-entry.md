<a name="module_miot/Package--module.exports.entry"></a>

## .entry(RootComponent, afterPackageEntry)
系统入口

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| RootComponent | <code>React.Component</code> | 入口的React Component模块 |
| afterPackageEntry | <code>function</code> | 进入后, RootComponent 加载之前执行, 缺省为空 |

**Example**  
```js
import SceneMain from '...';
import App from '...';

import {Package, Entrance} from 'miot';

switch(Package.entrance){
  case Entrance.Scene:
     Package.entry(SceneMain, ()=>{...});
     break;
  default:
     Package.entry(App, ()=>{...});
     break;
}
```
