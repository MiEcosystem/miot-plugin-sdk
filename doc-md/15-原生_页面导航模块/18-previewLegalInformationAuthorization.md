<a name="module_miot/host/ui.previewLegalInformationAuthorization"></a>

## .previewLegalInformationAuthorization(option) ⇒ <code>Promise</code>
查看隐私政策和用户协议信息， 支持显示用户体验计划

**Kind**: static function  
**Returns**: <code>Promise</code> - 授权结果  
**Since**: 10023  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| option | <code>object</code> |  | 配置数据 |
| option.privacyURL | <code>string</code> |  | 隐私协议本地资源 |
| [option.agreementURL] | <code>string</code> |  | 用户协议本地资源，未设置时如果hideAgreement=false，显示为默认的用户协议 |
| [option.experiencePlanURL] | <code>string</code> |  | 用户体验计划本地资源，为空时如果hideUserExperiencePlan=false，则显示米家默认用户体验计划 |
| [option.hideAgreement] | <code>boolean</code> | <code>false</code> | 是否隐藏用户协议，默认显示用户协议 |
| [option.hideUserExperiencePlan] | <code>boolean</code> | <code>false</code> | 是否隐藏用户体验计划，默认显示用户体验计划 |

