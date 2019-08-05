<a name="module_miot/Host.appConfigEnv"></a>

## .appConfigEnv : <code>int</code>
获取 米家APP中 我的-->开发者设置-->其他设置，  AppConfig接口拉取preview版数据 是否选中的状态
1:表示选中, preview ； 0：表示未选中, release
如果选中，Service.smarthome.getAppConfig 获取的数据为preview版数据， 反之为release版数据

**Kind**: static constant  
**Read only**: true  
**Since**: 10024  
