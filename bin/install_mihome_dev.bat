@echo off

goto listMenu

:installBinary
    REM cls
    REM FOR /F "tokens=* USEBACKQ" %%F IN (`node -v`) DO (SET installedVersion=%%F)
    REM  if not x%installedVersion:不是内部或外部命令=%==x%installedVersion% (
    REM      SET /P reInstall=当前已经安装 %installedVersion%，重新安装?(Y/[N])
    REM      IF /I "%reInstall%" NEQ "Y" goto listMenu
    REM  )
    cls
    echo 提示：
    echo  为避免被误认为病毒而阻止，请先前往 Windows 安全中心 》病毒和威胁防护 》管理设置关闭 实时保护
    echo  安装完成后再开启即可
    echo  如果报错 MSVCP140 请为你的系统安装Visual_Studio_2015
    pause

    cls
    echo 即将为您安装 %2
    cd %userprofile%\
    IF not exist AppData\Local\mi (mkdir AppData\Local\mi)
    cd AppData\Local\mi
        echo 下载中...
        IF exist file.zip ( del file.zip )
        certutil -urlcache -split -f %1 file.zip
        echo 解压中...
        IF exist %2 ( rmdir /Q /S %2)
        tar xf file.zip
        del file.zip
        echo 配置中...
        setlocal enabledelayedexpansion
        setx PATH "%userprofile%\AppData\Local\mi\%2;%~dp0;%PATH%"
    echo 结束
    "%3"
    pause
    goto listMenu

:fixEnviroument
    cls
    SET /P needDownload=提示：部分资源可能下载很慢，手动下载资源可提高速度和成功率，是否手动下载?(Y/[N])
    set needDownloadY = false
    IF "%needDownload%" == "Y" (set needDownloadY=true)
    IF "%needDownload%" == "y" (set needDownloadY=true)
    IF "%needDownloadY%"=="true" (
        start "" https://pan.mioffice.cn:443/link/78B865E2AFE0B2BE2A49E1A086FA79F0
        echo 请在打开的网页手动下载zip包并解压覆盖到SDK根目录
        pause
    )

    cls
    cd ..\
    set sdkdirok=true
    IF not exist miot-sdk (
       set sdkdirok=false
    )
    IF not exist projects (
       set sdkdirok=false
    )
    IF not exist package.json (
       set sdkdirok=false
    )
    IF "%sdkdirok%"=="false" (
         echo 请确保SDK目录结构完整，并且脚本在bin目录下, 并重启脚本
         pause
        REM goto listMenu
    )
    echo 清理中...
    FOR /F "tokens=* USEBACKQ" %%F IN (`npm cache verify`) DO (
      SET npmVerify=%%F
    )
    echo %npmVerify%
    FOR /F "tokens=* USEBACKQ" %%F IN (`npm cache clean --force`) DO (
      SET npmClean=%%F
    )
    echo 安装中...
    FOR /F "tokens=* USEBACKQ" %%F IN (`npm install`) DO (
      SET npmInstall=%%F
    )
    goto exit


:listMenu
    cls
    echo 1 安装 node 开发环境
    echo 2 安装 watchman 开发环境
    echo 3 修复 node_modules 资源
    SET /P FUNC=请选择：
    IF "%FUNC%" == "1" CALL :installBinary https://npm.taobao.org/mirrors/node/v12.16.1/node-v12.16.1-win-x64.zip  node-v12.16.1-win-x64   "node -v"
    IF "%FUNC%" == "2" CALL :installBinary http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_zip_895012f81cb3668260b0e8bec291b5f9.zip watchman-v2020.08.17.00-windows/bin "watchman -v"
    IF "%FUNC%" == "3" CALL :fixEnviroument


:exit
    echo 结束
    pause