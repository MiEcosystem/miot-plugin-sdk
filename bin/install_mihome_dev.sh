#!/bin/bash

function installBinary {
   clear
   INSTALLED_VERSION=$($3)
   clear
   if [[ $INSTALLED_VERSION != *"not found"* ]] ; then
       echo "当前已经安装: $INSTALLED_VERSION, 重新安装？(Y/[N])"
       read reInstall
       if [ $reInstall != Y] && [ $reInstall != y]; then
           listMenu
           return
       fi
   fi
    clear
    echo "即将为您安装"$2
    if [ -d ".mi_tmp" ]; then
        rm -rf .mi_tmp
    fi
    mkdir .mi_tmp
    cd .mi_tmp
        echo "下载中..."
        curl -L $1 >> file.zip
        echo "解压中..."
        tar -zxf file.zip
        rm -rf file.zip
        echo "配置中..."
        cd $2
        find . -maxdepth 1 ! -name 'bin' ! -name 'include' ! -name 'lib' ! -name 'share' -delete     
        if ! [ -d "bin" ]; then
            echo "包文件未兼容，可能不包含bin文件"
            return
        fi
        cd ../
        sudo cp -Rf $2/* /usr/local/
        echo "结束"
        cmdStrs=$4[@]
        cmds=("${!cmdStrs}")
        for i in "${cmds[@]}"; do
            $i; 
        done
    cd ../
    rm -rf .mi_tmp
    read
    listMenu
}

function fixEnviroument {
    clear
    echo "提示：部分资源可能下载很慢，手动下载资源可提高成功率速度和，是否手动下载?(Y/[N])"
    read needDownload
    if [ "$needDownload" == Y ] || [ "$needDownload" == y ]; then
        open "https://kpan.mioffice.cn/webfolder/ext/En2oHYEhI6c%40"
        echo "请在打开的网页手动下载zip包，并解压覆盖到SDK根目录"
        read c
    fi

    clear
    ls
    if [ -d "./miot-sdk" ] && [ -d "./projects" ] && [ -f "./package.json" ]; then
        clear
    else 
        echo "请确保SDK目录结构完整，并且在SDK目录下执行本脚本 sh bin/install_mihome_dev.sh"
        read c
        return
    fi
    echo "清理中..."
    npm cache verify
    npm cache clean --force
    echo "安装中..."
    npm install
    echo "结束"
    read
}

listMenu() {
    clear
    echo "1 安装node开发环境"
    echo "2 安装watchman开发环境"
    echo "3 修复node_modules资源"
    read FUNC
    if [ $FUNC == 1 ]; then
        cmds=("node -v" "npm -v")
        installBinary https://npm.taobao.org/mirrors/node/v12.16.1/node-v12.16.1-darwin-x64.tar.gz node-v12.16.1-darwin-x64 "node -v" cmds
    fi
    if [ $FUNC == 2 ]; then
        cmds=("watchman -v" "sudo mkdir -p /usr/local/var/run/watchman" "sudo chmod 042777 /usr/local/var/run/watchman")
        installBinary http://cdn.cnbj0.fds.api.mi-img.com/miio.files/commonfile_zip_dc8b2725f727339b95273f11a389dd32.zip watchman-v2020.08.17.00-macos "watchman -v" cmds
    fi
    if [ $FUNC == 3 ]; then
        fixEnviroument
    fi
}

listMenu
