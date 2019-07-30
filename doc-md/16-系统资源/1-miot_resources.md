<a name="module_miot/resources"></a>

## miot/resources
系统提供的静态资源, 包括图片, 文字, 基础 styleSheet css 等等

  
**Example**  
```js
import res, {Language} from "miot/resources"

res.logo
...

console.log(res.systemStrings.mijia)
console.log(res.getSystemString('mijia'))

res.registerStrings({
  zh:{t1:"测试"},
  en:{t1:"test"}
})

console.log(res.strings.t1)
console.log(res.getString('t1'))

res.setLanguage(Language.zh_hk)

console.log(res.getLanaguage())
```
