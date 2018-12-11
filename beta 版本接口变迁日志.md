# beta版本接口变迁日志

## 2018-12-10
    Device 接口发生变化:
    1, 新增 getDeviceWifi()
    callmethod/subscribeMessage/loadProperties 等方法变成在 getDeviceWifi().后调用
    example:
        Device.callMethod(...)  => Device.getDeviceWifi().callMethod(...)
    
    2, 新增getBluetoothLE(), 取消Device.bluetooth
    example:
        Device.bluetooth => Device.getBluetoothLE()

