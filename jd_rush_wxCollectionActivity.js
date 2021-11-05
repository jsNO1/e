/*
https://lzkj-isv.isvjcloud.com/wxgame/activity/8530275?activityId=
*/
const $ = new Env('加购物车抽奖');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let activityIdList = [
    "95a036d4a5d64af8aa25bce946ae8aec",
    "5409c2b9f6db4591964b712a5ecde939",
    "6169e46916784333b31872a001549ce3",
    "3a541178cda644849987889842892ddf",
    "297013954f484ade829ad833d1129f06",
    "8acb8c49fab94c9b8b43c69a0544403c",
    "60d5d203147e47f1b7e6e31bf3d4f64e",
    "6f96aa1ce3a74bd1bff3068aaf295b59",
    "e169d5f957694a5198b2609d93d0cd21",
    "8e0c9ae62f214d4e893c1edefdd39831",
    "ceb2d3be323b476aaa77787cdeb93640",
    "0bf802edba204ff88fa941a92494237b",
    "b66f7c534159493cbed54b8a059f1ac7",
    "021167e2993d4785adf3d3a8cbcd92a9",
    "1900f76d7d37467ca2eaf17992e67e57",
    "6a9f3d3fe1734665993ca7be444013ae",
    "dd977c155d3942caad4dcddf74f7cd26",
    "8edf9c234674436e80238244af539bc4",
    "376de5fab03542e0a002d13c1aafdc31",
    "c76142e32e8b46c7b42062be52ef2523",
    "365379d2daab4a26a62e69bddccc2688",
    "2a912e81b9d54b70904623a9b920a693",
    "fb1ac0ab38654586bfc64419a5fa8620",
    "6ddc3889cd0e4bc798e06cf86b8c4db9",
    "683495ffe50e4bf783f590058dd57d58",
    "b965e8b6a82a42e9b4f205da4269b6e8",
    "c16602512f8c4c70a4ab5728df52e7d5",
    "d899d3214ee2407bb8839599d8b03cbf",
    "186a059e6ba74a11a1421ccb06a89d95",
    "2344971a8957480fa2af6fe5c5b4115d",
    "56953039ac8d4956809f4ae9ed2e0e3d",
    "187bad0fa5124ed6a2ce6e08a43e4f03",
    "7371d90caf964a46a3de05ce692a828c",
    "83756dd037514790926694bcc731a8f9",
    "a6db8c4763114329b46a34ecf67402d5",
    "c22f4dd40946446d96fb8a935c40a2ae",
    "9198140b216343d29f739c161ab98461",
    "a79dc5e0acb043f7bef5f7ed59ecdd99",
    "31cc34e9ef754623ab8f795eb57d2a0b",
    "cf77b88dd69846dfa2bcb5f69132fcd7",
    "f50992e68ced4340a7b01875de7c64f3",
    "47edff69a42143afa2921be8e323a53c",
    "e749549dfbc4472db56bbcf5f4570932",
    "38c38ef55c4e4dab9af30fb888e07a8f",
    "32734386d2b04755925cf5e494533b76",
    "fdbcb1c895c249ae9f4d0cb08d8b2bd5",
    "dd4874fd23d74e5c86c1e8cf68f1c588",
    "79d4df50165c49d79526571dc68cd048",
    "a9346fd228d7441199efbe12b8d1fc17",
    "ab246490bc8d40b5b9dafa95fb6356c1",
    "97e13975d303414a9b206c09e0b126ac",
    "fc34aeb0b1974b47b55c7972eaaaaff3",
    "29993fba05d9481d8da8572202ba9b4c",
    "58b35633322046ab9751abfff8fcd477",
    "80fceed7a970414482a8240025871c39",
    "3a5d0d24cc1b4a2f8fa28b4ee84d88bf",
    "49fe2574f3884cdaae2251a4903fa0c8",
    "913197e9ee4e479e9b71a851e2dbcb0b",
    "7024ef78b7d74f579645d9f74ee54c40",
    "ec4fc8c2315b4e9cb5ecd6baa66c5861",
    "e721848900f44675bb0440f0941bceb6",
    "678d692e1ea143b89dd042fbde199179",
    "1e3716d0c5fe4498b7a5dc29faa1ee20",
    "54e413d36bb546ed9430b9851862ff53",
    "09b47f9bd87d4f8097242c489dde3d01",
    "6c27e02adba24fee8198e08223abb43f",
    "e0fe44e572eb41469ed5e867f140d89e",
    "e83b82b7701146119053dc321492a239",
    "71dfe880f924463da62fca2f12a4404a",
    "0994441bb5324f9999f1d76dd3c31f0d",
    "72a13ace86b1499b8bf17831cd151539",
    "544654285a7c4d599a625bdefc94d16f",
    "7b3964a58dfc4232872103e87817a9ac",
    "f56041f707864ec5bccd47f9ce6b1c79",
    "ba7fc8f6e7ba4580af67f16443d9e12b",
    "160f85770c9d4162a3d2915c0aa11bd0",
    "19d1f0466f0540b890461a069947b31b",
    "5407fc0a3c9c4e8d8a0fdb6f8779098a",
    "0669df56cfd64da08822aa25279e4c65",
    "d11163cf367c42cea5390ba7b0212cd4",
    "b7fae8d1e7254955838d53d12a44b5ef",
    "eba9a226726e45e9b0443d172a6fe42d",
    "854819c3fcf14d1c85241eca509b085f",
    "d77c4a24865b4617be5b1d38f3297241",
    "38f5a8c392054817859f8d2266e7310b",
    "d9e369bfd0b24ce1bdc8ac6e4d3c91b0",
    "cecbbffa0bbd4472ae6cd28af200faba",
    "7e574be2705544b4befac4b53fd124f1",
    "c372abead98a4b71a5eee9ca971a9949",
    "6f69259e22e346c0a18be1a31c71ef71",
    "f4a5909258e64f3a8553d723395a48f3",
    "4de739cf07804af0be1c5420a5aea6e7",
    "2f3c55901805489ab47b7cb657ce7a7f",
    "a7d94be098c0431ba2761a1a0a09487a",
    "ecca494ea72c4ec99cec9b541ca43cee",
    "98e07527d4c148bd8306e5079d761cf3",
    "2b7dc300b0424066a9f7c4ddfcb8dee8",
    "a0ffbc5eaf2142f895906c85f071e60f",
    "87f74ace4b2d42c5bb99fe0ce2be8c77",
    "7272b4b4ccf24c1caa91df30d2f0a400",
    "cc38b884eed94b299b93c1250437b14a",
    "0caad4445f1f4ec89bb5f3ca1c40e76c",
    "4715dd8d34ee4d1da7c216e39c8cb757",
    "b4a01e9066fd4b95bc0c60a526f61c75",
    "35319a6abe894a55b1a07b7fbe3b8042",
    "e738cfad8d2e4244b504fcd82fdc42c9",
    "d5ca6b3c33024025ab2e523725686479",
    "a3feedb53aa04e9ca3e151a1333f532b",
    "2ba9f8db763842b990f220a0875c989d",
    "6391f9261f884a12ab6bf320673165bc",
    "3eb2c5bd8ac94663aa63789511e30eb1",
    "4c13f49075e64b21944db306ad6e3658",
    "d2c7271d878b4f659628007ef852fce0",
    "edcda7f2db0641449b0cc721d6a966a6",
    "18d93071150c49b7814f689e0c294f70",
    "449240c20ad449f7b9f0d80cefe8bf56",
    "823d62d5423a437a9800b6bea5c9c2ca",
    "e40d66cd0ac94835a580f876a7d83fd1",
    "2c9d2f8e390f4daf9ddfb7b334748d46",
    "5d6920e3c89e4569bf535ed3004c2085",
    "f1e322b121b740c0ab658cc584f135b0",
    "486b29c49dc34018b10b452348b7e929",
    "a7704de1176346b9a253cc3fdb823c8d",
    "bbaa3a5c5c8d4225a4127110e596313c",
    "9bcd0a5b09cb4040bbc15198142f1486",
    "9d561aaf60f24115b3aa03f9e06dfca6",
    "c759c54519b14541bc314ca4136cd16d",
    "939c11ba444d444891f6202e6fa2cfdd",
    "613875fed9d047ba8d3ac218f83a9697",
    "ecf679fd851443a88763ea8aed7fc0b8",
    "6c060742c1904ff1af0053818f50af3d",
    "33951aa85e374e3fbce656b767137b46",
    "ad0cd9a80dfe49368eedc31b1d19cc67",
    "4709cd3b2f504658b11087c6823efb37",
    "93d7cd84f8ed433994ee6e7adbd08983",
    "19c8c557a42242939024f15c4e514498",
    "f5508b66ef9c4d1987ff5eafe093821a",
    "1ea5ce9afdd645f29682824a52599e8d",
    "04ce317c1f7647299c1499ebb1d0d70a",
    "cca7cc264a2b496d84414e4101f217a1",
    "70165f1f993a4e72b5b00735e4bb7d04",
    "93e2c18a052447208fe78645b0317dcd",
    "599823de50b64a7d822b4401e107b1b0",
    "dd92842eec6b4f24b93f58fe0edaccb0",
    "f3ad71df9c034f2ba7372a496f55fb42",
    "428a2327b75b4133ae324ff4c33d38a0",
    "c8fb05044d6d497eb668c3060c49a2e4",
    "b18bec7121da406c9ce479ab17f5b51e",
    "4c7d52a8bc58407baf34e78dd562ff5f",
    "9ce9116b61b5487199d61c922f991c00",
    "1f55a47cf2a744fb9609ee147cb5c701",
    "41b719e536674fad931c9293fc134b1b",
    "3182b10e7a554dba83e6eb62902625a9",
    "41c110be1ec645768ec8800419c2df27",
    "a3511ba427b34f4480bbfc56c8aae6e7",
    "147a9e5762d24f79a5d2779db56b79dd",
    "efd0bf182a2a4853a84a9f84daa01dd4",
    "80c648f06bec4969a3d7d64f40d23969",
    "98a1fecf89cb466c9a5c39430b8023d0",
    "81714246bf394fcdb80b09ddd1d21a68",
    "827094b9a0d64c26ba8953e4c4287cf5",
    "65e31a4fb56f471f8cf84570f86b1477",
    "c91b3bd90ee5482f9ee540939c3c42bc",
    "3a5e7a05aba94b31a7eb497c4059c50b",
    "858fff0c7c334c4e82e2c7f0cfad45c5",
    "c69b062803854751b8b208975b6405e7",
    "6412ff64dbbc4bfb884ccaa015f78a51",
    "d4684c97929d43dfb8b2dd8c6db13be9",
    "eaea8875e8e84749be1dbde3db60ed48",
    "0fca8e882d254d129c1becc463d55ab8",
    "b5219073dcea4d57932541e1d8561cb0",
    "3029f9e9faf8440e825a1237a5c68172",
    "acbcae7ee2204e82b498fdfd0d01a409",
    "41dfce92c686409cac03943c74e900af",
    "844604f8a7f940ee80a12f7daa1f80ad",
    "2219c0b6253d4283ab61ff153988efbf",
    "937d78cec74f4e45ae18e023705fd851",
    "15fe3efec115445880869dbd2688645f",
    "55384dfcbe664cf7a7088d89d1afc464",
    "f51b5e93f8914bb8922c98582143a431",
    "294db966312948a4a78c71438e53974f",
    "fadd7832312541d28ca2439566acda5e",
    "66f87d0f04f04138a6e64425852e70cd",
    "531f465727e74b5292ab7e4b84c4b810",
    "e12730cdc2e24b73a7de2d38fcd45590",
    "dbbac02679fb4f90a9eb0f4c53ce26a5",
    "495a3c2d219a4ea08e7aabdcf2ecb578",
    "223af331a66a4408a959a04145355cc6",
    "af10fbd3ec0c4a1088de23839b74efb0",
    "ce4f4cea125b41468f71803e73063278",
    "7439e98244e44a38a67e769d6e31913f",
    "89f9ba28548a48b7bd339f3c20469bd1",
    "4e25bf1616894908a22601205714e28f",
    "a4cea15e12e74b7c8fc96adc17725772",
    "420fe344948c4912affa5d4c94e84a95",
    "5b3a236b5c6e4d998adfdafa5ef5c897",
    "9cf1a7bbdd6d4a67bce2b16166e05a48",
    "b75b394e3066452d9f1d57175567b173",
    "0964ecf802fa4578a46b35ac9273e158",
    "6a52f75bb96c41f7ac979ef5cc41ced7",
    "6e3c5d6c23e745248c8bf8ec7b57d44b",
    "8d89c8d64d1d4ba884a3706b23938bca",
    "5dc9fcc62c724599a9d76f8e33f753c1",
    "6ff596c8cbfe448bbc589e4e72be01ba",
    "e7667c23889249a987009202c48cfe23",
    "b09c1c257b204a98bf9e29c5c1b5d164",
    "f403d7ae443048f9bffa8d85e4a2ad0a",
    "88afce9eb671465ca050b431b004764f",
    "b09c109bba114bbfa853c72179d34474",
    "321d4e2d9c9a4765852280f52e45b5a1",
    "1367f751ec5b40fabc74d29feb766f16",
    "09ae40074f9b4c378a1f8d2a51cef279",
    "f6035e5788b2407c8cfe80a95de14bff",
    "1de347bdc3e445ceb20258d9646ee70f",
    
]
let lz_cookie = {}

