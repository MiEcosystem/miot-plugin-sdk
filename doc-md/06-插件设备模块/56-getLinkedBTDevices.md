<a name="module_miot/Device--module.exports..IDevice+getLinkedBTDevices"></a>

## .getLinkedBTDevices([did]) ⇒ <code>Promise</code>
获取蓝牙网关关联的普通蓝牙和蓝牙mesh设备列表。

**Kind**: instance function  
**Returns**: <code>Promise</code> - 返回数组设备信息的promise， {"mesh":[], "normal":""}  
**Since**: 10020  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [did] | <code>string</code> | <code>&quot;Device.deviceID&quot;</code> | 蓝牙网关的did，可以为空，为空时默认取当前Device.deviceID |

