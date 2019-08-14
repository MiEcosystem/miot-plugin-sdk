<a name="module_miot/service/scene--module.exports.IScene+save"></a>

## .save(opt) ⇒ <code>Promise.&lt;IScene&gt;</code>
保存场景 /scene/edit

**Kind**: instance function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt | <code>json</code> | <code></code> | {authed:[...], name, identify, setting} 同上面的authed，name，identify，setting |

**Example**  
```js
scene.save({setting:{...}}).then(scene=>{...})
```
**Example**  
```js
scene.save().then(scene=>{...}).catch(err=>{...})
 
```