if (process.env.ACTIVITY_ID && process.env.ACTIVITY_ID != "") {
    activityId = process.env.ACTIVITY_ID;
}

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}
let removeSize = process.env.JD_CART_REMOVESIZE || 20; // 运行一次取消多全部已关注的商品。数字0表示不取关任何商品
let isRemoveAll = process.env.JD_CART_REMOVEALL || true;    //是否清空，如果为false，则上面设置了多少就只删除多少条
$.keywords = process.env.JD_CART_KEYWORDS || []
$.keywordsNum = 0;
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for(let a in activityIdList){
        activityId = activityIdList[a];
        console.log("开起第 "+ a +" 个活动，活动id："+activityId)
        for (let i = 0; i < cookiesArr.length; i++) {
            if (cookiesArr[i]) {
                cookie = cookiesArr[i]
                originCookie = cookiesArr[i]
                newCookie = ''
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                await checkCookie();
                console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
                if (!$.isLogin) {
                    $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                    if ($.isNode()) {
                        await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                    }
                    continue
                }
                authorCodeList = [
                    'b5d9535918264a4f92fff9d314d7db81',
                ]
                $.bean = 0;
                $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
                $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                $.authorCode = authorCodeList[random(0, authorCodeList.length)]
                $.authorNum = `${random(1000000, 9999999)}`
                $.activityId = activityId
                $.activityUrl = `https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2/${$.authorNum}?activityId=${$.activityId}&shareUuid=${encodeURIComponent($.authorCode)}&adsource=null&sid=&un_area=`
                $.drawInfoName = false
                $.getPrize = null;
                await addCart();
                if($.drawInfoName === false || $.getPrize === null){
                    break
                } else if($.getPrize != null && !$.getPrize.includes("京豆")){
                    break
                }
                await $.wait(3000)
                await requireConfig();
                do {
                    await getCart_xh();
                    $.keywordsNum = 0
                    if($.beforeRemove !== "0"){
                        await cartFilter_xh(venderCart);
                        if(parseInt($.beforeRemove) !== $.keywordsNum) await removeCart();
                        else {
                            console.log('由于购物车内的商品均包含关键字，本次执行将不删除购物车数据')
                            break;
                        }
                    } else break;
                } while(isRemoveAll && $.keywordsNum !== $.beforeRemove)
                if ($.bean > 0) {
                    message += `\n【京东账号${$.index}】${$.nickName || $.UserName} \n       └ 获得 ${$.bean} 京豆。`
                }
            }
        }
        await $.wait(3000)
    }
    if (message !== '') {
        if ($.isNode()) {
            await notify.sendNotify($.name, message, '', `\n`);
        } else {
            $.msg($.name, '有点儿收获', message);
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })


