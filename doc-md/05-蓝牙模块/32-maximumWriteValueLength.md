<a name="module_miot/Bluetooth--module.exports.IBluetooth+maximumWriteValueLength"></a>

## .maximumWriteValueLength(type)
获取当前连接设备写操作每包最大长度
注：有开发者反馈该系统接口在 iOS 上并不完全准确，不可过于依赖，以实际测试为准
注：返回值单位为 bit，注意换算，8 bit 为 1 byte，两字符 hexString 长度为 1 byte，如 “FF”

**Kind**: instance function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>int</code> | <code>0</code> | 0 代表 writeWithResponse, 1 代表 writeWithoutResponse |

