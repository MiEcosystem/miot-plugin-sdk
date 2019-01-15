<a name="module_miot/ui/MessageDialog"></a>

---

## miot/ui/MessageDialog
消息对话框

**Export**:   
**Mark**: andr done  

* [miot/ui/MessageDialog](#module_miot/ui/MessageDialog)
    * [~visible](#module_miot/ui/MessageDialog..visible) : <code>bool</code>
    * [~cancelable](#module_miot/ui/MessageDialog..cancelable) : <code>bool</code>
    * [~title](#module_miot/ui/MessageDialog..title) : <code>string</code>
    * [~message](#module_miot/ui/MessageDialog..message) : <code>string</code>
    * [~timeout](#module_miot/ui/MessageDialog..timeout) : <code>number</code>
    * [~cancel](#module_miot/ui/MessageDialog..cancel) : <code>string</code>
    * [~confirm](#module_miot/ui/MessageDialog..confirm) : <code>string</code>
    * [~onConfirm](#module_miot/ui/MessageDialog..onConfirm) : <code>func</code>
    * [~onCancel](#module_miot/ui/MessageDialog..onCancel) : <code>func</code>
    * [~onDismiss](#module_miot/ui/MessageDialog..onDismiss) : <code>func</code>

<a name="module_miot/ui/MessageDialog..visible"></a>

---

### miot/ui/MessageDialog~visible : <code>bool</code>
**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..cancelable"></a>

---

### miot/ui/MessageDialog~cancelable : <code>bool</code>
是否允许点击空白区域取消显示   
Android Only iOS无效

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..title"></a>

---

### miot/ui/MessageDialog~title : <code>string</code>
标题

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..message"></a>

---

### miot/ui/MessageDialog~message : <code>string</code>
副标题，内容

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..timeout"></a>

---

### miot/ui/MessageDialog~timeout : <code>number</code>
超时自动隐藏，设置0或者不设置不会自动隐藏

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..cancel"></a>

---

### miot/ui/MessageDialog~cancel : <code>string</code>
取消标题

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..confirm"></a>

---

### miot/ui/MessageDialog~confirm : <code>string</code>
确认标题

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..onConfirm"></a>

---

### miot/ui/MessageDialog~onConfirm : <code>func</code>
确认点击回调

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..onCancel"></a>

---

### miot/ui/MessageDialog~onCancel : <code>func</code>
取消点击回调

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
<a name="module_miot/ui/MessageDialog..onDismiss"></a>

---

### miot/ui/MessageDialog~onDismiss : <code>func</code>
对话框消失回调

**Kind**: inner property of [<code>miot/ui/MessageDialog</code>](#module_miot/ui/MessageDialog)  
