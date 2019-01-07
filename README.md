# MIOT SDK (beta) for React Native

## 初始化

    1, 安装 node, 版本9.0+ 

    2, 下载开发环境, 执行 git clone git@github.com:MiEcosystem/miot-plugin-sdk.gitpkg

    3, 进入开发环境, 安装ReactNative基础库, 在根目录下执行 npm install

    注意, 项目中如果需要使用第三方库(仅限于纯js实现), 请进入项目目录(如 projects/com.xiaomi.demo), 
    执行 npm install --save xxxx, 否则在打包发布时将因为找不到第三方库而失败
    
 推荐使用[Docker](https://www.docker.com)的linux容器作为独立的开发环境
    
## 命令

    创建项目
    npm run create -- --models xxx.xxx.x1|xxx.xxx.x2 xxx.yyy.zzz
        注: xxx.xxx.x1~2为项目注册的model 
            xxx.yyy.zzz 为项目路径名
    
    启动调试
    npm start
        注： Docker下需要将端口（缺省为8081）映射出去，例如 docker run -p 8081:8081 -it ...
    
    发布项目
    npm run publish xxx.yyy.zzz
        注: 缺省的目标文件位于 projects/xxx.yyy.zzz/build/publish.mpkg, 可以通过 --target 指定任意目标文件

## 配置
在项目创建后(如xxx.yyy.zzz), 在projects/xxx.yyy.zzz 目录下有项目配置文件 project.json, 结构说明如下:

    {
        "models":"xxx.xxx.x1|xxx.xxx.x2", //必填, 固件 model 列表, 多个用|隔开
        "package_path":"xxx.yyy.zzz",     //项目路径名
        "min_sdk_api_level":10000,        //支持运行的SDK API_LEVEL
        "version_code":1,                 //版本序号
        "developer_id":""                 //当前版本的开发者账号
    }

## 文档
插件开发请参考[《MIOT SDK API》](https://miecosystem.github.io/miot-plugin-sdk) 
            [《CHANGELOG》](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/CHANGELOG.md)

插件从旧框架迁移到新框架请参考[《迁移手册》](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/%E8%BF%81%E7%A7%BB%E6%89%8B%E5%86%8C.md)

插件调试流程请参考[《调试说明》](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/%E8%B0%83%E8%AF%95%E8%AF%B4%E6%98%8E.md)


## 调试环境

[iOS IPA 包下载地址](https://fir.im/mijiadevelopment)
    
[Android apk包下载地址](https://fir.im/MiHomeForAndroid)

下载密码: keliyuan 

## 其他文档

[字体使用](https://github.com/MiEcosystem/miot-plugin-sdk/blob/master/font.md)
