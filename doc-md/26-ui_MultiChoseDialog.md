<a name="module_miot/ui/MultiChoseDialog"></a>

---

## miot/ui/MultiChoseDialog
多选对话框

**Export**:   
**Mark**: andr done  

* [miot/ui/MultiChoseDialog](#module_miot/ui/MultiChoseDialog)
    * [~visible](#module_miot/ui/MultiChoseDialog..visible) : <code>bool</code>
    * [~cancelable](#module_miot/ui/MultiChoseDialog..cancelable) : <code>bool</code>
    * [~title](#module_miot/ui/MultiChoseDialog..title) : <code>string</code>
    * [~timeout](#module_miot/ui/MultiChoseDialog..timeout) : <code>number</code>
    * [~dataSource](#module_miot/ui/MultiChoseDialog..dataSource) : <code>array</code>
    * [~dataKey](#module_miot/ui/MultiChoseDialog..dataKey) : <code>string</code>
    * [~checkKey](#module_miot/ui/MultiChoseDialog..checkKey) : <code>string</code>
    * [~cancel](#module_miot/ui/MultiChoseDialog..cancel) : <code>string</code>
    * [~confirm](#module_miot/ui/MultiChoseDialog..confirm) : <code>string</code>
    * [~onConfirm](#module_miot/ui/MultiChoseDialog..onConfirm) : <code>func</code>
    * [~onCancel](#module_miot/ui/MultiChoseDialog..onCancel) : <code>func</code>
    * [~onCheck](#module_miot/ui/MultiChoseDialog..onCheck) : <code>func</code>
    * [~onDismiss](#module_miot/ui/MultiChoseDialog..onDismiss) : <code>func</code>

<a name="module_miot/ui/MultiChoseDialog..visible"></a>

---

### miot/ui/MultiChoseDialog~visible : <code>bool</code>
是否显示

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..cancelable"></a>

---

### miot/ui/MultiChoseDialog~cancelable : <code>bool</code>
是否允许点击空白区域取消显示   
Android Only iOS无效

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..title"></a>

---

### miot/ui/MultiChoseDialog~title : <code>string</code>
标题

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..timeout"></a>

---

### miot/ui/MultiChoseDialog~timeout : <code>number</code>
超时自动隐藏，设置0或者不设置不会自动隐藏

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..dataSource"></a>

---

### miot/ui/MultiChoseDialog~dataSource : <code>array</code>
建议 array 的每个item 是一个 object，object 至少有展示条目名称、选中状态两个字段

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
**Example**  
```js
import {MultiChoseDialog} from 'miot/ui'
//dataSource列表数据中，dataKey所定义的值('dataKeyName') 对应项为展示的名称， 与checkKey所定义的值('checkKeyName') 对应的boolean值表示是否选中
<MultiChoseDialog 
dataSource = {[{'dataKeyName':'displayName1','checkKeyName':false}, {'dataKeyName':'displayName2','checkKeyName':true} ]}
dataKey = {'dataKeyName'}
checkKey = {'checkKeyName'}
/>
```
<a name="module_miot/ui/MultiChoseDialog..dataKey"></a>

---

### miot/ui/MultiChoseDialog~dataKey : <code>string</code>
dataSource每个条目显示名称 object 的字段名

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..checkKey"></a>

---

### miot/ui/MultiChoseDialog~checkKey : <code>string</code>
dataSource每个条目选中状态 object 的字段名

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..cancel"></a>

---

### miot/ui/MultiChoseDialog~cancel : <code>string</code>
取消标题

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..confirm"></a>

---

### miot/ui/MultiChoseDialog~confirm : <code>string</code>
确认标题

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..onConfirm"></a>

---

### miot/ui/MultiChoseDialog~onConfirm : <code>func</code>
确认点击回调

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..onCancel"></a>

---

### miot/ui/MultiChoseDialog~onCancel : <code>func</code>
取消点击回调

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
<a name="module_miot/ui/MultiChoseDialog..onCheck"></a>

---

### miot/ui/MultiChoseDialog~onCheck : <code>func</code>
回调会带一个 object 的参数，object.position为点击第几个条目，object.check 为选中状态

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
**Example**  
```js
import {MultiChoseDialog} from 'miot/ui'
<MultiChoseDialog 
...
onCheck={res => {
 console.log('click at row ', res.position, ' with checked ', res.check)
}}
/>
```
<a name="module_miot/ui/MultiChoseDialog..onDismiss"></a>

---

### miot/ui/MultiChoseDialog~onDismiss : <code>func</code>
弹窗消失回调

**Kind**: inner property of [<code>miot/ui/MultiChoseDialog</code>](#module_miot/ui/MultiChoseDialog)  
