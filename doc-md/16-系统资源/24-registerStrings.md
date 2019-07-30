<a name="module_miot/resources.registerStrings"></a>

## .registerStrings(langStrings)
注册多语言

**Kind**: static function  

| Param | Type |
| --- | --- |
| langStrings | <code>json</code> | 

**Example**  
```js
import res from 'miot/resources'
     res.registerStrings({
        zh:{
            t1:"测试字符串",
            t2:"数值为{1}",
            t3:["从{1}到{2}", [0, "非法数据"], [1, "错误数据"], [2, "从 二 到 {2}"], [(v1,v2)=>v1>100, "太多了"]],
            t4:{
                t5:()=>"好的",
                t6:["最多{1}"],
                t7:(a,b,c)=>`${a}|${b}|${c}`,
                t8:"你好"
            }
        },
        en:{
            t1:"test strigns",
            t2:"value is {1}",
            t3:["from {1} to {2}", [0, "invalid data"], [1, "wrong value"], [3, "from three to {2}"], [v1=>v1>100, "too more"]],
            t4:{
                t5:[()=>"good"],
                t6:"{1} at most",
                t7:(a,b,c)=>`${a}/${b}/${c}`
            }
        }
     });
    
    //style recommend
    console.log(res.strings.t1);
    console.log(res.strings.t2(123));
    console.log(res.strings.t3(0, 1));
    console.log(res.strings.t3(1, 2)); 
    console.log(res.strings.t3(2, 200));
    console.log(res.strings.t3(100, 3000)); 
    console.log(res.strings.t3(101, 500));
    console.log(res.strings.t4.t5());
    console.log(res.strings.t4.t6(20));
    console.log(res.strings.t4.t7(5,6,7));
    console.log(res.strings.t4.t8);

    //style traditional
    console.log(res.getString('t1');
    console.log(res.getString('t2',123));
    console.log(res.getString('t3', 0, 1));
    console.log(res.getString('t3', 1, 2)); 
    console.log(res.getString('t3', 2, 200));
    console.log(res.getString('t3', 100, 3000)); 
    console.log(res.getString('t3', 101, 500));
    console.log(res.getString('t4.t5');
    console.log(res.getString('t4.t6', 20));
    console.log(res.getString('t4.t7', 5,6,7));
    console.log(res.getString('t4.t8');
```
