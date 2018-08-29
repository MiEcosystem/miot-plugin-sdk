
import Utils from './utils'



export default class I18n{

    constructor(strings, languageGetter){
        this._proxy = {};
        this._lang = languageGetter;
        const types = Object.keys(strings);
        this._types = types;
        function typeinfo(obj){
            const t = {
                pxy:Utils.typeName(obj),
                isArr:Array.isArray(obj)
            }
            t.isObj = t.name === "object";
            t.isFunc = t.name === "function";
            return t;
        }
        function wrap(pxy,objects){ 
            const keys = {}
            types.forEach(type=>{
                const obj = objects[type];
                Object.keys(obj).forEach(key=>{
                    const _t = typeinfo(obj[key]) 
                    const _k = keys[key];
                    if(_k){
                        if(_t.isObj){
                            _k.isObj = true;
                        }
                        if(_t.isArr){
                            _k.isArr = true;
                        }

                    }else{
                        const def = {..._t, pxy:{}}
                        keys[key] = def
                        Object.defineProperty(pxy, key, {
                            enumerable: true, 
                            configurable: false,
                            get:()=>{
                                if(!def.wrapped){
                                    if(def.isObj){
                                        const vals = {};
                                        types.forEach(type=>{
                                            vals[type]=objects[type]||{}
                                        })
                                        wrap(def.pxy, vals);
                                    }
                                    def.wrapped = true;
                                }
                                if(def.isObj){
                                    //
                                }else{
                                    //format
                                }
                            },
                            set:()=>{}
                        });
                    }
                })
            })
        }
        wrap(this._proxy, strings);

    }

    get language(){
        return this._lang();
    }

    get strings(){
        return this._proxy;
    }

    

}