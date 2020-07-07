## 如何搭建开发环境

1. 安装依赖 npm ci
2. 执行 node ./scripts/initDemo.js 初始化 rn sdk 的开发环境。成功后出现 demo/miot-workspace
   
## 如何调试组件

1. 执行 npm run dev， 此命令会监听 src 下的文件，变动后打包至 demo/miot-workspace/node_modules/mhui-rn
2. 进入 demo/miot-workspace 下执行 npm run start
3. 在 project 中引入 mhui-rn 中的组件
4. 修改 src 下的组件就可以看到改动效果了
