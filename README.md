# MIOT SDK for React Native

**运行前请先执行npm install**

**请使用底下提供的测试包调试，不要使用线上包调试**

## 初始化

    1, 下载开发环境, 执行 git clone git@github.com:MiEcosystem/miot-plugin-sdk.git

    2, 命令行进入开发环境根目录, 安装 node 和 npm, 版本9.0+ ( **推荐mac上：npm版本6.12.1，node版本v12.13.1** )
       内置一键安装开发环境脚本
       Windows: 执行 `bin/install_mihome_dev.bat` （注意按提示关闭实时安全防护)
       MacOS: 执行 `bin/install_mihome_dev.sh`

    3, 安装ReactNative基础库, 在根目录下执行 npm install

    !注意, 项目中如果需要使用第三方库(仅限于纯js实现), 请进入项目目录(如 projects/com.xiaomi.demo),
    执行 npm install --save xxxx, 否则在打包发布时将因为找不到第三方库而失败

## 命令

    创建项目
    npm run create xxx.yyy.zzz
        注: xxx.yyy.zzz 为项目路径名, 创建后项目位于projects/xxx.yyy.zzz下
    也可以使用米家开发好的模板
    npm run create xxx.xxx.xxx[插件包名] -type empty :  创建一个空项目   
    npm run create xxx.xxx.xxx[插件包名] -type common : 创建一个通用模板项目(包括: 页面跳转（NavigationBar）、设置页（CommonSetting）、多语言、隐私、自定义场景、固件升级)    
    npm run create xxx.xxx.xxx[插件包名] -type wifi :   创建一个wifi模板项目(包括: 通用模板功能、设备控制及属性订阅功能)    
    npm run create xxx.xxx.xxx[插件包名] -type ble :    创建一个ble模板项目(包括: 通用模板功能、蓝牙连接相关功能)    

    启动调试
    npm start xxx.yyy.zzz,使用米家APP扫描控制台中的二维码开启调试。

    运行Demo
    在/miot-workspace下，执行
        npm install
    如果windows 下 fsevents报错，可忽略。mac下，可执行npm install fsevents@latest。
    其他报错，请查看issues，或者提工单。然后
        cd projects/com.xiaomi.demo
        npm install
    然后就可以npm start，开始调试demo了

    **注意：之所以需要在com.xiaomi.demo下再执行一次npm install，是因为我们在com.xiao.demo引入了纯js的第三方库：react-native-root-toast。作为第三方库引入的示例！如果不执行npm install，直接调试com.xiaomi.demo会报错找不到react-native-root-toast！**

    发布项目
    npm run publish xxx.yyy.zzz
        注: 缺省的目标文件位于 projects/xxx.yyy.zzz/build/publish.mpkg, 可以通过 --target 指定任意目标文件

## 配置
在项目创建后(如xxx.yyy.zzz), 在projects/xxx.yyy.zzz 目录下有项目配置文件 project.json, 结构说明如下:

    {
        "package_path":"xxx.yyy.zzz",     //项目路径名
        "min_sdk_api_level":10000        //支持运行的SDK API_LEVEL
    }

## 注意

    1, 不允许对根目录下的 package.json 文件做任何修改,否则将导致在线打包失败,
    2, 只允许在各自项目目录下(projects/xxx.yyy.zzz)引用第三方库, 修改这下面的 package.json, 执行 npm install
    3, 不允许引用 projects 下其他项目的任何内容

## 文档
🎉 UI组件说明文档正式公开

[正式版](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/%E7%B1%B3%E5%AE%B6%E6%8F%92%E4%BB%B6%E9%80%9A%E7%94%A8UI%E7%BB%84%E4%BB%B6%E6%89%8B%E5%86%8C.md)，仅包括已经发布的组件

[预览版](https://github.com/MiEcosystem/miot-plugin-sdk/blob/ui_doc/%E7%B1%B3%E5%AE%B6%E6%8F%92%E4%BB%B6%E9%80%9A%E7%94%A8UI%E7%BB%84%E4%BB%B6%E6%89%8B%E5%86%8C.md)，包括已经发布的组件和开发完成待发布的组件

插件开发请参考[《MIOT SDK API》](https://github.com/MiEcosystem/miot-plugin-sdk/wiki)
            [《CHANGELOG》](https://github.com/MiEcosystem/miot-plugin-sdk/releases)

插件从RN54版本升至61版本请参考[《升级指南》](https://github.com/MiEcosystem/miot-plugin-sdk/wiki/RN61%E5%BC%80%E5%8F%91%E8%80%85%E5%8D%87%E7%BA%A7%E6%8C%87%E5%8D%97)

插件从旧框架迁移到新框架请参考[《迁移手册》](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/%E8%BF%81%E7%A7%BB%E6%89%8B%E5%86%8C.md)

插件调试流程请参考[《调试说明》](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/%E8%B0%83%E8%AF%95%E8%AF%B4%E6%98%8E.md)


## 调试环境

iOS IPA 包下载二维码
![mihome](https://user-images.githubusercontent.com/6511522/159238473-fbf07ace-ef8d-442e-b299-7ffe6ea50f47.png)


Android APK 包下载地址：http://d.maps9.com/MiHomeForAndroid

下载密码: keliyuan


调试包若无法下载，请提交工单。

## 其他文档

[字体使用](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/font.md)
