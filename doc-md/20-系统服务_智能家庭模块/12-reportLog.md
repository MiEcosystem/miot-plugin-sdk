<a name="module_miot/service/smarthome.reportLog"></a>

## .reportLog(model, log) ⇒ <code>void</code>
添加一条日志打点。  
开发者应该在拓展程序内合适时机调用该接口，打点信息会自动写入文件，按 Model 归类，即一个 Model 生成一个日志文件。  
当用户反馈问题时，勾选 “同时上传日志”，则该 Model 的日志会跟随用户反馈上传，
开发者可在 IoT 平台查看用户反馈及下载对应日志文件。用户反馈查看入口：数据中心—用户反馈，如果看不到数据中心入口，联系自己所属企业管理员修改账号权限。

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>string</code> | 要打 log 到哪个 model 下 |
| log | <code>string</code> | 具体的 log 数据 |

**Example**  
```js
Service.smarthome.reportLog("a.b.c", "hello");
    Service.smarthome.reportLog(Device.model, `[info]test value is :${v1},${v2},${v3}`)
    Package.isDebug&&Service.smarthome.reportLog(...)

    Device.reportLog(`...`)
```
