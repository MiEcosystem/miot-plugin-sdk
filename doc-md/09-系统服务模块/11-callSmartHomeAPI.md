<a name="module_miot/Service..callSmartHomeAPI"></a>

## ~callSmartHomeAPI(api, params)
通用的请求米家后台接口的方法，与米家服务器交互。
不同设备开放的接口请参照与米家后台对接时提供的文档或说明，以后台给出的信息为准。
米家客户端只封装透传网络请求，无法对接口调用结果解释，有问题请直接联系项目对接后台人员或 PM。

想使用某个接口之前，先检查 SDK 是否已经收录，可在 `miot-sdk/service/apiRepo.js` 文件中查阅。
如果 SDK 暂时没有收录，可通过 issue 提出申请，提供接口的相关信息。

**Kind**: inner function  
**Since**: 10024  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>string</code> | 接口地址，比如'/location/set' |
| params | <code>object</code> | 传入参数，根据和米家后台商议的数据格式来传入，比如{ did: 'xxxx', pid: 'xxxx' } |

