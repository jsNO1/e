/*************************
 * 自动阅读脚本（理论上来说全部阅读平台通用）
 * 
 * 测试了几个项目：
 * 1.番茄看看，微信扫码注册：https://raw.githubusercontent.com/yiyule10/loon_scripts/main/sharecode/%E7%95%AA%E8%8C%84%E7%9C%8B%E7%9C%8B.jpg
 * 2.云扫码，微信扫码注册：https://raw.githubusercontent.com/yiyule10/loon_scripts/main/sharecode/%E4%BA%91%E6%89%AB%E7%A0%81.png
 * 3.懒立帮，微信扫码注册：https://raw.githubusercontent.com/yiyule10/loon_scripts/main/sharecode/%E6%87%92%E7%AB%8B%E5%B8%AE.png
 * 4.推粉宝，微信扫码注册：https://raw.githubusercontent.com/yiyule10/loon_scripts/main/sharecode/%E6%8E%A8%E7%B2%89%E5%AE%9D.png
 * 
 * 使用方式：点击“开始阅读”，会自动返回阅读
 * 
 * 
 * 只测试了loon
 * surge和QX自行测试
 * QX似乎直接添加到重写就行
Loon:
[Script]
http-response ^https?://mp\.weixin\.qq\.com/s.+? tag=自动阅读, requires-body=true, timeout=10, script-path=https://raw.githubusercontent.com/yiyule10/loon_scripts/main/auto_read.js
[MITM]
hostname = mp.weixin.qq.com
Surge:
[Script]
自动阅读 = type=http-response,requires-body=1,pattern=^https?://mp\.weixin\.qq\.com/s.+?,script-path=https://raw.githubusercontent.com/yiyule10/loon_scripts/main/auto_read.js
[MITM]
hostname = mp.weixin.qq.com
QX:
[rewrite_local]
^https?://mp\.weixin\.qq\.com/s.+? url response-body </script>response-body setTimeout(()=>window.history.back(),10000);</script>
[mitm]
hostname=mp.weixin.qq.com
*************************/

let body = $response.body.replace(/<\/script>/g, "setTimeout(()=>window.history.back(),Math.floor(Math.random() * (45000 - 15000) + 15000));</script>");
$done({body});