<a name="module_miot/service/smarthome..DeviceVersion"></a>

## ~DeviceVersion
设备固件版本信息

**Kind**: inner typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isUpdating | <code>boolean</code> | 是否ota升级中 为true时，otaState才有效 |
| isLatest | <code>boolean</code> | 是否是最新版本 |
| isForce | <code>boolean</code> | 是否强制升级 |
| hasNewFirmware | <code>boolean</code> | 是否有新固件 |
| curVersion | <code>string</code> | 当前固件版本 |
| newVersion | <code>string</code> | 新固件版本 |
| description | <code>string</code> | 描述 |
| otaState | <code>OTAState</code> | 设备OTA状态， since 10011 |

