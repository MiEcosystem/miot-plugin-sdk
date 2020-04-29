@echo off
echo 为避免被误认为病毒而阻止，请先前往 Windows 安全中心 》病毒和威胁防护 》管理设置关闭 实时保护
echo 安装完成后再开启即可
pause

cd %userprofile%\
IF exist AppData\Local\mi (
  echo .
) ELSE ( 
  mkdir AppData\Local\mi
)
cd AppData\Local\mi

echo 下载中...
IF exist node.zip ( del node.zip )
certutil -urlcache -split -f https://npm.taobao.org/mirrors/node/v12.16.1/node-v12.16.1-win-x64.zip node.zip

echo 解压中...
tar xf node.zip
IF exist node ( rmdir /Q /S node )
Rename  node-v12.16.1-win-x64  node
del node.zip

echo 配置中...
cd node
setlocal enabledelayedexpansion
setx PATH "%userprofile%\AppData\Local\mi\node;%~dp0;%PATH%"

cd "%userprofile%
REM node -v
REM npm -v

echo 安装结束
pause