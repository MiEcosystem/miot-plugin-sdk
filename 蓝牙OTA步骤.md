# 蓝牙设备固件升级步骤

1. 获取当前固件最新版本
   ```javascript
   Service.smarthome.getLatestVersion(Device.model).then((response) => {
    console.log("latest version"+JSON.stringify(response));
   });
   ```

2. 获取固件当前的版本号
   通过蓝牙service、character读出当前固件版本号（成功连接的固件sdk会读取一次，通过 Device.getBluetoothLE().getVersion().then(ver=>{...})读取version属性可以获得，如果有问题，可以自行通过蓝牙读取）

3. 固件下载、解压缩等操作在 Host.file 模块文档中有下载文件、解压缩等的接口

4. 读写数据到固件的流程不变，新增了读写hex字符串到设备的便携接口

   ```javascript 
    Device.getBluetoothLE()
        .getService(serviceUUID)
        .getCharacteristic(characteristicUUID)
        .write(hexString).then(res=>{...})
   ```
 

