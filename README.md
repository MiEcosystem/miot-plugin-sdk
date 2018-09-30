# MIOT SDK 

## 初始化
    npm install

    注意, 项目中如果需要使用第三方库(仅限于纯js实现), 请进入项目目录(如 projects/com.xiaomi.demo), 执行 npm install -save xxxx, 否则在打包发布时将因为找不到第三方库而失败

## 命令

    创建项目
    npm run create com.xxx.xxx
    
    启动调试
    npm start
    
    发布项目
    npm run publish com.xxx.xxx

## 文档
[https://miecosystem.github.io/miot-plugin-sdk](https://miecosystem.github.io/miot-plugin-sdk) 

插件从旧框架迁移到新框架可以参考[迁移手册](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/%E8%BF%81%E7%A7%BB%E6%89%8B%E5%86%8C.md)

## 调试环境

[iOS IPA 包下载地址](https://fir.im/mijiadevelopment)
    
[Android apk包下载地址](https://fir.im/MiHomeForAndroid)

下载密码: keliyuan

#### android 插件调试
下载并安装调试环境的 android 米家 apk，依次点击 首页“我的”tab -> 设置 -> 开发者选项 -> RN设备插件调试设置

开启设备 rn 调试 选中
插件包名 填写 MiEcosystem/miot-plugin-sdk/projects 下项目的相对路径 如：com.xiaomi.demo
设备 model 按照插件包名对应路径的设备填写 如：xiaomi.demo.v1

插件包下project.json文件 package_name必须为项目的相对路径，developer_id 验证插件包的合法性使用，必须和开放平台配置的一致。models设备的 model 多个用“|”分隔，version插件版本号，min_sdk_api_level 允许运行的米家最小 api 版本

绑定设备后点击米家首页对应的设备，进入到 rn 插件页面。

在 npm start 运行后，如果电脑上配置了 adb，连接手机后输入 adb reverse tcp:8081 tcp:8081 或者用力摇动手机出现的弹框 -> Dev Settings -> Debug server host & port for device,设置npm start的 ip 和端口。如：192.168.1.2:8081

设置完成之后点击 RN 插件页面的左上角 dev 按钮，会 load 插件代码。
