/*
v5.6
京东到家果园任务脚本,支持qx,loon,shadowrocket,surge,nodejs
兼容京东jdCookie.js
手机设备在boxjs里填写cookie
new Env('京东到家果园任务');
boxjs订阅地址:https://gitee.com/passerby-b/javascript/raw/master/JD/passerby-b.boxjs.json
cron "5 0,8,11,17 * * *" script-path=https://raw.githubusercontent.com/passerby-b/JDDJ/main/jddj_fruit.js,tag=京东到家果园任务
cron 5 0,8,11,17 * * * script-path=https://raw.githubusercontent.com/passerby-b/JDDJ/main/jddj_fruit.js,tag=京东到家果园任务
*/
let isNotify = true;//是否通知,仅限nodejs
let ckPath = './jdCookie.js';//ck路径,环境变量:JDDJ_CKPATH

const $ = new API("jddj_fruit");
let thiscookie = '', deviceid = '', nickname = '';
let lat = '30.' + Math.round(Math.random() * (99999 - 10000) + 10000);
let lng = '114.' + Math.round(Math.random() * (99999 - 10000) + 10000);
let cityid = Math.round(Math.random() * (1500 - 1000) + 1000);
let cookies = [], notify = '';
waterNum = 0, waterTimes = 0, shareCode = '', hzstr = '', msgStr = '';
!(async() => {
    if (cookies.length == 0) {
    if ($.env.isNode) {
        if (process.env.JDDJ_CKPATH) ckPath = process.env.JDDJ_CKPATH;
        delete require.cache[ckPath];
        let jdcookies = require(ckPath);
        for (let key in jdcookies) if ( !! jdcookies[key]) cookies.push(jdcookies[key])
    } else {
        let ckstr = $.read('#jddj_cookies');
        if ( !! ckstr) {
            if (ckstr.indexOf(',') < 0) cookies.push(ckstr);
            else cookies = ckstr.split(',')
        }
    }
}
if (cookies.length == 0) {
    console.log('\r\n请先填写cookie');
    return
}
if (!$.env.isNode) isNotify = $.read('#jddj_isNotify');
else notify = require('./sendNotify');
let accountNum = cookies.length > Math.sqrt(400) ? Math.sqrt(400) : cookies.length;
for (let i = 0; i < accountNum; i++) {
    console.log('\r\n★★★★★开始执行第' + (i + 1) + '个账号,共' + cookies.length + '个账号★★★★★');
    thiscookie = cookies[i];
    if (!thiscookie) continue;
    waterNum = 0, waterTimes = 0;
    thiscookie = thiscookie.replace(/ /g, '').replace(/\n/g, '');
    thiscookie = await taskLoginUrl(thiscookie);
    if (!thiscookie) {
        console.log('京东ck转到家ck失败!');
        continue
    }
    let code = await userinfo();
    if (code != 0) {
        $.notify('第' + (i + 1) + '个账号cookie过期', '请访问\nhttps://bean.m.jd.com/bean/signIndex.action\n抓取cookie', {
            url: 'https://bean.m.jd.com/bean/signIndex.action'
        });
        if ($.env.isNode && '' + isNotify + '' == 'true') {
            await notify.sendNotify('第' + (i + 1) + '个账号cookie过期', '请访问\nhttps://bean.m.jd.com/bean/signIndex.action\n抓取cookie')
        }
        continue
    }
    await $.wait(1000);
    await treeInfo(0);
    await $.wait(1000);
    let tslist = await taskList();
    await $.wait(1000);
    await waterBottle();
    await $.wait(1000);
    await runTask(tslist);
    await $.wait(1000);
    await zhuLi();
    await $.wait(1000);
    await water();
    await $.wait(1000);
    hzstr = '';
    tslist = await taskList();
    if (tslist && tslist.result && tslist.result.taskInfoList) {
        for (let index = 0; index < tslist.result.taskInfoList.length; index++) {
            let element = tslist.result.taskInfoList[index];
            if (element.taskId == '23eee1c043c01bc') {
                shareCode += '@' + element.uniqueId + ',';
                hzstr = ',助力' + element.finishNum + '/' + element.totalNum + ',助力你的好友:';
                if (element.fissionUserInfoList && element.fissionUserInfoList.length > 0) {
                    element.fissionUserInfoList.forEach(item => {
                        hzstr += item.nickName + ','
                    });
                    hzstr = hzstr.substr(0, hzstr.length - 1)
                }
                break
            }
        }
    }
    await treeInfo(2);
    await $.wait(1000)
    console.log('\n等待60秒');
    await $.wait(60000);
    console.log('\n等待结束，继续下一账号');
}
console.log('京东到家果园互助码:/dj_fruit ' + shareCode);
if ((new Date().getUTCHours() + 8) % 24 < 8) {
    $.notify('京东到家果园互助码:', '', shareCode);
    if ($.env.isNode) {
        notify.sendNotify('京东到家果园互助码:', '/dj_fruit ' + shareCode)
    }
}
if ($.env.isNode) await notify.sendNotify('京东到家果园信息', msgStr);
if (!process.env.SCF_NAMESPACE) $.write(shareCode, 'shareCodes');
else console.log("◆◆◆云函数无法内部助力!◆◆◆")
})().
catch (async(e) => {
    console.log('', '❌失败! 原因:' + e + '!', '');
    if ($.env.isNode && '' + isNotify + '' == 'true') {
    notify.sendNotify('京东到家果园', '❌失败! 原因:' + e + '!')
}
}).
finally(()=> {
    $.done()
});
async
function userinfo() {
    return new Promise(async resolve => {
        try {
            let time = Math.round(new Date());
            let option = urlTask('https://daojia.jd.com/client?channel=wx_xcx&platform=5.0.0&platCode=mini&mpChannel=wx_xcx&appVersion=8.10.5&xcxVersion=8.10.1&appName=paidaojia&functionId=mine%2FgetUserAccountInfo&isForbiddenDialog=false&isNeedDealError=false&isNeedDealLogin=false&body=%7B%22cityId%22%3A' + cityid + '%2C%22fromSource%22%3A%225%22%7D&afsImg=&lat_pos=' + lat + '&lng_pos=' + lng + '&lat=' + lat + '&lng=' + lng + '&city_id=' + cityid + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '&deviceModel=appmodel&business=&traceId=' + deviceid + time + '&channelCode=', '');
            let code = 1;
            await $.http.get(option).then(response => {
                let data = JSON.parse(response.body);
                code = data.code;
                if (data.code == 0) {
                try {
                    nickname = data.result.userInfo.userBaseInfo.nickName;
                    console.log("●●●" + nickname + "●●●")
                } catch (error) {
                    nickname = '昵称获取失败'
                }
            } else nickname = '昵称获取失败'
        });
            resolve(code)
        } catch (error) {
            console.log('\n【个人信息】:' + error);
            resolve(1)
        }
    })
}
async
function taskList() {
    return new Promise(async resolve => {
        try {
            let time = Math.round(new Date());
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + time + '&_funid_=task/list', 'functionId=task%2Flist&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22plateCode%22%3A4%7D&lat=' + lat + '&lng=' + lng + '&lat_pos=' + lat + '&lng_pos=' + lng + '&city_id=' + cityid + '&channel=rn&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + time + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '&_jdrandom=' + time + '&_funid_=task%2Flist');
            option.url += '&' + option.body;
            $.http.get(option).then(response => {
                let data = JSON.parse(response.body);
                resolve(data)
            })
        } catch (error) {
            console.log('\n【任务列表】:' + error);
            resolve({})
        }
    })
}
async
function water() {
    return new Promise(async resolve => {
        try {
            let time = Math.round(new Date());
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + time + '&_funid_=fruit/watering', 'functionId=fruit%2Fwatering&isNeedDealError=true&method=POST&body=%7B%22waterTime%22%3A1%7D&lat=' + lat + '&lng=' + lng + '&lat_pos=' + lat + '&lng_pos=' + lng + '&city_id=1381&channel=rn&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + time + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '&_jdrandom=' + time + '&_funid_=fruit%2Fwatering');
            let waterStatus = 1, waterCount = 0;
            do {
                waterCount++;
                console.log('\n**********开始执行第' + waterCount + '次浇水**********');
                await $.http.post(option).then(response => {
                    let data = JSON.parse(response.body);
                    console.log('\n【浇水】:' + data.msg);
                    waterStatus = data.code;
                    if (data.code == 0) waterTimes++
            });
                await $.wait(1000)
            } while (waterStatus == 0);
            resolve()
        } catch (error) {
            console.log('\n【浇水】:' + error);
            resolve()
        }
    })
}
async
function sign() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=signin%2FuserSigninNew&isNeedDealError=true&body=%7B%22channel%22%3A%22daojiaguoyuan%22%2C%22cityId%22%3A' + cityid + '%2C%22longitude%22%3A' + lng + '%2C%22latitude%22%3A' + lat + '%2C%22ifCic%22%3A0%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
            $.http.get(option).then(response => {
                let data = JSON.parse(response.body);
                console.log('\n【到家签到】:' + data.msg);
                resolve()
            })
        } catch (error) {
            console.log('\n【到家签到领水滴】:' + error);
            resolve()
        }
    })
}
async
function waterBottle() {
    return new Promise(async resolve => {
        try {
            let receiveStatus;
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=fruit%2FgetWaterBottleInfo&isNeedDealError=true&body=%7B%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
            await $.http.get(option).then(response => {
                const data = JSON.parse(response.body);
                if (data.code == 0) {
                receiveStatus = data.result.receiveStatus;
                console.log('\n【收玻璃瓶水滴】:水瓶中有:' + data.result.yesterdayAccumulate + '水滴')
            } else {
                console.log('\n【收玻璃瓶水滴】:水瓶信息错误')
            }
        });
            if (receiveStatus == 0) {
                option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=fruit%2FreceiveWaterBottle&isNeedDealError=true&body=%7B%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                await $.http.get(option).then(response => {
                    const data = JSON.parse(response.body);
                    if (data.code == 0) {
                    console.log('\n【收玻璃瓶水滴】:水瓶收取成功')
                } else {
                    console.log('\n【收玻璃瓶水滴】:水瓶收取错误')
                }
            })
            } else if (receiveStatus == 1) {
                console.log('\n【收玻璃瓶水滴】:水瓶已经收取过')
            } else if (receiveStatus == -2) {
                console.log('\n【收玻璃瓶水滴】:收取时间未到')
            } else {
                console.log('\n【收玻璃瓶水滴】:水瓶状态错误或暂不可收取:')
            }
            resolve()
        } catch (error) {
            console.log('\n【收玻璃瓶水滴】:' + error);
            resolve()
        }
    })
}
async
function zhuLi() {
    return new Promise(async resolve => {
        try {
            let scodes = [], codestr = '18237091240_p@111';
            codestr = codestr.replace(/ /g, '').replace(/\n/g, '');
            if ( !! codestr) {
                codestr = codestr.substr(0, codestr.length - 1);
                scodes = codestr.split(',')
            }
            for (let index = 0; index < scodes.length; index++) {
                let option = urlTask('https://daojia.jd.com/client?lat=' + lat + '&lng=' + lng + '&lat_pos=' + lat + '&lng_pos=' + lng + '&city_id=' + cityid + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '&channel=wx_xcx&mpChannel=wx_xcx&platform=5.0.0&platCode=mini&appVersion=5.0.0&appName=paidaojia&deviceModel=appmodel&xcxVersion=9.2.0&isNeedDealError=true&business=djgyzhuli&functionId=task%2Ffinished&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskType%22%3A1201%2C%22taskId%22%3A%2223eee1c043c01bc%22%2C%22plateCode%22%3A5%2C%22assistTargetPin%22%3A%22' + scodes[index].split('@')[0] + '%22%2C%22uniqueId%22%3A%22' + scodes[index].split('@')[1] + '%22%7D', '');
                let code = 0;
                await $.http.get(option).then(response => {
                    let data = JSON.parse(response.body);
                    if (data.code == 0) console.log('\n【助力】:' + data.msg);
            else console.log('\n【助力】:' + data.msg + ',你的助力次数已用完或对方助力已满!'), code = 1
            });
                await $.wait(1000);
                if (code == 1) break
            }
            resolve()
        } catch (error) {
            console.log('\n【助力】:' + error);
            resolve()
        }
    })
}
async
function _runTask(tslist) {
    return new Promise(async resolve => {
        try {
            for (let index = 0; index < tslist.result.taskInfoList.length; index++) {
                const item = tslist.result.taskInfoList[index];
                if (item.taskType == 307 || item.taskType == 901) {
                    let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Freceived&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                    await $.http.get(option).then(response => {
                        var data = JSON.parse(response.body),
                        msg = '';
                        if (data.code == 0) {
                        msg = data.msg + ',奖励:' + data.result.awardValue
                    } else {
                        msg = data.msg
                    }
                    console.log('\n领取任务【' + item.taskTitle + '】:' + msg)
                })
                }
                if (item.browseTime > -1) {
                    for (let t = 0; t < parseInt(item.browseTime); t++) {
                        await $.wait(1000);
                        console.log('计时:' + (t + 1) + '秒...')
                    }
                };
                option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                await $.http.get(option).then(response => {
                    var data = JSON.parse(response.body),
                    msg = '';
                    if (data.code == 0) {
                    msg = data.msg + ',奖励:' + data.result.awardValue
                } else {
                    msg = data.msg
                }
                console.log('\n任务完成【' + item.taskTitle + '】:' + msg)
            });
                option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                await $.http.get(option).then(response => {
                    var data = JSON.parse(response.body),
                    msg = '';
                    if (data.code == 0) {
                    msg = data.msg + ',奖励:' + data.result.awardValue
                } else {
                    msg = data.msg
                }
                console.log('\n领取奖励【' + item.taskTitle + '】:' + msg)
            })
            }
            resolve()
        } catch (error) {
            console.log('\n【执行任务】:' + error);
            resolve()
        }
    })
}
const do_tasks = [307, 901, 1102, 1105, 1103, 0, 1101];
async
function runTask(tslist) {
    return new Promise(async resolve => {
        try {
            if (!tslist || !tslist.result || !tslist.result.taskInfoList) {
                console.log('\n任务列表获取失败,跳过做任务.....');
                resolve();
                return
            }
            for (let index = 0; index < tslist.result.taskInfoList.length; index++) {
                const item = tslist.result.taskInfoList[index];
                if (item.status == 3 || item.status == 2) {
                    console.log('\n【' + item.taskTitle + '】: 任务已完成,跳过做任务')
                } else if (item.taskType == 502) {
                    await sign()
                } else if (do_tasks.includes(item.taskType)) {
                    if (item.status == 0) {
                        let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Freceived&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                        await $.http.get(option).then(response => {
                            let data = JSON.parse(response.body), msg = '';
                            if (data.code == 0) {
                            msg = data.msg + ',奖励:' + data.result.awardValue
                        } else {
                            msg = data.msg
                        }
                        console.log('\n领取任务【' + item.taskTitle + '】:' + msg)
                    });
                        if (item.browseTime > -1) {
                            for (let t = 0; t < parseInt(item.browseTime); t++) {
                                await $.wait(1000);
                                console.log('计时:' + (t + 1) + '秒...')
                            }
                        }
                    } else {
                        console.log('\n【' + item.taskTitle + '】: 任务已领取或不需要领取')
                    };
                    if (item.taskType != 0) {
                        option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                        await $.http.get(option).then(response => {
                            let data = JSON.parse(response.body), msg = '';
                            if (data.code == 0) {
                            msg = data.msg + ',奖励:' + data.result.awardValue;
                            item.status = 2
                        } else {
                            msg = data.msg
                        }
                        console.log('\n任务完成【' + item.taskTitle + '】:' + msg)
                    })
                    }
                } else {
                    console.log('\n【' + item.taskTitle + '】: 脚本无法执行此任务或任务不需要主动完成')
                }
                if (item.status == 2 || item.taskTypes == 1102) {
                    option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                    await $.http.get(option).then(response => {
                        let data = JSON.parse(response.body), msg = '';
                        if (data.code == 0) {
                        msg = data.msg + ',奖励:' + data.result.awardValue
                    } else {
                        msg = data.msg
                    }
                    console.log('\n领取奖励【' + item.taskTitle + '】:' + msg)
                })
                } else if (item.status == 3) {
                    console.log('\n【' + item.taskTitle + '】: 奖励已领取,跳过领奖励')
                } else {
                    console.log('\n【' + item.taskTitle + '】: 任务未完成,跳过领奖励')
                }
            }
            resolve()
        } catch (error) {
            console.log('\n【执行任务】:' + error);
            resolve()
        }
    })
}
async
function runTask2(tslist) {
    return new Promise(async resolve => {
        try {
            for (let index = 0; index < tslist.result.taskInfoList.length; index++) {
                const item = tslist.result.taskInfoList[index];
                if (item.taskTitle.indexOf('限时') > -1) {
                    let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Freceived&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                    await $.http.get(option).then(response => {
                        var data = JSON.parse(response.body),
                        msg = '';
                        if (data.code == 0) {
                        msg = data.msg + ',奖励:' + data.result.awardValue
                    } else {
                        msg = data.msg
                    }
                    console.log('\n领取任务【' + item.taskTitle + '】:' + msg)
                });
                    if (item.browseTime > -1) {
                        for (let t = 0; t < parseInt(item.browseTime); t++) {
                            await $.wait(1000);
                            console.log('计时:' + (t + 1) + '秒...')
                        }
                    };
                    option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                    await $.http.get(option).then(response => {
                        var data = JSON.parse(response.body),
                        msg = '';
                        if (data.code == 0) {
                        msg = data.msg + ',奖励:' + data.result.awardValue
                    } else {
                        msg = data.msg
                    }
                    console.log('\n任务完成【' + item.taskTitle + '】:' + msg)
                });
                    option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22' + item.modelId + '%22%2C%22taskId%22%3A%22' + encodeURIComponent(item.taskId) + '%22%2C%22taskType%22%3A' + item.taskType + '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');
                    await $.http.get(option).then(response => {
                        var data = JSON.parse(response.body),
                        msg = '';
                        if (data.code == 0) {
                        msg = data.msg + ',奖励:' + data.result.awardValue
                    } else {
                        msg = data.msg
                    }
                    console.log('\n领取奖励【' + item.taskTitle + '】:' + msg)
                })
                }
            }
            resolve()
        } catch (error) {
            console.log('\n【执行任务】:' + error);
            resolve()
        }
    })
}
async
function treeInfo(step) {
    return new Promise(async resolve => {
        try {
            let time = Math.round(new Date());
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + time + '&_funid_=fruit/initFruit', 'functionId=fruit%2FinitFruit&isNeedDealError=true&method=POST&body=%7B%22cityId%22%3A%22' + cityid + '%22%2C%22longitude%22%3A' + lng + '%2C%22latitude%22%3A' + lat + '%7D&lat=' + lat + '&lng=' + lng + '&lat_pos=' + lat + '&lng_pos=' + lng + '&city_id=' + cityid + '&channel=rn&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + time + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '&_jdrandom=' + time + '&_funid_=fruit%2FinitFruit');
            await $.http.post(option).then(async response => {
                let data = JSON.parse(response.body);
                if (data.code == 0) {
                    if (step == 0) {
                        waterNum = data.result.userResponse.waterBalance;
                        shareCode += data.result.activityInfoResponse.userPin
                    }
                    if (step == 2) {
                        waterNum = (waterTimes * 10) + data.result.userResponse.waterBalance - waterNum;
                        if (waterNum < 0) waterNum = 0;
                        if (data.result.activityInfoResponse.curStageLeftProcess == 0) {
                            console.log('\n京东到家果园【' + nickname + '】:' + data.result.activityInfoResponse.fruitName + '已成熟,快去收取!');
                            $.notify('京东到家果园', '【' + nickname + '】', '京东到家果园' + data.result.activityInfoResponse.fruitName + '已成熟,快去收取!');
                            if ($.env.isNode && '' + isNotify + '' == 'true') {
                                msgStr += '\r\n【' + nickname + '】\r\n京东到家果园' + data.result.activityInfoResponse.fruitName + '已成熟,快去收取!'
                            }
                        }
                        if (data.result.activityInfoResponse.curStageLeftProcess > 0) {
                            let unit = '次';
                            if (data.result.activityInfoResponse.growingStage == 5) unit = '%';
                            console.log('\n京东到家果园【' + nickname + '】:' + data.result.activityInfoResponse.fruitName + ',本次领取' + waterNum + '滴水,浇水' + waterTimes + '次,还需浇水' + data.result.activityInfoResponse.curStageLeftProcess + unit + data.result.activityInfoResponse.stageName + ',还剩' + data.result.userResponse.waterBalance + '滴水' + hzstr);
                            $.notify('京东到家果园', '【' + nickname + '】', data.result.activityInfoResponse.fruitName + ',本次领取' + waterNum + '滴水,浇水' + waterTimes + '次,还需浇水' + data.result.activityInfoResponse.curStageLeftProcess + unit + data.result.activityInfoResponse.stageName + ',还剩' + data.result.userResponse.waterBalance + '滴水' + hzstr);
                            if ($.env.isNode && '' + isNotify + '' == 'true') {
                                msgStr += '\r\n【' + nickname + '】\r\n' + data.result.activityInfoResponse.fruitName + ',本次领取' + waterNum + '滴水,浇水' + waterTimes + '次,还需浇水' + data.result.activityInfoResponse.curStageLeftProcess + unit + data.result.activityInfoResponse.stageName + ',还剩' + data.result.userResponse.waterBalance + '滴水' + hzstr
                            }
                        }
                    }
                }
                resolve()
            })
        } catch (error) {
            console.log('\n【果树信息】:' + error);
            resolve()
        } finally {
            treeInfoTimes = true
        }
    })
}
function urlTask(url, body) {
    let arr = decodeURIComponent(body).split('&');
    let cryptoContent = '';
    if (body && arr.length > 0) {
        let json = {}, keys = [], sortVlaues = [];
        for (const o of arr) {
            let c = o.split('=');
            if ( !! c[1] && c[0] != 'functionId' && c[0] != 'signKeyV1') {
                json[c[0]] = c[1];
                keys.push(c[0])
            }
        }
        keys = keys.sort();
        keys.forEach(element => {
            sortVlaues.push(json[element])
        });
        const secret = "923047ae3f8d11d8b19aeb9f3d1bc200";
        cryptoContent = hex_hmac_sha256(secret, sortVlaues.join('&'))
    }
    let option = {
        url: url,
        headers: {
            'Host': 'daojia.jd.com',
            'Content-Type': 'application/x-www-form-urlencoded;',
            'Origin': 'https://daojia.jd.com',
            'Cookie': thiscookie,
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148________appName=jdLocal&platform=iOS&deviceId=D4A23E4F-26D5-40EC-8F0D-5E69F35351D3&commonParams={"cityId":"' + cityid + '","djAppVersion":"8.11.0","latitude":"' + lat + '","longitude":"' + lng + '","sharePackageVersion":"2"}&djAppVersion=8.11.0&supportDJSHWK&isElderEnable=0&isElderBigFont=0',
            'Accept-Language': 'zh-cn'
        },
        body: body + '&signKeyV1=' + cryptoContent
    };
    return option
}
async
function taskLoginUrl(thiscookie) {
    return new Promise(async resolve => {
        try {
            if (thiscookie.indexOf('deviceid_pdj_jd') > -1) {
                let arr = thiscookie.split(';');
                for (const o of arr) {
                    if (o.indexOf('deviceid_pdj_jd') > -1) {
                        deviceid = o.split('=')[1]
                    }
                }
                resolve(thiscookie)
            } else {
                deviceid = _uuid();
                let option = {
                    url: encodeURI('https://daojia.jd.com/client?_jdrandom=' + (+new Date()) + '&_funid_=login/treasure&functionId=login/treasure&body={}&lat=&lng=&lat_pos=&lng_pos=&city_id=&channel=h5&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&isNeedDealError=false&traceId=' + deviceid + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '&_jdrandom=' + (+new Date()) + '&_funid_=login/treasure'),
                    headers: {
                        "Cookie": 'deviceid_pdj_jd=' + deviceid + ';' + thiscookie + ';',
                        "Host": "daojia.jd.com",
                        'Content-Type': 'application/x-www-form-urlencoded;',
                        "User-Agent": 'jdapp;iPhone;10.0.10;14.1;' + deviceid + ';network/wifi;model/iPhone11,6;appBuild/167764;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
                    }
                };
                let ckstr = '';
                await $.http.get(option).then(async response => {
                    if (response.body.indexOf('请求成功') > -1) {
                        for (const key in response.headers) {
                            if (key.toLowerCase().indexOf('cookie') > -1) {
                                ckstr = response.headers[key].toString()
                            }
                        }
                        ckstr += ';deviceid_pdj_jd=' + deviceid
                    }
                });
                resolve(ckstr)
            }
        } catch (error) {
            console.log(error);
            resolve('')
        }
    })
}
function _uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/

