
/*
 * 生成给定范围内的随机数[min, max)
 */
export function randomInt(min, max) {
    return Math.floor((Math.random() * (max - min)) + min)
}

function charsExchanger(from, to) {
    const avg = Math.floor(to.length / from.length)
    const add = to.length % from.length
    const chars = {};
    from.split("").forEach((c, i) => {
        if (i < add) {
            chars[c] = to.substr(i * avg + i, avg + 1)
        } else {
            chars[c] = to.substr(i * avg + add, avg)
        }
    });
    return txt => txt.split("").map(c => chars[c].charAt(randomInt(0, chars[c].length))).join("");
}

/**
 * 互相替换
 * @param {*} arr 
 * @param {*} from 
 * @param {*} to 
 */
export function swap(arr, from, to) {
    const val = arr[from];
    arr[from] = arr[to];
    arr[to] = val;
}

const stamp = {
    t: 0, i: 0, min: 5611212902196, r: 3,
    rand: ts => {
        const max = ts.length - 1;
        for (let i = 0, len = Math.floor(max / 3), len2 = len * 2; i < len; i++) {
            swap(ts, len + i, len2 + i)
            swap(ts, i, len2 - i)
        }
        for (let i = 0, len = Math.ceil(max / 2); i < len; i++) {
            swap(ts, i, max - i)
        }
        return ts;
    },
    exchange: charsExchanger("0123456789", "oczunqsgrtfldhapyejbimvkwx")
}
/**
 * 生成每一次都不同的32位数字令牌
 */
export function uniqueToken32(exchange = true) {
    const t = new Date().getTime();
    if (t != stamp.t) {
        stamp.ts = stamp.rand(((t + stamp.min) + "").split(""))
        stamp.t = t;
        stamp.i = randomInt(10000000, 99999999);
        stamp.r = stamp.i % 10;
        swap(stamp.ts, stamp.r, stamp.ts.length - 1 - stamp.r);

    }
    const s = ((((++stamp.i) % 100000000) + "") + stamp.r) + randomInt(10000000, 99999999);
    const from = Math.floor((s.length - stamp.ts.length) / 2);
    let ret = stamp.ts.map((c, i) => (i % 2) ? (c + s.charAt(from + i)) : (s.charAt(from + i) + c)).join("");
    ret = s.substr(0, from) + ret + s.substr(from + stamp.ts.length)
    ret = stamp.rand(ret.split("")).join("");
    while (ret.length < 32) {
        ret = randomInt(0, 10) + ret;
    }
    if (exchange) {
        exchange = (typeof (exchange) === "function") ? exchange : stamp.exchange;
        return exchange(ret)
    }
    return ret;
}

/**
 * 
 * @param {*} r 
 * @param {*} g 
 * @param {*} b 
 * @example
 * rgbToHex(255, 165, 1) -> 'ffa501'
 */
export function rgbToHex(r, g, b) {
    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
}

/**
 * 
 * @param {*} hex 
 * @example
 *   hexToRgb('#27ae60') -> 'rgb(39,174,96)'
 */
export function hexToRgb(hex) {
    return `rgb(${hex.slice(1).match(/.{2}/g).map(x => parseInt(x, 16)).join()})`;
}

/**
 * @export
 * @static
 * @function
 * @param str
 * @param args
 * @returns string
 * @description 格式化文本, 按照参数顺序号将文本中的{n}替换为args[n]
 * @example
 * Utils.format("a{1}b{1}//{2}", 100, "hello")
 * Utils.format("a{1}", {"none":0,"one":1,"more":v=>v>1000})
 * Utils.format("a{1}", "{1}")
 */

export function format(str, ...args) {
    if (!str) return "";
    const max = args.length;
    if (max < 1) return str;
    return str.replace(/[{][1-9][0-9]?[}]/g, w => {
        const idx = parseInt(w.substring(1, w.length - 1));
        return (idx < 1 || idx > max) ? w : args[idx - 1];
    })
}

