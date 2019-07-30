<a name="module_miot/Device--module.exports..IDevice+checkFirmwareUpdateAndAlert"></a>

## .checkFirmwareUpdateAndAlert() ⇒ <code>Promise</code>
检查设备固件升级弹窗。该方法会触发升级弹窗alert提示。
建议使用场景为需要屏蔽默认的插件启动检测的弹窗，自行寻找合适的时机触发该检测机制。
不支持单模蓝牙、组设备、虚拟设备、离线设备、分享设备。

**Kind**: instance function  
**Example**  
```js
//首先屏蔽默认弹窗
Package.disableAutoCheckUpgrade = true;
//....
//在合适的时间触发
Device.checkFirmwareUpdateAndAlert().then(res => { }).catch(err => { })
```