/*********************************** SHA256 *************************************/
var hexcase=0;var b64pad="";function hex_sha256(s){return rstr2hex(rstr_sha256(str2rstr_utf8(s)))}function b64_sha256(s){return rstr2b64(rstr_sha256(str2rstr_utf8(s)))}function any_sha256(s,e){return rstr2any(rstr_sha256(str2rstr_utf8(s)),e)}function hex_hmac_sha256(k,d){return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(k),str2rstr_utf8(d)))}function b64_hmac_sha256(k,d){return rstr2b64(rstr_hmac_sha256(str2rstr_utf8(k),str2rstr_utf8(d)))}function any_hmac_sha256(k,d,e){return rstr2any(rstr_hmac_sha256(str2rstr_utf8(k),str2rstr_utf8(d)),e)}function sha256_vm_test(){return hex_sha256("abc").toLowerCase()=="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"}function rstr_sha256(s){return binb2rstr(binb_sha256(rstr2binb(s),s.length*8))}function rstr_hmac_sha256(key,data){var bkey=rstr2binb(key);if(bkey.length>16)bkey=binb_sha256(bkey,key.length*8);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C}var hash=binb_sha256(ipad.concat(rstr2binb(data)),512+data.length*8);return binb2rstr(binb_sha256(opad.concat(hash),512+256))}function rstr2hex(input){try{hexcase}catch(e){hexcase=0}var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++){x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)+hex_tab.charAt(x&0x0F)}return output}function rstr2b64(input){try{b64pad}catch(e){b64pad=''}var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3){var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++){if(i*8+j*6>input.length*8)output+=b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F)}}return output}function rstr2any(input,encoding){var divisor=encoding.length;var remainders=Array();var i,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++){dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1)}while(dividend.length>0){quotient=Array();x=0;for(i=0;i<dividend.length;i++){x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0)quotient[quotient.length]=q}remainders[remainders.length]=x;dividend=quotient}var output="";for(i=remainders.length-1;i>=0;i--)output+=encoding.charAt(remainders[i]);var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));for(i=output.length;i<full_length;i++)output=encoding[0]+output;return output}function str2rstr_utf8(input){var output="";var i=-1;var x,y;while(++i<input.length){x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF){x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++}if(x<=0x7F)output+=String.fromCharCode(x);else if(x<=0x7FF)output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F))}return output}function str2rstr_utf16le(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output}function str2rstr_utf16be(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output}function rstr2binb(input){var output=Array(input.length>>2);for(var i=0;i<output.length;i++)output[i]=0;for(var i=0;i<input.length*8;i+=8)output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(24-i%32);return output}function binb2rstr(input){var output="";for(var i=0;i<input.length*32;i+=8)output+=String.fromCharCode((input[i>>5]>>>(24-i%32))&0xFF);return output}function sha256_S(X,n){return(X>>>n)|(X<<(32-n))}function sha256_R(X,n){return(X>>>n)}function sha256_Ch(x,y,z){return((x&y)^((~x)&z))}function sha256_Maj(x,y,z){return((x&y)^(x&z)^(y&z))}function sha256_Sigma0256(x){return(sha256_S(x,2)^sha256_S(x,13)^sha256_S(x,22))}function sha256_Sigma1256(x){return(sha256_S(x,6)^sha256_S(x,11)^sha256_S(x,25))}function sha256_Gamma0256(x){return(sha256_S(x,7)^sha256_S(x,18)^sha256_R(x,3))}function sha256_Gamma1256(x){return(sha256_S(x,17)^sha256_S(x,19)^sha256_R(x,10))}function sha256_Sigma0512(x){return(sha256_S(x,28)^sha256_S(x,34)^sha256_S(x,39))}function sha256_Sigma1512(x){return(sha256_S(x,14)^sha256_S(x,18)^sha256_S(x,41))}function sha256_Gamma0512(x){return(sha256_S(x,1)^sha256_S(x,8)^sha256_R(x,7))}function sha256_Gamma1512(x){return(sha256_S(x,19)^sha256_S(x,61)^sha256_R(x,6))}var sha256_K=new Array(1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998);function binb_sha256(m,l){var HASH=new Array(1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225);var W=new Array(64);var a,b,c,d,e,f,g,h;var i,j,T1,T2;m[l>>5]|=0x80<<(24-l%32);m[((l+64>>9)<<4)+15]=l;for(i=0;i<m.length;i+=16){a=HASH[0];b=HASH[1];c=HASH[2];d=HASH[3];e=HASH[4];f=HASH[5];g=HASH[6];h=HASH[7];for(j=0;j<64;j++){if(j<16)W[j]=m[j+i];else W[j]=safe_add(safe_add(safe_add(sha256_Gamma1256(W[j-2]),W[j-7]),sha256_Gamma0256(W[j-15])),W[j-16]);T1=safe_add(safe_add(safe_add(safe_add(h,sha256_Sigma1256(e)),sha256_Ch(e,f,g)),sha256_K[j]),W[j]);T2=safe_add(sha256_Sigma0256(a),sha256_Maj(a,b,c));h=g;g=f;f=e;e=safe_add(d,T1);d=c;c=b;b=a;a=safe_add(T1,T2)}HASH[0]=safe_add(a,HASH[0]);HASH[1]=safe_add(b,HASH[1]);HASH[2]=safe_add(c,HASH[2]);HASH[3]=safe_add(d,HASH[3]);HASH[4]=safe_add(e,HASH[4]);HASH[5]=safe_add(f,HASH[5]);HASH[6]=safe_add(g,HASH[6]);HASH[7]=safe_add(h,HASH[7])}return HASH}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}
/*********************************** SHA256 *************************************/
