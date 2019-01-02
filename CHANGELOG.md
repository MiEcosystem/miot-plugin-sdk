## 2018-12-25
蓝牙IBluetoothLE.connect(...)的参数变化, 第二个参数变成一个 json, 添加了 timeout 控制能力

    IBluetoothLE.connect(type, peripheralID=0) => IBluetoothLE.connect(type, {peripheralID,timeout})

------

## 2018-12-20
蓝牙事件`BluetoothEvent.bluetoothDeviceDiscovered`监听返回的数据变成scan的原始数据json, 而不再是一个蓝牙对象, 绑定关系由插件自己决定.

------

## 2018-12-19
创建项目不再需要 pluginId的参数, 配置文件里的 plugin_id 也取消，开发者不再需要关心 pluginId 的事情。

    example:
    npm run create -- --models xxx.xxx.x1|xxx.xxx.x2 xxx.yyy.zzz

------

## 2018-12-19
依赖项`react-navigation` 版本发生变化: `2.3.1` -> `2.16.0`

1. 注意新框架不再需要之前的`config.plist`文件（可以删除），其中包含配置项`是否适配 iPhone X`，新框架默认适配。
2. `react-navigation` 升级之后，`SaveAreaView`也同步更新，可以适配**iPhone X, iPhone XR, iPhone Xs, iPhone Xs Max**。
3. 开发者需要手动更新`node_modules`。
4. 如果报错`Unable to resolve module react-navigation/src/views/StackView/StackViewStyleInterpolator`，请手动删除项目里面以下内容：

```js
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

transitionConfig: () => ({
  screenInterpolator: CardStackStyleInterpolator.forHorizontal,
}),
```
------

## 2018-12-10
Device 接口发生变化:
1, 新增`getDeviceWifi()`
`callmethod/subscribeMessage/loadProperties` 等方法变成在 `getDeviceWifi()`后调用

    example:
    Device.callMethod(...)  => Device.getDeviceWifi().callMethod(...)

2, 新增`getBluetoothLE()`, 取消`Device.bluetooth`

    example:
    Device.bluetooth => Device.getBluetoothLE()
