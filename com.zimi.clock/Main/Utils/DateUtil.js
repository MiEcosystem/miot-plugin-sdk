var LocalizedStrings = require('../CommonComponents/MHLocalizableString.js').string;

// 接口定义的circle options
const CIRCLE_ONCE = "once";
const CIRCLE_EVERYDAY = "everyday";
const CIRCLE_MONTOFRI = "montofri";
const CIRCLE_WEEKEND = "weekend";
const CIRCLE_WORKDAY = "workday";
const CIRCLE_HOLIDAY = "holiday";
const CIRCLE_EVERYWEEK = "everyweek";
const CIRCLE_TWOWEEK = "twoweek";
const CIRCLE_MONTHLY = "monthly";
const CIRCLE_YEARLY = "yearly";

const circleOptions = [
    CIRCLE_ONCE,
    CIRCLE_EVERYDAY,
    CIRCLE_MONTOFRI,
    CIRCLE_WEEKEND,
    CIRCLE_WORKDAY,
    CIRCLE_HOLIDAY,
    CIRCLE_EVERYWEEK,
    CIRCLE_TWOWEEK,
    CIRCLE_MONTHLY,
    CIRCLE_YEARLY,
];

const circleMap = {
    "once": LocalizedStrings.once,
    "everyday": LocalizedStrings.everyday,
    "montofri": LocalizedStrings.montofri,
    "weekend": LocalizedStrings.weekend,
    "workday": LocalizedStrings.workday,
    "holiday": LocalizedStrings.holiday,
    "everyweek": LocalizedStrings.everyweek,
    "twoweek": LocalizedStrings.twoweek,
    "monthly": LocalizedStrings.monthly,
    "yearly": LocalizedStrings.yearly,
}
import MHGlobalData from '../CommonComponents/MHGlobalData';

var workdays, holidays;

