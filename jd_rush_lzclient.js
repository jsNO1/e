/*
https://lzkj-isv.isvjcloud.com/lzclient/12345/cjwx/common/entry.html?activityId=xxxx
*/
const $ = new Env('超级无线店铺抽奖');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let activityIdList = ["ac9c35848ce443fabe387de6260ad25c",
"6cc3d601cabe46cdb6e859dd43ee79fd",
"861ded0c2d494c05a1b6cf926ab4bf6e",
"7464f97ac7fd4abaa7446e26585b4165",
"6221f87ad80c4e14b32a4c2006c4d64e",
"2f04f17499fe46dfa8a1bc20168a88d0",
"9fe4d506015c47c5b50fc66355bcc03a",
"6bd9a01b9d7b4d9abda78feb4b41a68d",
"66c284d636094aeb85e50d00fda6c355",
"bf97de7b5ef14444a1db4a52d90a689f",
"31a20922150944419223261bd5cb3c30",
"80aedf4b8326429b994f5020fcdd66f8",
"34b8a44cd0a841f0b2e30e5e94df9175",
"171b0e63772c4f2abbec9b86d880a8b6",
"59a6ce9cb2184e8d91f4bdfc954078ef",
"5d4ab0a9745f46fab92cee872344742d",
"e82d3b7fdff646a0b946d796e50cb06d",
"f0ae36d309714c42b9a1e39232d23fc1",
"aa4a68f4c5d945a093c02ebc65092a9c",
"83af5cf1642d43a2829bcd5b5bf24d98",
"e937ec3400fd45bba132b443aed33b9c",
"cd77f097eece46f5be4fc727f8937d8b",
"831a0a5597654904bb89e443a2ee636c",
"1d4a5a55aa5f448683367b3c74941026",
"58b32d544d7249a78fc1325cae4aab80",
"eca4fb4f002c492286a0e3b3b40344db",
"ea94905698be4efaaf067c46247761c1",
"b70855dc33204afaa4c1a72e9af5a0af",
"c10252d4bfdb443fb68b91c73b7b1aed",
"bb4a1fb4cc5947128708b15ba46736b2",
"03f4b6704f554858b932a90c86ae939d",
"5ab94723790f40fbbe2a8c44615cf4b6",
"2af5c28cf9ca4df18e04bd8b5ecdc742",
"b9e0d5f49d844ca49078a4b1cded84cd",
"5144b53d3f35422f9f99997a8dc15d8e",
"23ef8e38a9834e55a6d62a619e03da26",
"cb0550f6eca641d1a65aee07045dcdb1",
"5a001ccff98348b0a4a51bdb531d8ce0",
"eb41118521d64c36961d2664eedc53fc",
"80f3b4d2d1f14e7b91bed42cbc7c3a88",
"7eb74fbb8e744e9485f8be83538f6ef2",
"9e627826a649461d80ab889f63ed6295",
"e03548e9007d4e4fbe86da42607e3e12",
"432d695174574e9e857fb5f0528c56b4",
"c9232db164fc458a82b33acce4a5099f",
"5ac00dbf3d644937bc02e9e9b6fc963d",
"14abf1d4b013486886e9a6ac09176a03",
"e22b03bbdd0b4d85b2eb49d967c66a32",
"fa410e75cadb4fb2a5574b482f64e740",
"5e65abb788264ccca156e7bb6b17f9d9",
"5915ce2b353b450390a37296c6513949",
"e9df5535283147fea669d70ffa12f8d6",
"a9d6ec7380124aa88e7e0382bd3b7890",
"202ab46402ea4ecc8a6f1fe11d6eede3",
"bdb8ef20ed454df191b30507acc50bfe",
"1af768015c2a4aae93ba9456ff08558e",
"02f10f8ccf6b4d229332a1d638e56625",
"8e6a58ffc1d74288ac8ca8df3ff86e11",
"fa4e04f170f54f7294611287366d91ba",
"abd274b5c22a4f548be1089f09f1f940",
"f8d3d104aeae40bdb78182ba72133f68",
"b75d8608ae5146bf9091b429bfa31342",
"03d469e8b7344a96a8f8dc6cf9a57eb7",
"979b50989c0643a5a05ca5592264cb64",
"cdcf89898b3b4fe09073cb1a40278c59",
"952f7c57ffa442248dce9ab67051032e",
"d88fd513d84a4fe3bf844b899bbbb4ab",
"be069c8a68134917816055688f427a8f",
"36740de8b4f34098a9feffb78c414651",
"e0210a2990754b05aa9c1fdd461d3f43",
"3404874c928a4f01bcd5a0061a24c523",
"a0849da30a9d427b9b3818208bd4d7b3",
"fa6ab1f6d1ff4c1289d1c6065b4dc6e9",
"3960691d96554bf4a9f1eb660c49e8f2",
"885ff53911c640dcb87b9315e7373b61",
"26dbf4436745462c84d87da951306d0c",
"2fa453d5d30f456b90b6db9c099bca9e",
"c41f36be61654fcfb36c224e80ff3ec5",
"545519c61d0a437c8b205321e592c16e",
"86a831fc6e2f4d948359eb27440219e6",
"43627d62437f4f70b5b6ec4a09090b31",
"e122ff411739425e9b9a96aa638f98ba",
"7403f80bd5bb4d5e9df10269584a6cb6",
"c6539155e25e47b3940462b74bc93cde",
"cc4ab1db22474fa6a581401e19b022bd",
"a73be20d088e467bbdadacb95bca778d",
"160e9a648e4e4539b96a9d1a64f20683",
"9950397d43b84edebaa9383e015ac439",
"57c2ae4844954aa6b6f8e5b266a85a32",
"e871e82ecf1644d3be9c69139153182a",
"c8f3558910d64861b5551988010ce7cb",
"d456a0dea24041d9a1baa2ffd7b0f6d9",
"888237fdced849fda155cf2450a12e4f",
"94fdedeb41774b8584b8dd452622a5f4",
"f4d8dc3b77fb40cba4b7b07bbd98eb0b",
"9e7a7053f7ed484393dfc3809a593b09",
"71d5bd9464b7483892e493971050080c",
"1a721a109801429cbab2d42d929724b8",
"fe4d03639d3c49b0bf9eb749647f2f3a",
"3618aea34915462590e9b17351571443",
"668109d933954187a4dc9f57e932a7ad",
"3fd272067caf4f66bbb39c3ae2fb5fa7",
"437961dd16724ecfb990e50599a6430b",
"4323698a1ad64589a0a0d8e12e78b737",
"a51d2c820cc94352a1b1ced3213bba94",
"469c096599fc40529e6d0a4596d656dd",
"398ce9fb9a7c4a08b5c9b556c619910e",
"d31643a59877456ba5e106b5646996a3",
"8d06026ff2fe4afeaa1b52ef9e477866",
"d453930de64543bca53a6553826a0fa4",
"b41d48722e7f4355bf7dfe41c5e077f7",
"2e652f5c2f2942e5821806842812a99f",
"c9f752ca2b7d4c73a0269227543d5f86",
"76ef484731c84fa6a5445c075bebc38f",
"3814eca80f8c47aaaf08882921627c13",
"f98ad913255d408a81ed6c1b57e0e426",
"d9c339fb5ef347eca1c5ab8a998e1b7d",
"94169c1906034381ae1de2b48a97ddba",
"eef1ca37dc414df1b7ab4de8e1b18ef7",
"b2f1542513704664a2753ba82efdaf98",
"44fb0ba99cf24b52aab692d00e79609c",
"9a2378bd71084e63a9cc0f5f645d75b6",
"7f2bdb9e26094432b11fbac59dbac238",
"b79ad9cf39c64edba7301891708aa276",
"71110c5b927a47df83e4a71fddab409a",
"0f2201aa5c334496b13a88326c54f451",
"32d1fa8a41154de8bc11c030c2baf4f5",
"3c0a206ed6d74ca5999f30fbf400f054",
"e16ae36d1f514ea0b0a3b4474d5c3e7d",
"8567007282fb432e8c816523c26d8f2c",
"ed617e5123fe4896a61a724515befdce",
"192d3a6db88b468b89952e5785b21474",
"916b792c3d3042d8a6371d8917919a76",
"3accf0b42b654db995f844a3ec8580c9",
"641a9aad57b3448f836da1fa0402dfb2",
"fc44e5ddc29746b1b5400bf6aea5d98f",
"1ddb125b9e2e48f1ba773ecda780fbba",
"51b056d1b8424ce58b896cd4f0e2e263",
"5433550d0cbe4115bcb03a8966dffd5a",
"df7e00f3fc3c445ebbe7d15be717c1d4",
"0b3d7cc7021b45d7b485d5f002697b2c",
"dc93f66e0a63427a82a1432575d744a0",
"636041d520b540b08ef6f6627ca0e183",
"e1e97e7d5a8c4164be41181fcd38265c",
"d01668019a0a44c29738605d419f8add",
"48c8bd39170144239716f28162fe1f85",
"e411e2e280b74146a2d1bdf325ac83e1",
"10dbfbdfe87341e4ae97e63e35f7d27f",
"04183342396e40359294b9e7c97472dd",
"290477d8fd464abfb852d89880aa0f9b",
"7d55a823107b48b09296eefa3fbc64bb",
"0b2c62813b544e268ec8aa8582cd44e6",
"e7629e911a4a48008a87b9febec2333c",
"bab9fcf1d5e94645a298b23c908a1d87",
"65572370bb5241eab0b55953042ca9c4",
"e4f5576c6a4442d9904d7b16efc351a7",
"373d2e398c584bf4b931807503b15aa9",
"259e83a6499a4f4392b1a511fc3ef5b7",
"9df4f803fa1d4a31871892b603f54367",
"30fe7a9401e6484bb970cd0664a66cc1",
"0188d1cad5d0453e9cd5bf375120bd68",
"b5789b2d1f274fab8de4d5c5557984a2",
"e9969e16777b457093285cdaa8458167",
"96f0444bcdaa4444b15d5438fa684986",
"8fdf8ea3cf4849f48228cb49dd98e539",
"5363507712fc4eb7a1a9c3d69f2d8eba",
"e27f035ccf9d48a39edaaccdd02a81c4",
"d9c1559ba75f484b97617add2bc31449",
"a447d9a9d86c49f596d43a7738055b28",
"204437ee32984460ac3ce993340b84e8",
"3b2f0c98ea9649c0a2d22659be733e7b",
"dacee8d1755241cabb53b96b2b538a20",
"fe3f6306e21a4b999118ad81d7f653ca",
"f188a4542231476b87224a88aecb40b8",
"26249be5dcdb4886a34cd82e83c57ff0",
"848f30973da3476b961ec842a37491ab",
"9af3e6ed1d024522bd25237b1730f1e7",
"7e9404c783954e87819db6123653eb9e",
"b2332bd9abf14c6c89c186ac861f1e0a",
"7e0acf2da0094e95902a479f833c27eb",
"65b5f417e0974f7ea85f5168fa7de68f",
"efb3f047a6b041fab7d390cd2304d31f",
"6a2197dc86be4e23b8f9fb9f4bcb58d3",
"b40d05d2bfaf44c0a9c03a128c1f7fb1",
"83b9aa4887394cd8b23def9d2e9a5053",
"184db0b504a04ad0b2a15d52acd61f90",
"2a800b3ea87648c6ba51c5f3d6818a2f",
"acebf238b5f848d28f2f64ef920512d3",
"f5409279ab184a06918505606661f473",
"781042262fe145ea8f375cc60658f858",
"1cee616be041455e860757a527d51a67",
"a779b21da24a4b61932d1a4c7cd34677",
"0e9bded5e65a4eba9615f022cbe21d73",
"c5eb710ee915443399e4085bb34de956",
"c421dcf40da64af2a5717cf724d54e39",
"f1d00203f551443e8232f0f10aacfe57",
"6e8d5de295f74f4cb61589e54724e166",
"197f760c31a04f1091c4a8b52d633367",
"4bff367348a542d5aec867ae3e0517af",
"d907d8df84c14a17b8d9b7c07597ee0d",
"689431fd617a4b8baa5a02784301f69f",
"73326d76d38440c6b078cda8fc2cb096",
"dc5fb844880b484588ca016a27008619",
"ee7166ced99740b8af1b9b6be9cbbdb4",
"e37b2833cfdd4556a012c302b92e8a5e",
"3af108717a9049eba206f7ad1f7d7398",
"be84f936239a4f4e96f14a05ec43dbf3",
"12761d7813be43379a8c64f6f565674a",
"3c6b0b734c504dafac9327d2b9a59b4a",
"4d20c46746e94151bc84dce4dfcc7b79",
"4f5dcc84d65e4f22baca91115a8c5c63",
"ed034e2b2e584a10b768cb17f66e92f3",
"2b4ba226965f49dca17369b0c1121bf7",
"3d39555ec8244217a8b0fb2f14194154",
"fbfaac071dc443d5bcbed4857b0150c2",
"0be311068977476d8fc996993e8907e5",
"888c3618b939485b9c8b9653153cbaf1",
"b73dd8762caf4333b4526df7bad63f95",
"d66217abe2354c35907744b67f12c430",
"0ddd8d0fff294905a0b8694955aad966",
"9600b49759534fff979b5d0141d451c8",
"e1f5d9c5091c4b19b314b1b40717c5a5",
"62a7171445ab44ad8443bf5baef3677f",
"1b5488e7f2b6464fa8489ada299a1c31",
"a0237f891568468e942eb5d149383a28",
"0b83448fad18471890fad8e2380663ba",
"68f50c753e894ab293025ec5147dc579",
"b8091eebdf1942d29918829b87b5b962",
"b6b1ab1065c54911978356fe88f45280",
"0cd8252ed98a4c2a8fe4348946c4c58c",
"02fccb2789714318924eb9e95c3307d3",
"ddc04a90972e40e7add75eaa4a0f7ea8",
"46cb76981bb64fd4944e9cfcc0fb74f9",
"6c6488b377e94041a75d472bd79ec5ec",
"1fe62296c53f41cd93db1d85b504bdf6",
"dd398f8f9cf44a3c98da3bde04eb0861",
"7d3b02b984124ae99b7950f55b98eddf",
"4f262971b9834a20b4cea72faac45957",
"1001390dfecf45e1a52ea159d22ed8db",
"f38d662630884025b80ab11ab79b2ed8",
"b9d78202f1024b73b439bd61db7e3cac",
"bee434b963f7419e8d9fcd01dcfec155",
"a5cade8573db4e4fabb8643ca61c6647",
"b9e272a7420244238fbb11ff464443bd",
"c5d905b6bf204e96922e5f7b54aead61",
"a711ddba9c104229961dbb4268bbc70d",
"fb2e35e4eea84ae4bd7298215a93d90b",
"6e3592173d3a4402b75f292cb663e049",
"8647be89d2814a7988e925c51a8abe7c",
"0c07d194aef040edb049451a871cfb45",
"5edccb384a084d6f938be6858d1055f7",
"8dfca56927a64ab5840ed7bbb26c7765",
"63776f600117410ca3e6fc5262602593",
"9df60d0f77054513a7b62763a4bb91ca",
"c9bf3035b3994391800ce01057bc027d",
"eb4988f5165b421e966b965dfb74df48",
"1000a8fc76c447de8997b7b53f105f4a",
"0b9e0fd24df24973a1d94f1a8c8a9fcf",
"961bafe3844248e9bc92827242e851bc",
"2f0ab489d33443ac91ecf28c23da50d5",
"9191b5b7d50547f4949b2a73ac682ce9",
"ef6cf8f93c084818becb5649425f0586",
"51209333345a4e95aa1765f06887ce42",
"66594565ccfa4298aee8fb371630da01",
"cad228ac0ad1466daa315acc551ddd56",
"75f2935f2b57410a868ab13946c3d177",
"6d9f13b12ccd4c918f0936807607c3eb",
"afd4ca2dbdc44e2d99b1ac0ae1715219",
"aadaf95ac6ee4b43b5a7c3372f9297cd",
"293fabb903794157b18178381f3c6db6",
"6acf960196274f20afb771016f88d125",
"ad858c99d8024b05b267eb7e3cb669af",
"42bd26eceac842a3aacf387f39ec42a2",
"28f9a179689745ec8d572186dd102620",
"fe6bc0b8b70d4fa8ab84b7590e9662c3",
"75d2886248e14feab691c8d2f9f3a5c7",
"55ce288ec8a64de6a3bb9e49b1c7d013",
"7cdcdece23ad44fcbeedc31667f97ed7",
"3f110452894a4652985ab29c167f1b92",
"12f51073376e412aaf63b305fe4717f1",
"587a413539824c14bb161545fb076108",
"275ac47d0ba949a2a9b21d2b0212dd85",
"32bc38d504684fe28a29ac1a126cdf58",
"9352fab4a36348aa8b0115c2f34f2a37",
"a490692a5c114822b764b1d299bfac7b",
"79fe9fd9b95841d99b6ad3b4d522a35b",
"9d76287ef6a64106ad6a07637eddf39d",
"bfa0c645aaaa4976aaaa603dbd992d7d",
"955e5f35b52441b7b36e4a66697b2a2f",
"e7d8c7866c2e429282e7c66a8ea8c08c",
"ca85b623a2434a638cae0f935a7ecfe3",
"5460e0feb4ab49ae9c6ce605f65dcb48",
"6abd6e78e1b8496cb907da5fb25d5780"]
let lz_cookie = {}

