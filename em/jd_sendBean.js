/*
============Quantumultx===============
[task_local]
#送豆得豆
20 0 * * * jd_sendBean.js.js, tag=送豆得豆, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
*/
const $ = new Env('送豆得豆');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000);
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
$.taskList = []
$.helpPin = []
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            await TotalBean();
            console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }

            if($.index < 3){
                $.helpPin.push($.UserName)
            }
        }
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';

            await sendBean();
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
async function sendBean() {
    try {
        //获取所有活动
        await getAllActives();
        if($.taskList){
            for (let i = 0; i < $.taskList.length; i++) {
                for (let j = 0; j < $.helpPin.length; j++) {
                    await WX_Detail_Start($.taskList[i].activeId,encodeURIComponent($.helpPin[j]));
                    await $.wait(500);
                    await invite($.taskList[i].activeId);
                    await $.wait(500);
                    await help($.taskList[i].activeId,encodeURIComponent($.helpPin[j]));
                    await $.wait(500);
                    await getBean($.taskList[i].activeId);
                    await $.wait(500);
                }
            }
        }

    } catch (e) {
        $.logErr(e)
    }
}

function help(activityId,pin) {
    return new Promise(resolve => {
        var url = 'https://draw.jdfcloud.com/common/api/bean/activity/participate?activityId=' + activityId + '&inviteUserPin=' + pin + '&invokeKey=NRp8OPxZMFXmGkaE&timestap='+new Date().getTime()
        const options = {
            url,
            'body': '{}',
            headers: {
                'Host': 'draw.jdfcloud.com',
                'App-Id': 'wxccb5c536b0ecd1bf',
                'Referer': 'https://servicewechat.com/wxccb5c536b0ecd1bf/727/page-frame.html',
                'Origin': 'https://sendbeans.jd.com',
                'openId': '',
                'Connection': 'keep-alive',
                'cookie': cookie,
                'Accept':'application/json, text/plain, */*',
                'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
                'content-type': 'application/json',
                'Accept-Encoding': 'gzip,compress,br,deflate',
                'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;10.0.6;14.6;753d213009c85f60f8ce9df3a678389ffa3fb1c5;network/3g;model/iPhone13,2;addressid/1533408821;appBuild/167724;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                'Accept-Language': 'zh-cn',
            },
            timeout: 10000
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        console.log(data)
                        data = JSON.parse(data);
                        if (data.success) {

                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function getBean(rewardRecordId) {
    return new Promise(resolve => {
        var url = 'https://draw.jdfcloud.com/common/api/bean/activity/sendBean?rewardRecordId=' + rewardRecordId + '&jdChannelId=&userSource=mp&appId=wxccb5c536b0ecd1bf&invokeKey=NRp8OPxZMFXmGkaE'
        const options = {
            url,
            headers: {
                'Content-Length': '2',
                'App-Id': 'wxccb5c536b0ecd1bf',
                'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
                'Referer': 'https://servicewechat.com/wxccb5c536b0ecd1bf/727/page-frame.html',
                'Host': 'draw.jdfcloud.com',
                'Connection': 'keep-alive',
                'cookie': cookie,
                'Accept':'application/json, text/plain, */*',
                'content-type': 'application/json',
                'Accept-Encoding': 'gzip,compress,br,deflate',
                'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;10.0.6;14.6;753d213009c85f60f8ce9df3a678389ffa3fb1c5;network/3g;model/iPhone13,2;addressid/1533408821;appBuild/167724;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                'Accept-Language': 'zh-cn',
            },
            timeout: 10000
        }
        $.get(options, (err, resp, data) => {
            updateCookie(resp)
            try {
                if (err) {
                    console.log('\n送豆得豆: API查询请求失败 ‼️‼️')
                    throw new Error(err);
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        console.log(data)
                        if(data.data && data.data.items){
                            var items = data.data.items
                            items.forEach((item,index) => {
                                var beginTime = item.beginTime
                                //活动中的
                                if(beginTime < new Date().getTime()){
                                    $.taskList.push(item)
                                }

                            })
                        }
                    } else {
                        console.log(`京豆api返回数据为空，请检查自身原因`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}

function invite(activeId) {
    return new Promise(resolve => {
        var url = 'https://sendbeans.jd.com/common/api/bean/activity/invite?activityId=' + activeId + '&source=SEND_BEAN_H5&userSource=jdApp&jdChannelId=316&invokeKey=NRp8OPxZMFXmGkaE'
        const options = {
            url,
            'body': '{}',
            headers: {
                'Origin': 'https://sendbeans.jd.com',
                'openId': '',
                'Host': 'sendbeans.jd.com',
                'Connection': 'keep-alive',
                'cookie': cookie,
                'App-Id': 'h5',
                'Accept':'application/json, text/plain, */*',
                'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
                'content-type': 'application/json',
                'Accept-Encoding': 'gzip,compress,br',
                'Referer': 'https://sendbeans.jd.com/dist/index.html',
                'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;10.0.6;14.6;753d213009c85f60f8ce9df3a678389ffa3fb1c5;network/3g;model/iPhone13,2;addressid/1533408821;appBuild/167724;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                'Accept-Language': 'zh-cn',
            },
            timeout: 10000
        }
        const body = {
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        console.log(data)
                        data = JSON.parse(data);
                        if (data.data) {

                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function getAllActives(){
    return new Promise(resolve => {
        var url = 'https://sendbeans.jd.com/common/api/bean/activity/get/entry/list/by/channel?channelId=14&channelType=H5&sendType=0&singleActivity=false&invokeKey=NRp8OPxZMFXmGkaE'
        const options = {
            url,
            headers: {
                'Host': 'sendbeans.jd.com',
                'Connection': 'keep-alive',
                'cookie': cookie,
                'App-Id': 'h5',
                'Accept':'application/json, text/plain, */*',
                'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
                'content-type': 'application/json',
                'Accept-Encoding': 'gzip,compress,br',
                'Referer': 'https://sendbeans.jd.com/dist/index.html?lng=113.260243&lat=23.175389&sid=144a9eebeabcfeeabfcca9731fba323w&un_area=19_1601_50258_50374',
                'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;10.0.6;14.6;753d213009c85f60f8ce9df3a678389ffa3fb1c5;network/3g;model/iPhone13,2;addressid/1533408821;appBuild/167724;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                'Accept-Language': 'zh-cn',
            },
            timeout: 10000
        }
        $.get(options, (err, resp, data) => {
            updateCookie(resp)
            try {
                if (err) {
                    console.log('\n送豆得豆: API查询请求失败 ‼️‼️')
                    throw new Error(err);
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        console.log(data)
                        if(data.data && data.data.items){
                            var items = data.data.items
                            items.forEach((item,index) => {
                                var beginTime = item.beginTime
                                //活动中的
                                if(beginTime < new Date().getTime() && "FINISH" != item.status){
                                    $.taskList.push(item)
                                }

                            })
                        }
                    } else {
                        console.log(`京豆api返回数据为空，请检查自身原因`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}

function WX_Detail_Start(activeId,pin){
    console.log("")
    return new Promise(resolve => {
        var url = 'https://draw.jdfcloud.com/common/api/bean/activity/detail?activityId=' + activeId +
            '&timestap=' + new Date().getTime() + '&userSource=mp&jdChannelId=&inviteUserPin=' + pin + "&appId=wxccb5c536b0ecd1bf&invokeKey=NRp8OPxZMFXmGkaE"
        const options = {
            url,
            headers: {
                'Host': 'draw.jdfcloud.com',
                'Connection': 'keep-alive',
                'cookie': cookie,
                'App-Id': 'h5',
                'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
                'content-type': 'application/json',
                'Accept-Encoding': 'gzip,compress,br',
                'Referer': 'https://servicewechat.com/wxccb5c536b0ecd1bf/727/page-frame.html',
                'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;10.0.6;14.6;753d213009c85f60f8ce9df3a678389ffa3fb1c5;network/3g;model/iPhone13,2;addressid/1533408821;appBuild/167724;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                'Accept-Language': 'zh-cn',
            },
            timeout: 10000
        }
        $.get(options, (err, resp, data) => {
            updateCookie(resp)
            try {
                if (err) {
                    console.log('\n送豆得豆: API查询请求失败 ‼️‼️')
                    throw new Error(err);
                } else {
                    // if (data) {
                    //     $.getFriendsData = JSON.parse(data);
                    // } else {
                    //     console.log(`京豆api返回数据为空，请检查自身原因`)
                    // }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })
    })
}

function updateCookie (resp) {
    if (!resp || !resp.headers['set-cookie']){
        return
    }
    let obj = {}
    let cookieobj = {}
    let cookietemp = cookie.split(';')
    for (let v of cookietemp) {
        const tt2 = v.split('=')
        obj[tt2[0]] = v.replace(tt2[0] + '=', '')
    }
    for (let ck of resp['headers']['set-cookie']) {
        const tt = ck.split(";")[0]
        const tt2 = tt.split('=')
        obj[tt2[0]] = tt.replace(tt2[0] + '=', '')
    }
    const newObj = {
        ...cookieobj,
        ...obj,
    }
    cookie = ''
    for (let key in newObj) {
        key && (cookie = cookie + `${key}=${newObj[key]};`)
    }
    // console.log(cookie, 'jdCookie')
}
function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if (data['retcode'] === 0) {
                            $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                        } else {
                            $.nickName = $.UserName
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}