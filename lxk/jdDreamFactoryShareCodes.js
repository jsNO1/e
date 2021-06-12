/*
京喜工厂互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写东东萌宠的好友码。
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let shareCodes = [
  'NGG0Vw1hr8bhbQXXO7wZ3w==@WQTSuQLROrpDDrV6VprkAA==@AVHWUlW9Ganp8OLSWMS-7g==@S4NRhGsd4I5niQyU1hQU-w==@m-ISQtQcWwNDsEGdEgdzag==@X9J_vCWGXOy0oX-QJRxQjQ==@TySDVO3FjiP_mVeRbo0qJQ==@CDzUQDqvJV-WAQcYFwOtOA==@XZu2jFrhNzxJQMYqaijsXg==@a347_1fUIhFO35jUlp9gCw==@_FbT1FQLNgbq_jka6gy2TQ==@n-nE-khOPoCE86G7UgmXnw==@DFJda2QL3kh1o-8vTxta6Q==@T0O2iHJ6ijlHypXYLvHWgw==@zLY9s9CzbTP5iUerxSxNGg==@yoZ3YyjXUQMxNdaO6XoyRA==@iAOL8NKX-FjWitAjTv1m3w==@k_AaPcSfBOjcKp2krRSf7Q==',//账号一的好友shareCode,不同好友中间用@符号隔开
  'NGG0Vw1hr8bhbQXXO7wZ3w==@WQTSuQLROrpDDrV6VprkAA==@AVHWUlW9Ganp8OLSWMS-7g==@S4NRhGsd4I5niQyU1hQU-w==@m-ISQtQcWwNDsEGdEgdzag==@X9J_vCWGXOy0oX-QJRxQjQ==@TySDVO3FjiP_mVeRbo0qJQ==@CDzUQDqvJV-WAQcYFwOtOA==@XZu2jFrhNzxJQMYqaijsXg==@a347_1fUIhFO35jUlp9gCw==@_FbT1FQLNgbq_jka6gy2TQ==@n-nE-khOPoCE86G7UgmXnw==@DFJda2QL3kh1o-8vTxta6Q==@T0O2iHJ6ijlHypXYLvHWgw==@zLY9s9CzbTP5iUerxSxNGg==@yoZ3YyjXUQMxNdaO6XoyRA==@iAOL8NKX-FjWitAjTv1m3w==@k_AaPcSfBOjcKp2krRSf7Q==',//账号二的好友shareCode，不同好友中间用@符号隔开
]

// 从日志获取互助码
// const logShareCodes = require('./utils/jdShareCodes');
// if (logShareCodes.DREAM_FACTORY_SHARE_CODES.length > 0 && !process.env.DREAM_FACTORY_SHARE_CODES) {
//   process.env.DREAM_FACTORY_SHARE_CODES = logShareCodes.DREAM_FACTORY_SHARE_CODES.join('&');
// }

// 判断环境变量里面是否有京喜工厂互助码
if (process.env.DREAM_FACTORY_SHARE_CODES) {
  if (process.env.DREAM_FACTORY_SHARE_CODES.indexOf('&') > -1) {
    console.log(`您的互助码选择的是用&隔开\n`)
    shareCodes = process.env.DREAM_FACTORY_SHARE_CODES.split('&');
  } else if (process.env.DREAM_FACTORY_SHARE_CODES.indexOf('\n') > -1) {
    console.log(`您的互助码选择的是用换行隔开\n`)
    shareCodes = process.env.DREAM_FACTORY_SHARE_CODES.split('\n');
  } else {
    shareCodes = process.env.DREAM_FACTORY_SHARE_CODES.split();
  }
} else {
  console.log(`由于您环境变量(DREAM_FACTORY_SHARE_CODES)里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < shareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['shareCodes' + index] = shareCodes[i];
}
