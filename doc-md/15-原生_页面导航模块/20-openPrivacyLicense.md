<a name="module_miot/host/ui.openPrivacyLicense"></a>

## ~~.openPrivacyLicense(licenseTitle, licenseUrl, policyTitle, policyUrl) ⇒ <code>Promise</code>~~
***Deprecated***

软件政策和隐私协议授权
隐私协议弹框需求：
a. 所有接入米家的设备，绑定成功后第一次进插件，都需要隐私弹框，后续再进不需弹框
b. 取消隐私授权/解绑设备后，重新绑定设备，仍需遵循规则a
插件端可按如下方案实现：
1. 使用batchSetDeviceDatas存储一个标志位，用来记录是否“隐私弹框”过
2. 进入插件时batchGetDeviceDatas获取此标志位，若为NO，弹框，同时设置标志位为YES；若为YES，不弹框
3. 设备取消授权或解绑设备时，此标志位米家后台会自动清除，故遵循了上述需求b
4. 异常处理：进插件时，如果网络异常等原因导致batchGetDeviceDatas失败，就不弹框（此时99%情况是第2+次进插件）

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| licenseTitle | <code>string</code> | optional 可以为空 |
| licenseUrl | <code>string</code> | optional require('资源的相对路径') |
| policyTitle | <code>string</code> | 不可以为空 |
| policyUrl | <code>string</code> | 不可以为空 require('资源的相对路径') |

