<a name="module_miot/Bluetooth--module.exports.bindDeviceforMIUI"></a>

## .bindDeviceforMIUI(mac)
只在MIUI上支持，维持长连接 如果连接失败，则会隔一段时间尝试重连，如果继续失败，则重连间隔会翻倍，直到上限。

**Kind**: static function  

| Param | Type |
| --- | --- |
| mac | <code>string</code> | 

