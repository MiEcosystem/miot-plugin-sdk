<a name="module_miot/host/file"></a>

## miot/host/file
本地文件访问及处理服务
注意插件文件处理皆处于插件沙盒目录下

  
**Example**  
```js
//给定文件名后下载或者截图后被放到本地目录里, 在<Image/>等标签需要引用时, 使用{local:"filename"}的方式引入
const myfile = "testpicture.png"
Host.file.downloadFile("http://..../...png", myfile)
.then(res=>{
    const myimg = <Image source={{local:myfile}} ... />
    ...
})
.catch(err=>{...})

...
const myshotfile = "testshot.png"
Host.file.screenShot(myshotfile)
.then(res=>{
   const myshotpic = <Image source={{local:myshotfile}} ... />
   ...
});
...
```
