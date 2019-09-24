<a name="module_miot/service/smarthome.getAppConfig"></a>

## .getAppConfig(params)
获取AppConfig配置文件，1. 插件端有一些自己的信息需要配置，可使用此接口 2. 局限性：只有小米内部有权配置，之后可能会出对外版（目前只能找米家产品经理/工程师帮忙配置）3.维护起来很不方便，不建议使用。
默认获取的是release版数据， 如果需要获取preview版数据， 可以在米家APP中 我的-->开发者设置-->其他设置的界面中 “AppConfig接口拉取preview版数据”  置为选中状态

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | 请求参数 |
| params.name | <code>string</code> | configName 配置的名字 |
| params.lang | <code>string</code> | lang 可选: zh_CN、zh_TW、en，zh-hant，一般请使用zh_CN和en |
| params.result_level | <code>string</code> | 正常传"0"，若传“1”，则会提供一个downloadurl，而不是直接返回content，以节省流量。取得downloadurl后，通过Host.file.downloadFile下载文件，然后使用 |
| params.version | <code>string</code> | version 后台配置的version，大概率为"1"，如果不对，可以找米家工程师帮忙查询，查询地址：http://plato.io.mi.srv/#/appconfig/client |

