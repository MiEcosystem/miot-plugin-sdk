<a name="module_miot/ui/ProgressDialog"></a>

---

## miot/ui/ProgressDialog
进度对话框，当进度到达max设置之后自动消失

**Export**:   
**Mark**: andr done  

* [miot/ui/ProgressDialog](#module_miot/ui/ProgressDialog)
    * [~visible](#module_miot/ui/ProgressDialog..visible) : <code>bool</code>
    * [~cancelable](#module_miot/ui/ProgressDialog..cancelable) : <code>bool</code>
    * [~title](#module_miot/ui/ProgressDialog..title) : <code>string</code>
    * [~message](#module_miot/ui/ProgressDialog..message) : <code>string</code>
    * [~timeout](#module_miot/ui/ProgressDialog..timeout) : <code>number</code>
    * [~max](#module_miot/ui/ProgressDialog..max) : <code>number</code>
    * [~progress](#module_miot/ui/ProgressDialog..progress) : <code>number</code>
    * [~onDismiss](#module_miot/ui/ProgressDialog..onDismiss) : <code>func</code>

<a name="module_miot/ui/ProgressDialog..visible"></a>

---

### miot/ui/ProgressDialog~visible : <code>bool</code>
是否显示

**Kind**: inner property of [<code>miot/ui/ProgressDialog</code>](#module_miot/ui/ProgressDialog)  
<a name="module_miot/ui/ProgressDialog..cancelable"></a>

---

### miot/ui/ProgressDialog~cancelable : <code>bool</code>
是否允许点击空白区域取消显示   
Android Only iOS无效

**Kind**: inner property of [<code>miot/ui/ProgressDialog</code>](#module_miot/ui/ProgressDialog)  
<a name="module_miot/ui/ProgressDialog..title"></a>

---

### miot/ui/ProgressDialog~title : <code>string</code>
标题

**Kind**: inner property of [<code>miot/ui/ProgressDialog</code>](#module_miot/ui/ProgressDialog)  
<a name="module_miot/ui/ProgressDialog..message"></a>

---

### miot/ui/ProgressDialog~message : <code>string</code>
副标题，内容

**Kind**: inner property of [<code>miot/ui/ProgressDialog</code>](#module_miot/ui/ProgressDialog)  
<a name="module_miot/ui/ProgressDialog..timeout"></a>

---

### miot/ui/ProgressDialog~timeout : <code>number</code>
超时自动隐藏，设置0或者不设置不会自动隐藏

**Kind**: inner property of [<code>miot/ui/ProgressDialog</code>](#module_miot/ui/ProgressDialog)  
<a name="module_miot/ui/ProgressDialog..max"></a>

---

### miot/ui/ProgressDialog~max : <code>number</code>
最大进度数值

**Kind**: inner property of [<code>miot/ui/ProgressDialog</code>](#module_miot/ui/ProgressDialog)  
<a name="module_miot/ui/ProgressDialog..progress"></a>

---

### miot/ui/ProgressDialog~progress : <code>number</code>
当前进度值

**Kind**: inner property of [<code>miot/ui/ProgressDialog</code>](#module_miot/ui/ProgressDialog)  
<a name="module_miot/ui/ProgressDialog..onDismiss"></a>

---

### miot/ui/ProgressDialog~onDismiss : <code>func</code>
消失回调

**Kind**: inner property of [<code>miot/ui/ProgressDialog</code>](#module_miot/ui/ProgressDialog)  
