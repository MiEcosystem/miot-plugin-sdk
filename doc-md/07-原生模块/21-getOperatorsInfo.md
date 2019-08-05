<a name="module_miot/Host.getOperatorsInfo"></a>

## .getOperatorsInfo() ⇒ <code>Promise</code>
获取手机运营商信息
返回值中：
name 运营商名称-与手机语言一致
simOperator 运营商 国家编码(三位)+网络编码 参考 https://en.wikipedia.org/wiki/Mobile_country_code
countryCode 运营商国家码，ISO 3166-1 country code

**Kind**: static function  
**Returns**: <code>Promise</code> - 运营商信息 {'1':{name:'',simOperator:'',,countryCode:''},'2':{...}}  
**Since**: 10021  
