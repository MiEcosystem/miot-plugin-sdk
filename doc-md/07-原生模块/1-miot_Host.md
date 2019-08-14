<a name="module_miot/Host"></a>

## miot/Host
扩展程序运行时的宿主环境  
所有由宿主APP直接提供给扩展程序的接口均列在这里. 主要包括原生业务页面, 本地数据访问等

  
**Example**  
```js
import {Host} from 'miot'

 Host.type // ios/ android/ tv
 Host.isIOS
 Host.isAndroid

 Host.version
 Host.apiLevel
 Host.isDebug


 Host.ui.openDeviceListPage()
 Host.ui.openShopPage(100)

 Host.locale.language
 Host.locale.timezone
 Host.locale.currentTimeMillis.then(time=>{})
 Host.locale.getCurrentCountry().then(country=>{})
 Host.locale.getPlaceMark().then(place=>{})
 Host.locale.getGPS().then(gps=>{})


 Host.file.readFile(path).then(file=>{})
 Host.file.writeFile(path, file).then(ok=>{})

 Host.storage.get(key)
 Host.storage.set(key, value)
```
