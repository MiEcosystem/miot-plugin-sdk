<a name="module_miot/ui/SingleChoseDialog"></a>

---

## miot/ui/SingleChoseDialog
单选对话框

**Export**:   
**Mark**: andr done  

* [miot/ui/SingleChoseDialog](#module_miot/ui/SingleChoseDialog)
    * [~visible](#module_miot/ui/SingleChoseDialog..visible) : <code>bool</code>
    * [~cancelable](#module_miot/ui/SingleChoseDialog..cancelable) : <code>bool</code>
    * [~title](#module_miot/ui/SingleChoseDialog..title) : <code>string</code>
    * [~timeout](#module_miot/ui/SingleChoseDialog..timeout) : <code>number</code>
    * [~dataSource](#module_miot/ui/SingleChoseDialog..dataSource) : <code>array.&lt;string&gt;</code>
    * [~check](#module_miot/ui/SingleChoseDialog..check) : <code>number</code>
    * [~cancel](#module_miot/ui/SingleChoseDialog..cancel) : <code>string</code>
    * [~confirm](#module_miot/ui/SingleChoseDialog..confirm) : <code>string</code>
    * [~onConfirm](#module_miot/ui/SingleChoseDialog..onConfirm) : <code>func</code>
    * [~onCancel](#module_miot/ui/SingleChoseDialog..onCancel) : <code>func</code>
    * [~onCheck](#module_miot/ui/SingleChoseDialog..onCheck) : <code>func</code>
    * [~onDismiss](#module_miot/ui/SingleChoseDialog..onDismiss) : <code>func</code>

<a name="module_miot/ui/SingleChoseDialog..visible"></a>

---

### miot/ui/SingleChoseDialog~visible : <code>bool</code>
是否可见

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..cancelable"></a>

---

### miot/ui/SingleChoseDialog~cancelable : <code>bool</code>
是否允许点击空白区域取消显示   
Android Only iOS无效

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..title"></a>

---

### miot/ui/SingleChoseDialog~title : <code>string</code>
**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..timeout"></a>

---

### miot/ui/SingleChoseDialog~timeout : <code>number</code>
超时自动隐藏，设置0或者不设置不会自动隐藏

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..dataSource"></a>

---

### miot/ui/SingleChoseDialog~dataSource : <code>array.&lt;string&gt;</code>
数据源列表

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
**Example**  
```js
<SingleChoseDialog 
dataSource={['message0', 'message1', 'message2', 'message3', 'message4', 'message5', 'message6']}
...
/>
```
<a name="module_miot/ui/SingleChoseDialog..check"></a>

---

### miot/ui/SingleChoseDialog~check : <code>number</code>
选中第几个数据的 index

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..cancel"></a>

---

### miot/ui/SingleChoseDialog~cancel : <code>string</code>
取消标题

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..confirm"></a>

---

### miot/ui/SingleChoseDialog~confirm : <code>string</code>
确认标题

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..onConfirm"></a>

---

### miot/ui/SingleChoseDialog~onConfirm : <code>func</code>
确认点击回调

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..onCancel"></a>

---

### miot/ui/SingleChoseDialog~onCancel : <code>func</code>
取消点击回调

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..onCheck"></a>

---

### miot/ui/SingleChoseDialog~onCheck : <code>func</code>
选中状态变更回调

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
<a name="module_miot/ui/SingleChoseDialog..onDismiss"></a>

---

### miot/ui/SingleChoseDialog~onDismiss : <code>func</code>
弹窗消失回调

**Kind**: inner property of [<code>miot/ui/SingleChoseDialog</code>](#module_miot/ui/SingleChoseDialog)  