module.exports = {
    // 时钟补〇
    _fillZeros(v) {
        return v < 10 ? "0" + v : "" + v;
    },

    /* 
    in: Date
    out: Object {
        "aorp": String("上午"),
        "time": String("1:20"),
    }
    */
    // _date2timeObjWithZero(date) {
    //     var res = {};
    //     if (Object.prototype.toString.call(date) === "[object Date]") {
    //         var timeString = date.toLocaleTimeString();
    //         res["aorp"] = timeString.slice(0, 2);
    //         var time = timeString.slice(2, timeString.length - 3);
    //         if (time.length === 4) {
    //             time = "0" + time;
    //         }
    //         res["time"] = time;
    //         return res;
    //     }
    //     return date;
    // },

    /* 
        in: String 2018-06-07T09:00:42-0400 ,flag :是否补〇
        out: Object {
            "aorp": String("上午"),
            "time": String("01:20"),
        }
        */
    _date2timeObjWithZero(datetime, flag) {
        // flag : true 补0
        var res = {};
        if (Object.prototype.toString.call(datetime) === "[object String]") {
            var start = datetime.indexOf("T");
            var end = datetime.lastIndexOf(":");
            var time = datetime.slice(start + 1, end);  // 09:00   18:00
            var hour = Number(time.split(':')[0]);
            var min = time.split(':')[1];
            if (hour < 13) {
                res["aorp"] = LocalizedStrings.am;
                res["time"] = (flag ? this._fillZeros(hour) : hour) + ":" + min;
            } else {
                res["aorp"] = LocalizedStrings.pm;
                res["time"] = (flag ? this._fillZeros(hour - 12) : hour - 12) + ":" + min;
            }
            return res;
        }
        return datetime;
    },

    // _date2timeObjWithoutZero(date) {
    //     var res = {};
    //     if (Object.prototype.toString.call(date) === "[object Date]") {
    //         var timeString = date.toLocaleTimeString();
    //         res["aorp"] = timeString.slice(0, 2);
    //         res["time"] = timeString.slice(2, timeString.length - 3);
    //         return res;
    //     }
    //     return date;
    // },

    /* 
    in: Date
    out: String(上午11：22)
    */
    _date2localeTimeStringWithoutSec(date, flag) {
        // flag : true 24H
        // flag : false 12H
        if (Object.prototype.toString.call(date) === "[object Date]") {
            if (flag) {
                var time = date.toTimeString();
                return time.slice(0, 5); // "22:26:45 GMT+0800 (中国标准时间)"
            } else {
                var time = date.toLocaleTimeString();
                return time.slice(0, time.length - 3); // "下午10:26:45"
            }
        }
        return date;
    },

    /*
               一～六,日
    weekIndex: 0 - 5,6
    CronDay:   1 - 6,0
    */
    _weekIndex2cronDay(index) {
        if (index === 6) {
            return 0;
        } else {
            return index + 1;
        }
    },

    /*
    新建或者更新（闹钟/提醒）时，根据设置的参数计算发送请求中的circl_extra字段
    星期按照 0-6 格式发送
    in: {
        date: Date,
        circle: 
        circleExtra, Array,
    }
    out: String("0 0 8 ? * 2,3,4 *")
    // <秒 分钟 小时 日期 月份 星期 年>
    */
    _setCircleExtraString(date, circle, circleExtra) {
        // 更新提醒或者闹钟的时候，如果没有修改circle_extra字段，原样发送。
        // 不应该按照原样返回,如果时间发生了变化，需要改变前面， "31 46 13 * * 4/14 *"   =》   “21 10 20 * * 4/14 *”

        var res = "";
        res += (date.getSeconds() + " "); // 秒
        res += (date.getMinutes() + " "); // 分钟
        res += (date.getHours() + " "); // 小时

        if (Object.prototype.toString.call(circleExtra) === "[object String]") {
            res += (circleExtra.split(" ")[3] + " " + circleExtra.split(" ")[4] + " " + circleExtra.split(" ")[5] + " " + circleExtra.split(" ")[6]);
            return res;
        }

        if (Object.prototype.toString.call(circleExtra) === "[object Array]") {
            res += "? * ";
            // res += (circleExtra.reduce((res, item) => res + "," + this._weekIndex2cronDay(item)) + " *");
            res += (circleExtra.reduce((res, item) => res + "," + item) + " *");
        } else {
            switch (circle) {
                case CIRCLE_EVERYWEEK:
                    res += ("? * " + date.getDay() + " *");
                    break;
                case CIRCLE_TWOWEEK:
                    res += ("? * " + date.getDay() + "/14 *");
                    break;
                case CIRCLE_MONTHLY:
                    res += (date.getDate() + " * ? *");
                    break;
                case CIRCLE_YEARLY:
                    res += (date.getDate() + " " + this._getMonth(date) + " ? *");
                    break;
            }
        }
        return res;
    },

    _compareNow(date, now, offset) {
        if (date < now) {
            date.setDate(now.getDate() + offset);
        }
        // return date.valueOf();
        return date;
    },

    _isWeekend(date) {
        return this._getDay(date) > 5;
    },

    _getDay(date) {
        return date.getDay() ? date.getDay() : 7;
    },

    _getMonth(date) {
        return date.getMonth() + 1;
    },

    // 格式化成 20180604
    _formatDate(date) {
        if (Object.prototype.toString.call(date) === "[object Date]") {
            var arr = date.toLocaleDateString().split("/");
            for (let i = 1; i < 3; i++) {
                arr[i] = ("0" + arr[i]).slice(-2);
            }
            return Number(arr.join(""));
        }
    },

    // 判断date是不是法定工作日
    // holidays是周一到周五的放假日
    // workdays是周末的上班日
    _isWorkday(date) {
        workdays = MHGlobalData.workday.workdays;
        holidays = MHGlobalData.workday.holidays;
        if (this._isWeekend(date)) {
            return workdays.includes(this._formatDate(date));
        } else {
            return !holidays.includes(this._formatDate(date));
        }
    },

    // 新建闹钟/提醒的时候，计算响铃时间
    _getEventTime(date, circle, circleExtra, fakeNow) {
        var now = fakeNow ? fakeNow : new Date();
        if (Object.prototype.toString.call(circleExtra) === "[object Array]") {
            var circleExtra = circleExtra.map(i => i ? i : 7);
            circleExtra.sort();
            circleExtra = circleExtra.concat(Array.from(circleExtra, item => item + 7));
            var day = this._getDay(now);
            var offset, index;
            if (date < now) {
                index = circleExtra.findIndex(item => item > day);
                offset = circleExtra[index] - day;
            } else {
                index = circleExtra.findIndex(item => item >= day);
                offset = circleExtra[index] - day;
            }
            date.setDate(now.getDate() + offset);
        } else {
            switch (circle) {
                case CIRCLE_ONCE:
                case CIRCLE_EVERYDAY:
                    date = this._compareNow(date, now, 1);
                    break;
                case CIRCLE_MONTOFRI:
                    if (this._isWeekend(now)) {
                        date.setDate(now.getDate() + 8 - this._getDay(now));
                    } else {
                        date = this._compareNow(date, now, 1);
                    }
                    break;
                case CIRCLE_WEEKEND:
                    if (this._isWeekend(now)) {
                        if (now.getDay() === 6) {
                            date = this._compareNow(date, now, 1);
                        } else {
                            date = this._compareNow(date, now, 6);
                        }
                    } else {
                        date.setDate(now.getDate() + 6 - this._getDay(now));
                    }
                    break;
                case CIRCLE_WORKDAY:
                    // 如果设置的时间今天已经过了，就从明天开始遍历
                    if (date < now) {
                        date.setDate(date.getDate() + 1);
                    }
                    // 如果不是工作日，往后加一天
                    while (!this._isWorkday(date)) {
                        date.setDate(date.getDate() + 1);
                    }
                    break;
                case CIRCLE_HOLIDAY:
                    if (date < now) {
                        date.setDate(date.getDate() + 1);
                    }
                    while (this._isWorkday(date)) {
                        date.setDate(date.getDate() + 1);
                    }
                    break;
                case CIRCLE_EVERYWEEK:
                    date = this._compareNow(date, now, 7);
                    break;
                case CIRCLE_TWOWEEK:
                    date = this._compareNow(date, now, 14);
                    break;
                case CIRCLE_MONTHLY:
                    if (date < now) {
                        date.setMonth(now.getMonth() + 1);
                    }
                    break;
                case CIRCLE_YEARLY:
                    if (date < now) {
                        date.setFullYear(now.getFullYear() + 1);
                    }
                    break;
            }
        }
        return date.getTime();
    },

    _mergeDateTime(date, time) {
        let dateStr = date.toISOString();
        let timeStr = time.toISOString();
        return new Date(dateStr.split('T')[0] + "T" + timeStr.split('T')[1]).getTime();
    },

    /* 
    in: {
        date: Date
        circle: String
        circleExtra: Array
        circleExtraFlag: Boolean
    }
    out: {
        circle_extra: String
        event_timestamp: Float
    }
    */
    _circle2requestData(date, circle, circleExtra, workday) {
        if (workday) {
            console.log(workday);
            workdays = workday.workdays;
            holidays = workday.holidays;
        }
        var addDate = new Date(date);
        // 所有时间都校准到今天
        // 修改闹钟和提醒时重新计算下次响铃时间
        // addDate = this._calibrateChosenTime(addDate);
        var res = {};
        if (circleExtra || circleOptions.indexOf(circle) > 5) {
            res["circle_extra"] = this._setCircleExtraString(addDate, circle, circleExtra);
        }
        res["datetime"] = this._getEventTime(addDate, circle, circleExtra);
        return res;
    },

    // "0 14 23 30 5 * 2018"
    // 将下次响铃时间设置为禁用时间
    _calcDisableTime(date) {
        // 月份 1 - 12
        return "0 " + date.getMinutes() + " " + date.getHours() + " " + date.getDate() + " " + (date.getMonth() + 1) + " * " + date.getFullYear();
    },

    // 判断cronStr和解析的时间单位是否一致
    // ? * - / ,
    _isContain(num, cronStr) {
        if (cronStr.includes(",")) {
            if (cronStr.includes(num + "")) {
                return true;
            }
        }
        if (cronStr.includes("/")) {
            // 3 "1/2"       2 "2/2"
            if (num % cronStr.split("/")[1] === Number(cronStr.split("/")[0]) || num === Number(cronStr.split("/")[0])) {
                return true;
            }
        }
        if (cronStr.includes("-")) {
            if (num <= cronStr.split("-")[1] && num >= cronStr.split("-")[0]) {
                return true;
            }
        }
        if (cronStr.includes("*") || cronStr.includes("?")) {
            return true;
        }
        return num == cronStr;
    },

    // 判断下次响铃时间是否被禁用
    _isDisable(eventTime, disableTime) {
        var disableTimeArr = disableTime.split(" ");
        if (!this._isContain(eventTime.getFullYear(), disableTimeArr[6])) {
            return false;
        }
        if (!this._isContain(eventTime.getMonth() + 1, disableTimeArr[4])) {
            return false;
        }
        if (!this._isContain(eventTime.getDate(), disableTimeArr[3])) {
            return false;
        }
        // if (eventTime.getHours() != disableTimeArr[2]) {
        //     return false;
        // }
        // if (eventTime.getMinutes() != disableTimeArr[1]) {
        //     return false;
        // }
        return true;
    },

    /*
        eventTime: Date
        disableTime: String(Cron)
        circle: String
        circleExtra: string/undefined
    */
    // 重复闹钟可能在某段时间被暂时关闭，根据频率计算下次响铃时间
    _calcEventTime(date, disableTime, circle, circleExtra) {
        var eventTime = new Date(date); // deep copy
        var circleExtra = this._circleExtra2Array(circleExtra)
        // 如果没有设置disableTime或者这次响铃时间并没有disable
        if (!disableTime || !this._isDisable(eventTime, disableTime)) {
            return eventTime;
        }
        // 如果这次被禁用了，以eventTime之后的时刻作为设置该闹钟的fakeNow，计算出新的eventTime
        while (this._isDisable(eventTime, disableTime)) {
            let fakeNow = new Date(eventTime.getTime() + 10000); // 10秒
            // 这里写的什么乱七八糟的，改变了eventTime，太危险了，而且不好调试
            // 谨记！！！
            eventTime = new Date(this._getEventTime(eventTime, circle, circleExtra, fakeNow));
        }
        return eventTime;
    },

    _calcLeftTime(date) {
        const S = 1000;
        const M = 60 * S;
        const H = 60 * M;
        const D = 24 * H;
        var offset = date - new Date();
        if (offset < 0) { return offset; }
        var d = Math.floor(offset / D);
        offset -= d * D;
        var h = Math.floor(offset / H);
        offset -= h * H;
        var m = Math.round(offset / M);
        if (m === 60) {
            h++;
            m = 0;
        }
        if (h === 24) {
            d++;
            h = 0;
        }
        // 不足一分钟，显示一分钟
        if (d + h + m === 0) {
            m = 1;
        }

        // 为了国际化翻译，需要利用占位符和拼接字符串
        var dStr = "";
        var hStr = "";
        var mStr = "";
        if (d) {
            dStr = d === 1 ?
                LocalizedStrings.formatString(LocalizedStrings.day, d) :
                LocalizedStrings.formatString(LocalizedStrings.days, d);
        }
        if (h) {
            hStr = h === 1 ?
                LocalizedStrings.formatString(LocalizedStrings.hour, h) :
                LocalizedStrings.formatString(LocalizedStrings.hours, h);
        }
        if (m) {
            mStr = m === 1 ?
                LocalizedStrings.formatString(LocalizedStrings.minute, m) :
                LocalizedStrings.formatString(LocalizedStrings.minutes, m);
        }
        return LocalizedStrings.formatString(LocalizedStrings.bell, dStr, hStr, mStr);
    },

    _cronDay2weekIndex(day) {
        return day ? day - 1 : 6;
    },

    _formatWeekCircle(arr) {
        // var res = "每周";
        var res = "";
        arr.forEach((item) => {
            res += (this._arab2zh(item) + ",");
        });
        return res.slice(0, res.length - 1);
    },

    // _circleString2Array() {

    // },

    _circleExtra2String(reg, head, date, circleExtra) {
        var res = "";
        if (circleExtra && Object.prototype.toString.call(circleExtra) === "[object String]") {
            var group = reg.exec(circleExtra);
            if (group) {
                res = head + " " + this._formatWeekCircle(group[1].split(","));
            } else {
                res = LocalizedStrings.custom;
            }
        } else {
            // res = head + " " + this._arab2zh(this._getDay(date) - 1);
            res = head + " " + this._arab2zh(date.getDay());
        }
        return res;
    },

    /*
    根据设备返回的数据计算出新建时设置的circleExtra，用于更新闹钟和提醒
    */
    // <秒 分钟 小时 日期 月份 星期 年>
    _circleExtra2Array(circleExtra) {
        var REG_EVERYWEEK = /\d+ \d+ \d+ [\?,\*] [\?,\*] ((\d,?)+) [\?,\*]/;
        if (circleExtra && Object.prototype.toString.call(circleExtra) === "[object String]") {
            var group = REG_EVERYWEEK.exec(circleExtra);
            if (group) {
                circleExtra = group[1].split(",").map(i => Number(i));
            }
        }
        return circleExtra;
    },

    /**
     * 根据开始日期和重复频率格式化需要显示的频率文本
     * @param  {date}} startDate - 开始日期
     * @param  {string} circle - 重复频率
     * @returns {string} 格式化后的频率文本
     */
    _getFormattedCircleText(startDate, circle) {
        switch (circle) {
            case CIRCLE_EVERYWEEK:
                return circleMap[CIRCLE_EVERYWEEK] + " " + this._arab2zh(startDate.getDay());
            case CIRCLE_TWOWEEK:
                return circleMap[CIRCLE_TWOWEEK] + " " + this._arab2zh(startDate.getDay());
            case CIRCLE_MONTHLY:
                return circleMap[CIRCLE_MONTHLY] + startDate.getDate() + LocalizedStrings.date;
            case CIRCLE_YEARLY:
                return circleMap[CIRCLE_YEARLY] +
                    LocalizedStrings.formatString(LocalizedStrings.monthDate,
                        this._getMonth(startDate),
                        startDate.getDate());
            default:
                return circleMap[circle];
        }
    },

    /*
    更新闹钟和提醒的时候用，将选择的时间校准为今天的时刻
    */
    _calibrateChosenTime(chosenDate, chosenTime) {
        if (Object.prototype.toString.call(chosenDate) === "[object Date]" &&
            Object.prototype.toString.call(chosenTime) === "[object Date]") {
            chosenTime.setFullYear(chosenDate.getFullYear());
            chosenTime.setMonth(chosenDate.getMonth());
            chosenTime.setDate(chosenDate.getDate());
        }
        return chosenTime;
    },

    /*
    根据设备返回的数据计算显示的频率文本
    */
    // <秒 分钟 小时 日期 月份 星期 年>
    _calcCircle(date, circle, circleExtra) {
        var res = "";
        var REG_EVERYWEEK = /\d+ \d+ \d+ [\?,\*] [\?,\*] ((\d,?)+) [\?,\*]/;
        var REG_TWOWEEK = /\d+ \d+ \d+ [\?,\*] [\?,\*] ((\d,?)+)\/14 [\?,\*]/;
        var REG_MONTHLY = /\d+ \d+ \d+ ((\d,?)+) [\?,\*] [\?,\*] [\?,\*]/;
        var REG_YEARLY = /\d+ \d+ \d+ ((\d,?)+) ((\d,?)+) [\?,\*] [\?,\*]/;

        if (circleOptions.indexOf(circle) < 6) {
            res = circleMap[circle];
        } else {
            switch (circle) {
                case CIRCLE_EVERYWEEK:
                    res = this._circleExtra2String(REG_EVERYWEEK, LocalizedStrings.everyweek, date, circleExtra);
                    break;
                case CIRCLE_TWOWEEK:
                    res = this._circleExtra2String(REG_TWOWEEK, LocalizedStrings.twoweek, date, circleExtra);
                    break;
                case CIRCLE_MONTHLY:
                    res = LocalizedStrings.monthly;
                    if (circleExtra && Object.prototype.toString.call(circleExtra) === "[object String]") {
                        var group = REG_MONTHLY.exec(circleExtra);
                        if (group) {
                            res += (group[1] + LocalizedStrings.date);
                        } else {
                            res = LocalizedStrings.custom;
                        }
                    } else {
                        res += (date.getDate() + LocalizedStrings.date);
                    }
                    break;
                case CIRCLE_YEARLY:
                    res = LocalizedStrings.yearly;
                    if (circleExtra && Object.prototype.toString.call(circleExtra) === "[object String]") {
                        var group = REG_YEARLY.exec(circleExtra);
                        if (group) {
                            res += LocalizedStrings.formatString(LocalizedStrings.monthDate, group[3], group[1]);
                        } else {
                            res = LocalizedStrings.custom;
                        }
                    } else {
                        res += LocalizedStrings.formatString(LocalizedStrings.monthDate, this._getMonth(date), date.getDate());
                    }
                    break;
            }
        }
        return res;
    },

    /*
    输入格式
    {
      "id": "1",
      "type": 0,
      "circle": "once",
      "datetime": "2018-05-11T11:03:22+0800",
      "status": "off",
      "circle_extra": null,
      "event": null,
      "reminder": null,
      "reminder_audio": "/usr/share/sounds/alarm.mp3",
      "volume": 100,
      "ringtone": "/usr/share/sounds/alarm.mp3",
      "update_datetime": "2017-11-02T16:33:20+0800",
      "disable_datetime": null
    }
    输出格式
    {
    
    }
    */
    _formatClockData(obj) {
        var timeObj = this._date2timeObjWithZero(obj.d, true);
        var leftTime = obj.ot ?
            this._calcLeftTime(this._calcEventTime(obj.date, obj.ot, obj.c, obj.ec)) :
            this._calcLeftTime(obj.date);
        return {
            id: obj.i,
            date: obj.date,
            delete: false,
            active: obj.s === "on" ? true : false,
            time: timeObj.time,
            aorp: timeObj.aorp,
            circle: this._calcCircle(obj.date, obj.c, obj.ec),
            leftTime: obj.s === "on" ? leftTime : LocalizedStrings.unopened,
        };
    },


    _formatReminderDate(date) {
        var today = new Date();
        if (this._date2dateString(date) === this._date2dateString(today)) {
            return LocalizedStrings.today;
        }
        today.setDate(today.getDate() + 1);
        if (this._date2dateString(date) === this._date2dateString(today)) {
            return LocalizedStrings.tomorrow;
        }
        return this._date2dateString(date);
    },

    // "2018-06-07T09:00:42-0400"
    // "2018-06-07T09:00:42+0800"
    _local2UTC(datetime) {
        if (Object.prototype.toString.call(datetime) === "[object Date]") {
            return datetime.getTime();
        }
        if (Object.prototype.toString.call(datetime) === "[object String]") {
            var dateString = datetime.slice(0, datetime.length - 5); // “2018-06-07T09:00:42”
            var timezoneString = datetime.slice(-5); // “+0800”
            var date = (new Date(dateString)).getTime(); // 以带时区时间生成UTC时间
            var offset = Number(timezoneString) * 36000; // 计算时差 8 * 60 * 60 * 1000 = 800 * 36000
            return date - offset;
        }
        if (Object.prototype.toString.call(datetime) === "[object Number]") {
            return datetime;
        }
    },

    _formatReminderDetail(obj) {
        var timeObj = this._date2timeObjWithZero(obj.d, false);
        var time = "";
        if (timeObj.aorp === LocalizedStrings.am) {
            time = LocalizedStrings.formatString(LocalizedStrings.amWithTime, timeObj.time);
        } else {
            time = LocalizedStrings.formatString(LocalizedStrings.pmWithTime, timeObj.time);
        }
        return this._formatReminderDate(obj.date) + " " + time + " " + (obj.n || obj.r || "");
    },

    _formatReminderData(obj) {
        var timeObj = this._date2timeObjWithZero(obj.d, false);
        var time = "";
        if (timeObj.aorp === LocalizedStrings.am) {
            time = LocalizedStrings.formatString(LocalizedStrings.amWithTime, timeObj.time);
        } else {
            time = LocalizedStrings.formatString(LocalizedStrings.pmWithTime, timeObj.time);
        }
        return {
            id: obj.i,
            date: obj.date,
            delete: false,
            tag: obj.n || obj.r || "",
            status: obj.s, // 新增一种状态，通过状态控制权限
            time: time,
            circle: this._calcCircle(obj.date, obj.c, obj.ec),
        };
    },

    /*
    in: Date
    out: String("2018/5/15")
    */
    _date2dateString(date) {
        if (Object.prototype.toString.call(date) === "[object Date]") {
            return date.toLocaleDateString();
        }
        return date;
    },

    // 星期几，阿拉伯数字转中文
    _arab2zh(i) {
        return [
            LocalizedStrings.sundayW,
            LocalizedStrings.mondayW,
            LocalizedStrings.tuesdayW,
            LocalizedStrings.wednesdayW,
            LocalizedStrings.thursdayW,
            LocalizedStrings.fridayW,
            LocalizedStrings.saturdayW,][Number(i)];
    },
}