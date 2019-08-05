<a name="module_miot/Host.createBackgroundExecutor"></a>

## .createBackgroundExecutor(jx, initialProps) ⇒ <code>Promise.&lt;IExecutor&gt;</code>
后台执行文件, 后台最多同时运行三个线程, 超过将销毁最早创建的 executor

**Kind**: static function  
**Since**: 10002  

| Param | Type | Description |
| --- | --- | --- |
| jx | <code>\*</code> | 可执行的纯 js 文件, 不使用任何高级语法, 如要使用 es6, 请自行编译通过. |
| initialProps | <code>json</code> | 用于脚本初始化的数据, 在jx文件中为 'initialProps' 对象，使用方法参考样例 或者sampleProject中 ‘com.xiaomi.demo/Main/tutorial/JSExecutor.js’ |

**Example**  
```js
var myexecutor = null;
Host.createBackgroundExecutor(require('./test.jx'), {name1:"testName"})
     .then(executor=>{
         myexecutor = executor;
         executor.execute("myFunc", 1,2,'a')
                 .then(result=>{
                     console.log(result);
                 })
         //支持使用initialProps或者在jx中直接使用
         executor.execute("myFunc2", "initialProps.name1").then(res =>{...})
         //支持使用obj与arr
         executor.execute("SomeObject.myFunc3", {"name":"hello"}, ["a1","a2"]).then(res =>{...})
})
.then(err=>{...})
....
myexecutor&&myexecutor.remove();
```
