'use strict';
/**
 * 获取指定的模块
 */
class Dates {
    /**
     * 初始私有属性
     */
    constructor() {
        this.range = {
            "zh": {
                "时": "h",
                "分": "n",
                "秒": "s",

                "年": "y",
                "月": "m",
                "日": "d",

                "周": "w",
                "季": "q"
            },
        }

        this.day = {
            "zh": {
                0: '星期日', 1: '星期一', 2: '星期二', 3: '星期三', 4: '星期四', 5: '星期五', 6: '星期六'
            },
            "en": {
                0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday'
            }
        };

        this.month = {
            "zh": {
                0: '一月份',
                1: '二月份',
                2: '三月份',
                3: '四月份',
                4: '五月份',
                5: '六月份',
                6: '七月份',
                7: '八月份',
                8: '九月份',
                9: '十月份',
                10: '十一月',
                11: '十二月'
            },
            "en": {
                0: 'january',
                1: 'february',
                2: 'march',
                3: 'april',
                4: 'may',
                5: 'june',
                6: 'july',
                7: 'august',
                8: 'september',
                9: 'october',
                10: 'november',
                11: 'december'
            }
        }
    }

    /**
     * 以下是辅助的函数,逆转返回的结果
     */
    reversed(func, ...func_argv) {
        return !func.apply(this, [...func_argv]);
    }

