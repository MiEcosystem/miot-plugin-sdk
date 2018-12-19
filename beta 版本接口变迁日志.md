# beta版本接口变迁日志

## 2018-12-10
Device 接口发生变化:
1, 新增`getDeviceWifi()`
`callmethod/subscribeMessage/loadProperties` 等方法变成在 `getDeviceWifi()`后调用
example:
​    `Device.callMethod(...)  => Device.getDeviceWifi().callMethod(...)`

2, 新增`getBluetoothLE()`, 取消`Device.bluetooth`
example:
​    `Device.bluetooth => Device.getBluetoothLE()`

------

## 2018-12-19
依赖项`react-navigation` 版本发生变化: `2.3.1` -> `2.16.0`
1. 注意新框架不再需要之前的`config.plist`文件（可以删除），其中包含配置项`是否适配 iPhone X`，新框架默认适配。
2. `react-navigation` 升级之后，`SaveAreaView`也同步更新，可以适配**iPhone X, iPhone XR, iPhone Xs, iPhone Xs Max**。
3. 开发者需要手动更新`node_modules`。