/**
 * @export
 * @static
 * @function
 * @param {*} obj
 * @returns string
 * @description 获取对象的类型名称
 *   null、string、boolean、number、undefined、array、function、object、date、math
 */
export function typeName(obj) {
    const name = Object.prototype.toString.call(obj);
    return name.substr(8, name.length - 9).toLowerCase();
}

/**
 * 返回原生实现的类名, 全小写的
 * @export
 * @param {*} obj
 * @example
 *   className(new Set([1,2])) -> "set"
 */
export function className(obj) {
    return obj === undefined ? 'undefined'
        : obj === null ? 'null'
            : obj.constructor.name.toLowerCase();
}

/**
 * 
 * @param {string} url 
 * @example
 *   getUrlParameters('http://xiaomi.com/action?a=1&b=2') -> {a: '1', b: '2'}
 */
export function getUrlParameters(url) {
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce(
        (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
    );
}

/**
 * @export
 * @static
 * @function
 * @param {*} obj
 * @param {*} key
 * @param {*} val
 * @description 设置某一个属性为只读
 */
export function setReadonly(obj, key, val) {
    return Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get: () => val,
        set: () => { }
    });
}

/**
 * @static
 * @function
 * @param {*} obj
 * @param {*} keys
 */
export function setObjectReadonly(obj, ...keys) {
    if (!obj) return obj;
    (keys && keys.length > 0 ? keys : Object.keys(obj)).forEach(
        function (key) {
            setReadonly(obj, key, obj[key])
        }
    )
    return obj;
}

/**
 * @static
 * @param {*} obj 
 */
export function setObjectAsConstants(obj){
    if(!obj)return {};
    Object.keys(obj).forEach(key=>{
            setReadonly(obj, key, obj[key]||key)
        }
    )
    return obj;

}

/**
 * @export
 * @static
 * @function
 * @param {*} obj
 * @description 构建格式化文本集合
 * @example
const strs=formats({
	t1:"tttttttt",
	t2:["tt{1}"],
    t3:["tt{1},{2}", [0, "zero"], [1, "one"], [2, "two,{2}", 1], [v=>v>100, "more"]],
	t4:{
		t5:[()=>"akjasdkljflkasdjf"],
		t6:["yyy{1}"]
	}
})

strs.t4.t6(1000)

 */
export function formats(obj) {
    Object.keys(obj).forEach(function (key) {
        const arr = obj[key];
        if (!Array.isArray(arr)) {
            if (arr && typeName(arr) === "object") {
                formats(arr);
            }
            return;
        }
        switch (arr.length) {
            case 0:
                obj[key] = "";
                return;
            case 1:
                {
                    const val = arr[0];
                    setReadonly(obj, key,
                        (typeof (val) === "function") ? val
                            : (...args) => format(val, ...args)
                    )
                }
                return;
        }
        setReadonly(obj, key, (...args) => {
            let str = arr[0];
            if (args.length > 0) {
                for (let i = 1; i < arr.length; i++) {
                    const def = arr[i];
                    if (!Array.isArray(def) || def.length < 2) {
                        continue;
                    }
                    const chk = def[0];
                    if (typeof (chk) === "function") {
                        if (!chk(...args)) {
                            continue;
                        }
                    } else if (args[0] != chk) {
                        continue;
                    }
                    //found
                    str = def[1];
                    if (def.length < 3 || !def[2]) {
                        return str;
                    }
                }
            }
            //format str
            return format(str, ...args);
        })
    });
    return obj;
}

/**
 * 邮箱的正则表达式
 * @const
 */
export const REGEXP_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    swap,
    randomInt,
    uniqueToken32,
    format,
    formats,
    typeName,
    className,
    setReadonly,
    setObjectReadonly,
    setObjectAsConstants,
    hexToRgb,
    rgbToHex,
    getUrlParameters,
    REGEXP_EMAIL
}
