/*
宠汪汪强制为别人助力（助力一个好友你自己可以获得30积分，一天上限是帮助3个好友，自己获得90积分，不管助力是否成功，对方都会成为你的好友）
更新地址：jd_joy_help.js
更新时间：2021-1-21
活动入口：京东APP我的-更多工具-宠汪汪
目前提供了30309位好友的friendPin供使用。脚本随机从里面获取一个，助力成功后，退出小程序重新点击进去开始助力新的好友
欢迎大家使用 https://jdjoy.jd.com/pet/getFriends?itemsPerPage=20&currentPage=1 (currentPage=1表示第一页好友，=2表示第二页好友)
提供各自账号列表的friendPin给我
如果想设置固定好友，那下载下来放到本地使用，可以修改friendPin换好友(助力一好友后，更换一次friendPin里面的内容)
感谢github @Zero-S1提供
使用方法：
①设置好相应软件的重写
②从京东APP宠汪汪->领狗粮->邀请好友助力，分享给你小号微信或者微信的文件传输助手。 自己再打开刚才的分享，助力成功后，返回到此小程序首页重新进去宠汪汪即可助力下一位好友
③如提示好友人气旺，说明此好友已满了三人助力，需重新进出小程序，重新进入来客有礼-宠汪汪。
new Env('宠汪汪强制为别人助力');//此处忽略即可，为自动生成iOS端软件配置文件所需
============Quantumultx===============
[task_local]
#宠汪汪强制为别人助力
0 10 * * * jd_joy_help.js, tag=宠汪汪强制为别人助力, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jxcfd.png, enabled=true


[MITM]
hostname = draw.jdfcloud.com
======================Surge=====================
[Script]
宠汪汪强制为别人助力= type=http-request,pattern=^https:\/\/draw\.jdfcloud\.com\/\/common\/pet\/enterRoom\/h5\?invitePin=.*(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?&reqSource=weapp|^https:\/\/draw\.jdfcloud\.com(\/mirror)?\/\/pet\/helpFriend\?friendPin,requires-body=1,max-size=0,script-path=jd_joy_help.js

===================Quantumult X=====================
[rewrite_local]
^https:\/\/draw\.jdfcloud\.com\/\/common\/pet\/enterRoom\/h5\?invitePin=.*(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?&reqSource=weapp|^https:\/\/draw\.jdfcloud\.com(\/mirror)?\/\/pet\/helpFriend\?friendPin url script-request-header jd_joy_help.js

=====================Loon=====================
[Script]
http-request ^https:\/\/draw\.jdfcloud\.com\/\/common\/pet\/enterRoom\/h5\?invitePin=.*(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?&reqSource=weapp|^https:\/\/draw\.jdfcloud\.com(\/mirror)?\/\/pet\/helpFriend\?friendPin script-path=jd_joy_help.js, requires-body=true, timeout=3600, tag=宠汪汪强制为别人助力


你也可从下面链接拿好友的friendPin(复制链接到有京东ck的浏览器打开即可)

https://jdjoy.jd.com/pet/getFriends?itemsPerPage=20&currentPage=1
*/
const friendsArr = ["454053205", "13725399347_p", "jd_44957a7a68c57", "love_linda_", "hwc1225", "lzp96318", "gg700700", "jd_5fce8b76fdeaa", "532681307_m", "jd_66c4f3c1065f4", "jd_57b995299b562", "13699715902_p", "jd_6cd60500910ed", "81108137-504967", "jd_awYikNtqFjcf", "jd_65b4b780e4396", "jd_4538436808f67", "110153000-921284", "601113324", "jd_5a706113eb95d", "pegluoluo", "jd_53bee974ad993", "kennydmb", "jd_58785a45f0a53", "15920431321_p", "jd_67d52f2e05c2b", "jd_41ed41bd2a25b", "jd_fWoNgXiJdDPf", "jd_50a264e14e6b2", "jd_67e661bd7ccdf", "jd_gSHdfeyZypOK", "jd_4093ff58d0638", "jd_61a763ab287c9", "wdElAnGUXjRleZ", "jd_5ead4c7efe04a", "jd_NSsIxMaeLBmr", "jd_56c0d24e52443", "jd_6ad588605ea11", "jd_782460f538b81", "jd_71e534f136ac0", "18612141380_p", "二十一克1991", "jd_43f85092089f1", "144268919-793899", "jd_7260defa4072f", "15872365369_p", "jd_5d5b9b63a2007", "zhou775109893", "18986179488_p", "赵寅成大帅比", "jd_6dac986f65f2e", "jd_62e1372fd4a48", "jd_50ea050a55c44", "BPZZ214", "jd_43b1f64762da6", "15239500656_p", "18790947294_p", "jd_6082e71882fd7", "jd_73bee369587f2", "jd_4cc7492038d39", "jd_5845a91d48e90", "wdnGRZcqLoHJPh", "jd_5a3fa2cc01277", "jd_KJwoMZDeVQnF", "jd_MoMjHgRLlpEP", "18257343933_p", "jd_51e1f4beec5ad", "jd_aiuylJYqcETC", "jd_AyXDvrNQZEVk", "jd_4c5dba93ece69", "jd_5aa876b73b021", "jd_596f876c91960", "ql809280842", "jd_7bb2be8dbd65c", "jd_66f5cecc1efcd", "wduCeTewiZbRUd", "jd_604ddb1259203", "jd_6cd93e613b0e5", "jd_6423ed8a93620", "jd_41345a6f96aa5", "jd_706149c3ca11c", "被折叠的记忆33", "jd_sIhNpDXJehOr", "wddpzLSxORvLGo", "jd_42ad078104f47", "jd_mCbhXxmqzYJC", "jd_45a6b5953b15b", "jd_4848b07a75945", "jd_6428fdb593682", "邓丽丽仔", "jd_4d86e7e16d7cf", "熊孩纸的冬", "jd_412e8a19c83ed", "jd_58c95495c3d69", "jd_UfTncormjGzk", "jd_64dba5accb44e", "wdnhyIvBelJevo", "jd_pLNAjpPpRrPx", "jd_5b203fe06f0b8", "1937029690_m", "jd_73646b053177a", "WSD158768", "jd_5840fdc0069ad", "王辉1215", "jd_51e1008596137"]
/**
 * 生成随机数字
 * @param {number} min 最小值（包含）
 * @param {number} max 最大值（不包含）
 */
let newUrl, url = $request.url;
function randomNumber(min = 0, max = 100) {
  return Math.min(Math.floor(min + Math.random() * (max - min)), max);
}
try {
  console.log(`url:${url}`);
  let friendPin = encodeURI(friendsArr[randomNumber(0, friendsArr.length)]) //强制为对方助力,可成为好友关系
  const timestamp = new Date().getTime()
  const lks = url.match(/lks=.*?$/g)[0];
  newUrl = url.replace(/friendPin=.*?$/i, "friendPin=" + friendPin).replace(/invitePin=.*?$/i, "invitePin=" + friendPin).replace(/inviteTimeStamp=.*?$/i, "inviteTimeStamp=" + timestamp + "&")
  newUrl += `&${lks}`;
  console.log(`newUrl:${newUrl}`);
} catch (e) {
  console.log(e);
} finally {
  $done({ url: newUrl })
}
