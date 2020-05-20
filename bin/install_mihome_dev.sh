#!/bin/bash

installNode() {
    if [ -d "./.mi_node" ]; then
        rm -rf ./.mi_node
    fi
    mkdir .mi_node
    cd .mi_node

    curl -L https://npm.taobao.org/mirrors/node/v12.16.1/node-v12.16.1-darwin-x64.tar.gz >> node.tar.gz
    
    echo "解压中..."
    tar -zxf node.tar.gz

    mv node-v12.16.1-darwin-x64 ./node
    if [ -f "node/*.md" ]; then
        rm ./node/*md
    fi
    if [ -f "node/LICENSE" ]; then
        rm ./node/LICENSE
    fi

    echo "安装中..."
    sudo cp -Rf ./node/* /usr/local/

    echo "清理缓存"
    cd ../
    rm -rf .mi_node

    echo "安装结束"
    node --version
    npm --version
}

installNode
