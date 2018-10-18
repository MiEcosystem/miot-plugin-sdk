# MIOT SDK for React Native

## 初始化
    1, 安装 node, 版本9.0+

    2, 下载项目, 执行 git clone git@github.com:MiEcosystem/miot-plugin-sdk.git

    3, 进入项目, 安装react native, 执行 npm install

    注意, 项目中如果需要使用第三方库(仅限于纯js实现), 请进入项目目录(如 projects/com.xiaomi.demo), 
    执行 npm install -save xxxx, 否则在打包发布时将因为找不到第三方库而失败

## 命令

    创建项目
    npm run create --models xxx.xxx.x1|xxx.xxx.x2 com.xxx.xxx
    
    启动调试
    npm start
    
    发布项目
    npm run publish com.xxx.xxx

## 配置
在项目创建后(如com.xxx.xxx), 在projects/com.xxx.xxx 目录下有项目配置文件 project.json, 结构说明如下:

    {
        "package_name":"com.xxx.xxx", //项目包名, 也是创建项目时使用的名称字符串, 正式项目需从小米开放平台申请.
        "models":"xxx.xxx.x1|xxx.xxx.x2", //支持的固件 model 列表, 多个用|隔开
        "min_sdk_api_level":10000 //支持运行的最低SDK API_LEVEL
    }

## 文档
插件开发请参考[MIOT SDK API](https://miecosystem.github.io/miot-plugin-sdk) 

插件从旧框架迁移到新框架可以参考[迁移手册](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/%E8%BF%81%E7%A7%BB%E6%89%8B%E5%86%8C.md)

插件调试流程请参考 [调试说明](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/%E8%B0%83%E8%AF%95%E8%AF%B4%E6%98%8E.md)

## 调试环境

[iOS IPA 包下载地址](https://fir.im/mijiadevelopment)
    
[Android apk包下载地址](https://fir.im/MiHomeForAndroid)

下载密码: keliyuan 
