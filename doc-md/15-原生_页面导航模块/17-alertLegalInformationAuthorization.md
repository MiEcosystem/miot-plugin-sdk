<a name="module_miot/host/ui.alertLegalInformationAuthorization"></a>

## .alertLegalInformationAuthorization(option) ⇒ <code>Promise</code>
弹窗请求隐私政策和用户协议授权， 支持显示用户体验计划

**Kind**: static function  
**Returns**: <code>Promise</code> - 弹窗授权结果  
**Since**: 10023  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| option | <code>object</code> |  | 配置数据 |
| option.privacyURL | <code>string</code> |  | 隐私协议本地资源 |
| [option.agreementURL] | <code>string</code> |  | 用户协议本地资源，未设置时如果hideAgreement=false，显示为默认的用户协议 |
| [option.experiencePlanURL] | <code>string</code> |  | 用户体验计划本地资源，为空时如果hideUserExperiencePlan=false，则显示米家默认用户体验计划 |
| [option.hideAgreement] | <code>boolean</code> | <code>false</code> | 是否隐藏用户协议，默认显示用户协议 |
| [option.hideUserExperiencePlan] | <code>boolean</code> | <code>false</code> | 是否隐藏用户体验计划，默认显示用户体验计划 |

**Example**  
```js
//仅供参考
//可以参考project/com.xiaomi.demo/Main/Host/UI/privacy.js部分样例

//batchGetDeviceDatas 设置的属性在设备删除以及设备取消授权之后会自动清空，因此只需要在请求授权检测时，检查下flag即可。撤销授权时可以不用手动清理flag
const agreementURL = require('xxxxx.html');
const privacyURL = require('xxxxx.html');
var options = {agreementURL, privacyURL};
//options.hideAgreement = this.state.hideAgreement;
Service.smarthome.batchGetDeviceDatas([{ did: Device.deviceID, props: ["prop.s_auth_config"] }]).then(res => {
 console.log('batchGetDeviceDatas ', res);
 let alreadyAuthed = false;
 let result = res[Device.deviceID];
 let config;
 if (result && result['prop.s_auth_config']) {
   config = result['prop.s_auth_config']
 }
 if (config) {
   try {
     let authJson = JSON.parse(config);
     console.log('auth config ', authJson)
     alreadyAuthed = authJson.privacyAuthed && true;
   } catch (err) {
     //json解析失败，不处理
   }
 }
 if (alreadyAuthed) {
   //已授权，不再弹窗显示
   alert("已经授权")
   return new Promise.resolve("已经授权")
 } else {
   return Host.ui.alertLegalInformationAuthorization(options).then(res => {
     console.log('授权结果', res)
     if (res) {
       return Service.smarthome.batchSetDeviceDatas([{ did: Device.deviceID, props: { "prop.s_auth_config": JSON.stringify({ 'privacyAuthed': 'true' }) } }])
     } else {
       return new Promise.reject("取消授权")
     }
   })
 }
}).catch(err => {
  //没能授权成功
 alert('授权错误'+err)
 Package.exit()
});
```