if (process.env.RUSH_LZCLIENT && process.env.RUSH_LZCLIENT != "") {
    activityIdList = process.env.RUSH_LZCLIENT.split(',');
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
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    //activityIdList = await getActivityIdList('https://raw.githubusercontent.com/FKPYW/dongge/master/code/gameType.json')
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
                $.bean = 0;
                $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
                $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                $.activityId = activityId
                $.activityUrl = `https://lzkj-isv.isvjcloud.com/lzclient/${$.activityId}/cjwx/common/entry.html?activityId=${$.activityId}&sid=&un_area=`
                await pandaDraw();
                await $.wait(2000)
                if ($.bean > 0) {
                    message += `\n【京东账号${$.index}】${$.nickName || $.UserName} \n       └ 获得 ${$.bean} 京豆。`
                }
            }
        }
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


async function pandaDraw() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK()
    await getToken();
    await task('wxCommonInfo/token', `activityId=${$.activityId}`, 1)
    await $.wait(500)
    await task('wxCommonInfo/initActInfo', `activityId=${$.activityId}`, 1)
    await $.wait(500)
    await task('customer/getSimpleActInfoVo', `activityId=${$.activityId}`, 1)
    await $.wait(500)
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', `venderId=${$.venderId}&code=${$.activityType}&pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=`, 1);
            await $.wait(500)
            await task('wxDrawActivity/activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`, 1);
            await $.wait(500)
            await task('wxDrawActivity/getGiveContent', `pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}`, 1);
            await $.wait(500)
            await task('wxActionCommon/followShop',`userId=${$.venderId}&buyerNick=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&activityType=${$.activityType}`,1);
            console.log(`抽奖`)
            await $.wait(500)
            await task('wxDrawActivity/start',`activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`,1);
            await $.wait(500)
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
                        if (data) {
                            switch (function_id) {
                                case 'customer/getSimpleActInfoVo':
                                    $.activityId = data.data.activityId;
                                    $.jdActivityId = data.data.jdActivityId;
                                    $.venderId = data.data.venderId;
                                    $.shopId = data.data.shopId;
                                    $.activityType = data.data.activityType;
                                    break;
                                case 'wxDrawActivity/activityContent':
                                    $.activityContent = data.data;
                                    // console.log($.activityContent)
                                    break;
                                case 'wxDrawActivity/getGiveContent':
                                    console.log("抽奖次数: "+data.data.day.giveTimes);
                                    break;
                                case 'wxActionCommon/followShop':
                                    console.log(data.data);
                                    break
                                case 'wxCommonInfo/token':
                                    // $.venderId = data.data.userId;
                                    // console.log(data);
                                    break
                                case 'wxCommonInfo/initActInfo':
                                    $.venderId = data.data.venderId;
                                    break
                                case 'wxDrawActivity/start':
                                    console.log(data.data);
                                    break
                                default:
                                    // $.log(JSON.stringify(data))
                                    break;
                            }
                        }
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
        url: isCommon ? `https://lzkj-isv.isvjcloud.com/${function_id}` : `https://lzkj-isv.isvjcloud.com/wxDrawActivity/${function_id}`,
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
        body: `userId=${$.venderId}&token=${$.token}&fromType=APP`
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

function getActivityIdList(url) {
    return new Promise(resolve => {
        const options = {
            url: `${url}?${new Date()}`, "timeout": 10000, headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                if (data) data = JSON.parse(data)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function random(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

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
