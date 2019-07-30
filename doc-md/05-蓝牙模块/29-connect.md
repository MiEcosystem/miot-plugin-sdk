<a name="module_miot/Bluetooth--module.exports.IBluetooth+connect"></a>

## .connect(type, option) ⇒ <code>Promise.&lt;IBluetooth&gt;</code>
打开蓝牙链接. option参数peripheralID为iOS 平台的可选参数，因为iOS平台无法获取普通 BLE 蓝牙设备的 Mac
peripheralID 可通过 startScan（）搜索周边蓝牙设备获取（如设备OTA中，设备固件切换，无小米蓝牙协议相关服务时需建立连接），或通过retrievePeripheralsWithServicesForIOS（）搜索已连接设备获取（如可穿戴长连接设备，无法发送 mibeacon）
建立连接后，SDK 会用 peripheralID 充当 Mac 地址
error code :
0 - 成功  
-1: 请求失败  
-2: 请求取消哦  
-3: 参数异常  
-4: 蓝牙不支持  
-5: 蓝牙已关闭  
-6: 连接不可用  
-7: 超时  
-10: token失效  
-11: 请求过于频繁  
-12: 配置未准备  
-13: 请求中  
-14: 请求被拒绝  
-15: 未知异常  
-16: 安全芯片：设备已经被重置，没有注册的Key信息，需要用户重新绑定  
-17: 安全芯片：设备已经被绑定，需要用户解除绑定并且按设备的复位键清除绑定  
-18: 安全芯片：分享的钥匙已过期  
-19: 安全芯片：共享登录时没有获取到共享的Key  
-20: 安全芯片：注册时验证设备返回的证书和设备签名失败  
-21: 安全芯片：Owner登录时解析设备返回的证书和签名失败  
-22: 安全芯片：Owner登录时设备返回失败  
-23: 安全芯片：共享用户登录时解析设备返回的证书和签名失败  
-24: 安全芯片：共享用户登录时设备返回失败  
-25: 安全芯片：共享用户登录时获取SharedKeyId为空  
-26: 安全芯片：Owner登录时绑定LTMK到服务器失败  
-27: 连接设备过程中，Notify操作失败  
-28: 数据传输过程中，数据发送失败  
-29: 普通安全：注册时获取did失败  
-30: 普通安全：注册时绑定did失败  
-31: 普通安全：登录时验证设备返回的token失败  
-32: 蓝牙连接过程中收到连接断开的广播  
-33: 安全芯片：绑定的时候需要用户在设备输入配对码  
-34: 安全芯片：绑定时设备输入的配对码失败  
-35: 安全芯片：绑定时配对码过期  
-36: 安全芯片：绑定时获取固件版本号失败  
-37: 安全芯片：绑定时当前app不支持固件的版本，需要提示用户升级app  
-38: 安全芯片：从服务端同步到加密的LTMK，解密的时候pincode为空  
-39: 蓝牙Mesh绑定过程中，服务端校验设备证书失败  
-40: 蓝牙Mesh绑定过程中，服务端校验设备签名失败  
-41: 蓝牙Mesh绑定过程中，设备校验服务端证书失败  
-42: 蓝牙Mesh绑定过程中，设备校验服务端签名失败  
-43: 蓝牙Mesh绑定过程中，设备校验服务端公钥失败  
-44: 蓝牙Mesh绑定过程中，获取Mesh配置信息失败  
-45: 蓝牙Mesh绑定过程中，给服务端发送Mesh配置结果时失败

**Kind**: instance function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>int</code> |  | 蓝牙设备类型 -1 自动判断，0 普通小米蓝牙协议设备，1 安全芯片小米蓝牙设备（比如锁类产品），2 分享的安全芯片小米蓝牙设备，3 普通的BLE蓝牙设备(无 mibeacon，无小米 FE95 service) |
| option | <code>json</code> | <code>0</code> | 附加参数, 格式 {timeout:12000, peripheralID:"..."}, timeout的单位为毫秒, peripheralID是iOS平台参数 |

**Example**  
```js
Device.getBluetoothLE()
      .connect(3, {peripheralID:"1-a-b-3-c", timeout:12000})
      .then(ble=>{
         ...
      })
      .catch(err=>{
         ...
      });
```
