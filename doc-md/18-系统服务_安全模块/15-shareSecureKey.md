<a name="module_miot/service/security--module.exports.shareSecureKey"></a>

## .shareSecureKey(deviceID, shareUid, [settings]) ⇒ <code>Promise.&lt;ISecureKey&gt;</code>
分享 /share/bluetoothkeyshare

**Kind**: static function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| deviceID |  |  | 被分享设备ID |
| shareUid |  |  | 被分享人 |
| [settings] | <code>Object</code> | <code>{}</code> | readonly = true, 则被分享人不可接收锁push，false则被分享人可接收锁push，（family关系用户不受这个字段影响）。status:分享类别，1：暂时，2：周期，3：永久; weekdays 生效日期（星期几，例如周一和周三对应1和3，[1, 3]），仅在status=2时不可为空 |

