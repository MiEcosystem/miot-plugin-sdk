<a name="module_miot/resources.createI18n"></a>

## .createI18n(langStrings, defaultLanguage)
创建本地化字符串

**Kind**: static function  

| Param | Type | Description |
| --- | --- | --- |
| langStrings | <code>json</code> | 多语言字符串 |
| defaultLanguage | <code>Language</code> | 默认语言 |

**Example**  
```js
const i18n = res.createI18n({
    zh:{test:"测试"},
    en:{test:"test"}
}, Language.zh)

...
console.log(i18n.strings.test) //> 测试
i18n.language = Language.en;
console.log(i18n.strings.test) //> test
i18n.language = null;
console.log(i18n.strings.test) //> 测试
```
