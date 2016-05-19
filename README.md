[TOC]

# X-date 初始文档
开发比较仓促,还有很多的方法还没能够完善;环境要node 6 以上才能用哦;
介绍如下:

# 测试实例

用的是mocha + chai 进行测试的:

涉及的方法有:
##	`` isLastWeek``、``isLastMonth``、``isLastYear ``
代表意思都写好了,所有的参数自动转换类型,的可以是字符串、时间戳、还有Date的类型;


```
    describe('过去近一周,一月,一年', function () {

        it('isLastWeek', function (){
            assert.equal(false,dates.isLastWeek("2016/01/01 17:39:38:176"));
            assert.equal(false,dates.isLastWeek("2016/07/01 17:39:38:176"));
        });

        it('isLastMonth', function (){
            assert.equal(false,dates.isLastMonth("2016/04/04 17:39:38:176"));
            assert.equal(false,dates.isLastMonth("2016/07/01 17:39:38:176"));
        });

        it('isLastYear', function (){
            assert.equal(true,dates.isLastYear("2015/01/01 17:39:38:176"));
            assert.equal(false,dates.isLastYear("2016/07/01 17:39:38:176"));
        });

    });
```

涉及的方法有:
##	`` isNextWeek``、``isNextMonth``、``isNextYear ``


```
    describe('未来近一周,一月,一年', function () {

        it('isNextWeek', function (){
            assert.equal(true,dates.isNextWeek("2016/05/22 17:39:38:176"));
            assert.equal(false,dates.isNextWeek("2016/05/18 17:39:38:176"));
        });

        it('isNextMonth', function (){
            assert.equal(true,dates.isNextMonth("2016/06/04 17:39:38:176"));
            assert.equal(false,dates.isNextMonth("2016/07/01 17:39:38:176"));
        });

        it('isNextYear', function (){
            assert.equal(true,dates.isNextYear("2015/01/01 17:39:38:176"));
            assert.equal(false,dates.isNextYear("2016/07/01 17:39:38:176"));
        });
    });
```


涉及的方法有:
##	`` whichDay``、``whichMonth``


```
    describe('哪天', function () {

        it('whichDay', function (){
            assert.equal("星期日",dates.whichDay("2016/05/22 17:39:38:176"));
            assert.equal("星期三",dates.whichDay("2016/05/18 17:39:38:176"));
        });

        it('whichMonth', function (){
            assert.equal("六月份",dates.whichMonth("2016/06/04 17:39:38:176"));
            assert.equal("七月份",dates.whichMonth("2016/07/01 17:39:38:176"));
        });

    });
```


涉及的方法有:
##	`` whichDay``、``whichMonth``


```
    describe('哪天', function () {

        it('whichDay', function (){
            assert.equal("星期日",dates.whichDay("2016/05/22 17:39:38:176"));
            assert.equal("星期三",dates.whichDay("2016/05/18 17:39:38:176"));
        });

        it('whichMonth', function (){
            assert.equal("六月份",dates.whichMonth("2016/06/04 17:39:38:176"));
            assert.equal("七月份",dates.whichMonth("2016/07/01 17:39:38:176"));
        });

    });
```


涉及的方法有:
##	`` dayToYear``、``weekToMonth``、``weekToYear``


```
    describe('在一年中的第几天,第几周,在当前月的第几周', function () {

        it('dayToYear', function (){
            assert.equal("143",dates.dayToYear("2016/05/22 17:39:38:176"));
        });

        it('weekToMonth', function (){
            assert.equal("1",dates.weekToMonth("2016/06/04 17:39:38:176"));
            assert.equal("1",dates.weekToMonth("2016/07/01 17:39:38:176"));
        });

        it('weekToYear', function (){
            assert.equal("23",dates.weekToYear("2016/06/04 17:39:38:176"));
            assert.equal("27",dates.weekToYear("2016/07/01 17:39:38:176"));
        });

    });
```


涉及的方法有:
##	`` isWeek``、``isToday``、``isYesterday``、``isTomorrow``、``isFuture``、``isPast``、``isLeapYear``


```
      describe('是否周末,今天,昨天,明天,过去,未来,闰年', function () {

        it('is', function (){
            assert.equal(true,dates.isWeek("2016/05/22 17:39:38:176"));
            assert.equal(false,dates.isToday("2016/05/22 17:39:38:176"));
            assert.equal(false,dates.isYesterday("2016/05/22 17:39:38:176"));
            assert.equal(false,dates.isTomorrow("2016/05/22 17:39:38:176"));
            assert.equal(true,dates.isFuture("2016/05/22 17:39:38:176"));
            assert.equal(false,dates.isPast("2016/05/22 17:39:38:176"));
            assert.equal(true,dates.isLeapYear("2016/05/22 17:39:38:176"));
        });

    });
```

涉及的方法有:
##	`` dateDiff``


```
    describe('计算日期的差的天数', function () {

        it('is', function (){
            assert.equal(0,dates.dateDiff(new Date(),"2016/05/18 17:39:38:176"));
        });

    });
```

涉及的方法有:
##	`` toDate``、``toStr``、``toNum``

所有的参数自动转型,toDate支持多个参数,返回array


```
        describe('类型的转换,类名多s的表示精确到毫秒', function () {

        it('转成Date,支持多个参数', function (){
            assert.equal(new Date("2016/05/18 17:39:38").getTime(),dates.toDate("2016/05/18 17:39:38").getTime());
            assert.equal(new Date("2016/05/18 17:39:38:176").getTime(),dates.toDates("2016/05/18 17:39:38:176").getTime());
        });

        it('转成字符串', function (){
            assert.equal("2016-05-18 17:39:38",dates.toStr("2016/05/18 17:39:38"));
            assert.equal("2016-05-18 17:39:38",dates.toStrs("2016/05/18 17:39:38:176"));
        });

        it('转成时间戳', function (){
            assert.equal("1463564378000",dates.toNum("2016/05/18 17:39:38"));
            assert.equal("1463564378176",dates.toNums("2016/05/18 17:39:38:176"));
        });

    });
```