async function addCart() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK()
    await getToken();
    await task('customer/getSimpleActInfoVo', `activityId=${$.activityId}`, 1)
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', `venderId=${$.venderId}&code=6&pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=tg_xuanFuTuBiao`, 1);
            // await task('wxActionCommon/getUserInfo', `pin=${encodeURIComponent($.secretPin)}`, 1)
            await task('activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`)
            if ($.activityContent.drawInfo.name.includes("京豆")) {
                $.log("-> 加入购物车")
                for(let i in $.activityContent.cpvos){
                    await $.wait(3000)
                    await task('addCart', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&productId=${$.activityContent.cpvos[i].skuId}`)
                }
                $.log("-> 抽奖")
                await $.wait(3000)
                await task('getPrize', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`)
            } else {
                $.log("未能成功获取到活动信息")
            }
        } else {
            $.log("没有成功获取到用户信息")
        }
    } else {
        $.log("没有成功获取到用户鉴权信息")
    }
}

function task(function_id, body, isCommon = 0) {
    return new Promise(resolve => {
        $.post(taskUrl(function_id, body, isCommon), async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {

                    if (data) {
                        data = JSON.parse(data);
                        if (resp['headers']['set-cookie']) {
                            cookie = `${originCookie};`
                            for (let sk of resp['headers']['set-cookie']) {
                                lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                            }
                            for (const vo of Object.keys(lz_cookie)) {
                                cookie += vo + '=' + lz_cookie[vo] + ';'
                            }
                        }
                        if (data.result) {
                            switch (function_id) {
                                case 'customer/getSimpleActInfoVo':
                                    $.jdActivityId = data.data.jdActivityId;
                                    $.venderId = data.data.venderId;
                                    $.activityShopId = data.data.venderId;
                                    break;
                                case 'activityContent':
                                    $.activityContent = data.data;
                                    $.drawInfoName = $.activityContent.drawInfo.name.includes("京豆")
                                    break;
                                case 'addCart':
                                    console.log(data.data)
                                    break
                                case 'getPrize':
                                    console.log(data.data.name)
                                    $.getPrize = data.data.name;
                                    await notify.sendNotify($.name, data.data.name, '', `\n`);
                                    break
                                default:
                                    $.log(JSON.stringify(data))
                                    break;
                            }
                        }
                    } else {
                        $.log("京东没有返回数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function taskUrl(function_id, body, isCommon) {
    return {
        url: isCommon ? `https://lzkj-isv.isvjcloud.com/${function_id}` : `https://lzkj-isv.isvjcloud.com/wxCollectionActivity/${function_id}`,
        headers: {
            Host: 'lzkj-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkj-isv.isvjcloud.comm',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie
        },
        body: body

    }
}

function getMyPing() {
    let opt = {
        url: `https://lzkj-isv.isvjcloud.com/customer/getMyPing`,
        headers: {
            Host: 'lzkj-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkj-isv.isvjcloud.com',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie,
        },
        body: `userId=${$.activityShopId}&token=${$.token}&fromType=APP&riskType=1`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                    if (data) {
                        data = JSON.parse(data)
                        if (data.result) {
                            $.log(`你好：${data.data.nickname}`)
                            $.pin = data.data.nickname;
                            $.secretPin = data.data.secretPin;
                        } else {
                            $.log(data.errorMessage)
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }

        })
    })
}
function getFirstLZCK() {
    return new Promise(resolve => {
        $.get({ url: $.activityUrl }, (err, resp, data) => {
            try {
                if (err) {
                    console.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function getToken() {
    let opt = {
        url: `https://api.m.jd.com/client.action?functionId=isvObfuscator`,
        headers: {
            Host: 'api.m.jd.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
            Connection: 'keep-alive',
            Cookie: cookie,
            'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)',
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Accept-Encoding': 'gzip, deflate, br',
        },
        body: `body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code === "0") {
                            $.token = data.token
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function random(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}
function requireConfig(){
    return new Promise(resolve => {
        if($.isNode() && process.env.JD_CART){
            if(process.env.JD_CART_KEYWORDS){
                $.keywords = process.env.JD_CART_KEYWORDS.split('@')
            }
        }
        resolve()
    })
}
function getCart_xh(){
    console.log('正在获取购物车数据...')
    return new Promise((resolve) => {
        const option = {
            url: 'https://p.m.jd.com/cart/cart.action?fromnav=1&sceneval=2',
            headers: {
                "Cookie": cookie,
                "User-Agent": "jdapp;JD4iPhone/167724 (iPhone; iOS 15.0; Scale/3.00)",
            },
        }
        $.get(option, async(err, resp, data) => {
            try{
                data = JSON.parse(getSubstr(data, "window.cartData = ", "window._PFM_TIMING"));
                $.areaId = data.areaId;   // locationId的传值
                $.traceId = data.traceId; // traceid的传值
                venderCart = data.cart.venderCart;
                postBody = 'pingouchannel=0&commlist=';
                $.beforeRemove = data.cartJson.num
                console.log(`获取到购物车数据 ${$.beforeRemove} 条`)
            } catch(e){
                $.logErr(e, resp);
            } finally{
                resolve(data);
            }
        });
    })
}
function cartFilter_xh(cartData){
    console.log("正在整理数据...")
    let pid;
    $.pushed = 0
    for(let cartJson of cartData){
        if($.pushed === removeSize) break;
        for(let sortedItem of cartJson.sortedItems){
            if($.pushed === removeSize) break;
            pid = typeof (sortedItem.polyItem.promotion) !== "undefined" ? sortedItem.polyItem.promotion.pid : ""
            for(let product of sortedItem.polyItem.products){
                if($.pushed === removeSize) break;
                let mainSkuName = product.mainSku.name
                $.isKeyword = false
                $.isPush = true
                for(let keyword of $.keywords){
                    if(mainSkuName.indexOf(keyword) !== -1){
                        $.keywordsNum += 1
                        $.isPush = false
                        $.keyword = keyword;
                        break;
                    } else $.isPush = true
                }
                if($.isPush){
                    let skuUuid = product.skuUuid;
                    let mainSkuId = product.mainSku.id
                    if(pid === "") postBody += `${mainSkuId},,1,${mainSkuId},1,,0,skuUuid:${skuUuid}@@useUuid:0$`
                    else postBody += `${mainSkuId},,1,${mainSkuId},11,${pid},0,skuUuid:${skuUuid}@@useUuid:0$`
                    $.pushed += 1;
                } else {
                    console.log(`\n${mainSkuName}`)
                    console.log(`商品已被过滤，原因：包含关键字 ${$.keyword}`)
                    $.isKeyword = true
                }
            }
        }
    }
    postBody += `&type=0&checked=0&locationid=${$.areaId}&templete=1&reg=1&scene=0&version=20190418&traceid=${$.traceId}&tabMenuType=1&sceneval=2`
}
function removeCart(){
    console.log('正在删除购物车数据...')
    return new Promise((resolve) => {
        const option = {
            url: 'https://wq.jd.com/deal/mshopcart/rmvCmdy?sceneval=2&g_login_type=1&g_ty=ajax',
            body: postBody,
            headers: {
                "Cookie": cookie,
                "User-Agent": "jdapp;JD4iPhone/167724 (iPhone; iOS 15.0; Scale/3.00)",
                "referer": "https://p.m.jd.com/",
                "origin": "https://p.m.jd.com/"
            },
        }
        $.post(option, async(err, resp, data) => {
            try{
                data = JSON.parse(data);
                $.afterRemove = data.cartJson.num
                if($.afterRemove < $.beforeRemove){
                    console.log(`删除成功，当前购物车剩余数据 ${$.afterRemove} 条\n`)
                    $.beforeRemove = $.afterRemove
                } else {
                    console.log('删除失败')
                    console.log(data.errMsg)
                    isRemoveAll = false;
                }
            } catch(e){
                $.logErr(e, resp);
            } finally{
                resolve(data);
            }
        });
    })
}
function getSubstr(str, leftStr, rightStr){
    let left = str.indexOf(leftStr);
    let right = str.indexOf(rightStr, left);
    if(left < 0 || right < left) return '';
    return str.substring(left + leftStr.length, right);
}
function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36)
        }
        return uuid;
    });
}
function checkCookie() {
    const options = {
        url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
        headers: {
            "Host": "me-api.jd.com",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "Cookie": cookie,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
            "Accept-Language": "zh-cn",
            "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
            "Accept-Encoding": "gzip, deflate, br",
        }
    };
    return new Promise(resolve => {
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.retcode === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data.retcode === "0" && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
