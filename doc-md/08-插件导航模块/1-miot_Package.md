<a name="module_miot/Package"></a>

## miot/Package
扩展程序包参数, 主要来自于[packageInfo.json](packageInfo.json) 的配置与系统本身的特性

  
**Example**  
```js
import {Package} from 'miot'
 import Package from 'miot/Package'

     Package.entrance
     Package.entryInfo
     Package.exitInfo={...}

    Package.pluginID
    Package.packageID
    Package.packageName
    Package.version
    Package.minApiLevel
    Package.buildType
    Package.isDebug
    Package.models

    Package.entry(App, ()=>{...});
    Package.exit({...});
```