    /**
     * 过去七日内
     * @param date_obj
     * @returns {boolean}
     */
    isLastWeek(date_obj) {
        return this.containDay(date_obj, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
    };

    /**
     * 过去一个月
     * @param date_obj
     * @returns {boolean}
     */
    isLastMonth(date_obj) {
        return this.containDay(date_obj, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
    };

    /**
     * 过去一年内
     * @param date_obj
     * @returns {boolean}
     */
    isLastYear(date_obj) {
        return this.containDay(date_obj, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
    };

    /**
     * 未来一个七日
     * @param date_obj
     * @returns {boolean}
     */
    isNextWeek(date_obj) {
        return this.containDay(date_obj, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
    };

    /**
     * 未来的一个月
     * @param date_obj
     * @returns {boolean}
     */
    isNextMonth(date_obj) {
        return this.containDay(date_obj, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
    };

    /**
     * 未来一年
     * @param date_obj
     * @returns {boolean}
     */
    isNextYear(date_obj) {
        return this.containDay(date_obj, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    };

    /**
     * 某天星期几
     * @param date_obj
     * @returns {*|string}
     */
    whichDay(date_obj, date_lang = "zh") {
        return this.day[date_lang][this.toDate(date_obj).getDay()];
    }

    /**
     * 某天第几月份
     * @param date_obj
     * @returns {*|string}
     */
    whichMonth(date_obj, date_lang = "zh") {
        return this.month[date_lang][this.toDate(date_obj).getMonth()];
    }


    /**
     * 某天是当年的第几天
     * @param date_obj
     */
    dayToYear(date_obj) {
        let _date_obj = this.toDate(date_obj);
        let _year = new Date(_date_obj.getFullYear(), 0, 1);
        //判断每周第一周的天数
        let day2year = _date_obj - _year;
        return Math.ceil((day2year) / (24 * 60 * 60 * 1000));
    }

    /**
     * 当周是当月的第几周
     * @param date_obj
     */
    weekToMonth(date_obj) {
        let _date_obj = this.toDate(date_obj);
        return this._toWeek(_date_obj, _date_obj.getMonth());
    }

    /**
     * 当周是当年的第几周,考虑的问题是每年的第一个星期是多少天
     * @param date_obj
     */
    weekToYear(date_obj) {
        let _date_obj = this.toDate(date_obj);
        return this._toWeek(_date_obj, 0);
    }

    _toWeek(date_obj, date_month) {
        let _year = new Date(date_obj.getFullYear(), date_month, 1);
        //判断每周第一周的天数
        let _year_num = 8 - _year.getDay() === 8 ? 1 : 8 - _year.getDay();
        _year = this.updateTime(_year, "d", _year_num);

        let day2year = date_obj - _year;
        let _day2year = Math.ceil((day2year) / (24 * 60 * 60 * 1000));
        //结果补回一周
        return Math.ceil(_day2year / 7) + 1;
    }

    /**
     * 是否包含日期在内
     * @param date_obj
     * @param start_date
     * @param end_date
     * @returns {boolean}
     */
    containDay(date_obj, start_date, end_date) {
        let [init,start,end] = this.toDate(date_obj, start_date, end_date);
        let _init = init.getTime();
        console.log(init + "" + start + "" + end);
        return _init >= start.getTime() && _init <= end.getTime();
    }

    /**
     * 是否是周末
     * @param date_obj
     * @returns {boolean}
     */
    isWeek(date_obj) {
        let _date = this.toDate(date_obj).getDay();
        return _date === 6 || _date === 0;
    }

    /**
     * 是否为今天
     * @param date_obj
     * @returns {boolean}
     */
    isToday(date_obj) {
        return this.toDate(date_obj).toDateString() === new Date().toDateString();
    }

    /**
     * 是否为昨天
     * @param date_obj
     * @returns {boolean}
     */
    isYesterday(date_obj) {
        let now = new Date();
        let _now = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return this.toDate(date_obj).toDateString() === _now;
    }

    /**
     * 是否为明天
     * @param date_obj
     * @returns {boolean}
     */
    isTomorrow(date_obj) {
        let now = new Date();
        let _now = new Date(now.setDate(now.getDate() + 1)).toDateString();
        return this.toDate(date_obj).toDateString() === _now;
    }

    /**
     * 因为是过去,所以精确到毫秒
     * @param date_obj
     * @returns {boolean}
     */
    isPast(date_obj) {
        return this.toDate(date_obj).getTime() < new Date().getTime();
    }

    /**
     * 判断过去,直接逆转isPast的结果
     * @param date_obj
     * @returns {*}
     */
    isFuture(date_obj) {
        return this.reversed(this.isPast, date_obj);
    }

    /**
     * 判断是否为Date的类型
     * @param date
     * @returns {boolean}
     */
    isDate(date) {
        try {
            if (!!date.getFullYear()) {
                return true;
            }
        } catch (e) {
            console.log(date + ':不是Date类型');
            return false;
        }
    }

    /**
     * 判断是否为闰年
     * @param date
     * @returns {boolean}
     */
    isLeapYear(date) {
        var _date = this.toDate(date)
        return (0 == _date.getFullYear() % 4 && ((_date.getFullYear() % 100 != 0) || (_date.getFullYear() % 400 == 0)));
    }

    /**
     * 计算两个时间点的差别,包括天时分秒天周年等,日期的格式为:YYYY-MM-dd
     * @param preday 第一个时间点
     * @param beday 第二个时间点
     */
    dateDiff(preday, beday) {
        let _preday = this.toDate(preday);
        let _beday = this.toDate(beday);
        let day2day = Math.floor(Math.abs((_preday - _beday) / 86400000));
        return day2day;
    }

    /**
     * 日期的计算
     * @param date 对象Date
     * @param date_flag 时间的标志
     * @param date_num 时间的数目
     */
    updateTime(date, date_flag, date_num) {
        let up_date = date;

        if (!this.isDate(up_date)) {
            console.log("date不是Date类型");
            return false;
        }

        switch (date_flag) {
            case 's':
            case '秒':
                return new Date(Date.parse(up_date) + (1000 * date_num));
                break;
            case 'n' :
            case '分' :
                return new Date(Date.parse(up_date) + (60000 * date_num));
                break;
            case 'h' :
            case '时' :
                return new Date(Date.parse(up_date) + (3600000 * date_num));
                break;
            case 'd' :
            case '天' :
                return new Date(Date.parse(up_date) + (86400000 * date_num));
                break;
            case 'w' :
            case '周' :
                return new Date(Date.parse(up_date) + ((86400000 * 7) * date_num));
                break;
            case 'q' :
            case '季' :
                return new Date(up_date.getFullYear(), (up_date.getMonth()) + date_num * 3, up_date.getDate(), up_date.getHours(), up_date.getMinutes(), up_date.getSeconds());
                break;
            case 'm' :
            case '月' :
                return new Date(up_date.getFullYear(), (up_date.getMonth()) + date_num, up_date.getDate(), up_date.getHours(), up_date.getMinutes(), up_date.getSeconds());
                break;
            case 'y' :
            case '年' :
                return new Date((up_date.getFullYear() + date_num), up_date.getMonth(), up_date.getDate(), up_date.getHours(), up_date.getMinutes(), up_date.getSeconds());
                break;
            default :
                return "The date_flag is wrong";
                break;
        }
    }

    /**
     * 转成YYYY-MM-DD HH:NN:SS标准的数据库格式,精确到秒
     * @param date
     * @returns {*}
     */
    toStr(date) {
        try {
            if (!this.isDate(date)) {
                console.log(date + ":不是Date类型,正在自动转成Date类型");
                date = this.toDate(date);
            }

            var [Y,M,D,h,m,s] = [date.getFullYear() + '-',
                date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
                '-' + date.getDate() + ' ',
                date.getHours() + ':',
                date.getMinutes() + ':',
                date.getSeconds() === 0 ? "00" : date.getSeconds()];

            return [Y, M, D, h, m, s].join("");
        } catch (e) {
            console.error("%s", e)
        }
    }

    /**
     * 转成YYYY-MM-DD HH:NN:SS标准的数据库格式,精确到毫秒
     * @param date
     * @returns {*}
     */
    toStrs(date) {
        try {
            if (!this.isDate(date)) {
                console.log(date + ":不是Date类型,正在自动转成Date类型");
                date = this.toDate(date);
            }

            var [Y,M,D,h,m,s,ms] = [date.getFullYear() + '-',
                date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
                '-' + date.getDate() + ' ',
                date.getHours() + ':',
                date.getMinutes() + ':',
                date.getSeconds() === 0 ? "00" : date.getSeconds(),
                ':' + date.getMilliseconds()
            ];

            return [Y, M, D, h, m, s, ms].join("");
        } catch (e) {
            console.error("%s", e)
        }
    }

    /**
     * 字符串,时间戳转成Date,精确到秒
     * @param date_str
     * @returns {Date}
     */
    toDate(...date_obj) {
        let date_arr = [];
        let date_temp = null;

        for (var date_key of [...date_obj]) {
            date_temp = date_key;
            if (typeof date_key === 'string') {
                date_temp = new Date(Date.parse(date_key));
            } else if (typeof date_key === 'number') {
                date_temp = new Date(date_key);
            }
            date_arr.push(date_temp);
        }
        if (date_arr.length == 1) {
            return date_arr[0];
        } else {
            return date_arr;
        }
    }

    /**
     * 字符串转成Date,精确到毫秒
     * @param date_str
     * @returns {Date}
     */
    toDates(date_obj) {
        let date_arr = [];
        let date_temp = null;

        for (let date_key of date_obj) {
            if (typeof date_key === 'string') {
                date_temp = new Date(new Date(date_key).getTime());
            } else if (typeof date_key === 'number') {
                date_temp = new Date(date_key);
            }
            date_arr.push(date_temp);
        }

        if (date_arr.length == 1) {
            return date_arr[0];
        } else {
            return date_arr;
        }
    }

    /**
     * 字符串,Date转成时间戳,精确到秒
     * @param date_str
     * @returns {number}
     */
    toNum(date_obj) {
        if (typeof date_obj === 'string') {
            return Date.parse(date_obj);
        } else if (this.isDate(date_obj)) {
            return date_obj.getTime();//特别的也是精确到毫秒哦
        }
        return date_obj;
    }

    /**
     * 字符串,Date转成时间戳,精确到毫秒
     * @param date_str
     * @returns {number}
     */
    toNums(date_obj) {
        if (typeof date_obj === 'string') {
            return new Date(date_obj).getTime();
        } else if (this.isDate(date_obj)) {
            return date_obj.getTime();
        }
        return date_obj;
    }
}

module.exports = new Dates();




